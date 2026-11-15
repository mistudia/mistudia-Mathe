// ============================================================
// /verschieben.js – Popups mit der Maus verschieben
// Wird von /home-button.js in jede Unter-App geladen.
// Greift man eine Popup-Karte an einer freien Stelle (nicht an Knöpfen,
// Links, Eingabefeldern, Aufklappern), lässt sie sich mit gedrückter
// Maustaste verschieben. Nur Maus – auf Touch bleibt normales Scrollen.
// Neue Popups: Selektor der Karte in KARTEN eintragen.
// ============================================================
(function(){
  "use strict";
  if(window.MS_VERSCHIEBEN) return; window.MS_VERSCHIEBEN = true;
  var KARTEN = ".msa-karte, .b-karte, #probeCard, #pizzaFenster";
  var GRIFF = ".msa-kopf, .msa-kopf h2, .b-karte > h2";
  var NICHT = "button, a, input, select, textarea, summary, label, option, [contenteditable], .ms-tipp, .sym";
  var zug = null, unterdruecken = false;

  function verschiebung(k){ return { x: +(k.dataset.vx || 0), y: +(k.dataset.vy || 0) }; }
  function setzen(k, x, y){ k.dataset.vx = x; k.dataset.vy = y; k.style.transform = "translate(" + x + "px," + y + "px)"; }

  document.addEventListener("pointerdown", function(e){
    if(e.pointerType !== "mouse" || e.button !== 0) return;
    var k = e.target.closest && e.target.closest(KARTEN);
    if(!k || e.target.closest(NICHT)) return;
    // Bildlaufleiste der Karte selbst nicht als Griff werten
    if(e.target === k && e.offsetX > k.clientWidth) return;
    var v = verschiebung(k);
    zug = { k: k, sx: e.clientX, sy: e.clientY, x0: v.x, y0: v.y, los: false, id: e.pointerId };
  });
  document.addEventListener("pointermove", function(e){
    if(!zug || e.pointerId !== zug.id) return;
    var dx = e.clientX - zug.sx, dy = e.clientY - zug.sy;
    if(!zug.los){
      if(Math.abs(dx) + Math.abs(dy) < 5) return;
      zug.los = true; document.documentElement.classList.add("ms-zieht");
      var sel = window.getSelection && window.getSelection(); if(sel) sel.removeAllRanges();
    }
    e.preventDefault();
    // Karte bleibt mit mindestens 60 px im Fenster
    var r = zug.k.getBoundingClientRect(), v = verschiebung(zug.k);
    var nx = zug.x0 + dx, ny = zug.y0 + dy;
    var links = r.left - v.x + nx, oben = r.top - v.y + ny;
    if(links > innerWidth - 60) nx -= links - (innerWidth - 60);
    if(links + r.width < 60) nx += 60 - (links + r.width);
    if(oben > innerHeight - 40) ny -= oben - (innerHeight - 40);
    if(oben + r.height < 40) ny += 40 - (oben + r.height);
    setzen(zug.k, nx, ny);
  });
  function ende(e){
    if(!zug || (e && e.pointerId !== zug.id)) return;
    if(zug.los){ unterdruecken = true; setTimeout(function(){ unterdruecken = false; }, 0); }
    document.documentElement.classList.remove("ms-zieht"); zug = null;
  }
  document.addEventListener("pointerup", ende);
  document.addEventListener("pointercancel", ende);
  // Nach dem Ziehen kein „Klick daneben“ → Popup bleibt offen
  window.addEventListener("click", function(e){ if(unterdruecken){ e.stopPropagation(); e.preventDefault(); unterdruecken = false; } }, true);
  // Text wird beim Ziehen nicht markiert
  document.addEventListener("selectstart", function(e){ if(zug && zug.los) e.preventDefault(); });

  var css = document.createElement("style");
  css.textContent =
    "@media (hover:hover) and (pointer:fine){" + GRIFF.split(",").map(function(s){ return s.trim(); }).join(",") + "{cursor:move}}" +
    ".ms-zieht,.ms-zieht *{cursor:grabbing !important;user-select:none !important}";
  document.head.appendChild(css);
})();
