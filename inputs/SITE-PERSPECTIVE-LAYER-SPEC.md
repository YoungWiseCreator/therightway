# SITE PERSPECTIVE LAYER — SPEC (The Right Way chapter pages)

**Status:** SPEC ONLY — for the Bible team build. Do NOT land on the live
site from this document; site landing is YWC-personal.
**Authority:** Cameron adoption 2026-11-24 ~17:43 EST (DeepSeek consults
27 + 27b). Records: `~/workspace/deepseek-consults/2026-11-24-trw-rating-card.md`,
`~/workspace/deepseek-consults/2026-11-24-trw-perspective-layer.md`.
**Frame:** the site is the LIBRARY; the episode is the TOUR. The tour
carries only what the library can source at the highest tier, compressed
to the scene's stakes. The three libraries stay SEPARATE on the page —
the perspective layer sits AROUND the text, never inside it and never
blended into it.

---

## 1. Page structure — exact order, top to bottom

1. **Chapter header** — book + chapter + a ONE-sentence scene-orientation
   line (source-grounded, no editorializing).
2. **Audio player** — the full-chapter audio, prominent, continuous play
   per existing site law.
3. **"In this chapter" hook strip** — 3–5 one-line hooks into the
   perspective notes below, visible WITHOUT scrolling. Each hook is a
   single sentence + a "Read" tap that jumps to / opens the note.
   Example shape: "The word for 'help' here is the same one used for a
   military ally — does that change who is acting?"
4. **Chapter text — three library tabs, CLEAN** — KJV (oldest first) ·
   Hebrew Bible · Dead Sea Scrolls. Separate tabs, never blended, and
   NO inline perspective notes inside the text body. The text stays
   the text.
5. **Scene notes** — 3–5 expandable blocks, per SCENE/SECTION (tied to
   a verse range, e.g. "Genesis 3:1–7"), never per-verse. Collapsed:
   the hook line. Expanded: the full note, **80–150 words**, the
   sourcing label, and the citation. Every expanded note ENDS with its
   sourcing line — never a sermon.
6. **Word Watch** — 5–7 expandable entries per chapter. Collapsed: the
   KJV word + a one-line teaser. Expanded: the Hebrew term
   (transliterated + Hebrew script), the full range of meaning, the
   sourcing label, and one sentence on why it matters for THIS scene.
7. **Scrolls margin** — 2–3 expandable variant notes. Collapsed: "A
   Dead Sea Scrolls fragment adds a detail here." Expanded: the
   variant, which scroll/fragment, what it adds, and the sourcing
   label.
8. **"Go deeper" citation list** — EVERY citation used anywhere on the
   page, gathered in one place. This is the page's credibility anchor
   and audit trail. Every citation carries NAME + ERA/PERIOD where a
   named source stands behind it (Tier B notes always; Tier A anchors
   too, where a named source carries the consensus — e.g. a named
   lexicon and its edition era). Era unknown → `era unrecorded`,
   never a guessed era.
9. **Video slots** — the chapter's three curated video slots sit AFTER
   the perspective layer. The page reads: story → perspective → watch.

## 2. Caps and grain (hard)

| Layer | Grain | Cap per chapter |
|---|---|---|
| Scene notes | per scene/section | 3–5 |
| Word Watch | per significant term | 5–7 |
| Scrolls margin | per scene-relevant variant | 2–3 |

- Progressive disclosure only: default view shows hooks/teasers; full
  note + citation + label live behind ONE tap. Never more than one
  level of nesting.
- Anti-textbook rules: no verse-by-verse commentary; no "interpretation"
  section that is not tied to a word, a variant, or a named
  perspective; no padding to fill a quota.

## 3. Sourcing tiers and labels (fail-closed)

- **Tier A — lexicon / consensus.** A named lexicon (e.g. BDB, HALOT)
  or a standard critical edition/apparatus supports the claim.
  Labels (exact strings): `Lexicon range` · `Broad consensus`.
  Allowed: site AND episode narration.
- **Tier B — one named scholar's published reading.** Full citation
  required (author, work, year). Attribution carries the scholar's
  NAME + ERA/PERIOD (Cameron refinement 2026-11-24 ~17:50 EST: named
  scholars from specific times, with the time they're from, wherever
  a perspective is attributed). Label (exact string):
  `One scholar's reading: [Name] ([era/period])` — e.g. a medieval
  commentator is labeled with his century, a modern lexicon with its
  edition era. Where the era is genuinely unknown, write
  `era unrecorded` — never guess an era. Allowed: SITE ONLY — never
  narrated.
- **Tier C — vague / unsourced** ("some say", "scholars believe",
  paraphrase without a traceable citation): DOES NOT EXIST. It is
  never written, never published, never scripted.
- **Fail-closed rule:** a perspective claim that cannot be assigned to
  Tier A or Tier B with a specific citation at the moment of writing
  is CUT. No "pending source" placeholders anywhere — not on the page,
  not in a script.
- The phrase **"according to scholars" is BANNED** in every surface.
  On the page, the citation does the work; in narration, the narrator
  says "the word can also mean…".

## 4. Honest-empty state

If a chapter has NO perspective material that meets the sourcing bar,
the page says so honestly, in the perspective layer's place, with the
exact line:

> **No sourced perspective notes for this chapter.**

Empty beats padded. The hook strip, scene notes, Word Watch, and
Scrolls margin are then omitted entirely (no empty shells); the "Go
deeper" list carries only the chapter-text sources. The honest-empty
state is a PASSING state for the page, never a defect.

## 5. Consistency with the episode (narration side, for reference)

- IDENTICAL between page and episode: the sourcing verdict. Tier A on
  the page is exactly what may enter the episode; Tier B never does.
- DIFFERENT: depth and grain. Page Word Watch = full lexical range +
  citation (80–120 words); the episode carries the same note as ONE
  scene-embedded beat of 1–2 sentences.
- Episode budget (enforced by the storytelling card's pacing
  sub-score): 4–6 perspective beats per episode — word-beats ≤3 (never
  two in one scene), Scrolls-as-scene-detail 1–2, honest-alternative
  ≤1, site pointer ≤1 (at/after the middle CTA, pointing at the
  SPECIFIC note just heard — the perspective handoff). NO perspective
  tease in the opening CTA.
- Narration detail rule: "as completely as the scene's drama can
  carry" — never "as completely as possible."

## 6. Build notes for the team

- The layer is data-driven per chapter: each note record carries
  {kind: scene|word|scrolls, hook, body, label, citation,
  source_name, source_era, verse_range} so the page renders the
  strip, the sections, and the "Go deeper" list from one source of
  truth. `source_era` is a period string (century / edition era) or
  the literal `era unrecorded`; it is never null and never invented.
- A chapter with zero note records renders the honest-empty state
  automatically.
- Labels are rendered verbatim from §3 — no paraphrasing the label
  strings.
