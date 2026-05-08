'use strict';

const fs = require('fs');
const path = require('path');

function setOutput(name, value) {
  const safe = String(value).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${safe}\n`);
}

(function main() {
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();
  const name = process.env.INPUT_TEMPLATE_NAME;
  const vars = JSON.parse(process.env.INPUT_VARS_JSON || '{}');
  const file = path.join(ws, 'framework', 'prompts', `${name}.md`);
  let content = fs.readFileSync(file, 'utf8');
  const fm = content.match(/^---\n([\s\S]*?)\n---\n?/);
  const requiredVarsMatch = fm ? fm[1].match(/required_vars:\s*\[([^\]]*)\]/) : null;
  const requiredVars = requiredVarsMatch
    ? requiredVarsMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    : [];

  for (const reqVar of requiredVars) {
    if (!Object.prototype.hasOwnProperty.call(vars, reqVar)) {
      throw new Error(`Missing required template variable: ${reqVar}`);
    }
  }

  content = content.replace(/^---[\s\S]*?---\n?/, '');
  content = content.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    return Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : '';
  });

  setOutput('rendered', content.trim());
})();
