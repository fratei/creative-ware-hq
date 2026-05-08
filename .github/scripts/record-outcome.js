/**
 * record-outcome.js — Append outcomes to strategy/outcomes/YYYY-MM.md.
 *
 * Usage (inside actions/github-script):
 *   const { recordOutcome } = require(`${process.env.GITHUB_WORKSPACE}/.github/scripts/record-outcome.js`);
 *   await recordOutcome({ kind, summary, decisionRef, prRef, result, notes });
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTCOMES_DIR = path.join(
  process.env.GITHUB_WORKSPACE || path.join(__dirname, '..', '..'),
  'strategy',
  'outcomes'
);

/**
 * Append an outcome row to the current-month outcomes file.
 *
 * @param {object} opts
 * @param {string} opts.kind        — e.g. 'committee-approval', 'pr-merge', 'sla-fallback-approval'
 * @param {string} opts.summary     — short description
 * @param {string} [opts.decisionRef] — e.g. 'audiotext-app#42'
 * @param {string} [opts.prRef]     — e.g. 'audiotext-app#43'
 * @param {string} opts.result      — e.g. '✅ approved', '❌ rejected', '⏸️ escalated'
 * @param {string} [opts.notes]     — any extra notes
 */
function recordOutcome({ kind, summary, decisionRef = '—', prRef = '—', result, notes = '' }) {
  const now = new Date();
  const yearMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  const dateStr = now.toISOString().split('T')[0];
  const filePath = path.join(OUTCOMES_DIR, `${yearMonth}.md`);

  const header = [
    `# CreativeWare Outcomes — ${yearMonth}`,
    ``,
    `| Date (UTC) | Kind | Summary | Decision | PR | Result | Notes |`,
    `|------------|------|---------|----------|----|--------|-------|`,
  ].join('\n');

  const row = `| ${dateStr} | ${kind} | ${summary} | ${decisionRef} | ${prRef} | ${result} | ${notes} |`;

  if (!fs.existsSync(OUTCOMES_DIR)) {
    fs.mkdirSync(OUTCOMES_DIR, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header + '\n' + row + '\n', 'utf-8');
  } else {
    fs.appendFileSync(filePath, row + '\n', 'utf-8');
  }

  // Commit with [skip ci]
  try {
    execSync('git config user.name "CreativeWare Bot"', { stdio: 'pipe' });
    execSync('git config user.email "bot@creative-ware.ai"', { stdio: 'pipe' });
    execSync(`git add "${filePath}"`, { stdio: 'pipe' });
    const diff = execSync('git diff --cached --name-only', { stdio: 'pipe' }).toString().trim();
    if (diff) {
      execSync(`git commit -m "chore: record outcome — ${kind} [skip ci]"`, { stdio: 'pipe' });
      execSync('git push origin HEAD:main', { stdio: 'pipe' });
    }
  } catch (e) {
    console.log(`⚠️ Outcome commit failed (non-fatal): ${e.message}`);
  }
}

module.exports = { recordOutcome };
