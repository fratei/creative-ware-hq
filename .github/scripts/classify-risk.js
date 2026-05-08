/**
 * classify-risk.js — Risk classifier for PRs and opportunities.
 * Returns 'low' | 'medium' | 'high' based on config rules.
 *
 * Usage:
 *   const { classifyRisk } = require(`${process.env.GITHUB_WORKSPACE}/.github/scripts/classify-risk.js`);
 *   const tier = classifyRisk({ title, body, files, labels });
 */

'use strict';

const path = require('path');
const cfg = require(path.join(__dirname, 'agent-config.js'));

/**
 * Minimatch-style glob matching (subset: **, *, no brace expansion needed).
 * Handles patterns like "docs/**", "**\/auth\/**", "**\/.env*".
 */
function matchGlob(pattern, filePath) {
  // Normalise separators
  const p = filePath.replace(/\\/g, '/');
  // Convert glob to regex
  const regexStr = pattern
    .replace(/\\/g, '/')
    // Escape regex special chars except * and ?
    .replace(/[.+^${}()|[\]]/g, '\\$&')
    // ** matches anything including slashes
    .replace(/\*\*/g, '__DOUBLE_STAR__')
    // * matches anything except slashes
    .replace(/\*/g, '[^/]*')
    .replace(/__DOUBLE_STAR__/g, '.*');
  const regex = new RegExp(`^${regexStr}$`);
  return regex.test(p);
}

/**
 * Check if any file path matches any glob pattern from the list.
 */
function filesMatchAny(files, patterns) {
  for (const f of files) {
    for (const pattern of patterns) {
      if (matchGlob(pattern, f)) return true;
    }
  }
  return false;
}

/**
 * Check if text contains any of the keywords (case-insensitive).
 */
function textMatchesAny(text, keywords) {
  const lower = (text || '').toLowerCase();
  return keywords.some(kw => lower.includes(kw.toLowerCase()));
}

/**
 * Classify risk of a PR or opportunity.
 *
 * @param {object} opts
 * @param {string}   opts.title  — PR/issue title
 * @param {string}   [opts.body] — PR/issue body
 * @param {string[]} [opts.files] — changed file paths (filenames)
 * @param {string[]} [opts.labels] — existing label names
 * @returns {'low'|'medium'|'high'}
 */
function classifyRisk({ title = '', body = '', files = [], labels = [] }) {
  const rules = cfg.getClassifyRules();
  const text = `${title} ${body}`;

  // ── Explicit high-risk label override ────────────────────────────────────
  if (labels.some(l => l === 'security' || l === 'incident' || l === 'high-risk')) {
    return 'high';
  }

  // ── High-risk path patterns ───────────────────────────────────────────────
  if (filesMatchAny(files, rules.high_paths)) {
    return 'high';
  }

  // ── High-risk keywords ────────────────────────────────────────────────────
  if (textMatchesAny(text, rules.high_keywords)) {
    return 'high';
  }

  // ── Low-risk path patterns (ALL files must match) ─────────────────────────
  // If files list is non-empty and every file matches a low-risk path, it's low.
  if (files.length > 0 && files.every(f => filesMatchAny([f], rules.low_paths))) {
    return 'low';
  }

  // ── Low-risk keywords ─────────────────────────────────────────────────────
  if (textMatchesAny(text, rules.low_keywords)) {
    return 'low';
  }

  // ── Default: medium ───────────────────────────────────────────────────────
  return 'medium';
}

module.exports = { classifyRisk, matchGlob, filesMatchAny, textMatchesAny };
