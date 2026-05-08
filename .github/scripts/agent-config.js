/**
 * agent-config.js — Centralized agent configuration loader.
 * Load via: const cfg = require(`${process.env.GITHUB_WORKSPACE}/.github/scripts/agent-config.js`);
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(
  process.env.GITHUB_WORKSPACE || path.join(__dirname, '..', '..'),
  'config',
  'agents.config.json'
);

let _config = null;

function loadConfig() {
  if (!_config) {
    _config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  }
  return _config;
}

// ── Owner ───────────────────────────────────────────────────────────────────

function getOwner() {
  return loadConfig().owner.primary;
}

function getBackupApprovers() {
  return loadConfig().owner.backup_approvers || [];
}

function getDecisionSlaHours() {
  return loadConfig().owner.decision_sla_hours;
}

function getAutoApproveAfterHours() {
  return loadConfig().owner.auto_approve_after_hours;
}

// ── Autonomy tiers ───────────────────────────────────────────────────────────

function getTiers() {
  return loadConfig().autonomy.tiers;
}

function getTier(name) {
  return loadConfig().autonomy.tiers[name];
}

function getClassifyRules() {
  return loadConfig().autonomy.auto_classify_rules;
}

// ── Circuit breakers ─────────────────────────────────────────────────────────

function getCircuitBreakers() {
  return loadConfig().circuit_breakers;
}

function getMaxAutoMergesPerDay() {
  return loadConfig().circuit_breakers.max_auto_merges_per_day;
}

function getMaxDispatcherIssuesPerDay() {
  return loadConfig().circuit_breakers.max_dispatcher_issues_per_day;
}

function getMaxIncidentsPerHour() {
  return loadConfig().circuit_breakers.max_incidents_per_hour;
}

function getMaxHopCount() {
  return loadConfig().circuit_breakers.max_hop_count;
}

function getMaxCommitteeDecisionsPerDay() {
  return loadConfig().circuit_breakers.max_committee_decisions_per_day;
}

// ── Copilot assignment ───────────────────────────────────────────────────────

function getCopilotConfig() {
  return loadConfig().copilot;
}

function getCopilotLogins() {
  return loadConfig().copilot.assignment_logins;
}

function getCopilotAssignmentAttempts() {
  return loadConfig().copilot.assignment_attempts;
}

module.exports = {
  loadConfig,
  getOwner,
  getBackupApprovers,
  getDecisionSlaHours,
  getAutoApproveAfterHours,
  getTiers,
  getTier,
  getClassifyRules,
  getCircuitBreakers,
  getMaxAutoMergesPerDay,
  getMaxDispatcherIssuesPerDay,
  getMaxIncidentsPerHour,
  getMaxHopCount,
  getMaxCommitteeDecisionsPerDay,
  getCopilotConfig,
  getCopilotLogins,
  getCopilotAssignmentAttempts,
};
