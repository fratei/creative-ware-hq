'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

function gh(token, method, reqPath, data) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: reqPath,
      method,
      headers: {
        'User-Agent': 'creativeware-assign-copilot-action',
        'Accept': 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }, (res) => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => {
        const ok = res.statusCode >= 200 && res.statusCode < 300;
        if (!ok) return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 300)}`));
        resolve(body ? JSON.parse(body) : {});
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function setOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

(async () => {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const cfgPath = path.join(ws, 'config', 'agents.config.json');
  const cfg = fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : {};
  const logins = cfg.copilot?.assignment_logins || ['copilot', 'copilot[bot]'];
  const attempts = Number(process.env.INPUT_ATTEMPTS || cfg.copilot?.assignment_attempts || 3);
  const token = process.env.AGENT_PAT || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN or AGENT_PAT is required');

  const [owner, repo] = String(process.env.INPUT_REPO).split('/');
  const issue = Number(process.env.INPUT_ISSUE_NUMBER);

  for (let attempt = 1; attempt <= attempts; attempt++) {
    for (const login of logins) {
      try {
        await gh(token, 'POST', `/repos/${owner}/${repo}/issues/${issue}/assignees`, { assignees: [login] });
        setOutput('assigned', 'true');
        setOutput('login', login);
        return;
      } catch {
        // continue retries
      }
    }
  }

  try { await gh(token, 'POST', `/repos/${owner}/${repo}/issues/${issue}/labels`, { labels: ['assignment-failed'] }); } catch {}
  try {
    await gh(token, 'POST', `/repos/${owner}/${repo}/issues/${issue}/comments`, {
      body: '⚠️ Auto-assignment to Copilot failed after retries. Added `assignment-failed` for follow-up.',
    });
  } catch {}

  setOutput('assigned', 'false');
  setOutput('login', '');
})();
