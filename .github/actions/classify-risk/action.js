'use strict';

const fs = require('fs');
const path = require('path');

function matchGlob(pattern, filePath) {
  const p = filePath.replace(/\\/g, '/');
  const regexStr = pattern
    .replace(/\\/g, '/')
    .replace(/[\\/.+^${}()|[\]]/g, '\\$&')
    .replace(/\*\*/g, '__DS__')
    .replace(/\*/g, '[^/]*')
    .replace(/__DS__/g, '.*');
  return new RegExp(`^${regexStr}$`).test(p);
}

function textMatchesAny(text, keywords) {
  const lower = (text || '').toLowerCase();
  return (keywords || []).filter(k => lower.includes(String(k).toLowerCase()));
}

function setOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

(function main() {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const cfgPath = path.join(ws, 'config', 'agents.config.json');
  const cfg = fs.existsSync(cfgPath)
    ? JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
    : { autonomy: { auto_classify_rules: { high_paths: [], high_keywords: [], low_paths: [], low_keywords: [] } } };

  const rules = cfg.autonomy?.auto_classify_rules || {};
  const title = process.env.INPUT_TITLE || '';
  const body = process.env.INPUT_BODY || '';
  const files = JSON.parse(process.env.INPUT_FILES || '[]');
  const labels = JSON.parse(process.env.INPUT_LABELS || '[]');
  const text = `${title} ${body}`;

  const matched = { label_overrides: [], high_paths: [], high_keywords: [], low_paths: [], low_keywords: [] };

  for (const l of labels) {
    if (['security', 'incident', 'high-risk'].includes(l)) matched.label_overrides.push(l);
  }

  for (const f of files) {
    for (const p of (rules.high_paths || [])) if (matchGlob(p, f)) matched.high_paths.push(p);
    for (const p of (rules.low_paths || [])) if (matchGlob(p, f)) matched.low_paths.push(p);
  }

  matched.high_keywords = textMatchesAny(text, rules.high_keywords || []);
  matched.low_keywords = textMatchesAny(text, rules.low_keywords || []);

  let tier = 'medium';
  if (matched.label_overrides.length || matched.high_paths.length || matched.high_keywords.length) {
    tier = 'high';
  } else if (files.length > 0 && files.every(f => (rules.low_paths || []).some(p => matchGlob(p, f)))) {
    tier = 'low';
  } else if (matched.low_keywords.length) {
    tier = 'low';
  }

  setOutput('tier', tier);
  setOutput('matched_rules', JSON.stringify(matched));
})();
