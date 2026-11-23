/* chapter-player.js — The Right Way chapter player (Cameron spec
 * 2026-11-21 ~14:24 EST).
 *
 * Per chapter page: the visitor chooses VIDEO play or AUDIO-ONLY play.
 * Video carries up to three chapter-only versions — Kids (cartoon),
 * Adults (as realistic as possible), and a Third viewpoint — played
 * through the official YouTube embed (IFrame API, start/end cuts only;
 * nothing is downloaded or re-hosted). Audio-only plays the chapter's
 * own narration file (the narrator voice reading every verse).
 *
 * AUTOPLAY: one click on Play (with Autoplay on) starts the chain —
 * that click is the user gesture browser policy requires. When a
 * chapter finishes, the next chapter loads and plays in the same
 * mode and version. DAYTIME (default): after 3 chapters have
 * auto-advanced, playback pauses on a "Still there?" prompt; one
 * click resumes for another 3. SLEEP MODE: no check-ins — the chain
 * runs until the visitor stops it. Choices persist in localStorage.
 */
(function () {
  'use strict';

  var cfgEl = document.getElementById('cp-config');
  var root = document.getElementById('chapter-player');
  if (!cfgEl || !root) return;
  var CFG;
  try { CFG = JSON.parse(cfgEl.textContent); } catch (e) { return; }

  /* Library-aware (Cameron extension 2026-11-21 ~14:31 EST): the same
   * player serves all three libraries — KJV, Hebrew Bible, Quran.
   * CFG.library names the library ('kjv' default, 'hebrew', 'quran');
   * state is namespaced per library so a chain NEVER crosses from one
   * library into another (the libraries stay separate and unmixed),
   * and CFG.lang/CFG.dir let Hebrew (he, rtl) and Quran (ar, rtl)
   * chapter pages carry their own language and direction. */
  var LIB = (CFG.library === 'hebrew' || CFG.library === 'quran') ? CFG.library : 'kjv';
  var LS_KEY = 'trw_cp_state_v1_' + LIB;
  var SS_KEY = 'trw_cp_chain_v1_' + LIB;
  if (CFG.lang) root.setAttribute('lang', CFG.lang);
  if (CFG.dir) root.setAttribute('dir', CFG.dir);

  function loadState() {
    try {
      var s = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      return {
        mode: s.mode === 'audio' ? 'audio' : 'video',
        version: ['kids', 'adult', 'third'].indexOf(s.version) >= 0 ? s.version : 'kids',
        autoplay: !!s.autoplay,
        sleep: !!s.sleep,
        ts: s.ts || 0
      };
    } catch (e) {
      return { mode: 'video', version: 'kids', autoplay: false, sleep: false, ts: 0 };
    }
  }
  function saveState() {
    state.ts = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function chainCount() {
    var n = parseInt(sessionStorage.getItem(SS_KEY) || '0', 10);
    return isNaN(n) ? 0 : n;
  }
  function setChain(n) {
    try { sessionStorage.setItem(SS_KEY, String(n)); } catch (e) {}
  }

  var state = loadState();

  /* If the chosen version does not exist on this chapter, fall back
   * in a fixed order so the chain never lands on an empty slot. */
  function pickVersion(want) {
    var order = [want, 'kids', 'adult', 'third'];
    for (var i = 0; i < order.length; i++) {
      if (CFG.versions && CFG.versions[order[i]]) return order[i];
    }
    return null;
  }
  state.version = pickVersion(state.version) || 'kids';

  /* Language-aware audio (fleet language-switch law, Cameron
   * 2026-11-23): the site language lives in localStorage 'nmt_lang'
   * (the i18n walker's key, shared fleet-wide and persisted across
   * pages). English narration is CFG.audio; a translated narration
   * ships beside it as assets/audio/<slug>-<lang>.mp3 and is named in
   * CFG.audioI18n. When the visitor's language has no narration file
   * for this chapter, the player says so plainly — it never quietly
   * plays the English file as if the audio had switched. */
  var LANG_KEY = 'nmt_lang';
  var LANG_NAMES = { en: 'English', es: 'Español', fr: 'Français', pt: 'Português', ru: 'Русский', zh: '中文', he: 'עברית' };
  function curLang() {
    try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { return 'en'; }
  }
  function audioFor(lang) {
    if (!CFG.audio) return null;
    if (!lang || lang === 'en') return CFG.audio;
    return (CFG.audioI18n && CFG.audioI18n[lang]) || null;
  }
  var audioLang = curLang();
  var mirrorEls = [];
  function applyAudioLang(lang, keepState) {
    audioLang = lang;
    var url = audioFor(lang);
    var wasPlaying = !!(keepState && playing);
    var t = 0;
    try { t = els.audio.currentTime || 0; } catch (e) {}
    if (url) {
      if (els.audio.getAttribute('src') !== url) {
        els.audio.src = url;
        els.audio.load();
        if (t > 0) {
          var resume = function () {
            els.audio.removeEventListener('loadedmetadata', resume);
            try { els.audio.currentTime = Math.min(t, els.audio.duration || t); } catch (e) {}
            if (wasPlaying) startAudio();
          };
          els.audio.addEventListener('loadedmetadata', resume);
        } else if (wasPlaying) {
          startAudio();
        }
      }
      for (var i = 0; i < mirrorEls.length; i++) {
        if (mirrorEls[i].getAttribute('src') !== url) mirrorEls[i].src = url;
      }
    } else {
      try { els.audio.pause(); els.audio.removeAttribute('src'); els.audio.load(); } catch (e) {}
      playing = false;
      setStatus('The reading of ' + CFG.name + ' in ' + (LANG_NAMES[lang] || lang) + ' is not here yet.');
    }
  }

  var els = {
    modes: root.querySelectorAll('.cp-mode'),
    versions: root.querySelectorAll('.cp-ver'),
    versionRow: root.querySelector('.cp-versions'),
    stageVideo: document.getElementById('cp-stage-video'),
    stageAudio: document.getElementById('cp-stage-audio'),
    audio: document.getElementById('cp-audio'),
    playBtn: document.getElementById('cp-play'),
    autoBtn: document.getElementById('cp-autoplay'),
    sleepBox: document.getElementById('cp-sleep'),
    status: document.getElementById('cp-status'),
    prompt: document.getElementById('cp-prompt'),
    keepBtn: document.getElementById('cp-keepgoing'),
    stopBtn: document.getElementById('cp-stop'),
    resume: document.getElementById('cp-resume'),
    resumeBtn: document.getElementById('cp-resume-btn')
  };

  var ytPlayer = null;
  var ytReady = null;
  var playing = false;
  var autostartBlockedTimer = null;

  function setStatus(msg) { if (els.status) els.status.textContent = msg; }

  function paint() {
    var i, b;
    for (i = 0; i < els.modes.length; i++) {
      b = els.modes[i];
      var on = b.getAttribute('data-mode') === state.mode;
      b.classList.toggle('cp-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    if (els.versionRow) {
      els.versionRow.style.display = state.mode === 'video' ? '' : 'none';
    }
    for (i = 0; i < els.versions.length; i++) {
      b = els.versions[i];
      var v = b.getAttribute('data-version');
      var exists = !!(CFG.versions && CFG.versions[v]);
      b.disabled = !exists;
      if (!exists) b.title = 'This version is not here yet for ' + CFG.name + '.';
      var von = exists && v === state.version;
      b.classList.toggle('cp-on', von);
      b.setAttribute('aria-pressed', von ? 'true' : 'false');
    }
    els.autoBtn.classList.toggle('cp-on', state.autoplay);
    els.autoBtn.setAttribute('aria-pressed', state.autoplay ? 'true' : 'false');
    els.autoBtn.textContent = 'Autoplay: ' + (state.autoplay ? 'On' : 'Off');
    els.sleepBox.checked = state.sleep;
    els.playBtn.textContent = (state.mode === 'audio' ? 'Listen to ' : 'Play ') + CFG.name +
      (state.mode === 'video' ? ' — ' + versionLabel(state.version) : '');
  }

  function versionLabel(v) {
    return { kids: 'For Kids · Cartoon', adult: 'For Adults · Realistic', third: 'Another View' }[v] || v;
  }

  function loadYouTubeAPI() {
    if (ytReady) return ytReady;
    ytReady = new Promise(function (resolve) {
      if (window.YT && YT.Player) { resolve(); return; }
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (prev) prev();
        resolve();
      };
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
    return ytReady;
  }

  function showStage() {
    els.stageVideo.style.display = state.mode === 'video' ? '' : 'none';
    els.stageAudio.style.display = state.mode === 'audio' ? '' : 'none';
  }

  function hideOverlays() {
    els.prompt.hidden = true;
    els.resume.hidden = true;
  }

  function startVideo() {
    showStage();
    hideOverlays();
    var ver = CFG.versions[state.version];
    if (!ver) { setStatus('That version is not here yet for ' + CFG.name + '.'); return; }
    loadYouTubeAPI().then(function () {
      var vars = { rel: 0, autoplay: 1, playsinline: 1 };
      if (ver.start) vars.start = ver.start;
      if (ver.end) vars.end = ver.end;
      if (ytPlayer && ytPlayer.loadVideoById) {
        var arg = { videoId: ver.ytid };
        if (ver.start) arg.startSeconds = ver.start;
        if (ver.end) arg.endSeconds = ver.end;
        ytPlayer.loadVideoById(arg);
      } else {
        ytPlayer = new YT.Player('cp-yt', {
          videoId: ver.ytid,
          host: 'https://www.youtube-nocookie.com',
          playerVars: vars,
          events: {
            onStateChange: function (ev) {
              if (ev.data === YT.PlayerState.ENDED) onChapterEnd();
              if (ev.data === YT.PlayerState.PLAYING) {
                playing = true;
                if (autostartBlockedTimer) { clearTimeout(autostartBlockedTimer); autostartBlockedTimer = null; }
                hideOverlays();
              }
            }
          }
        });
      }
      playing = true;
      setStatus('Playing ' + CFG.name + ' — ' + versionLabel(state.version) + '.');
      watchForBlockedAutoplay();
    });
  }

  function startAudio() {
    showStage();
    hideOverlays();
    if (!audioFor(audioLang)) {
      setStatus(audioLang && audioLang !== 'en'
        ? 'The reading of ' + CFG.name + ' in ' + (LANG_NAMES[audioLang] || audioLang) + ' is not here yet.'
        : 'The reading of ' + CFG.name + ' is not here yet.');
      return;
    }
    var p = els.audio.play();
    playing = true;
    setStatus('Listening to ' + CFG.name + ', read word for word.');
    if (p && p.catch) {
      p.catch(function () {
        playing = false;
        showResume('Tap to keep listening');
      });
    }
  }

  function startPlayback() {
    if (state.mode === 'audio') startAudio(); else startVideo();
  }

  /* After a cross-page advance the browser may refuse sound until the
   * visitor taps once. If nothing is playing shortly after an armed
   * auto-start, offer one clear tap instead of a silent page. */
  function watchForBlockedAutoplay() {
    if (autostartBlockedTimer) clearTimeout(autostartBlockedTimer);
    autostartBlockedTimer = setTimeout(function () {
      var stateOk = false;
      try {
        stateOk = ytPlayer && ytPlayer.getPlayerState &&
          (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING ||
           ytPlayer.getPlayerState() === YT.PlayerState.BUFFERING);
      } catch (e) {}
      if (!stateOk) showResume('Tap to keep watching');
    }, 5000);
  }

  function showResume(label) {
    els.resumeBtn.textContent = label;
    els.resume.hidden = false;
  }

  function onChapterEnd() {
    playing = false;
    if (!state.autoplay) {
      setStatus(CFG.name + ' is finished.' + (CFG.nextName ? ' ' + CFG.nextName + ' is next when you are ready.' : ''));
      return;
    }
    if (!CFG.next) {
      setStatus(CFG.name + ' is finished — that is the last chapter here for now. More chapters are on the way.');
      return;
    }
    if (!state.sleep && chainCount() >= 3) {
      /* Daytime check-in: three chapters have carried on by
       * themselves; pause until the visitor says keep going. */
      els.prompt.hidden = false;
      setStatus('Three chapters have played. Still there?');
      els.prompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    advance();
  }

  function advance() {
    setChain(chainCount() + 1);
    saveState();
    setStatus('Carrying on to ' + CFG.nextName + '…');
    window.location.href = CFG.next;
  }

  /* ---- wiring ---- */
  var i;
  for (i = 0; i < els.modes.length; i++) {
    els.modes[i].addEventListener('click', function () {
      state.mode = this.getAttribute('data-mode');
      saveState(); paint(); showStage();
    });
  }
  for (i = 0; i < els.versions.length; i++) {
    els.versions[i].addEventListener('click', function () {
      if (this.disabled) return;
      state.version = this.getAttribute('data-version');
      saveState(); paint();
      if (playing && state.mode === 'video') startVideo();
    });
  }
  els.playBtn.addEventListener('click', function () {
    setChain(0);
    saveState();
    startPlayback();
  });
  els.autoBtn.addEventListener('click', function () {
    state.autoplay = !state.autoplay;
    saveState(); paint();
    setStatus(state.autoplay
      ? 'Autoplay is on — when this chapter ends, the next one begins.' +
        (state.sleep ? ' Sleep mode is on: no check-ins.' : ' After three chapters we will check that you are still there.')
      : 'Autoplay is off.');
  });
  els.sleepBox.addEventListener('change', function () {
    state.sleep = this.checked;
    if (state.sleep) state.autoplay = true;
    saveState(); paint();
    setStatus(state.sleep
      ? 'Sleep mode is on — chapters will play on through the night until you stop them.'
      : 'Sleep mode is off — we will check in after three chapters.');
  });
  els.keepBtn.addEventListener('click', function () {
    /* One click resumes for another three chapters. */
    setChain(0);
    advance();
  });
  els.stopBtn.addEventListener('click', function () {
    els.prompt.hidden = true;
    setStatus('Paused here at the end of ' + CFG.name + '. ' + CFG.nextName + ' is ready when you are.');
  });
  els.resumeBtn.addEventListener('click', function () {
    hideOverlays();
    startPlayback();
  });
  els.audio.addEventListener('ended', onChapterEnd);

  /* Language wiring: collect the plain reader <audio> stamped beside
   * the player (same chapter file) so it follows the same switch,
   * apply the visitor's persisted language, and follow every later
   * language-switch click (the walker persists 'nmt_lang' itself;
   * the button's data-lang is the authoritative new value). */
  (function () {
    var all = document.querySelectorAll('audio');
    for (var i = 0; i < all.length; i++) {
      if (all[i] !== els.audio && CFG.audio && all[i].getAttribute('src') === CFG.audio) {
        mirrorEls.push(all[i]);
      }
    }
  })();
  applyAudioLang(curLang(), false);
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!b) return;
    var lang = b.getAttribute('data-lang') || 'en';
    setTimeout(function () { applyAudioLang(lang, true); }, 0);
  });

  paint();
  showStage();

  /* Arriving mid-chain (autoplay armed from the previous chapter):
   * begin this chapter in the same mode and version. The chain was
   * started by the visitor's own click; if the browser still wants
   * one tap on this page, the resume overlay offers exactly that. */
  var fresh = state.ts && (Date.now() - state.ts < 12 * 60 * 60 * 1000);
  if (state.autoplay && fresh && chainCount() > 0) {
    startPlayback();
  }
})();
