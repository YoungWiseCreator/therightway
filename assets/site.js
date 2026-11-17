// Etz Chaim / The Right Way — shared site behaviour
(function () {
  "use strict";

  if (typeof DONATE_LINK !== "undefined" && DONATE_LINK) {
    document.querySelectorAll("a.donate-btn").forEach(function (link) {
      link.setAttribute("href", DONATE_LINK);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var navigation = document.querySelector(".nav-links");
  var moreWrap = document.querySelector(".nav-more");
  var moreToggle = document.querySelector(".nav-more-toggle");

  function setNavigation(open) {
    document.body.classList.toggle("nav-open", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  function setMore(open) {
    if (!moreWrap || !moreToggle) return;
    moreWrap.classList.toggle("open", open);
    moreToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navToggle && navigation) {
    navToggle.addEventListener("click", function () {
      setNavigation(!document.body.classList.contains("nav-open"));
    });
  }

  if (moreToggle && moreWrap) {
    moreToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setMore(!moreWrap.classList.contains("open"));
    });
  }

  document.addEventListener("click", function (event) {
    if (moreWrap && !moreWrap.contains(event.target)) setMore(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var moreWasOpen = moreWrap && moreWrap.classList.contains("open");
    var navWasOpen = document.body.classList.contains("nav-open");
    setMore(false);
    setNavigation(false);
    if (moreWasOpen && moreToggle) moreToggle.focus();
    else if (navWasOpen && navToggle) navToggle.focus();
  });

  if (navigation) {
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavigation(false);
        setMore(false);
      });
    });
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) setNavigation(false);
  });

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  }
})();
