'use strict';

/**
 * Syntax-check inline `actions/github-script` JavaScript bodies in workflow files.
 *
 * Inline `script: |` blocks are never parsed until the workflow actually runs,
 * so a typo (e.g. a stray `else` after a `try/catch`) ships green and only blows
 * up at runtime. This linter extracts every inline script body and runs a real
 * JS syntax check over it, catching that entire class of failure before merge.
 *
 * GitHub Actions `${{ ... }}` expressions are substituted with a neutral literal
 * before checking, mirroring what Actions does at runtime, so the body is valid
 * JS regardless of the surrounding interpolation context.
 *
 * Usage: node framework/scripts/lint-workflow-scripts.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORKFLOW_DIR = path.join(process.cwd(), '.github', 'workflows');
const ACTIONS_DIR = path.join(process.cwd(), '.github', 'actions');

/**
 * Extract every `script: |` block-scalar body from a workflow file.
 * Returns an array of { startLine, indent, body }.
 */
function extractScriptBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  // Matches `script: |`, `script: |-`, `script: |+`, with optional indent indicator.
  const keyRe = /^(\s*)script:\s*\|[+-]?\d*\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(keyRe);
    if (!m) continue;
    const keyIndent = m[1].length;
    const bodyLines = [];
    let j = i + 1;
    for (; j < lines.length; j++) {
      const line = lines[j];
      if (line.trim() === '') {
        bodyLines.push('');
        continue;
      }
      const indent = line.length - line.trimStart().length;
      if (indent <= keyIndent) break;
      bodyLines.push(line);
    }
    // Strip trailing blank lines.
    while (bodyLines.length && bodyLines[bodyLines.length - 1] === '') bodyLines.pop();
    if (bodyLines.length === 0) continue;
    // Dedent by the common (minimum) indentation of non-blank lines.
    const baseIndent = Math.min(
      ...bodyLines.filter(l => l !== '').map(l => l.length - l.trimStart().length)
    );
    const body = bodyLines.map(l => (l === '' ? '' : l.slice(baseIndent))).join('\n');
    blocks.push({ startLine: i + 1, indent: keyIndent, body });
    i = j - 1;
  }
  return blocks;
}

/**
 * Replace GitHub Actions `${{ ... }}` expressions with a neutral literal so the
 * remaining text is syntactically valid JavaScript in every interpolation
 * context (template literal, quoted string, or bare expression position).
 */
function stripActionsExpressions(body) {
  return body.replace(/\$\{\{[\s\S]*?\}\}/g, '0');
}

/**
 * Syntax-check a single script body. Returns null on success or an error message.
 */
function checkBody(body) {
  // `github-script` wraps the body in an async function, so top-level `await`
  // and `return` are valid. Mirror that wrapping for an accurate syntax check.
  const wrapped = `(async () => {\n${stripActionsExpressions(body)}\n});`;
  try {
    // eslint-disable-next-line no-new
    new vm.Script(wrapped, { filename: 'inline-github-script.js' });
    return null;
  } catch (e) {
    return e.message;
  }
}

(function run() {
  if (require.main !== module) return;
  if (!fs.existsSync(WORKFLOW_DIR)) {
    console.error(`❌ Workflow directory not found: ${WORKFLOW_DIR}`);
    process.exit(1);
  }

  // Collect workflow files plus composite-action definitions, both of which can
  // embed inline `actions/github-script` bodies.
  const targets = [];
  for (const f of fs.readdirSync(WORKFLOW_DIR).sort()) {
    if (f.endsWith('.yml') || f.endsWith('.yaml')) {
      targets.push(path.join(WORKFLOW_DIR, f));
    }
  }
  if (fs.existsSync(ACTIONS_DIR)) {
    for (const dir of fs.readdirSync(ACTIONS_DIR).sort()) {
      for (const name of ['action.yml', 'action.yaml']) {
        const full = path.join(ACTIONS_DIR, dir, name);
        if (fs.existsSync(full)) targets.push(full);
      }
    }
  }

  let scriptCount = 0;
  let failures = 0;

  for (const full of targets) {
    const rel = path.relative(process.cwd(), full);
    const content = fs.readFileSync(full, 'utf8');
    const blocks = extractScriptBlocks(content);
    for (const block of blocks) {
      scriptCount++;
      const err = checkBody(block.body);
      if (err) {
        failures++;
        console.error(`❌ ${rel}:${block.startLine} inline github-script syntax error:`);
        console.error(`   ${err.split('\n').join('\n   ')}`);
      }
    }
  }

  if (failures > 0) {
    console.error(`\n❌ ${failures} inline github-script block(s) failed syntax check.`);
    process.exit(1);
  }
  console.log(`✅ Linted ${scriptCount} inline github-script block(s) across ${targets.length} file(s)`);
})();

module.exports = { extractScriptBlocks, stripActionsExpressions, checkBody };
