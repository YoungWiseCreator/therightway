/* Fleet language toggle — CCR preview build. Current language set per
   Cameron's 2026-11-17 ruling: en|es|fr|pt|ru|zh|he (Kreyòl out, Russian in).
   Buttons carry data-lang, the active choice is marked + persisted,
   <html lang> follows, and keyed chrome strings swap from the per-language
   tables below. Keys are the CCR build's actual chrome strings (its renamed
   nav labels + new hero headline). Preview scope: navigation, Donate/Give,
   hero headline + primary action carry tables; the full per-page string
   tables are the live-application step. */
(function () {
  var TABLES = {
    es: {"Read the Bible":"Leer la Biblia","Watch":"Ver","Study":"Estudiar","Find Help":"Buscar ayuda","Free Help":"Ayuda gratuita","Home":"Inicio","Community":"Comunidad","Youth":"Jóvenes","About & Sources":"Acerca de y fuentes","Blog":"Blog","Donate":"Donar","Give":"Dar","Begin the Journey":"Comienza el Camino","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"Toda la Biblia — capítulo por capítulo, 1.189 capítulos, gratis"},
    fr: {"Read the Bible":"Lire la Bible","Watch":"Regarder","Study":"Étudier","Find Help":"Trouver de l'aide","Free Help":"Aide gratuite","Home":"Accueil","Community":"Communauté","Youth":"Jeunesse","About & Sources":"À propos et sources","Blog":"Blog","Donate":"Faire un don","Give":"Donner","Begin the Journey":"Commencez le Parcours","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"Toute la Bible — chapitre par chapitre, 1 189 chapitres, gratuite"},
    pt: {"Read the Bible":"Ler a Bíblia","Watch":"Assistir","Study":"Estudar","Find Help":"Encontrar ajuda","Free Help":"Ajuda gratuita","Home":"Início","Community":"Comunidade","Youth":"Juventude","About & Sources":"Sobre e fontes","Blog":"Blog","Donate":"Doar","Give":"Doar","Begin the Journey":"Comece a Jornada","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"Toda a Bíblia — capítulo por capítulo, 1.189 capítulos, grátis"},
    ru: {"Read the Bible":"Читать Библию","Watch":"Смотреть","Study":"Изучать","Find Help":"Найти помощь","Free Help":"Бесплатная помощь","Home":"Главная","Community":"Сообщество","Youth":"Молодёжь","About & Sources":"О нас и источники","Blog":"Блог","Donate":"Пожертвовать","Give":"Пожертвовать","Begin the Journey":"Начать путешествие","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"Вся Библия — глава за главой, 1 189 глав, бесплатно"},
    zh: {"Read the Bible":"阅读圣经","Watch":"观看","Study":"研读","Find Help":"寻求帮助","Free Help":"免费帮助","Home":"首页","Community":"社区","Youth":"青年","About & Sources":"关于与来源","Blog":"博客","Donate":"捐赠","Give":"捐赠","Begin the Journey":"开始旅程","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"整本圣经——逐章呈现，1,189章，免费"},
    he: {"Read the Bible":"לקרוא את התנ״ך","Watch":"צפייה","Study":"לימוד","Find Help":"מציאת עזרה","Free Help":"עזרה חינם","Home":"בית","Community":"קהילה","Youth":"נוער","About & Sources":"אודות ומקורות","Blog":"בלוג","Donate":"תרומה","Give":"לתרום","Begin the Journey":"התחילו את המסע","The Whole Bible — Chapter by Chapter, 1,189 Chapters, Free":"התנ״ך כולו — פרק אחר פרק, 1,189 פרקים, בחינם"}
  };
  function apply(lang) {
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
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
