// /brueche/regler.js – „Brüche sehen“: Regler für Zähler, Nenner und Erweitern.
// Kreise und Streifen ändern sich sofort; gleichwertige Brüche werden sichtbar (9 Sprachen).
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TX = {
    de: { titel: "Brüche sehen", text: "Ziehe an den Reglern – Bild und Zahlen ändern sich sofort.", z: "Zähler:", n: "Nenner:", k: "Erweitern mit:",
      erkl: "Der Nenner sagt, in wie viele gleiche Teile das Ganze geteilt wird. Der Zähler sagt, wie viele Teile man nimmt.",
      gleich: "Gleichwertige Brüche: Der untere Streifen ist feiner geteilt, aber genauso viel ist gefärbt.", gekuerzt: "vollständig gekürzt", gemischt: "als gemischte Zahl", ganz: "ein Ganzes" },
    en: { titel: "Seeing fractions", text: "Move the sliders – the picture and the numbers change at once.", z: "Numerator:", n: "Denominator:", k: "Expand by:",
      erkl: "The denominator tells you into how many equal parts the whole is divided. The numerator tells you how many parts you take.",
      gleich: "Equivalent fractions: the lower bar is divided more finely, but the same amount is coloured.", gekuerzt: "fully simplified", gemischt: "as a mixed number", ganz: "one whole" },
    es: { titel: "Ver las fracciones", text: "Mueve los controles: el dibujo y los números cambian al instante.", z: "Numerador:", n: "Denominador:", k: "Amplificar por:",
      erkl: "El denominador dice en cuántas partes iguales se divide el todo. El numerador dice cuántas partes se toman.",
      gleich: "Fracciones equivalentes: la barra de abajo está dividida en partes más pequeñas, pero hay la misma cantidad coloreada.", gekuerzt: "simplificada del todo", gemischt: "como número mixto", ganz: "un entero" },
    zh: { titel: "看见分数", text: "拖动滑块——图形和数字会立刻改变。", z: "分子：", n: "分母：", k: "扩大倍数：",
      erkl: "分母表示把整体平均分成几份，分子表示取了几份。",
      gleich: "等值分数：下面的长条分得更细，但涂色的部分一样多。", gekuerzt: "最简分数", gemischt: "带分数", ganz: "一个整体" },
    fr: { titel: "Voir les fractions", text: "Bouge les curseurs : la figure et les nombres changent tout de suite.", z: "Numérateur :", n: "Dénominateur :", k: "Multiplier haut et bas par :",
      erkl: "Le dénominateur dit en combien de parts égales on partage l’unité. Le numérateur dit combien de parts on prend.",
      gleich: "Fractions égales : la bande du bas est partagée plus finement, mais la même quantité est coloriée.", gekuerzt: "irréductible", gemischt: "en nombre mixte", ganz: "une unité" },
    ru: { titel: "Дроби наглядно", text: "Двигай ползунки – рисунок и числа сразу меняются.", z: "Числитель:", n: "Знаменатель:", k: "Расширить на:",
      erkl: "Знаменатель показывает, на сколько равных частей делят целое. Числитель показывает, сколько частей взяли.",
      gleich: "Равные дроби: нижняя полоса разделена мельче, но закрашено столько же.", gekuerzt: "несократимая дробь", gemischt: "смешанное число", ganz: "одно целое" },
    ar: { titel: "رؤية الكسور", text: "حرّك المؤشرات – يتغير الرسم والأعداد فورًا.", z: "البسط:", n: "المقام:", k: "التوسيع بـ:",
      erkl: "المقام يبيّن إلى كم جزءًا متساويًا يُقسم الكل. والبسط يبيّن كم جزءًا نأخذ.",
      gleich: "كسور متكافئة: الشريط السفلي مقسوم إلى أجزاء أصغر، لكن الجزء الملوَّن بالقدر نفسه.", gekuerzt: "في أبسط صورة", gemischt: "كعدد كسري", ganz: "واحد صحيح" },
    ja: { titel: "分数を見てみよう", text: "スライダーを動かすと、図と数がすぐに変わるよ。", z: "分子：", n: "分母：", k: "かける数：",
      erkl: "分母は全体をいくつに等しく分けたか、分子はそのうちいくつ取ったかを表す。",
      gleich: "大きさの等しい分数：下の帯は細かく分かれているけれど、色のついた量は同じ。", gekuerzt: "約分すると", gemischt: "帯分数", ganz: "1 つ分" },
    pt: { titel: "Ver as frações", text: "Mova os controles – a figura e os números mudam na hora.", z: "Numerador:", n: "Denominador:", k: "Ampliar por:",
      erkl: "O denominador diz em quantas partes iguais o todo é dividido. O numerador diz quantas partes se tomam.",
      gleich: "Frações equivalentes: a barra de baixo está dividida em partes menores, mas a mesma quantidade está colorida.", gekuerzt: "totalmente simplificada", gemischt: "como número misto", ganz: "um inteiro" }
  };
  function $(id){ return document.getElementById(id); }
  function L(){ return typeof aktivSprache !== "undefined" ? aktivSprache : "de"; }
  function tx(k){ return (TX[L()] || TX.de)[k]; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(L()); }
  function z2(x){ var s = String(Math.round(x * 1000) / 1000); return komma() ? s.replace(".", ",") : s; }
  function ggT(a, b){ while(b){ var t = b; b = a % b; a = t; } return a; }
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  function br(z, n){ return '<span class="br-b"><span>' + z + "</span><span>" + n + "</span></span>"; }

  var sec = document.createElement("section"); sec.className = "br-karte";
  sec.innerHTML = '<h2 id="brTitel"></h2><p class="br-text" id="brText"></p>' +
    '<div class="br-regler"><label><span id="brZL"></span> <input type="range" id="brZ" min="0" max="24" step="1" value="3"> <b id="brZW"></b></label>' +
    '<label><span id="brNL"></span> <input type="range" id="brN" min="1" max="12" step="1" value="4"> <b id="brNW"></b></label></div>' +
    '<svg id="brKreise" viewBox="0 0 640 150"></svg><div class="br-werte" id="brWerte" dir="ltr"></div><p class="br-text" id="brErkl"></p>' +
    '<div class="br-regler"><label><span id="brKL"></span> <input type="range" id="brK" min="1" max="6" step="1" value="2"> <b id="brKW"></b></label></div>' +
    '<svg id="brStreifen" viewBox="0 0 640 150"></svg><div class="br-werte" id="brGleich" dir="ltr"></div><p class="br-text" id="brGleichT"></p>';
  var f = document.querySelector("footer"); f.parentNode.insertBefore(sec, f);
  var css = document.createElement("style");
  css.textContent = ".br-karte{max-width:900px;margin:22px auto;padding:16px;border:2px solid #b0b0b8;border-radius:16px;background:#fff;color:#1f2937;box-sizing:border-box;text-align:start}" +
    ".br-karte h2{margin:0 0 6px;color:#1565c0;font-size:22px}.br-text{color:#475569;line-height:1.5;margin:6px 0}" +
    ".br-regler{display:flex;flex-wrap:wrap;gap:8px 24px;margin:8px 0}.br-regler label{display:inline-flex;align-items:center;gap:8px;font-weight:bold;color:#334155;flex-wrap:wrap}" +
    ".br-regler input{width:200px;max-width:60vw;padding:0;border:0;min-height:0;box-shadow:none;margin:0}.br-regler b{font-size:20px;color:#1d4ed8;min-width:1.5em}" +
    ".br-karte svg{width:100%;height:auto;display:block;margin:6px 0}" +
    ".br-werte{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:22px;font-weight:bold;color:#1e3a8a}" +
    ".br-b{display:inline-flex;flex-direction:column;align-items:center;line-height:1.1;vertical-align:middle}.br-b span:first-child{border-bottom:2px solid currentColor;padding:0 4px}.br-b span:last-child{padding:0 4px}" +
    ".br-klein{font-size:15px;color:#475569;font-weight:normal}";
  document.head.appendChild(css);

  function zeichnen(){
    var z = Number($("brZ").value), n = Number($("brN").value), k = Number($("brK").value);
    $("brZW").textContent = z; $("brNW").textContent = n; $("brKW").textContent = k;
    // Kreise: so viele Ganze wie nötig (mind. 1)
    var sv = $("brKreise"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    var anz = Math.max(1, Math.ceil(z / n)), r = Math.min(62, 600 / anz / 2 - 6), cy = 75;
    for(var g = 0; g < anz; g++){
      var cx = 20 + r + g * (2 * r + 12);
      for(var i = 0; i < n; i++){
        var voll = g * n + i < z, a0 = -Math.PI / 2 + 2 * Math.PI * i / n, a1 = -Math.PI / 2 + 2 * Math.PI * (i + 1) / n;
        if(n === 1){ sv.appendChild(el("circle", { cx: cx, cy: cy, r: r, fill: voll ? "#f59e0b" : "#fff7ed", stroke: "#9a3412", "stroke-width": 2 })); continue; }
        var p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        sv.appendChild(el("path", { d: "M" + cx + " " + cy + " L" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + " A" + r + " " + r + " 0 " + (a1 - a0 > Math.PI ? 1 : 0) + " 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + " Z", fill: voll ? "#f59e0b" : "#fff7ed", stroke: "#9a3412", "stroke-width": 1.5 }));
      }
    }
    var gt = ggT(z, n) || 1, gl = function(v, f){ return Math.abs(v * f - Math.round(v * f)) < 1e-9 ? " = " : " ≈ "; }, h = br(z, n) + gl(z / n, 1000) + z2(z / n) + gl(z / n * 100, 1000) + z2(z / n * 100) + " %";
    if(gt > 1 && z > 0) h += ' <span class="br-klein">(' + tx("gekuerzt") + ")</span> " + br(z / gt, n / gt);
    if(z > n && z % n){ h += ' <span class="br-klein">(' + tx("gemischt") + ")</span> " + Math.floor(z / n) + " " + br(z % n, n); }
    $("brWerte").innerHTML = h;
    // Streifen: oben z/n, unten (z·k)/(n·k) – nur für den ersten Ganzen bzw. bis 1 gezeigt
    var st = $("brStreifen"); while(st.lastChild) st.removeChild(st.lastChild);
    var x0 = 20, B = 600;
    // so viele Ganze nebeneinander wie nötig, Grenzen der Ganzen dick
    function streifen(y, teile, gefuellt){
      var gesamt = teile * anz;
      for(var j = 0; j < gesamt; j++) st.appendChild(el("rect", { x: x0 + B * j / gesamt, y: y, width: B / gesamt, height: 46, fill: j < gefuellt ? "#3b82f6" : "#eff6ff", stroke: "#1e3a8a", "stroke-width": gesamt > 40 ? 0.6 : 1.4 }));
      for(var w = 0; w < anz; w++) st.appendChild(el("rect", { x: x0 + B * w / anz, y: y, width: B / anz, height: 46, fill: "none", stroke: "#1e3a8a", "stroke-width": 3 }));
    }
    streifen(15, n, z); streifen(85, n * k, z * k);
    var xm = x0 + B * z / (n * anz); st.appendChild(el("line", { x1: xm, y1: 6, x2: xm, y2: 140, stroke: "#dc2626", "stroke-width": 2.5, "stroke-dasharray": "6 4" }));
    $("brGleich").innerHTML = br(z, n) + " = " + br(z + " · " + k, n + " · " + k) + " = " + br(z * k, n * k);
  }
  function texte(){
    $("brTitel").textContent = tx("titel"); $("brText").textContent = tx("text"); $("brZL").textContent = tx("z"); $("brNL").textContent = tx("n"); $("brKL").textContent = tx("k");
    $("brErkl").textContent = tx("erkl"); $("brGleichT").textContent = tx("gleich"); sec.dir = L() === "ar" ? "rtl" : "ltr"; zeichnen();
  }
  ["brZ", "brN", "brK"].forEach(function(id){ $(id).addEventListener("input", zeichnen); });
  var alt = window.sprache; window.sprache = function(l){ alt(l); texte(); };
  texte();
})();
