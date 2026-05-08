'use strict';

const fs = require('fs');

async function bootstrapProduct({ github, owner, hqRepo, targetRepo }) {
  const labels = JSON.parse(fs.readFileSync('framework/schemas/labels.json', 'utf8'));
  for (const l of labels) {
    try {
      await github.rest.issues.getLabel({ owner, repo: targetRepo, name: l.name });
    } catch {
      await github.rest.issues.createLabel({ owner, repo: targetRepo, name: l.name, color: l.color, description: l.description });
    }
  }

  try {
    await github.rest.repos.updateBranchProtection({
      owner,
      repo: targetRepo,
      branch: 'main',
      required_status_checks: { strict: true, contexts: ['reusable-pr-pipeline'] },
      enforce_admins: false,
      required_pull_request_reviews: { required_approving_review_count: 1 },
      restrictions: null,
      allow_force_pushes: false,
      allow_deletions: false
    });
  } catch (e) {
    console.log(`branch protection skipped: ${e.message}`);
  }

  let hasAgentPat = true;
  try {
    await github.request('HEAD /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
      owner,
      repo: targetRepo,
      secret_name: 'AGENT_PAT'
    });
  } catch {
    hasAgentPat = false;
  }

  if (!hasAgentPat) {
    await github.rest.issues.create({
      owner,
      repo: hqRepo,
      title: `[BOOTSTRAP] ${owner}/${targetRepo} missing AGENT_PAT`,
      body: 'AGENT_PAT is missing in product repo secrets. Please add it to enable cross-repo framework operations.',
      labels: ['needs-owner-approval', 'agent/orchestrator']
    });
  }

  const cfg = JSON.parse(fs.readFileSync('config/agents.config.json', 'utf8'));
  const originalMaxMerges = cfg.circuit_breakers.max_auto_merges_per_day;
  cfg.circuit_breakers.max_auto_merges_per_day = Math.min(originalMaxMerges, 5);
  if (cfg.circuit_breakers.max_auto_merges_per_day !== originalMaxMerges) {
    console.log(`circuit breaker adjusted for bootstrap defaults: max_auto_merges_per_day ${originalMaxMerges} -> ${cfg.circuit_breakers.max_auto_merges_per_day}`);
  }
  await github.rest.repos.createOrUpdateFileContents({
    owner,
    repo: targetRepo,
    path: 'config/agents.config.json',
    message: 'chore: seed agents config [skip ci]',
    content: Buffer.from(JSON.stringify(cfg, null, 2) + '\n').toString('base64')
  });

  const release = fs.readFileSync('framework/RELEASE.md', 'utf8');
  const version = (release.match(/Current framework version:\s*(v[0-9.]+)/) || [])[1] || 'v1.0.0';
  await github.rest.repos.createOrUpdateFileContents({
    owner,
    repo: targetRepo,
    path: 'framework-version',
    message: `chore: pin framework ${version} [skip ci]`,
    content: Buffer.from(`${version}\n`).toString('base64')
  });

  for (const charter of fs.readdirSync('docs/agents/charters').filter(f => f.endsWith('.md'))) {
    const body = fs.readFileSync(`docs/agents/charters/${charter}`, 'utf8');
    await github.rest.repos.createOrUpdateFileContents({
      owner,
      repo: targetRepo,
      path: `docs/agents/charters/${charter}`,
      message: `chore: copy charter ${charter} [skip ci]`,
      content: Buffer.from(body).toString('base64')
    });
  }

  const checklist = [
    '# [BOOTSTRAP CHECKLIST]',
    '- [ ] Standard labels seeded',
    '- [ ] Branch protection enabled',
    '- [ ] AGENT_PAT present',
    '- [ ] `config/agents.config.json` seeded',
    '- [ ] `framework-version` pinned',
    '- [ ] Agent charters copied'
  ].join('\n');

  await github.rest.issues.create({
    owner,
    repo: targetRepo,
    title: '[BOOTSTRAP CHECKLIST] Product framework readiness',
    body: checklist,
    labels: ['needs-owner-approval']
  });
}

module.exports = { bootstrapProduct };
