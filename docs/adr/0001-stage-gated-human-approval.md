# ADR-0001: Stage-gated human approval for software factory work

## Status

Accepted

## Context

The factory must support different software types while keeping requirements, design, implementation,
verification, and release decisions reviewable. Automated generation can be useful, but a passing check
does not establish that the requested outcome, scope, or business decision is correct.

## Decision

The factory uses the sequence intake/specification, architecture/plan, tasks, candidate implementation,
verification, and release. Each stage has explicit input and output documents and stops for named human
approval. Approval records the artifact's canonical SHA-256 digest. A changed upstream artifact invalidates
downstream work. Rejected work is preserved in history and must be revised and reviewed again.

The factory is provider-neutral and dry-run by default. It creates isolated candidate work and draft review
artifacts; it does not merge, deploy, or release automatically. Host repositories supply their own build,
lint, integration, browser, and requirement-specific checks.

## Consequences

Positive:

- Requirements and scope are reviewed before technical decisions.
- Stale approvals and hidden scope expansion are detectable.
- Different languages and repository layouts can use the same factory contract.
- Release authority remains separate from development automation.

Costs and trade-offs:

- The workflow is slower because every stage pauses for review.
- A host repository must provide project-specific checks.
- Provider adapters and live publication require separate security and cost review.
