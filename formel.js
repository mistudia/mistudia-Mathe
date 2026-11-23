// ============================================================
// /formel.js – gemeinsame Formel-Darstellung für Rechenwege (MS_F)
//   MS_F.bruch(z, n)          → Bruch mit Bruchstrich (HTML)
//   MS_F.wurzel(x)            → Wurzel, deren Strich über den ganzen Ausdruck reicht
//   MS_F.c(k, html)           → farbig: k = "a" | "b" | "c" | "d" (Farben wie bei den Reglern)
//   MS_F.zeilen(rows)         → Gleichungen Zeile für Zeile, am Relationszeichen ausgerichtet
//                               rows: [[links, "=", rechts], ["", "=", rechts], [text]]
//   MS_F.kette(text)          → Klartext „A = B = C ≈ D“ / „… → …“ in Zeilen zerlegen (je Zeile ein =)
//   MS_F.mnf(o)               → Mitternachtsformel: allgemein, eingesetzt, vereinfacht, x₁ und x₂
// Alles links-nach-rechts (auch in arabischer Oberfläche).
// ============================================================
var MS_F = (function(){
  "use strict";
  var FARBE = { a: "#1e88e5", b: "#ff7a00", c: "#00b84a", d: "#b14cf0" };
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function bruch(z, n){ return '<span class="msf-br"><span>' + z + "</span><span>" + n + "</span></span>"; }
  function wurzel(x){ return '<span class="msf-w"><span class="msf-wz">√</span><span class="msf-wi">' + x + "</span></span>"; }
  function c(k, h){ return '<span class="msf-f msf-' + k + '" style="color:' + (FARBE[k] || "inherit") + '">' + h + "</span>"; }
  function zeilen(rows){
    var h = '<div class="msf-blk" dir="ltr">';
    rows.forEach(function(r){
      if(r.length === 1) h += '<div class="msf-voll">' + r[0] + "</div>";
      else h += '<div class="msf-l">' + r[0] + '</div><div class="msf-r">' + r[1] + '</div><div class="msf-rr">' + r[2] + "</div>";
    });
    return h + "</div>";
  }
  // Klartext in Zeilen: an Relationen auf oberster Ebene trennen (nicht in Klammern)
  var REL = [" = ", " ≈ ", " → ", " ⇒ ", "  →  ", "  ⇒  "];
  function teile(s){
    var out = [], tief = 0, start = 0, rels = [];
    for(var i = 0; i < s.length; i++){
      var ch = s.charAt(i);
      if(ch === "(" || ch === "[") tief++;
      else if(ch === ")" || ch === "]") tief = Math.max(0, tief - 1);
      else if(tief === 0 && ch === " "){
        var m = s.slice(i).match(/^ {1,3}(=|≈|→|⇒|<|>|≤|≥) {1,3}/);
        if(m){ out.push(s.slice(start, i)); rels.push(m[1]); i += m[0].length - 1; start = i + 1; }
      }
    }
    out.push(s.slice(start));
    return { teile: out, rels: rels };
  }
  // „√(…)“ und „√Zahl“ in lange Wurzeln umwandeln (auf bereits escapetem Text)
  function wurzelnHtml(h){
    var i, r = "";
    while((i = h.indexOf("√")) >= 0){
      r += h.slice(0, i); h = h.slice(i + 1);
      if(h.charAt(0) === "("){
        var t = 0, j = 0; for(; j < h.length; j++){ if(h.charAt(j) === "(") t++; else if(h.charAt(j) === ")"){ t--; if(t === 0) break; } }
        r += wurzel(wurzelnHtml(h.slice(1, j))); h = h.slice(j + 1);
      } else { var m = h.match(/^[0-9.,]+|^[a-zA-Zα-ω]+[²³]?/); var w = m ? m[0] : ""; r += wurzel(w); h = h.slice(w.length); }
    }
    return r + h;
  }
  // einfache Zahlenbrüche „12/156“ als Bruch mit Bruchstrich (nur im Text, nicht in Tags)
  function brueche(h){
    return h.split(/(<[^>]*>)/).map(function(t){
      if(t.charAt(0) === "<") return t;
      if(t.indexOf("√") >= 0 && t.indexOf("msf-w") < 0) t = wurzelnHtml(t);
      return t.replace(/(^|[^\w\/.,^])(−?\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)(?![\w\/^²³])/g, function(m, vor, z, n){ return vor + bruch(z, n); });
    }).join("");
  }
  function fmt(s){ return brueche(esc(s)); }
  // Ist das eine Aufzählung von Zuweisungen („a = 1, b = 2“)? Dann nicht zerlegen.
  function aufzaehlung(s){ return /[,;]\s+[^\s,;()]{1,12}\s=\s/.test(s) || /\s{3,}(oder|or|o|ou|или|أو|または|或)\s{3,}/.test(s) || /∨/.test(s); }
  function kette(s){
    s = String(s);
    if(/;\s/.test(s) && !/[,]\s+[^\s,;()]{1,12}\s=\s/.test(s)) return s.split(/;\s+/).map(kette).join("");
    if(aufzaehlung(s)) return zeilen([[fmt(s)]]);
    var T = teile(s);
    if(!T.rels.length) return zeilen([[fmt(s)]]);
    return zeilen(zeilenAus(T.teile.map(fmt), T.rels));
  }
  function istPfeil(r){ return r === "→" || r === "⇒"; }
  // Teile + Relationen → Zeilen; nach → / ⇒ beginnt eine neue Gleichung („⇒ x = 5“ in einer Zeile)
  function zeilenAus(P, R){
    var rows = [], k;
    if(istPfeil(R[0])){ rows.push([P[0]]); k = 0; } else { rows.push([P[0], R[0], P[1]]); k = 1; }
    for(; k < R.length; k++){
      if(istPfeil(R[k]) && k + 1 < R.length && !istPfeil(R[k + 1])){ rows.push([R[k] + " " + P[k + 1], R[k + 1], P[k + 2]]); k++; }
      else rows.push(["", R[k], P[k + 1]]);
    }
    return rows;
  }
  // ---------- automatisch: Rechenweg-Zeilen mit mehreren Relationen untereinander setzen ----------
  var AUTO = "ol.lauf > li, ol.weg > li, ol.schritte > li, ol.ne-schritte > li, ol.be-schritte > li, .schritt, .rechnung, .loesung, .loesungsweg, .rw li > div, #eWeg, .lw-f";
  // HTML in Stücke an Relationen zerlegen – nur außerhalb von Tags/Elementen und Klammern
  function teileHtml(h){
    var P = [], R = [], start = 0, tag = false, q = null, el = 0, kl = 0;
    for(var i = 0; i < h.length; i++){
      var ch = h.charAt(i);
      if(tag){ if(q){ if(ch === q) q = null; } else if(ch === '"' || ch === "'") q = ch; else if(ch === ">") tag = false; continue; }
      if(ch === "<"){
        tag = true; var m = h.slice(i).match(/^<(\/?)([a-zA-Z0-9]+)[^>]*?(\/?)>/);
        if(m && !/^(br|img|input|wbr|hr)$/i.test(m[2]) && !m[3]) el += m[1] ? -1 : 1;
        continue;
      }
      if(el > 0) continue;
      if(ch === "(" || ch === "[") kl++; else if(ch === ")" || ch === "]") kl = Math.max(0, kl - 1);
      else if(kl === 0 && (ch === " " || ch === "\u00a0")){
        var r = h.slice(i).match(/^[ \u00a0]{1,3}(=|≈|→|⇒)[ \u00a0]{1,3}/);
        if(r){ P.push(h.slice(start, i)); R.push(r[1]); i += r[0].length - 1; start = i + 1; }
      }
    }
    P.push(h.slice(start));
    return { P: P, R: R };
  }
  function ausWickeln(h){ // äußeres <bdi>/<span> um die ganze Zeile entfernen
    for(var n = 0; n < 2; n++){
      var m = h.trim().match(/^<(bdi|span|b)\b[^>]*>([\s\S]*)<\/\1>$/); if(!m) break;
      var innen = m[2], tiefe = 0, ok = true, re = new RegExp("<(/?)" + m[1] + "\\b[^>]*>", "g"), x;
      while((x = re.exec(innen))){ tiefe += x[1] ? -1 : 1; if(tiefe < 0){ ok = false; break; } }
      if(!ok || tiefe !== 0 || m[1] === "b") break; h = innen;
    }
    return h;
  }
  function zeileHtml(seg){
    if(/<(table|svg|input|button|select|textarea|details)\b|msf-blk/i.test(seg)) return null;
    var semi = ausWickeln(seg).split(/;(?:\s|&nbsp;)+/);
    if(semi.length > 1 && semi.every(function(x){ return !/<[^>]*$/.test(x); })){
      var tl = semi.map(function(x){ return zeileHtml(x) || zeilen([[x]]); });
      return tl.some(function(x, i){ return x !== zeilen([[semi[i]]]); }) ? tl.join("") : null;
    }
    var h = ausWickeln(seg), T = teileHtml(h);
    if(T.R.length < 2) return null;
    var txt = h.replace(/<[^>]+>/g, "");
    if(aufzaehlung(txt) || /^\s*(=|≈)/.test(txt)) return null;
    var rows = zeilenAus(T.P.map(function(p){ return brueche(p.trim()); }), T.R);
    // Beschriftung vor dem ersten Doppelpunkt als eigene Zeile („Summenregel: P = …“)
    var l0 = rows[0][0], maske = l0.replace(/<[^>]*>/g, function(t){ return new Array(t.length + 1).join("\u0001"); }), m = maske.match(/^([\s\S]*?[^\s\d:\u0001]:)\s+/);
    if(m && rows[0].length === 3){ var cut = m[0].length; rows[0][0] = l0.slice(cut); rows.unshift(['<span dir="auto">' + l0.slice(0, m[1].length) + "</span>"]); }
    return zeilen(rows);
  }
  function aufbereiten(e){
    if(e.dataset.msf === e.innerHTML.length + ":" + e.childElementCount) return;
    if(e.querySelector(".msf-blk, button, input, select, textarea, svg, table")){ e.dataset.msf = e.innerHTML.length + ":" + e.childElementCount; return; }
    var segs = e.innerHTML.split(/<br\s*\/?>/i), neu = false;
    segs = segs.map(function(sg){ var z = zeileHtml(sg); if(z){ neu = true; return z; } return sg; });
    if(neu){
      var out = ""; segs.forEach(function(sg, i){ out += sg; if(i < segs.length - 1 && !/msf-blk/.test(sg) && !/msf-blk/.test(segs[i + 1])) out += "<br>"; });
      e.innerHTML = out;
    }
    e.dataset.msf = e.innerHTML.length + ":" + e.childElementCount;
  }
  var geplant = false;
  function lauf(){ geplant = false; try { document.querySelectorAll(AUTO).forEach(aufbereiten); } catch(x){} }
  function planen(){ if(!geplant){ geplant = true; (window.requestAnimationFrame || setTimeout)(lauf); } }
  if(document.body){ new MutationObserver(planen).observe(document.body, { childList: true, subtree: true, characterData: true }); planen(); }
  else document.addEventListener("DOMContentLoaded", function(){ new MutationObserver(planen).observe(document.body, { childList: true, subtree: true, characterData: true }); planen(); });
  // ---------- Mitternachtsformel ----------
  // o = { v: "x", a, b, c (Text, ohne Klammern), an, bn, cn (Zahlen), z: Zahlformat(v, Stellen),
  //       D (Text der Diskriminante), Dn, wD (Text der Wurzel, exakt oder gerundet), wExakt,
  //       x1, x2 (Text), xExakt, txt: { allg, einsetzen, D, loes } (Beschriftungen, optional) }
  function kl(t, n){ return n < 0 ? "(" + t + ")" : t; }
  function mnf(o){
    var v = o.v || "x", A = c("a", "a"), B = c("b", "b"), C = c("c", "c"), M = "−";
    var a = c("a", kl(o.a, o.an)), b = c("b", kl(o.b, o.bn)), cc = c("c", kl(o.c, o.cn)), mb = c("b", o.bn < 0 ? kl(o.b, o.bn) : o.b);
    var rows = [];
    var T = o.txt || {};
    if(T.allg) rows.push(['<span class="msf-h">' + T.allg + "</span>"]);
    rows.push([v + "<sub>1,2</sub>", "=", bruch(M + B + " ± " + wurzel(B + "² " + M + " 4 · " + A + " · " + C), "2 · " + A)]);
    rows.push([c("a", "a") + " = " + c("a", o.a) + "&emsp;" + c("b", "b") + " = " + c("b", o.b) + "&emsp;" + c("c", "c") + " = " + c("c", o.c)]);
    if(T.einsetzen) rows.push(['<span class="msf-h">' + T.einsetzen + "</span>"]);
    rows.push([v + "<sub>1,2</sub>", "=", bruch(M + mb + " ± " + wurzel(b + "² " + M + " 4 · " + a + " · " + cc), "2 · " + a)]);
    var nen = o.nen, zae = o.mbTxt; // −b als Zahl, 2a als Zahl
    rows.push(["", "=", bruch(zae + " ± " + wurzel(o.D), nen)]);
    if(o.Dn < 0){ rows.push([T.keine || "D < 0"]); return zeilen(rows); }
    rows.push(["", o.wExakt ? "=" : "≈", bruch(zae + " ± " + o.wD, nen)]);
    if(T.loes) rows.push(['<span class="msf-h">' + T.loes + "</span>"]);
    rows.push([v + "<sub>1</sub>", o.wExakt ? "=" : "≈", bruch(zae + " + " + o.wD, nen)]);
    rows.push(["", o.x1Exakt ? "=" : "≈", o.x1]);
    rows.push([v + "<sub>2</sub>", o.wExakt ? "=" : "≈", bruch(zae + " − " + o.wD, nen)]);
    rows.push(["", o.x2Exakt ? "=" : "≈", o.x2]);
    return zeilen(rows);
  }
  var css = document.createElement("style");
  css.textContent =
    ".msf-blk{display:grid;grid-template-columns:max-content max-content max-content 1fr;column-gap:.4em;row-gap:.35em;align-items:center;justify-content:start;direction:ltr;unicode-bidi:isolate;text-align:left;" +
      "font-family:'Cambria Math',Cambria,'Times New Roman',serif;font-size:1.08em;line-height:1.35;margin:.2em 0;overflow-x:auto;max-width:100%;font-variant-numeric:tabular-nums}" +
    ".msf-l{grid-column:1;text-align:right;white-space:nowrap}.msf-r{grid-column:2;text-align:center;white-space:nowrap}.msf-rr{grid-column:3;white-space:nowrap}" +
    ".msf-voll{grid-column:1 / -1;white-space:normal;text-align:start}.msf-h{font-family:system-ui,sans-serif;font-size:.82em;color:#4f5b6e}" +
    ".msf-br{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:middle;margin:0 .15em;line-height:1.3}" +
    ".msf-br>span{padding:0 .3em;white-space:nowrap;text-align:center}.msf-br>span+span{border-top:1.8px solid #1a2233}" +
    ".msf-f{font-weight:700}" +
    ".msf-w{display:inline-flex;align-items:stretch;white-space:nowrap;vertical-align:middle}.msf-wz{font-size:1.2em;line-height:1;margin-right:-.06em;align-self:center}" +
    ".msf-wi{border-top:1.6px solid currentColor;padding:2px .15em 0;margin-top:.12em;line-height:1.25}";
  document.head.appendChild(css);
  // ---------- global: jede „√“ im Seitentext bekommt einen Wurzelstrich über den ganzen Radikanden ----------
  // (auch für Texte, die Kacheln selbst setzen, und für künftige Kacheln). Nicht in SVG/Canvas, Eingabefeldern,
  // Skripten, schon umgewandelten Wurzeln oder Elementen mit class="msf-roh".
  var WZ_NIE = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, OPTION: 1, SELECT: 1, TITLE: 1, NOSCRIPT: 1 };
  function wzAusgenommen(n){
    for(var e = n.parentNode; e && e.nodeType === 1; e = e.parentNode){
      if(WZ_NIE[e.tagName] || e.namespaceURI === "http://www.w3.org/2000/svg" || e.isContentEditable) return true;
      if(e.classList && (e.classList.contains("msf-w") || e.classList.contains("msf-roh"))) return true;
    }
    return false;
  }
  function wurzelText(n){
    var t = n.nodeValue; if(!t || t.indexOf("√") < 0 || wzAusgenommen(n)) return;
    // offene Klammer nach √ ohne Gegenstück im selben Text: unverändert lassen (Radikand über mehrere Elemente)
    var i = -1; while((i = t.indexOf("√(", i + 1)) >= 0){ var tf = 0, j = i + 1; for(; j < t.length; j++){ if(t.charAt(j) === "(") tf++; else if(t.charAt(j) === ")"){ tf--; if(tf === 0) break; } } if(j >= t.length) return; }
    var tpl = document.createElement("template"); tpl.innerHTML = wurzelnHtml(esc(t));
    if(n.parentNode) n.parentNode.replaceChild(tpl.content, n);
  }
  function wurzelnIn(root){
    if(!root) return;
    if(root.nodeType === 3){ wurzelText(root); return; }
    if(root.nodeType !== 1 || WZ_NIE[root.tagName] || root.namespaceURI === "http://www.w3.org/2000/svg") return;
    if((root.textContent || "").indexOf("√") < 0) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), L = [], x;
    while((x = w.nextNode())) if(x.nodeValue.indexOf("√") >= 0) L.push(x);
    L.forEach(wurzelText);
  }
  var wzOffen = [], wzGeplant = false;
  function wzAbarbeiten(){ wzGeplant = false; var L = wzOffen; wzOffen = []; L.forEach(function(n){ if(n.isConnected) wurzelnIn(n); }); }
  function wzMerken(n){ wzOffen.push(n); if(!wzGeplant){ wzGeplant = true; if(window.requestAnimationFrame) window.requestAnimationFrame(wzAbarbeiten); else setTimeout(wzAbarbeiten, 16); } }
  function wzStart(){
    wzMerken(document.body);
    if(window.MutationObserver) new MutationObserver(function(rec){
      rec.forEach(function(r){ if(r.type === "characterData") wzMerken(r.target); else r.addedNodes.forEach(wzMerken); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if(document.body) wzStart(); else document.addEventListener("DOMContentLoaded", wzStart);

  // ---------- global: Brüche mit Schrägstrich („h / AT“, „π/2“, „(a + b) / 2“) als Bruch mit Bruchstrich ----------
  // Wunsch Markus 23.11.: in Gleichungen nirgends Schrägstriche als Bruchstrich. Ausgenommen: SVG, Eingabefelder,
  // Auswahllisten, code/kbd, .msf-roh / data-roh (z. B. Eingabe-Hilfen, die zeigen, was man tippen soll),
  // Einheiten ohne Leerzeichen (km/h, m/s², €/kg), Datumsangaben und Adressen.
  var BR_NIE = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, OPTION: 1, SELECT: 1, TITLE: 1, NOSCRIPT: 1, CODE: 1, KBD: 1, PRE: 1 };
  var EINH = /^(?:m|s|h|km|kg|g|mg|t|l|ml|cl|cm|mm|dm|min|€|ct|kWh|Wh|W|V|A|N|Pa|Hz|°C|Std|Stück|Tag|d|a|ha|L|mi|ft|in|lb|oz|gal)[²³]?$/;
  var FN = "(?:sin|cos|tan|log|ln|lg)(?:\\s?(?:[0-9]+(?:[.,][0-9]+)?°?|[A-Za-zα-ωΑ-Ω][′]*)|\\([^()]*\\))";
  var OPD = "(?:" + FN + "|[A-Za-z]{1,2}′*\\((?:[^()]|\\([^()]*\\))*\\)|\\((?:[^()]|\\([^()]*\\))*\\)|[−-]?[0-9]*(?:[.,][0-9]+)?(?:[a-zα-ωπ][²³⁴-⁹ⁿ]*){1,4}(?![a-zA-Z])|[−-]?[0-9]+(?:[.,][0-9]+)?(?:[a-zA-Zπα-ω]{1,2}(?![a-zA-Z]))?|[a-zA-Zα-ωΑ-Ωπ][a-zA-Z₀-₉ₙₖα-ω]{0,2}′*)[²³⁰¹⁴-⁹ⁿ]*";
  var BR_RE = new RegExp("(^|[\\s(=≈<>+−·:,;⇒→\\[{|])(" + OPD + ")(\\s?)\\/(\\s?)(" + OPD + ")(?=$|[\\s)=≈<>+−·:,;.!?⇒→\\]}|%])", "g");
  var BR_VOR_FN = /(?:^|[^a-zA-Z])(?:sin|cos|tan|log|ln|lg)\s?$/;
  function brAusgenommen(n){
    for(var e = n.parentNode; e && e.nodeType === 1; e = e.parentNode){
      if(BR_NIE[e.tagName] || e.namespaceURI === "http://www.w3.org/2000/svg" || e.isContentEditable) return true;
      if(e.classList && (e.classList.contains("msf-br") || e.classList.contains("msf-roh"))) return true;
      if(e.hasAttribute && (e.hasAttribute("data-roh") || e.hasAttribute("data-nobr"))) return true;
    }
    return false;
  }
  function ohneKlammer(x){
    if(x.charAt(0) !== "(" || x.charAt(x.length - 1) !== ")") return x;
    var t = 0; for(var i = 0; i < x.length - 1; i++){ if(x.charAt(i) === "(") t++; else if(x.charAt(i) === ")"){ t--; if(t === 0) return x; } }
    return x.slice(1, -1);
  }
  // Eingabe-Hinweise („Brüche wie 3/2 eingeben“) zeigen, was man tippen soll → Schrägstrich bleibt
  var BR_EINGABE = /eingeb|eintipp|tippe|schreib|Eingabe|Beispiel:|gehen auch|\btype\b|\benter\b|input|example:|also work|escrib|introduc|ejemplo:|\btape|saisi|écri|exemple\s?:|escrev|digit|exemplo:|ввод|введи|пиши|например|اكتب|أدخل|مثال|输入|例如|入力|例：/i;
  function bruecheText(t){
    if(t.indexOf("/") < 0 || /:\/\/|www\.|\.(?:com|de|html|js|png|webp)\b|[0-9]+\/[0-9]+\/[0-9]+/.test(t) || BR_EINGABE.test(t)) return null;
    if(/^\s*\d+\s+\/\s+\d+\s*$/.test(t)) return null; // „3 / 5“ allein = Punktestand
    if(/:\s*\d+\s+\/\s+\d+(?:\s|$|·)/.test(t)) return null; // „Punkte: 3 / 5“
    var neu = false;
    var r = t.replace(BR_RE, function(m, vor, z, s1, s2, n, pos){
      var eng = !s1 && !s2;
      if(eng && EINH.test(n) && (EINH.test(z) || /^[−-]?\d/.test(z))) return m;       // Einheiten: km/h, m/s, €/kg, 1/min
      if(/^[a-zäöüß]+$/i.test(z) && /^[a-zäöüß]+$/i.test(n) && (/^[a-zäöüß]{2,}$/.test(z) || /^[a-zäöüß]{2,}$/.test(n)) && !/[A-Z]/.test(z + n)) return m; // „er/sie“: Wörter, keine Variablen
      if(!s1 !== !s2) return m;                                                       // „a /b“ – lieber lassen
      if(BR_VOR_FN.test(t.slice(0, pos + vor.length))) return m;                     // „sin α / …“ ohne Funktion im Zähler
      neu = true;
      return vor + "\u0001" + z + "\u0002" + n + "\u0003";
    });
    if(!neu) return null;
    // escapen und Platzhalter durch Brüche ersetzen
    return esc(r).replace(/\u0001([^\u0002]*)\u0002([^\u0003]*)\u0003/g, function(m, z, n){ return bruch(ohneKlammer(z), ohneKlammer(n)); });
  }
  function istZaehler(n){ // „40/40“ in einem Punkte-/Badge-Element
    if(!/^\s*\d+\/\d+\s*$/.test(n.nodeValue)) return false;
    for(var e = n.parentNode, k = 0; e && e.nodeType === 1 && k < 3; e = e.parentNode, k++) if(/badge|punkt|score|stand|zaehl|count|pts/i.test((e.id || "") + " " + (typeof e.className === "string" ? e.className : ""))) return true;
    return false;
  }
  // SVG: Text, der nur aus einem Zahlenbruch besteht („1/4“ an einem Ast), bekommt Zähler, Strich und Nenner
  function svgBruch(te){
    if(te.getAttribute("data-msbr") || te.closest("[data-roh],[data-nobr]") || te.children.length) return;
    var txt = te.textContent || "";
    var m = txt.match(/^([\s\S]*?)(−?(?:\d+(?:[.,]\d+)?π?|π))\s?\/\s?(\d+(?:[.,]\d+)?)((?:\s[\s\S]*)?)$/); if(!m) return;
    if(m[1] && !/[\s=≈(·]$/.test(m[1])) return;             // nur „… = 1/4“ oder „(1, 2) 1/16“, nicht „km/h“
    var nach = m[4] || "";
    var bb; try { bb = te.getBBox(); } catch(x){ return; } if(!bb || !bb.width) return;
    var NS = "http://www.w3.org/2000/svg", fs = parseFloat(getComputedStyle(te).fontSize) || 14, cy = bb.y + bb.height / 2;
    var vorW = 0, brX = bb.x, brW = bb.width;
    var k = fs * 0.86, w = Math.max(m[2].length, m[3].length) * k * 0.6 + 2;
    try { if(m[1]){ vorW = te.getSubStringLength(0, m[1].length); brX = bb.x + vorW; } } catch(x){ return; }
    var y0 = te.getAttribute("y");
    var cx = brX + (nach ? w / 2 + 2 : Math.max(bb.width - vorW, 1) / 2);
    te.setAttribute("data-msbr", "1"); te.textContent = "";
    te.removeAttribute("dx"); te.removeAttribute("dy");
    te.setAttribute("text-anchor", "start"); te.style.textAnchor = "start";
    if(m[1]){ var v = document.createElementNS(NS, "tspan"); v.setAttribute("x", bb.x); if(y0 != null) v.setAttribute("y", y0); v.textContent = m[1]; te.appendChild(v); }
    var a = document.createElementNS(NS, "tspan"); a.setAttribute("x", cx); a.setAttribute("y", cy - fs * 0.16); a.setAttribute("text-anchor", "middle"); a.style.fontSize = k + "px"; a.textContent = m[2];
    var b = document.createElementNS(NS, "tspan"); b.setAttribute("x", cx); b.setAttribute("y", cy + fs * 0.74); b.setAttribute("text-anchor", "middle"); b.style.fontSize = k + "px"; b.textContent = m[3];
    te.appendChild(a); te.appendChild(b);
    if(nach){ var na = document.createElementNS(NS, "tspan"); na.setAttribute("x", cx + w / 2 + 2); if(y0 != null) na.setAttribute("y", y0); na.setAttribute("text-anchor", "start"); na.textContent = nach; te.appendChild(na); }
    var li = document.createElementNS(NS, "line");
    li.setAttribute("x1", cx - w / 2); li.setAttribute("x2", cx + w / 2); li.setAttribute("y1", cy + fs * 0.06); li.setAttribute("y2", cy + fs * 0.06);
    li.setAttribute("stroke", getComputedStyle(te).fill || "#1a2233"); li.setAttribute("stroke-width", Math.max(1, fs * 0.08)); li.setAttribute("data-msbr", "1");
    if(te.parentNode) te.parentNode.insertBefore(li, te.nextSibling);
  }
  function svgBrueche(root){
    var L = root.nodeType === 1 && root.tagName && root.tagName.toLowerCase() === "text" ? [root] : (root.querySelectorAll ? root.querySelectorAll("svg text") : []);
    for(var i = 0; i < L.length; i++) if((L[i].textContent || "").indexOf("/") >= 0) svgBruch(L[i]);
  }
  function bruchText(n){
    var t = n.nodeValue; if(!t || t.indexOf("/") < 0 || brAusgenommen(n) || istZaehler(n)) return;
    var h = bruecheText(t); if(h == null) return;
    if(window.MS_BR_DEBUG) (window.MS_BR_LOG = window.MS_BR_LOG || []).push(t);
    var tpl = document.createElement("template"); tpl.innerHTML = h;
    if(n.parentNode) n.parentNode.replaceChild(tpl.content, n);
  }
  function bruecheIn(root){
    if(!root) return;
    if(root.nodeType === 3){ bruchText(root); return; }
    if(root.nodeType !== 1 || BR_NIE[root.tagName]) return;
    if((root.textContent || "").indexOf("/") < 0) return;
    try { svgBrueche(root); } catch(x){}
    if(root.namespaceURI === "http://www.w3.org/2000/svg") return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), L = [], x;
    while((x = w.nextNode())) if(x.nodeValue.indexOf("/") >= 0) L.push(x);
    L.forEach(bruchText);
  }
  // etwas später als /fliesstext-formeln.js und die Zeilen-Aufbereitung, damit die zuerst ihre Textabsätze bekommen
  var brOffen = [], brT = null;
  function brAbarbeiten(){ brT = null; var L = brOffen; brOffen = []; L.forEach(function(n){ if(n.isConnected) bruecheIn(n); }); }
  function brMerken(n){ brOffen.push(n); if(!brT) brT = setTimeout(brAbarbeiten, 60); }
  function brStart(){
    brMerken(document.body);
    if(window.MutationObserver) new MutationObserver(function(rec){
      rec.forEach(function(r){ if(r.type === "characterData") brMerken(r.target.parentNode && r.target.parentNode.namespaceURI === "http://www.w3.org/2000/svg" ? r.target.parentNode : r.target); else r.addedNodes.forEach(brMerken); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if(document.body) brStart(); else document.addEventListener("DOMContentLoaded", brStart);
  window.MS_BR_TEST = bruecheText;
  return { bruch: bruch, wurzel: wurzel, c: c, zeilen: zeilen, kette: kette, mnf: mnf, esc: esc, FARBE: FARBE };
})();
