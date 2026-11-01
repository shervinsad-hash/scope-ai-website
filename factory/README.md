# Provider-neutral software factory

This directory is the reusable factory. It is independent of website files, build systems,
frameworks, and AI providers.

## Stage-gated workflow

Requirements: Node.js 22+ and Git. No package installation, API key, or GitHub authentication is needed.

Every workflow starts with a high-level requirement and explicit scope. Each stage writes a clear
input/output artifact and stops in `pending-human-approval`. The next stage cannot run until the
previous artifact is approved by a named reviewer.

The stage design borrows the useful Spec Kit pattern without requiring Spec Kit: intake follows
`specify`, architecture follows `plan`, stories follow `tasks`, candidate work follows `implement`,
and verification follows a review/checklist gate. The factory adds explicit file ownership,
dependency order, requirements-to-evidence traceability, and release separation.

```powershell
node factory/cli.mjs start --output .factory-run --requirement "Describe the desired outcome" --scope "State what is in and out of scope"
  node factory/cli.mjs review --output .factory-run --stage intake --decision approve --reviewer "Your Name"
node factory/cli.mjs run --output .factory-run --stage architecture
  node factory/cli.mjs review --output .factory-run --stage architecture --decision approve --reviewer "Your Name"
node factory/cli.mjs run --output .factory-run --stage tasks
  node factory/cli.mjs review --output .factory-run --stage tasks --decision approve --reviewer "Your Name"
node factory/cli.mjs run --output .factory-run --stage candidate
  node factory/cli.mjs review --output .factory-run --stage candidate --decision approve --reviewer "Your Name"
node factory/cli.mjs run --output .factory-run --stage verification
  node factory/cli.mjs review --output .factory-run --stage verification --decision approve --reviewer "Your Name"
  node factory/cli.mjs run --output .factory-run --stage release
  node factory/cli.mjs review --output .factory-run --stage release --decision approve --reviewer "Release Owner"
```

Use `summary.md`, `result.json`, and `review.md` inside each stage directory to review and adjust the workflow.
An approval records the reviewer, timestamp, notes, and exact artifact digest. Rejected work can be regenerated
with `--revise`; the prior revision is preserved under `history/`. Approvals are never inferred from a passing test.

## Local rehearsal

```powershell
node factory/cli.mjs rehearse --output .factory-rehearsal
node --test factory/tests/*.test.mjs
```

The rehearsal previews every stage as simulation artifacts, but marks each one as requiring human
approval. It makes no model calls and no remote writes. Use `--force` only when intentionally
replacing an existing rehearsal directory.

## Workflow

```text
High-level requirement + scope
  -> human approval
  -> architecture
  -> human approval
  -> task breakdown
  -> human approval
  -> candidate implementation
  -> human approval
  -> verification
  -> human approval and optional publication
```

The factory never treats a green check as release approval. Host repositories provide their own
build, lint, browser, integration, and requirement-specific acceptance checks.

When present, a host repository constitution or project policy is an optional architecture input.
It is used as a review check, not silently replaced or amended by the factory.

## Reuse in another repository

Copy `factory/` and the factory CI workflow. Keep repository-specific checks in that repository's
own CI workflow. Do not add assumptions about `dist/`, HTML, contact forms, or a particular language.
