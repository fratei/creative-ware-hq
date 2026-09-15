'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const test = require('node:test');

function runRenderPrompt({ template, varsJson = '{}' }) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'render-prompt-test-'));
  const workspace = path.join(tempRoot, 'workspace');
  const promptsDir = path.join(workspace, 'framework', 'prompts');
  const outputFile = path.join(tempRoot, 'github_output.txt');
  fs.mkdirSync(promptsDir, { recursive: true });
  fs.writeFileSync(path.join(promptsDir, 'sample-template.md'), template);
  fs.writeFileSync(outputFile, '');

  const actionPath = path.join(__dirname, 'action.js');
  const run = spawnSync(process.execPath, [actionPath], {
    env: {
      ...process.env,
      GITHUB_WORKSPACE: workspace,
      GITHUB_OUTPUT: outputFile,
      INPUT_TEMPLATE_NAME: 'sample-template',
      INPUT_VARS_JSON: varsJson,
    },
    encoding: 'utf8',
  });

  return { run, output: fs.readFileSync(outputFile, 'utf8') };
}

test('renders template output with preserved newlines', () => {
  const template = [
    '---',
    'required_vars: [meeting_type, context]',
    '---',
    '## Meeting Request',
    '',
    '**Type:** {{meeting_type}}',
    '',
    '{{context}}',
    '',
  ].join('\n');

  const { run, output } = runRenderPrompt({
    template,
    varsJson: JSON.stringify({
      meeting_type: 'standup',
      context: 'Cross-product status review and execution alignment',
    }),
  });

  assert.strictEqual(run.status, 0, run.stderr);
  assert.match(output, /^rendered<<EOF_[a-z0-9]+\n/);
  assert.match(output, /\n## Meeting Request\n\n\*\*Type:\*\* standup\n\nCross-product status review and execution alignment\n/);
  assert.ok(!output.includes('%0A'), 'expected output to keep real newlines');
});

test('fails when required vars are missing', () => {
  const template = [
    '---',
    'required_vars: [meeting_type]',
    '---',
    '**Type:** {{meeting_type}}',
  ].join('\n');

  const { run } = runRenderPrompt({
    template,
    varsJson: JSON.stringify({}),
  });

  assert.notStrictEqual(run.status, 0);
  assert.match(run.stderr, /Missing required template variable: meeting_type/);
});
