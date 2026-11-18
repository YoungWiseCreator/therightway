document.documentElement.classList.add('js');
// ============================================================
// Etz Chaim / The Right Way — site configuration
// ------------------------------------------------------------
// DONATE_LINK: the single Stripe donation link for therightway.life.
// Every Donate button on the site reads this one constant.
// STATUS: LIVE (2026-11-18) — Stripe donation link created on the
// fleet account of record (AIDCOS, acct_1TbMSGFRf1U6fUlZ):
// payment link plink_1UdE2jFRf1U6fUlZglemG2FQ, product
// prod_VeX6JxI92P1yVe ("The Right Way — Donation"), donor-set
// amount, submit_type=donate. While this constant were ever empty,
// donation buttons would route to the Donate page (donate.html).
// ============================================================
const DONATE_LINK = "https://donate.stripe.com/7sY14ndkyfG1833aGLeAg1m";

// INTAKE_ENDPOINT: the single free-intake endpoint for the site's
// done-for-you tools (tools/). Same pattern as DONATE_LINK above.
// WIRED 2026-11-16: the fleet bookings spine (POST /api/lead, the
// same intake the other fleet sites post to; therightway.life is
// registered there as an email-first site). Each tool still builds
// its full result right on the page; the name + email + tool inputs
// also go to the fleet so we can follow up — done for you, free.
const INTAKE_ENDPOINT = "https://bookings.chasethealgo.com/api/lead";