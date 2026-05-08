/**
 * agent-state.js — Load and save per-agent state files.
 *
 * Usage (inside actions/github-script):
 *   const { loadState, saveState } = require(`${process.env.GITHUB_WORKSPACE}/.github/scripts/agent-state.js`);
 *   const state = loadState('cpo');
 *   // ... update state ...
 *   await saveState('cpo', state);
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATE_DIR = path.join(
  process.env.GITHUB_WORKSPACE || path.join(__dirname, '..', '..'),
  'strategy',
  'agent-state'
);

const DEFAULT_STATE = (agent) => ({
  agent,
  last_run_utc: null,
  last_processed: {
    opportunity_briefs: { path: null, sha: null },
    outcomes_through: null,
  },
  pending_handoffs: [],
  metrics_30d: {
    decisions_proposed: 0,
    decisions_approved: 0,
    decisions_rejected: 0,
    autonomy_pct: 0,
  },
});

/**
 * Load agent state from disk. Returns default state if file does not exist.
 * @param {string} agent — e.g. 'cpo', 'cto', 'cfo'
 * @returns {object}
 */
function loadState(agent) {
  const filePath = path.join(STATE_DIR, `${agent}.json`);
  if (!fs.existsSync(filePath)) {
    return DEFAULT_STATE(agent);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return DEFAULT_STATE(agent);
  }
}

/**
 * Save agent state to disk and commit with [skip ci].
 * @param {string} agent — e.g. 'cpo'
 * @param {object} state — the state object to persist
 */
function saveState(agent, state) {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  }
  const filePath = path.join(STATE_DIR, `${agent}.json`);
  fs.writeFileSync(filePath, JSON.stringify(state, null, 2) + '\n', 'utf-8');

  try {
    execSync('git config user.name "CreativeWare Bot"', { stdio: 'pipe' });
    execSync('git config user.email "bot@creative-ware.ai"', { stdio: 'pipe' });
    execSync(`git add "${filePath}"`, { stdio: 'pipe' });
    const diff = execSync('git diff --cached --name-only', { stdio: 'pipe' }).toString().trim();
    if (diff) {
      execSync(`git commit -m "chore: update agent state — ${agent} [skip ci]"`, { stdio: 'pipe' });
      execSync('git push origin HEAD:main', { stdio: 'pipe' });
    }
  } catch (e) {
    console.log(`⚠️ State commit failed (non-fatal): ${e.message}`);
  }
}

module.exports = { loadState, saveState, DEFAULT_STATE };
