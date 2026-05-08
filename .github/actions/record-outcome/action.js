'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function setOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

(function main() {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const now = new Date();
  const ym = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  const date = now.toISOString().split('T')[0];
  const dir = path.join(ws, 'strategy', 'outcomes');
  const file = path.join(dir, `${ym}.md`);

  const kind = process.env.INPUT_KIND;
  const summary = process.env.INPUT_SUMMARY;
  const decisionRef = process.env.INPUT_DECISION_REF || '—';
  const prRef = process.env.INPUT_PR_REF || '—';
  const result = process.env.INPUT_RESULT;
  const notes = process.env.INPUT_NOTES || '';

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `# CreativeWare Outcomes — ${ym}\n\n| Date (UTC) | Kind | Summary | Decision | PR | Result | Notes |\n|------------|------|---------|----------|----|--------|-------|\n`, 'utf8');
  }

  const key = `${kind}|${decisionRef}|${prRef}`;
  const existing = fs.readFileSync(file, 'utf8').split('\n').find(l => l.includes(`| ${kind} |`) && l.includes(`| ${decisionRef} |`) && l.includes(`| ${prRef} |`));
  if (!existing) {
    fs.appendFileSync(file, `| ${date} | ${kind} | ${summary} | ${decisionRef} | ${prRef} | ${result} | ${notes} |\n`, 'utf8');
    try {
      cp.execSync('git config user.name "CreativeWare Bot"');
      cp.execSync('git config user.email "bot@creative-ware.ai"');
      cp.execSync(`git add "${file}"`);
      const diff = cp.execSync('git diff --cached --name-only').toString().trim();
      if (diff) cp.execSync(`git commit -m "chore: record outcome ${kind} [skip ci]"`);
    } catch {
      // Non-fatal in caller contexts that don't allow commits.
    }
  }

  setOutput('outcome_path', path.relative(ws, file));
})();
