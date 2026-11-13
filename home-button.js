// ============================================================
// home-button.js – in jeder Unter-App der Mathe-App
// 1) runder Knopf oben links zurück zum Startmenü (/)
// 2) einheitliche Sprache: Die Sprache wird nur im Startmenü gewählt
//    (localStorage "msMathLang", 9 Sprachen). Jede App meldet über
//    window.MS_LANG = { apply(lang), hide: "CSS-Selektor" } (aus ihrer
//    msm-i18n.js), wie sie umgeschaltet wird und welche eigene
//    Sprachauswahl ausgeblendet werden soll.
// ============================================================
(function(){
  var LANGS = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"];
  var T = { de: "Alle Mathe-Apps", en: "All math apps", es: "Todas las apps de mate", zh: "全部数学应用",
            fr: "Toutes les applis de maths", ru: "Все приложения по математике", ar: "كل تطبيقات الرياضيات",
            ja: "すべての算数アプリ", pt: "Todos os apps de matemática" };
  var lang = null;
  try { lang = localStorage.getItem("msMathLang"); } catch(e){}
  if(LANGS.indexOf(lang) < 0){
    var nl = (navigator.language || "de").slice(0, 2).toLowerCase();
    lang = LANGS.indexOf(nl) >= 0 ? nl : "de";
  }
  window.MS_MATH_LANG = lang;

  var a = document.createElement("a");
  a.href = "/"; a.className = "ms-home-btn"; a.setAttribute("aria-label", T[lang]); a.title = T[lang];
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 2.5 11.1a1 1 0 0 0 1.3 1.5l.7-.6V20a1 1 0 0 0 1 1h4.5v-5.5h4V21H18.5a1 1 0 0 0 1-1v-8l.7.6a1 1 0 1 0 1.3-1.5Z"/></svg>';
  document.body.appendChild(a);

  var A = window.MS_LANG;
  if(A){
    if(A.hide){
      var st = document.createElement("style");
      st.textContent = A.hide + "{display:none !important}";
      document.head.appendChild(st);
    }
    document.documentElement.lang = lang;
    try { A.apply(lang); } catch(e){ if(window.console) console.error("MS_LANG", e); }
  }
})();
