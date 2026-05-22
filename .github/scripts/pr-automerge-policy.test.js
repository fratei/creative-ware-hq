'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  findBlockingLabels,
  hasPendingReviewerRequests,
  hasChangesRequested,
} = require('./pr-automerge-policy.js');

test('findBlockingLabels returns only configured blocking labels', () => {
  const labels = ['risk/medium', 'do-not-auto-approve', 'area/workflows', 'do-not-merge'];
  assert.deepEqual(findBlockingLabels(labels), ['do-not-merge', 'do-not-auto-approve']);
});

test('hasPendingReviewerRequests returns true when reviewer or team is requested', () => {
  assert.equal(hasPendingReviewerRequests({ requested_reviewers: [{ login: 'octocat' }] }), true);
  assert.equal(hasPendingReviewerRequests({ requested_teams: [{ slug: 'platform' }] }), true);
  assert.equal(hasPendingReviewerRequests({ requested_reviewers: [], requested_teams: [] }), false);
});

test('hasChangesRequested uses each reviewer latest decision', () => {
  const reviews = [
    { user: { login: 'alice' }, state: 'CHANGES_REQUESTED' },
    { user: { login: 'alice' }, state: 'APPROVED' },
    { user: { login: 'bob' }, state: 'COMMENTED' },
  ];
  assert.equal(hasChangesRequested(reviews), false);

  const withActiveBlock = [
    { user: { login: 'alice' }, state: 'APPROVED' },
    { user: { login: 'bob' }, state: 'CHANGES_REQUESTED' },
  ];
  assert.equal(hasChangesRequested(withActiveBlock), true);
});
