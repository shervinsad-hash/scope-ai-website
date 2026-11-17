# Scope AI Website

Responsive website for Scope AI, an enterprise AI consultancy founded by Shervin Sadeghi.

## Stack and files

Buildless HTML, CSS and JavaScript. No dependencies or build step.

- `dist/index.html`: homepage and contact form
- `dist/style.css`: responsive styles
- `dist/app.js`: architecture explorer, FAQs, mobile navigation and enquiry submission
- `dist/favicon.svg`: brand icon
- `netlify.toml`: Netlify publish-directory configuration

## Local preview

Run `python3 -m http.server 8000 --directory dist` from the repository root and visit http://localhost:8000.

## Download a ZIP

On this repository's GitHub page, choose **Code → Download ZIP**. Extract the archive before uploading individual source files elsewhere.

## Netlify deployment

Import this repository into Netlify. Leave the build command empty and use `dist` as the publish directory. The included `netlify.toml` sets the publish directory.

The source configures the `workflow-enquiry` form for Netlify Forms. During a separately authorized release, enable form detection for `scope-ai-web` and redeploy so Netlify processes the HTML in `dist`. Source metadata alone does not enable or verify the live service. Deployment, current settings, detected-form status and private persistence verification remain pending.

Connect `scopeai.ca` in Netlify and apply the exact DNS values it provides at the domain's DNS provider. Domain registration is with GoDaddy. Preserve email DNS records when configuring the website.

## Contact behavior

The form preserves required Name, Work email and Workflow, with optional Company. Browser validation checks requiredness, email format and length limits; these are not trusted server-side guarantees. A hidden honeypot supports Netlify spam filtering, whose live behavior still needs verification.

With JavaScript, the form sends a same-origin URL-encoded POST to `/`, including the form identity and honeypot. Pending feedback disables Submit enquiry and prevents simultaneous requests. Only an HTTP ok response displays "Your enquiry has been submitted." This acknowledges the HTTP response; it does not establish private persistence, human receipt, review or email delivery. Spam rejection may be silent.

All enhanced outcomes retain entered values. Non-ok responses explain that confirmation failed and a manual retry may duplicate a saved submission. Network errors or the 30-second client deadline explain that the outcome is unknown. Aborting the browser request does not prove server-side capture stopped. Controls are restored, errors receive focus, and there is no automatic retry or form reset.

Without JavaScript (or required enhancement APIs), the HTML form uses native POST to `/` and the provider's default response. No custom success page is configured. Native response and failure/value-recovery behavior must be tested separately on the deployed site with JavaScript disabled; enhanced feedback checks cannot establish native behavior.

Local static hosting cannot process Netlify Forms or prove private persistence. Controlled local HTTP responses can check feedback and encoding only. Before release acceptance, verify detected-form status and synthetic submissions on the deployed site, compare all four values in private Netlify Forms records, and check native POST, legitimate and populated-honeypot handling, accessibility and existing interactions. Keep enquiry data out of URLs, logs and public evidence. Deployment and private verification remain pending; no live readiness or production test result is claimed here.

Shervin Sadeghi owns private submission access, manual enquiry review, spam-list review and follow-up. Accessing a matching private record establishes human receipt/access; an assessment or follow-up establishes review separately. Confirm the review cadence before release. Delete synthetic submissions after verification. Review real enquiries after 12 months and delete those no longer needed; retention is manual, with no automatic expiry. No notifications, CRM or automatic responses are configured. Direct email links remain available; mailbox receipt and email delivery are unverified and independent of Forms capture.

## Public launch checklist

- Owner approves public launch and final copy.
- Set up and verify the business mailbox and domain email authentication.
- Configure the custom domain and HTTPS in the hosting provider.
- Enable form detection and redeploy during an authorized release; verify private capture, native response, spam handling and owner review access separately from HTTP acknowledgement.
- Remove `noindex,nofollow` from the homepage only when ready for search indexing. This directive does not restrict access.
- Test contact behavior and responsive layouts on the public domain.

Production canonical URL: https://scopeai.ca. The existing private Sites deployment is separate from this repository; pushing here does not update it automatically.

## Export and verification notes

The source was transferred from the creation and contact-update code retained in the project conversation because the original execution environment was unavailable. This is not a byte-verified checkout export.

The original site received JavaScript syntax checks, responsive layout inspection, architecture and FAQ interaction checks, mobile-menu checks, anchor validation and email-draft encoding checks. The GitHub transfer received source-integrity and JavaScript behavior checks but could not receive a fresh browser preview. Verify the Netlify preview before public launch.

This export includes the original SVG favicon and typographic website brand treatment. The separately generated PNG logo is not included or installed in this version.

WP-01 candidate syntax/browser verification belongs to the runner and is not claimed complete here. Production deployment, private persistence, native response and owner review verification remain pending. Mailbox receipt and email delivery are unverified.

## Insights

- `dist/insights/ai-enabled-sdlc/index.html`: public article, “Faster code. Better delivery?”
- `dist/insights/ai-enabled-sdlc/article.css`: scoped article styling
- Homepage navigation, approach link and Insights section point to the article.
- Knowledge foundation: https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/engineering/ai-enabled-sdlc-case.md

The article preserves the existing noindex setting. Source and claim boundaries are recorded in the article. GitHub source updates rely on the existing Netlify connection for deployment; the private Sites deployment remains separate.

## Unified delivery method (proposed)

The homepage's Approach section explains the business-intent-to-solution lifecycle, bounded work packages, execution tasks/briefs, reusable AI harness, interchangeable coding-agent engine and evidence-based increment acceptance. The architecture is a proposed method, not a claim of a deployed multi-engine harness. Source: https://github.com/shervinsad-hash/scope-ai-knowledge/blob/main/delivery/software-increments/agentic-software-delivery-increments.md. Verify the preview and obtain release approval before public deployment.
