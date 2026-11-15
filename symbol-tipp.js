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
    ".sym{display:inline-block;line-height:1.3;border-bottom:2px dotted #1565c0;cursor:help;border-radius:2px;outline:none}" +
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
    // in einem <label>: sonst „klickt“ der Browser danach noch das Eingabefeld an und die Blase geht gleich wieder zu
    if(s.closest("label")) ev.preventDefault();
    if(offen === s && fest){ weg(); return; }
    zeige(s); fest = true;
  });
  document.addEventListener("focusin", function(ev){ var s = symVon(ev.target); if(s) zeige(s); });
  document.addEventListener("focusout", function(ev){ var s = symVon(ev.target); if(s && offen === s && !fest) weg(); });
  document.addEventListener("keydown", function(ev){ if(ev.key === "Escape") weg(); if((ev.key === "Enter" || ev.key === " ") && symVon(ev.target)){ ev.preventDefault(); var s = symVon(ev.target); if(offen === s && fest) weg(); else { zeige(s); fest = true; } } });
  window.addEventListener("scroll", function(){ if(offen) weg(); }, true);
  window.addEventListener("resize", function(){ if(offen) weg(); });

  function attr(s){ return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  // ---------- Automatik ----------
  // MS_TIPP.auto(regeln, text, hinweisNach)
  //   regeln: [{ sel: "CSS-Auswahl der Bereiche", re: /Muster/ (Gruppe 1 = einzupackendes Zeichen, sonst ganzer Treffer), k: "Schlüssel" }]
  //   text(k): Erklärung zum Schlüssel in der aktuellen Sprache
  //   hinweisNach: CSS-Auswahl; dahinter erscheint der Hinweis „Zeichen antippen …“ (optional)
  // Packt passende Stellen in Textknoten ein (nicht in Knöpfen, Eingabefeldern, SVG oder Überschriften),
  // beobachtet die Seite und bearbeitet neu gezeichnete Teile erneut; beim Sprachwechsel werden die Texte erneuert.
  var SPERRE = ".sym,button,select,option,textarea,input,script,style,svg,h1,h2,h3,h4,legend,.ms-tipp,.tabs";
  function auto(regeln, text, hinweisNach){
    function packen(node, r){
      var s = node.nodeValue, re = new RegExp(r.re.source, r.re.flags.indexOf("g") >= 0 ? r.re.flags : r.re.flags + "g"), m, teile = [], pos = 0;
      while((m = re.exec(s))){
        if(!m[0]){ re.lastIndex++; continue; }
        var tok = m[1] != null ? m[1] : m[0], start = m.index + (m[1] != null ? m[0].indexOf(m[1]) : 0);
        teile.push(s.slice(pos, start), { t: tok }); pos = start + tok.length;
      }
      if(!teile.length) return;
      teile.push(s.slice(pos));
      var frag = document.createDocumentFragment();
      teile.forEach(function(x){
        if(typeof x === "string"){ if(x) frag.appendChild(document.createTextNode(x)); return; }
        var sp = document.createElement("span"); sp.className = "sym"; sp.tabIndex = 0; sp.setAttribute("data-tk", r.k); sp.setAttribute("data-tip", text(r.k)); sp.textContent = x.t; frag.appendChild(sp);
      });
      node.parentNode.replaceChild(frag, node);
    }
    function lauf(){
      regeln.forEach(function(r){
        document.querySelectorAll(r.sel).forEach(function(root){
          if(root.closest && root.closest(SPERRE)) return;
          var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function(n){ var p = n.parentNode; return !p || (p.closest && p.closest(SPERRE)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
          var L = []; while(w.nextNode()) L.push(w.currentNode);
          L.forEach(function(n){ packen(n, r); });
        });
      });
      if(hinweisNach) document.querySelectorAll(hinweisNach).forEach(function(ziel){
        var h = ziel.nextElementSibling;
        if(!h || !h.classList.contains("ms-tipp-hinweis")){ h = document.createElement("p"); h.className = "ms-tipp-hinweis"; h.style.cssText = "margin:4px 0 8px;font-size:14px;color:#4f5b6e"; ziel.parentNode.insertBefore(h, ziel.nextSibling); }
        var txt = HINWEIS[document.documentElement.lang] || HINWEIS.de; if(h.textContent !== txt) h.textContent = txt;
      });
    }
    var geplant = false, mo = new MutationObserver(function(){ if(geplant) return; geplant = true; requestAnimationFrame(function(){ geplant = false; mo.disconnect(); lauf(); beobachte(); }); });
    function beobachte(){ mo.observe(document.body, { childList: true, subtree: true, characterData: true }); }
    new MutationObserver(function(){ document.querySelectorAll(".sym[data-tk]").forEach(function(sp){ sp.setAttribute("data-tip", text(sp.getAttribute("data-tk"))); }); mo.disconnect(); lauf(); beobachte(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    function start(){ lauf(); beobachte(); }
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  }

  window.MS_TIPP = {
    s: function(html, text){ return '<span class="sym" tabindex="0" data-tip="' + attr(text) + '">' + html + "</span>"; },
    hinweis: function(l){ return HINWEIS[l] || HINWEIS.de; },
    auto: auto,
    zu: weg
  };
})();
