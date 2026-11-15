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
  return { bruch: bruch, wurzel: wurzel, c: c, zeilen: zeilen, kette: kette, mnf: mnf, esc: esc, FARBE: FARBE };
})();
