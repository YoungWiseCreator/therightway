// depth.js — Layer 3 Depth (Open Design strategies + Scrollcraft)
// Small, dependency-free. Adds behaviour where elements exist; any error leaves page as authored.

(function(){
  'use strict';

  // Helper: safely execute a function, swallow any error
  function safe(fn){
    try{ fn(); }catch(e){ /* leave page as authored */ }
  }

  // Reduced motion preference
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Road draw ----
  var roadEl = document.querySelector('.road');
  if(roadEl && !prefersReducedMotion && 'IntersectionObserver' in window && 'requestAnimationFrame' in window){
    var roadLine = roadEl.querySelector('.road-line');
    var roadDots = roadEl.querySelectorAll('.road-dot');
    var peakAct = roadEl.closest('.peak-act');

    if(roadLine && roadDots.length === 3 && peakAct){
      var ticking = false;
      function onScroll(){
        if(ticking) return;
        ticking = true;
        requestAnimationFrame(function(){
          ticking = false;
          var rect = peakAct.getBoundingClientRect();
          var viewportCentre = window.innerHeight / 2;
          var actTop = rect.top;
          var actHeight = rect.height;
          var p = (viewportCentre - actTop) / actHeight;
          if(p < 0) p = 0;
          else if(p > 1) p = 1;

          // Set --road custom property on the road element
          roadEl.style.setProperty('--road', p.toFixed(4));

          // Toggle .lit on dots at thresholds
          if(p >= 0.04) roadDots[0].classList.add('lit'); else roadDots[0].classList.remove('lit');
          if(p >= 0.5) roadDots[1].classList.add('lit'); else roadDots[1].classList.remove('lit');
          if(p >= 0.96) roadDots[2].classList.add('lit'); else roadDots[2].classList.remove('lit');
        });
      }

      window.addEventListener('scroll', onScroll, {passive:true});
      // Initial paint
      onScroll();
    }
  }else if(roadEl && (prefersReducedMotion || !('IntersectionObserver' in window) || !('requestAnimationFrame' in window))){
    // Reduced motion or no IO/rAF: fully drawn, all dots lit
    var roadLine = roadEl.querySelector('.road-line');
    var roadDots = roadEl.querySelectorAll('.road-dot');
    if(roadLine) roadLine.style.transform = 'scaleX(1)';
    roadDots.forEach(function(dot){ dot.classList.add('lit'); });
  }

  // ---- Hero letters counter-drift ----
  var floatLetters = document.querySelector('.float-letters');
  if(floatLetters && !prefersReducedMotion && 'requestAnimationFrame' in window){
    var ticking = false;
    function onScrollHero(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        ticking = false;
        var scrollY = window.scrollY || window.pageYOffset;
        if(scrollY < window.innerHeight){
          floatLetters.style.transform = 'translateY(' + (scrollY * -0.08) + 'px)';
        }
      });
    }
    window.addEventListener('scroll', onScrollHero, {passive:true});
  }
})();