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
  a.href = "/" + (window.MS_URL_LANG ? "?lang=" + window.MS_URL_LANG : ""); a.className = "ms-home-btn"; a.setAttribute("aria-label", T[lang]); a.title = T[lang];
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 2.5 11.1a1 1 0 0 0 1.3 1.5l.7-.6V20a1 1 0 0 0 1 1h4.5v-5.5h4V21H18.5a1 1 0 0 0 1-1v-8l.7.6a1 1 0 1 0 1.3-1.5Z"/></svg>';
  if(!window.MS_EMBED) document.body.appendChild(a);

  // Üben: zweiter Versuch nach einer falschen getippten Antwort (alle Kacheln).
  // msTippbar(e): true, wenn die Antwort aus einem Eingabefeld kommt (Text oder
  // mehrere Felder) – bei Ja/Nein- oder Auswahl-Knöpfen gibt es keinen 2. Versuch.
  // msNochmal(meldungEl): zeigt „Noch nicht richtig …“ und setzt den Cursor ins Feld.
  var NOCH = { de: "Noch nicht richtig – versuch es noch einmal.", en: "Not quite – try once more.", es: "Todavía no – inténtalo otra vez.",
    zh: "还不对——再试一次。", fr: "Pas encore – essaie encore une fois.", ru: "Пока неверно – попробуй ещё раз.",
    ar: "ليست صحيحة بعد – حاول مرة أخرى.", ja: "まだちがいます。もう一度やってみよう。", pt: "Ainda não – tente mais uma vez." };
  window.msTippbar = function(e){
    if(window.MS_LEER_LOES) return false;   // „Prüfen“ ohne Eingabe: gleich die Lösung, kein zweiter Versuch
    if(Array.isArray(e)) return true;
    if(typeof e !== "string" || !e.trim()) return false;
    var ins = document.querySelectorAll("input");
    for(var i = 0; i < ins.length; i++){ var ty = (ins[i].type || "text").toLowerCase(); if(ty !== "checkbox" && ty !== "radio" && ty !== "range" && ins[i].value === e) return true; }
    return false;
  };
  window.msNochmal = function(m){
    if(m){ m.className = "meldung schlecht"; m.textContent = NOCH[lang] || NOCH.de; }
    var f = document.activeElement && document.activeElement.tagName === "INPUT" ? document.activeElement : null;
    if(!f){ var ins = document.querySelectorAll("input"); for(var i = ins.length - 1; i >= 0; i--){ if(ins[i].offsetParent && !ins[i].disabled && /^(text|number|)$/i.test(ins[i].type || "") && ins[i].value){ f = ins[i]; break; } } }
    if(f){ try { f.focus(); f.select(); } catch(x){} }
  };

  // VocabBoss-Konto: richtige Aufgaben → Dogdex-Karte (konto.js)
  var kj = document.createElement("script"); kj.src = "/konto.js"; kj.defer = true; document.head.appendChild(kj);

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

// ---------- Lupen-Knopf: Seite vergrößern/verkleinern (/seitenzoom.js) ----------
(function(){
  if(window.MS_EMBED || window.MS_SEITENZOOM || document.querySelector('script[src="/seitenzoom.js"]')) return;
  var s = document.createElement("script"); s.src = "/seitenzoom.js"; document.head.appendChild(s);
})();

// ---------- Direktlinks zu Reitern/Unterseiten + 🔗-Knopf (/bereichslink.js) ----------
(function(){
  if(window.MS_EMBED || window.MS_BEREICHSLINK || document.querySelector('script[src="/bereichslink.js"]')) return;
  var s = document.createElement("script"); s.src = "/bereichslink.js"; document.head.appendChild(s);
})();

// ---------- Legende der Formelzeichen und Abkürzungen (/zeichen.js) ----------
(function(){
  if(window.MS_ZEICHEN || document.querySelector('script[src="/zeichen.js"]')) return;
  var s = document.createElement("script"); s.src = "/zeichen.js"; document.head.appendChild(s);
})();
// ---------- Gleichungen im Fließtext: ein „=“ pro Zeile (/fliesstext-formeln.js) ----------
(function(){
  if(window.MS_FZ || document.querySelector('script[src="/fliesstext-formeln.js"]')) return;
  var s = document.createElement("script"); s.src = "/fliesstext-formeln.js"; document.head.appendChild(s);
})();
// ---------- Rechenwege Zeile für Zeile, Brüche, Wurzeln (/formel.js) ----------
(function(){
  if(window.MS_F || document.querySelector('script[src="/formel.js"]')) return;
  var s = document.createElement("script"); s.src = "/formel.js"; document.head.appendChild(s);
})();

// ---------- Beispielbilder unten auf der Kachel (für Google Bilder): /beispiel-bilder.js + /beispiel-galerie.js ----------
(function(){
  if(window.MS_EMBED || location.pathname === "/" || document.querySelector('script[src="/beispiel-galerie.js"]')) return;
  var a = document.createElement("script"); a.src = "/beispiel-bilder.js";
  a.onload = function(){ var k = location.pathname.split("/").filter(Boolean)[0]; if(!window.MS_BB || !MS_BB[k]) return; var b = document.createElement("script"); b.src = "/beispiel-galerie.js"; document.head.appendChild(b); };
  document.head.appendChild(a);
})();

// ---------- Pfeiltasten springen zwischen Eingabefeldern (alle Unter-Apps) ----------
// ↑/↓ zum nächsten Feld darüber/darunter, ←/→ erst am Textanfang/-ende zum Nachbarfeld
// (nach Bildschirmposition, wie in Bruchrechnen). Eigene Pfeil-Logik einer App hat Vorrang
// (preventDefault). Nicht in Reglern, Häkchen, Auswahllisten, Textbereichen; data-nonav schaltet ab.
(function(){
  "use strict";
  var TYP = /^(text|number|search|tel|email|url|)$/i;
  function passt(c){
    return c.tagName === "INPUT" && TYP.test(c.type || "") && !c.disabled && !c.readOnly && !c.hasAttribute("data-nonav") && c.offsetParent !== null;
  }
  document.addEventListener("keydown", function(e){
    if(e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var k = e.key; if(k !== "ArrowLeft" && k !== "ArrowRight" && k !== "ArrowUp" && k !== "ArrowDown") return;
    var el = e.target; if(!el || !passt(el)) return;
    var s = null, en = null; try { s = el.selectionStart; en = el.selectionEnd; } catch(x){}
    if(s !== null && en !== null){
      if(k === "ArrowLeft" && (s !== 0 || en !== 0)) return;
      if(k === "ArrowRight" && (s !== el.value.length || en !== el.value.length)) return;
    }
    var r0 = el.getBoundingClientRect(), cx = r0.left + r0.width / 2, cy = r0.top + r0.height / 2;
    var best = null, bw = Infinity;
    document.querySelectorAll("input").forEach(function(c){
      if(c === el || !passt(c)) return;
      var r = c.getBoundingClientRect(), dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy, h, q;
      if(k === "ArrowRight"){ if(dx <= 5 || Math.abs(dy) > r0.height) return; h = dx; q = Math.abs(dy); }
      if(k === "ArrowLeft"){ if(dx >= -5 || Math.abs(dy) > r0.height) return; h = -dx; q = Math.abs(dy); }
      if(k === "ArrowDown"){ if(dy <= 5) return; h = dy; q = Math.abs(dx); }
      if(k === "ArrowUp"){ if(dy >= -5) return; h = -dy; q = Math.abs(dx); }
      var w = h + 3 * q; if(w < bw){ bw = w; best = c; }
    });
    if(best){ e.preventDefault(); best.focus(); try { best.select(); } catch(x){} }
  });
})();

// ---------- Eingabefelder wachsen mit, damit Inhalt und Platzhalter lesbar bleiben ----------
// Ist der eingetippte (oder per Programm gesetzte) Text oder der Platzhalter breiter als das Feld,
// wird das Feld so breit wie nötig – höchstens so breit wie sein Elternelement. Wird der Text
// wieder kürzer, schrumpft es bis zur ursprünglichen Breite zurück. Felder, in die alles passt,
// bleiben unverändert. data-nofit schaltet ab.
(function(){
  "use strict";
  var TYP = /^(text|number|search|tel|email|url|)$/i, cv = document.createElement("canvas").getContext("2d");
  function breite(txt, cs){
    cv.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
    var w = cv.measureText(txt).width, ls = parseFloat(cs.letterSpacing);
    return w + (isFinite(ls) ? ls * txt.length : 0);
  }
  function passe(inp){
    if(inp.tagName !== "INPUT" || !TYP.test(inp.type || "") || inp.hasAttribute("data-nofit") || inp.offsetParent === null) return;
    var cs = getComputedStyle(inp);
    var rand = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    if(inp._msW == null){ if(inp.offsetWidth < 4) return; inp._msW = inp.offsetWidth; inp._msStil = inp.style.width; }
    var txt = inp.value || inp.placeholder || "";
    var noetig = Math.ceil(breite(txt, cs) + rand + (inp.type === "number" ? 22 : 6));
    var p = inp.parentElement, max = p ? p.clientWidth : 0;
    if(max > 0) noetig = Math.min(noetig, max);
    if(noetig > inp._msW){ inp.style.width = noetig + "px"; inp.style.maxWidth = "100%"; inp._msGross = true; }
    else if(inp._msGross){ inp.style.width = inp._msStil; inp._msGross = false; }
    // Platzhalter passt auch nach dem Verbreitern nicht: Schrift des Platzhalters verkleinern (mind. 11 px)
    if(!inp.value && inp.placeholder){
      var frei = inp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (inp.type === "number" ? 18 : 2);
      var fs = parseFloat(cs.fontSize), pw = breite(inp.placeholder, cs);
      if(pw > frei && frei > 0) inp.style.setProperty("--msPhFs", Math.max(11, Math.floor(fs * frei / pw)) + "px");
      else inp.style.removeProperty("--msPhFs");
    }
  }
  var geplant = false;
  function alle(){ geplant = false; var l = document.querySelectorAll("input"); for(var i = 0; i < l.length; i++) passe(l[i]); }
  function spaeter(){ if(!geplant){ geplant = true; requestAnimationFrame(alle); } }
  document.addEventListener("input", function(e){ passe(e.target); }, true);
  document.addEventListener("focusin", function(e){ passe(e.target); }, true);
  ["click", "keyup", "change"].forEach(function(t){ document.addEventListener(t, function(){ setTimeout(spaeter, 30); }, true); });
  window.addEventListener("load", spaeter);
  window.addEventListener("resize", function(){ var l = document.querySelectorAll("input"); for(var i = 0; i < l.length; i++){ if(l[i]._msGross){ l[i].style.width = l[i]._msStil; l[i]._msGross = false; } l[i]._msW = null; } spaeter(); });
  if(window.MutationObserver) new MutationObserver(spaeter).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["placeholder", "value", "hidden", "class"] });
  window.msFelderAnpassen = alle;
})();

// ---------- „Prüfen“ ohne Eingabe: Hinweis statt Stille (alle Kacheln) ----------
// 🆕 Chat-Wunsch: Prüfen-Knöpfe reagieren auch, wenn noch nichts eingetippt ist – mit einer Fehlermeldung
// direkt am leeren Feld. Erkannt werden Knöpfe am Text (Prüfen/Check/… in 9 Sprachen) oder an id/Klasse
// mit „pruef“/„check“. Zugehörige Felder = kleinster umgebender Bereich mit sichtbaren Eingabefeldern.
// Abschalten je Knopf oder Bereich: data-noleer.
(function(){
  var LEER = { de: "Bitte gib zuerst eine Antwort ein.", en: "Please enter an answer first.", es: "Primero escribe una respuesta.", zh: "请先输入答案。", fr: "Écris d’abord une réponse.", ru: "Сначала введи ответ.", ar: "اكتب إجابة أولًا.", ja: "先に答えを入力してね。", pt: "Escreve primeiro uma resposta." };
  var RE = /^[\s✓✔→▶]*(prüfen|überprüfen|antwort prüfen|kontrollieren|check|check answer|comprobar|corregir|检查|核对|检验|vérifier|проверить|تحقق|تحقّق|確かめる|確認|チェック|答え合わせ|verificar|conferir)\b/i;
  function sprache(){ var l = "de"; try { l = localStorage.getItem("msMathLang") || window.MS_MATH_LANG || "de"; } catch(e){} return LEER[l] ? l : "de"; }
  function istPruef(b){
    if(!b || b.closest("[data-noleer]")) return false;
    var id = (b.id || "") + " " + (typeof b.className === "string" ? b.className : "");
    return RE.test((b.textContent || "").trim()) || /pruef|prüf|check/i.test(id);
  }
  function felder(c){
    return Array.prototype.filter.call(c.querySelectorAll("input, textarea"), function(i){
      var t = (i.type || "text").toLowerCase();
      return /^(text|number|search|tel|)$/.test(t) && !i.readOnly && !i.disabled && i.offsetParent !== null && !i.closest("[data-noleer]") && !i.matches(".hzw-tile-search, #suche, .box-word-filter");
    });
  }
  function bereich(b){
    var c = b.parentElement;
    for(var n = 0; c && n < 5; n++, c = c.parentElement){ var f = felder(c); if(f.length) return f; }
    return [];
  }
  var blase = null, timer = 0;
  function zeige(f){
    if(!blase){
      blase = document.createElement("div"); blase.className = "ms-leer"; blase.setAttribute("role", "alert");
      var st = document.createElement("style");
      st.textContent = ".ms-leer{position:absolute;z-index:9000;background:#c62828;color:#fff;font:700 14px system-ui,sans-serif;padding:6px 10px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.2);pointer-events:none;max-width:260px}.ms-leer::before{content:'';position:absolute;top:-6px;left:14px;border:6px solid transparent;border-top:0;border-bottom-color:#c62828}.ms-leer-feld{outline:3px solid #c62828 !important;outline-offset:1px}";
      document.head.appendChild(st); document.body.appendChild(blase);
    }
    var r = f.getBoundingClientRect();
    blase.textContent = LEER[sprache()]; blase.hidden = false;
    blase.style.left = Math.max(4, r.left + window.scrollX) + "px"; blase.style.top = (r.bottom + window.scrollY + 8) + "px";
    f.classList.add("ms-leer-feld"); try { f.focus(); } catch(x){}
    clearTimeout(timer); timer = setTimeout(function(){ blase.hidden = true; f.classList.remove("ms-leer-feld"); }, 2600);
    f.addEventListener("input", function weg(){ blase.hidden = true; f.classList.remove("ms-leer-feld"); f.removeEventListener("input", weg); });
  }
  // „Lösung zeigen“-Knopf in der Nähe (gleicher Aufgabenbereich)?
  var LRE = /(lösung|loesung|lösungsweg|solution|solución|答案|解答|решение|الحل|答え|解き方|solução|resolução)/i;
  function loesKnopf(b){
    var c = b.parentElement;
    for(var n = 0; c && n < 3; n++, c = c.parentElement){
      var L = Array.prototype.filter.call(c.querySelectorAll("button, a, details > summary"), function(x){ return x !== b && x.offsetParent !== null && !x.disabled && LRE.test(x.textContent || "") && !/verbergen|ausblenden|hide|ocultar|masquer|скрыть|إخفاء|隠す|esconder|隐藏/i.test(x.textContent || ""); });
      if(L.length) return L[0];
    }
    return null;
  }
  var SENT = "987654";   // Platzhalter, der sicher falsch ist → die Kachel wertet „falsch“ und zeigt den Lösungsweg
  window.addEventListener("click", function(e){
    if(window.MS_LEER_LOES) return;
    var b = e.target && e.target.closest && e.target.closest("button, input[type=button], input[type=submit], [role=button]");
    if(!b || b.disabled || !istPruef(b)) return;
    var alle = bereich(b), leer = alle.filter(function(i){ return !String(i.value || "").trim(); });
    if(!leer.length) return;
    // 🆕 Chat-Wunsch: Prüfen ohne Eingabe zeigt gleich die Lösung
    var lk = loesKnopf(b);
    if(lk){
      e.preventDefault(); e.stopImmediatePropagation();
      if(lk.tagName === "SUMMARY"){ lk.parentElement.open = true; try { lk.parentElement.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch(x){} }
      else lk.click();
      return;
    }
    e.preventDefault(); e.stopImmediatePropagation();
    window.MS_LEER_LOES = true;
    leer.forEach(function(i){ i.value = SENT; });
    var vorher = (b.closest(".karte, section, form, main") || document.body).innerText;
    // Kacheln mit eigenem Zähler für weitere Versuche: so lange „falsch“ abgeben (höchstens 3-mal),
    // bis die Felder gesperrt sind oder der Knopf verschwindet
    for(var v = 0; v < 3; v++){
      var offen = leer.filter(function(i){ return i.isConnected && !i.readOnly && !i.disabled && i.offsetParent !== null; });
      if(v && (!offen.length || !b.isConnected || b.disabled || b.offsetParent === null)) break;
      offen.forEach(function(i){ if(!String(i.value || "").trim() || i.value === SENT) i.value = SENT; });
      try { b.click(); } catch(x){}
    }
    function aufraeumen(){ Array.prototype.forEach.call(document.querySelectorAll("input, textarea"), function(i){ if(i.value === SENT) i.value = ""; }); }
    aufraeumen(); setTimeout(aufraeumen, 0); setTimeout(aufraeumen, 300);
    window.MS_LEER_LOES = false;
    var m = document.querySelectorAll(".meldung, .feedback, .rueck, [id*=meld], [id*=Msg], [id*=msg]");
    Array.prototype.forEach.call(m, function(x){ if(/987[  .,]?654/.test(x.textContent)) x.textContent = x.textContent.replace(/987[  .,]?654/g, "–"); });
  }, true);
})();
