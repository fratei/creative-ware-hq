'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override !== undefined ? override : base;
  }
  if (typeof base === 'object' && base && typeof override === 'object' && override) {
    const out = { ...base };
    for (const [k, v] of Object.entries(override)) {
      out[k] = deepMerge(base[k], v);
    }
    return out;
  }
  return override !== undefined ? override : base;
}

function fetchHqConfig(token) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: '/repos/fratei/creative-ware-hq/contents/config/agents.config.json?ref=main',
      method: 'GET',
      headers: {
        'User-Agent': 'creativeware-load-config-action',
        'Accept': 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }, (res) => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => {
        try {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 300)}`));
          }
          const parsed = JSON.parse(body);
          const content = Buffer.from(parsed.content || '', 'base64').toString('utf8');
          resolve(JSON.parse(content));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function setOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

(async () => {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const configPath = path.join(ws, process.env.INPUT_CONFIG_PATH || 'config/agents.config.json');
  const token = process.env.AGENT_PAT || process.env.GITHUB_TOKEN || '';
  const repo = process.env.GITHUB_REPOSITORY || '';

  let localCfg = {};
  if (fs.existsSync(configPath)) {
    localCfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  let cfg = localCfg;
  if (repo.toLowerCase() !== 'fratei/creative-ware-hq') {
    try {
      const hqCfg = await fetchHqConfig(token);
      cfg = deepMerge(hqCfg, localCfg);
    } catch {
      cfg = localCfg;
    }
  }

  setOutput('config_json', JSON.stringify(cfg));
  setOutput('owner', cfg.owner?.primary || 'fratei');
  setOutput('tier_low_approval', cfg.autonomy?.tiers?.low?.approval || 'agent-committee');
  setOutput('tier_medium_approval', cfg.autonomy?.tiers?.medium?.approval || 'agent-committee-plus-silent');
  setOutput('tier_high_approval', cfg.autonomy?.tiers?.high?.approval || 'owner');
  setOutput('tier_low_required_votes', String(cfg.autonomy?.tiers?.low?.required_votes ?? 2));
  setOutput('tier_medium_required_votes', String(cfg.autonomy?.tiers?.medium?.required_votes ?? 3));
  setOutput('tier_high_fallback_after_hours', String(cfg.autonomy?.tiers?.high?.fallback_after_hours ?? 72));
})();
