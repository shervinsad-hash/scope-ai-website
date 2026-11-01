# Issue tracker: GitHub

Issues and specifications for this repository live in GitHub Issues.

Repository: `shervinsad-hash/scope-ai-website`

Use the `gh` CLI for issue operations:

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number> --json number,title,body,labels,comments`
- List: `gh issue list --state open`
- Comment: `gh issue comment <number> --body "..."`
- Apply or remove labels: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- Close: comment with the outcome, then run `gh issue close <number>`

Pull requests are not treated as a triage request surface by default.
