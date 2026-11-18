// ============================================================
// einmaleins/napier.js – Karte „Gitter-Multiplikation (Napier)“ am Ende der Einmaleins-Seite.
// Kästchen = Ziffer oben · Ziffer rechts (Zehner links oben, Einer rechts unten), dann die schrägen
// Streifen von rechts unten aufaddieren (mit Übertrag). Schritt für Schritt oder alles auf einmal.
// Eigene Texte (9 Sprachen), Sprache aus MS_MATH_LANG / msMathLang; hängt sich an MS_LANG.apply.
// ============================================================
(function(){
  var TX = {
    de: { titel: "Gitter-Multiplikation (Napier)", erkl: "Große Zahlen malnehmen, wenn man nur das Einmaleins kann: Diese Gittermethode kannten schon indische und arabische Rechner, Fibonacci brachte sie 1202 nach Europa. Der Schotte John Napier baute daraus 1617 Rechenstäbchen mit dem Einmaleins darauf – „Napiers Knochen“.", a: "Zahl oben:", b: "Zahl rechts:", schritt: "Nächster Schritt", alles: "Alles zeigen", neu: "Neue Zahlen", z1: "1. Jedes Kästchen: Ziffer oben mal Ziffer rechts – die Zehner kommen links oben hin, die Einer rechts unten.", z2: "2. Dann zählt man die schrägen Streifen zusammen, von rechts unten nach links oben. Ist eine Summe 10 oder mehr, wandert der Zehner als Übertrag in den nächsten Streifen.", z3: "3. Das Ergebnis liest man links von oben nach unten und dann unten von links nach rechts.", diag: "Streifen {k}:", schreib: "→ {d} hinschreiben", ueb: "→ {d} hinschreiben, {u} als Übertrag", erg: "Ergebnis:", fertig: "Fertig!" },
    en: { titel: "Lattice multiplication (Napier)", erkl: "Multiplying big numbers when you only know your times tables: Indian and Arab calculators already knew this lattice method, and Fibonacci brought it to Europe in 1202. In 1617 the Scot John Napier turned it into calculating rods with the times tables on them – “Napier’s bones”.", a: "number on top:", b: "number on the right:", schritt: "Next step", alles: "Show everything", neu: "New numbers", z1: "1. Each box: digit on top times digit on the right – the tens go in the top left, the ones in the bottom right.", z2: "2. Then add up the diagonal strips, from the bottom right to the top left. If a sum is 10 or more, the tens move on to the next strip as a carry.", z3: "3. Read the result down the left side and then along the bottom from left to right.", diag: "Strip {k}:", schreib: "→ write {d}", ueb: "→ write {d}, carry {u}", erg: "Result:", fertig: "Done!" },
    es: { titel: "Multiplicación en celosía (Napier)", erkl: "Multiplicar números grandes sabiendo solo las tablas: los calculistas indios y árabes ya conocían este método de la celosía, y Fibonacci lo trajo a Europa en 1202. En 1617 el escocés John Napier construyó con él unas varillas de cálculo con las tablas, los «huesos de Napier».", a: "número de arriba:", b: "número de la derecha:", schritt: "Siguiente paso", alles: "Mostrar todo", neu: "Números nuevos", z1: "1. Cada casilla: cifra de arriba por cifra de la derecha; las decenas van arriba a la izquierda y las unidades abajo a la derecha.", z2: "2. Luego se suman las franjas diagonales, de abajo a la derecha hacia arriba a la izquierda. Si una suma es 10 o más, la decena pasa a la franja siguiente como llevada.", z3: "3. El resultado se lee a la izquierda de arriba abajo y luego abajo de izquierda a derecha.", diag: "Franja {k}:", schreib: "→ se escribe {d}", ueb: "→ se escribe {d} y se lleva {u}", erg: "Resultado:", fertig: "¡Listo!" },
    zh: { titel: "格子乘法（纳皮尔）", erkl: "只会乘法表也能算大数乘法：印度和阿拉伯的计算者早就知道这种格子算法，斐波那契在 1202 年把它带到欧洲。1617 年，苏格兰人约翰·纳皮尔用它做成刻有乘法表的计算棒——“纳皮尔骨筹”。", a: "上面的数：", b: "右边的数：", schritt: "下一步", alles: "全部显示", neu: "新的数", z1: "1. 每个格子：上面的数字乘右边的数字——十位写在左上，个位写在右下。", z2: "2. 然后从右下到左上把斜条里的数相加。如果和是 10 或更大，十位作为进位加到下一条。", z3: "3. 结果先沿左边从上往下读，再沿底边从左往右读。", diag: "第 {k} 条：", schreib: "→ 写 {d}", ueb: "→ 写 {d}，进 {u}", erg: "结果：", fertig: "完成！" },
    fr: { titel: "Multiplication par jalousies (Napier)", erkl: "Multiplier de grands nombres en ne connaissant que les tables : les calculateurs indiens et arabes connaissaient déjà cette méthode de la grille, et Fibonacci l’apporta en Europe en 1202. En 1617, l’Écossais John Napier en fit des réglettes portant les tables – les « bâtons de Napier ».", a: "nombre du haut :", b: "nombre de droite :", schritt: "Étape suivante", alles: "Tout montrer", neu: "Nouveaux nombres", z1: "1. Chaque case : chiffre du haut fois chiffre de droite – les dizaines en haut à gauche, les unités en bas à droite.", z2: "2. Puis on additionne les bandes en diagonale, de en bas à droite vers en haut à gauche. Si une somme vaut 10 ou plus, la dizaine passe à la bande suivante comme retenue.", z3: "3. On lit le résultat à gauche de haut en bas, puis en bas de gauche à droite.", diag: "Bande {k} :", schreib: "→ on écrit {d}", ueb: "→ on écrit {d}, retenue {u}", erg: "Résultat :", fertig: "Terminé !" },
    ru: { titel: "Умножение решёткой (Непер)", erkl: "Как умножать большие числа, если знаешь только таблицу умножения: индийские и арабские вычислители знали этот способ решётки, а Фибоначчи принёс его в Европу в 1202 году. В 1617 году шотландец Джон Непер сделал из него счётные палочки с таблицей умножения – «палочки Непера».", a: "число сверху:", b: "число справа:", schritt: "Следующий шаг", alles: "Показать всё", neu: "Новые числа", z1: "1. В каждой клетке: цифра сверху умножить на цифру справа – десятки пишутся слева вверху, единицы справа внизу.", z2: "2. Затем складывают косые полосы, справа снизу налево вверх. Если сумма 10 или больше, десяток переходит в следующую полосу.", z3: "3. Результат читают слева сверху вниз, а потом внизу слева направо.", diag: "Полоса {k}:", schreib: "→ пишем {d}", ueb: "→ пишем {d}, {u} переносим", erg: "Результат:", fertig: "Готово!" },
    ar: { titel: "الضرب بالشبكة (نابير)", erkl: "ضرب أعداد كبيرة لمن يعرف جدول الضرب فقط: عرف الحاسبون الهنود والعرب طريقة الشبكة هذه، ونقلها فيبوناتشي إلى أوروبا عام 1202. وفي عام 1617 صنع الإسكتلندي جون نابير منها عيدانًا للحساب عليها جدول الضرب – «عظام نابير».", a: "العدد في الأعلى:", b: "العدد على اليمين:", schritt: "الخطوة التالية", alles: "اعرض الكل", neu: "أعداد جديدة", z1: "1. كل خانة: رقم الأعلى ضرب رقم اليمين – العشرات أعلى اليسار، والآحاد أسفل اليمين.", z2: "2. ثم نجمع الشرائط المائلة من أسفل اليمين إلى أعلى اليسار. إذا كان المجموع 10 أو أكثر انتقلت العشرة إلى الشريط التالي محمولًا.", z3: "3. تُقرأ النتيجة على اليسار من الأعلى إلى الأسفل، ثم في الأسفل من اليسار إلى اليمين.", diag: "الشريط {k}:", schreib: "← اكتب {d}", ueb: "← اكتب {d} واحمل {u}", erg: "النتيجة:", fertig: "انتهى!" },
    ja: { titel: "格子かけ算（ネイピア）", erkl: "九九だけで大きな数のかけ算：この格子の方法はインドやアラビアの計算家がすでに知っていて、1202 年にフィボナッチがヨーロッパに伝えました。1617 年、スコットランドのジョン・ネイピアはそれを九九のついた計算棒にしました――「ネイピアの骨」です。", a: "上の数：", b: "右の数：", schritt: "次へ", alles: "全部見せる", neu: "新しい数", z1: "1. どのマスも、上の数字 × 右の数字。十の位は左上、一の位は右下に書きます。", z2: "2. 次に、ななめの帯を右下から左上へ順にたします。和が 10 以上なら、十の位をくり上がりとして次の帯へ。", z3: "3. 答えは、左側を上から下へ、そのあと下側を左から右へ読みます。", diag: "帯 {k}：", schreib: "→ {d} を書く", ueb: "→ {d} を書き、{u} くり上がり", erg: "答え：", fertig: "できあがり！" },
    pt: { titel: "Multiplicação em grelha (Napier)", erkl: "Multiplicar números grandes sabendo só a tabuada: os calculadores indianos e árabes já conheciam este método da grelha, e Fibonacci trouxe-o para a Europa em 1202. Em 1617 o escocês John Napier fez com ele varetas de cálculo com a tabuada – os «ossos de Napier».", a: "número de cima:", b: "número da direita:", schritt: "Passo seguinte", alles: "Mostrar tudo", neu: "Números novos", z1: "1. Cada quadrado: algarismo de cima vezes algarismo da direita – as dezenas ficam em cima à esquerda, as unidades em baixo à direita.", z2: "2. Depois somam-se as faixas na diagonal, de baixo à direita para cima à esquerda. Se uma soma for 10 ou mais, a dezena passa para a faixa seguinte como transporte.", z3: "3. O resultado lê-se à esquerda de cima para baixo e depois em baixo da esquerda para a direita.", diag: "Faixa {k}:", schreib: "→ escreve-se {d}", ueb: "→ escreve-se {d} e vai {u}", erg: "Resultado:", fertig: "Pronto!" }
  };
  var lang = window.MS_MATH_LANG; try { lang = localStorage.getItem("msMathLang") || lang; } catch(e){}
  if(!TX[lang]) lang = "de";
  function T(k, v){ var s = (TX[lang] || TX.de)[k]; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  var NS = "http://www.w3.org/2000/svg", A = 47, B = 23, schritt = 0;
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  var css = document.createElement("style");
  css.textContent = ".np-karte{max-width:900px;margin:24px auto;padding:16px 18px;background:#fff;border:2px solid #b0b0b8;border-radius:16px;font:16px/1.5 system-ui,sans-serif;color:#1a2233}" +
    ".np-karte h2{margin:0 0 6px;color:#1565c0;font-size:21px}.np-karte p{margin:6px 0}.np-zeile{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:8px 0}" +
    ".np-zeile input{width:90px;font:700 18px system-ui,sans-serif;padding:6px 8px;border:2px solid #b0b0b8;border-radius:10px}.np-k{font:700 16px system-ui,sans-serif;padding:8px 14px;border-radius:12px;border:0;background:#e3eefc;color:#1565c0;cursor:pointer}.np-k.voll{background:#1565c0;color:#fff}" +
    ".np-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:14px;align-items:start}.np-grid svg{width:100%;max-width:420px;height:auto;display:block;margin:0 auto}" +
    ".np-weg{margin:0;padding-inline-start:0;list-style:none;font-size:16px;direction:ltr}.np-weg li{margin:3px 0}.np-erg{font:800 22px system-ui,sans-serif;color:#7c3aed}@media print{.np-karte{display:none}}";
  document.head.appendChild(css);
  var karte = document.createElement("section"); karte.className = "np-karte no-print"; karte.id = "napier";
  function bau(){
    karte.innerHTML = "<h2>" + T("titel") + "</h2><p>" + T("erkl") + '</p><div class="np-zeile"><label>' + T("a") + ' <input id="npA" inputmode="numeric" maxlength="4" data-nofit></label><label>' + T("b") + ' <input id="npB" inputmode="numeric" maxlength="3" data-nofit></label></div>' +
      '<div class="np-zeile"><button type="button" class="np-k voll" id="npS">' + T("schritt") + '</button><button type="button" class="np-k" id="npAll">' + T("alles") + '</button><button type="button" class="np-k" id="npNeu">' + T("neu") + "</button></div>" +
      '<div class="np-grid"><div id="npSvg"></div><div><p>' + T("z1") + "</p><p>" + T("z2") + "</p><p>" + T("z3") + '</p><ol class="np-weg" id="npWeg"></ol><p class="np-erg" id="npErg"></p></div></div>';
    if(lang === "ar") karte.dir = "rtl";
    karte.querySelector("#npA").value = A; karte.querySelector("#npB").value = B;
    karte.querySelector("#npA").addEventListener("input", function(){ var v = parseInt(this.value, 10); if(v > 0 && v < 10000){ A = v; schritt = 0; zeichne(); } });
    karte.querySelector("#npB").addEventListener("input", function(){ var v = parseInt(this.value, 10); if(v > 0 && v < 1000){ B = v; schritt = 0; zeichne(); } });
    karte.querySelector("#npS").addEventListener("click", function(){ schritt++; zeichne(); });
    karte.querySelector("#npAll").addEventListener("click", function(){ schritt = 999; zeichne(); });
    karte.querySelector("#npNeu").addEventListener("click", function(){ A = 10 + Math.floor(Math.random() * 990); B = 2 + Math.floor(Math.random() * 98); if(B % 10 === 0) B++; karte.querySelector("#npA").value = A; karte.querySelector("#npB").value = B; schritt = 0; zeichne(); });
    zeichne();
  }
  function rechne(){
    var a = String(A).split("").map(Number), b = String(B).split("").map(Number), nA = a.length, nB = b.length, Z = [], D = [];
    for(var j = 0; j < nB; j++) for(var i = 0; i < nA; i++){ var p = a[i] * b[j], k = (nA - 1 - i) + (nB - 1 - j); Z.push({ i: i, j: j, p: p, z: Math.floor(p / 10), e: p % 10, k: k }); }
    var nD = nA + nB, u = 0;
    for(var d = 0; d < nD; d++){
      var teile = []; Z.forEach(function(c){ if(c.k === d) teile.push(c.e); if(c.k + 1 === d) teile.push(c.z); });
      var s = teile.reduce(function(x, y){ return x + y; }, 0) + u, rest = s % 10, neu = Math.floor(s / 10);
      D.push({ teile: teile, uein: u, s: s, d: rest, u: neu }); u = neu;
    }
    return { a: a, b: b, nA: nA, nB: nB, Z: Z, D: D };
  }
  function zeichne(){
    var R = rechne(), S = 64, x0 = 52, y0 = 46, W = x0 + R.nA * S + 46, H = y0 + R.nB * S + 46, nZ = R.Z.length, zeigZ = Math.min(schritt, nZ), zeigD = Math.max(0, Math.min(schritt - nZ, R.D.length));
    var s = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img" });
    var F = ["#ede9fe", "#fef3c7"];
    // Felder (Dreiecke) in Streifenfarben
    R.Z.forEach(function(c, n){
      var x = x0 + c.i * S, y = y0 + c.j * S, an = n < zeigZ, akt = zeigD > 0 && zeigD <= R.D.length;
      var fO = F[(c.k + 1) % 2], fU = F[c.k % 2];
      if(zeigD && c.k + 1 === zeigD - 1) fO = "#c4b5fd"; if(zeigD && c.k === zeigD - 1) fU = "#c4b5fd";
      s.appendChild(el("path", { d: "M" + x + " " + y + "L" + (x + S) + " " + y + "L" + x + " " + (y + S) + "Z", fill: fO }));
      s.appendChild(el("path", { d: "M" + (x + S) + " " + y + "L" + (x + S) + " " + (y + S) + "L" + x + " " + (y + S) + "Z", fill: fU }));
      s.appendChild(el("rect", { x: x, y: y, width: S, height: S, fill: "none", stroke: n === zeigZ - 1 && !zeigD ? "#7c3aed" : "#1a2233", "stroke-width": n === zeigZ - 1 && !zeigD ? 3.5 : 1.8 }));
      s.appendChild(el("line", { x1: x + S, y1: y, x2: x, y2: y + S, stroke: "#1a2233", "stroke-width": 1.2 }));
      if(an){ s.appendChild(el("text", { x: x + S * 0.3, y: y + S * 0.42, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#1a2233" }, String(c.z))); s.appendChild(el("text", { x: x + S * 0.7, y: y + S * 0.86, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#1a2233" }, String(c.e))); }
    });
    // Ziffern oben und rechts
    R.a.forEach(function(d, i){ s.appendChild(el("text", { x: x0 + i * S + S / 2, y: y0 - 14, "text-anchor": "middle", "font-size": 26, "font-weight": 800, fill: "#1565c0" }, String(d))); });
    R.b.forEach(function(d, j){ s.appendChild(el("text", { x: x0 + R.nA * S + 20, y: y0 + j * S + S / 2 + 9, "text-anchor": "middle", "font-size": 26, "font-weight": 800, fill: "#b8860b" }, String(d))); });
    s.appendChild(el("text", { x: x0 - 30, y: y0 - 14, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#1a2233" }, "×"));
    // Ergebnisziffern der Streifen
    for(var k = 0; k < zeigD; k++){
      var px, py; if(k < R.nA){ px = x0 + (R.nA - 1 - k) * S + S * 0.1; py = y0 + R.nB * S + 28; } else { var r = R.nB - 1 - (k - R.nA); px = x0 - 22; py = y0 + r * S + S * 0.2; }
      if(k === R.D.length - 1 && R.D[k].d === 0 && R.D.length > 1) continue;
      s.appendChild(el("text", { x: px, y: py, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: "#7c3aed" }, String(R.D[k].d)));
      if(R.D[k].u && k + 1 < R.D.length){ var qx, qy; if(k + 1 < R.nA){ qx = x0 + (R.nA - 2 - k) * S + S * 0.95; qy = y0 + R.nB * S + 14; } else { var r2 = R.nB - 1 - (k + 1 - R.nA); qx = x0 - 8; qy = y0 + r2 * S + S * 0.95; } s.appendChild(el("text", { x: qx, y: qy, "text-anchor": "middle", "font-size": 14, "font-weight": 700, fill: "#b8860b" }, "+" + R.D[k].u)); }
    }
    var box = karte.querySelector("#npSvg"); box.innerHTML = ""; box.appendChild(s);
    var L = [];
    for(var n = 0; n < zeigZ; n++){ var c = R.Z[n]; L.push(R.a[c.i] + " · " + R.b[c.j] + " = " + c.p); }
    for(var m = 0; m < zeigD; m++){ var Dd = R.D[m], summe = Dd.teile.concat(Dd.uein ? [Dd.uein] : []); if(!summe.length) summe = [0];
      L.push(T("diag", { k: m + 1 }) + " " + (summe.length > 1 ? summe.join(" + ") + " = " : "") + Dd.s + " " + (Dd.u ? T("ueb", { d: Dd.d, u: Dd.u }) : T("schreib", { d: Dd.d }))); }
    karte.querySelector("#npWeg").innerHTML = L.map(function(x){ return "<li>" + x + "</li>"; }).join("");
    var fertig = zeigD >= R.D.length;
    karte.querySelector("#npErg").textContent = fertig ? T("erg") + " " + A + " · " + B + " = " + (A * B) : "";
    karte.querySelector("#npS").disabled = fertig;
  }
  function einhaengen(){
    var main = document.querySelector("main") || document.body;
    main.appendChild(karte); bau();
    if(location.hash === "#napier") setTimeout(function(){ karte.scrollIntoView({ block: "start" }); }, 200);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", einhaengen); else einhaengen();
  var alt = window.MS_LANG && window.MS_LANG.apply;
  if(window.MS_LANG) window.MS_LANG.apply = function(l){ if(alt) alt(l); if(TX[l]){ lang = l; bau(); } };
})();
