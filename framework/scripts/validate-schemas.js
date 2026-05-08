'use strict';

const fs = require('fs');
const path = require('path');

const ws = process.cwd();

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exitCode = 1;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function requireKeys(obj, keys, where) {
  for (const k of keys) {
    if (!(k in obj)) fail(`${where}: missing key '${k}'`);
  }
}

(function run() {
  const cfgPath = path.join(ws, 'config', 'agents.config.json');
  const cfg = readJson(cfgPath);
  requireKeys(cfg, ['owner', 'autonomy', 'circuit_breakers', 'copilot', 'budget'], cfgPath);
  requireKeys(cfg.autonomy, ['tiers', 'auto_classify_rules'], `${cfgPath}.autonomy`);
  requireKeys(cfg.autonomy.tiers, ['low', 'medium', 'high'], `${cfgPath}.autonomy.tiers`);

  const stateDir = path.join(ws, 'strategy', 'agent-state');
  for (const file of fs.readdirSync(stateDir).filter(f => f.endsWith('.json'))) {
    const full = path.join(stateDir, file);
    const st = readJson(full);
    requireKeys(st, ['agent', 'last_run_utc', 'pending_handoffs', 'metrics_30d'], full);
  }

  const outDir = path.join(ws, 'strategy', 'outcomes');
  for (const file of fs.readdirSync(outDir).filter(f => f.endsWith('.md'))) {
    const full = path.join(outDir, file);
    const lines = fs.readFileSync(full, 'utf8').split('\n').filter(l => l.startsWith('| ') && !l.includes('Date (UTC)') && !l.includes('---'));
    for (const line of lines) {
      const cols = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cols.length >= 7) continue;
      if (cols.length === 3) continue; // legacy summary mini-tables in historical files
      fail(`${full}: malformed outcome row '${line}'`);
    }
  }

  if (process.exitCode) {
    process.exit(process.exitCode);
  }
  console.log('✅ Schema validation checks passed');
})();
