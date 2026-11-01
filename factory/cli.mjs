#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const FACTORY_VERSION = '0.2.0';
const STAGES = ['intake', 'architecture', 'tasks', 'candidate', 'verification', 'release'];
const PREVIOUS = { intake: null, architecture: 'intake', tasks: 'architecture', candidate: 'tasks', verification: 'candidate', release: 'verification' };
const STAGE_IO = {
  intake: { input: 'High-level requirement and scope supplied by the requester.', output: 'A bounded specification with prioritized user stories, edge cases, requirements, success criteria, assumptions, and open clarifications.' },
  architecture: { input: 'Approved specification.', output: 'A plan with technical context, constitution/policy check, project structure, components, boundaries, dependencies, risks, and design decisions.' },
  tasks: { input: 'Approved plan and specification.', output: 'Dependency-ordered tasks grouped by independently testable user story, with exact paths, ownership, acceptance criteria, and parallel-work markers.' },
  candidate: { input: 'Approved task/story and its acceptance criteria.', output: 'A candidate change limited to approved ownership, with tests or evidence mapped to the story and a checkpoint-ready implementation.' },
  verification: { input: 'Approved candidate change, specification, plan, tasks, and acceptance criteria.', output: 'A requirements-to-evidence review covering success and failure paths, executed checks, limitations, cost/effort notes, and release recommendation.' }
  ,release: { input: 'Approved verification evidence and candidate revision.', output: 'An explicit release-owner decision with rollout, rollback, and operational ownership.' }
};

const REVIEW_CHECKS = {
  intake: ['Outcome and scope are explicit', 'In-scope and out-of-scope boundaries are recorded', 'User stories are prioritized and independently testable', 'Acceptance scenarios, edge cases, success criteria, and assumptions are reviewed', 'Open clarifications are resolved or explicitly accepted'],
  architecture: ['Plan traces to the approved specification', 'Constitution or project policy check is complete when available', 'Project structure and technology choices are justified', 'Boundaries, dependencies, risks, and complexity are explicit'],
  tasks: ['Every task has an exact ownership path', 'Tasks map to requirements and user stories', 'Dependencies and parallel opportunities are explicit', 'Acceptance criteria and required tests are present', 'Foundational work blocks dependent stories'],
  candidate: ['Only approved files and operations are changed', 'Implementation follows the approved task and plan', 'Tests are written or justified before claiming completion', 'The story is independently demonstrable at the checkpoint'],
  verification: ['Every requirement maps to executed evidence or a documented gap', 'Important failure paths were checked', 'Unexecuted checks and limitations are visible', 'Cost, effort, rework, and release ownership are recorded', 'Release approval is separate from development verification'],
  release: ['The exact verified candidate revision is identified', 'Release owner is accountable', 'Rollout and rollback/recovery plans are explicit', 'Operational ownership and monitoring are identified', 'Release decision is separate from implementation approval']
};

function usage() {
  console.log(`Scope AI software factory\n\nCommands:\n  start --output <directory> --requirement <text> --scope <text> [--force]\n  run --output <directory> --stage <stage> [--revise]\n  review --output <directory> --stage <stage> --decision <approve|reject> --reviewer <name> [--notes <text>]\n  approve --output <directory> --stage <stage> --reviewer <name> [--notes <text>]\n  revise --output <directory> --stage <stage> [stage-specific inputs]\n  rehearse --output <directory> [--force]\n  help\n\nStages: ${STAGES.join(' -> ')}`);
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash('sha256').update(canonical(value)).digest('hex');
}

function stageFile(output, stage) {
  return path.join(output, stage, 'result.json');
}

function writeStage(output, stage, status, input, outputDescription, details = {}) {
  const directory = path.join(output, stage);
  fs.mkdirSync(directory, { recursive: true });
  const artifact = {
    factoryVersion: FACTORY_VERSION,
    stage,
    status,
    simulation: true,
    input,
    output: outputDescription,
    ...details
  };
  artifact.artifactDigest = digest(artifact);
  writeJson(path.join(directory, 'result.json'), artifact);
  fs.writeFileSync(path.join(directory, 'summary.md'), `# ${stage}\n\nStatus: **${status}**\n\n## Input\n\n${input}\n\n## Output\n\n${outputDescription}\n\nHuman approval is required before the next stage.\n`);
  fs.writeFileSync(path.join(directory, 'review.md'), `# Review checklist: ${stage}\n\nMark each item only after human review. A passing checklist is not automatic release approval.\n\n${REVIEW_CHECKS[stage].map((check, index) => `- [ ] ${index + 1}. ${check}`).join('\n')}\n\nDecision: pending\nReviewer: pending\nNotes: pending\n`);
}

function requireOption(args, name) {
  const index = args.indexOf(name);
  if (index < 0 || !args[index + 1]) throw new Error(`${name} is required`);
  return args[index + 1];
}

function createIntake(output, requirement, scope) {
  writeStage(output, 'intake', 'pending-human-approval', `Requirement: ${requirement}\n\nScope: ${scope}`, STAGE_IO.intake.output, { requirement, scope, approvals: [] });
}

function start(args) {
  const output = path.resolve(ROOT, requireOption(args, '--output'));
  const requirement = requireOption(args, '--requirement');
  const scope = requireOption(args, '--scope');
  if (fs.existsSync(output) && !args.includes('--force')) throw new Error(`Output exists; use --force or choose a new directory: ${output}`);
  if (fs.existsSync(output)) fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  createIntake(output, requirement, scope);
  writeJson(path.join(output, 'result.json'), { factoryVersion: FACTORY_VERSION, status: 'pending-human-approval', currentStage: 'intake' });
  console.log(`Intake created for human approval: ${path.relative(ROOT, output) || '.'}`);
}

function approve(args) {
  return review(['--decision', 'approve', ...args]);
}

function review(args) {
  const output = path.resolve(ROOT, requireOption(args, '--output'));
  const stage = requireOption(args, '--stage');
  const reviewer = requireOption(args, '--reviewer');
  const decision = requireOption(args, '--decision');
  if (!['approve', 'reject'].includes(decision)) throw new Error('--decision must be approve or reject');
  if (!STAGES.includes(stage)) throw new Error(`Unknown stage: ${stage}`);
  const file = stageFile(output, stage);
  if (!fs.existsSync(file)) throw new Error(`Stage output does not exist: ${stage}`);
  const artifact = readJson(file);
  if (artifact.status !== 'pending-human-approval') throw new Error(`Stage is not awaiting approval: ${stage}`);
  const notes = args.includes('--notes') ? requireOption(args, '--notes') : '';
  artifact.status = decision === 'approve' ? 'approved' : 'rejected';
  artifact.approvals = [...(artifact.approvals ?? []), { reviewer, decision, notes, reviewedDigest: artifact.artifactDigest, reviewedAt: new Date().toISOString() }];
  writeJson(file, artifact);
  fs.appendFileSync(path.join(output, stage, 'summary.md'), `\nDecision: **${decision}** by **${reviewer}** for digest \`${artifact.artifactDigest}\`.\nNotes: ${notes || '(none)'}\n`);
  console.log(`${decision === 'approve' ? 'Approved' : 'Rejected'}: ${stage}`);
}

function runStage(args) {
  const output = path.resolve(ROOT, requireOption(args, '--output'));
  const stage = requireOption(args, '--stage');
  if (!STAGES.includes(stage) || stage === 'intake') throw new Error(`run supports architecture, tasks, candidate, verification, or release`);
  const previous = PREVIOUS[stage];
  const previousFile = stageFile(output, previous);
  if (!fs.existsSync(previousFile)) throw new Error(`Human approval required for previous stage: ${previous}`);
  const previousArtifact = readJson(previousFile);
  if (previousArtifact.status !== 'approved') throw new Error(`Human approval required for previous stage: ${previous}`);
  const existing = stageFile(output, stage);
  if (fs.existsSync(existing)) {
    const existingArtifact = readJson(existing);
    if (existingArtifact.status !== 'rejected' || !args.includes('--revise')) throw new Error(`Stage already exists; use --revise only after rejection: ${stage}`);
    const archive = path.join(output, 'history', `${stage}-${existingArtifact.artifactDigest}`);
    fs.mkdirSync(path.dirname(archive), { recursive: true });
    fs.renameSync(path.dirname(existing), archive);
  }
  const io = STAGE_IO[stage];
  writeStage(output, stage, 'pending-human-approval', `Approved ${previous} artifact: ${previous}/result.json (digest ${previousArtifact.artifactDigest})`, io.output, { approvals: [], upstreamDigest: previousArtifact.artifactDigest });
  console.log(`Stage generated and awaiting human approval: ${stage}`);
}

function revise(args) {
  const output = path.resolve(ROOT, requireOption(args, '--output'));
  const stage = requireOption(args, '--stage');
  const file = stageFile(output, stage);
  if (!fs.existsSync(file) || readJson(file).status !== 'rejected') throw new Error(`Only rejected stages can be revised: ${stage}`);
  const old = readJson(file);
  const archive = path.join(output, 'history', `${stage}-${old.artifactDigest}`);
  fs.mkdirSync(path.dirname(archive), { recursive: true });
  fs.renameSync(path.dirname(file), archive);
  if (stage === 'intake') {
    createIntake(output, requireOption(args, '--requirement'), requireOption(args, '--scope'));
    console.log('Revised intake generated and awaiting human approval');
    return;
  }
  runStage([...args.filter(arg => arg !== '--stage' && arg !== stage), '--stage', stage, '--revise']);
}

function rehearse(args) {
  const outputFlag = args.indexOf('--output');
  if (outputFlag < 0 || !args[outputFlag + 1]) throw new Error('rehearse requires --output <directory>');
  const output = path.resolve(ROOT, args[outputFlag + 1]);
  if (fs.existsSync(output) && !args.includes('--force')) throw new Error(`Output exists; use --force or choose a new directory: ${output}`);
  if (fs.existsSync(output)) fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  createIntake(output, 'Example high-level requirement for rehearsal', 'Example scope boundary for rehearsal');
  for (const stage of STAGES.slice(1)) writeStage(output, stage, 'simulation-pending-human-approval', `Preview of approved ${PREVIOUS[stage]} output`, STAGE_IO[stage].output, { approvals: [] });
  writeJson(path.join(output, 'result.json'), { factoryVersion: FACTORY_VERSION, simulation: true, status: 'review-required', stages: STAGES });
  console.log(`Rehearsal complete: ${path.relative(ROOT, output) || '.'}`);
}

const [command = 'help', ...args] = process.argv.slice(2);
try {
  if (command === 'help' || command === '--help') usage();
  else if (command === 'start') start(args);
  else if (command === 'run') runStage(args);
  else if (command === 'approve') approve(args);
  else if (command === 'review') review(args);
  else if (command === 'revise') revise(args);
  else if (command === 'rehearse') rehearse(args);
  else throw new Error(`Unknown command: ${command}`);
} catch (error) {
  console.error(`Factory error: ${error.message}`);
  process.exitCode = 1;
}
