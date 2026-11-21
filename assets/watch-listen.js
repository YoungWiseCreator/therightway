/* watch-listen.js — click-to-play facades for chapter Watch sections.
 * Thumbnails load first (fast page); the true YouTube iframe
 * (youtube-nocookie, specific video ID) replaces the facade in place
 * on click, so the visitor stays on therightway.life. Same embed
 * discipline as the fleet's band pattern. */
(function () {
  'use strict';
  function activate(btn) {
    var id = btn.getAttribute('data-ytid');
    if (!id) return;
    var iframe = document.createElement('iframe');
    iframe.className = 'wl-frame';
    var src = 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0';
    /* Chapter cuts (Cameron 2026-11-20): where a source video spans
     * beyond the chapter, the facade carries the chapter's in/out
     * seconds and the player itself enforces the segment — the video
     * is never downloaded, edited, or re-hosted. */
    var start = btn.getAttribute('data-start');
    var end = btn.getAttribute('data-end');
    if (start) src += '&start=' + start;
    if (end) src += '&end=' + end;
    iframe.src = src;
    iframe.title = btn.getAttribute('data-title') || 'Chapter video';
    iframe.setAttribute('allow',
      'accelerometer; autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    btn.replaceWith(iframe);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.wl-facade') : null;
    if (btn) activate(btn);
  });
})();
