'use strict';

const BLOCKING_LABELS = ['do-not-merge', 'do-not-auto-approve', 'needs-owner-approval'];

function findBlockingLabels(labels = []) {
  const normalized = labels.map(String);
  return BLOCKING_LABELS.filter(label => normalized.includes(label));
}

function hasPendingReviewerRequests(prDetail = {}) {
  const reviewers = prDetail.requested_reviewers || [];
  const teams = prDetail.requested_teams || [];
  return reviewers.length > 0 || teams.length > 0;
}

function hasChangesRequested(reviews = []) {
  const latestByUser = new Map();
  for (const review of reviews) {
    if (!review?.user?.login) continue;
    latestByUser.set(review.user.login, review);
  }
  return [...latestByUser.values()].some(review => review.state === 'CHANGES_REQUESTED');
}

module.exports = {
  BLOCKING_LABELS,
  findBlockingLabels,
  hasPendingReviewerRequests,
  hasChangesRequested,
};
