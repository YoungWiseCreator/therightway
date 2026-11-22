# Chapter Player — one player, three libraries

Cameron's spec 2026-11-21 ~14:24 EST, extended ~14:31 EST: **every**
chapter page on therightway.life — in all three libraries (oldest KJV,
Hebrew Bible, Quran; three separate, unmixed sections) — carries the
same player:

- **Three videos per chapter**, chapter-only cuts through the official
  YouTube embed (start/end parameters only, never downloaded/re-hosted):
  a **cartoon version for kids** (guaranteed slot), an **adult version**
  (as realistic as possible), and a **third version** (either style, a
  third viewpoint).
- **Full chapter audio** — the narrator voice (avocado_v2:qvd_03311,
  the one-voice law) reading every verse: KJV in English, the Hebrew
  Bible read in Hebrew, the Quran read in Arabic.
- **Modes:** the visitor chooses **video play or audio-only play**;
  video then offers kids / adults / third.
- **Autoplay chain:** one click starts it; a finished chapter loads and
  plays the next in the same mode and version. **Daytime:** after 3
  auto-advances, a "Still there? Keep going" prompt pauses the chain;
  one click resumes another 3. **Sleep mode:** no check-ins — it plays
  on until the visitor stops it.

## How a chapter page plugs in

The engine is `assets/chapter-player.js` + the `.cp` styles in
`assets/chapter.css`. It is **config-driven and library-agnostic** — a
chapter page needs only:

1. The Listen section with the chapter's audio file (the player slot
   shows only where audio actually exists — no dead players).
2. The player panel markup (copy from any `read/genesis-*.html` page).
3. A `#cp-config` JSON block:

```json
{
  "library": "kjv | hebrew | quran",
  "lang": "en | he | ar", "dir": "ltr | rtl",
  "name": "Genesis 1",
  "audio": "../assets/audio/<library>/genesis-1.mp3",
  "next": "<next chapter page or null>", "nextName": "Genesis 2",
  "versions": {
    "kids":  {"ytid": "…", "start": 0, "end": 0},
    "adult": {"ytid": "…", "start": 0, "end": 0},
    "third": {"ytid": "…"} 
  }
}
```

`start`/`end` are optional chapter-cut seconds. A version with no
video yet is `null` (or omitted): its band card renders as a clean
empty state and its version button disables — never a broken embed,
never a fake placeholder presented as real.

4. The versioned Watch band: one `.wl-card` per version with a
   `.wl-ver` tag (`For Kids · Cartoon` / `For Adults · Realistic` /
   `Another View`), or the `.wl-empty` card for a missing version.

**Library separation is enforced in the engine:** player state and
the autoplay chain counter are namespaced per library
(`trw_cp_state_v1_<library>`), so a chain can never carry a visitor
from one library into another, and `next` always points inside the
same library's chapter sequence.

## Population status (2026-11-21, this build)

- **KJV — populated first (the priority):** Genesis 1–3 carry the full
  player. Audio: certified full-chapter reads for all three. Videos:
  Genesis 1 and 2 have all three versions (our own episode in the kids
  slot, the epic visualized cut in the adult slot, a third animated
  viewpoint). Genesis 3 has kids (ShareFaith Kids) + adult (epic cut);
  the third slot is an empty state — **our Genesis 3 episode is
  private and is never embedded until it publishes.**
- **Hebrew Bible — plugs in next:** Phase 0 sources are locked (WLC
  Hebrew via eBible.org) and the narrator's Hebrew voice proof PASSED.
  Chapter pages take the identical panel + a `library:"hebrew"`,
  `lang:"he"`, `dir:"rtl"` config as their audio and videos land.
- **Quran — plugs in after Hebrew:** Phase 0 sources locked (Tanzil
  Uthmani v1.1 Arabic). **⚠️ OPEN FLAG from Phase 0: the narrator's
  Arabic voice verdict was NEEDS GPU RETEST** — Quran chapter audio
  must not be generated for the site until that retest passes.
  Chapter pages take the identical panel + a `library:"quran"`,
  `lang:"ar"`, `dir:"rtl"` config when audio and videos land.
