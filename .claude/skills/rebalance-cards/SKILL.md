---
name: rebalance-cards
description: Re-curate the project selection across ALL Physical AI Thesaurus cards at once so the most relevant AND most distinctive projects are chosen, no "hero" project dominates the atlas, and every placed project gets a card-specific preview one-liner. Use when the same few projects appear on too many cards (e.g. "Alexa / Ray-Ban Meta show up everywhere"), when cards feel samey, when many atoms are orphaned, or after a big authoring batch — e.g. "rebalance the cards", "reselect the most relevant projects per card", "spread the projects out", "some projects appear too many times", "diversify the card selections". For authoring ONE new card use `thesaurus-card`; for a single add/remove use `revise-cards`.
---

# Rebalance Cards

A global re-curation pass over **every** card. Unlike `thesaurus-card` (author one card) and
`revise-cards` (one add/remove), this skill optimizes the whole atlas at once for two things at
the same time:

1. **Relevance** — each card shows only projects that genuinely instantiate its subcategory.
2. **Distribution** — representation is spread across the project pool, so a handful of popular
   "hero" atoms don't headline most cards while dozens of equally-good atoms sit unused.

It also (re)writes the per-project **preview one-liner** (`project_notes`) for every placed project.

The data contract is `src/content.config.ts` (authoritative). Cards: `src/content/cards/<id>.md`;
projects: `src/content/projects/<id>.json`. This skill **edits card frontmatter and project metrics
only** — it never rewrites project descriptions.

## The problem this solves

Authoring cards one at a time makes each reach for the same famous examples, so a few atoms
dominate the atlas and the long tail goes unseen. A healthy atlas spreads its projects: the most
canonical atom might legitimately headline several cards, but it should not appear on most of them,
and genuinely-relevant-but-less-famous atoms (research prototypes, historical precedents, niche
products) should carry the cards where they fit best. Over-representation also makes cards feel
interchangeable and buries the atlas's range.

## Inputs

- `cards` — which cards to rebalance: `all` (default) or a list of card ids / categories.
- `cap` — soft maximum number of cards a single project may appear on (default **6**). Truly
  cross-cutting atoms may exceed it only with an explicit per-card justification; aim for most
  atoms at **≤ 3–4**.
- `avoid_pruning` — optional list of (card, project) pairs to leave untouched.

## Process

### 1. Build the global picture (do this first, once)

Compute, across all cards:
- **usage count** per project (how many cards reference it),
- the **overused heroes** (count ≥ `cap`, or conspicuously high vs. the mean),
- the **under-used / orphan atoms** (0–1 appearances) — these are the bench you draw from,
- an **inventory** of every atom's `project_type`, `ai_embedded`, `attributes`, and `metrics`.

```bash
python3 - <<'EOF'
import glob, re, json, os
from collections import Counter
usage=Counter()
for f in glob.glob("src/content/cards/*.md"):
    fm=open(f).read().split('---')[1]
    for pid in re.findall(r'-\s+([a-z0-9-]+)\s*$', fm, re.M): usage[pid]+=1
allids=[os.path.basename(f)[:-5] for f in glob.glob("src/content/projects/*.json")]
orphans=[p for p in allids if usage[p]==0]
print("HEROES (>=6):", [f"{p}={n}" for p,n in usage.most_common() if n>=6])
print("ORPHANS:", len(orphans), orphans[:60])
# write a compact inventory the per-card workers can read
rows=[]
for f in sorted(glob.glob("src/content/projects/*.json")):
    d=json.load(open(f)); pid=os.path.basename(f)[:-5]
    ac="; ".join(f"{k}=[{','.join(v)}]" for k,v in d.get("attributes",{}).items())
    mc=",".join(f"{k}:{v}" for k,v in d.get("metrics",{}).items()) or "-"
    rows.append(f"{pid} | uses:{usage[pid]} | {d.get('project_type')} | ai:{d.get('ai_embedded','unknown')} | metrics:{mc} | {ac}")
open("pipeline/.rebalance-inventory.md","w").write("# atom inventory with usage counts\nid | uses | type | ai | metrics | attributes\n\n"+"\n".join(rows)+"\n")
print("wrote pipeline/.rebalance-inventory.md")
EOF
```

### 2. Re-select each card's projects (relevance gate → distinctiveness → hero cap)

For every card, in order:

1. **Relevance gate (hard filter).** Apply the `thesaurus-card` doctrine "Selecting projects:
   relevance over coverage": keep only projects that genuinely instantiate THIS subcategory; write
   the one-line reason each belongs. Drop the merely-related. Relevance is never sacrificed for
   distribution — an off-topic project is wrong even if it's under-used.
2. **Distinctiveness tiebreaker.** Among genuinely-relevant candidates, prefer the ones that mark
   out the *range* of the subcategory and prefer **under-used atoms over heroes** when they are
   equally good exemplars. Two near-duplicates (two robot vacuums, two smart speakers) rarely both
   earn a slot — keep the one that's the better/under-used representative.
3. **Hero cap with replacement.** For any project already over (or pushing over) `cap`, keep it on
   this card ONLY if it is a *top-3 exemplar* of this exact subcategory; otherwise replace it with
   the most relevant under-used atom (often an orphaned research prototype or historical precedent
   that fits this card better than the hero ever did). Record the swap.
4. **Tight set.** Aim for 6–12 projects. Breadth across kinds is a tiebreaker, never grounds to
   include something off-topic.
5. **Display integrity.** Keep the `display` block exactly. For `axis-1d`/`scatter-2d`, a project
   belongs only if it has the axis metric(s); if a genuine pick lacks one, score it (1–5) and
   record a metric backfill to apply to the project JSON (see `research-project` metrics table).

### 3. The AI-embedded lens

Each atom carries `ai_embedded` (`none`/`some`/`core`/`envisioned`). Use the split across the final
set as insight, and as another axis of *distinctiveness* — a card carried entirely by AI products
often gets sharper when a no-AI technique or an envisioned concept is the better, under-used exemplar.

### 4. Write the preview one-liners (`project_notes`)

For every project in the final set, write one **card-specific** one-liner (tile-caption length,
≤ ~25 words): why it belongs on THIS card / how it exemplifies this subcategory, naming the concrete
mechanism. For axis cards, say where it sits on the spectrum. Not a generic project description — the
same atom is framed differently on each card it appears on. Format in frontmatter, keys matching
`project_ids` order:

```yaml
project_notes:
  amazon-echo-alexa: "..."
  paro: "..."
```

### 5. Coordination — keep the global tally honest

The rebalance is a *global* optimization, so per-card decisions interact. Use one of:

- **Sequential (most accurate):** process cards one at a time, updating the running usage tally
  after each, so later cards see the heroes already shed and pick up the slack.
- **Parallel + reconcile (faster):** hand each card worker the static usage table + `cap` + the
  orphan bench, let them re-select in parallel, then **recompute usage** and run a second, targeted
  pass on any atom still over `cap` (trim it from the cards where it's the weakest fit). Repeat
  until the distribution settles. Always reconcile — a single parallel pass under-corrects because
  workers can't see each other's swaps.

If fanning out workers, give each: the card file, the inventory-with-usage file, `cap`, the doctrine
above, and the instruction to return its final `project_ids`, `project_notes`, swaps, and any metric
backfills. Apply metric backfills centrally (never let parallel workers edit the same project JSON).

### 6. Build gate

`npm run build` from the repo root; fix any schema error (unknown ref, bad enum, non-numeric metric).
Re-run until green.

## Rules

- Reuse over invent: every `project_id` must already exist in `src/content/projects/`. Never invent.
- Relevance is the hard gate; distribution is the tiebreaker among relevant options — never the
  other way around.
- Preserve each card's `category, subcategory, title, card_question, one_line_summary, status,
  display` exactly. Only `project_ids`, `project_notes`, and (centrally) project `metrics` change.
- Every placed project gets exactly one `project_notes` entry; keys must match `project_ids`.
- Don't fake a metric to satisfy an axis — score only what's defensible; otherwise leave the project
  off that axis card.
- Keep prose paragraphs in sync: if a swap changes what the set reveals, retighten the one paragraph
  (still 1–3 sentences) per the `thesaurus-card` doctrine.

## Finish

Report:
- the **before/after usage distribution** for the heroes (e.g. `amazon-echo-alexa 26 → 7`), the new
  max and mean, and how many orphans were brought onto cards;
- per card: projects swapped out → in, with one-line reasons;
- metric backfills applied to satisfy axis cards;
- the build result and a short **Open Questions** list (atoms still over `cap` and why they're
  justified, any card left thin).
