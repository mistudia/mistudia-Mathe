// /groessen/erklaer.js – „So funktioniert das Umrechnen“ (9 Sprachen):
//  1) Umrechnungstreppe für Länge (·10), Fläche (·100), Volumen (·1000)
//  2) Bild mit Füll-Regler: 1 dm = 10 cm, 1 dm² = 100 cm² (10 × 10), 1 dm³ = 1000 cm³ (10 × 10 × 10)
//  3) Einheitentafel: Größe eintragen, Komma per Regler zu einer anderen Einheit schieben
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var ART = {
    laenge: { e: ["km", "m", "dm", "cm", "mm"], f: [1e6, 1000, 100, 10, 1], stellen: 3, start: [3.5, "km"], klein: "cm", gross: "dm", max: 10 },
    flaeche: { e: ["km²", "ha", "a", "m²", "dm²", "cm²", "mm²"], f: [1e12, 1e10, 1e8, 1e6, 1e4, 100, 1], stellen: 2, start: [2500, "m²"], klein: "cm²", gross: "dm²", max: 100 },
    volumen: { e: ["m³", "dm³", "cm³", "mm³"], f: [1e9, 1e6, 1000, 1], stellen: 3, start: [0.25, "dm³"], klein: "cm³", gross: "dm³", max: 1000 }
  };
  var TX = {
    de: { titel: "So funktioniert das Umrechnen", laenge: "Länge", flaeche: "Fläche", volumen: "Volumen",
      treppeH: "Umrechnungszahlen", treppeT: "Nach rechts (zur kleineren Einheit): mal. Nach links (zur größeren Einheit): geteilt.",
      bildH: "Warum 10, 100 oder 1000?", fuellen: "Füllen:",
      w_laenge: "Ein Streifen von 1 dm Länge besteht aus 10 Stücken von je 1 cm. Deshalb ist die Umrechnungszahl bei Längen 10 (nur zwischen km und m ist sie 1000).",
      w_flaeche: "1 dm² ist ein Quadrat mit 10 cm Seitenlänge. Hinein passen 10 Reihen mit je 10 Zentimeter-Quadraten: 10 · 10 = 100. Deshalb ist die Umrechnungszahl bei Flächen 100.",
      w_volumen: "1 dm³ ist ein Würfel mit 10 cm Kantenlänge. Hinein passen 10 Schichten mit je 10 · 10 = 100 Zentimeter-Würfeln: 10 · 10 · 10 = 1000. Deshalb ist die Umrechnungszahl bei Volumen 1000.",
      liter: "Merke: 1 dm³ = 1 l (Liter) und 1 cm³ = 1 ml (Milliliter).",
      tafelH: "Einheitentafel – das Komma wandert", tafelT: "Trage eine Größe ein. In der Tafel hat jede Einheit bei Längen 1 Stelle (km und m je 3), bei Flächen 2 Stellen und bei Volumen 3 Stellen. Schiebe den Regler: Die Ziffern bleiben stehen, nur das Komma rückt zu einer anderen Einheit.",
      wertL: "Größe:", kommaL: "Komma hinter:", zuGross: "Diese Zahl passt nicht in die Tafel – bitte eine kleinere Größe wählen.", keineZahl: "Bitte eine Zahl eingeben, z. B. 3,5." },
    en: { titel: "How converting works", laenge: "Length", flaeche: "Area", volumen: "Volume",
      treppeH: "Conversion factors", treppeT: "To the right (smaller unit): multiply. To the left (larger unit): divide.",
      bildH: "Why 10, 100 or 1000?", fuellen: "Fill:",
      w_laenge: "A strip 1 dm long is made of 10 pieces of 1 cm each. So the conversion factor for lengths is 10 (only between km and m it is 1000).",
      w_flaeche: "1 dm² is a square with 10 cm sides. It holds 10 rows of 10 centimetre squares each: 10 · 10 = 100. So the conversion factor for areas is 100.",
      w_volumen: "1 dm³ is a cube with 10 cm edges. It holds 10 layers of 10 · 10 = 100 centimetre cubes each: 10 · 10 · 10 = 1000. So the conversion factor for volumes is 1000.",
      liter: "Remember: 1 dm³ = 1 l (litre) and 1 cm³ = 1 ml (millilitre).",
      tafelH: "Place-value table of units – the decimal point moves", tafelT: "Enter a quantity. In the table each unit has 1 place for lengths (km and m 3 each), 2 places for areas and 3 places for volumes. Move the slider: the digits stay where they are, only the decimal point moves to another unit.",
      wertL: "Quantity:", kommaL: "Point after:", zuGross: "This number doesn’t fit in the table – please choose a smaller quantity.", keineZahl: "Please enter a number, e.g. 3.5." },
    es: { titel: "Así funciona la conversión", laenge: "Longitud", flaeche: "Superficie", volumen: "Volumen",
      treppeH: "Factores de conversión", treppeT: "Hacia la derecha (unidad menor): multiplicar. Hacia la izquierda (unidad mayor): dividir.",
      bildH: "¿Por qué 10, 100 o 1000?", fuellen: "Llenar:",
      w_laenge: "Una tira de 1 dm está formada por 10 trozos de 1 cm. Por eso el factor en longitudes es 10 (solo entre km y m es 1000).",
      w_flaeche: "1 dm² es un cuadrado de 10 cm de lado. Caben 10 filas de 10 cuadrados de un centímetro: 10 · 10 = 100. Por eso el factor en superficies es 100.",
      w_volumen: "1 dm³ es un cubo de 10 cm de arista. Caben 10 capas de 10 · 10 = 100 cubos de un centímetro: 10 · 10 · 10 = 1000. Por eso el factor en volúmenes es 1000.",
      liter: "Recuerda: 1 dm³ = 1 l (litro) y 1 cm³ = 1 ml (mililitro).",
      tafelH: "Tabla de unidades: la coma se mueve", tafelT: "Escribe una medida. En la tabla cada unidad tiene 1 cifra en longitudes (km y m, 3 cada una), 2 en superficies y 3 en volúmenes. Mueve el control: las cifras se quedan, solo la coma pasa a otra unidad.",
      wertL: "Medida:", kommaL: "Coma detrás de:", zuGross: "Este número no cabe en la tabla: elige una medida más pequeña.", keineZahl: "Escribe un número, p. ej. 3,5." },
    zh: { titel: "单位换算是怎么回事", laenge: "长度", flaeche: "面积", volumen: "体积",
      treppeH: "进率", treppeT: "向右（换成小单位）：乘。向左（换成大单位）：除。",
      bildH: "为什么是 10、100 或 1000？", fuellen: "填充：",
      w_laenge: "1 dm 长的纸条由 10 段 1 cm 组成。所以长度单位的进率是 10（只有 km 和 m 之间是 1000）。",
      w_flaeche: "1 dm² 是边长 10 cm 的正方形。里面能放 10 行，每行 10 个 1 cm² 的小正方形：10 · 10 = 100。所以面积单位的进率是 100。",
      w_volumen: "1 dm³ 是棱长 10 cm 的正方体。里面能放 10 层，每层 10 · 10 = 100 个 1 cm³ 的小正方体：10 · 10 · 10 = 1000。所以体积单位的进率是 1000。",
      liter: "记住：1 dm³ = 1 l（升），1 cm³ = 1 ml（毫升）。",
      tafelH: "单位表——小数点移动", tafelT: "输入一个量。表中长度单位每个占 1 位（km 和 m 各 3 位），面积单位占 2 位，体积单位占 3 位。拖动滑块：数字不动，只有小数点移到别的单位后面。",
      wertL: "量：", kommaL: "小数点在：", zuGross: "这个数放不进表里——请选小一点的量。", keineZahl: "请输入一个数，例如 3.5。" },
    fr: { titel: "Comment fonctionnent les conversions", laenge: "Longueur", flaeche: "Aire", volumen: "Volume",
      treppeH: "Facteurs de conversion", treppeT: "Vers la droite (unité plus petite) : multiplier. Vers la gauche (unité plus grande) : diviser.",
      bildH: "Pourquoi 10, 100 ou 1000 ?", fuellen: "Remplir :",
      w_laenge: "Une bande de 1 dm se compose de 10 morceaux de 1 cm. Le facteur pour les longueurs est donc 10 (seulement entre km et m il vaut 1000).",
      w_flaeche: "1 dm² est un carré de 10 cm de côté. On peut y mettre 10 rangées de 10 carrés d’un centimètre : 10 · 10 = 100. Le facteur pour les aires est donc 100.",
      w_volumen: "1 dm³ est un cube de 10 cm d’arête. On peut y mettre 10 couches de 10 · 10 = 100 cubes d’un centimètre : 10 · 10 · 10 = 1000. Le facteur pour les volumes est donc 1000.",
      liter: "À retenir : 1 dm³ = 1 L (litre) et 1 cm³ = 1 mL (millilitre).",
      tafelH: "Tableau de conversion : la virgule se déplace", tafelT: "Saisis une grandeur. Dans le tableau, chaque unité a 1 case pour les longueurs (km et m : 3 chacune), 2 cases pour les aires et 3 cases pour les volumes. Bouge le curseur : les chiffres restent en place, seule la virgule change d’unité.",
      wertL: "Grandeur :", kommaL: "Virgule après :", zuGross: "Ce nombre ne tient pas dans le tableau : choisis une grandeur plus petite.", keineZahl: "Saisis un nombre, p. ex. 3,5." },
    ru: { titel: "Как устроен перевод единиц", laenge: "Длина", flaeche: "Площадь", volumen: "Объём",
      treppeH: "Множители перевода", treppeT: "Вправо (к меньшей единице): умножать. Влево (к большей единице): делить.",
      bildH: "Почему 10, 100 или 1000?", fuellen: "Заполнить:",
      w_laenge: "Полоска длиной 1 дм состоит из 10 кусочков по 1 см. Поэтому для длины множитель 10 (только между км и м – 1000).",
      w_flaeche: "1 дм² – это квадрат со стороной 10 см. В нём помещается 10 рядов по 10 квадратных сантиметров: 10 · 10 = 100. Поэтому для площади множитель 100.",
      w_volumen: "1 дм³ – это куб с ребром 10 см. В нём помещается 10 слоёв по 10 · 10 = 100 кубических сантиметров: 10 · 10 · 10 = 1000. Поэтому для объёма множитель 1000.",
      liter: "Запомни: 1 дм³ = 1 л (литр), 1 см³ = 1 мл (миллилитр).",
      tafelH: "Таблица единиц – запятая перемещается", tafelT: "Введи величину. В таблице у каждой единицы длины 1 разряд (у км и м по 3), у единиц площади 2 разряда, у единиц объёма 3. Двигай ползунок: цифры остаются на месте, перемещается только запятая.",
      wertL: "Величина:", kommaL: "Запятая после:", zuGross: "Это число не помещается в таблицу – выбери величину поменьше.", keineZahl: "Введи число, например 3,5." },
    ar: { titel: "كيف يعمل تحويل الوحدات", laenge: "الطول", flaeche: "المساحة", volumen: "الحجم",
      treppeH: "معاملات التحويل", treppeT: "إلى اليمين (نحو الوحدة الأصغر): ضرب. إلى اليسار (نحو الوحدة الأكبر): قسمة.",
      bildH: "لماذا 10 أو 100 أو 1000؟", fuellen: "املأ:",
      w_laenge: "شريط طوله 1 dm يتكوّن من 10 قطع طول كل منها 1 cm. لذلك معامل التحويل في الأطوال هو 10 (بين km و m فقط هو 1000).",
      w_flaeche: "1 dm² مربع طول ضلعه 10 cm. يتسع لـ 10 صفوف في كل منها 10 مربعات من السنتيمتر: 10 · 10 = 100. لذلك معامل التحويل في المساحات هو 100.",
      w_volumen: "1 dm³ مكعب طول حرفه 10 cm. يتسع لـ 10 طبقات في كل منها 10 · 10 = 100 مكعب من السنتيمتر: 10 · 10 · 10 = 1000. لذلك معامل التحويل في الأحجام هو 1000.",
      liter: "تذكّر: 1 dm³ = 1 l (لتر) و 1 cm³ = 1 ml (مليلتر).",
      tafelH: "جدول الوحدات – الفاصلة تتحرك", tafelT: "أدخل كمية. في الجدول لكل وحدة طول خانة واحدة (لـ km و m ثلاث خانات)، ولوحدات المساحة خانتان، ولوحدات الحجم ثلاث خانات. حرّك المؤشر: تبقى الأرقام مكانها، وتنتقل الفاصلة فقط إلى وحدة أخرى.",
      wertL: "الكمية:", kommaL: "الفاصلة بعد:", zuGross: "هذا العدد لا يتسع في الجدول – اختر كمية أصغر.", keineZahl: "أدخل عددًا، مثلًا 3.5." },
    ja: { titel: "単位の換算のしくみ", laenge: "長さ", flaeche: "面積", volumen: "体積",
      treppeH: "換算の数", treppeT: "右へ（小さい単位へ）：かける。左へ（大きい単位へ）：わる。",
      bildH: "なぜ 10、100、1000 なの？", fuellen: "うめる：",
      w_laenge: "1 dm のテープは 1 cm が 10 こ分。だから長さの換算は 10 倍（km と m の間だけは 1000 倍）。",
      w_flaeche: "1 dm² は 1 辺 10 cm の正方形。1 cm² の正方形が 10 こずつ 10 列ならぶ：10 · 10 = 100。だから面積の換算は 100 倍。",
      w_volumen: "1 dm³ は 1 辺 10 cm の立方体。1 cm³ の立方体が 10 · 10 = 100 こずつ 10 だん入る：10 · 10 · 10 = 1000。だから体積の換算は 1000 倍。",
      liter: "おぼえよう：1 dm³ = 1 L（リットル）、1 cm³ = 1 mL（ミリリットル）。",
      tafelH: "単位の位取り表――小数点が動く", tafelT: "量を入れてね。表では長さの単位は 1 けた（km と m は 3 けた）、面積は 2 けた、体積は 3 けたずつ。スライダーを動かすと、数字はそのままで小数点だけがほかの単位へ動くよ。",
      wertL: "量：", kommaL: "小数点の位置：", zuGross: "この数は表に入りきらないよ。もっと小さい量にしてね。", keineZahl: "数を入れてね（例：3.5）。" },
    pt: { titel: "Como funciona a conversão", laenge: "Comprimento", flaeche: "Área", volumen: "Volume",
      treppeH: "Fatores de conversão", treppeT: "Para a direita (unidade menor): multiplicar. Para a esquerda (unidade maior): dividir.",
      bildH: "Por que 10, 100 ou 1000?", fuellen: "Preencher:",
      w_laenge: "Uma tira de 1 dm é formada por 10 pedaços de 1 cm. Por isso o fator para comprimentos é 10 (só entre km e m é 1000).",
      w_flaeche: "1 dm² é um quadrado de 10 cm de lado. Cabem 10 fileiras de 10 quadradinhos de um centímetro: 10 · 10 = 100. Por isso o fator para áreas é 100.",
      w_volumen: "1 dm³ é um cubo de 10 cm de aresta. Cabem 10 camadas de 10 · 10 = 100 cubinhos de um centímetro: 10 · 10 · 10 = 1000. Por isso o fator para volumes é 1000.",
      liter: "Lembre: 1 dm³ = 1 l (litro) e 1 cm³ = 1 ml (mililitro).",
      tafelH: "Tabela de unidades – a vírgula anda", tafelT: "Digite uma grandeza. Na tabela, cada unidade de comprimento tem 1 casa (km e m, 3 cada), as de área 2 casas e as de volume 3 casas. Mova o controle: os algarismos ficam no lugar, só a vírgula vai para outra unidade.",
      wertL: "Grandeza:", kommaL: "Vírgula depois de:", zuGross: "Este número não cabe na tabela – escolha uma grandeza menor.", keineZahl: "Digite um número, por ex. 3,5." }
  };
  function $(id){ return document.getElementById(id); }
  function tx(k){ return (TX[lang] || TX.de)[k]; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }
  function zf(x){ return new Intl.NumberFormat(T().locale, { maximumFractionDigits: 12, useGrouping: false }).format(Math.round(x * 1e12) / 1e12); }
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  var art = "flaeche";

  var sec = document.createElement("section"); sec.className = "erk-karte"; sec.id = "erkKarte";
  sec.innerHTML = '<h2 id="kTitel"></h2><div class="erk-wahl" id="kWahl">' + ["laenge", "flaeche", "volumen"].map(function(k){ return '<button type="button" data-a="' + k + '"></button>'; }).join("") + "</div>" +
    '<h3 id="kTreppeH"></h3><div class="erk-scroll"><svg id="kTreppe" class="erk-treppe"></svg></div><p class="erk-klein" id="kTreppeT"></p>' +
    '<h3 id="kBildH"></h3><div class="erk-bild"><svg id="kBild" viewBox="0 0 400 310"></svg><div><p id="kWarum"></p>' +
    '<label class="erk-regler"><span id="kFuellL"></span> <input type="range" id="kFuell" min="0" max="100" step="1" value="37"></label><p class="erk-formel" id="kFormel" dir="ltr"></p><p class="erk-stand" id="kStand" dir="ltr"></p><p class="erk-klein" id="kLiter"></p></div></div>' +
    '<h3 id="kTafelH"></h3><p class="erk-klein" id="kTafelT"></p>' +
    '<div class="erk-zeile"><label><span id="kWertL"></span> <input id="kWert" inputmode="decimal" autocomplete="off"></label><select id="kEinh"></select></div>' +
    '<div class="erk-zeile"><label class="erk-regler"><span id="kKommaL"></span> <input type="range" id="kKomma" min="0" max="3" step="1"></label> <b id="kKommaW"></b></div>' +
    '<div class="erk-scroll" dir="ltr"><table class="erk-tafel" id="kTafel"></table></div><p class="erk-fehler" id="kFehler"></p><p class="erk-lesen" id="kLesen" dir="ltr"></p>';
  var ziel = $("eigenKarte") || $("rechnerBox"); ziel.parentNode.insertBefore(sec, ziel.nextSibling);
  var css = document.createElement("style");
  css.textContent = ".erk-karte{margin-top:22px;padding:20px;border-radius:15px;background:#ffffff;border:2px solid #b0b0b8;color:#1f2937}" +
    ".erk-karte h2{margin:0 0 10px;color:var(--blau);font-size:22px}.erk-karte h3{margin:18px 0 6px;color:#1e40af;font-size:18px}" +
    ".erk-wahl{display:flex;flex-wrap:wrap;gap:6px}.erk-wahl button{padding:9px 16px;border:2px solid #b0b0b8;border-radius:30px;background:#fff;color:#475569;font:bold 16px Arial,sans-serif;cursor:pointer}" +
    ".erk-wahl button.aktiv{background:var(--blau);border-color:var(--blau);color:#fff}" +
    ".erk-scroll{overflow-x:auto;max-width:100%}.erk-treppe{display:block;height:auto}.erk-klein{margin:4px 0;color:#475569;font-size:15px;line-height:1.5}" +
    ".erk-bild{display:grid;grid-template-columns:minmax(0,400px) minmax(0,1fr);gap:16px;align-items:center}.erk-bild svg{width:100%;height:auto;display:block}" +
    ".erk-bild p{line-height:1.5}.erk-regler{display:flex;align-items:center;gap:8px;font-weight:bold;color:#475569;flex-wrap:wrap}" +
    ".erk-karte input[type=range]{width:220px;max-width:60vw;min-height:0;padding:0;border:0}" +
    ".erk-formel{font-size:18px;font-weight:bold;color:#1e3a8a;background:#eff6ff;border-radius:10px;padding:8px 12px;line-height:1.7;margin:8px 0}.erk-formel:empty{display:none}.erk-stand{font-size:19px;font-weight:bold;color:#1d4ed8;margin:8px 0}" +
    ".erk-zeile{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}.erk-zeile label{display:inline-flex;gap:8px;align-items:center;font-weight:bold;color:#475569}" +
    "#kWert{width:140px;min-height:44px;border-color:#b0b0b8}#kEinh{min-height:44px;padding:6px 10px;border:2px solid #b0b0b8;border-radius:8px;font-size:18px;background:#fff;color:#1f2937}" +
    ".erk-tafel{border-collapse:collapse;margin:6px 0;font:bold 18px Arial,sans-serif}.erk-tafel th{background:#dbeafe;color:#1e3a8a;border:1px solid #94a3b8;padding:4px 6px;font-size:15px}" +
    ".erk-tafel th.an{background:#f59e0b;color:#fff}.erk-tafel td{border:1px solid #94a3b8;width:26px;height:36px;text-align:center;color:#1f2937;background:#fff}" +
    ".erk-tafel td.null{color:#94a3b8}.erk-tafel td.grenze{border-right:3px solid #1e40af}" +
    ".erk-tafel td.kz{width:18px;min-width:18px;border:0;background:transparent;color:#dc2626;font:900 44px Georgia,'Times New Roman',serif;line-height:0;vertical-align:bottom;padding:0 1px 14px;text-align:center}.erk-tafel th.kz{background:transparent;border:0;padding:0}" +
    ".erk-tafel td.an{background:#fef3c7}.erk-fehler{color:#b91c1c;font-weight:bold;margin:4px 0}.erk-fehler:empty{display:none}" +
    ".erk-lesen{font-size:17px;line-height:1.7;margin:6px 0 0}.erk-lesen b{color:#1d4ed8}" +
    "@media (max-width:620px){.erk-bild{grid-template-columns:1fr}.erk-karte{padding:14px 10px}.erk-tafel td{width:20px;height:32px;font-size:16px}.erk-tafel th{font-size:13px;padding:3px 2px}}";
  document.head.appendChild(css);

  // ---------- 1) Treppe ----------
  function treppe(){
    var A = ART[art], sv = $("kTreppe"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    var n = A.e.length, dx = 78, W = 30 + n * dx, H = 150, y = 75;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H); sv.style.width = "100%"; sv.style.maxWidth = W + "px";
    var defs = el("defs", {}); ["r", "b"].forEach(function(c){ var m = el("marker", { id: "kp" + c, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto" }); m.appendChild(el("path", { d: "M0 1.2 L10 5 L0 8.8 L2.4 5 Z", fill: c === "r" ? "#dc2626" : "#1e40af" })); defs.appendChild(m); }); sv.appendChild(defs);
    A.e.forEach(function(u, i){
      var x = 30 + i * dx + dx / 2 - 15;
      sv.appendChild(el("rect", { x: x - 28, y: y - 18, width: 56, height: 36, rx: 9, fill: "#dbeafe", stroke: "#1e40af", "stroke-width": 1.5 }));
      sv.appendChild(el("text", { x: x, y: y + 7, "text-anchor": "middle", "font-size": 19, "font-weight": "bold", fill: "#1e3a8a", "font-family": "Arial,sans-serif" }, u));
      if(i < n - 1){
        var q = zf(A.f[i] / A.f[i + 1]), x2 = x + dx;
        sv.appendChild(el("path", { d: "M" + (x + 14) + " " + (y - 20) + " Q" + (x + dx / 2) + " " + (y - 62) + " " + (x2 - 14) + " " + (y - 20), fill: "none", stroke: "#dc2626", "stroke-width": 2.5, "marker-end": "url(#kpr)" }));
        sv.appendChild(el("text", { x: x + dx / 2, y: y - 46, "text-anchor": "middle", "font-size": 15, "font-weight": "bold", fill: "#dc2626", "font-family": "Arial,sans-serif" }, "· " + q));
        sv.appendChild(el("path", { d: "M" + (x2 - 14) + " " + (y + 20) + " Q" + (x + dx / 2) + " " + (y + 62) + " " + (x + 14) + " " + (y + 20), fill: "none", stroke: "#1e40af", "stroke-width": 2.5, "marker-end": "url(#kpb)" }));
        sv.appendChild(el("text", { x: x + dx / 2, y: y + 58, "text-anchor": "middle", "font-size": 15, "font-weight": "bold", fill: "#1e40af", "font-family": "Arial,sans-serif" }, ": " + q));
      }
    });
  }

  // ---------- 2) Bild mit Füll-Regler ----------
  function bild(){
    var A = ART[art], sv = $("kBild"), n = Number($("kFuell").value); while(sv.lastChild) sv.removeChild(sv.lastChild);
    var blau = "#60a5fa", hell = "#eff6ff", linie = "#1e40af";
    if(art === "laenge"){
      var s = 30, x0 = 30, y0 = 130;
      for(var i = 0; i < 10; i++) sv.appendChild(el("rect", { x: x0 + i * s, y: y0, width: s, height: 40, fill: i < n ? blau : hell, stroke: linie, "stroke-width": 1.5 }));
      sv.appendChild(el("rect", { x: x0, y: y0, width: 10 * s, height: 40, fill: "none", stroke: linie, "stroke-width": 3 }));
      sv.appendChild(el("text", { x: x0 + 5 * s, y: y0 - 16, "text-anchor": "middle", "font-size": 18, "font-weight": "bold", fill: "#1e3a8a" }, "10 cm = 1 dm"));
      for(var j = 0; j <= 10; j++) sv.appendChild(el("text", { x: x0 + j * s, y: y0 + 64, "text-anchor": "middle", "font-size": 12, fill: "#475569" }, j));
      sv.appendChild(el("text", { x: x0 + 10 * s, y: y0 + 82, "text-anchor": "end", "font-size": 13, fill: "#475569" }, "cm"));
    } else if(art === "flaeche"){
      var c = 24, ox = 50, oy = 20;
      for(var k = 0; k < 100; k++){ var r = Math.floor(k / 10), sp = k % 10; sv.appendChild(el("rect", { x: ox + sp * c, y: oy + (9 - r) * c, width: c, height: c, fill: k < n ? blau : hell, stroke: "#93c5fd", "stroke-width": 1 })); }
      sv.appendChild(el("rect", { x: ox, y: oy, width: 10 * c, height: 10 * c, fill: "none", stroke: linie, "stroke-width": 3 }));
      sv.appendChild(el("text", { x: ox + 5 * c, y: oy + 10 * c + 22, "text-anchor": "middle", "font-size": 15, "font-weight": "bold", fill: "#1e3a8a" }, "10 cm = 1 dm"));
      var t = el("text", { x: ox - 14, y: oy + 5 * c, "text-anchor": "middle", "font-size": 15, "font-weight": "bold", fill: "#1e3a8a", transform: "rotate(-90 " + (ox - 14) + " " + (oy + 5 * c) + ")" }, "10 cm = 1 dm"); sv.appendChild(t);
      sv.appendChild(el("text", { x: ox + 10 * c + 8, y: oy + 14, "font-size": 14, "font-weight": "bold", fill: "#1e3a8a" }, "1 dm²"));
    } else {
      // Schrägbild: x nach rechts, y in die Tiefe, z nach oben; 1 Kästchen = 1 cm
      var u = 17, ox2 = 40, oy2 = 268, dk = 0.5;
      var P = function(x, y, z){ return [ox2 + x * u + y * u * dk * 0.7071, oy2 - z * u - y * u * dk * 0.7071]; };
      var poly = function(pts, f, sw){ sv.appendChild(el("polygon", { points: pts.map(function(p){ return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "), fill: f, stroke: linie, "stroke-width": sw || 1 })); };
      var gitter = function(a, b, c2, d, m1, m2){ for(var i = 1; i < m1; i++){ var p = [a[0] + (b[0] - a[0]) * i / m1, a[1] + (b[1] - a[1]) * i / m1], q = [d[0] + (c2[0] - d[0]) * i / m1, d[1] + (c2[1] - d[1]) * i / m1]; sv.appendChild(el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: "#1e40af", "stroke-width": 0.6, opacity: 0.6 })); }
        for(var j = 1; j < m2; j++){ var p2 = [a[0] + (d[0] - a[0]) * j / m2, a[1] + (d[1] - a[1]) * j / m2], q2 = [b[0] + (c2[0] - b[0]) * j / m2, b[1] + (c2[1] - b[1]) * j / m2]; sv.appendChild(el("line", { x1: p2[0], y1: p2[1], x2: q2[0], y2: q2[1], stroke: "#1e40af", "stroke-width": 0.6, opacity: 0.6 })); } };
      var quader = function(x0, x1, y0, y1, z0, z1){
        if(x1 <= x0 || y1 <= y0 || z1 <= z0) return;
        var vorn = [P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1)], oben = [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], rechts = [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)];
        poly(rechts, "#3b82f6"); gitter(rechts[0], rechts[1], rechts[2], rechts[3], y1 - y0, z1 - z0);
        poly(oben, "#93c5fd"); gitter(oben[0], oben[1], oben[2], oben[3], x1 - x0, y1 - y0);
        poly(vorn, blau); gitter(vorn[0], vorn[1], vorn[2], vorn[3], x1 - x0, z1 - z0);
      };
      // Rückwände des großen Würfels (dünn)
      poly([P(0, 10, 0), P(10, 10, 0), P(10, 10, 10), P(0, 10, 10)], "#f8fbff", 1); poly([P(0, 0, 0), P(0, 10, 0), P(0, 10, 10), P(0, 0, 10)], "#f1f6ff", 1); poly([P(0, 0, 0), P(10, 0, 0), P(10, 10, 0), P(0, 10, 0)], "#eef4ff", 1);
      var L = Math.floor(n / 100), R = Math.floor((n % 100) / 10), Z = n % 10;
      quader(0, 10, 0, 10, 0, L);
      quader(0, 10, 10 - R, 10, L, L + 1);
      quader(0, Z, 10 - R - 1, 10 - R, L, L + 1);
      // Kanten des großen Würfels
      [[P(0, 0, 0), P(10, 0, 0)], [P(10, 0, 0), P(10, 0, 10)], [P(10, 0, 10), P(0, 0, 10)], [P(0, 0, 10), P(0, 0, 0)], [P(10, 0, 0), P(10, 10, 0)], [P(10, 0, 10), P(10, 10, 10)], [P(0, 0, 10), P(0, 10, 10)], [P(10, 10, 0), P(10, 10, 10)], [P(0, 10, 10), P(10, 10, 10)]].forEach(function(k){ sv.appendChild(el("line", { x1: k[0][0], y1: k[0][1], x2: k[1][0], y2: k[1][1], stroke: linie, "stroke-width": 2.5 })); });
      var m = P(5, 0, 0); sv.appendChild(el("text", { x: m[0], y: m[1] + 20, "text-anchor": "middle", "font-size": 14, "font-weight": "bold", fill: "#1e3a8a" }, "10 cm = 1 dm"));
      var m2 = P(10, 5, 0); sv.appendChild(el("text", { x: m2[0] + 8, y: m2[1] + 22, "font-size": 14, "font-weight": "bold", fill: "#1e3a8a" }, "10 cm = 1 dm"));
      var m3 = P(0, 0, 5); var tt = el("text", { x: m3[0] - 14, y: m3[1], "text-anchor": "middle", "font-size": 14, "font-weight": "bold", fill: "#1e3a8a", transform: "rotate(-90 " + (m3[0] - 14) + " " + m3[1] + ")" }, "10 cm = 1 dm"); sv.appendChild(tt);
      var m4 = P(10, 10, 10); sv.appendChild(el("text", { x: m4[0] - 10, y: m4[1] - 8, "text-anchor": "end", "font-size": 14, "font-weight": "bold", fill: "#1e3a8a" }, "1 dm³ = 1 l"));
    }
    var gr = A.max === 10 ? "dm" : A.gross;
    $("kStand").textContent = n + " " + A.klein + " = " + zf(n / A.max) + " " + gr + (art === "volumen" ? " = " + n + " ml" : "");
  }

  // ---------- 3) Einheitentafel ----------
  function slots(A){ return A.e.map(function(u, i){ return i === 0 ? A.stellen : Math.round(Math.log10(A.f[i - 1] / A.f[i])); }); }
  function tafel(){
    var A = ART[art], S = slots(A), N = S.reduce(function(a, b){ return a + b; }, 0), ki = Number($("kKomma").value);
    var s = $("kWert").value.trim().replace(/\s/g, "").replace(",", "."), x = s === "" ? NaN : Number(s), ein = $("kEinh").value;
    $("kKommaW").textContent = A.e[ki];
    var fehler = "", ganz = 0;
    if(!isFinite(x) || x < 0) fehler = tx("keineZahl");
    else { ganz = Math.round(x * A.f[A.e.indexOf(ein)]); if(String(ganz).length > N) fehler = tx("zuGross"); }
    $("kFehler").textContent = fehler;
    var ziff = fehler ? "" : String(ganz), start = N - ziff.length; // erste signifikante Stelle
    var ende = []; S.reduce(function(a, b, i){ ende[i] = a + b - 1; return a + b; }, 0);
    var c = ende[ki];
    var h = "<tr>" + A.e.map(function(u, i){ return '<th colspan="' + S[i] + '"' + (i === ki ? ' class="an"' : "") + ">" + u + "</th>" + (i === ki && i < A.e.length - 1 ? '<th class="kz"></th>' : ""); }).join("") + "</tr><tr>";
    var einh = 0;
    for(var j = 0; j < N; j++){
      while(j > ende[einh]) einh++;
      var cls = [], d = "";
      if(!fehler){
        if(j >= start){ d = ziff[j - start]; if(ganz === 0 && j < N - 1) d = ""; }
        if(!d && ((j <= c && j >= Math.min(start, c)) || (j > c && j < start))){ d = "0"; cls.push("null"); }
        if(j === N - 1 && ganz === 0){ d = "0"; }
      }
      if(j === ende[einh] && j !== c) cls.push("grenze");
      if(einh === ki) cls.push("an");
      h += '<td class="' + cls.join(" ") + '">' + d + "</td>";
      if(j === c && j < N - 1) h += '<td class="kz">,</td>';
    }
    $("kTafel").innerHTML = h + "</tr>";
    $("kLesen").innerHTML = fehler ? "" : A.e.map(function(u, i){ var w = zf(ganz / A.f[i]) + " " + u; return i === ki ? "<b>" + w + "</b>" : w; }).join(" = ");
  }

  function allesNeu(neueArt){
    var A = ART[art];
    $("kWahl").querySelectorAll("button").forEach(function(b){ b.classList.toggle("aktiv", b.dataset.a === art); });
    $("kFuell").max = A.max; $("kFuell").step = art === "volumen" ? 10 : 1;
    if(neueArt){ $("kFuell").value = art === "laenge" ? 4 : art === "flaeche" ? 37 : 370;
      $("kEinh").innerHTML = A.e.map(function(u){ return "<option>" + u + "</option>"; }).join("");
      $("kEinh").value = A.start[1]; var sv = String(A.start[0]); $("kWert").value = komma() ? sv.replace(".", ",") : sv;
      $("kKomma").max = A.e.length - 1; $("kKomma").value = A.e.indexOf(A.start[1]); }
    $("kWarum").textContent = tx("w_" + art);
    $("kFormel").innerHTML = art === "volumen" ? "10 cm · 10 cm · 10 cm = 1000 cm³<br>1 dm · 1 dm · 1 dm = 1 dm³" : ""; $("kLiter").textContent = art === "volumen" ? tx("liter") : "";
    treppe(); bild(); tafel();
  }
  function texte(){
    ["titel", "treppeH", "treppeT", "bildH", "tafelH", "tafelT", "wertL", "kommaL"].forEach(function(k){ $("k" + k.charAt(0).toUpperCase() + k.slice(1)).textContent = tx(k); });
    $("kFuellL").textContent = tx("fuellen");
    $("kWahl").querySelectorAll("button").forEach(function(b){ b.textContent = tx(b.dataset.a); });
    var w = $("kWert").value; if(w){ $("kWert").value = komma() ? w.replace(".", ",") : w.replace(",", "."); }
    allesNeu(false);
  }
  $("kWahl").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ art = b.dataset.a; allesNeu(true); }); });
  $("kFuell").addEventListener("input", bild);
  $("kKomma").addEventListener("input", tafel); $("kWert").addEventListener("input", tafel);
  $("kEinh").addEventListener("change", function(){ $("kKomma").value = ART[art].e.indexOf($("kEinh").value); tafel(); });
  var altSet = window.setLang; window.setLang = function(l){ altSet(l); texte(); };
  allesNeu(true); texte();
})();
