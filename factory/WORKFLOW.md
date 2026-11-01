# Factory workflow contract

## Inputs

Every run starts with a high-level requirement and explicit in-scope and out-of-scope boundaries.
Optional project inputs include a constitution or policy, repository structure, and project checks.

## Stage contract

| Stage | Input | Output | Gate |
| --- | --- | --- | --- |
| Intake | Requirement and scope | Specification | Human approval |
| Architecture | Approved specification | Plan | Human approval |
| Tasks | Approved plan and specification | Stories and task dependencies | Human approval |
| Candidate | Approved story | Isolated candidate change | Human approval |
| Verification | Approved candidate and acceptance criteria | Evidence and limitations | Human approval |
| Release | Approved verification and candidate revision | Release decision and rollback plan | Release-owner approval |

Each output contains a human-readable summary, machine-readable JSON envelope, review checklist, and
canonical artifact digest. Approval records the reviewer, decision, notes, timestamp, and reviewed digest.

## Failure and change behavior

Failures stop the workflow and preserve evidence. A rejected stage may be revised with `--revise`; the
previous artifact is archived under `history/`. A changed upstream artifact requires downstream stages to
be regenerated and re-approved. No automatic fallback or approval is allowed.

## Authority boundaries

Providers are optional untrusted adapters. They receive only approved stage input and return structured
data. They do not receive inherited credentials or permission to publish, merge, deploy, or release.
