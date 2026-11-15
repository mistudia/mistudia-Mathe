// /symbol-tipp.js – Erklär-Blasen (Tooltips) für Formelzeichen, gemeinsam für alle Kacheln.
// MS_TIPP.s(html, text) liefert ein unterstrichenes Zeichen; Maus darüber, Antippen oder
// Tastatur-Fokus zeigt die Erklärung. MS_TIPP.hinweis(lang) = kurzer Hinweis in 9 Sprachen.
(function(){
  "use strict";
  var HINWEIS = {
    de: "Tipp: Gepunktet unterstrichene Zeichen antippen – dann erscheint eine Erklärung.",
    en: "Tip: tap a symbol with a dotted underline to see what it means.",
    es: "Consejo: toca un símbolo subrayado con puntos y aparece una explicación.",
    zh: "提示：点一下带虚线下划线的符号，就会显示说明。",
    fr: "Astuce : touche un symbole souligné en pointillés pour voir une explication.",
    ru: "Подсказка: нажми на символ с пунктирным подчёркиванием – появится объяснение.",
    ar: "تلميح: اضغط على رمز تحته خط منقّط لتظهر شرحه.",
    ja: "ヒント：点線の下線がある記号をタップすると説明が出ます。",
    pt: "Dica: toque num símbolo sublinhado com pontos para ver uma explicação."
  };
  var css = document.createElement("style");
  css.textContent =
    ".sym{border-bottom:2px dotted #1565c0;cursor:help;border-radius:2px;outline:none}" +
    ".sym:hover,.sym:focus-visible,.sym.offen{background:#dbeafe}" +
    ".ms-tipp{position:fixed;z-index:9999;max-width:min(300px,calc(100vw - 16px));background:#1a2233;color:#ffffff;font:500 15px/1.45 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;padding:8px 11px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.25);pointer-events:none;white-space:normal;text-align:start}" +
    ".ms-tipp[hidden]{display:none}";
  document.head.appendChild(css);
  var blase = document.createElement("div"); blase.className = "ms-tipp"; blase.hidden = true; blase.setAttribute("role", "tooltip");
  function einbauen(){ if(!blase.parentNode) document.body.appendChild(blase); }
  if(document.body) einbauen(); else document.addEventListener("DOMContentLoaded", einbauen);

  var offen = null, fest = false;
  function zeige(e){
    einbauen();
    if(offen && offen !== e) offen.classList.remove("offen");
    offen = e; e.classList.add("offen");
    blase.textContent = e.getAttribute("data-tip"); blase.dir = document.documentElement.dir || "ltr"; blase.hidden = false;
    var r = e.getBoundingClientRect(), b = blase.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var x = r.left + r.width / 2 - b.width / 2; x = Math.max(8, Math.min(x, vw - b.width - 8));
    var y = r.top - b.height - 8; if(y < 8) y = r.bottom + 8; if(y + b.height > vh - 8) y = Math.max(8, vh - b.height - 8);
    blase.style.left = x + "px"; blase.style.top = y + "px";
  }
  function weg(){ if(offen) offen.classList.remove("offen"); offen = null; fest = false; blase.hidden = true; }
  function symVon(t){ return t && t.closest ? t.closest(".sym") : null; }
  document.addEventListener("pointerover", function(ev){ if(ev.pointerType !== "mouse" || fest) return; var s = symVon(ev.target); if(s) zeige(s); });
  document.addEventListener("pointerout", function(ev){ if(ev.pointerType !== "mouse" || fest) return; var s = symVon(ev.target); if(s && !s.contains(ev.relatedTarget)) weg(); });
  document.addEventListener("click", function(ev){
    var s = symVon(ev.target);
    if(!s){ if(offen) weg(); return; }
    if(offen === s && fest){ weg(); return; }
    zeige(s); fest = true;
  });
  document.addEventListener("focusin", function(ev){ var s = symVon(ev.target); if(s) zeige(s); });
  document.addEventListener("focusout", function(ev){ var s = symVon(ev.target); if(s && offen === s && !fest) weg(); });
  document.addEventListener("keydown", function(ev){ if(ev.key === "Escape") weg(); if((ev.key === "Enter" || ev.key === " ") && symVon(ev.target)){ ev.preventDefault(); var s = symVon(ev.target); if(offen === s && fest) weg(); else { zeige(s); fest = true; } } });
  window.addEventListener("scroll", function(){ if(offen) weg(); }, true);
  window.addEventListener("resize", function(){ if(offen) weg(); });

  function attr(s){ return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  window.MS_TIPP = {
    s: function(html, text){ return '<span class="sym" tabindex="0" data-tip="' + attr(text) + '">' + html + "</span>"; },
    hinweis: function(l){ return HINWEIS[l] || HINWEIS.de; },
    zu: weg
  };
})();
