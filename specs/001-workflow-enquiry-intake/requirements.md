# Business Requirements and Intent: Workflow Enquiry Intake

**Feature**: 001-workflow-enquiry-intake
**Originator / business reviewer**: Shervin Sadeghi
**Recorded**: 2026-10-30
**Status**: Business brief reconstructed from the user's request and subsequent review decisions.
This new document has not received separate revision-specific approval.

## Problem and evidence

The existing website opens an email draft rather than recording a submission. Visitors must
send that email themselves, and the website cannot establish that a lead was captured.
This behavior is documented in the [repository README](../../README.md) and implemented in
`dist/app.js`; external mailbox readiness has not been verified.

## Intended outcome

A visitor submits a workflow enquiry, Scope AI records a lead in its private Notion business
workspace, and Shervin receives a notification at `shervin@scopeai.ca` for manual follow-up.
Visitors receive confirmation only after the lead is recorded.

The users are the visitor describing a need and Shervin reviewing the enquiry. Successful
capture and useful manual follow-up are the outcomes; no runtime agent or assessment is needed.
No baseline enquiry volume, conversion improvement or follow-up deadline has been established.

## Scope and constraints

The first release captures the five required enquiry fields, creates a referenced and timestamped
lead, notifies Shervin and handles recording failure with an actionable error while retaining
entered values on the open page. Other website functionality is preserved.

Use existing Netlify hosting and target $0 incremental recurring service cost, subject to
account-specific verification. Protect credentials and private lead data. Track AI/tool expenditure,
human effort, review, rework and recurring cost separately. Automated assessment, quotations,
runtime agents, model training, visitor accounts and attachments remain outside this increment.

## Authoritative detail and decisions

- [Specification](spec.md): authoritative numbered requirements, field guidance, acceptance
  examples, scope details and success criteria. This brief does not maintain a second set.
- [Review decisions and conditional authority](spec.md#conditional-approval-work-boundaries):
  Shervin authorized planning, investigation and settled form development with synthetic data
  and mocked integrations. No live provisioning, paid services or release is approved.
- [Open questions Q1–Q8](spec.md#open-questions-and-investigation): authoritative questions,
  owners and affected-work boundaries. Retention, account access, service choices and cost
  feasibility remain unresolved; do not infer answers from this brief.
- [Constitution](../../.specify/memory/constitution.md): project-wide rules.
- [Delivery record map](../../docs/delivery.md): remaining artifacts and approval-evidence gaps.

## Naming and change control

This file serves the business-intent purpose described by Scope AI's
[intent-to-implementation method](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/intent-to-implementation.md).
No separate `intent.md` is needed for this increment. `checklists/requirements.md` remains a
quality checklist, not this business brief or the detailed specification.

Keep business purpose here and detailed behavior in `spec.md`. Material changes to outcome,
scope, data use, authority or cost require review of affected decisions. Existing conversation
approvals must not be represented as approval of this newly assembled document revision.
