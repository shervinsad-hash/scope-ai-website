import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const cli = path.join(root, 'factory/cli.mjs');

test('rehearsal creates reviewable stage artifacts without a website', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-factory-'));
  const output = path.join(directory, 'rehearsal');
  const result = spawnSync(process.execPath, [cli, 'rehearse', '--output', output], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  for (const stage of ['architecture', 'tasks', 'candidate', 'verification']) {
    assert.ok(fs.existsSync(path.join(output, stage, 'result.json')));
    assert.ok(fs.existsSync(path.join(output, stage, 'summary.md')));
  }
  const intake = JSON.parse(fs.readFileSync(path.join(output, 'intake/result.json')));
  const verification = JSON.parse(fs.readFileSync(path.join(output, 'verification/result.json')));
  assert.equal(intake.status, 'pending-human-approval');
  assert.equal(verification.status, 'simulation-pending-human-approval');
  fs.rmSync(directory, { recursive: true, force: true });
});

test('stage transitions require named human approval', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-factory-'));
  const output = path.join(directory, 'run');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args, '--output', output], { encoding: 'utf8' });
  assert.equal(run('start', '--requirement', 'Build a thing', '--scope', 'Only the thing').status, 0);
  assert.notEqual(run('run', '--stage', 'architecture').status, 0);
  assert.equal(run('review', '--stage', 'intake', '--decision', 'approve', '--reviewer', 'Reviewer').status, 0);
  assert.equal(run('run', '--stage', 'architecture').status, 0);
  const artifact = JSON.parse(fs.readFileSync(path.join(output, 'architecture/result.json')));
  assert.equal(artifact.status, 'pending-human-approval');
  fs.rmSync(directory, { recursive: true, force: true });
});

test('approval records the exact digest and rejection preserves history on revision', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-factory-'));
  const output = path.join(directory, 'run');
  const run = (...args) => spawnSync(process.execPath, [cli, ...args, '--output', output], { encoding: 'utf8' });
  assert.equal(run('start', '--requirement', 'Build a thing', '--scope', 'Only the thing').status, 0);
  assert.equal(run('review', '--stage', 'intake', '--decision', 'reject', '--reviewer', 'Reviewer', '--notes', 'Clarify scope').status, 0);
  assert.equal(run('run', '--stage', 'architecture').status, 1);
  assert.equal(run('revise', '--stage', 'intake', '--requirement', 'Build a clearer thing', '--scope', 'Only the clearer thing').status, 0);
  // The rejected artifact remains immutable audit evidence in history.
  const intake = JSON.parse(fs.readFileSync(path.join(output, 'intake/result.json')));
  assert.equal(intake.status, 'pending-human-approval');
  assert.equal(fs.readdirSync(path.join(output, 'history')).length, 1);
  fs.rmSync(directory, { recursive: true, force: true });
});

test('rehearsal refuses to overwrite existing output by default', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-factory-'));
  const result = spawnSync(process.execPath, [cli, 'rehearse', '--output', directory], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  fs.rmSync(directory, { recursive: true, force: true });
});
