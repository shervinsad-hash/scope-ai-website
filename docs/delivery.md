
# Website Delivery Documents

**Repository review**: 2026-10-30. This is a project mapping of Scope AI guidance, not a claim
that every delivery gate or control has been implemented.

## Document roles

Keep feature-specific records beside the code under `specs/<feature>/`. Reusable company
methods remain in `scope-ai-knowledge`; link them rather than copying their templates here.

| Record | Purpose and current location | Current state |
| --- | --- | --- |
| Project constitution | [constitution.md](../.specify/memory/constitution.md): rules across features | Present, v1.0.0 |
| Business requirements / intent | [requirements.md](../specs/001-workflow-enquiry-intake/requirements.md): problem, users, outcome and constraints | Added as a brief reconstructed from the request and reviews; not separately revision-approved |
| Detailed specification | [spec.md](../specs/001-workflow-enquiry-intake/spec.md): numbered requirements and acceptance scenarios | Present; conditional authority recorded; Q1–Q8 remain partially or fully open |
| Specification-quality checklist | [checklists/requirements.md](../specs/001-workflow-enquiry-intake/checklists/requirements.md): checks the quality of the specification | Present; three checks remain open; not business requirements or implementation evidence |
| Feasibility / research | Future feature `research.md`, or a research section in the plan: access, options, limits and evidence | Only preliminary public-documentation notes exist in the spec; account-specific feasibility is unverified |
| Implementation plan / task contract | Future feature `plan.md`: affected components, interfaces, sequence, risks, verification and permitted actions | Not created. Needed before affected code generation under the reviewed delivery method; a small mocked change may use a proportionate combined task contract |
| Executable tasks | Future feature `tasks.md`, or tasks within a small approved plan | Not created; follows sufficient planning. Do not generate speculative integration tasks as approved work |
| Approval evidence | Existing reviewer entries in `spec.md`; extend with revision/evidence references when available | Conversation decisions recorded, but exact reviewed revisions and durable review references are missing |
| Cost / effort and execution evidence | Sections in the plan/tasks or linked evidence record | Not yet recorded as measured results; distinguish unknown expenditure from zero |
| Release / operations record | Future release record: candidate revision, executed checks, business acceptance, explicit release decision, manual operations and rollback | Not yet due as completed evidence; required before activation. No release is approved |
| Outcome review / learning | A short close-out section: results against intent, gaps, review effort, rework and reusable lessons | Due after the increment; not evidence of present effectiveness |

## Requirements versus intent

Scope AI's method uses `intent.md` to explain why a change exists and what outcome is wanted;
`spec.md` states detailed behavior and how acceptance will be demonstrated. These purposes
overlap but are not identical. Its storage path is suggested, and it permits combined records
for small changes. For this website, `requirements.md` is the business-intent brief. Retain
`spec.md` for Spec Kit compatibility and do not add a duplicate `intent.md`.

The existing `checklists/requirements.md` name is part of the Spec Kit workflow. Preserve its
path and label its role clearly. Future amendments must keep one authoritative location per
kind of information; link scope details and open questions instead of maintaining parallel copies.

## Actual gaps and next transition

The most important missing content is a bounded implementation plan and verified feasibility,
not an additional file named `intent.md`. Add evidence as the work reaches the relevant stage;
the method does not require a separate document for every row above.

Shervin's conditional authority permits planning, read-only investigation and settled mocked
development. It remains valid within the agreed scope. The newly reviewed company guidance
also calls for an approved plan or combined task contract before affected implementation.
Prepare that concrete record within the existing authority; do not infer its approval from
the specification's conditional status. No application changes are made by this document review.

The approval entries currently summarize conversation decisions. No stable conversation URL,
exact decision time or artifact revision was supplied. Do not fabricate or backdate them, or
bind an old approval to a newly edited document by computing a hash afterwards. At the next
review, bind the actual reviewed files to commit/blob SHAs or file hashes and retain the
reviewer's decision and permitted next actions. A changed revision needs an impact assessment,
not automatically blanket reapproval of every unaffected decision.

## Methodology checked

The private knowledge repository was accessible. The following are company guidance, with
project adoption and execution requiring their own evidence; broader standards remain draft.

- [Intent to approved implementation](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/intent-to-implementation.md)
  — retrieved blob `d28a7b8b0c421f92a63e79f1b5e298a6c0c76759`.
- [Intent template](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/templates/intent.md)
  — retrieved blob `809281a5846a07a3a5f2642b015c7e03098249f1`.
- [Delivery standard](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/agentic-delivery-standard.md)
  — retrieved blob `6a30837dd9b8162e16f550af4c8f559c3482041b`.
- [AI-enabled development](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/engineering/ai-enabled-software-development.md)
  — retrieved blob `56b03d055575039f3aaf3ac698908df9080ad35e`.
- [Gate decision record](https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/templates/gate-decision-record.md)
  — retrieved blob `5157819648f693d003b257b273262a808e666e06`.

These records belong in the website repository for GitHub reference after a reviewed commit
and push. Creation in the local workspace alone does not publish them to GitHub.
