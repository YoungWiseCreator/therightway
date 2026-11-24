# Quran Sourcing — The Right Way, Quran Library

**Mission WS-C, TRW team build 2026-11-24.** The Quran library on therightway.life
is structure-only today: 114 surah pages + index exist, every ayah slot reads
"reserved (verification in progress)", no surah text has been published
(COVERAGE.md gap 7). This document names the text and the translation, their
legal status, the acquisition routes **proven from this desk**, and the full
plan. The Quran library stays **separate and unmixed** — its governing source
is the Quran itself, not the KJV/Hebrew/DSS triad, and nothing in this packet
crosses the libraries. Nothing here is published — YWC lands.

## 1. The Arabic text: Tanzil (Uthmani script)

- **What it is:** the **Tanzil Quran text** — the carefully verified digital
  Quran text produced by the Tanzil Project, in **Uthmani script** (the
  orthography of the Madinah mushaf). It is the de-facto standard digital
  Quran text, verified by the project against printed mushafs.
- **Legal status:** Tanzil distributes the text **free for non-commercial use
  with attribution**; the text itself must not be altered. The Right Way is a
  non-commercial ministry site; the attribution ("Quran text: Tanzil") rides
  with the library at landing, and the text is used byte-for-byte, never edited.
- **Route problem, named plainly:** Tanzil's own download endpoints for the
  Uthmani XML (`tanzil.net/pub/download/quran-uthmani.xml`,
  `tanzil.net/download/quran-uthmani.xml`) return **404 as of 2026-11-24** —
  the site has restructured. The text is nevertheless fully obtainable:

### The working route — AlQuran Cloud API, edition `quran-uthmani`

The AlQuran Cloud API (Islamic Network) serves the Tanzil Uthmani text as JSON,
per surah: `https://api.alquran.cloud/v1/surah/<n>/quran-uthmani`
(whole-Quran form: `https://api.alquran.cloud/v1/quran/quran-uthmani`).

**Proof, two independent fetch paths from this desk (2026-11-24):**

| Fetch | Surah | Expected ayahs | Got |
|---|---|---|---|
| Browser fetch of the API | 1 (Al-Faatiha) | 7 | **7/7**, full Uthmani text + edition metadata ("Uthmani", ar, rtl) |
| Plain curl of the API | 36 (Ya-Sin) | 83 | **83/83** ayahs in payload, `numberOfAyahs: 83` |

Surah 1's first ayah arrives as بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ — Uthmani
orthography intact (dagger alif, ٱ forms), not a simplified respelling.

## 2. The English translation: Pickthall (1930) — public domain

- **What it is:** Mohammed Marmaduke Pickthall, *The Meaning of the Holy Qur'an*
  (1930) — the first English translation of the Quran by an English Muslim,
  a standard, widely reprinted rendering in deliberately scriptural English.
- **Legal status:** **public domain** (published 1930; Pickthall died 1936).
  No permission needed; attribution is courtesy, and the packet carries it.
- **Route — PROVEN:** Tanzil's translation distribution still works even though
  its Quran-text endpoints moved:
  `https://tanzil.net/trans/en.pickthall` — one file, pipe format
  `surah|ayah|text`, 864,918 bytes, HTTP 200, downloaded whole 2026-11-24.
  (Tanzil asks that distributed translation files keep their attribution and
  not be modified in transit; we store it untouched and extract at build time.)
- **Verification of the downloaded file (parsed in full):**

| Check | Expected | Got |
|---|---|---|
| Surahs | 114 | **114** |
| Total ayahs | 6,236 | **6,236** |
| Surah 1 | 7 | **7** |
| Surah 2 | 286 | **286** |
| Surah 36 | 83 | **83** |
| Surah 114 | 6 | **6** |

Sample (1:1): "In the name of Allah, the Beneficent, the Merciful." — Pickthall's
wording, matching the Arabic ayah-for-ayah.

## 3. Full acquisition plan — all 114 surahs

1. **Arabic:** 114 GETs on the AlQuran Cloud per-surah endpoint above (or the
   single whole-Quran GET), stored raw. **Acceptance audit per surah:** the
   payload's ayah count must equal the standard count for that surah (the same
   table the Pickthall file just passed: 6,236 total); a mismatch stops that
   surah and is reported, never patched.
2. **Translation:** the Pickthall file is already acquired and verified whole —
   no further fetching needed; split it per surah at packet build.
3. **Packet shape per surah** (matching the site's pages — e.g. Surah 1's page
   already reserves exactly 7 ayah slots):
   `{surah, name, ayahs: [{n, arabic_uthmani, pickthall_en}]}` ×114, delivered
   to YWC as one landing packet with the audit table (expected vs got, per surah).
4. **Separation discipline:** these files live only in the Quran packet; no
   KJV/Hebrew material enters them and no Quran material enters the other
   libraries' packets. The Quran library's video standard is a separate open
   item (VIDEO-CURATION.md §6) — this packet is text only and invents no
   video rule.

## 4. Backup routes

1. **Tanzil direct**, if its download endpoints return: the Uthmani XML from
   tanzil.net remains the canonical artifact; re-test at acquisition time.
2. **AlQuran Cloud alternate editions** on the same API (e.g. `quran-simple`)
   exist but are NOT substitutes — Uthmani is the named edition; a fallback
   that changes the script changes the text and would need YWC's ruling.
3. **GitHub mirrors of the Tanzil XML** exist in several repos; usable only
   after a byte-level spot audit against the API-fetched surahs above
   (a mirror is a witness, not a source).

## 5. What is NOT claimed

No Quran text has been placed on the site by this workstream; no surah page was
edited. Evidence on the desk: the full Pickthall file (verified) and the two
proof surah payloads (1 and 36, both complete). The remaining 112 Arabic surahs
are un-fetched until YWC schedules the pull — the routes, editions, and audit
are proven, which is what this phase owed.
