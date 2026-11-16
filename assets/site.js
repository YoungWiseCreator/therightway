// Etz Chaim / The Right Way — site behaviour
(function () {
  // Wire every donation button to the single DONATE_LINK constant.
  if (typeof DONATE_LINK !== "undefined" && DONATE_LINK) {
    document.querySelectorAll("a.donate-btn").forEach(function (a) {
      a.setAttribute("href", DONATE_LINK);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }
  // Reveal-on-scroll for band/card sections.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  // Gentle hero parallax (transform only, disabled for reduced motion).
  var hero = document.querySelector(".hero");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && !reduce) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        hero.style.setProperty("--par", (y * 0.18) + "px");
      }
    }, { passive: true });
  }
})();
