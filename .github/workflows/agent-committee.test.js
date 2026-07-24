const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const workflow = fs.readFileSync('.github/workflows/agent-committee.yml', 'utf8');

test('fills committee vote prompt placeholders from runtime values', () => {
  assert.match(workflow, /\.replace\(\/\\bissue_title\\b\/g, issue\.title\)/);
  assert.match(workflow, /\.replace\(\/\\bcharter_url\\b\/g, voter\.charter\)/);
  assert.match(workflow, /\.replace\(\/\\bbrief_summary\\b\/g, briefSummary\)/);
});

test('does not append a duplicate analysis section after template rendering', () => {
  assert.doesNotMatch(
    workflow,
    /`### Decision Criteria`,[\s\S]*?`### Analysis`,[\s\S]*?`### Vote`,/
  );
});
