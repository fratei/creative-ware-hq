'use strict';

const fs = require('fs');
const https = require('https');

function gh(token, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'creativeware-committee-vote-action',
        'Accept': 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }, (res) => {
      let body = '';
      res.on('data', d => { body += d; });
      res.on('end', () => {
        try {
          if (res.statusCode >= 400) return reject(new Error(body));
          resolve(JSON.parse(body));
        } catch (e) { reject(e); }
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
  const token = process.env.AGENT_PAT || process.env.GITHUB_TOKEN;
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
  const issue = Number(process.env.INPUT_ISSUE_NUMBER);
  const voters = JSON.parse(process.env.INPUT_VOTERS || '["CPO","CTO","CFO"]');

  const comments = await gh(token, `/repos/${owner}/${repo}/issues/${issue}/comments?per_page=100`);
  const votes = {};
  for (const v of voters) votes[v] = 'missing';

  for (const c of comments) {
    for (const v of voters) {
      if (!String(c.body).includes(`${v} Agent Vote`)) continue;
      if (c.body.includes('- [x] ✅ Approve')) votes[v] = 'approve';
      else if (c.body.includes('- [x] ❌ Reject')) votes[v] = 'reject';
      else if (c.body.includes('- [x] ⏸️ Defer to owner')) votes[v] = 'defer';
    }
  }

  const values = Object.values(votes);
  const approvals = values.filter(v => v === 'approve').length;
  const rejects = values.filter(v => v === 'reject').length;
  const defers = values.filter(v => v === 'defer').length;

  let decision = 'escalated';
  if (rejects > 0) decision = 'rejected';
  else if (defers > 0) decision = 'escalated';
  else if (approvals >= 2) decision = 'approved';

  setOutput('decision', decision);
  setOutput('votes', JSON.stringify({ votes, approvals, rejects, defers }));
})();
