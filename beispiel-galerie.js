// ============================================================
// /beispiel-galerie.js – Bereich „Beispiele in Bildern“ unten auf jeder Kachel
// Zeigt die Bilddateien aus /img/beispiele/ (Liste: /beispiel-bilder.js, MS_BB) als echte <img>
// mit Bildunterschrift und Alternativtext in der eingestellten Sprache – so finden
// Suchmaschinen (Google Bilder) die Zeichnungen. Klick öffnet das passende Alltagsbeispiel.
// Wird von /home-button.js geladen; Sprachwechsel über MS_LANG.apply.
// ============================================================
(function(){
  "use strict";
  var K = (location.pathname.split("/").filter(Boolean)[0] || "");
  if(!window.MS_BB || !MS_BB[K]) return;
  var UI = {
    de: { titel: "Beispiele in Bildern", graph: "So sieht es in der App aus", oeffnen: "Beispiel öffnen" },
    en: { titel: "Examples in pictures", graph: "What it looks like in the app", oeffnen: "Open example" },
    es: { titel: "Ejemplos en imágenes", graph: "Así se ve en la app", oeffnen: "Abrir ejemplo" },
    zh: { titel: "图片中的例子", graph: "应用中的样子", oeffnen: "打开例子" },
    fr: { titel: "Exemples en images", graph: "Voici à quoi ça ressemble dans l’appli", oeffnen: "Ouvrir l’exemple" },
    ru: { titel: "Примеры в картинках", graph: "Так это выглядит в приложении", oeffnen: "Открыть пример" },
    ar: { titel: "أمثلة بالصور", graph: "هكذا يبدو في التطبيق", oeffnen: "فتح المثال" },
    ja: { titel: "絵で見る例", graph: "アプリではこう見えます", oeffnen: "例を開く" },
    pt: { titel: "Exemplos em imagens", graph: "Assim fica no app", oeffnen: "Abrir exemplo" }
  };
  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || document.documentElement.lang || "de"; } catch(e){}
  function ui(k){ return (UI[lang] || UI.de)[k]; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function sauber(s){ return String(s || "").replace(/\$/g, "").replace(/\s+/g, " ").trim(); }
  function ersterSatz(s){ s = sauber(s); var m = s.match(/^.{20,170}?[.!?](\s|$)/); return m ? m[0].trim() : s.slice(0, 170); }
  function texte(i){ // [Titel, Situation] in der aktuellen Sprache
    try {
      if(window.FA && FA.app && FA.app() === K){ var d = FA.D[lang] || FA.D.de; return d[K][i]; }
      if(window.MS_ALLTAG && MS_ALLTAG.boxen){ var B = MS_ALLTAG.boxen()[0]; if(B) return (B.daten[lang] || B.daten.de)[i]; }
    } catch(e){}
    return null;
  }
  function oeffnen(){
    if(window.FA && FA.app && FA.app() === K){ FA.zeigen(); return; }
    if(window.MS_ALLTAG && MS_ALLTAG.boxen && MS_ALLTAG.boxen()[0]) MS_ALLTAG.zeigen(MS_ALLTAG.boxen()[0]);
  }
  var box = null;
  function bauen(){
    var E = MS_BB[K], h1 = document.querySelector("h1"), name = h1 ? h1.textContent.trim() : document.title;
    if(!box){
      box = document.createElement("section"); box.className = "msbb"; box.setAttribute("aria-labelledby", "msbbT");
      var fuss = document.querySelector(".footer, footer"), app = document.querySelector(".app, main");
      if(fuss) fuss.parentNode.insertBefore(box, fuss); else if(app) app.appendChild(box); else document.body.appendChild(box);
    }
    box.dir = lang === "ar" ? "rtl" : "ltr";
    var h = '<h2 id="msbbT">' + esc(ui("titel")) + '</h2><div class="msbb-grid">';
    if(E.graph) h += '<figure class="msbb-f"><img src="/img/beispiele/' + E.graph + '" alt="' + esc(name + " – " + ui("graph")) + '" loading="lazy" decoding="async"><figcaption><b>' + esc(name) + "</b><br>" + esc(ui("graph")) + "</figcaption></figure>";
    (E.bsp || []).forEach(function(b){
      var t = texte(b.i); if(!t) return;
      h += '<figure class="msbb-f msbb-klick" tabindex="0" role="button" aria-label="' + esc(ui("oeffnen") + ": " + sauber(t[0])) + '"><img src="/img/beispiele/' + b.f + '" alt="' + esc(sauber(t[0]) + ": " + sauber(t[1])) + '" loading="lazy" decoding="async"><figcaption><b>' + esc(sauber(t[0])) + "</b><br>" + esc(ersterSatz(t[1])) + "</figcaption></figure>";
    });
    box.innerHTML = h + "</div>";
    box.querySelectorAll(".msbb-klick").forEach(function(f){
      f.addEventListener("click", oeffnen);
      f.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); oeffnen(); } });
    });
  }
  var css = document.createElement("style");
  css.textContent =
    ".msbb{margin:22px 0 8px;padding:12px;border:2px solid #c9d6ea;border-radius:14px;background:#ffffff;color:#1a2233;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-align:start}" +
    ".msbb h2{margin:0 0 10px;font-size:19px;color:#1565c0}" +
    ".msbb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}" +
    ".msbb-f{margin:0;border:1px solid #c9d6ea;border-radius:12px;overflow:hidden;background:#fbfdff;display:flex;flex-direction:column}" +
    ".msbb-f img{width:100%;height:auto;aspect-ratio:16/10;object-fit:contain;display:block;background:#ffffff;border-bottom:1px solid #e2e8f0}" +
    ".msbb-f figcaption{padding:7px 9px;font-size:14px;line-height:1.4;color:#1a2233}.msbb-f figcaption b{color:#0f766e}" +
    ".msbb-klick{cursor:pointer}.msbb-klick:hover,.msbb-klick:focus{border-color:#0d9488;box-shadow:0 0 0 2px #99f6e4;outline:none}";
  document.head.appendChild(css);
  function start(){ bauen(); var A = window.MS_LANG;
    if(A && A.apply && !A._msbb){ var alt = A.apply; A.apply = function(l){ var r = alt.apply(A, arguments); if(UI[l]) lang = l; bauen(); return r; }; A._msbb = true; } }
  if(window.MS_ALLTAG && !(window.FA && FA.app && FA.app() === K)) setTimeout(start, 0); else start();
})();
