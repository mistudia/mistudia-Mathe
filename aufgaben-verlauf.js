// ============================================================
// /aufgaben-verlauf.js – Leiste über den Übungsaufgaben (alle Kacheln mit „Üben“):
//   „Aufgabe 4 von 10“ (Runden zu je 10 Aufgaben), Punkte-Reihe ✓ / ✗ / – je Aufgabe,
//   ‹ Zurück / › Vor: frühere Aufgaben noch einmal ansehen – mit eigener Antwort und Lösungsweg.
// Funktioniert ohne Änderung an den Kacheln: erkennt die neue Aufgabe am Klick auf „Weiter“
// (#weiter / #uWeiter / #neuAuf), an Enter nach einer Antwort oder an einem neuen Aufgabentext.
// Kurz vor dem Wechsel wird der Übungsbereich kopiert (Eingaben eingefroren) und im Rückblick
// in einem Shadow-DOM gezeigt – so gelten dieselben Stile, aber keine IDs kommen doppelt vor.
// Wird von /home-button.js geladen. 9 Sprachen, folgt dem Sprachwechsel (<html lang>).
// ============================================================
(function(){
  "use strict";
  if(window.MS_AV || window.MS_EMBED) return; window.MS_AV = true;
  var K = location.pathname.split("/").filter(Boolean)[0] || "";
  // eigene Abläufe (Zeitrennen, Graph-Spiele, Bereichs-Aufgaben) → keine Leiste
  if(!K || /^(fortschritt|geschichte|einmaleins|graphen|linear|berufe|werkzeuge)$/.test(K)) return;
  var RUNDE = 10, MAX = 60;
  var TX = {
    de: { nr: "Aufgabe {i} von {n}", runde: "Runde {r}", zur: "Vorherige Aufgabe", vor: "Nächste Aufgabe", jetzt: "Zur aktuellen Aufgabe", blick: "Rückblick", fertig: "Runde {r} geschafft: {k} von {n} richtig", ok: "richtig", nein: "falsch", offen: "ohne Antwort", liste: "Aufgaben dieser Runde" },
    en: { nr: "Task {i} of {n}", runde: "Round {r}", zur: "Previous task", vor: "Next task", jetzt: "Back to the current task", blick: "Looking back", fertig: "Round {r} done: {k} of {n} correct", ok: "correct", nein: "wrong", offen: "not answered", liste: "Tasks in this round" },
    es: { nr: "Ejercicio {i} de {n}", runde: "Ronda {r}", zur: "Ejercicio anterior", vor: "Ejercicio siguiente", jetzt: "Volver al ejercicio actual", blick: "Repaso", fertig: "Ronda {r} terminada: {k} de {n} correctas", ok: "correcto", nein: "incorrecto", offen: "sin respuesta", liste: "Ejercicios de esta ronda" },
    zh: { nr: "第 {i} 题，共 {n} 题", runde: "第 {r} 轮", zur: "上一题", vor: "下一题", jetzt: "回到当前题目", blick: "回顾", fertig: "第 {r} 轮完成：{n} 题中答对 {k} 题", ok: "正确", nein: "错误", offen: "未作答", liste: "本轮题目" },
    fr: { nr: "Exercice {i} sur {n}", runde: "Manche {r}", zur: "Exercice précédent", vor: "Exercice suivant", jetzt: "Revenir à l’exercice actuel", blick: "Retour en arrière", fertig: "Manche {r} terminée : {k} sur {n} justes", ok: "juste", nein: "faux", offen: "sans réponse", liste: "Exercices de cette manche" },
    ru: { nr: "Задание {i} из {n}", runde: "Раунд {r}", zur: "Предыдущее задание", vor: "Следующее задание", jetzt: "К текущему заданию", blick: "Просмотр", fertig: "Раунд {r} пройден: {k} из {n} верно", ok: "верно", nein: "неверно", offen: "без ответа", liste: "Задания этого раунда" },
    ar: { nr: "التمرين {i} من {n}", runde: "الجولة {r}", zur: "التمرين السابق", vor: "التمرين التالي", jetzt: "العودة إلى التمرين الحالي", blick: "مراجعة", fertig: "انتهت الجولة {r}: {k} من {n} صحيحة", ok: "صحيح", nein: "خطأ", offen: "بلا إجابة", liste: "تمارين هذه الجولة" },
    ja: { nr: "{n} 問中 {i} 問目", runde: "第 {r} ラウンド", zur: "前の問題", vor: "次の問題", jetzt: "いまの問題にもどる", blick: "ふりかえり", fertig: "第 {r} ラウンド終了：{n} 問中 {k} 問正解", ok: "正解", nein: "不正解", offen: "未回答", liste: "このラウンドの問題" },
    pt: { nr: "Exercício {i} de {n}", runde: "Rodada {r}", zur: "Exercício anterior", vor: "Próximo exercício", jetzt: "Voltar ao exercício atual", blick: "Revisão", fertig: "Rodada {r} concluída: {k} de {n} certas", ok: "certo", nein: "errado", offen: "sem resposta", liste: "Exercícios desta rodada" }
  };
  function sprache(){ var l = document.documentElement.lang; if(TX[l]) return l; try { l = localStorage.getItem("msMathLang"); } catch(e){} return TX[l] ? l : "de"; }
  function tx(k, o){ var s = (TX[sprache()] || TX.de)[k]; for(var x in (o || {})) s = s.split("{" + x + "}").join(o[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var CSS = ".mav-leiste{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:0 0 12px;padding:8px 10px;border:2px solid #b0b0b8;border-radius:14px;background:#f8fafc;color:#1a2233;font:15px/1.3 system-ui,-apple-system,'Segoe UI',sans-serif}" +
    ".mav-leiste .mav-nr{font-weight:800;color:#1a2233;white-space:nowrap}.mav-leiste .mav-rd{color:#4f5b6e;font-size:13px;font-weight:700;white-space:nowrap}" +
    ".mav-leiste .mav-pf{width:34px;height:34px;border-radius:50%;border:2px solid #1565c0;background:#fff;color:#1565c0;font:800 20px/1 system-ui,sans-serif;padding:0 0 2px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}" +
    ".mav-leiste .mav-pf:disabled{border-color:#b0b0b8;color:#9aa3b2;cursor:default;background:#f1f5f9}.mav-leiste .mav-pf:not(:disabled):hover{background:#e8f1ff}" +
    ".mav-leiste[dir=rtl] .mav-pf{transform:scaleX(-1)}" +
    ".mav-punkte{display:flex;gap:4px;flex-wrap:wrap;margin:0;padding:0;list-style:none}" +
    ".mav-punkte button{width:24px;height:24px;border-radius:50%;border:2px solid #b0b0b8;background:#fff;color:#4f5b6e;font:800 13px/1 system-ui,sans-serif;padding:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}" +
    ".mav-punkte button:disabled{cursor:default;opacity:.55}" +
    ".mav-punkte .ok{border-color:#2e7d32;background:#e8f5e9;color:#1b5e20}.mav-punkte .nein{border-color:#c62828;background:#ffebee;color:#b71c1c}.mav-punkte .offen{border-color:#8a94a6;background:#eef1f5;color:#4f5b6e}" +
    ".mav-punkte .akt{border-color:#1565c0;border-width:3px;background:#fff;color:#1565c0}.mav-punkte .sel{outline:3px solid #f59e0b;outline-offset:1px}" +
    ".mav-jetzt{border:2px solid #1565c0;background:#1565c0;color:#fff;border-radius:999px;font:700 14px system-ui,sans-serif;padding:6px 14px;cursor:pointer}" +
    ".mav-hinweis{flex:1 1 100%;margin:0;font-weight:700;border-radius:10px;padding:6px 10px}" +
    ".mav-hinweis.blick{background:#fff7e0;color:#7a4b00;border:1px solid #e0b252}.mav-hinweis.runde{background:#e8f5e9;color:#1b5e20;border:1px solid #81c784}" +
    ".mav-zurueck>:not(.mav-leiste):not(.mav-blick){display:none!important}" +
    ".mav-blick{display:block;border:2px dashed #e0b252;border-radius:14px;padding:8px 10px;margin-bottom:10px}" +
    ".mav-aus #uNr{display:none!important}" +
    "body.night .mav-leiste{background:#1f2433;color:#eef1f7;border-color:#5b6478}body.night .mav-leiste .mav-nr{color:#eef1f7}body.night .mav-leiste .mav-rd{color:#b8c0d0}" +
    "body.night .mav-leiste .mav-pf,body.night .mav-punkte button{background:#2a3042;color:#9cc3ff}body.night .mav-punkte .ok{background:#1e3b25;color:#a5d6a7}body.night .mav-punkte .nein{background:#45201f;color:#ef9a9a}" +
    "@media print{.mav-leiste,.mav-blick{display:none!important}}";

  var box, taskEl, meldEl, leiste, blickHost = null, blickRoot = null;
  var hist = [], basis = 0, blick = -1, pending = null, letzter = null, sig = "", spr = "", banner = null;
  var WEITER = "#weiter,#uWeiter,#neuAuf", WEG = ["weiter", "uWeiter", "neuAuf", "pruefen", "uPruefen"];

  function sigJetzt(){ return (taskEl.textContent || "").replace(/\s+/g, " ").trim(); }
  function nochmalText(s){ var N = window.MS_NOCH || {}; for(var k in N) if(N[k] === s) return true; return false; }
  function ergebnis(){
    if(!meldEl) return "offen";
    var c = " " + meldEl.className + " ", t = (meldEl.textContent || "").trim();
    if(!t) return "offen";
    if(/ (gut|ok|richtig) /.test(c)) return "ok";
    if(/ (schlecht|falsch|nein) /.test(c)) return nochmalText(t) ? "offen" : "nein";
    return "offen";
  }
  // Übungsbereich kopieren: Eingaben einfrieren, Zeichenflächen als Bild, Prüfen/Weiter weglassen
  function schnapp(){
    var d = document.createElement("div");
    Array.prototype.forEach.call(box.childNodes, function(ch){
      if(ch === leiste || ch === blickHost) return;
      var c = ch.cloneNode(true);
      if(ch.nodeType === 1){
        var o = [ch].concat(Array.prototype.slice.call(ch.querySelectorAll("input,textarea,select,canvas"))), n = [c].concat(Array.prototype.slice.call(c.querySelectorAll("input,textarea,select,canvas")));
        o.forEach(function(e, i){
          var z = n[i]; if(!z || !/^(INPUT|TEXTAREA|SELECT|CANVAS)$/.test(e.tagName)) return;
          if(e.tagName === "INPUT"){ if(/^(checkbox|radio)$/i.test(e.type)){ if(e.checked) z.setAttribute("checked", ""); else z.removeAttribute("checked"); } else z.setAttribute("value", e.value); }
          else if(e.tagName === "TEXTAREA") z.textContent = e.value;
          else if(e.tagName === "SELECT") Array.prototype.forEach.call(z.options, function(op, j){ if(j === e.selectedIndex) op.setAttribute("selected", ""); else op.removeAttribute("selected"); });
          else { try { var im = document.createElement("img"); im.src = e.toDataURL(); im.style.width = (e.clientWidth || e.width) + "px"; im.style.maxWidth = "100%"; z.parentNode.replaceChild(im, z); } catch(x){} }
        });
        WEG.forEach(function(id){ if(c.id === id) c = null; else if(c.querySelector){ var w = c.querySelector("#" + id); if(w) w.remove(); } });
        if(!c) return;
        Array.prototype.forEach.call(c.querySelectorAll("input,textarea,select,button"), function(e){ e.setAttribute("disabled", ""); e.setAttribute("tabindex", "-1"); });
        if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(c.tagName)) c.setAttribute("disabled", "");
      }
      d.appendChild(c);
    });
    return { html: d.innerHTML, erg: ergebnis(), lang: sprache() };
  }
  function nehmen(p){
    hist.push(p); banner = null;
    var nr = basis + hist.length;
    if(nr % RUNDE === 0){
      var k = 0; for(var i = hist.length - RUNDE; i < hist.length; i++) if(i >= 0 && hist[i].erg === "ok") k++;
      banner = { r: nr / RUNDE, k: k };
    }
    if(hist.length > MAX){ hist.splice(0, RUNDE); basis += RUNDE; }
    if(blick >= 0) live(); else zeichne();
  }

  // ---------- Rückblick im Shadow-DOM (gleiche Stile, eigene IDs) ----------
  function huelle(el){ var c = el.cloneNode(false); c.removeAttribute("style"); c.removeAttribute("hidden"); c.classList.remove("mav-zurueck"); c.classList.add("mav-h"); return c; }
  function zeige(i){
    blick = i; box.classList.add("mav-zurueck");
    if(!blickHost){
      blickHost = document.createElement("div"); blickHost.className = "mav-blick";
      leiste.parentNode.insertBefore(blickHost, leiste.nextSibling);
      blickRoot = blickHost.attachShadow ? blickHost.attachShadow({ mode: "open" }) : blickHost;
    }
    blickHost.hidden = false;
    var H = hist[i], st = "";
    document.querySelectorAll('link[rel="stylesheet"],style').forEach(function(s){ st += s.outerHTML; });
    blickRoot.innerHTML = st + "<style>:host{display:block}.mav-h{margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:transparent!important;max-width:none!important;width:auto!important;min-height:0!important;height:auto!important;position:static!important;transform:none!important;display:block!important;overflow:visible!important;zoom:1!important}" +
      "button,input,select,textarea,a{pointer-events:none}input:disabled,select:disabled,textarea:disabled{opacity:1;color:inherit}</style>";
    // Vorfahren-Kette (html > body > … > Übungsbereich) leer nachbauen, damit Selektoren wie „.wrap #auftrag“ greifen
    var kette = [], e = box; while(e && e !== document.documentElement){ kette.unshift(e); e = e.parentElement; }
    var wurzel = huelle(document.documentElement), an = wurzel;
    kette.forEach(function(el){ var h = huelle(el); an.appendChild(h); an = h; });
    an.innerHTML = H.html;
    blickRoot.appendChild(wurzel);
    zeichne();
    try { leiste.scrollIntoView({ block: "nearest" }); } catch(x){}
  }
  function live(){ blick = -1; box.classList.remove("mav-zurueck"); if(blickHost){ blickHost.hidden = true; if(blickRoot) blickRoot.innerHTML = ""; } zeichne(); }
  function gehe(i){ if(i < 0) i = 0; if(i >= hist.length) live(); else zeige(i); }

  // ---------- Leiste ----------
  function zeichne(){
    if(!leiste) return;
    var akt = hist.length, z = blick >= 0 ? blick : akt, gz = basis + z, r = Math.floor(gz / RUNDE), start = r * RUNDE - basis;
    leiste.dir = sprache() === "ar" ? "rtl" : "ltr";
    var h = '<button type="button" class="mav-pf" data-a="zur" title="' + esc(tx("zur")) + '" aria-label="' + esc(tx("zur")) + '"' + (z <= 0 ? " disabled" : "") + ">‹</button>" +
      '<span class="mav-nr">' + esc(tx("nr", { i: gz % RUNDE + 1, n: RUNDE })) + "</span>" + (r > 0 ? '<span class="mav-rd">' + esc(tx("runde", { r: r + 1 })) + "</span>" : "") +
      '<button type="button" class="mav-pf" data-a="vor" title="' + esc(tx("vor")) + '" aria-label="' + esc(tx("vor")) + '"' + (z >= akt ? " disabled" : "") + ">›</button>" +
      '<ul class="mav-punkte" aria-label="' + esc(tx("liste")) + '">';
    for(var j = 0; j < RUNDE; j++){
      var idx = start + j, kl = "", zei = "", lab = "";
      if(idx >= 0 && idx < akt){ kl = hist[idx].erg; zei = kl === "ok" ? "✓" : kl === "nein" ? "✗" : "–"; lab = tx("nr", { i: j + 1, n: RUNDE }) + ": " + tx(kl); }
      else if(idx === akt){ kl = "akt"; zei = String(j + 1); lab = tx("nr", { i: j + 1, n: RUNDE }); }
      else { zei = ""; lab = tx("nr", { i: j + 1, n: RUNDE }); }
      if(idx === z) kl += " sel";
      h += '<li><button type="button" class="' + kl + '" data-i="' + idx + '" title="' + esc(lab) + '" aria-label="' + esc(lab) + '"' + (idx < 0 || idx > akt ? " disabled" : "") + (idx === z ? ' aria-current="true"' : "") + ">" + zei + "</button></li>";
    }
    h += "</ul>";
    if(blick >= 0) h += '<button type="button" class="mav-jetzt" data-a="jetzt">' + esc(tx("jetzt")) + '</button><p class="mav-hinweis blick">' + esc(tx("blick")) + " · " + esc(tx(hist[blick].erg)) + "</p>";
    else if(banner && z === akt) h += '<p class="mav-hinweis runde">★ ' + esc(tx("fertig", { r: banner.r, k: banner.k, n: RUNDE })) + "</p>";
    leiste.innerHTML = h;
  }

  function weiterGeklickt(){
    if(blick >= 0 || pending) return;
    pending = schnapp(); letzter = null;
    setTimeout(function(){ if(pending){ var p = pending; pending = null; sig = sigJetzt(); spr = sprache(); nehmen(p); } }, 0);
  }
  function beobachte(){
    var s = sigJetzt(), l = sprache();
    if(s === sig){ if(!pending && blick < 0 && ergebnis() !== "offen") letzter = schnapp(); return; }
    if(pending){ var p = pending; pending = null; letzter = null; sig = s; spr = l; nehmen(p); return; }
    if(l === spr && sig && letzter){ var q = letzter; letzter = null; sig = s; nehmen(q); return; }
    letzter = null; sig = s; spr = l; zeichne();
  }

  function start(){
    taskEl = document.querySelector("#auftrag,#uAuftrag,#frage");
    var w = document.querySelector(WEITER);
    if(!taskEl || !w) return;
    box = K === "beruehmt" ? document.getElementById("kAuf") : document.getElementById("s_ueben");
    if(!box || !box.contains(taskEl) || !box.contains(w)){ box = taskEl.parentElement; while(box && !box.contains(w)) box = box.parentElement; }
    if(!box || box === document.body) return;
    meldEl = box.querySelector("#uMeld,#meldung,.meldung");
    var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    document.body.classList.add("mav-aus");
    leiste = document.createElement("div"); leiste.className = "mav-leiste"; leiste.setAttribute("role", "group");
    box.insertBefore(leiste, box.firstChild);
    sig = sigJetzt(); spr = sprache();
    leiste.addEventListener("click", function(e){
      var b = e.target.closest("button"); if(!b || b.disabled) return;
      var a = b.getAttribute("data-a"), z = blick >= 0 ? blick : hist.length;
      if(a === "zur") gehe(z - 1); else if(a === "vor") gehe(z + 1); else if(a === "jetzt") live();
      else if(b.hasAttribute("data-i")) gehe(+b.getAttribute("data-i"));
    });
    // Klick auf „Weiter“ (vor dem Kachel-Code, darum capture)
    document.addEventListener("click", function(e){ var b = e.target.closest && e.target.closest(WEITER); if(b && box.contains(b)) weiterGeklickt(); }, true);
    // Enter nach einer Antwort = nächste Aufgabe (bei vielen Kacheln)
    document.addEventListener("keydown", function(e){
      if(e.key !== "Enter" || blick >= 0 || pending || !box.offsetParent || ergebnis() === "offen") return;
      var t = e.target; if(t && t.closest && t.closest(".mav-leiste")) return;
      var vorher = schnapp(), s0 = sigJetzt(), m0 = meldEl ? meldEl.textContent : "";
      setTimeout(function(){ if(pending) return; if(sigJetzt() !== s0 || (meldEl && meldEl.textContent !== m0 && ergebnis() === "offen")){ if(sig === sigJetzt() && sigJetzt() !== s0) return; letzter = null; sig = sigJetzt(); spr = sprache(); nehmen(vorher); } }, 0);
    }, true);
    new MutationObserver(function(rec){
      for(var i = 0; i < rec.length; i++){ var n = rec[i].target; if(leiste.contains(n) || (blickHost && blickHost.contains(n))) continue; beobachte(); return; }
    }).observe(box, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class"] });
    new MutationObserver(function(){ if(sprache() !== spr && sigJetzt() !== sig){ sig = sigJetzt(); } spr = sprache(); zeichne(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape" && blick >= 0) live(); });
    zeichne();
    window.MS_AV = { verlauf: function(){ return hist.slice(); }, live: live, gehe: gehe };
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else setTimeout(start, 0);
})();
