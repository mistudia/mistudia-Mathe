// ============================================================
// bereichslink.js – Direktlinks zu Unterbereichen (alle Kacheln, über home-button.js)
// 1) Reiter ([role=tab][data-tab]) schreiben ihren Namen in die Adresse (#ueben …),
//    ohne neuen Verlaufseintrag; beim Öffnen mit #name wird der Reiter gewählt.
// 2) Knopf 🔗 in der Zoom-Leiste rechts (sonst eigener Knopf): kopiert den Link zur
//    aktuellen Stelle (Kachel + Reiter bzw. Unterseite + ?lang=…); am Handy Teilen-Menü.
// Kacheln mit eigener Hash-Logik (beruehmt, negativ, teilbarkeit, trigonometrie …)
// funktionieren weiter: replaceState löst kein hashchange aus.
// data-nolink am <body> schaltet beides ab. 9 Sprachen.
// ============================================================
(function(){
  if(window.MS_BEREICHSLINK || window.MS_EMBED) return; window.MS_BEREICHSLINK = true;
  var TX = {
    de: ["Link zu dieser Stelle kopieren", "Link kopiert ✓", "Link zu dieser Stelle:"],
    en: ["Copy link to this section", "Link copied ✓", "Link to this section:"],
    es: ["Copiar enlace a esta sección", "Enlace copiado ✓", "Enlace a esta sección:"],
    zh: ["复制此处的链接", "链接已复制 ✓", "此处的链接："],
    fr: ["Copier le lien vers cette partie", "Lien copié ✓", "Lien vers cette partie :"],
    ru: ["Скопировать ссылку на этот раздел", "Ссылка скопирована ✓", "Ссылка на этот раздел:"],
    ar: ["نسخ رابط هذا القسم", "تم نسخ الرابط ✓", "رابط هذا القسم:"],
    ja: ["この場所へのリンクをコピー", "リンクをコピーしました ✓", "この場所へのリンク："],
    pt: ["Copiar link para esta parte", "Link copiado ✓", "Link para esta parte:"]
  };
  function sprache(){ var l = window.MS_MATH_LANG; try { l = localStorage.getItem("msMathLang") || l; } catch(e){} return TX[l] ? l : "de"; }
  function aus(){ return document.body && document.body.hasAttribute("data-nolink"); }

  // ---------- 1) Reiter <-> Adresse ----------
  function reiter(name){ try { return document.querySelector('[role="tab"][data-tab="' + CSS.escape(name) + '"]'); } catch(e){ return null; } }
  document.addEventListener("click", function(e){
    if(aus()) return;
    var b = e.target.closest && e.target.closest('[role="tab"][data-tab]');
    if(!b || !b.isConnected) return;
    var name = b.getAttribute("data-tab");
    if(!name || location.hash === "#" + name) return;
    try { history.replaceState(history.state, "", location.pathname + location.search + "#" + name); } catch(err){}
  }, true);
  function vonAdresse(){
    if(aus()) return;
    var h = ""; try { h = decodeURIComponent((location.hash || "").slice(1)); } catch(e){ h = (location.hash || "").slice(1); }
    if(!h) return;
    var b = reiter(h);
    if(b){ if(b.getAttribute("aria-selected") !== "true") b.click(); return; }
    // Abschnitt mit dieser id erst später gezeichnet? Dann noch einmal hinscrollen.
    var el = document.getElementById(h);
    if(el && el.getBoundingClientRect().top > window.innerHeight) el.scrollIntoView({ block: "start" });
  }
  function start(){ vonAdresse(); setTimeout(vonAdresse, 400); }
  if(document.readyState === "complete") start(); else window.addEventListener("load", start);
  window.addEventListener("hashchange", vonAdresse);

  // ---------- 2) Link-Knopf ----------
  function linkJetzt(){
    var l = sprache(), sp = new URLSearchParams(location.search);
    sp.set("lang", l);
    return location.origin + location.pathname + "?" + sp.toString() + (location.hash || "");
  }
  function hinweis(text){
    var d = document.createElement("div"); d.className = "ms-bl-toast"; d.textContent = text;
    document.body.appendChild(d); setTimeout(function(){ d.remove(); }, 1800);
  }
  function kopieren(){
    var T = TX[sprache()], url = linkJetzt();
    var touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if(touch && navigator.share){
      navigator.share({ title: document.title, url: url }).catch(function(){});
      return;
    }
    var notfall = function(){ try { window.prompt(T[2], url); } catch(e){} };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function(){ hinweis(T[1]); }, notfall);
    else notfall();
  }
  window.msBereichsLink = linkJetzt;
  var css = document.createElement("style");
  css.textContent =
    ".ms-bl-btn{width:28px;height:28px;border-radius:50%;border:2px solid #1565c0;background:#fff;color:#1565c0;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}" +
    ".ms-bl-btn:hover{background:#e8f1ff}.ms-bl-btn svg{width:17px;height:17px}" +
    ".ms-bl-solo{position:fixed;right:6px;bottom:12px;z-index:2147482900;width:36px;height:36px;box-shadow:0 2px 8px rgba(0,0,0,.18)}" +
    ".ms-bl-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483200;background:#1a2233;color:#fff;font:700 15px system-ui,sans-serif;padding:9px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.3)}" +
    "@media print{.ms-bl-btn{display:none!important}}";
  document.head.appendChild(css);
  var SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/></svg>';
  function knopf(){
    if(aus() || document.querySelector(".ms-bl-btn")) return;
    var T = TX[sprache()], b = document.createElement("button");
    b.type = "button"; b.className = "ms-bl-btn"; b.title = T[0]; b.setAttribute("aria-label", T[0]); b.innerHTML = SVG;
    b.addEventListener("click", kopieren);
    var leiste = document.querySelector(".ms-zl");
    if(leiste) leiste.appendChild(b); else { b.classList.add("ms-bl-solo"); document.body.appendChild(b); }
  }
  // Zoom-Leiste wird ggf. erst etwas später gebaut
  function warte(n){ if(document.querySelector(".ms-zl") || n <= 0) knopf(); else setTimeout(function(){ warte(n - 1); }, 100); }
  if(document.body) warte(15); else document.addEventListener("DOMContentLoaded", function(){ warte(15); });
})();
