# GitHub Foundations Practice Test

A self-check practice quiz for preparing for the **GitHub Foundations (GH-900)** certification.
165 original questions, written from scratch and mapped to the seven official exam domains and
their published weightings from Microsoft Learn's public
[GH-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900)
(the *current*, post-January-2026 domain structure -- several other prep sites still test the
older pre-2026 domain names/weights), cross-checked against the official
[GH-900T00 training course](https://learn.microsoft.com/en-us/training/courses/gh-900t00)
syllabus (code scanning/CodeQL, Copilot, Codespaces, Projects, Markdown, open source,
InnerSource, secure repository practices):

| Domain | Weight | Questions here |
|---|---|---|
| Understand Git and GitHub basics | 25–30% | 45 |
| Work with GitHub repositories | 10–15% | 24 |
| Collaborate using GitHub | 10–15% | 24 |
| Apply modern development practices | 10–15% | 24 |
| Manage projects with GitHub | 5–10% | 12 |
| Understand privacy, security, and administration | 10–15% | 25 |
| Explore the GitHub community | 5–10% | 11 |

Each question shows which domain it belongs to, so you can see where you're weak. Like the real
exam, most questions are single-choice, but 15 are multiple-answer ("select all that apply")
questions — you'll see checkboxes instead of radio buttons for those, and (by design, for extra
practice difficulty) the app doesn't tell you in advance how many answers are correct.

**Note on sourcing:** GH-900 is a proctored certification exam under NDA. These questions are
original and written from the *public, official exam objectives* plus general GitHub product
knowledge, cross-checked for topic coverage against other prep vendors' own published free
sample questions (e.g. CertSafari, TheServerSide) and Microsoft's own free official
[Practice Assessment](https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/practice-assessment)
tool -- never from leaked/real exam questions or "exam dump" sites, which were deliberately
excluded. Treat this as a study aid for the topics, not a guarantee of the exact questions
you'll see on exam day.

Pick how many questions you want (15 to all 165), answer them one at a time, and get instant
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
