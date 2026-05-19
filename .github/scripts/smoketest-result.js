'use strict';

function isSmoketestDailyResultIssue(issue, sourceIssueNumber) {
  return Boolean(
    issue &&
    issue.title &&
    issue.title.startsWith('[SMOKETEST] Daily Result — ') &&
    (issue.body || '').includes(`Source issue: #${sourceIssueNumber}`)
  );
}

function findSmoketestDailyResultIssue(issues, sourceIssueNumber) {
  return (issues || []).find(issue => isSmoketestDailyResultIssue(issue, sourceIssueNumber));
}

function buildSmoketestResultBody({ sourceIssueNumber, status, outcome, updatedAt }) {
  const lines = [
    '## Smoke test run',
    `- Source issue: #${sourceIssueNumber}`,
    `- Status: ${status}`,
  ];

  if (outcome) {
    lines.push(`- Outcome: ${outcome}`);
  }

  if (updatedAt) {
    lines.push(`- Updated at: ${updatedAt}`);
  }

  return lines.join('\n');
}

module.exports = {
  isSmoketestDailyResultIssue,
  findSmoketestDailyResultIssue,
  buildSmoketestResultBody,
};
