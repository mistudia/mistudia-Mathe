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

// ---------- Stufen auf Schiebereglern markieren (alle Unter-Apps) ----------
// Regler mit wenigen festen Stufen (höchstens 25) bekommen eine <datalist> mit allen Stufen –
// der Browser zeichnet daraus Striche unter der Spur. Regler mit vielen Stufen fühlen sich
// stufenlos an und bleiben ohne Striche (eine Liste nur mit jedem k-ten Wert würde den Regler
// in Chrome auf diese Werte einrasten lassen).
(function(){
  "use strict";
  var nr = 0;
  function markiere(r){
    var min = parseFloat(r.min), max = parseFloat(r.max), st = r.step === "any" ? NaN : parseFloat(r.step || "1");
    if(!isFinite(min)) min = 0; if(!isFinite(max)) max = 100;
    var sig = min + "|" + max + "|" + r.step; if(r._msStufen === sig) return; r._msStufen = sig;
    var N = st > 0 ? Math.round((max - min) / st) : 0, dl = r._msListe;
    if(!(N >= 1) || N > 25 || Math.abs(N * st - (max - min)) > st * 1e-6){ if(dl){ r.removeAttribute("list"); dl.innerHTML = ""; } return; }
    if(!dl){ dl = document.createElement("datalist"); dl.id = "msStufen" + (++nr); document.body.appendChild(dl); r._msListe = dl; }
    r.setAttribute("list", dl.id);
    var d = (String(st).split(".")[1] || "").length + 2, h = "";
    for(var j = 0; j <= N; j++) h += '<option value="' + Number((min + j * st).toFixed(d)) + '"></option>';
    dl.innerHTML = h;
  }
  function alle(w){ (w || document).querySelectorAll('input[type="range"]').forEach(markiere); }
  alle();
  new MutationObserver(function(L){ L.forEach(function(m){
    if(m.type === "attributes" && m.target.type === "range") markiere(m.target);
    if(m.addedNodes) m.addedNodes.forEach(function(n){ if(n.nodeType === 1){ if(n.matches && n.matches('input[type="range"]')) markiere(n); else if(n.querySelectorAll) alle(n); } });
  }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["min", "max", "step"] });
  // r.max = … ändert in manchen Browsern kein Attribut – beim Benutzen nachprüfen
  document.addEventListener("input", function(e){ if(e.target && e.target.type === "range") markiere(e.target); }, true);
  document.addEventListener("pointerdown", function(e){ if(e.target && e.target.type === "range") markiere(e.target); }, true);
})();

// ---------- Popups mit der Maus verschieben (/verschieben.js) ----------
(function(){
  if(window.MS_VERSCHIEBEN || document.querySelector('script[src="/verschieben.js"]')) return;
  var s = document.createElement("script"); s.src = "/verschieben.js"; document.head.appendChild(s);
})();
