// /binome/flaeche.js – Flächenmodell der binomischen Formeln mit Schiebereglern für a und b (9 Sprachen).
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TX = {
    de: { titel: "Flächenmodell – warum die Formeln stimmen", text: "Ziehe an den Reglern: Das Bild und die Rechnung ändern sich sofort.", f1: "1. Formel", f2: "2. Formel", f3: "3. Formel",
      e1: "Das große Quadrat hat die Seite a + b. Es besteht aus dem Quadrat a², dem kleinen Quadrat b² und zwei gleichen Rechtecken a · b – deshalb 2ab.",
      e2: "Vom Quadrat a² schneidet man rechts und unten je einen Streifen a · b ab. Dabei wird das Eckquadrat b² zweimal weggenommen – deshalb kommt + b² wieder dazu. Übrig bleibt (a − b)².",
      e3: "Vom Quadrat a² fehlt das Eckquadrat b². Den unteren Streifen (a − b) · b legt man rechts an – es entsteht ein Rechteck mit den Seiten a + b und a − b.",
      bKlein: "Für diese Formel muss b kleiner als a sein – b wurde angepasst." },
    en: { titel: "Area model – why the formulas are true", text: "Move the sliders: the picture and the calculation change at once.", f1: "1st formula", f2: "2nd formula", f3: "3rd formula",
      e1: "The big square has side a + b. It is made of the square a², the small square b² and two equal rectangles a · b – hence 2ab.",
      e2: "From the square a² you cut off a strip a · b on the right and one at the bottom. The corner square b² is removed twice – so + b² is added back. What remains is (a − b)².",
      e3: "The corner square b² is missing from the square a². Move the bottom strip (a − b) · b to the right side – you get a rectangle with sides a + b and a − b.",
      bKlein: "For this formula b must be smaller than a – b has been adjusted." },
    es: { titel: "Modelo de áreas: por qué se cumplen las fórmulas", text: "Mueve los controles: el dibujo y el cálculo cambian al instante.", f1: "1.ª fórmula", f2: "2.ª fórmula", f3: "3.ª fórmula",
      e1: "El cuadrado grande tiene lado a + b. Está formado por el cuadrado a², el cuadrado pequeño b² y dos rectángulos iguales a · b; por eso 2ab.",
      e2: "Al cuadrado a² se le quita una franja a · b a la derecha y otra abajo. El cuadrado de la esquina b² se quita dos veces, por eso se vuelve a sumar + b². Queda (a − b)².",
      e3: "Al cuadrado a² le falta el cuadrado de la esquina b². La franja de abajo (a − b) · b se coloca a la derecha: sale un rectángulo de lados a + b y a − b.",
      bKlein: "En esta fórmula b debe ser menor que a: se ha ajustado b." },
    zh: { titel: "面积模型——公式为什么成立", text: "拖动滑块：图形和计算会立刻改变。", f1: "完全平方和", f2: "完全平方差", f3: "平方差",
      e1: "大正方形的边长是 a + b。它由正方形 a²、小正方形 b² 和两个相同的长方形 a · b 组成——所以是 2ab。",
      e2: "从正方形 a² 的右边和下边各剪掉一条 a · b。角上的小正方形 b² 被剪掉了两次——所以要再加上 b²。剩下的就是 (a − b)²。",
      e3: "正方形 a² 缺了角上的 b²。把下面的长条 (a − b) · b 移到右边——就得到边长为 a + b 和 a − b 的长方形。",
      bKlein: "这个公式要求 b 小于 a——已调整 b。" },
    fr: { titel: "Modèle des aires : pourquoi les formules sont vraies", text: "Bouge les curseurs : la figure et le calcul changent tout de suite.", f1: "1ʳᵉ identité", f2: "2ᵉ identité", f3: "3ᵉ identité",
      e1: "Le grand carré a pour côté a + b. Il est formé du carré a², du petit carré b² et de deux rectangles identiques a · b – d’où 2ab.",
      e2: "Au carré a² on enlève une bande a · b à droite et une en bas. Le petit carré du coin b² est enlevé deux fois – on rajoute donc + b². Il reste (a − b)².",
      e3: "Au carré a² il manque le carré du coin b². On déplace la bande du bas (a − b) · b à droite : on obtient un rectangle de côtés a + b et a − b.",
      bKlein: "Pour cette formule, b doit être plus petit que a – b a été ajusté." },
    ru: { titel: "Модель площадей – почему формулы верны", text: "Двигай ползунки: рисунок и расчёт сразу меняются.", f1: "Квадрат суммы", f2: "Квадрат разности", f3: "Разность квадратов",
      e1: "Большой квадрат имеет сторону a + b. Он состоит из квадрата a², маленького квадрата b² и двух одинаковых прямоугольников a · b – отсюда 2ab.",
      e2: "От квадрата a² отрезают справа и снизу по полосе a · b. Угловой квадрат b² при этом вычли дважды – поэтому прибавляют + b². Остаётся (a − b)².",
      e3: "У квадрата a² не хватает углового квадрата b². Нижнюю полосу (a − b) · b переносят вправо – получается прямоугольник со сторонами a + b и a − b.",
      bKlein: "Для этой формулы b должно быть меньше a – b исправлено." },
    ar: { titel: "نموذج المساحات – لماذا تصح القوانين", text: "حرّك المؤشرات: يتغير الرسم والحساب فورًا.", f1: "مربع مجموع", f2: "مربع فرق", f3: "فرق مربعين",
      e1: "طول ضلع المربع الكبير a + b. يتكوّن من المربع a² والمربع الصغير b² ومستطيلين متساويين a · b – لذلك 2ab.",
      e2: "من المربع a² نقص شريطًا a · b من اليمين وآخر من الأسفل. يُطرح مربع الزاوية b² مرتين – لذلك نضيف + b². يبقى (a − b)².",
      e3: "ينقص المربعَ a² مربعُ الزاوية b². ننقل الشريط السفلي (a − b) · b إلى الجانب – فيتكوّن مستطيل ضلعاه a + b و a − b.",
      bKlein: "في هذه الصيغة يجب أن يكون b أصغر من a – تم تعديل b." },
    ja: { titel: "面積で考える――公式が成り立つわけ", text: "スライダーを動かすと、図と計算がすぐに変わるよ。", f1: "和の平方", f2: "差の平方", f3: "和と差の積",
      e1: "大きな正方形の 1 辺は a + b。正方形 a²、小さな正方形 b²、同じ長方形 a · b が 2 つでできている――だから 2ab。",
      e2: "正方形 a² から右と下の帯 a · b を 1 本ずつ切りとる。角の正方形 b² を 2 回引いたので + b² をもどす。残りが (a − b)²。",
      e3: "正方形 a² から角の正方形 b² がぬけている。下の帯 (a − b) · b を右へ移すと、たて a − b、横 a + b の長方形になる。",
      bKlein: "この公式では b は a より小さくないといけないので、b を直したよ。" },
    pt: { titel: "Modelo de áreas – por que as fórmulas valem", text: "Mova os controles: a figura e o cálculo mudam na hora.", f1: "1.ª fórmula", f2: "2.ª fórmula", f3: "3.ª fórmula",
      e1: "O quadrado grande tem lado a + b. É formado pelo quadrado a², pelo quadrado pequeno b² e por dois retângulos iguais a · b – por isso 2ab.",
      e2: "Do quadrado a² corta-se uma faixa a · b à direita e outra embaixo. O quadradinho do canto b² é tirado duas vezes – por isso soma-se + b² de volta. Sobra (a − b)².",
      e3: "Ao quadrado a² falta o quadradinho do canto b². A faixa de baixo (a − b) · b vai para o lado direito – forma-se um retângulo de lados a + b e a − b.",
      bKlein: "Nesta fórmula b precisa ser menor que a – b foi ajustado." }
  };
  function $(id){ return document.getElementById(id); }
  function tx(k){ return (TX[lang] || TX.de)[k]; }
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  var form = 1;
  var box = document.createElement("section"); box.className = "fm-karte"; box.id = "fmKarte";
  box.innerHTML = '<h2 id="fmTitel"></h2><p class="fm-text" id="fmText"></p><div class="fm-wahl" id="fmWahl"><button type="button" data-f="1"></button><button type="button" data-f="2"></button><button type="button" data-f="3"></button></div>' +
    '<div class="fm-regler" dir="ltr"><label><b>a</b> <input type="range" id="fmA" min="1" max="9" step="1" value="5"> <b id="fmAW"></b></label><label><b>b</b> <input type="range" id="fmB" min="1" max="6" step="1" value="3"> <b id="fmBW"></b></label></div>' +
    '<p class="fm-hinweis" id="fmHinweis"></p><div class="fm-unten"><svg id="fmSvg" viewBox="0 0 640 340"></svg><div><p class="fm-rech" id="fmRech" dir="ltr"></p><p class="fm-text" id="fmErkl"></p></div></div>';
  var main = document.querySelector("main"); main.parentNode.insertBefore(box, main.nextSibling);
  var css = document.createElement("style");
  css.textContent = ".fm-karte{max-width:900px;margin:18px auto;padding:16px;background:#fff;border:2px solid #b0b0b8;border-radius:16px;color:#1f2937;box-sizing:border-box}" +
    ".fm-karte h2{margin:0 0 6px;color:#1565c0;font-size:22px}.fm-text{margin:6px 0;line-height:1.5;color:#334155}" +
    ".fm-wahl{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.fm-wahl button{transition:none;opacity:1;padding:8px 14px;border:2px solid #b0b0b8;border-radius:30px;background:#fff;color:#334155;font:bold 15px Arial,sans-serif;cursor:pointer}" +
    ".fm-wahl button.aktiv{background:#1565c0;border-color:#1565c0;color:#fff}" +
    ".fm-regler{display:flex;flex-wrap:wrap;gap:8px 22px;margin:6px 0}.fm-regler label{display:inline-flex;gap:8px;align-items:center;font-size:18px}.fm-regler input{width:180px;max-width:55vw}" +
    "#fmSvg{width:100%;height:auto;display:block}.fm-rech{font-size:20px;font-weight:bold;color:#1e3a8a;line-height:1.6;margin:6px 0}" +
    ".fm-hinweis{color:#b45309;font-weight:bold;margin:2px 0}.fm-hinweis:empty{display:none}" +
    // PC: Bild links, Rechnung rechts (spart Platz)
    "@media (min-width:860px){.fm-unten{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;align-items:center}}";
  document.head.appendChild(css);
  var FA = "#93c5fd", FB = "#fca5a5", FAB = "#fde68a", FR = "#86efac", RAND = "#1e3a8a";
  function rechteck(sv, x, y, w, h, f, txt, extra){
    var r = el("rect", { x: x, y: y, width: w, height: h, fill: f, stroke: RAND, "stroke-width": 2 }); if(extra) for(var k in extra) r.setAttribute(k, extra[k]); sv.appendChild(r);
    if(txt && w > 26 && h > 18) sv.appendChild(el("text", { x: x + w / 2, y: y + h / 2 + 6, "text-anchor": "middle", "font-size": Math.min(20, Math.max(12, Math.min(w, h) / 3)), "font-weight": "bold", fill: "#1f2937", "font-family": "Arial,sans-serif" }, txt));
  }
  function mass(sv, x1, y1, x2, y2, txt, seite){
    var dx = seite === "o" ? 0 : -16, dy = seite === "o" ? -10 : 0;
    sv.appendChild(el("line", { x1: x1 + dx, y1: y1 + dy, x2: x2 + dx, y2: y2 + dy, stroke: "#475569", "stroke-width": 1.5 }));
    sv.appendChild(el("text", { x: (x1 + x2) / 2 + (seite === "o" ? 0 : -24), y: (y1 + y2) / 2 + (seite === "o" ? -16 : 6), "text-anchor": "middle", "font-size": 16, "font-weight": "bold", fill: "#475569", "font-family": "Arial,sans-serif" }, txt));
  }
  function zeichnen(){
    var a = Number($("fmA").value), b = Number($("fmB").value), sv = $("fmSvg"), hinweis = "";
    if(form !== 1 && b >= a){ b = a - 1; if(b < 1){ a = 2; $("fmA").value = 2; b = 1; } $("fmB").value = b; hinweis = tx("bKlein"); }
    $("fmHinweis").textContent = hinweis; $("fmAW").textContent = a; $("fmBW").textContent = b;
    while(sv.lastChild) sv.removeChild(sv.lastChild);
    var ox = 60, oy = 40;
    if(form === 1){
      var u = 270 / (a + b), A = a * u, B = b * u;
      rechteck(sv, ox, oy, A, A, FA, "a²"); rechteck(sv, ox + A, oy, B, A, FAB, "ab"); rechteck(sv, ox, oy + A, A, B, FAB, "ab"); rechteck(sv, ox + A, oy + A, B, B, FB, "b²");
      mass(sv, ox, oy, ox + A, oy, "a", "o"); mass(sv, ox + A, oy, ox + A + B, oy, "b", "o"); mass(sv, ox, oy, ox, oy + A, "a", "l"); mass(sv, ox, oy + A, ox, oy + A + B, "b", "l");
      $("fmRech").innerHTML = "(a + b)² = a² + 2ab + b²<br>(" + a + " + " + b + ")² = " + a + "² + 2 · " + a + " · " + b + " + " + b + "²<br>" + (a + b) * (a + b) + " = " + a * a + " + " + 2 * a * b + " + " + b * b;
    } else if(form === 2){
      var u2 = 270 / a, A2 = a * u2, B2 = b * u2, R2 = A2 - B2;
      rechteck(sv, ox, oy, R2, R2, FR, "(a − b)²"); rechteck(sv, ox + R2, oy, B2, R2, FAB, "ab"); rechteck(sv, ox, oy + R2, R2, B2, FAB, "ab"); rechteck(sv, ox + R2, oy + R2, B2, B2, "#f59e0b", "b²");
      sv.appendChild(el("rect", { x: ox + R2, y: oy, width: B2, height: A2, fill: "none", stroke: "#b45309", "stroke-width": 3, "stroke-dasharray": "8 5" }));
      sv.appendChild(el("rect", { x: ox, y: oy + R2, width: A2, height: B2, fill: "none", stroke: "#b45309", "stroke-width": 3, "stroke-dasharray": "8 5" }));
      mass(sv, ox, oy, ox + R2, oy, "a − b", "o"); mass(sv, ox + R2, oy, ox + A2, oy, "b", "o"); mass(sv, ox, oy, ox, oy + A2, "a", "l");
      $("fmRech").innerHTML = "(a − b)² = a² − 2ab + b²<br>(" + a + " − " + b + ")² = " + a + "² − 2 · " + a + " · " + b + " + " + b + "²<br>" + (a - b) * (a - b) + " = " + a * a + " − " + 2 * a * b + " + " + b * b;
    } else {
      var u3 = Math.min(230 / a, 250 / (a + b)), A3 = a * u3, B3 = b * u3, R3 = A3 - B3, x2 = ox + A3 + 120;
      // links: a² ohne Eckquadrat b²
      rechteck(sv, ox, oy, A3, R3, FA, "a · (a − b)"); rechteck(sv, ox, oy + R3, R3, B3, FR, "");
      rechteck(sv, ox + R3, oy + R3, B3, B3, "#e5e7eb", "−b²", { "stroke-dasharray": "6 4" });
      mass(sv, ox, oy, ox + A3, oy, "a", "o"); mass(sv, ox, oy, ox, oy + A3, "a", "l");
      sv.appendChild(el("text", { x: ox + A3 + 40, y: oy + A3 / 2, "text-anchor": "middle", "font-size": 30, "font-weight": "bold", fill: "#475569" }, "="));
      // rechts: Rechteck (a + b) · (a − b)
      rechteck(sv, x2, oy, A3, R3, FA, "a · (a − b)"); rechteck(sv, x2 + A3, oy, B3, R3, FR, "");
      mass(sv, x2, oy, x2 + A3 + B3, oy, "a + b", "o"); mass(sv, x2, oy, x2, oy + R3, "a − b", "l");
      $("fmRech").innerHTML = "(a + b)(a − b) = a² − b²<br>(" + a + " + " + b + ")(" + a + " − " + b + ") = " + a + "² − " + b + "²<br>" + (a + b) + " · " + (a - b) + " = " + a * a + " − " + b * b + " = " + (a * a - b * b);
    }
    $("fmErkl").textContent = tx("e" + form);
  }
  function texte(){
    $("fmTitel").textContent = tx("titel"); $("fmText").textContent = tx("text");
    $("fmWahl").querySelectorAll("button").forEach(function(b){ b.textContent = tx("f" + b.dataset.f); b.classList.toggle("aktiv", Number(b.dataset.f) === form); });
    zeichnen();
  }
  $("fmWahl").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ form = Number(b.dataset.f); texte(); }); });
  ["fmA", "fmB"].forEach(function(id){ $(id).addEventListener("input", zeichnen); });
  var altSet = window.setLang; window.setLang = function(l){ altSet(l); texte(); };
  texte();
})();
