// ============================================================
// koerper/becken.js – Sachaufgabe „Schwimmbecken“ im Reiter Üben (#becken): Becken mit geradem oder
// schrägem Boden, wird nur bis f cm unter den Rand gefüllt, Pumpe mit q Litern pro Minute.
// a) Volumen ganzes Becken, b) Wassermenge, c) Füllzeit. Je 2 Versuche, dann Lösungsweg (ein „=“ pro Zeile).
// Eigene Texte (9 Sprachen), Sprache aus MS_MATH_LANG / msMathLang; hängt sich an MS_LANG.apply.
// ============================================================
(function(){
  var TX = {
    de: { leg: "Zeichen: l = Länge · b = Breite · h, h₁, h₂ = Tiefe · f = Abstand vom Wasser bis zum Rand · h_W, w₁, w₂ = Wasserhöhe · V = Volumen des Beckens · V_W = Wassermenge · q = Pumpleistung · t = Zeit", h: "Sachaufgabe: Schwimmbecken füllen", var: ["gerader Boden", "schräger Boden"], tE: "Ein Schwimmbecken ist {l} m lang, {b} m breit und überall {h} m tief. Es wird nur bis {f} cm unter den Rand gefüllt. Eine Pumpe schafft {q} Liter pro Minute.", tS: "Ein Schwimmbecken ist {l} m lang und {b} m breit. Am flachen Ende ist es {h1} m tief, am tiefen Ende {h2} m – der Boden fällt gleichmäßig ab. Es wird nur bis {f} cm unter den Rand gefüllt. Eine Pumpe schafft {q} Liter pro Minute.", qa: "a) Volumen des ganzen Beckens:", qb: "b) Wie viel Wasser kommt hinein?", qc: "c) Wie lange dauert das Füllen? (in Stunden, eine Stelle)", pruef: "Prüfen", neu: "Neues Becken", loes: "Lösungsweg zeigen", ok: "Richtig!", nein: "Noch nicht – versuch es noch einmal.", wegH: "Lösungsweg:", wH: "Wasserhöhe", rand: "Rand", wasser: "Wasser", merke: "Achtung, Falle: Wird das Becken nicht bis zum Rand gefüllt, rechnet man für das Wasser mit der Wasserhöhe, nicht mit der Beckentiefe. Und: 1 m³ = 1000 Liter.", liter: "Liter", hmin: "{h} h {m} min" },
    en: { leg: "Symbols: l = length · b = width · h, h₁, h₂ = depth · f = gap between water and edge · h_W, w₁, w₂ = water height · V = volume of the pool · V_W = amount of water · q = pump rate · t = time", h: "Word problem: filling a swimming pool", var: ["flat floor", "sloping floor"], tE: "A swimming pool is {l} m long, {b} m wide and {h} m deep everywhere. It is only filled up to {f} cm below the edge. A pump delivers {q} litres per minute.", tS: "A swimming pool is {l} m long and {b} m wide. At the shallow end it is {h1} m deep, at the deep end {h2} m – the floor slopes evenly. It is only filled up to {f} cm below the edge. A pump delivers {q} litres per minute.", qa: "a) Volume of the whole pool:", qb: "b) How much water goes in?", qc: "c) How long does filling take? (in hours, one decimal)", pruef: "Check", neu: "New pool", loes: "Show solution", ok: "Correct!", nein: "Not yet – try again.", wegH: "Solution:", wH: "water height", rand: "edge", wasser: "water", merke: "Watch out: if the pool is not filled to the edge, use the water height for the water, not the depth of the pool. And: 1 m³ = 1000 litres.", liter: "litres", hmin: "{h} h {m} min" },
    es: { leg: "Signos: l = largo · b = ancho · h, h₁, h₂ = profundidad · f = distancia del agua al borde · h_W, w₁, w₂ = altura del agua · V = volumen de la piscina · V_W = cantidad de agua · q = caudal de la bomba · t = tiempo", h: "Problema: llenar una piscina", var: ["fondo plano", "fondo inclinado"], tE: "Una piscina mide {l} m de largo, {b} m de ancho y {h} m de profundidad en todas partes. Solo se llena hasta {f} cm por debajo del borde. Una bomba da {q} litros por minuto.", tS: "Una piscina mide {l} m de largo y {b} m de ancho. En el extremo poco profundo tiene {h1} m, en el profundo {h2} m: el fondo baja de forma uniforme. Solo se llena hasta {f} cm por debajo del borde. Una bomba da {q} litros por minuto.", qa: "a) Volumen de toda la piscina:", qb: "b) ¿Cuánta agua cabe?", qc: "c) ¿Cuánto tarda en llenarse? (en horas, un decimal)", pruef: "Comprobar", neu: "Otra piscina", loes: "Ver la solución", ok: "¡Correcto!", nein: "Todavía no: inténtalo otra vez.", wegH: "Solución:", wH: "altura del agua", rand: "borde", wasser: "agua", merke: "Cuidado, trampa: si la piscina no se llena hasta el borde, para el agua se usa la altura del agua, no la profundidad. Y: 1 m³ = 1000 litros.", liter: "litros", hmin: "{h} h {m} min" },
    zh: { leg: "符号：l = 长 · b = 宽 · h、h₁、h₂ = 深 · f = 水面到池边的距离 · h_W、w₁、w₂ = 水深 · V = 泳池容积 · V_W = 水量 · q = 水泵流量 · t = 时间", h: "应用题：给游泳池注水", var: ["平底", "斜底"], tE: "一个游泳池长 {l} 米、宽 {b} 米，各处深 {h} 米。水只注到离池边 {f} 厘米处。水泵每分钟注水 {q} 升。", tS: "一个游泳池长 {l} 米、宽 {b} 米。浅的一端深 {h1} 米，深的一端深 {h2} 米——池底均匀倾斜。水只注到离池边 {f} 厘米处。水泵每分钟注水 {q} 升。", qa: "a) 整个泳池的容积：", qb: "b) 注入多少水？", qc: "c) 注满需要多长时间？（小时，保留一位小数）", pruef: "检查", neu: "换一个泳池", loes: "显示解题过程", ok: "对了！", nein: "还不对——再试一次。", wegH: "解题过程：", wH: "水深", rand: "池边", wasser: "水", merke: "注意陷阱：泳池没有注满到池边时，算水量要用水深，而不是池深。还有：1 m³ = 1000 升。", liter: "升", hmin: "{h} 小时 {m} 分" },
    fr: { leg: "Signes : l = longueur · b = largeur · h, h₁, h₂ = profondeur · f = écart entre l’eau et le bord · h_W, w₁, w₂ = hauteur d’eau · V = volume de la piscine · V_W = quantité d’eau · q = débit de la pompe · t = temps", h: "Problème : remplir une piscine", var: ["fond plat", "fond en pente"], tE: "Une piscine mesure {l} m de long, {b} m de large et {h} m de profondeur partout. On ne la remplit que jusqu’à {f} cm sous le bord. Une pompe débite {q} litres par minute.", tS: "Une piscine mesure {l} m de long et {b} m de large. Du côté peu profond elle mesure {h1} m, du côté profond {h2} m – le fond descend régulièrement. On ne la remplit que jusqu’à {f} cm sous le bord. Une pompe débite {q} litres par minute.", qa: "a) Volume de toute la piscine :", qb: "b) Quelle quantité d’eau y entre ?", qc: "c) Combien de temps dure le remplissage ? (en heures, un chiffre après la virgule)", pruef: "Vérifier", neu: "Autre piscine", loes: "Voir la solution", ok: "Juste !", nein: "Pas encore – essaie encore.", wegH: "Solution :", wH: "hauteur d’eau", rand: "bord", wasser: "eau", merke: "Attention au piège : si la piscine n’est pas remplie jusqu’au bord, on calcule l’eau avec la hauteur d’eau, pas avec la profondeur. Et : 1 m³ = 1000 litres.", liter: "litres", hmin: "{h} h {m} min" },
    ru: { leg: "Обозначения: l = длина · b = ширина · h, h₁, h₂ = глубина · f = расстояние от воды до края · h_W, w₁, w₂ = высота воды · V = объём бассейна · V_W = объём воды · q = подача насоса · t = время", h: "Задача: наполняем бассейн", var: ["ровное дно", "наклонное дно"], tE: "Бассейн длиной {l} м, шириной {b} м и глубиной {h} м везде. Его наполняют только до уровня на {f} см ниже края. Насос подаёт {q} литров в минуту.", tS: "Бассейн длиной {l} м и шириной {b} м. У мелкого края глубина {h1} м, у глубокого {h2} м – дно понижается равномерно. Его наполняют только до уровня на {f} см ниже края. Насос подаёт {q} литров в минуту.", qa: "a) Объём всего бассейна:", qb: "b) Сколько воды войдёт?", qc: "c) Сколько времени займёт наполнение? (в часах, один знак после запятой)", pruef: "Проверить", neu: "Новый бассейн", loes: "Показать решение", ok: "Верно!", nein: "Пока нет – попробуй ещё раз.", wegH: "Решение:", wH: "высота воды", rand: "край", wasser: "вода", merke: "Ловушка: если бассейн наполняют не до края, для воды берут высоту воды, а не глубину бассейна. И: 1 м³ = 1000 литров.", liter: "литров", hmin: "{h} ч {m} мин" },
    ar: { leg: "الرموز: l = الطول · b = العرض · h و h₁ و h₂ = العمق · f = المسافة من الماء إلى الحافة · h_W و w₁ و w₂ = ارتفاع الماء · V = حجم الحوض · V_W = كمية الماء · q = تدفق المضخة · t = الزمن", h: "مسألة: ملء حوض سباحة", var: ["قاع مستوٍ", "قاع مائل"], tE: "حوض سباحة طوله {l} م وعرضه {b} م وعمقه {h} م في كل مكان. يُملأ فقط حتى {f} سم تحت الحافة. مضخة تضخ {q} لترًا في الدقيقة.", tS: "حوض سباحة طوله {l} م وعرضه {b} م. عمقه عند الطرف الضحل {h1} م وعند الطرف العميق {h2} م – والقاع ينحدر بانتظام. يُملأ فقط حتى {f} سم تحت الحافة. مضخة تضخ {q} لترًا في الدقيقة.", qa: "أ) حجم الحوض كله:", qb: "ب) كم ماءً يدخل؟", qc: "ج) كم يستغرق الملء؟ (بالساعات، منزلة عشرية واحدة)", pruef: "تحقق", neu: "حوض جديد", loes: "اعرض الحل", ok: "صحيح!", nein: "ليس بعد – حاول مرة أخرى.", wegH: "الحل:", wH: "ارتفاع الماء", rand: "الحافة", wasser: "ماء", merke: "انتبه للفخ: إذا لم يُملأ الحوض حتى الحافة، نحسب الماء بارتفاع الماء لا بعمق الحوض. و: 1 م³ = 1000 لتر.", liter: "لتر", hmin: "{h} س {m} د" },
    ja: { leg: "記号：l = 長さ · b = はば · h、h₁、h₂ = 深さ · f = 水面からふちまで · h_W、w₁、w₂ = 水の高さ · V = プールの容積 · V_W = 水の量 · q = ポンプの量 · t = 時間", h: "文章題：プールに水を入れる", var: ["底が平ら", "底がななめ"], tE: "プールは長さ {l} m、はば {b} m、深さはどこも {h} m です。水はふちから {f} cm 下までしか入れません。ポンプは 1 分に {q} リットル入れます。", tS: "プールは長さ {l} m、はば {b} m です。浅い方のはしの深さは {h1} m、深い方は {h2} m で、底は同じ割合でかたむいています。水はふちから {f} cm 下までしか入れません。ポンプは 1 分に {q} リットル入れます。", qa: "a) プール全体の容積：", qb: "b) 水は何 m³ 入る？", qc: "c) 水を入れるのに何時間かかる？（小数第 1 位まで）", pruef: "確かめる", neu: "別のプール", loes: "解き方を見る", ok: "正解！", nein: "まだです――もう一度。", wegH: "解き方：", wH: "水の高さ", rand: "ふち", wasser: "水", merke: "ひっかけに注意：ふちまで入れないときは、水の量はプールの深さではなく水の高さで計算します。そして 1 m³ = 1000 リットル。", liter: "リットル", hmin: "{h} 時間 {m} 分" },
    pt: { leg: "Símbolos: l = comprimento · b = largura · h, h₁, h₂ = profundidade · f = distância da água à borda · h_W, w₁, w₂ = altura da água · V = volume da piscina · V_W = quantidade de água · q = caudal da bomba · t = tempo", h: "Problema: encher uma piscina", var: ["fundo plano", "fundo inclinado"], tE: "Uma piscina tem {l} m de comprimento, {b} m de largura e {h} m de profundidade em todo o lado. Só é cheia até {f} cm abaixo da borda. Uma bomba dá {q} litros por minuto.", tS: "Uma piscina tem {l} m de comprimento e {b} m de largura. Na ponta baixa tem {h1} m de profundidade, na ponta funda {h2} m – o fundo desce de forma regular. Só é cheia até {f} cm abaixo da borda. Uma bomba dá {q} litros por minuto.", qa: "a) Volume de toda a piscina:", qb: "b) Quanta água entra?", qc: "c) Quanto tempo demora a encher? (em horas, uma casa decimal)", pruef: "Verificar", neu: "Outra piscina", loes: "Ver a resolução", ok: "Certo!", nein: "Ainda não – tenta outra vez.", wegH: "Resolução:", wH: "altura da água", rand: "borda", wasser: "água", merke: "Cuidado com a armadilha: se a piscina não for cheia até à borda, a água calcula-se com a altura da água, não com a profundidade. E: 1 m³ = 1000 litros.", liter: "litros", hmin: "{h} h {m} min" }
  };
  var lang = window.MS_MATH_LANG; try { lang = localStorage.getItem("msMathLang") || lang; } catch(e){}
  if(!TX[lang]) lang = "de";
  function T(k, v){ var s = (TX[lang] || TX.de)[k]; if(v && typeof s === "string") for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function subs(h){ return h.replace(/_([A-Za-z])/g, "<sub>$1</sub>"); }
  function kom(){ return ["en", "zh", "ja", "ar"].indexOf(lang) < 0; }
  function z(v, d){ if(d == null) d = 2; var s = String(Math.round(v * Math.pow(10, d)) / Math.pow(10, d)); return kom() ? s.replace(".", ",") : s; }
  function gz(n){ var s = String(Math.round(n)), sep = kom() ? " " : ","; return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep); }
  function wahl(a){ return a[Math.floor(Math.random() * a.length)]; }
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/[a-zA-Z³]+$/, ""); if(kom()) s = s.replace(/\./g, "").replace(",", "."); else s = s.replace(/,/g, ""); return /^\d*\.?\d+$/.test(s) ? +s : NaN; }
  var B = null, Z = {};
  function neu(){
    var schr = Math.random() < 0.45, l = wahl([10, 12, 15, 20, 25]), b = wahl([4, 5, 6, 8, 10]), f = wahl([10, 15, 20, 25]), q = wahl([200, 250, 300, 400, 500]);
    if(schr){ var h1 = wahl([0.8, 1, 1.2]), h2 = wahl([1.8, 2, 2.4, 3]); B = { s: true, l: l, b: b, h1: h1, h2: h2, f: f, q: q }; }
    else B = { s: false, l: l, b: b, h: wahl([1.2, 1.4, 1.5, 1.6, 1.8, 2]), f: f, q: q };
    var fm = f / 100;
    if(B.s){ B.V = (B.h1 + B.h2) / 2 * l * b; B.VW = ((B.h1 - fm) + (B.h2 - fm)) / 2 * l * b; }
    else { B.V = l * b * B.h; B.VW = l * b * (B.h - fm); }
    B.min = B.VW * 1000 / q; B.t = B.min / 60; Z = {};
  }
  function wege(){
    var fm = B.f / 100, a, bw, c, m = Math.round(B.min);
    if(B.s){
      a = ["V = (h₁ + h₂) : 2 · l · b", "V = (" + z(B.h1) + " + " + z(B.h2) + ") : 2 · " + B.l + " · " + B.b, "V = " + z(B.V) + " m³"];
      bw = ["w₁ = h₁ − f", "w₁ = " + z(B.h1) + " − " + z(fm), "w₁ = " + z(B.h1 - fm) + " m", "w₂ = h₂ − f", "w₂ = " + z(B.h2) + " − " + z(fm), "w₂ = " + z(B.h2 - fm) + " m", "V_W = (w₁ + w₂) : 2 · l · b", "V_W = (" + z(B.h1 - fm) + " + " + z(B.h2 - fm) + ") : 2 · " + B.l + " · " + B.b, "V_W = " + z(B.VW) + " m³", z(B.VW) + " m³ = " + gz(B.VW * 1000) + " " + T("liter")];
    } else {
      a = ["V = l · b · h", "V = " + B.l + " · " + B.b + " · " + z(B.h), "V = " + z(B.V) + " m³"];
      bw = ["h_W = h − f", "h_W = " + z(B.h) + " − " + z(fm), "h_W = " + z(B.h - fm) + " m", "V_W = l · b · h_W", "V_W = " + B.l + " · " + B.b + " · " + z(B.h - fm), "V_W = " + z(B.VW) + " m³", z(B.VW) + " m³ = " + gz(B.VW * 1000) + " " + T("liter")];
    }
    c = ["t = V_W : q", "t = " + gz(B.VW * 1000) + " L : " + B.q + " L/min", "t = " + z(B.min, 1) + " min", "t = (" + z(B.min, 1) + " : 60) h", "t ≈ " + z(B.t, 1) + " h", "t ≈ " + T("hmin", { h: Math.floor(m / 60), m: m % 60 })];
    return { a: a, b: bw, c: c };
  }
  var karte = document.createElement("div"); karte.className = "karte"; karte.id = "becken";
  var css = document.createElement("style");
  css.textContent = "#becken h2{margin:0 0 6px;font-size:19px;color:#1565c0}#becken .bkT{background:#e0f2fe;border-radius:10px;padding:10px 12px;font-size:16.5px}#becken svg{width:100%;max-width:520px;height:auto;display:block;margin:6px auto}" +
    "#becken .bkQ{border-top:1px solid #dbe5f3;padding-top:8px;margin-top:8px}#becken .bkQ input{width:120px}#becken .bkW{display:grid;gap:2px;font:600 16px system-ui,sans-serif;direction:ltr;margin:6px 0 0;padding-inline-start:12px;border-inline-start:3px solid #b0b0b8}";
  document.head.appendChild(css);
  function zeichne(){
    var W = 520, H = 230, x0 = 30, x1 = 490, yR = 50, fm = B.f / 100, tief = B.s ? B.h2 : B.h, k = 150 / tief;
    var yb1 = yR + (B.s ? B.h1 : B.h) * k, yb2 = yR + tief * k, yW = yR + fm * k;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img">';
    s += '<path d="M' + x0 + " " + yW + " L" + x1 + " " + yW + " L" + x1 + " " + yb2 + " L" + x0 + " " + yb1 + 'Z" fill="rgba(56,189,248,0.55)"/>';
    s += '<path d="M' + (x0 - 20) + " " + yR + " L" + x0 + " " + yR + " L" + x0 + " " + yb1 + " L" + x1 + " " + yb2 + " L" + x1 + " " + yR + " L" + (x1 + 20) + " " + yR + '" fill="none" stroke="#1a2233" stroke-width="3" stroke-linejoin="round"/>';
    s += '<line x1="' + x0 + '" y1="' + yR + '" x2="' + x1 + '" y2="' + yR + '" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6 5"/>';
    s += '<text x="' + (x0 + 6) + '" y="' + (yR - 6) + '" font-size="13" fill="#475569">' + esc(T("rand")) + "</text>";
    s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (yW + 24) + '" font-size="15" font-weight="700" fill="#0c4a6e" text-anchor="middle">' + esc(T("wasser")) + "</text>";
    s += '<line x1="' + (x1 + 10) + '" y1="' + yR + '" x2="' + (x1 + 10) + '" y2="' + yW + '" stroke="#7c3aed" stroke-width="2.5"/><text x="' + (x1 + 16) + '" y="' + ((yR + yW) / 2 + 5) + '" font-size="13" font-weight="700" fill="#7c3aed">f</text>';
    s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (Math.max(yb1, yb2) + 22) + '" font-size="14" font-weight="700" text-anchor="middle">l = ' + B.l + " m</text>";
    if(B.s){ s += '<text x="' + (x0 + 6) + '" y="' + ((yR + yb1) / 2 + 16) + '" font-size="14" font-weight="700">h₁</text><text x="' + (x1 - 26) + '" y="' + ((yR + yb2) / 2 + 16) + '" font-size="14" font-weight="700">h₂</text>'; }
    else s += '<text x="' + (x1 - 22) + '" y="' + ((yR + yb2) / 2 + 16) + '" font-size="14" font-weight="700">h</text>';
    return s + "</svg>";
  }
  function bau(){
    if(!B) neu();
    var txt = B.s ? T("tS", { l: B.l, b: B.b, h1: z(B.h1), h2: z(B.h2), f: B.f, q: B.q }) : T("tE", { l: B.l, b: B.b, h: z(B.h), f: B.f, q: B.q });
    var W = wege(), h = "<h2>" + esc(T("h")) + '</h2><p class="bkT" data-nofz>' + esc(txt) + "</p>" + zeichne();
    [["a", T("qa"), "m³", B.V, 0.006], ["b", T("qb"), "m³", B.VW, 0.006], ["c", T("qc"), "h", B.t, 0.02]].forEach(function(q){
      var s = Z[q[0]] || {};
      h += '<div class="bkQ"><label><b>' + esc(q[1]) + '</b> <input class="zahl" data-q="' + q[0] + '" inputmode="decimal" value="' + esc(s.e || "") + '"' + (s.ok ? " readonly" : "") + "> " + q[2] + '</label> <button type="button" class="knopf" data-p="' + q[0] + '">' + esc(T("pruef")) + '</button> <span class="' + (s.ok ? "gut" : s.ok === false ? "schlecht" : "") + '">' + (s.ok ? esc(T("ok")) : s.ok === false ? esc(T("nein")) : "") + "</span>" +
        (s.ok || s.n >= 2 || Z.alle ? '<div class="bkW">' + W[q[0]].map(function(x){ return "<span>" + subs(esc(x)) + "</span>"; }).join("") + "</div>" : "") + "</div>";
    });
    h += '<p class="zeile muted" data-nofz>' + subs(esc(T("leg"))) + '</p><p class="merke">' + esc(T("merke")) + '</p><p><button type="button" class="knopf hell" id="bkL">' + esc(T("loes")) + '</button> <button type="button" class="knopf hell" id="bkN">↻ ' + esc(T("neu")) + "</button></p>";
    karte.innerHTML = h;
    function pr(k){ var inp = karte.querySelector('input[data-q="' + k + '"]'), w = k === "a" ? B.V : k === "b" ? B.VW : B.t, tol = k === "c" ? Math.max(0.051, w * 0.01) : Math.max(0.006, w * 0.003);
      var v = lies(inp.value); if(isNaN(v)) return; var s = Z[k] || { n: 0 }; s.e = inp.value; s.ok = Math.abs(v - w) <= tol; if(!s.ok) s.n = (s.n || 0) + 1; Z[k] = s;
      if(s.ok && typeof msRichtig === "function") try { msRichtig(); } catch(x){}
      bau(); var nx = karte.querySelector('input[data-q="' + (s.ok ? { a: "b", b: "c", c: "c" }[k] : k) + '"]'); if(nx && !nx.readOnly) nx.focus(); }
    karte.querySelectorAll("[data-p]").forEach(function(b){ b.addEventListener("click", function(){ pr(b.dataset.p); }); });
    karte.querySelectorAll("input[data-q]").forEach(function(i){ i.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); pr(i.dataset.q); } }); i.addEventListener("input", function(){ Z[i.dataset.q] = Z[i.dataset.q] || { n: 0 }; Z[i.dataset.q].e = i.value; }); });
    karte.querySelector("#bkL").addEventListener("click", function(){ Z.alle = true; bau(); });
    karte.querySelector("#bkN").addEventListener("click", function(){ neu(); bau(); });
  }
  function einhaengen(){
    var ziel = document.getElementById("s_ueben"); if(!ziel) return;
    ziel.appendChild(karte); bau();
    if(location.hash === "#becken"){ var b = document.querySelector('[data-tab="ueben"]'); if(b) b.click(); setTimeout(function(){ karte.scrollIntoView({ block: "start" }); }, 250); }
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", einhaengen); else einhaengen();
  var alt = window.MS_LANG && window.MS_LANG.apply;
  if(window.MS_LANG) window.MS_LANG.apply = function(l){ if(alt) alt(l); if(TX[l]){ lang = l; bau(); } };
})();
