// /prozent/regler.js – „Prozente sehen“: Regler für Prozentsatz und Grundwert,
// 100er-Feld, Bruch/Dezimalzahl und Prozentstreifen ändern sich sofort (9 Sprachen).
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TX = {
    de: { titel: "Prozente sehen", text: "Ziehe an den Reglern – alles ändert sich sofort.", p: "Prozentsatz p:", g: "Grundwert G:", feld: "100er-Feld: Jedes Kästchen ist 1 % (ein Hundertstel).", streifen: "Prozentstreifen: oben Prozent, unten der Wert.", w: "Prozentwert", gekuerzt: "gekürzt", rech: "W = G · p : 100" },
    en: { titel: "Seeing percentages", text: "Move the sliders – everything changes at once.", p: "Percentage p:", g: "Base value G:", feld: "Hundred square: each small square is 1% (one hundredth).", streifen: "Percentage bar: per cent on top, the amount below.", w: "Percentage value", gekuerzt: "simplified", rech: "W = G · p : 100" },
    es: { titel: "Ver los porcentajes", text: "Mueve los controles: todo cambia al instante.", p: "Tanto por ciento p:", g: "Cantidad total G:", feld: "Cuadro de 100: cada casilla es el 1 % (una centésima).", streifen: "Barra de porcentaje: arriba el porcentaje, abajo el valor.", w: "Parte", gekuerzt: "simplificada", rech: "W = G · p : 100" },
    zh: { titel: "看见百分数", text: "拖动滑块——所有内容都会立刻改变。", p: "百分率 p：", g: "总量 G：", feld: "百格图：每个小格是 1 %（百分之一）。", streifen: "百分比条：上面是百分数，下面是数量。", w: "部分量", gekuerzt: "约分后", rech: "W = G · p : 100" },
    fr: { titel: "Voir les pourcentages", text: "Bouge les curseurs : tout change tout de suite.", p: "Pourcentage p :", g: "Valeur de référence G :", feld: "Grille de 100 : chaque case vaut 1 % (un centième).", streifen: "Bande de pourcentage : en haut les pourcents, en bas la valeur.", w: "Valeur", gekuerzt: "simplifiée", rech: "W = G · p : 100" },
    ru: { titel: "Проценты наглядно", text: "Двигай ползунки – всё сразу меняется.", p: "Процент p:", g: "Целое G:", feld: "Сотенный квадрат: каждая клетка – 1 % (одна сотая).", streifen: "Полоса процентов: сверху проценты, снизу величина.", w: "Часть", gekuerzt: "после сокращения", rech: "W = G · p : 100" },
    ar: { titel: "رؤية النسب المئوية", text: "حرّك المؤشرات – يتغير كل شيء فورًا.", p: "النسبة p:", g: "القيمة الأساسية G:", feld: "شبكة المئة: كل مربع صغير يساوي 1 % (جزء من مئة).", streifen: "شريط النسبة: في الأعلى النسبة المئوية، وفي الأسفل القيمة.", w: "القيمة المئوية", gekuerzt: "بعد الاختصار", rech: "W = G · p : 100" },
    ja: { titel: "百分率を見てみよう", text: "スライダーを動かすと、すぐに全部変わるよ。", p: "百分率 p：", g: "もとにする量 G：", feld: "100 マス：1 マスが 1 %（100 分の 1）。", streifen: "帯グラフ：上が百分率、下が量。", w: "くらべる量", gekuerzt: "約分", rech: "W = G · p : 100" },
    pt: { titel: "Ver as porcentagens", text: "Mova os controles – tudo muda na hora.", p: "Porcentagem p:", g: "Valor base G:", feld: "Quadro de 100: cada quadradinho é 1 % (um centésimo).", streifen: "Barra de porcentagem: em cima a porcentagem, embaixo o valor.", w: "Valor da porcentagem", gekuerzt: "simplificada", rech: "W = G · p : 100" }
  };
  function $(id){ return document.getElementById(id); }
  function L(){ return typeof aktuelleSprache !== "undefined" ? aktuelleSprache : "de"; }
  function tx(k){ return (TX[L()] || TX.de)[k]; }
  function komma(){ return !/^(en|zh|ja)$/.test(L()); }
  function z(x){ var s = String(Math.round(x * 100) / 100); return komma() ? s.replace(".", ",") : s; }
  function ggT(a, b){ while(b){ var t = b; b = a % b; a = t; } return a; }
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }

  var sec = document.createElement("section"); sec.className = "pr-karte";
  sec.innerHTML = '<h2 id="prTitel"></h2><p class="pr-text" id="prText"></p>' +
    '<div class="pr-regler"><label><span id="prPL"></span> <input type="range" id="prP" min="0" max="100" step="1" value="25"> <b id="prPW" dir="ltr"></b></label>' +
    '<label><span id="prGL"></span> <input type="range" id="prG" min="10" max="500" step="10" value="80"> <b id="prGW" dir="ltr"></b></label></div>' +
    '<div class="pr-zwei"><div><svg id="prFeld" viewBox="0 0 220 220"></svg><p class="pr-klein" id="prFeldT"></p></div>' +
    '<div><p class="pr-gross" id="prDrei" dir="ltr"></p><p class="pr-klein" id="prBruch" dir="ltr"></p></div></div>' +
    '<svg id="prStreifen" viewBox="0 0 640 140"></svg><p class="pr-klein" id="prStreifenT"></p><p class="pr-gross" id="prW" dir="ltr"></p>';
  var f = document.querySelector("footer"); f.parentNode.insertBefore(sec, f);
  var css = document.createElement("style");
  css.textContent = ".pr-karte{max-width:900px;margin:22px auto;padding:16px;border:2px solid #b0b0b8;border-radius:16px;background:#fff;color:#1f2937;box-sizing:border-box;text-align:start}" +
    ".pr-karte h2{margin:0 0 6px;color:#2563eb;font-size:22px}.pr-text,.pr-klein{color:#475569;line-height:1.5;margin:6px 0}" +
    ".pr-regler{display:flex;flex-wrap:wrap;gap:8px 24px;margin:8px 0}.pr-regler label{display:inline-flex;align-items:center;gap:8px;font-weight:bold;color:#334155;flex-wrap:wrap}" +
    ".pr-regler input{width:200px;max-width:60vw;padding:0;border:0;min-height:0;box-shadow:none}.pr-regler b{font-size:20px;color:#1d4ed8;min-width:3.5em}" +
    ".pr-zwei{display:grid;grid-template-columns:minmax(0,240px) minmax(0,1fr);gap:18px;align-items:center}.pr-zwei svg{width:100%;height:auto;display:block}" +
    ".pr-gross{font-size:24px;font-weight:bold;color:#1e3a8a;margin:6px 0;line-height:1.5}#prStreifen{width:100%;height:auto;display:block;margin-top:10px}" +
    "@media (max-width:620px){.pr-zwei{grid-template-columns:1fr}.pr-zwei svg{max-width:240px}}";
  document.head.appendChild(css);

  function zeichnen(){
    var p = Number($("prP").value), G = Number($("prG").value), W = G * p / 100;
    $("prPW").textContent = p + " %"; $("prGW").textContent = G;
    var sv = $("prFeld"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    for(var k = 0; k < 100; k++){ var r = Math.floor(k / 10), c = k % 10; sv.appendChild(el("rect", { x: 10 + c * 20, y: 10 + r * 20, width: 20, height: 20, fill: k < p ? "#3b82f6" : "#eff6ff", stroke: "#93c5fd", "stroke-width": 1 })); }
    sv.appendChild(el("rect", { x: 10, y: 10, width: 200, height: 200, fill: "none", stroke: "#1e3a8a", "stroke-width": 2.5 }));
    var g = ggT(p, 100) || 1;
    $("prDrei").textContent = p + " % = " + p + "/100 = " + z(p / 100);
    $("prBruch").textContent = p === 0 ? "0 % = 0" : (g > 1 ? tx("gekuerzt") + ": " + p + "/100 = " + (p / g) + "/" + (100 / g) : "");
    var st = $("prStreifen"); while(st.lastChild) st.removeChild(st.lastChild);
    var x0 = 30, B = 580, y = 40;
    st.appendChild(el("rect", { x: x0, y: y, width: B, height: 34, fill: "#eff6ff", stroke: "#1e3a8a", "stroke-width": 2 }));
    st.appendChild(el("rect", { x: x0, y: y, width: B * p / 100, height: 34, fill: "#f59e0b" }));
    st.appendChild(el("rect", { x: x0, y: y, width: B, height: 34, fill: "none", stroke: "#1e3a8a", "stroke-width": 2 }));
    for(var i = 0; i <= 10; i++){ var xi = x0 + B * i / 10; st.appendChild(el("line", { x1: xi, y1: y, x2: xi, y2: y + 34, stroke: "#1e3a8a", "stroke-width": i % 5 ? 0.8 : 1.6 }));
      if(i % 5 === 0){ st.appendChild(el("text", { x: xi, y: y - 8, "text-anchor": "middle", "font-size": 19, fill: "#475569", "font-family": "Arial,sans-serif" }, (i * 10) + " %")); st.appendChild(el("text", { x: xi, y: y + 58, "text-anchor": "middle", "font-size": 19, fill: "#475569", "font-family": "Arial,sans-serif" }, z(G * i / 10))); } }
    var xp = x0 + B * p / 100;
    st.appendChild(el("line", { x1: xp, y1: y - 22, x2: xp, y2: y + 70, stroke: "#dc2626", "stroke-width": 2.5 }));
    st.appendChild(el("text", { x: Math.min(Math.max(xp, 50), 590), y: y + 92, "text-anchor": "middle", "font-size": 24, "font-weight": "bold", fill: "#dc2626", "font-family": "Arial,sans-serif" }, z(W)));
    $("prW").textContent = tx("rech") + " = " + G + " · " + p + " : 100 = " + z(W);
  }
  function texte(){
    $("prTitel").textContent = tx("titel"); $("prText").textContent = tx("text"); $("prPL").textContent = tx("p"); $("prGL").textContent = tx("g");
    $("prFeldT").textContent = tx("feld"); $("prStreifenT").textContent = tx("streifen");
    sec.dir = L() === "ar" ? "rtl" : "ltr"; zeichnen();
  }
  ["prP", "prG"].forEach(function(id){ $(id).addEventListener("input", zeichnen); });
  var alt = window.spracheWaehlen; window.spracheWaehlen = function(l){ alt(l); texte(); };
  texte();
})();
