/* Fleet language toggle — switcher wired after parleylingo.site's lang-switch
   system: buttons carry data-lang (en|es|ht|pt|fr|zh|he), the active choice is
   marked + persisted, <html lang> follows, and keyed chrome strings swap from
   the per-language tables below. Preview scope: navigation, Donate, hero
   headline/lead/primary action and the donate-page lead carry tables; the full
   per-page string tables are the live-application step. */
(function () {
  var TABLES = {
    es: {"The Journey":"El Camino","Watch":"Ver","Study":"Estudiar","Community":"Comunidad","Get Help":"Obtener ayuda","Help":"Ayuda","About & Sources":"Acerca de y fuentes","Donate":"Donar","More pages":"Más páginas","The Bible, chapter by chapter":"La Biblia, capítulo por capítulo","Start with Genesis 1":"Comienza con Génesis 1","Begin the Journey":"Comienza el Camino","See Genesis 1 come to life on YouTube":"Mira Génesis 1 cobrar vida en YouTube","Keep every story, tool, and resource free":"Que cada historia, herramienta y recurso siga siendo gratis"},
    ht: {"The Journey":"Vwayaj la","Watch":"Gade","Study":"Etidye","Community":"Kominote","Get Help":"Jwenn èd","Help":"Èd","About & Sources":"Enfòmasyon ak sous","Donate":"Bay","More pages":"Plis paj","The Bible, chapter by chapter":"Bib la, chapit pa chapit","Start with Genesis 1":"Kòmanse ak Jenèz 1","Begin the Journey":"Kòmanse Vwayaj la","See Genesis 1 come to life on YouTube":"Gade Jenèz 1 pran lavi sou YouTube","Keep every story, tool, and resource free":"Kenbe chak istwa, zouti ak resous gratis"},
    pt: {"The Journey":"A Jornada","Watch":"Assistir","Study":"Estudar","Community":"Comunidade","Get Help":"Obter ajuda","Help":"Ajuda","About & Sources":"Sobre e fontes","Donate":"Doar","More pages":"Mais páginas","The Bible, chapter by chapter":"A Bíblia, capítulo por capítulo","Start with Genesis 1":"Comece com Gênesis 1","Begin the Journey":"Comece a Jornada","See Genesis 1 come to life on YouTube":"Veja Gênesis 1 ganhar vida no YouTube","Keep every story, tool, and resource free":"Mantenha cada história, ferramenta e recurso gratuitos"},
    fr: {"The Journey":"Le Parcours","Watch":"Regarder","Study":"Étudier","Community":"Communauté","Get Help":"Obtenir de l'aide","Help":"Aide","About & Sources":"À propos et sources","Donate":"Faire un don","More pages":"Plus de pages","The Bible, chapter by chapter":"La Bible, chapitre par chapitre","Start with Genesis 1":"Commencez par Genèse 1","Begin the Journey":"Commencez le Parcours","See Genesis 1 come to life on YouTube":"Voyez Genèse 1 prendre vie sur YouTube","Keep every story, tool, and resource free":"Garder chaque histoire, outil et ressource gratuits"},
    zh: {"The Journey":"旅程","Watch":"观看","Study":"研读","Community":"社区","Get Help":"获得帮助","Help":"帮助","About & Sources":"关于与来源","Donate":"捐赠","More pages":"更多页面","The Bible, chapter by chapter":"圣经,逐章呈现","Start with Genesis 1":"从创世记第 1 章开始","Begin the Journey":"开始旅程","See Genesis 1 come to life on YouTube":"在 YouTube 上看创世记第 1 章活起来","Keep every story, tool, and resource free":"让每个故事、工具和资源都保持免费"},
    he: {"The Journey":"המסע","Watch":"צפייה","Study":"לימוד","Community":"קהילה","Get Help":"קבלת עזרה","Help":"עזרה","About & Sources":"אודות ומקורות","Donate":"תרומה","More pages":"דפים נוספים","The Bible, chapter by chapter":"התנ״ך, פרק אחר פרק","Start with Genesis 1":"התחילו בבראשית 1","Begin the Journey":"התחילו את המסע","See Genesis 1 come to life on YouTube":"ראו את בראשית 1 מתעורר לחיים ביוטיוב","Keep every story, tool, and resource free":"לשמור על כל סיפור, כלי ומשאב בחינם"}
  };
  function apply(lang) {
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang === "he" ? "he" : lang === "zh" ? "zh" : lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!el.getAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", el.textContent);
      var table = TABLES[lang];
      el.textContent = (lang === "en") ? el.getAttribute("data-i18n-en")
        : (table && table[key]) ? table[key] : el.getAttribute("data-i18n-en");
    });
    try { localStorage.setItem("trw-lang", lang); } catch (e) {}
  }
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
  });
  var saved = "en";
  try { saved = localStorage.getItem("trw-lang") || "en"; } catch (e) {}
  if (saved !== "en") apply(saved);
})();
