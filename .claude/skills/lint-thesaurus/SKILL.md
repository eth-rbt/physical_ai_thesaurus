---
name: lint-thesaurus
description: Audit the Physical AI Thesaurus content for problems that `npm run build` does NOT catch — projects that render as "not placed/not plotted" on an axis, grid groups silently dropped to "ungrouped", orphan projects no card references, images hosted without a confirmed license, attribute labels that drift from the controlled vocabulary, and likely duplicate project records. Use when the user wants to check/lint/validate/QA the content, after a batch run, or before publishing — e.g. "lint the thesaurus", "what's broken", "check the cards before I publish", "any orphan projects?".
---

# Lint the Thesaurus

Run the content doctor and act on what it finds. `astro build` only enforces the schema; it
happily ships a project that sits in the "not placed" bucket of an axis card or a grid group
that quietly collapses to "ungrouped". This skill catches that class of silent-but-wrong.

## Run it

```bash
node pipeline/lint.mjs            # full report (errors + warnings), human-readable
node pipeline/lint.mjs --errors   # only ERROR-level (publish gate)
node pipeline/lint.mjs --json     # machine-readable, for triage/automation
```

Exit code is non-zero when any ERROR exists, so `--errors` doubles as a pre-publish gate.

## What it checks

**ERROR** (these are real breakage — a project won't show up where the card intends):
- `reference` — a card's `project_ids` points to a project with no JSON file.
- `placement` — an `axis-1d` card references a project lacking `metrics.<axis.metric>` (→ "NOT
  PLACED"), or a `scatter-2d` card references a project missing `x.metric` or `y.metric` (→ "NOT
  PLOTTED").
- `image` — an `images[].local_image` path that does not exist under `public/`.
- `metric` — a metric whose value isn't a number.
- `display` — an axis/scatter card missing its metric declaration.

**WARN** (review; not build-breaking):
- `grouping` — a `grid` card with `groupBy` references a project lacking that attribute key (it
  drops into "ungrouped").
- `orphan` — a project no card references (fine while a batch is mid-flight; suspicious once it
  should be done).
- `rights` — a project hosts a `local_image` while `rights_status` is `needs_permission` /
  `unknown`. Confirm the license before publishing.
- `image` — empty `alt_text`.
- `project` — no sources, or no attributes.
- `metric` — value outside the 1–5 scale.
- `vocab` — an attribute value used only **once** across all projects: likely a typo or a
  non-normalized variant (e.g. `Handheld` vs `Handheld device`). Confirm against the controlled
  vocabularies in `readme.md`. Legitimately-unique values are fine — this is a prompt to look,
  not proof of error.
- `duplicate` — two project ids share a normalized name; probably should be merged to one id.

## Act on the findings

Don't just print the report — resolve it, or hand the user a precise to-do:

- **placement / grouping** → the fix is to add the missing metric or attribute to the **project**
  JSON (it's intrinsic and reused), not to the card. Use the `revise-cards` / `research-project`
  metrics table for the 1–5 scale. If a number truly can't be justified, tell the user the
  project will sit in "not placed" rather than inventing one.
- **reference** → either author the missing project (`research-project`) or remove the dangling
  id from the card.
- **vocab** → normalize the odd value to the controlled label, or confirm it's a deliberate new
  vocabulary entry (and, if so, note it belongs in `readme.md`).
- **rights** → downgrade to a placeholder (drop `local_image`) or confirm the license and set
  `rights_status` honestly.
- **orphan** → expected mid-batch; if the batch is done, either place the project on a card
  (`revise-cards`) or delete it.

## Finish

Report the error/warning counts, the findings you fixed (and how), and any that need a human
decision (vocabulary calls, license confirmations, merge-or-not duplicates). If you changed any
files, run `npm run build` and then re-run `node pipeline/lint.mjs` to confirm it's clean.
