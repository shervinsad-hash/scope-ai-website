<!--
Sync Impact Report (temporary review material; remove before committing)
Version: unversioned scaffold -> 1.0.0 (initial project constitution).
Principles: replaced template slots with the nine agreed principles I-IX.
Added sections: Repository Baseline and Applicability; Delivery and Review.
Removed sections: none; generic template examples replaced with project rules.
Template compatibility: plan/spec templates support scope and acceptance evidence;
tasks-template.md makes tests optional unless requested by the specification.
Principle VI governs required verification despite that default. Templates unchanged.
Deferred placeholders: none. Intake implementation is outside this change.
-->
# Scope AI Website Constitution

## Core Principles

### I. Outcome and bounded scope

Every change MUST record its user outcome, explicit scope and exclusions, observable
acceptance criteria, and accountable reviewer. Consequential ambiguities MUST be resolved
before implementing affected behavior; unrelated authorized work may continue.

### II. Proportionate architecture

Changes MUST prefer suitable existing code, infrastructure and services. New frameworks,
dependencies, databases or agent(s) MUST have a recorded justification covering requirements,
maintainability, cost and operational needs. No technology or agent topology is mandatory.

### III. Maintainable implementation

Implementations MUST separate UI, business rules, validation and external integrations where
applicable, using clear names, explicit interfaces and consistent error handling. Separation
MUST suit the change; it does not require new layers without a purpose. Setup, configuration,
verification and deployment instructions MUST remain accurate for affected behavior.

### IV. Data and access boundaries

Changes MUST collect only necessary information and keep credentials and private data out
of source control, browser code and logs. Submissions MUST be validated and authorization
MUST be enforced at trusted server/service boundaries where those operations apply.
Browser validation alone MUST NOT be treated as a trusted enforcement boundary.

### V. Reliable outcomes

Submission success MUST be displayed only after the required submission is accepted into
the designated record system. Before implementing capture, define that system, acceptance
evidence, failure, retry and duplicate handling. Notification failure MUST NOT silently lose
captured requests: preserve the accepted record and define recovery and an accountable owner.
Opening an email draft MUST NOT be represented as submission or delivery success.

### VI. Evidence-based quality

Requirements MUST link to appropriate tests and reviewed acceptance evidence proportionate
to the change. Verification MUST cover important failure paths as well as successful behavior.
Agent-generated code, tests and completion claims MUST be verified against requirements and
the actual changed revision. Unexecuted checks MUST be identified. Tests MUST NOT be weakened
merely to obtain a passing result; changed expectations require a reviewed requirement change.

### VII. Controlled development and release

Development agent(s) authority MUST remain separate from production authority. Changes MUST
be reviewable and record executed checks, results and limitations. Production release MUST
have explicit approval from the authorized release owner and rollback or recovery appropriate
to the change. Development or constitution approval alone does not authorize release.

### VIII. Cost and effort visibility

Each increment MUST estimate and track AI/tool expenditure, human effort, review, rework and
recurring service costs separately, comparing estimates with observed results. Unknown costs
MUST be marked unverified, not assumed zero. Free-tier assumptions MUST remain unverified
until checked against applicable terms and expected usage. Paid services MUST NOT be
introduced without explicit approval from the accountable budget owner.

### IX. Learning and selective adoption

Each increment MUST capture execution gaps and review them after completion, recording
resulting decisions and owners. Apply Scope AI's adoption rule:

> Add a delivery practice when it resolves a named ambiguity, controls a credible failure, or improves a measurable outcome—and identify the evidence that will demonstrate its value.

Each adoption decision MUST identify the problem, expected value, evidence, cost/effort,
owner and review point. Simplify or retire optional practices without demonstrated value.

## Repository Baseline and Applicability

Inspection on 2026-10-29 established the following baseline, not production assurance:

- `dist/index.html`, `dist/style.css` and `dist/app.js` provide buildless HTML/CSS/JavaScript,
  responsive navigation, an architecture explorer, FAQs and contact email drafting.
  `netlify.toml` publishes `dist`; no server submission service, database or runtime agent
  is implemented in the inspected source.
- The contact form uses browser validation and opens a `mailto:` draft. The visitor must
  send it. There is no designated submission record system or capture acknowledgement.
  Principle V governs future capture; the current draft flow can remain with truthful copy.
- `README.md` reports an unprovisioned mailbox, untested email delivery, historical checks
  and a pending fresh hosting preview. These are documented limitations, not newly verified
  external conditions. The homepage retains `noindex,nofollow`, which is not access control.
- No tracked test suite, CI workflow, cost ledger or executed release-control evidence was
  found. `dist/app.js` combines interaction and email-draft logic. The principles define
  standards for affected future work; they do not certify existing controls or require an
  immediate rewrite. Preserve existing functionality unless an approved scope changes it.

Applicable methodology was accessible in the private
[Scope AI knowledge repository](https://github.com/shervinsad-hash/scope-ai-knowledge),
reviewed on 2026-10-29:
[delivery standard](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/agentic-delivery-standard.md),
[development guidance](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/engineering/ai-enabled-software-development.md),
[design paths](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/architecture/solution-classification.md),
[estimation](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/solution-estimation-and-pricing.md)
and [practice adoption](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/governance/practice-adoption.md).
These procedures describe draft guidance, not institutional approval or implemented capability;
the adoption rule is recorded there as endorsed. This constitution adopts the agreed project
principles, not every external procedure. Intake implementation remains a separate change.

## Delivery and Review

Use the smallest sufficient task/specification and review record. Before affected implementation,
record scope, acceptance examples, reviewer, applicable boundaries, design decisions, verification
and cost assumptions. Before acceptance, link requirements to the changed revision, executed
checks and reviewed results; record gaps and resolve blocking findings. Before release, record
the release owner's explicit approval, operational ownership and rollback/recovery instructions.
One person may hold multiple roles, but each decision and its accountable owner MUST be clear.

## Governance

This constitution governs project work over conflicting template defaults. In particular,
`.specify/templates/tasks-template.md` makes tests optional unless requested by the specification;
that default MUST NOT bypass Principle VI. Record justified non-applicability and alternative
evidence rather than silently omitting verification. No templates are amended by this change.

Amendments MUST be reviewable changes stating the reason, affected principles, impact on
existing behavior and work, migration needs, and supporting evidence. The Scope AI project
owner, or an explicitly delegated governance reviewer, MUST approve amendments before adoption.
Review compliance during planning, change acceptance and release; record any exception's scope,
reason, consequences, compensating measures, authorized approver, owner and review trigger.
Exceptions cannot waive controls outside the approver's authority or substitute for required
release or paid-service approval. Unresolved blocking findings prevent the affected release.

Use semantic versioning: MAJOR for incompatible principle removals or redefinitions; MINOR
for added principles or materially expanded guidance; PATCH for non-semantic clarifications.
Record the version rationale and amendment date; preserve the original ratification date.
Initial adoption uses the user's agreed principles and instruction to create this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
