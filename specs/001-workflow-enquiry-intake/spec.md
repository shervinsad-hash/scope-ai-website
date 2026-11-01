# Feature Specification: Workflow Enquiry Intake

**Feature Branch**: `feature/intake-capture` (existing branch; no branch created)

**Created**: 2026-10-29

**Status**: Conditionally approved — planning, investigation and bounded mocked development authorized

**Input**: Visitor submits a workflow enquiry; Scope AI records a lead in its Notion business
workspace and notifies Shervin at `shervin@scopeai.ca` for manual review and follow-up.

**Accountable acceptance reviewer**: Shervin Sadeghi, Scope AI project owner.

**Business brief**: [requirements.md](https://github.com/shervinsad-hash/scope-ai-website/blob/feature/intake-capture/specs/001-workflow-enquiry-intake/requirements.md) serves the intent-document purpose;
this specification remains authoritative for detailed requirements and acceptance scenarios.
See the [delivery document map](https://github.com/shervinsad-hash/scope-ai-website/blob/feature/intake-capture/docs/delivery.md) for remaining artifacts and approval-evidence gaps.

**Governing document**: [Project constitution v1.0.0](https://github.com/shervinsad-hash/scope-ai-website/blob/feature/intake-capture/.specify/memory/constitution.md).
This document specifies future behavior; it does not establish implemented controls or service readiness.

**Reviewer decision — 2026-10-30**: Shervin approved Story 1's business intent: a visitor
submits without an account, the enquiry becomes a private Notion lead, and confirmation
appears only after that lead is recorded. Field limits, owner/status mapping
and other proposed assumptions remain subject to review. At this review, Stories 2–3 were
not yet approved. This decision does not close Q1–Q8, authorize implementation or
provisioning, or approve release. Subsequent decisions are recorded below.

**Reviewer field decision — 2026-10-30**: Shervin directed that Organization be named
Company and be required. The reviewed field set is name, email, Company, workflow/problem
and desired outcome, all required. Workflow/problem guidance must welcome an existing or
new workflow or a general description of what the visitor is looking for. Desired outcome
guidance must explain the intended achievement, with examples such as improved quality
or efficiency. This resolves field naming/requiredness and the guidance intent within Q1;
field limits, other validation rules, privacy wording and response messages remain open.

**Reviewer Story 2 decision — 2026-10-30**: Shervin approved notification and manual review:
after a lead is recorded in Notion, email `shervin@scopeai.ca` with its reference and a private
record link, keeping enquiry details out of the email. Shervin reviews the lead and records
follow-up in Notion; sending a notification does not mark the lead reviewed. The notification
service, mailbox readiness, Notion destination/permissions and operational mappings remain
open for investigation. This is approval of business behavior, not verified integration
readiness, authorization to implement/provision, or production release approval.

**Reviewer scope decision — 2026-10-30**: Shervin requested the simplest first-release
failure behavior: if recording fails, show an actionable error and retain entered values
while the page stays open. Story 3 is reduced accordingly. Automatic retries, guaranteed
duplicate prevention, automatic reconciliation and advanced recovery are deferred.
Remaining constitutional handling is documented below as minimal manual operations,
not additional automated recovery features or approval to implement/release.

**Reviewer owner/status decision — 2026-10-30**: Shervin approved himself as the initial
lead owner and New as the initial status, with manual status updates after review. These
business defaults are settled; mapping them to the actual Notion owner identity and status
property remains an integration verification item under Q2. This decision does not approve
other unresolved policies, authorize implementation/provisioning, or approve release.

**Conditional development approval — 2026-10-30**: Shervin approved the agreed business
scope and authorized planning, technical investigation and development of settled form
behavior using synthetic data and mocked integrations. Keep unresolved decisions explicit
and pause only the work that depends on them. Live service provisioning, paid services
and production release are not approved. Earlier review entries describe their narrower
approval at that time; this decision supplies the bounded development authority.

## User Scenarios & Testing *(mandatory)*

Stories 1–3 are ordered P1 capabilities of one minimum releasable feature. Each can be tested
separately with controlled fixtures, but releasing capture without notification and basic error handling
would not satisfy the business outcome. Acceptance uses synthetic enquiries, not private leads
in the public repository. Scenario labels provide requirement-to-evidence references.

### User Story 1 - Submit and confirm a workflow enquiry (Priority: P1)

As a visitor, I describe my workflow and intended outcome so Scope AI can review my enquiry
without requiring an account or a separate email application.

**Why this priority**: A recoverable business record is the foundation of follow-up.

**Independent Test**: Submit a synthetic enquiry and compare its confirmation with the accepted
lead in the authorized record destination; notification may be tested separately.

**Acceptance Scenarios**:

1. **S1-A**: **Given** valid name, email, Company, workflow/problem and desired
   outcome, **When** the visitor submits, **Then** one lead contains the submitted information,
   a unique reference, trusted submission timestamp, Shervin as owner and initial status New;
   only after Notion accepts that lead does the visitor see confirmation with the same reference.
2. **S1-B**: **Given** missing required information, whitespace-only required text, malformed
   email or text exceeding the approved field limits, **When** submission is attempted,
   **Then** specific accessible errors explain what to correct, entered values remain available
   for correction, and no lead or notification is created. Bypassing browser checks produces
   the same rejection at the trusted submission boundary.
3. **S1-C**: **Given** a keyboard-only or mobile visitor, **When** they complete and submit the
   form, **Then** labels, errors, progress and the resulting confirmation are perceivable and
   usable without relying solely on color or a mouse.
4. **S1-D**: **Given** the visitor uses the revised contact section, **When** they also use
   navigation, architecture descriptions, FAQs and other existing page links,
   **Then** those functions and responsive layouts continue to work.
5. **S1-E**: **Given** a visitor exploring an existing workflow, a new workflow or a general
   need, **When** they read the form guidance, **Then** it explains what to enter for
   workflow/problem and desired outcome using the wording below. General needs and
   qualitative goals are accepted without requiring a documented process or numerical target.

---

### User Story 2 - Receive and review a recorded lead (Priority: P1)

As Shervin, I receive a notification identifying a recorded lead and review its details privately
in Notion so I can decide how to follow up manually.

**Why this priority**: Captured enquiries must reach their accountable owner.

**Independent Test**: Use an accepted synthetic lead to verify notification receipt at the
specified mailbox and authorized access to the corresponding lead.

**Acceptance Scenarios**:

1. **S2-A**: **Given** a lead has been accepted in Notion, **When** notification succeeds,
   **Then** Shervin receives an email at `shervin@scopeai.ca` identifying its reference and
   linking to its private record. No notification is initiated before record acceptance.
2. **S2-B**: **Given** Shervin has authorized workspace access, **When** he opens the lead,
   **Then** he can read the enquiry, identify its owner and status, and update status or
   record manual follow-up using the existing business workspace; no new reviewer portal is required.
3. **S2-C**: **Given** a visitor or unauthorized person has a lead reference or notification
   link, **When** they attempt to read or change a lead, **Then** private enquiry details and
   review actions remain unavailable. A reference alone grants no record access.

---

### User Story 3 - Keep entered values when recording fails (Priority: P1)

As a visitor, I want an actionable error without losing what I entered if my enquiry
cannot be recorded.

**Why this priority**: Visitors must understand the failure and retain their work.

**Independent Test**: Cause recording to fail and inspect the error and form values.

**Acceptance Scenarios**:

1. **S3-A**: **Given** the visitor has completed the form, **When** recording fails,
   **Then** show an actionable error, retain entered values while the page stays open,
   and do not display success. No automatic retry or cross-session recovery is required.

### Edge Cases

- Recording outcome unknown after a timeout: do not claim success or definitive failure;
  show that recording could not be confirmed, keep entered values and offer a contact action.
  Automatic reconciliation is deferred; the manual procedure must acknowledge duplicate risk.
- Access revoked, record fields changed, service limits exhausted or abuse controls triggered:
  no false confirmation; operational diagnosis must not expose private payloads to visitors or logs.
- Names with accents, punctuation and non-Latin characters; multiline workflow descriptions;
  markup-like input: preserve legitimate text and display it safely without executing it.
- Repeated submissions may create separate leads in this release; Shervin handles duplicates
  during manual review. Do not overwrite earlier enquiries or suppress new ones based on email alone.
- Notification fails or processing stops after capture: preserve the accepted lead. The minimum
  manual fallback is for Shervin to inspect New leads directly in Notion rather than rely solely
  on email. No automatic resend, delivery-tracking service or recovery queue is required.
- Reloading or closing the page may lose unsent form values; persistence across sessions is deferred.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The contact journey MUST require name, email, Company, workflow/problem and
  desired outcome. Company replaces the proposed Organization label. Workflow/problem and
  desired outcome MUST have visible, accessible guidance associated with their fields;
  guidance MUST remain available while entering text, rather than appearing only as placeholder text.
  Workflow/problem MUST accept an existing workflow, a planned workflow or a general need;
  desired outcome MUST accept qualitative goals without requiring numerical targets.

  Visitor-facing field guidance:
  - **Workflow/problem**: "Describe an existing workflow you want to improve, a new workflow
    you want to create, or generally what you are looking for help with."
  - **Desired outcome**: "What would you like to achieve? For example, improve quality,
    increase efficiency, save time, reduce errors, or improve the customer experience."
- **FR-002**: Validation MUST reject missing required values, whitespace-only required text,
  malformed email and values beyond approved limits at a trusted boundary. Invalid or rejected
  enquiries MUST NOT trigger lead creation or notification. Errors MUST identify correctable fields.
- **FR-003**: An accepted enquiry MUST create a lead in the designated private Scope AI Notion
  destination with all supplied fields, a unique reference, trusted submission timestamp,
  Shervin as owner and status New. Field mapping and owner identity require Q2 verification.
- **FR-004**: Visitor confirmation MUST follow Notion acceptance and show the lead reference.
  It MUST say the enquiry was received for manual review without promising a response deadline,
  feasibility decision or quotation. A temporary intermediary receipt alone is not success.
- **FR-005**: After capture, the system MUST notify `shervin@scopeai.ca` with a reference and
  private record link. The minimum notification MUST omit the enquiry body and visitor email;
  any additional personal information requires an approved need. Receipt must be demonstrated
  before release; sending-service acceptance alone does not prove receipt.
- **FR-006**: Authorized Shervin access MUST support private review and manual follow-up/status
  updates in the business workspace. Lead status MUST remain separate from notification state;
  opening or sending a notification MUST NOT mark the lead reviewed or followed up.
- **FR-007**: First-release duplicate handling is manual: repeated submissions may create
  separate leads, which Shervin reviews without overwriting earlier enquiries. The same email
  MUST remain usable for new enquiries. Guaranteed duplicate prevention is deferred.
- **FR-008**: If recording fails, the system MUST show an actionable error and retain entered
  values while the page stays open. It MUST NOT claim success without confirmed Notion acceptance.
  If the outcome is unknown, say it could not be confirmed rather than claiming nothing was saved.
  No automatic retries are required. After a confirmed failure the visitor may retry manually;
  after an uncertain result, offer contact for manual checking. Final wording remains in Q1.
- **FR-009**: Notification failure MUST NOT delete or roll back an accepted lead or turn confirmed
  capture into a visitor-facing submission failure. Shervin's manual review of New leads in Notion
  is the minimum fallback for missed email; no automated recovery or notification-state store is required.
- **FR-010**: Before release, document and demonstrate a short manual procedure for Shervin
  to check New leads, follow up when email is missed and handle possible duplicates. Agree the
  inspection schedule in Q6. No retry engine, automatic reconciliation or recovery queue is required.
- **FR-011**: Public callers MUST only be authorized to submit permitted enquiry fields; they
  MUST NOT select trusted ownership/status or read/change leads. Integration permissions MUST
  be restricted to approved operations and destination. Credentials and private lead information
  MUST stay out of public source, browser code, URLs, logs and committed test evidence.
- **FR-012**: Collection MUST include a clear purpose/privacy notice and discourage confidential
  customer or employee information. Before release, approve retention/deletion across leads,
  notifications and any intermediary copies, together with authorized access and abuse
  protection. Those policies are unresolved, not assumed implemented (Q4–Q5).
- **FR-013**: Contact changes MUST support accessible validation and feedback on existing mobile
  and desktop layouts, preserving site behavior outside the contact change. No unrelated redesign
  or search-indexing/public-launch change is included.

### Delivery Constraints and Acceptance Evidence

- **DC-001**: Existing hosting is Netlify. Target **$0 incremental recurring service cost**;
  account entitlements, workload assumptions, quotas, storage, notification allowances and
  exhaustion behavior MUST be verified with dated primary sources and account-specific evidence.
  If the target cannot be met, stop the affected selection and present alternatives for approval;
  no paid service, upgrade or overage commitment is authorized by this specification.
- **DC-002**: Estimate and track development AI/tool expenditure, human effort, review, rework
  and recurring service costs separately. Distinguish existing subscriptions from incremental
  charges and record unknown values as unverified. No costs or effort measurements are invented here.
- **DC-003**: Link FR/DC identifiers to tests and reviewed scenario evidence against the actual
  release candidate. Verify record failure, truthful handling of uncertain acceptance, manual duplicate
  handling, preservation of recorded leads when notification fails,
  authorization, privacy, abuse handling and regression behavior as well as the successful journey.
  Agent-generated outputs and completion claims require verification; tests must not be weakened to pass.
- **DC-004**: Shervin must approve business acceptance and the authorized release owner must
  explicitly approve release, with setup/configuration, operational ownership and recovery/rollback
  documented. Development authority grants no production authority. Review execution gaps after
  the increment under the constitution's selective-adoption rule.

### Key Entities *(include if feature involves data)*

- **Enquiry**: Visitor-supplied name, email, Company, workflow/problem and desired outcome;
  input to the lead, not an assessment or quotation.
- **Lead**: The accepted business record: enquiry details, unique reference, submission timestamp,
  owner and review status. The submission timestamp records trusted receipt of that submission.
  A manual resubmission may create a new lead. Notion acceptance is the condition for confirmation;
  the actual record destination is unresolved.
- No separate persistent submission-attempt or notification/recovery entity is required for this
  release. Use the accepted lead and existing manual review process; any proposed additional
  storage requires justification and privacy/cost review.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In reviewed S1-A evidence, every confirmed enquiry matches an accessible business
  record containing all required details, reference, timestamp, owner and initial status; no
  confirmation exists for a rejected or unresolved enquiry.
- **SC-002**: In S2-A–C, Shervin receives the test notification at the designated mailbox,
  opens the matching private lead and records a manual review update; unauthorized readers cannot do so.
- **SC-003**: S3-A demonstrates an actionable recording error with all entered values retained
  while the page stays open. Operational checks show that notification failure preserves the lead
  for manual review and that repeated submissions do not overwrite earlier enquiries. There is
  no claim of automatic recovery or exactly-once capture.
- **SC-004**: S1-B–D and boundary/privacy checks demonstrate correctable errors, usable keyboard
  and mobile flows, no exposed private lead data or credentials, and preserved existing interactions.
- **SC-005**: The reviewed cost estimate meets the $0 incremental recurring target for an explicit
  workload and period, supported by verified allowances and limit-exhaustion handling; development
  expenditure, effort, review and rework are reported separately. No free-tier claim rests on assumption.
- **SC-006**: The acceptance record links each FR/DC to reviewed evidence or an explicitly
  blocking gap; release approval and recovery ownership are recorded before activation.

No response-time, traffic-volume or reviewer follow-up commitment is invented. Forecast workload,
recovery timing and any necessary performance criteria must be agreed through Q6–Q8.

## Assumptions

- Existing behavior opens an email draft to `info@scopeai.ca`; the new intake replaces that form
  journey with actual capture. Other contact links remain unchanged unless separately approved.
- **Approved field policy (2026-10-30)**: name, email, Company, workflow/problem and desired
  outcome are required. Making Company required changes today's optional company field.
  No mandatory new field limits are invented; existing limits are inputs to the review,
  not service feasibility proof. Field guidance wording above implements the reviewer's intent
  in this specification; no website changes have been made.
- **Approved review policy (2026-10-30)**: Shervin owns initial leads and status starts as New.
  Shervin updates status manually after review. Actual Notion identity/property mapping and
  any subsequent status values remain to be verified; no sales pipeline is prescribed.
- Follow-up is manual. No visitor account, verification email, submission-status portal or automatic
  customer reply is required. Confirmation does not mean the enquiry has already been reviewed.
- The minimum operational fallback uses Shervin's direct inspection of New leads in Notion;
  inspection timing remains open in Q6. Automatic notification retries, guaranteed duplicate
  prevention, automatic reconciliation and recovery after closing the page are later improvements.
- Repository descriptions of mailbox readiness and external account configuration have not been
  verified. Access through a development connector would not establish production integration rights.

## Scope and Release Boundary

**Minimum releasable feature**: Stories 1–3, FR-001–013 and DC-001–004 together: validated enquiry,
private lead capture, accurate confirmation, post-capture notification, private manual review,
basic recording-error handling and a short manual fallback procedure. Resolve applicable open decisions before implementation
of affected behavior, and all release blockers before activation.

**Later improvements, not required or authorized here**: richer reviewer views/reporting,
visitor acknowledgement email, follow-up reminders, additional automation and operational dashboards.
Also deferred: automatic retries, guaranteed duplicate prevention, automatic uncertain-write
reconciliation, persistent notification tracking and cross-session recovery.
Consider each only when its value and evidence justify the added cost and effort.

**Out of scope**: automated feasibility assessment, quotations, runtime agent(s), model training,
visitor accounts and file attachments. The conditional approval permits only the work below;
it does not authorize live provisioning, production permission changes, paid services or release.

### Conditional Approval Work Boundaries

| Work | Approval / condition |
| --- | --- |
| Planning and read-only feasibility investigation | Authorized. Investigate Q1–Q8 and report evidence, recommendations and account-specific unknowns. Do not provision services or change permissions. |
| Settled form behavior in an isolated development preview | Authorized with synthetic data and mocked integrations: five required fields, approved Company label, workflow/outcome guidance, and basic failure feedback retaining entered values. Mocked confirmations must be clearly identified as simulations, not actual lead capture. |
| Verification of settled behavior | Authorized with synthetic fixtures and mocked outcomes, preserving existing website behavior. Mock results do not establish real Notion capture, email delivery or cost feasibility. |
| Unresolved validation, privacy and abuse policy | Propose recommendations. Do not finalize or implement behavior dependent on unresolved decisions in Q1, Q4 or Q5. These conditions do not block unrelated settled work. |
| Live record capture and notification | Investigate destination, permissions, sender, mailbox, approach and cost under Q2, Q3, Q7 and Q8. Mock development may proceed; this approval does not authorize live connections, provisioning or permission changes. |
| Retention and manual inspection schedule | Return recommendations to Shervin for decisions under Q4 and Q6 before affected storage or operational activation. |
| Paid services and production release | Not authorized. Return cost/scope changes and the verified release candidate for separate explicit approval. |

For each open question, retain its owner and completion evidence. Record findings and clear
only the corresponding condition when evidence and any required reviewer decision are available.
Do not mark unresolved requirements complete merely because development is conditionally approved.

## Open Questions and Investigation

These are deliberately unresolved investigation items requested by the owner, not hidden decisions.
Conditional approval allows planning, investigation and settled mocked development. Unresolved
questions block only dependent behavior, as specified above; they do not impose a blanket development hold.

| ID | Open decision / evidence required | Accountable decision owner | Required before |
| --- | --- | --- | --- |
| Q1 | Partially resolved: Company label and all five fields required; workflow/problem and desired outcome guidance intent approved. Remaining: field limits, acceptable text/email rules, privacy notice and visitor error/confirmation wording. Review existing limits and downstream capacity together. | Shervin with delivery reviewer | Affected behavior implementation |
| Q2 | Business defaults approved: owner Shervin; initial status New; manual updates after review. Remaining: identify the authorized Notion workspace/destination, map fields and the approved owner/status, and verify restricted access, integration permissions and development/test separation. Verify required record operations without assuming connector access grants deployment rights. | Shervin as workspace owner, with delivery reviewer | Integration implementation; access evidence before release |
| Q3 | Select notification service; verify authorized sender, mailbox readiness, real receipt, failure/bounce visibility, permitted notification content, quotas and cost. No service is selected. | Shervin with delivery reviewer | Notification implementation; receipt evidence before release |
| Q4 | Approve retention periods, deletion responsibility, access and privacy wording for every stored copy, including operational retry information and emails. No default retention duration is assumed. | Shervin as information owner | Affected storage implementation and public collection |
| Q5 | Choose proportionate abuse controls and approved limits; define visitor messaging, accessible fallback, cost-exhaustion protection and false-positive review without collecting unnecessary data. | Shervin with delivery reviewer | Public submission implementation and release |
| Q6 | Confirm the minimum manual fallback: Shervin checks New leads directly in Notion and reviews possible duplicates; agree inspection timing and contact handling for uncertain submissions. Automatic retry, duplicate-prevention and reconciliation policies are deferred. | Shervin as operational owner with delivery reviewer | Manual procedure approval before release; unrelated development may proceed when authorized |
| Q7 | Investigate the simplest submission approach on existing hosting; demonstrate trustworthy capture, actionable errors with values retained, least necessary credentials and lead preservation when email fails. No framework, intermediary store or new service is predetermined. | Delivery reviewer; Shervin accepts tradeoffs | Implementation planning/selection |
| Q8 | Verify actual hosting/workspace plans, baseline usage, forecast enquiry and abuse volumes, evaluation/retry overhead, storage and notification limits. Record dated pricing evidence and exhaustion/recovery behavior; demonstrate the $0 target or obtain a separate scope/budget decision. | Shervin as budget owner with delivery reviewer | Service selection; recheck before release |

### Preliminary Feasibility Evidence

Read-only public documentation reviewed on 2026-10-29; no account inspection, live submission,
service selection or provisioning was performed:

- Netlify distinguishes credit-based and legacy form billing; its credit-based plans describe
  free form submissions. This does not verify the existing account's plan or the cost of the
  complete capture/notification/recovery journey. [Forms usage and billing](https://docs.netlify.com/manage/forms/usage-and-billing/).
- Netlify publishes plan-dependent credits and metered usage. Account headroom and the effect
  of limits on the existing website remain to be checked. [Credit-based pricing plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/).
- Notion documents request limits and separate workspace limits. Actual workspace allowances,
  destination capacity and retry demand remain unverified. [Request limits](https://developers.notion.com/reference/request-limits).

**Conclusion**: $0 is a target, not a verified end-to-end feasibility result. Q2–Q8 remain open.
