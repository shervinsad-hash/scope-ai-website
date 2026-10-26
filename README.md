# Scope AI Website

Responsive website for Scope AI, an enterprise AI consultancy founded by Shervin Sadeghi.

## Stack and files

Buildless HTML, CSS and JavaScript. No dependencies or build step.

- `dist/index.html`: homepage and contact form
- `dist/style.css`: responsive styles
- `dist/app.js`: architecture explorer, FAQs, mobile navigation and email draft
- `dist/favicon.svg`: brand icon
- `netlify.toml`: Netlify publish-directory configuration

## Local preview

Run `python3 -m http.server 8000 --directory dist` from the repository root and visit http://localhost:8000.

## Download a ZIP

On this repository's GitHub page, choose **Code → Download ZIP**. Extract the archive before uploading individual source files elsewhere.

## Netlify deployment

Import this repository into Netlify. Leave the build command empty and use `dist` as the publish directory. The included `netlify.toml` sets the publish directory.

Connect `scopeai.ca` in Netlify and apply the exact DNS values it provides at the domain's DNS provider. Domain registration is with GoDaddy. Preserve email DNS records when configuring the website.

## Contact behavior

The form validates required fields and opens an email draft addressed to `info@scopeai.ca`. Visitors must send it from their email application. There is no server-side submission, database, analytics or automatic email delivery.

The owner has not yet provisioned the email mailbox. Set up and test the mailbox before a public launch. Automatic submissions require a separate implementation, such as Netlify Forms and email notifications; this repository does not yet enable Netlify Forms.

## Public launch checklist

- Owner approves public launch and final copy.
- Set up and verify the business mailbox and domain email authentication.
- Configure the custom domain and HTTPS in the hosting provider.
- Decide whether to retain email drafts or implement actual form submissions.
- Remove `noindex,nofollow` from the homepage only when ready for search indexing. This directive does not restrict access.
- Test contact behavior and responsive layouts on the public domain.

Production canonical URL: https://scopeai.ca. The existing private Sites deployment is separate from this repository; pushing here does not update it automatically.

## Export and verification notes

The source was transferred from the creation and contact-update code retained in the project conversation because the original execution environment was unavailable. This is not a byte-verified checkout export.

The original site received JavaScript syntax checks, responsive layout inspection, architecture and FAQ interaction checks, mobile-menu checks, anchor validation and email-draft encoding checks. The GitHub transfer received source-integrity and JavaScript behavior checks but could not receive a fresh browser preview. Verify the Netlify preview before public launch.

This export includes the original SVG favicon and typographic website brand treatment. The separately generated PNG logo is not included or installed in this version.

Email delivery has not been tested because the mailbox is not provisioned.
