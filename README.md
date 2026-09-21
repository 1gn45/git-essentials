# Git Essentials Test

A self-check practice quiz for preparing for a "Git Essentials" certificate. It covers core Git
concepts and commands: repositories, staging and commits, branching, merging, rebasing, remotes,
undoing changes, stashing, tagging, and common collaboration workflows.

Pick how many questions you want (10 to all 90), answer them one at a time, and get instant
feedback with the correct answer. At the end you can see your score and retry only the
questions you got wrong.

Live demo: https://1gn45.github.io/git-essentials/

## Running locally

Since the app loads `questions.json` via `fetch`, open it through a local web server rather than
as a `file://` URL, for example:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.
