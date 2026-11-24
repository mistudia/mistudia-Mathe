// ============================================================
// fortschritt/app.js – Seite „Mein Fortschritt“
// Zahlen aus /fortschritt.js (MS_FS.summe): Kennzahlen, Balken der letzten 14 Tage,
// Bestwerte (Einmaleins-Diplome, längste Serie), Tabelle aller Übungen,
// Abgleich mit dem VocabBoss-Konto, Zurücksetzen. Kachelnamen aus APPS in /index.html.
// Texte: texte.js (FX, 9 Sprachen).
// ============================================================
(function(){
  "use strict";
  var lang = "de", APPS = [];
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (FX[lang] && FX[lang][k]) || FX.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(n, a, txt){ var e = document.createElementNS(SVGNS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function app(s){ for(var i = 0; i < APPS.length; i++) if(APPS[i].slug === s) return APPS[i]; return null; }
  function name(s){ var a = app(s); return a ? (a.name[lang] || a.name.de) : s; }
  function datum(tag){
    if(!tag) return "";
    var d = new Date(tag + "T12:00:00"), h = MS_FS._heute(), g = new Date(); g.setDate(g.getDate() - 1);
    if(tag === h) return t("heute"); if(tag === MS_FS._heute(g)) return t("gestern");
    try { return d.toLocaleDateString(lang, { day: "numeric", month: "short" }); } catch(e){ return tag; }
  }
  function mmss(s){ s = Math.round(s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function kennzahlen(S){
    var n = S.r + S.f, q = n ? Math.round(100 * S.r / n) : 0;
    var K = [[S.r, t("k_richtig"), "#15803d"], [n ? q + " %" : "–", t("k_quote"), "#1565c0"], [S.folge, t("k_folge"), "#ea580c"], [S.langeFolge, t("k_lang"), "#7c3aed"], [S.gb, t("k_serie"), "#db2777"]];
    return '<div class="kz5">' + K.map(function(k){ return '<div class="kzK" style="--kc:' + k[2] + '"><b>' + esc(k[0]) + "</b><span>" + esc(k[1]) + "</span></div>"; }).join("") + "</div>";
  }
  function balken(S){
    var W = 640, H = 230, L = 34, B = 44, T0 = 18, tage = [], max = 1;
    for(var i = 13; i >= 0; i--){ var d = new Date(); d.setDate(d.getDate() - i); var k = MS_FS._heute(d), v = S.tage[k] || { r: 0, f: 0 }; tage.push([d, v]); max = Math.max(max, v.r + v.f); }
    var schritt = max <= 5 ? 1 : max <= 10 ? 2 : max <= 25 ? 5 : max <= 50 ? 10 : max <= 100 ? 20 : Math.ceil(max / 5 / 50) * 50, oben = Math.ceil(max / schritt) * schritt;
    var s = el("svg", { viewBox: "0 0 " + W + " " + H, "class": "bild", role: "img", dir: "ltr" }), bw = (W - L - 10) / 14, hh = H - B - T0;
    for(var y = 0; y <= oben; y += schritt){ var yy = T0 + hh - hh * y / oben; s.appendChild(el("line", { x1: L, y1: yy, x2: W - 6, y2: yy, stroke: "#e2e8f0", "stroke-width": 1 })); s.appendChild(el("text", { x: L - 6, y: yy + 4, "text-anchor": "end", "class": "ax" }, String(y))); }
    tage.forEach(function(p, i){
      var x = L + i * bw + bw * 0.15, w = bw * 0.7, r = p[1].r, f = p[1].f, hr = hh * r / oben, hf = hh * f / oben, y0 = T0 + hh;
      if(r) s.appendChild(el("rect", { x: x, y: y0 - hr, width: w, height: hr, rx: 3, fill: "#22c55e" }));
      if(f) s.appendChild(el("rect", { x: x, y: y0 - hr - hf, width: w, height: hf, rx: 3, fill: "#f87171" }));
      if(r + f) s.appendChild(el("text", { x: x + w / 2, y: y0 - hr - hf - 4, "text-anchor": "middle", "class": "zahl" }, String(r + f)));
      var wt = ""; try { wt = p[0].toLocaleDateString(lang, { weekday: "short" }); } catch(e){}
      s.appendChild(el("text", { x: x + w / 2, y: H - B + 16, "text-anchor": "middle", "class": "ax" + (i === 13 ? " heute" : "") }, wt));
      s.appendChild(el("text", { x: x + w / 2, y: H - B + 32, "text-anchor": "middle", "class": "ax" + (i === 13 ? " heute" : "") }, String(p[0].getDate())));
    });
    return s;
  }
  function bestwerte(S){
    var M = [["ee", ["mal", "geteilt", "plus", "minus"]], ["ge", ["mal", "geteilt", "profi"]]], h = "";
    M.forEach(function(m){
      h += '<div class="bw"><b>' + esc(t(m[0])) + '</b><div class="bwL">' + m[1].map(function(mo){ var z = S.zt[m[0] + "-" + mo]; return '<span class="bwC' + (z ? " da" : "") + '"><span>' + esc(t("m_" + mo)) + "</span><b dir=\"ltr\">" + (z ? mmss(z) : "–") + "</b></span>"; }).join("") + "</div></div>";
    });
    var bs = 0, bk = ""; Object.keys(S.kacheln).forEach(function(s){ if(S.kacheln[s].b > bs){ bs = S.kacheln[s].b; bk = s; } });
    if(bs) h += '<p class="zeile">' + esc(t("serie_k", { n: bs, k: name(bk) })) + "</p>";
    return h;
  }
  function tabelle(S){
    var L = Object.keys(S.kacheln).filter(function(s){ var k = S.kacheln[s]; return k.r + k.f > 0; });
    if(!L.length) return '<p class="zeile muted">' + esc(t("leer")) + "</p>";
    L.sort(function(a, b){ var x = S.kacheln[a], y = S.kacheln[b]; return (y.l || "").localeCompare(x.l || "") || (y.r + y.f) - (x.r + x.f); });
    return '<div class="tabwrap"><table class="ft"><thead><tr><th>' + esc(t("th_kachel")) + '</th><th class="z">✓</th><th class="z">✗</th><th>' + esc(t("th_q")) + '</th><th class="z">' + esc(t("th_b")) + "</th><th>" + esc(t("th_l")) + "</th></tr></thead><tbody>" +
      L.map(function(s){
        var k = S.kacheln[s], n = k.r + k.f, q = Math.round(100 * k.r / n), a = app(s), farbe = q >= 80 ? "#16a34a" : q >= 50 ? "#f59e0b" : "#ef4444";
        return "<tr><td>" + (a ? '<span class="fb" style="background:' + a.color + '"></span>' : "") + '<a href="/' + s + '/">' + esc(name(s)) + '</a></td><td class="z r">' + k.r + '</td><td class="z f">' + k.f + '</td><td><span class="qb"><span style="width:' + q + "%;background:" + farbe + '"></span></span> ' + q + ' %</td><td class="z">' + k.b + "</td><td>" + esc(datum(k.l)) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }
  var syncText = "";
  function syncBox(){
    var an = MS_FS.gekoppelt(), D = MS_FS.daten();
    var h = '<p class="zeile">' + esc(t(an ? "sync_an" : "sync_aus")) + "</p>";
    if(an){
      var z = D.sync ? new Date(D.sync) : null;
      h += '<p class="zeile muted" id="syncS">' + esc(syncText || (z ? t("sync_ok", { z: z.toLocaleString(lang, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) }) : "")) + '</p><p><button type="button" class="knopf hell" id="syncB">' + esc(t("sync_jetzt")) + "</button></p>";
    } else h += '<p><a class="knopf hell" href="/#konto">' + esc(t("zur")) + "</a></p>";
    h += '<p class="resetP"><button type="button" class="knopf rot" id="resetB">' + esc(t("reset")) + "</button></p>";
    $("syncBox").innerHTML = h;
    var b = $("syncB");
    if(b) b.addEventListener("click", function(){ syncText = t("sync_laeuft"); syncBox(); MS_FS.abgleich(function(st){ syncText = st === "ok" ? "" : st === "sql" ? t("sync_sql") : st === "laeuft" ? t("sync_laeuft") : st === "aus" ? "" : t("sync_fehler"); alles(); }); });
    $("resetB").addEventListener("click", function(){ if(confirm(t("reset_frage"))){ MS_FS.zuruecksetzen(); alles(); } });
  }
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel"); $("intro").textContent = t("intro");
    var S = MS_FS.summe();
    $("kzBox").innerHTML = kennzahlen(S);
    $("tageH").textContent = t("tage14");
    $("leg").innerHTML = '<span class="lg r"></span> ' + esc(t("leg_r")) + ' <span class="lg f"></span> ' + esc(t("leg_f"));
    var b = $("tageBild"); b.innerHTML = ""; b.appendChild(balken(S));
    $("bestH").textContent = t("best_h"); $("bestBox").innerHTML = bestwerte(S);
    $("kachH").textContent = t("kach_h"); $("kachBox").innerHTML = tabelle(S);
    $("syncH").textContent = t("sync_h"); syncBox();
  }
  document.addEventListener("ms-fortschritt", function(){ alles(); });
  window.MS_LANG = { apply: function(l){ if(FX[l]){ lang = l; alles(); } } };
  // Kachelnamen und Farben aus der Startseite holen
  fetch("/index.html").then(function(r){ return r.text(); }).then(function(h){
    var a = h.indexOf("var APPS = ["), e = h.indexOf("\n];", a);
    if(a >= 0 && e > a) try { APPS = (new Function("return " + h.slice(a + "var APPS = ".length, e + 2)))(); } catch(x){}
    alles();
  }).catch(function(){ alles(); });
  alles();
})();
