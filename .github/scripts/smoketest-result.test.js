'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  isSmoketestDailyResultIssue,
  findSmoketestDailyResultIssue,
  buildSmoketestResultBody,
} = require('./smoketest-result.js');

test('matches the daily result issue for a smoke-test source issue', () => {
  const issue = {
    title: '[SMOKETEST] Daily Result — 2026-05-17',
    body: '## Smoke test run\n- Source issue: #200\n- Status: started',
  };

  assert.equal(isSmoketestDailyResultIssue(issue, 200), true);
  assert.equal(isSmoketestDailyResultIssue(issue, 201), false);
});

test('finds the matching daily result issue from an issue list', () => {
  const issues = [
    { number: 1, title: '[SMOKETEST] Daily Result — 2026-05-16', body: '- Source issue: #193' },
    { number: 2, title: '[SMOKETEST] Daily Result — 2026-05-17', body: '- Source issue: #200' },
  ];

  assert.deepEqual(findSmoketestDailyResultIssue(issues, 200), issues[1]);
});

test('renders a completed smoke-test result body', () => {
  assert.equal(
    buildSmoketestResultBody({
      sourceIssueNumber: 200,
      status: 'passed',
      outcome: 'Committee approved and closed the synthetic source issue.',
      updatedAt: '2026-05-19T15:38:22.653Z',
    }),
    [
      '## Smoke test run',
      '- Source issue: #200',
      '- Status: passed',
      '- Outcome: Committee approved and closed the synthetic source issue.',
      '- Updated at: 2026-05-19T15:38:22.653Z',
    ].join('\n')
  );
});
