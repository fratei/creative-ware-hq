'use strict';

const assert = require('assert');
const test = require('node:test');

const {
  deriveProductMetadata,
  ensureBootstrapFiles,
} = require('./bootstrap-product.js');

test('deriveProductMetadata prefers the repo description product heading', () => {
  assert.deepStrictEqual(
    deriveProductMetadata({
      repoName: 'synthdata-app',
      repoDescription: 'SynthData — AI-powered synthetic data generation platform',
    }),
    {
      productName: 'SynthData',
      productDescription: 'AI-powered synthetic data generation platform',
    }
  );
});

test('ensureBootstrapFiles restores missing readiness files from the product template', async () => {
  const createdFiles = [];
  const existingFiles = new Set(['.github/copilot-instructions.md']);
  const templateFiles = {
    'AGENTS.md': '# Copilot Coding Agent — {{PRODUCT_NAME}}\nRepo: {{PRODUCT_SLUG}}\n{{PRODUCT_DESCRIPTION}}\n',
    '.devcontainer/devcontainer.json': '{"name":"{{PRODUCT_NAME}}"}\n',
    '.github/workflows/copilot-setup-steps.yml': 'name: "Copilot Setup Steps"\n',
  };

  const github = {
    rest: {
      repos: {
        async get({ repo }) {
          assert.strictEqual(repo, 'synthdata-app');
          return {
            data: {
              description: 'SynthData — AI-powered synthetic data generation platform',
            },
          };
        },
        async getContent({ repo, path }) {
          if (repo === 'synthdata-app') {
            if (existingFiles.has(path)) {
              return {
                data: {
                  content: Buffer.from('existing file').toString('base64'),
                },
              };
            }

            const error = new Error(`missing: ${path}`);
            error.status = 404;
            throw error;
          }

          assert.strictEqual(repo, 'creative-ware-product-template');
          return {
            data: {
              content: Buffer.from(templateFiles[path]).toString('base64'),
            },
          };
        },
        async createOrUpdateFileContents(params) {
          createdFiles.push({
            path: params.path,
            message: params.message,
            content: Buffer.from(params.content, 'base64').toString('utf8'),
          });
        },
      },
    },
  };

  await ensureBootstrapFiles({
    github,
    owner: 'fratei',
    targetRepo: 'synthdata-app',
  });

  assert.deepStrictEqual(
    createdFiles.map(file => file.path).sort(),
    ['.devcontainer/devcontainer.json', '.github/workflows/copilot-setup-steps.yml', 'AGENTS.md']
  );
  assert.match(createdFiles.find(file => file.path === 'AGENTS.md').content, /SynthData/);
  assert.match(createdFiles.find(file => file.path === 'AGENTS.md').content, /synthdata-app/);
  assert.match(
    createdFiles.find(file => file.path === 'AGENTS.md').content,
    /AI-powered synthetic data generation platform/
  );
  assert.match(
    createdFiles.find(file => file.path === '.devcontainer/devcontainer.json').content,
    /SynthData/
  );
  assert.ok(createdFiles.every(file => file.message.includes('[skip ci]')));
});
