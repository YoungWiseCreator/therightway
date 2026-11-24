# Hebrew Bible Sourcing — The Right Way, Hebrew Library

**Mission WS-B, TRW team build 2026-11-24.** The Hebrew library on therightway.life is
structure-only today: 39 book hub pages + index exist, every chapter slot reads
"text slot reserved (verification in progress)", no Hebrew text has been published
(COVERAGE.md gap 6). This document names the edition, its legal status, the
acquisition route **proven from this desk**, and the full plan for the remaining
books. Nothing here is published — the packet goes to YWC, who lands.

## 1. The edition: Westminster Leningrad Codex (WLC)

- **What it is:** the complete Masoretic Hebrew Bible as preserved in the Leningrad
  Codex (dated 1008 CE) — the oldest complete Hebrew Bible manuscript and the base
  text of the standard scholarly editions (BHS/BHQ). This is the "Hebrew Bible" of
  the site's three governing sources (oldest KJV · Hebrew Bible · Dead Sea Scrolls):
  the KJV's own Old Testament was translated from this same Masoretic tradition.
- **Legal status of the text:** **public domain.** The codex is a thousand years
  old; the WLC transcription is distributed by the J. Alan Groves Center / Westminster
  Theological Seminary for free use.
- **Digital form used here:** the **Open Scriptures Hebrew Bible (OSHB)** —
  openscriptures/morphhb on GitHub. It carries the WLC text verse-by-verse with
  morphology (lemma + parsing on every word) in OSIS XML. The OSHB project's own
  additions are **CC BY 4.0** (attribute Open Scriptures Hebrew Bible); the
  underlying WLC text remains public domain. The morphology is a bonus the site
  does not need for display text — extraction strips it (§3).

## 2. The route — PROVEN from this desk (2026-11-24)

Desk curl egress runs through a proxy; several publisher sites fail through it
(Tanach.us book URLs 404'd, AlQuran-style APIs vary), but **raw.githubusercontent.com
works**. One file per book:

```
https://raw.githubusercontent.com/openscriptures/morphhb/master/wlc/<Book>.xml
```

**Proof — the book of Genesis, downloaded whole and verified:**

| Check | Expected | Got |
|---|---|---|
| File | — | `Gen.xml`, 1,859,928 bytes, HTTP 200 |
| Chapters | 50 | **50** (osisID Gen.1 … Gen.50) |
| Verses | 1,533 | **1,533** (`<verse osisID>` start markers) |
| Gen 1 verses | 31 | **31** |
| Gen 2 verses | 25 | **25** |
| Gen 50 verses | 26 | **26** |
| Text sample (Gen 1:1) | pointed Hebrew | בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ — full cantillation/pointing intact |

Spot checks of the same route: `Ruth.xml` (136,188 bytes, HTTP 200) and
`Jonah.xml` (80,534 bytes, HTTP 200) also arrive whole.

**Independent corroboration of the text:** the Sefaria API
(`https://www.sefaria.org/api/texts/Genesis.1?lang=he`) was fetched from this desk
the same day and returns the same pointed Masoretic text for Genesis 1 (31 verses) —
two independent digital witnesses to the same WLC tradition agree.

## 3. Format + extraction

Each book file is OSIS XML: `<verse osisID="Gen.1.1">` milestones delimit verses;
inside a verse, every word is a `<w>` element carrying the pointed word form plus
lemma/morph attributes, and `<note>` elements carry Masoretic notes. Display-text
extraction is mechanical and lossless for our purpose:

1. Split on `<verse osisID="Book.C.V">` boundaries → per-chapter verse lists.
2. Strip all tags inside a verse, keeping the word forms (with pointing and
   cantillation, exactly as the codex prints them); collapse whitespace.
3. Section markers ({פ} / {ס}, petuhah/setumah) survive as paragraph breaks —
   they are part of the Masoretic text's own layout, keep them as breaks, not text.
4. Emit one JSON per book: `{book, chapters: [{chapter, verses: [text…]}]}` —
   the shape the site's chapter-slot filler will consume at landing.

## 4. Full acquisition plan — the remaining 38 books

Same URL pattern, one GET per book, then the **acceptance audit per book** (the
COVERAGE.md method): chapter count and per-chapter verse counts checked against
the expected Masoretic table before the book is accepted into the packet; any
mismatch stops that book and is reported, never patched over.

- **Scope:** 39 books total (the site's 39 hubs), **929 chapters, 23,145 verses**
  in Masoretic numbering.
- **File names** follow the pattern proven for Gen/Ruth/Jonah (`<EnglishName>.xml`
  in `wlc/`); each remaining name is confirmed by its HTTP 200 + count audit at
  pull time (the GitHub API was rate-limited from this desk during this run, so
  the directory listing itself was not enumerated — the per-book audit is the
  verification, and it is stronger than a listing).
- **Numbering note (recorded, not a defect):** the Hebrew library follows
  **Hebrew numbering**, which differs from KJV numbering in known places —
  e.g. Psalm superscriptions count as verse 1 in many psalms; Joel and Malachi
  chapter splits differ; 1 Samuel/2 Samuel and Kings/Chronicles naming follows
  the English hub names the site already uses. The libraries stay separate and
  unmixed, so no cross-mapping is needed; where a hub page cross-references the
  KJV chapter, YWC's landing pass owns any note about the offset.
- **Order:** Torah first (Genesis done; Exodus → Deuteronomy), then the site's
  hub order. Estimated effort: the downloads are minutes; the per-book count
  audit is the work — scripted, same script as the Genesis proof.
- **Deliverable to YWC:** 39 per-book JSONs + this document + the audit table
  (expected vs got, per book), as one landing packet. Landing (hub-page fill,
  per-chapter pages if the design grows them) is YWC's, per-chapter verified.

## 5. Backup routes (if the GitHub route ever fails)

1. **Tanach.us** — the Groves Center's own WLC XML service (free use with
   attribution). Its per-book URLs 404'd through this desk's proxy on
   2026-11-24; the whole-Tanach XML endpoint exists but is very large. Backup
   only, via a fleet seat if the desk route fails.
2. **Sefaria API** — proven reachable from this desk (Genesis 1 fetched);
   per-chapter GETs (929 requests) make it the slow-but-sure fallback. Its
   Hebrew base text is the same Masoretic text; per-version licensing on
   Sefaria varies, so this route needs the version pinned to the public-domain
   Hebrew text before bulk use.
3. **STEP Bible (TAHOT), Tyndale House** — CC BY 4.0, GitHub-hosted; same WLC
   base with Tyndale's own markup. Viable alternate if OSHB's repo moves.

## 6. What is NOT claimed

No Hebrew text has been placed on the site by this workstream; no hub page was
edited; the only downloads are the three proof files (Genesis, Ruth, Jonah)
fetched to /tmp on the desk as evidence. The remaining 36 books are un-fetched
until YWC schedules the pull — the route, the format, and the audit are proven,
which is what this phase owed.
