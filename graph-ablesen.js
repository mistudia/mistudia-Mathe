// ============================================================
// /graph-ablesen.js – Werte am Graphen ablesen + Wertetabelle (9 Sprachen)
// Für Kacheln mit eigenem Graphen-Code (Exponential, Logarithmus, Integral,
// Differential, Sinus). Nach JEDEM Zeichnen eines Erkunden-Graphen aufrufen:
//   MS_ABL.an(svg, { x0, x1, y0, y1,            // sichtbarer Bereich (Welt)
//                    L, R, T, B,                // Zeichenfläche im viewBox
//                    kurven: [{ f, farbe | el, name }],  // name z. B. "f(x)"
//                    xName: "x", tabelle: true })
//   • Maus darüber → Ablesepunkt (x | y) mit Hilfslinien zu den Achsen
//   • Tippen/Klicken → Punkt bleibt stehen (erneut tippen entfernt ihn)
//   • aufklappbare Wertetabelle: eigene x-Werte, Punkte im Graph, ⌖ markiert
// NICHT für Übungsgraphen verwenden (dort wäre das Ablesen eine Lösungshilfe).
// ============================================================
var MS_ABL = (function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TX = {
    de: { titel: "Wertetabelle", hinweis: "Eigene x-Werte eingeben – die Funktionswerte werden sofort berechnet. Werte ablesen: mit der Maus über den Graphen fahren oder auf den Graphen tippen.", neu: "+ Zeile", auto: "Werte aus dem Bild", punkte: "Punkte im Graph zeigen", ziel: "Punkt im Graph markieren", weg: "Zeile löschen", x: "x-Wert eingeben" },
    en: { titel: "Table of values", hinweis: "Type your own x-values – the function values are calculated at once. Read off values: hover with the mouse or tap the graph.", neu: "+ Row", auto: "Values from the picture", punkte: "Show points in the graph", ziel: "Mark point in the graph", weg: "Delete row", x: "Enter x-value" },
    es: { titel: "Tabla de valores", hinweis: "Escribe tus propios valores de x: los valores de la función se calculan al instante. Leer valores: pasa el ratón o toca la gráfica.", neu: "+ Fila", auto: "Valores de la imagen", punkte: "Mostrar puntos en la gráfica", ziel: "Marcar el punto en la gráfica", weg: "Borrar fila", x: "Escribe un valor de x" },
    zh: { titel: "数值表", hinweis: "输入你自己的 x 值，函数值会立即算出。读取数值：用鼠标悬停或点按图像。", neu: "+ 行", auto: "取图中的值", punkte: "在图像中显示点", ziel: "在图像中标出该点", weg: "删除此行", x: "输入 x 值" },
    fr: { titel: "Tableau de valeurs", hinweis: "Saisis tes propres valeurs de x : les valeurs de la fonction sont calculées aussitôt. Lire des valeurs : survole avec la souris ou touche la courbe.", neu: "+ Ligne", auto: "Valeurs de l’image", punkte: "Afficher les points sur la courbe", ziel: "Marquer le point sur la courbe", weg: "Supprimer la ligne", x: "Saisir une valeur de x" },
    ru: { titel: "Таблица значений", hinweis: "Вводи свои значения x — значения функции считаются сразу. Чтобы прочитать значения, наведи мышь или коснись графика.", neu: "+ Строка", auto: "Значения с рисунка", punkte: "Показать точки на графике", ziel: "Отметить точку на графике", weg: "Удалить строку", x: "Введи значение x" },
    ar: { titel: "جدول القيم", hinweis: "اكتب قيم x الخاصة بك – تُحسب قيم الدالة فورًا. لقراءة القيم: مرّر الفأرة أو المس المنحنى.", neu: "+ صف", auto: "قيم من الرسم", punkte: "إظهار النقاط على المنحنى", ziel: "تحديد النقطة على المنحنى", weg: "حذف الصف", x: "أدخل قيمة x" },
    ja: { titel: "値の表", hinweis: "自分で x の値を入力すると、関数の値がすぐに計算されます。値を読むには、マウスを重ねるかグラフをタップします。", neu: "+ 行", auto: "図から値を入れる", punkte: "グラフに点を表示", ziel: "グラフに点を示す", weg: "行を削除", x: "x の値を入力" },
    pt: { titel: "Tabela de valores", hinweis: "Digite seus próprios valores de x – os valores da função são calculados na hora. Ler valores: passe o mouse ou toque no gráfico.", neu: "+ Linha", auto: "Valores da imagem", punkte: "Mostrar pontos no gráfico", ziel: "Marcar o ponto no gráfico", weg: "Excluir linha", x: "Digite um valor de x" }
  };
  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || document.documentElement.lang || "de"; } catch(e){}
  if(!TX[lang]) lang = "de";
  var alle = [];
  function tx(k){ return (TX[lang] || TX.de)[k]; }
  function E(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }
  function zahl(v, d){
    if(!isFinite(v)) return "—";
    var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0) || Math.abs(r) < 1e-12) r = 0;
    var s = Math.abs(r).toFixed(d); if(s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if(komma()) s = s.replace(".", ",");
    return (r < 0 ? "−" : "") + s;
  }
  function yDez(y){ var a = Math.abs(y); return a < 100 ? 2 : a < 10000 ? 1 : 0; }
  function klemm(v, a, b){ return Math.min(Math.max(v, a), b); }
  function xLesen(s){
    s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, "").replace(",", ".");
    if(!s) return NaN;
    var m = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if(m) return +m[2] ? +m[1] / +m[2] : NaN;
    return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? +s : NaN;
  }
  function schoen(spanne, ziel){ var roh = spanne / ziel, p = Math.pow(10, Math.floor(Math.log10(roh))), f = roh / p; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p; }

  // ---------- Zustand je Graph ----------
  function zustand(svg){
    if(svg._abl) return svg._abl;
    var Z = svg._abl = { svg: svg, o: null, pin: null, hover: null, down: null, xs: [], det: null, g: null };
    svg.addEventListener("pointerdown", function(e){ Z.down = (e.defaultPrevented || !e.isPrimary) ? null : { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    svg.addEventListener("pointermove", function(e){
      if(Z.down && Math.hypot(e.clientX - Z.down.x, e.clientY - Z.down.y) > 6) Z.down = null;
      if(e.pointerType === "mouse" && !e.buttons){ Z.hover = punkt(Z, e); zeichneAbl(Z); }
      else if(Z.hover){ Z.hover = null; zeichneAbl(Z); }
    });
    svg.addEventListener("pointerleave", function(e){ if(Z.hover){ Z.hover = null; zeichneAbl(Z); } });
    svg.addEventListener("pointerup", function(e){
      var d = Z.down; Z.down = null;
      if(!d || d.id !== e.pointerId || e.defaultPrevented || !Z.o) return;
      tippen(Z, punkt(Z, e));
    });
    svg.addEventListener("pointercancel", function(){ Z.down = null; });
    alle.push(Z);
    return Z;
  }
  function punkt(Z, e){ // Bildschirm → viewBox-Koordinaten
    var m = Z.svg.getScreenCTM(); if(!m) return null;
    var p = Z.svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; p = p.matrixTransform(m.inverse());
    return { px: p.x, py: p.y };
  }
  function X(o, x){ return o.L + (x - o.x0) / (o.x1 - o.x0) * (o.R - o.L); }
  function Y(o, y){ return o.B - (y - o.y0) / (o.y1 - o.y0) * (o.B - o.T); }
  function weltX(o, px){ return o.x0 + (px - o.L) / (o.R - o.L) * (o.x1 - o.x0); }
  function schritt(o){ var roh = (o.x1 - o.x0) / (o.R - o.L) * 10, s = Math.pow(10, Math.floor(Math.log10(roh))); return { s: s, d: Math.max(0, -Math.round(Math.log10(s))) }; }
  function naechste(o, x, py){
    var best = 0, bd = Infinity;
    o.kurven.forEach(function(k, i){ var y = k.f(x), d = isFinite(y) ? Math.abs(Y(o, y) - py) : 1e9; if(d < bd){ bd = d; best = i; } });
    return best;
  }
  function stelle(o, p){
    if(!p || p.px < o.L - 4 || p.px > o.R + 4) return null;
    var st = schritt(o), x = Math.round(weltX(o, klemm(p.px, o.L, o.R)) / st.s) * st.s;
    x = Number(x.toFixed(st.d));
    return { x: x, d: st.d, k: naechste(o, x, p.py) };
  }
  function tippen(Z, p){
    var o = Z.o; if(!o || !p || !o.kurven.length) return;
    if(Z.pin){
      var k = o.kurven[Math.min(Z.pin.k, o.kurven.length - 1)], y = k.f(Z.pin.x);
      if(Math.abs(X(o, Z.pin.x) - p.px) < 16 && (!isFinite(y) || Math.abs(klemm(Y(o, y), o.T, o.B) - p.py) < 16)){ Z.pin = null; zeichneAbl(Z); return; }
    }
    var s = stelle(o, p); if(!s) return;
    Z.pin = s; Z.hover = null; zeichneAbl(Z);
  }

  // ---------- Ablesepunkt zeichnen ----------
  function zeichneAbl(Z){
    if(Z.g && Z.g.parentNode) Z.g.parentNode.removeChild(Z.g);
    Z.g = null; var o = Z.o; if(!o || !o.kurven.length) return;
    var g = E("g", { "pointer-events": "none", "class": "msabl" });
    var achseY = klemm(Y(o, 0), o.T, o.B), achseX = klemm(X(o, 0), o.L, o.R);
    // wird die Grafik verkleinert angezeigt (Handy), Kästchen und Schrift mitwachsen lassen
    var vb = Z.svg.viewBox && Z.svg.viewBox.baseVal, bw = Z.svg.getBoundingClientRect().width;
    var m = vb && vb.width && bw ? klemm(vb.width / bw, 1, 2.2) : 1;
    function ziel(s, stark){
      var k = o.kurven[Math.min(s.k, o.kurven.length - 1)], x = s.x, y = k.f(x), px = X(o, x), farbe = k.farbe || "#1a2233";
      var xs = zahl(x, s.d), txt, pyc;
      var lin = { stroke: farbe, "stroke-width": (stark ? 2 : 1.5) * m, "stroke-dasharray": "5 4", opacity: stark ? 1 : 0.75, fill: "none" };
      if(!isFinite(y)){
        g.appendChild(E("line", Object.assign({ x1: px, y1: o.T, x2: px, y2: o.B }, lin)));
        txt = "(" + xs + " | —)"; pyc = o.T + 30;
      } else {
        var py = Y(o, y); pyc = klemm(py, o.T, o.B);
        g.appendChild(E("line", Object.assign({ x1: px, y1: pyc, x2: px, y2: achseY }, lin)));
        if(py >= o.T && py <= o.B){
          g.appendChild(E("line", Object.assign({ x1: px, y1: py, x2: achseX, y2: py }, lin)));
          g.appendChild(E("circle", { cx: px, cy: py, r: (stark ? 7 : 6) * m, fill: stark ? farbe : "#ffffff", stroke: stark ? "#ffffff" : farbe, "stroke-width": (stark ? 2.5 : 3) * m }));
        }
        txt = (py < o.T ? "↑ " : py > o.B ? "↓ " : "") + "(" + xs + " | " + zahl(y, yDez(y)) + ")";
      }
      var w = (txt.length * 7.8 + 16) * m, h = 24 * m, lx = px + 12 * m, ly = pyc - 36 * m;
      if(lx + w > o.R) lx = px - 12 * m - w;
      if(lx < 2) lx = 2;
      if(ly < o.T) ly = pyc + 12 * m;
      if(ly + h > o.B) ly = o.B - h;
      g.appendChild(E("rect", { x: lx, y: ly, width: w, height: h, rx: 7 * m, fill: "#ffffff", stroke: farbe, "stroke-width": 2 * m }));
      g.appendChild(E("text", { x: lx + w / 2, y: ly + 16.5 * m, "text-anchor": "middle", fill: "#1a2233", "font-size": 14 * m, "font-weight": 700, "font-family": "system-ui, sans-serif", direction: "ltr", "unicode-bidi": "embed", style: "font-style:normal" }, txt));
    }
    if(Z.hover){ var s = stelle(o, Z.hover); if(s) ziel(s, false); }
    if(Z.pin) ziel(Z.pin, true);
    Z.svg.appendChild(g); Z.g = g;
  }

  // ---------- Wertetabelle ----------
  var ZIEL_SVG = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 1v5M10 14v5M1 10h5M14 10h5" stroke="currentColor" stroke-width="2"/></svg>';
  function tabelleBauen(Z){
    var svg = Z.svg, det = document.createElement("details");
    det.className = "msabl-wt";
    det.innerHTML = '<summary></summary><p class="msabl-h"></p><div class="msabl-scroll" dir="ltr"><table><thead><tr></tr></thead><tbody></tbody></table></div>' +
      '<div class="msabl-knoepfe"><button type="button" class="msabl-neu"></button><button type="button" class="msabl-auto"></button><label><input type="checkbox" class="msabl-zeig" checked> <span></span></label></div>';
    var par = svg.parentNode, ref = svg;
    if(par.classList.contains("graph-wrap")){ ref = par; par = par.parentNode; }
    else if(par.classList.contains("zwei") && svg.nextElementSibling){ par = svg.nextElementSibling; ref = null; }
    else { var n = svg.nextElementSibling; if(n && (/Leg$/.test(n.id) || n.classList.contains("legende"))) ref = n; }
    if(ref) ref.parentNode.insertBefore(det, ref.nextSibling); else par.appendChild(det);
    Z.det = det; Z.body = det.querySelector("tbody");
    texte(Z);
    det.addEventListener("toggle", function(){ if(det.open && !Z.xs.length) auto(Z); else neu(Z); });
    det.querySelector(".msabl-auto").addEventListener("click", function(){ auto(Z); });
    det.querySelector(".msabl-neu").addEventListener("click", function(){
      var n = Z.xs.filter(isFinite), st = n.length >= 2 ? n[n.length - 1] - n[n.length - 2] : 1;
      Z.xs.push(n.length ? Number((n[n.length - 1] + (st || 1)).toFixed(8)) : 0);
      zeilen(Z); neu(Z);
      var inp = Z.body.querySelectorAll("input"); if(inp.length){ inp[inp.length - 1].focus(); inp[inp.length - 1].select(); }
    });
    det.querySelector(".msabl-zeig").addEventListener("change", function(){ neu(Z); });
    Z.body.addEventListener("input", function(e){
      var i = +e.target.dataset.i; if(isNaN(i)) return;
      Z.xs[i] = xLesen(e.target.value); e.target.classList.toggle("msabl-falsch", !isFinite(Z.xs[i]) && e.target.value.trim() !== "");
      neu(Z);
    });
    Z.body.addEventListener("click", function(e){
      var b = e.target.closest("button"); if(!b) return; var i = +b.dataset.i;
      if(b.classList.contains("msabl-weg")){ Z.xs.splice(i, 1); zeilen(Z); neu(Z); return; }
      if(b.classList.contains("msabl-ziel") && isFinite(Z.xs[i])){ Z.pin = { x: Z.xs[i], d: 6, k: 0 }; zeichneAbl(Z); }
    });
  }
  function auto(Z){
    var o = Z.o, st = schoen(o.x1 - o.x0, 6), xs = [];
    for(var x = Math.ceil(o.x0 / st) * st; x <= o.x1 + 1e-9 && xs.length < 12; x += st) xs.push(Number(x.toFixed(10)));
    Z.xs = xs; zeilen(Z); neu(Z);
  }
  function zeilen(Z){
    var h = "";
    Z.xs.forEach(function(x, i){
      h += '<tr><td><input type="text" inputmode="decimal" autocomplete="off" data-i="' + i + '" value="' + (isFinite(x) ? zahl(x, 6) : "") + '"></td>';
      Z.o.kurven.forEach(function(){ h += '<td class="msabl-y"></td>'; });
      h += '<td class="msabl-akt"><button type="button" class="msabl-ziel" data-i="' + i + '">' + ZIEL_SVG + '</button><button type="button" class="msabl-weg" data-i="' + i + '">×</button></td></tr>';
    });
    Z.body.innerHTML = h; Z.spalten = Z.o.kurven.length; texte(Z);
  }
  function texte(Z){
    if(!Z.det) return;
    Z.det.querySelector("summary").textContent = tx("titel");
    Z.det.querySelector(".msabl-h").textContent = tx("hinweis");
    Z.det.querySelector(".msabl-neu").textContent = tx("neu");
    Z.det.querySelector(".msabl-auto").textContent = tx("auto");
    Z.det.querySelector(".msabl-zeig + span").textContent = tx("punkte");
    Z.body.querySelectorAll(".msabl-ziel").forEach(function(b){ b.title = tx("ziel"); b.setAttribute("aria-label", tx("ziel")); });
    Z.body.querySelectorAll(".msabl-weg").forEach(function(b){ b.title = tx("weg"); b.setAttribute("aria-label", tx("weg")); });
    Z.body.querySelectorAll("input").forEach(function(e){ e.setAttribute("aria-label", tx("x")); e.placeholder = Z.o.xName || "x"; });
  }
  // Tabellenwerte und Punkte neu (ohne den Graphen der Kachel neu zu zeichnen)
  function neu(Z){
    if(Z.pg && Z.pg.parentNode) Z.pg.parentNode.removeChild(Z.pg); Z.pg = null;
    if(!Z.det) return;
    var o = Z.o;
    var kopf = "<th>" + (o.xName || "x") + "</th>" + o.kurven.map(function(k){ return '<th style="color:' + (k.farbe || "#1a2233") + '">' + (k.name || "f(x)") + "</th>"; }).join("") + "<th></th>";
    var tr = Z.det.querySelector("thead tr"); if(tr.innerHTML !== kopf) tr.innerHTML = kopf;
    if(Z.spalten !== o.kurven.length && Z.xs.length) zeilen(Z);
    if(!Z.det.open) return;
    var zeig = Z.det.querySelector(".msabl-zeig").checked, g = E("g", { "pointer-events": "none" });
    var vb = Z.svg.viewBox && Z.svg.viewBox.baseVal, bw = Z.svg.getBoundingClientRect().width, mm = vb && vb.width && bw ? klemm(vb.width / bw, 1, 2.2) : 1;
    Z.body.querySelectorAll("tr").forEach(function(row, i){
      var x = Z.xs[i], zellen = row.querySelectorAll(".msabl-y");
      o.kurven.forEach(function(k, j){
        var y = isFinite(x) ? k.f(x) : NaN;
        if(zellen[j]){ zellen[j].textContent = isFinite(x) ? zahl(y, Math.min(3, yDez(y) + 1)) : ""; zellen[j].style.color = k.farbe || ""; }
        if(zeig && isFinite(y) && isFinite(x) && x >= o.x0 && x <= o.x1 && y >= o.y0 && y <= o.y1)
          g.appendChild(E("circle", { cx: X(o, x), cy: Y(o, y), r: 5.5 * mm, fill: "#7c3aed", stroke: "#ffffff", "stroke-width": 2 * mm }));
      });
    });
    var vor = Z.g && Z.g.parentNode === Z.svg ? Z.g : null;
    Z.svg.insertBefore(g, vor); Z.pg = g;
  }

  // ---------- Schnittstelle ----------
  function an(svg, o){
    if(!svg) return;
    var Z = zustand(svg);
    o.kurven = (o.kurven || []).filter(function(k){ return k && typeof k.f === "function"; }).map(function(k){
      var farbe = k.farbe;
      if(!farbe && k.el){ try { farbe = getComputedStyle(k.el).stroke; } catch(e){} }
      return { f: k.f, farbe: farbe && farbe !== "none" ? farbe : "#1a2233", name: k.name };
    });
    Z.o = o;
    if(o.tabelle !== false && !Z.det) tabelleBauen(Z);
    if(Z.det) Z.det.hidden = o.tabelle === false;
    neu(Z); zeichneAbl(Z);
  }
  function aus(svg){ if(svg && svg._abl){ var Z = svg._abl; Z.o = null; Z.pin = null; Z.hover = null; if(Z.g && Z.g.parentNode) Z.g.parentNode.removeChild(Z.g); if(Z.det) Z.det.hidden = true; } }
  function sprache(l){ if(TX[l]) lang = l; alle.forEach(function(Z){ if(Z.o){ texte(Z); neu(Z); zeichneAbl(Z); } }); }
  // Sprachwechsel der Kachel automatisch mitnehmen
  (function haken(){
    var A = window.MS_LANG;
    if(A && A.apply && !A._msabl){ var alt = A.apply; A.apply = function(l){ sprache(l); return alt.apply(A, arguments); }; A._msabl = true; }
    else if(!A) setTimeout(haken, 300);
  })();

  var css = document.createElement("style");
  css.textContent =
    ".msabl-wt{margin:8px 0 4px;border:2px solid #c9d6ea;border-radius:12px;background:#ffffff;padding:4px 10px;color:#1a2233;text-align:start;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
    ".msabl-wt summary{cursor:pointer;font-weight:700;color:#1565c0;font-size:16px;padding:6px 0}" +
    ".msabl-h{margin:0 0 6px;font-size:14px;color:#4f5b6e;line-height:1.4}" +
    ".msabl-scroll{max-height:240px;overflow:auto;border:1px solid #b0b0b8;border-radius:10px}" +
    ".msabl-wt table{width:100%;border-collapse:collapse;font-size:16px;color:#1a2233;margin:0}" +
    ".msabl-wt th{position:sticky;top:0;background:#e3eefc;color:#1a2233;font:italic 700 17px 'Cambria Math',Cambria,'Times New Roman',serif;padding:5px 8px;border:0;border-bottom:1px solid #b0b0b8;white-space:nowrap}" +
    ".msabl-wt td{padding:3px 8px;border:0;border-bottom:1px solid #e2e8f0;text-align:center}" +
    ".msabl-wt td input{width:100%;min-width:64px;max-width:130px;font:17px system-ui,sans-serif;padding:5px 8px;border:2px solid #b0b0b8;border-radius:8px;text-align:center;color:#1a2233;background:#ffffff;box-sizing:border-box;margin:0}" +
    ".msabl-wt td input:focus{outline:none;border-color:#1565c0}" +
    ".msabl-wt td input.msabl-falsch{border-color:#b91c1c;background:#fef2f2}" +
    ".msabl-y{font-size:17px;font-weight:700;white-space:nowrap}" +
    ".msabl-akt{white-space:nowrap;width:1%}" +
    ".msabl-akt button{width:32px;height:32px;border-radius:8px;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;font:700 18px system-ui;cursor:pointer;padding:0;margin:0 2px;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;box-shadow:none}" +
    ".msabl-akt .msabl-ziel{color:#6d28d9}" +
    ".msabl-knoepfe{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin:8px 0 6px;font-size:14px}" +
    ".msabl-knoepfe button{font:700 14px system-ui,sans-serif;padding:7px 12px;border-radius:10px;border:2px solid #1565c0;background:#ffffff;color:#1565c0;cursor:pointer;margin:0;box-shadow:none}" +
    ".msabl-knoepfe label{display:inline-flex;align-items:center;gap:6px;cursor:pointer;color:#1a2233;font-size:14px}";
  document.head.appendChild(css);
  return { an: an, aus: aus, sprache: sprache };
})();
