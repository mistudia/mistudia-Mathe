// ============================================================
// /fliesstext-formeln.js – Gleichungen im Fließtext: höchstens ein „=“/„≈“ pro Zeile (alle Kacheln).
// Ein Absatz (p, li, dd, .merke, .hinweis …) aus reinem Text mit zwei oder mehr Formeln-Relationen
// bekommt jede Formel als eigenen Block; Ketten (a = b = c) stehen untereinander, am Zeichen ausgerichtet.
// Rechenwege (ol.weg, .rechnung …) macht schon /formel.js. Abschalten je Element: data-nofz.
// Geladen über home-button.js.
// ============================================================
(function(){
  "use strict";
  if(window.MS_FZ) return;
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var RE = (function(){
    var opd = "[\\(\\[]*[−-]?(?:√\\(?)?(?:[a-zA-Z]{1,2}[₀-₉]?′*\\([^()\\s]{1,8}\\)|[0-9][0-9,./]*[a-zA-Z]?|[a-zA-Zπφθαβ](?:[₀-₉ₙₖₚ]+|′)?)[²³⁰-⁹ⁿˣʸᵗ⁻⁺]*…?[\\)\\]]*[²³]?";
    var num = "[0-9][0-9,./]*";
    return new RegExp("(?<![A-Za-zÀ-ÿА-яЁё0-9])" + opd + "(?:\\s+[=≈<>+−·:/×]\\s+" + opd + "|\\s+" + num + "(?![A-Za-zÀ-ÿА-яЁё]))*(?![A-Za-zÀ-ÿА-яЁё0-9])", "g");
  })();
  function html(s){
    var teile = [], pos = 0, n = 0, m;
    RE.lastIndex = 0;
    while((m = RE.exec(s))){
      var f = m[0].replace(/[.,]$/, ""), r = (f.match(/\s[=≈]\s/g) || []).length;
      if(!r){ if(!m[0].length) RE.lastIndex++; continue; }
      teile.push({ t: s.slice(pos, m.index) }); teile.push({ f: f }); pos = m.index + f.length; n += r;
    }
    if(n < 2) return null;
    teile.push({ t: s.slice(pos) });
    return teile.map(function(x){
      if(x.t != null){ var t2 = x.t.replace(/^[\s.,;:：。、，،]+/, "").trim(); return t2 ? '<span class="fzT">' + esc(t2) + "</span>" : ""; }
      var Z = x.f.split(/\s(?=[=≈]\s)/);
      return '<span class="fzB" dir="ltr">' + Z.slice(1).map(function(z, i){ return '<span class="fzL">' + (i ? "" : esc(Z[0])) + '</span><span class="fzR">' + esc(z) + "</span>"; }).join("") + "</span>";
    }).join(" ");
  }
  var ZIEL = "p, li, dd, .merke, .hinweis, .story, .erkl, .fzZ, #frage";
  var NICHT = "ol.lauf, ol.weg, ol.schritte, ol.ne-schritte, ol.be-schritte, .rechnung, .loesung, .loesungsweg, .rw, .lw-f, #eWeg, svg, select, button, label, .ms-zeichen, [data-nofz], [contenteditable]";
  function element(e){
    if(e.children.length || e.classList.contains("fzP") || e.dataset.fz === e.textContent) return;
    if(e.closest(NICHT)) return;
    var h = html(e.textContent);
    e.dataset.fz = e.textContent;
    if(h){ e.innerHTML = h; e.classList.add("fzP"); }
    }
  var css = document.createElement("style");
  css.textContent = ".fzB{display:grid;grid-template-columns:auto auto;justify-content:start;column-gap:.35em;margin:6px 0;margin-inline-start:1.2em}.fzL{text-align:right;white-space:nowrap}.fzR{text-align:left}[dir=rtl] .fzB{justify-content:end}.fzP .fzT{display:inline}";
  (document.head || document.documentElement).appendChild(css);
  var geplant = false;
  function lauf(){ geplant = false; try { document.querySelectorAll(ZIEL).forEach(element); } catch(x){} }
  function planen(){ if(!geplant){ geplant = true; (window.requestAnimationFrame || setTimeout)(lauf); } }
  function start(){ new MutationObserver(planen).observe(document.body, { childList: true, subtree: true, characterData: true }); planen(); }
  if(document.body) start(); else document.addEventListener("DOMContentLoaded", start);
  window.MS_FZ = { html: html, lauf: lauf };
})();
