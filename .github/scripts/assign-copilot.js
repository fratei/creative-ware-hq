/**
 * assign-copilot.js — Reliable Copilot assignment with retries.
 *
 * Usage (inside actions/github-script):
 *   const { assignCopilotWithRetry } = require(`${process.env.GITHUB_WORKSPACE}/.github/scripts/assign-copilot.js`);
 *   const assigned = await assignCopilotWithRetry({ github, owner, repo, issue_number });
 */

'use strict';

const path = require('path');
const cfg = require(path.join(__dirname, 'agent-config.js'));

/**
 * Try to assign a Copilot login to an issue, with retries.
 * On final failure, labels the issue `assignment-failed` and posts a comment.
 *
 * @param {object} opts
 * @param {object} opts.github       — octokit instance from actions/github-script
 * @param {string} opts.owner
 * @param {string} opts.repo
 * @param {number} opts.issue_number
 * @param {number} [opts.attempts]   — override config attempts
 * @returns {Promise<boolean>} — true if assigned successfully
 */
async function assignCopilotWithRetry({ github, owner, repo, issue_number, attempts }) {
  const logins = cfg.getCopilotLogins();
  const maxAttempts = attempts || cfg.getCopilotAssignmentAttempts();

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    for (const login of logins) {
      try {
        await github.rest.issues.addAssignees({
          owner, repo, issue_number, assignees: [login],
        });
        // Verify assignment took
        const { data: issue } = await github.rest.issues.get({ owner, repo, issue_number });
        if (issue.assignees.some(a => a.login.toLowerCase().includes('copilot'))) {
          console.log(`✅ Assigned ${login} to ${repo}#${issue_number} (attempt ${attempt})`);
          return true;
        }
      } catch (e) {
        console.log(`  attempt ${attempt}/${maxAttempts} login=${login}: ${e.message}`);
      }
    }
    // Brief pause between attempts
    if (attempt < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // All attempts failed — label as assignment-failed and comment
  console.log(`⚠️ Copilot assignment failed after ${maxAttempts} attempts for ${repo}#${issue_number}`);
  try {
    await github.rest.issues.addLabels({
      owner, repo, issue_number, labels: ['assignment-failed'],
    });
  } catch (e) {
    console.log(`  Could not add assignment-failed label: ${e.message}`);
  }
  try {
    await github.rest.issues.createComment({
      owner, repo, issue_number,
      body: `⚠️ **Auto-assignment to Copilot failed** after ${maxAttempts} attempts.\n\nPlease assign manually in the GitHub UI, or the reconciler will retry on the next cycle.\n\n*Labels added: \`assignment-failed\`*`,
    });
  } catch (e) {
    console.log(`  Could not post failure comment: ${e.message}`);
  }
  return false;
}

module.exports = { assignCopilotWithRetry };
