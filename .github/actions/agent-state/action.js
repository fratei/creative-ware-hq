'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function setOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

(function main() {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const agent = process.env.INPUT_AGENT;
  const op = process.env.INPUT_OP;
  const dir = path.join(ws, 'strategy', 'agent-state');
  const file = path.join(dir, `${agent}.json`);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (op === 'read') {
    const state = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : { agent, last_run_utc: null, pending_handoffs: [], metrics_30d: {} };
    setOutput('state_json', JSON.stringify(state));
    return;
  }

  if (op === 'write') {
    const state = JSON.parse(process.env.INPUT_STATE_JSON || '{}');
    fs.writeFileSync(file, JSON.stringify(state, null, 2) + '\n', 'utf8');
    try {
      cp.execSync('git config user.name "CreativeWare Bot"');
      cp.execSync('git config user.email "bot@creative-ware.ai"');
      cp.execSync(`git add "${file}"`);
      const diff = cp.execSync('git diff --cached --name-only').toString().trim();
      if (diff) cp.execSync(`git commit -m "chore: update ${agent} state [skip ci]"`);
    } catch {}
    setOutput('state_json', JSON.stringify(state));
    return;
  }

  throw new Error(`Unsupported op: ${op}`);
})();
