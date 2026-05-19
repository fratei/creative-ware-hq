'use strict';

const assert = require('assert/strict');
const path = require('path');
const test = require('node:test');

const { bootstrapProduct } = require('./bootstrap-product');

test('bootstrapProduct repins framework-version and reusable workflow refs', async () => {
  const writes = [];
  const workflowDirectory = [
    { type: 'file', name: 'pr-review.yml', path: '.github/workflows/pr-review.yml' },
    { type: 'file', name: 'observability-agent.yml', path: '.github/workflows/observability-agent.yml' },
    { type: 'file', name: 'product-agent-fleet.yml', path: '.github/workflows/product-agent-fleet.yml' },
    { type: 'file', name: 'ci-cd.yml', path: '.github/workflows/ci-cd.yml' }
  ];
  const repoFiles = {
    '.github/workflows/pr-review.yml': 'uses: fratei/creative-ware-hq/.github/workflows/reusable-pr-pipeline.yml@main\n',
    '.github/workflows/observability-agent.yml': 'uses: fratei/creative-ware-hq/.github/workflows/reusable-observability.yml@main\n',
    '.github/workflows/product-agent-fleet.yml': 'uses: fratei/creative-ware-hq/.github/workflows/reusable-product-fleet.yml@main\n',
    '.github/workflows/ci-cd.yml': 'name: ci-cd\n',
    'docs/agents/HANDBOOK.md': '- [Agent Charters](./charters/) — copied from framework main (switch to v1 after tag)\n'
  };
  const github = {
    rest: {
      issues: {
        getLabel: async () => {},
        createLabel: async () => {},
        create: async () => {}
      },
      repos: {
        updateBranchProtection: async () => {},
        getContent: async ({ path: filePath }) => {
          if (filePath === '.github/workflows') {
            return { data: workflowDirectory };
          }
          if (repoFiles[filePath]) {
            return {
              data: {
                content: Buffer.from(repoFiles[filePath]).toString('base64'),
                sha: `sha-${filePath}`
              }
            };
          }
          throw new Error(`unexpected path ${filePath}`);
        },
        createOrUpdateFileContents: async params => {
          writes.push(params);
        }
      }
    },
    request: async () => {
      throw new Error('missing secret');
    }
  };

  const repoRoot = path.resolve(__dirname, '..', '..');
  const previousCwd = process.cwd();
  process.chdir(repoRoot);
  try {
    await bootstrapProduct({
      github,
      owner: 'fratei',
      hqRepo: 'creative-ware-hq',
      targetRepo: 'synthdata-app'
    });
  } finally {
    process.chdir(previousCwd);
  }

  const frameworkVersionWrite = writes.find(write => write.path === 'framework-version');
  assert.ok(frameworkVersionWrite);
  assert.equal(Buffer.from(frameworkVersionWrite.content, 'base64').toString('utf8'), 'v1.0.0\n');

  const prReviewWrite = writes.find(write => write.path === '.github/workflows/pr-review.yml');
  assert.ok(prReviewWrite);
  assert.equal(
    Buffer.from(prReviewWrite.content, 'base64').toString('utf8'),
    'uses: fratei/creative-ware-hq/.github/workflows/reusable-pr-pipeline.yml@v1\n'
  );

  const observabilityWrite = writes.find(write => write.path === '.github/workflows/observability-agent.yml');
  assert.ok(observabilityWrite);
  assert.equal(
    Buffer.from(observabilityWrite.content, 'base64').toString('utf8'),
    'uses: fratei/creative-ware-hq/.github/workflows/reusable-observability.yml@v1\n'
  );

  const fleetWrite = writes.find(write => write.path === '.github/workflows/product-agent-fleet.yml');
  assert.ok(fleetWrite);
  assert.equal(
    Buffer.from(fleetWrite.content, 'base64').toString('utf8'),
    'uses: fratei/creative-ware-hq/.github/workflows/reusable-product-fleet.yml@v1\n'
  );

  const handbookWrite = writes.find(write => write.path === 'docs/agents/HANDBOOK.md');
  assert.ok(handbookWrite);
  assert.equal(
    Buffer.from(handbookWrite.content, 'base64').toString('utf8'),
    '- [Agent Charters](./charters/) — copied from framework v1\n'
  );

  assert.equal(writes.some(write => write.path === '.github/workflows/ci-cd.yml'), false);
});
