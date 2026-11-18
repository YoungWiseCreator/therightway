document.documentElement.classList.add('js');
// ============================================================
// Etz Chaim / The Right Way — site configuration
// ------------------------------------------------------------
// DONATE_LINK: the single Stripe donation link for therightway.life.
// Every Donate button on the site reads this one constant.
// STATUS AT LAUNCH (2026-11-16): EMPTY — no Stripe donation link
// exists yet for therightway.life. While empty, donation buttons
// route to the Donate page (donate.html). The moment the Stripe
// link is created, paste it here — one edit lights up every
// button on the site.
// ============================================================
const DONATE_LINK = "";

// INTAKE_ENDPOINT: the single free-intake endpoint for the site's
// done-for-you tools (tools/). Same pattern as DONATE_LINK above.
// WIRED 2026-11-16: the fleet bookings spine (POST /api/lead, the
// same intake the other fleet sites post to; therightway.life is
// registered there as an email-first site). Each tool still builds
// its full result right on the page; the name + email + tool inputs
// also go to the fleet so we can follow up — done for you, free.
const INTAKE_ENDPOINT = "https://bookings.chasethealgo.com/api/lead";