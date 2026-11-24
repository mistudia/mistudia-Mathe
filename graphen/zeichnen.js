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
      return { typ: "lin", p: FK.trim([B(tt), m]), xs: xs,
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
      return { typ: "par", p: p, xs: xs,
        rech: function(x){ var at = bt(a); return (at === "1" ? "" : at === M + "1" ? M : at + " · ") + "(" + zt(x) + (d === 0 ? "" : d > 0 ? " " + M + " " + d : " + " + (-d)) + ")²" + (e === 0 ? "" : e > 0 ? " + " + e : " " + M + " " + (-e)); } };
    }
  }
  var art = "mix", A = null, punkte = 0, anzahl = 0;
  window.MS_GZ_TEST = function(){ return A; };
  function neu(){
    A = art === "lin" ? gerade() : art === "par" ? parabel() : (Math.random() < 0.5 ? gerade() : parabel());
    A.ys = A.xs.map(function(x){ return Math.round(FK.wertN(A.p, x)); });
    A.ein = A.xs.map(function(){ return ""; }); A.pts = []; A.vers = 0; A.fertig = false; A.ok = false; A.meld = ""; A.falschY = []; A.falschP = [];
    bauen();
  }

  // ---------- Darstellung ----------
  var W = 500, U = 7, S = (W - 40) / (2 * U), O = W / 2;
  function X(x){ return O + x * S; } function Y(y){ return O - y * S; }
  function bauen(){
    var box = $("zInhalt"); if(!box || !A) return;
    var h = '<p class="zeile">' + esc(t("auf")) + ' <span class="f" dir="ltr"><b>f(x) = ' + esc(FK.ptxt(A.p)) + "</b></span></p>" +
      '<div class="zTab" dir="ltr"><table><tr><th>x</th>' + A.xs.map(function(x){ return "<td>" + zt(x) + "</td>"; }).join("") + "</tr>" +
      '<tr><th>y</th>' + A.xs.map(function(x, i){ return '<td><input type="text" inputmode="decimal" autocomplete="off" class="zY' + (A.falschY.indexOf(i) >= 0 ? " falsch" : A.fertig ? " richtig" : "") + '" data-i="' + i + '" value="' + esc(A.ein[i]) + '"' + (A.fertig ? " readonly" : "") + "></td>"; }).join("") + "</tr></table></div>" +
      '<p class="hinweis">' + esc(t("tipp")) + ' <b id="zAnz"></b></p>';
    $("zKopf").innerHTML = h;
    box.querySelectorAll(".zY").forEach(function(inp){
      inp.addEventListener("input", function(){ A.ein[+inp.dataset.i] = inp.value; inp.classList.remove("falsch"); });
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ var n = box.querySelector('.zY[data-i="' + (+inp.dataset.i + 1) + '"]'); if(n) n.focus(); else pruefe(); } });
    });
    $("zPr").disabled = A.fertig;
    zeichne(); meldung();
  }
  function meldung(){
    var m = $("zMeld"), w = $("zWeg");
    m.className = "meldung" + (A.meld === "ok" ? " gut" : A.meld ? " schlecht" : "");
    var s = "";
    if(A.meld === "ok") s = t("ok");
    else if(A.meld === "leer") s = t("leer");
    else if(A.meld === "falsch") s = t("falsch");
    else if(A.meld === "nochmal") s = t("nochmal") + (A.fy ? " " + t("fehlY", { n: A.fy }) : "") + (A.ff && A.fz ? " " + t("fehlP", { f: A.ff, z: A.fz }) : A.ff ? " " + t("fehlF", { f: A.ff }) : A.fz ? " " + t("fehlZ", { z: A.fz }) : "");
    m.textContent = s;
    w.hidden = !A.fertig;
    if(A.fertig) w.innerHTML = '<p class="zeile"><b>' + esc(t("weg")) + '</b></p><ol class="weg" dir="ltr">' + A.xs.map(function(x, i){ return "<li>f(" + zt(x) + ") = " + esc(A.rech(x)) + " = " + zt(A.ys[i]) + "  →  (" + zt(x) + " | " + zt(A.ys[i]) + ")</li>"; }).join("") + '</ol><p class="merke">' + esc(t("so")) + "</p>";
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
      A.xs.forEach(function(x, i){ sv.appendChild(el("circle", { cx: X(x), cy: Y(A.ys[i]), r: 7, fill: "#16a34a", stroke: "#ffffff", "stroke-width": 2.5 })); });
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
  function pruefe(){
    if(!A || A.fertig) return;
    if(A.ein.some(function(s){ return !String(s).trim(); })){ A.meld = "leer"; meldung(); return; }
    var fy = []; A.ein.forEach(function(s, i){ if(lies(s) !== A.ys[i]) fy.push(i); });
    var soll = A.xs.map(function(x, i){ return [x, A.ys[i]]; });
    var fehlen = soll.filter(function(s){ return !A.pts.some(function(q){ return q[0] === s[0] && q[1] === s[1]; }); }).length;
    var zuviel = A.pts.filter(function(q){ return !soll.some(function(s){ return q[0] === s[0] && q[1] === s[1]; }); });
    var ok = !fy.length && !fehlen && !zuviel.length;
    if(!ok && A.vers === 0){ A.vers = 1; A.falschY = fy; A.falschP = zuviel; A.fy = fy.length; A.ff = fehlen; A.fz = zuviel.length; A.meld = "nochmal"; if(window.MS_FS) try { MS_FS.falsch(); } catch(x){} bauen(); return; }
    A.fertig = true; A.ok = ok; anzahl++; if(ok){ punkte++; if(typeof window.msRichtig === "function") try { window.msRichtig(); } catch(x){} }
    A.meld = ok ? "ok" : "falsch"; A.falschY = []; A.falschP = ok ? [] : zuviel;
    if(!ok) A.ein = A.ys.map(zt);
    bauen();
  }

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
    $("zH").textContent = t("h"); $("zIntro").textContent = t("intro"); $("zPr").textContent = t("pruef"); $("zNeu").textContent = t("neu");
    wahlKnoepfe(); if(A) bauen();
  }
  function start(){
    document.querySelectorAll("#gTabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
    $("zSvg").addEventListener("click", tippen);
    $("zPr").addEventListener("click", pruefe);
    $("zNeu").addEventListener("click", neu);
    new MutationObserver(texte).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    texte();
    zeigeTab(/^#zeichnen/.test(location.hash) ? "zeichnen" : "ablesen");
    window.addEventListener("hashchange", function(){ if(/^#(zeichnen|ablesen)$/.test(location.hash)) zeigeTab(location.hash.slice(1)); });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
