// ============================================================
// graphen/zeichnen.js – Reiter „Graph zeichnen“ (🆕 24.11.2026)
// Zu einer Geraden oder Parabel die Wertetabelle ausrechnen, die Punkte ins
// Koordinatensystem tippen (Einrasten auf ganze Zahlen) und prüfen.
// 2 Versuche, dann Lösung mit Rechnung; nach dem Lösen erscheint der Graph durch die Punkte.
// Reiter „Ablesen“ (app.js) / „Zeichnen“ werden hier umgeschaltet (#ablesen / #zeichnen).
// Texte: eigenes Wörterbuch ZX (9 Sprachen). Rechnen mit /funktionen/kern.js (FK).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  var ZX = {
    de: { tabA: "Ablesen", tabZ: "Zeichnen", h: "Graph zeichnen", intro: "Rechne die y-Werte aus, trag sie in die Wertetabelle ein und tippe die Punkte ins Koordinatensystem. Dann zeigt sich der Graph.", auf: "Zeichne den Graphen von", tipp: "Antippen setzt einen Punkt, nochmal antippen entfernt ihn.", gesetzt: "{n} Punkte gesetzt", pruef: "Prüfen", neu: "Neue Aufgabe", mix: "gemischt", lin: "Geraden", par: "Parabeln", fehlY: "{n} y-Wert(e) stimmen noch nicht (rot markiert).", fehlP: "Bei den Punkten fehlen noch {f}, {z} liegen falsch (rot).", leer: "Bitte zuerst alle y-Werte eintragen.", nochmal: "Noch nicht ganz – schau dir die roten Stellen an und versuch es noch einmal.", ok: "Richtig! Alle Werte und Punkte stimmen – so sieht der Graph aus.", falsch: "Hier ist die Lösung:", weg: "Rechnung:", so: "So geht's: x einsetzen, y ausrechnen, Punkt (x | y) eintragen – dann die Punkte verbinden.", punkte: "{p} von {n} richtig" },
    en: { tabA: "Read off", tabZ: "Draw", h: "Draw the graph", intro: "Work out the y-values, enter them in the table of values and tap the points into the coordinate system. Then the graph appears.", auf: "Draw the graph of", tipp: "Tap to set a point, tap again to remove it.", gesetzt: "{n} points set", pruef: "Check", neu: "New problem", mix: "mixed", lin: "lines", par: "parabolas", fehlY: "{n} y-value(s) are not right yet (marked red).", fehlP: "Points: {f} still missing, {z} in the wrong place (red).", leer: "Please enter all y-values first.", nochmal: "Not quite – look at the red spots and try again.", ok: "Correct! All values and points are right – this is what the graph looks like.", falsch: "Here is the solution:", weg: "Working:", so: "How it works: substitute x, work out y, plot the point (x | y) – then join the points.", punkte: "{p} of {n} correct" },
    es: { tabA: "Leer", tabZ: "Dibujar", h: "Dibujar la gráfica", intro: "Calcula los valores de y, escríbelos en la tabla y toca los puntos en el sistema de coordenadas. Entonces aparece la gráfica.", auf: "Dibuja la gráfica de", tipp: "Tocar pone un punto; otro toque lo quita.", gesetzt: "{n} puntos colocados", pruef: "Comprobar", neu: "Nuevo ejercicio", mix: "mezclado", lin: "rectas", par: "parábolas", fehlY: "{n} valor(es) de y aún no son correctos (en rojo).", fehlP: "Puntos: faltan {f}, {z} están mal (en rojo).", leer: "Escribe primero todos los valores de y.", nochmal: "Casi: mira las marcas rojas e inténtalo otra vez.", ok: "¡Correcto! Todos los valores y puntos están bien: así es la gráfica.", falsch: "Esta es la solución:", weg: "Cálculo:", so: "Así se hace: sustituye x, calcula y, marca el punto (x | y) y une los puntos.", punkte: "{p} de {n} correctas" },
    zh: { tabA: "读图", tabZ: "画图", h: "画函数图像", intro: "算出 y 值，填进数值表，再在坐标系中点出这些点。图像就出来了。", auf: "画出下面函数的图像：", tipp: "点按设置一个点，再点一次删除。", gesetzt: "已设 {n} 个点", pruef: "检查", neu: "新题", mix: "混合", lin: "直线", par: "抛物线", fehlY: "有 {n} 个 y 值还不对（红色标出）。", fehlP: "点：还缺 {f} 个，{z} 个位置不对（红色）。", leer: "请先填好所有 y 值。", nochmal: "还差一点——看看红色的地方，再试一次。", ok: "对了！所有数值和点都正确——这就是函数图像。", falsch: "答案如下：", weg: "计算：", so: "方法：代入 x，算出 y，描出点 (x | y)，再把点连起来。", punkte: "{n} 题中对了 {p} 题" },
    fr: { tabA: "Lire", tabZ: "Tracer", h: "Tracer la courbe", intro: "Calcule les valeurs de y, écris-les dans le tableau de valeurs et touche les points dans le repère. La courbe apparaît alors.", auf: "Trace la courbe de", tipp: "Toucher place un point, toucher à nouveau l’enlève.", gesetzt: "{n} points placés", pruef: "Vérifier", neu: "Nouvel exercice", mix: "mélangé", lin: "droites", par: "paraboles", fehlY: "{n} valeur(s) de y ne sont pas encore justes (en rouge).", fehlP: "Points : il en manque {f}, {z} sont mal placés (en rouge).", leer: "Écris d’abord toutes les valeurs de y.", nochmal: "Pas tout à fait – regarde les endroits rouges et réessaie.", ok: "Juste ! Toutes les valeurs et tous les points sont corrects – voici la courbe.", falsch: "Voici la solution :", weg: "Calcul :", so: "Méthode : remplacer x, calculer y, placer le point (x | y) – puis relier les points.", punkte: "{p} sur {n} justes" },
    ru: { tabA: "Читать", tabZ: "Строить", h: "Построй график", intro: "Вычисли значения y, впиши их в таблицу и отметь точки в системе координат. Тогда появится график.", auf: "Построй график функции", tipp: "Касание ставит точку, повторное касание убирает её.", gesetzt: "Отмечено точек: {n}", pruef: "Проверить", neu: "Новое задание", mix: "вперемешку", lin: "прямые", par: "параболы", fehlY: "{n} значений y пока неверны (отмечены красным).", fehlP: "Точки: не хватает {f}, {z} стоят неверно (красные).", leer: "Сначала впиши все значения y.", nochmal: "Почти – посмотри на красные места и попробуй ещё раз.", ok: "Верно! Все значения и точки правильные – вот так выглядит график.", falsch: "Вот решение:", weg: "Вычисление:", so: "Как это делается: подставить x, вычислить y, отметить точку (x | y) – и соединить точки.", punkte: "{p} из {n} верно" },
    ar: { tabA: "القراءة", tabZ: "الرسم", h: "ارسم المنحنى", intro: "احسب قيم y واكتبها في جدول القيم، ثم المس النقاط في نظام الإحداثيات. عندها يظهر المنحنى.", auf: "ارسم منحنى الدالة", tipp: "اللمس يضع نقطة، ولمسة أخرى تزيلها.", gesetzt: "عدد النقاط: {n}", pruef: "تحقق", neu: "تمرين جديد", mix: "مختلط", lin: "مستقيمات", par: "قطوع مكافئة", fehlY: "{n} من قيم y ليست صحيحة بعد (بالأحمر).", fehlP: "النقاط: ينقص {f}، و{z} في مكان خاطئ (بالأحمر).", leer: "اكتب كل قيم y أولًا.", nochmal: "ليس تمامًا – انظر إلى المواضع الحمراء وحاول مرة أخرى.", ok: "صحيح! كل القيم والنقاط صحيحة – هكذا يبدو المنحنى.", falsch: "هذا هو الحل:", weg: "الحساب:", so: "الطريقة: عوّض x، احسب y، ضع النقطة (x | y) – ثم صِل النقاط.", punkte: "{p} من {n} صحيحة" },
    ja: { tabA: "読み取る", tabZ: "かく", h: "グラフをかく", intro: "y の値を計算して表に書き入れ、座標の中に点をタップしよう。するとグラフが見えてきます。", auf: "次の関数のグラフをかこう：", tipp: "タップで点を置き、もう一度タップで消します。", gesetzt: "点の数：{n}", pruef: "答え合わせ", neu: "新しい問題", mix: "まぜる", lin: "直線", par: "放物線", fehlY: "y の値が {n} 個まだちがいます（赤）。", fehlP: "点：あと {f} 個足りません、{z} 個はちがう場所です（赤）。", leer: "先に y の値を全部書き入れよう。", nochmal: "おしい！赤いところを見てもう一度。", ok: "正解！値も点も全部合っています。これがグラフです。", falsch: "答えはこちら：", weg: "計算：", so: "やり方：x を代入して y を計算し、点 (x | y) を打って、点を結ぶ。", punkte: "{n} 問中 {p} 問正解" },
    pt: { tabA: "Ler", tabZ: "Desenhar", h: "Desenhar o gráfico", intro: "Calcule os valores de y, escreva-os na tabela e toque os pontos no sistema de coordenadas. Então aparece o gráfico.", auf: "Desenhe o gráfico de", tipp: "Tocar coloca um ponto, outro toque o remove.", gesetzt: "{n} pontos colocados", pruef: "Verificar", neu: "Novo exercício", mix: "misturado", lin: "retas", par: "parábolas", fehlY: "{n} valor(es) de y ainda não estão certos (em vermelho).", fehlP: "Pontos: faltam {f}, {z} estão no lugar errado (em vermelho).", leer: "Digite primeiro todos os valores de y.", nochmal: "Quase – veja as marcas vermelhas e tente de novo.", ok: "Certo! Todos os valores e pontos estão corretos – assim é o gráfico.", falsch: "Esta é a solução:", weg: "Cálculo:", so: "Como fazer: substituir x, calcular y, marcar o ponto (x | y) – e ligar os pontos.", punkte: "{p} de {n} certas" }
  };

  (function(){ var X = {"de": {"fehlF": "Es fehlen noch {f} Punkte.", "fehlZ": "{z} Punkte liegen falsch (rot)."}, "en": {"fehlF": "{f} points are still missing.", "fehlZ": "{z} points are in the wrong place (red)."}, "es": {"fehlF": "Faltan {f} puntos.", "fehlZ": "{z} puntos están mal (en rojo)."}, "zh": {"fehlF": "还缺 {f} 个点。", "fehlZ": "{z} 个点位置不对（红色）。"}, "fr": {"fehlF": "Il manque encore {f} points.", "fehlZ": "{z} points sont mal placés (en rouge)."}, "ru": {"fehlF": "Не хватает точек: {f}.", "fehlZ": "Точек не на месте: {z} (красные)."}, "ar": {"fehlF": "تنقص {f} نقاط.", "fehlZ": "{z} نقاط في مكان خاطئ (بالأحمر)."}, "ja": {"fehlF": "点があと {f} 個足りません。", "fehlZ": "{z} 個の点がちがう場所です（赤）。"}, "pt": {"fehlF": "Faltam {f} pontos.", "fehlZ": "{z} pontos estão no lugar errado (em vermelho)."}}; for(var l in X) for(var k in X[l]) ZX[l][k] = X[l][k]; })();
  // 🆕 24.11.2026 (m): x-Werte selbst wählen (Standard), y = 0-Spalten (Nullstelle gesucht), „Lösung zeigen“
  (function(){ var X = {"de": {"xVor": "x-Werte vorgeben", "introS": "Such dir selbst passende x-Werte aus (am besten ganze Zahlen, bei denen auch y ganz wird), rechne y aus, trag beides in die Tabelle ein und tippe die Punkte ins Koordinatensystem.", "nullH": "Spalte mit y = 0: hier ist x gesucht (Nullstelle).", "fehlX": "{n} x-Wert(e) stimmen noch nicht (rot markiert).", "doppelt": "Jeden x-Wert bitte nur einmal verwenden.", "unplot": "{n} Punkt(e) liegen nicht auf einem Gitterpunkt im Bild – nimm dafür andere x-Werte (ganze Zahlen zwischen −6 und 6, y ebenso).", "loes": "Lösung zeigen", "leerS": "Bitte zuerst alle Felder der Tabelle ausfüllen.", "nstWeg": "Nullstelle (y = 0):", "tipX": "Tipp: Bei einem Bruch als Steigung bzw. vor x² passen gerade x-Werte oft besser."}, "en": {"xVor": "Give the x-values", "introS": "Choose suitable x-values yourself (ideally whole numbers that also give a whole y), work out y, enter both in the table and tap the points into the coordinate system.", "nullH": "Column with y = 0: here x is wanted (zero).", "fehlX": "{n} x-value(s) are not right yet (marked red).", "doppelt": "Please use each x-value only once.", "unplot": "{n} point(s) are not on a grid point in the picture – choose other x-values (whole numbers between −6 and 6, y as well).", "loes": "Show solution", "leerS": "Please fill in all fields of the table first.", "nstWeg": "Zero (y = 0):", "tipX": "Tip: with a fraction as slope or in front of x², even x-values often work better."}, "es": {"xVor": "Dar los valores de x", "introS": "Elige tú mismo valores de x adecuados (mejor enteros que den también un y entero), calcula y, escribe ambos en la tabla y toca los puntos en el sistema de coordenadas.", "nullH": "Columna con y = 0: aquí se busca x (cero).", "fehlX": "{n} valor(es) de x aún no son correctos (en rojo).", "doppelt": "Usa cada valor de x solo una vez.", "unplot": "{n} punto(s) no están en un punto de la cuadrícula: elige otros valores de x (enteros entre −6 y 6, y también).", "loes": "Ver solución", "leerS": "Rellena primero todos los campos de la tabla.", "nstWeg": "Cero (y = 0):", "tipX": "Consejo: con una fracción como pendiente o delante de x², suelen ir mejor valores pares de x."}, "zh": {"xVor": "给出 x 值", "introS": "自己选合适的 x 值（最好是整数，且 y 也是整数），算出 y，把两者填进表格，再在坐标系中点出这些点。", "nullH": "y = 0 的那一列：这里求 x（零点）。", "fehlX": "有 {n} 个 x 值还不对（红色标出）。", "doppelt": "每个 x 值只用一次。", "unplot": "有 {n} 个点不在图中的格点上——换别的 x 值（−6 到 6 之间的整数，y 也一样）。", "loes": "显示答案", "leerS": "请先填好表格中的所有空格。", "nstWeg": "零点（y = 0）：", "tipX": "提示：斜率或 x² 前的系数是分数时，取偶数 x 往往更好。"}, "fr": {"xVor": "Donner les valeurs de x", "introS": "Choisis toi-même des valeurs de x adaptées (de préférence des entiers qui donnent aussi un y entier), calcule y, écris les deux dans le tableau et touche les points dans le repère.", "nullH": "Colonne avec y = 0 : ici on cherche x (zéro).", "fehlX": "{n} valeur(s) de x ne sont pas encore justes (en rouge).", "doppelt": "Utilise chaque valeur de x une seule fois.", "unplot": "{n} point(s) ne tombent pas sur un nœud du quadrillage – choisis d’autres valeurs de x (entiers entre −6 et 6, y aussi).", "loes": "Voir la solution", "leerS": "Remplis d’abord toutes les cases du tableau.", "nstWeg": "Zéro (y = 0) :", "tipX": "Astuce : avec une fraction comme pente ou devant x², les x pairs conviennent souvent mieux."}, "ru": {"xVor": "Задать значения x", "introS": "Сам выбери подходящие x (лучше целые, при которых y тоже целый), вычисли y, впиши оба в таблицу и отметь точки в системе координат.", "nullH": "Столбец с y = 0: здесь нужно найти x (нуль функции).", "fehlX": "{n} значений x пока неверны (красные).", "doppelt": "Каждое значение x используй только один раз.", "unplot": "{n} точек не попадают в узлы сетки – выбери другие x (целые от −6 до 6, y тоже).", "loes": "Показать решение", "leerS": "Сначала заполни все клетки таблицы.", "nstWeg": "Нуль (y = 0):", "tipX": "Подсказка: если наклон или коэффициент при x² – дробь, лучше брать чётные x."}, "ar": {"xVor": "إعطاء قيم x", "introS": "اختر بنفسك قيم x مناسبة (ويُفضّل أعداد صحيحة تعطي y صحيحًا أيضًا)، واحسب y، واكتب الاثنين في الجدول، ثم المس النقاط في نظام الإحداثيات.", "nullH": "العمود الذي فيه y = 0: المطلوب هنا x (صفر الدالة).", "fehlX": "{n} من قيم x ليست صحيحة بعد (بالأحمر).", "doppelt": "استخدم كل قيمة x مرة واحدة فقط.", "unplot": "{n} نقطة ليست على نقطة من الشبكة – اختر قيم x أخرى (أعداد صحيحة بين −6 و 6، وكذلك y).", "loes": "عرض الحل", "leerS": "املأ أولًا كل خانات الجدول.", "nstWeg": "الصفر (y = 0):", "tipX": "تلميح: إذا كان الميل أو معامل x² كسرًا فغالبًا ما تناسب قيم x الزوجية أكثر."}, "ja": {"xVor": "x の値を与える", "introS": "ちょうどよい x の値を自分で選ぼう（y も整数になる整数がおすすめ）。y を計算して両方を表に書き、座標の中に点をタップしよう。", "nullH": "y = 0 の列：ここでは x を求める（零点）。", "fehlX": "x の値が {n} 個まだちがいます（赤）。", "doppelt": "同じ x の値は 1 回だけ使おう。", "unplot": "{n} 個の点が図の格子点にのっていません――別の x を選ぼう（−6〜6 の整数、y も同じ）。", "loes": "答えを見る", "leerS": "先に表のマスを全部うめよう。", "nstWeg": "零点（y = 0）：", "tipX": "ヒント：傾きや x² の係数が分数なら、偶数の x のほうがうまくいくことが多い。"}, "pt": {"xVor": "Dar os valores de x", "introS": "Escolha você mesmo valores de x adequados (de preferência inteiros que também deem y inteiro), calcule y, escreva os dois na tabela e toque os pontos no sistema de coordenadas.", "nullH": "Coluna com y = 0: aqui procura-se x (zero).", "fehlX": "{n} valor(es) de x ainda não estão certos (em vermelho).", "doppelt": "Use cada valor de x só uma vez.", "unplot": "{n} ponto(s) não estão num ponto da grade – escolha outros valores de x (inteiros entre −6 e 6, y também).", "loes": "Ver solução", "leerS": "Preencha primeiro todos os campos da tabela.", "nstWeg": "Zero (y = 0):", "tipX": "Dica: com uma fração como inclinação ou antes de x², valores pares de x costumam funcionar melhor."}}; for(var l in X) for(var k in X[l]) ZX[l][k] = X[l][k]; })();
  function sprache(){ var l = document.documentElement.lang; return ZX[l] ? l : "de"; }
  function t(k, v){ var s = (ZX[sprache()] || ZX.de)[k] || ZX.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function $(id){ return document.getElementById(id); }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function bt(b){ return FK.btxt(typeof b === "number" ? B(b) : b); }
  function zt(n){ return n < 0 ? M + (-n) : String(n); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(",", ".").replace(/\s+/g, ""); return /^-?\d+(\.\d+)?$/.test(s) ? +s : NaN; }

  // ---------- Aufgaben ----------
  function gerade(){
    for(var n = 0; n < 300; n++){
      var m = wahl([B(1), B(2), B(3), B(1, 2), B(3, 2)]); if(Math.random() < 0.5) m = Bz.neg(m);
      var tt = zuf(-3, 3), xs = [];
      for(var x = -5; x <= 5; x++){ var y = Bz.add(Bz.mul(m, B(x)), B(tt)); if(y.d === 1 && Math.abs(y.n) <= 6) xs.push(x); }
      if(xs.length < 4) continue;
      while(xs.length > 5) xs.splice(zuf(0, xs.length - 1), 1);
      var r0 = Bz.div(B(-tt), m), nst = r0.d === 1 && Math.abs(r0.n) <= 6 ? [r0.n] : [];
      if(Math.random() < 0.6 && !nst.length) continue;   // meist eine Aufgabe mit ganzzahliger Nullstelle
      return { typ: "lin", p: FK.trim([B(tt), m]), xs: xs, nst: nst, m: m, t: tt,
        rech: function(x){ return bt(m) + " · (" + zt(x) + ")" + (tt === 0 ? "" : tt > 0 ? " + " + tt : " " + M + " " + (-tt)); } };
    }
  }
  function parabel(){
    for(var n = 0; n < 300; n++){
      var a = wahl([B(1), B(1), B(1, 2)]); if(Math.random() < 0.5) a = Bz.neg(a);
      var d = zuf(-2, 2), e = a.n > 0 ? zuf(-5, 1) : zuf(-1, 5), sch = a.d === 2 ? 2 : 1, xs = [];
      for(var k = -2; k <= 2; k++){ var x = d + k * sch, y = Bz.add(Bz.mul(a, B((x - d) * (x - d))), B(e)); if(Math.abs(x) <= 6 && y.d === 1 && Math.abs(y.n) <= 6) xs.push(x); }
      if(xs.length < 5) continue;
      // a·(x − d)² + e  =  a·x² − 2ad·x + (a·d² + e)
      var p = FK.trim([Bz.add(Bz.mul(a, B(d * d)), B(e)), Bz.mul(a, B(-2 * d)), a]);
      var q = Bz.div(B(-e), a), nst = [], wq = q.d === 1 && q.n >= 0 ? Math.round(Math.sqrt(q.n)) : -1;
      if(wq >= 0 && wq * wq === q.n){ nst = wq === 0 ? [d] : [d - wq, d + wq]; if(nst.some(function(r){ return Math.abs(r) > 6; })) nst = []; }
      if(Math.random() < 0.6 && !nst.length) continue;
      return { typ: "par", p: p, xs: xs, nst: nst, a: a, d: d, e: e, q: q, wq: wq,
        rech: function(x){ var at = bt(a); return (at === "1" ? "" : at === M + "1" ? M : at + " · ") + "(" + zt(x) + (d === 0 ? "" : d > 0 ? " " + M + " " + d : " + " + (-d)) + ")²" + (e === 0 ? "" : e > 0 ? " + " + e : " " + M + " " + (-e)); } };
    }
  }
  var art = "mix", A = null, punkte = 0, anzahl = 0, xVor = false;
  try { xVor = localStorage.getItem("msGzXvor") === "1"; } catch(e){}
  window.MS_GZ_TEST = function(){ return A; };
  function neu(){
    var zi = $("zIntro"); if(zi) zi.textContent = t(xVor ? "intro" : "introS");
    A = art === "lin" ? gerade() : art === "par" ? parabel() : (Math.random() < 0.5 ? gerade() : parabel());
    A.ys = A.xs.map(function(x){ return Math.round(FK.wertN(A.p, x)); });
    A.vor = xVor;   // x-Werte vorgegeben?
    // Spalten: frei/vorgegeben (x gegeben oder selbst gewählt) + Nullstellen-Spalten (y = 0 gegeben, x gesucht)
    A.nullS = A.nst.length && (A.vor ? Math.random() < 0.7 : Math.random() < 0.6);
    var nFrei = A.typ === "lin" ? 4 : 5;
    A.sp = [];
    if(A.vor){ A.xs.forEach(function(x, i){ if(A.nullS && A.nst.indexOf(x) >= 0) return; A.sp.push({ gx: true, x: x, y: A.ys[i] }); }); }
    else for(var k = 0; k < nFrei - (A.nullS ? A.nst.length : 0); k++) A.sp.push({ gx: false });
    if(A.nullS) A.nst.forEach(function(r){ A.sp.push({ gy: true, x: r, y: 0 }); });
    A.ex = A.sp.map(function(){ return ""; }); A.ey = A.sp.map(function(){ return ""; });
    A.pts = []; A.vers = 0; A.fertig = false; A.ok = false; A.meld = ""; A.fx = []; A.fyI = []; A.falschP = [];
    bauen();
  }

  // ---------- Darstellung ----------
  var W = 500, U = 7, S = (W - 40) / (2 * U), O = W / 2;
  function X(x){ return O + x * S; } function Y(y){ return O - y * S; }
  function bauen(){
    var box = $("zInhalt"); if(!box || !A) return;
    function zelle(i, w, isX){ var sp = A.sp[i], fal = (isX ? A.fx : A.fyI).indexOf(i) >= 0;
      return '<td><input type="text" inputmode="decimal" autocomplete="off" class="zE ' + (isX ? "zX" : "zY") + (fal ? " falsch" : A.fertig ? " richtig" : "") + '" data-i="' + i + '" data-k="' + (isX ? "x" : "y") + '" value="' + esc(w) + '"' + (A.fertig ? " readonly" : "") + "></td>"; }
    var h = '<p class="zeile">' + esc(t("auf")) + ' <span class="f" dir="ltr"><b>f(x) = ' + esc(FK.ptxt(A.p)) + "</b></span></p>" +
      '<label class="zVor"><input type="checkbox" id="zXvor"' + (xVor ? " checked" : "") + "> " + esc(t("xVor")) + "</label>" +
      '<div class="zTab" dir="ltr"><table><tr><th>x</th>' + A.sp.map(function(sp, i){ return sp.gx ? "<td>" + zt(sp.x) + "</td>" : zelle(i, A.ex[i], true); }).join("") + "</tr>" +
      '<tr><th>y</th>' + A.sp.map(function(sp, i){ return sp.gy ? '<td class="zNull">0</td>' : zelle(i, A.ey[i], false); }).join("") + "</tr></table></div>" +
      (A.nullS ? '<p class="hinweis zNullH">' + esc(t("nullH")) + "</p>" : "") +
      (!A.vor && ((A.typ === "lin" && A.m && A.m.d > 1) || (A.typ === "par" && A.a && A.a.d > 1)) ? '<p class="hinweis">' + esc(t("tipX")) + "</p>" : "") +
      '<p class="hinweis">' + esc(t("tipp")) + ' <b id="zAnz"></b></p>';
    $("zKopf").innerHTML = h;
    var alleE = Array.prototype.slice.call(box.querySelectorAll(".zE"));
    alleE.forEach(function(inp, j){
      inp.addEventListener("input", function(){ (inp.dataset.k === "x" ? A.ex : A.ey)[+inp.dataset.i] = inp.value; inp.classList.remove("falsch"); });
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ var n = alleE[j + 1]; if(n) n.focus(); else pruefe(); } });
    });
    var cb = $("zXvor"); if(cb) cb.addEventListener("change", function(){ xVor = cb.checked; try { localStorage.setItem("msGzXvor", xVor ? "1" : "0"); } catch(e){} neu(); });
    $("zPr").disabled = A.fertig; $("zLoes").hidden = A.fertig;
    zeichne(); meldung();
  }
  function meldung(){
    var m = $("zMeld"), w = $("zWeg");
    m.className = "meldung" + (A.meld === "ok" ? " gut" : A.meld ? " schlecht" : "");
    var s = "";
    if(A.meld === "ok") s = t("ok");
    else if(A.meld === "leer") s = t(A.vor && !A.nullS ? "leer" : "leerS");
    else if(A.meld === "doppelt") s = t("doppelt");
    else if(A.meld === "falsch") s = t("falsch");
    else if(A.meld === "nochmal") s = t("nochmal") + (A.nfx ? " " + t("fehlX", { n: A.nfx }) : "") + (A.nun ? " " + t("unplot", { n: A.nun }) : "") + (A.fy ? " " + t("fehlY", { n: A.fy }) : "") + (A.ff && A.fz ? " " + t("fehlP", { f: A.ff, z: A.fz }) : A.ff ? " " + t("fehlF", { f: A.ff }) : A.fz ? " " + t("fehlZ", { z: A.fz }) : "");
    m.textContent = s;
    w.hidden = !A.fertig;
    if(A.fertig){
      var zeilen = A.sp.filter(function(sp){ return !sp.gy; }).map(function(sp){ return "<li>f(" + zt(sp.x) + ") = " + esc(A.rech(sp.x)) + " = " + zt(sp.y) + "  →  (" + zt(sp.x) + " | " + zt(sp.y) + ")</li>"; }).join("");
      var nw = "";
      if(A.nullS){
        if(A.typ === "lin") nw = "<li>" + esc(bt(A.m) + " · x" + (A.t === 0 ? "" : A.t > 0 ? " + " + A.t : " " + M + " " + (-A.t)) + " = 0") + "</li>" + (A.t === 0 ? "" : "<li>" + esc(bt(A.m) + " · x = " + zt(-A.t)) + "</li>") + "<li>x = " + zt(A.nst[0]) + "</li>";
        else { var at = bt(A.a), kl = "(x" + (A.d === 0 ? "" : A.d > 0 ? " " + M + " " + A.d : " + " + (-A.d)) + ")²";
          nw = "<li>" + esc((at === "1" ? "" : at === M + "1" ? M : at + " · ") + kl + (A.e === 0 ? "" : A.e > 0 ? " + " + A.e : " " + M + " " + (-A.e)) + " = 0") + "</li><li>" + esc(kl + " = " + zt(A.wq * A.wq)) + "</li>" +
            (A.nst.length === 1 ? "<li>x = " + zt(A.nst[0]) + "</li>" : "<li>x = " + zt(A.d) + " ± " + A.wq + "</li><li>x₁ = " + zt(A.nst[0]) + "; x₂ = " + zt(A.nst[1]) + "</li>"); }
        nw = '<p class="zeile"><b>' + esc(t("nstWeg")) + '</b></p><ol class="weg" dir="ltr">' + nw + "</ol>";
      }
      w.innerHTML = '<p class="zeile"><b>' + esc(t("weg")) + '</b></p><ol class="weg" dir="ltr">' + zeilen + "</ol>" + nw + '<p class="merke">' + esc(t("so")) + "</p>";
    }
    var a = $("zAnz"); if(a) a.textContent = "· " + t("gesetzt", { n: A.pts.length });
    $("zPunkte").textContent = anzahl ? t("punkte", { p: punkte, n: anzahl }) : "";
  }
  function zeichne(){
    var sv = $("zSvg"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    sv.setAttribute("viewBox", "0 0 " + W + " " + W);
    sv.appendChild(el("rect", { x: X(-U), y: Y(U), width: 2 * U * S, height: 2 * U * S, fill: "#ffffff", stroke: "#b0b0b8" }));
    for(var i = -U; i <= U; i++){
      sv.appendChild(el("line", { x1: X(i), y1: Y(-U), x2: X(i), y2: Y(U), stroke: i === 0 ? "#1a2233" : "#dbe4f0", "stroke-width": i === 0 ? 1.8 : 1 }));
      sv.appendChild(el("line", { x1: X(-U), y1: Y(i), x2: X(U), y2: Y(i), stroke: i === 0 ? "#1a2233" : "#dbe4f0", "stroke-width": i === 0 ? 1.8 : 1 }));
      if(i !== 0 && Math.abs(i) < U){ sv.appendChild(el("text", { x: X(i), y: Y(0) + 14, "class": "ax" }, zt(i))); sv.appendChild(el("text", { x: X(0) - 5, y: Y(i) + 4, "class": "ax", style: "text-anchor:end" }, zt(i))); }
    }
    sv.appendChild(el("text", { x: X(U) - 4, y: Y(0) - 6, "class": "ax achse", style: "text-anchor:end" }, "x")); sv.appendChild(el("text", { x: X(0) + 6, y: Y(U) + 14, "class": "ax achse", style: "text-anchor:start" }, "y"));
    if(A.fertig){ // Graph durch die Punkte
      var d = "", an = false;
      for(var k = 0; k <= 600; k++){ var x = -U + 2 * U * k / 600, y = FK.wertN(A.p, x); if(Math.abs(y) > U + 0.5){ an = false; continue; } d += (an ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); an = true; }
      sv.appendChild(el("path", { d: d, fill: "none", stroke: "#2563eb", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.85 }));
      A.sp.forEach(function(sp){ if(Math.abs(sp.x) < U && Math.abs(sp.y) < U) sv.appendChild(el("circle", { cx: X(sp.x), cy: Y(sp.y), r: 7, fill: sp.gy ? "#ea580c" : "#16a34a", stroke: "#ffffff", "stroke-width": 2.5 })); });
    }
    A.pts.forEach(function(q){
      var falsch = A.falschP.some(function(f){ return f[0] === q[0] && f[1] === q[1]; });
      if(A.fertig && !falsch) return;
      sv.appendChild(el("circle", { cx: X(q[0]), cy: Y(q[1]), r: 7, fill: falsch ? "#dc2626" : "#7c3aed", stroke: "#ffffff", "stroke-width": 2.5 }));
    });
  }
  function tippen(e){
    if(!A || A.fertig) return;
    var sv = $("zSvg"), m = sv.getScreenCTM(); if(!m) return;
    var p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; p = p.matrixTransform(m.inverse());
    var x = Math.round((p.x - O) / S), y = Math.round((O - p.y) / S);
    if(Math.abs(x) >= U || Math.abs(y) >= U) return;
    var i = -1; A.pts.forEach(function(q, j){ if(q[0] === x && q[1] === y) i = j; });
    if(i >= 0) A.pts.splice(i, 1); else A.pts.push([x, y]);
    A.falschP = A.falschP.filter(function(f){ return A.pts.some(function(q){ return q[0] === f[0] && q[1] === f[1]; }); });
    zeichne(); meldung();
  }
  function wert(x){ return FK.wertN(A.p, x); }
  function pruefe(){
    if(!A || A.fertig) return;
    // leere Felder?
    var leer = A.sp.some(function(sp, i){ return (!sp.gx && !String(A.ex[i]).trim()) || (!sp.gy && !String(A.ey[i]).trim()); });
    if(leer){ A.meld = "leer"; meldung(); return; }
    var fx = [], fyI = [], un = 0, xsG = {};
    A.sp.forEach(function(sp, i){
      var x = sp.gx ? sp.x : lies(A.ex[i]), y = sp.gy ? 0 : lies(A.ey[i]);
      if(sp.gy){ // Nullstelle: x muss eine noch nicht benutzte Nullstelle sein
        if(isNaN(x) || A.nst.indexOf(x) < 0 || xsG["n" + x]) fx.push(i); else xsG["n" + x] = 1;
        return;
      }
      if(!sp.gx){ if(isNaN(x)) { fx.push(i); return; } if(xsG["x" + x]){ fx.push(i); return; } xsG["x" + x] = 1; }
      if(isNaN(y) || Math.abs(y - wert(x)) > 1e-9) fyI.push(i);
      else if(!sp.gx && (Math.round(x) !== x || Math.round(y) !== y || Math.abs(x) >= U || Math.abs(y) >= U)){ un++; fx.push(i); }
    });
    // Sollpunkte = richtige Tabellenzeilen
    var soll = [];
    A.sp.forEach(function(sp, i){ if(fx.indexOf(i) >= 0 || fyI.indexOf(i) >= 0) return; var x = sp.gx ? sp.x : lies(A.ex[i]), y = sp.gy ? 0 : lies(A.ey[i]); soll.push([x, y]); });
    var fehlen = soll.filter(function(s2){ return !A.pts.some(function(q){ return q[0] === s2[0] && q[1] === s2[1]; }); }).length;
    var zuviel = A.pts.filter(function(q){ return Math.abs(q[1] - wert(q[0])) > 1e-9; });
    var ok = !fx.length && !fyI.length && !fehlen && !zuviel.length;
    if(!ok && A.vers === 0){ A.vers = 1; A.fx = fx; A.fyI = fyI; A.falschP = zuviel; A.nfx = fx.length - un; A.nun = un; A.fy = fyI.length; A.ff = fehlen; A.fz = zuviel.length; A.meld = "nochmal"; if(window.MS_FS) try { MS_FS.falsch(); } catch(x){} bauen(); return; }
    abschluss(ok, zuviel);
  }
  function abschluss(ok, zuviel){
    A.fertig = true; A.ok = ok; anzahl++; if(ok){ punkte++; if(typeof window.msRichtig === "function") try { window.msRichtig(); } catch(x){} }
    A.meld = ok ? "ok" : "falsch"; A.fx = []; A.fyI = []; A.falschP = ok ? [] : (zuviel || []);
    // Tabelle mit einer richtigen Lösung füllen: eigene richtige Zeilen bleiben, sonst Werte aus der Vorlage
    var frei = A.xs.filter(function(x){ return A.nst.indexOf(x) < 0 || !A.nullS; }), benutzt = {};
    A.sp.forEach(function(sp, i){
      if(sp.gy){ sp.x = A.nst[A.sp.slice(0, i).filter(function(z){ return z.gy; }).length]; A.ex[i] = zt(sp.x); return; }
      if(sp.gx){ sp.y = Math.round(wert(sp.x)); A.ey[i] = zt(sp.y); benutzt[sp.x] = 1; return; }
      var x = lies(A.ex[i]), y = lies(A.ey[i]);
      if(ok || (!isNaN(x) && !isNaN(y) && Math.abs(y - wert(x)) < 1e-9 && Math.round(x) === x && Math.round(y) === y && Math.abs(x) < U && Math.abs(y) < U && !benutzt[x])){ sp.x = x; sp.y = y; benutzt[x] = 1; }
      else sp.x = null;
    });
    A.sp.forEach(function(sp, i){ if(sp.gx || sp.gy || sp.x != null) { if(!sp.gx && !sp.gy){ A.ex[i] = zt(sp.x); A.ey[i] = zt(sp.y); } return; }
      var x = frei.filter(function(v){ return !benutzt[v]; })[0]; if(x == null) x = A.xs[0]; benutzt[x] = 1; sp.x = x; sp.y = Math.round(wert(x)); A.ex[i] = zt(sp.x); A.ey[i] = zt(sp.y); });
    bauen();
  }
  function loesungZeigen(){ if(!A || A.fertig) return; A.pts = []; abschluss(false, []); }

  // ---------- Reiter, Auswahl, Sprache ----------
  function wahlKnoepfe(){
    var box = $("zArt"); box.innerHTML = "";
    ["mix", "lin", "par"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t(k); b.setAttribute("aria-pressed", k === art ? "true" : "false");
      b.addEventListener("click", function(){ art = k; wahlKnoepfe(); neu(); }); box.appendChild(b); });
  }
  var tab = "ablesen";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll("#gTabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    $("s_ablesen").hidden = k !== "ablesen"; $("s_zeichnen").hidden = k !== "zeichnen";
    if(k === "zeichnen" && !A) neu();
  }
  function texte(){
    document.querySelectorAll("#gTabs button").forEach(function(b){ b.textContent = t(b.dataset.tab === "zeichnen" ? "tabZ" : "tabA"); });
    $("zH").textContent = t("h"); $("zIntro").textContent = t(xVor ? "intro" : "introS"); if($("zLoes")) $("zLoes").textContent = t("loes"); $("zPr").textContent = t("pruef"); $("zNeu").textContent = t("neu");
    wahlKnoepfe(); if(A) bauen();
  }
  function start(){
    document.querySelectorAll("#gTabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
    $("zSvg").addEventListener("click", tippen);
    $("zPr").addEventListener("click", pruefe);
    var lk = document.createElement("button"); lk.type = "button"; lk.id = "zLoes"; lk.className = "knopf hell"; lk.style.marginInlineStart = "8px";
    $("zPr").insertAdjacentElement("afterend", lk); lk.addEventListener("click", loesungZeigen);
    $("zPr").parentElement.setAttribute("data-noloes", ""); $("zPr").parentElement.setAttribute("data-noleer", "");
    $("zNeu").addEventListener("click", neu);
    new MutationObserver(texte).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    texte();
    zeigeTab(/^#zeichnen/.test(location.hash) ? "zeichnen" : "ablesen");
    window.addEventListener("hashchange", function(){ if(/^#(zeichnen|ablesen)$/.test(location.hash)) zeigeTab(location.hash.slice(1)); });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
