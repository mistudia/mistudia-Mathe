// quadratisch/flug.js – Karte „Flugbahnen vergleichen“ (unter dem Graphen im Reiter Untersuchen)
// Drei Golfschläge als Parabeln y = ax² + bx + c (x = Weite in m, y = Höhe in m, Abschlag bei x = 0).
// Gesucht: Flugweite (positive Nullstelle) und größte Höhe (Scheitelpunkt) je Schlag, dazu
// „Welcher fliegt am weitesten / am höchsten?“. Zufällige Schläge, Lösungsweg, 9 Sprachen (QF).
(function(){
  "use strict";
  var QF = {
  de: { titel: "Flugbahnen vergleichen", intro: "Drei Golfschläge. x ist die waagerechte Entfernung vom Abschlag in m, y die Höhe des Balls in m. Berechne für jeden Schlag die Flugweite und die größte Höhe (auf eine Stelle gerundet).", weite: "Flugweite", hoehe: "größte Höhe", amWeitesten: "Welcher Schlag fliegt am weitesten?", amHoechsten: "Welcher Schlag fliegt am höchsten?", neu: "Neue Schläge", pruefen: "Prüfen", richtig: "Richtig!", falsch: "Noch nicht.", weg: "Lösungsweg", schlag: "Schlag", tipp: "Tipp: Die Flugweite ist die positive Nullstelle (y = 0), die größte Höhe ist der y-Wert des Scheitelpunkts.", ax: "Weite in m", ay: "Höhe in m", huegel: "Abschlag {c} m über dem Boden",
    L: { scheitel: "Scheitelpunkt: x = −b : (2a)", hoehe: "Höhe am Scheitelpunkt:", null: "Landepunkt: y = 0", aus: "x ausklammern:", abc: "Mitternachtsformel:" } },
  en: { titel: "Comparing flight paths", intro: "Three golf shots. x is the horizontal distance from the tee in m, y the height of the ball in m. Work out the distance and the greatest height of each shot (rounded to one decimal).", weite: "distance", hoehe: "greatest height", amWeitesten: "Which shot goes the farthest?", amHoechsten: "Which shot goes the highest?", neu: "New shots", pruefen: "Check", richtig: "Correct!", falsch: "Not yet.", weg: "Solution steps", schlag: "Shot", tipp: "Hint: the distance is the positive zero (y = 0); the greatest height is the y-value of the vertex.", ax: "distance in m", ay: "height in m", huegel: "tee {c} m above the ground",
    L: { scheitel: "Vertex: x = −b : (2a)", hoehe: "Height at the vertex:", null: "Landing point: y = 0", aus: "Factor out x:", abc: "Quadratic formula:" } },
  es: { titel: "Comparar trayectorias", intro: "Tres golpes de golf. x es la distancia horizontal desde el punto de salida en m, y la altura de la pelota en m. Calcula el alcance y la altura máxima de cada golpe (redondeado a un decimal).", weite: "alcance", hoehe: "altura máxima", amWeitesten: "¿Qué golpe llega más lejos?", amHoechsten: "¿Qué golpe sube más alto?", neu: "Nuevos golpes", pruefen: "Comprobar", richtig: "¡Correcto!", falsch: "Todavía no.", weg: "Solución paso a paso", schlag: "Golpe", tipp: "Pista: el alcance es el cero positivo (y = 0); la altura máxima es la coordenada y del vértice.", ax: "distancia en m", ay: "altura en m", huegel: "salida a {c} m sobre el suelo",
    L: { scheitel: "Vértice: x = −b : (2a)", hoehe: "Altura en el vértice:", null: "Punto de caída: y = 0", aus: "Sacar x factor común:", abc: "Fórmula general:" } },
  zh: { titel: "比较飞行轨迹", intro: "三次高尔夫击球。x 是离发球点的水平距离（m），y 是球的高度（m）。求每次击球的飞行距离和最大高度（保留一位小数）。", weite: "飞行距离", hoehe: "最大高度", amWeitesten: "哪一球飞得最远？", amHoechsten: "哪一球飞得最高？", neu: "换一组击球", pruefen: "检查", richtig: "正确！", falsch: "还不对。", weg: "解题步骤", schlag: "击球", tipp: "提示：飞行距离是正的零点（y = 0），最大高度是顶点的 y 值。", ax: "距离 m", ay: "高度 m", huegel: "发球点离地 {c} m",
    L: { scheitel: "顶点：x = −b : (2a)", hoehe: "顶点处的高度：", null: "落点：y = 0", aus: "提取 x：", abc: "求根公式：" } },
  fr: { titel: "Comparer des trajectoires", intro: "Trois coups de golf. x est la distance horizontale depuis le départ en m, y la hauteur de la balle en m. Calcule la portée et la hauteur maximale de chaque coup (arrondies au dixième).", weite: "portée", hoehe: "hauteur maximale", amWeitesten: "Quel coup va le plus loin ?", amHoechsten: "Quel coup monte le plus haut ?", neu: "Nouveaux coups", pruefen: "Vérifier", richtig: "Juste !", falsch: "Pas encore.", weg: "Solution détaillée", schlag: "Coup", tipp: "Indice : la portée est la racine positive (y = 0) ; la hauteur maximale est l’ordonnée du sommet.", ax: "distance en m", ay: "hauteur en m", huegel: "départ à {c} m au-dessus du sol",
    L: { scheitel: "Sommet : x = −b : (2a)", hoehe: "Hauteur au sommet :", null: "Point d’arrivée : y = 0", aus: "Factoriser par x :", abc: "Formule du discriminant :" } },
  ru: { titel: "Сравнение траекторий", intro: "Три удара в гольфе. x — расстояние по горизонтали от точки удара в м, y — высота мяча в м. Найди дальность и наибольшую высоту каждого удара (с точностью до десятых).", weite: "дальность", hoehe: "наибольшая высота", amWeitesten: "Какой удар летит дальше всех?", amHoechsten: "Какой удар летит выше всех?", neu: "Новые удары", pruefen: "Проверить", richtig: "Верно!", falsch: "Пока нет.", weg: "Решение по шагам", schlag: "Удар", tipp: "Подсказка: дальность — положительный нуль (y = 0), наибольшая высота — y вершины.", ax: "расстояние, м", ay: "высота, м", huegel: "удар с высоты {c} м",
    L: { scheitel: "Вершина: x = −b : (2a)", hoehe: "Высота в вершине:", null: "Точка падения: y = 0", aus: "Вынести x за скобки:", abc: "Формула корней:" } },
  ar: { titel: "مقارنة مسارات الطيران", intro: "ثلاث ضربات غولف. x المسافة الأفقية من نقطة الضرب بالمتر، وy ارتفاع الكرة بالمتر. احسب مدى كل ضربة وأقصى ارتفاع لها (مقرّبًا لمنزلة عشرية واحدة).", weite: "المدى", hoehe: "أقصى ارتفاع", amWeitesten: "أي ضربة تطير أبعد؟", amHoechsten: "أي ضربة تطير أعلى؟", neu: "ضربات جديدة", pruefen: "تحقّق", richtig: "صحيح!", falsch: "ليس بعد.", weg: "خطوات الحل", schlag: "الضربة", tipp: "تلميح: المدى هو الصفر الموجب (y = 0)، وأقصى ارتفاع هو قيمة y لرأس القطع.", ax: "المسافة بالمتر", ay: "الارتفاع بالمتر", huegel: "نقطة الضرب على ارتفاع {c} م",
    L: { scheitel: "الرأس: x = −b : (2a)", hoehe: "الارتفاع عند الرأس:", null: "نقطة السقوط: y = 0", aus: "إخراج x عاملًا مشتركًا:", abc: "القانون العام:" } },
  ja: { titel: "飛ぶ道すじを比べる", intro: "ゴルフの3つのショット。x はティーからの水平距離（m）、y はボールの高さ（m）です。それぞれの飛距離と最高の高さを求めよう（小数第1位まで）。", weite: "飛距離", hoehe: "最高の高さ", amWeitesten: "いちばん遠くまで飛ぶのはどれ？", amHoechsten: "いちばん高く上がるのはどれ？", neu: "新しいショット", pruefen: "確かめる", richtig: "正解！", falsch: "まだです。", weg: "解き方", schlag: "ショット", tipp: "ヒント：飛距離は正の解（y = 0）、最高の高さは頂点の y 座標。", ax: "距離 m", ay: "高さ m", huegel: "ティーは地面から {c} m",
    L: { scheitel: "頂点：x = −b ÷ (2a)", hoehe: "頂点の高さ：", null: "落ちる点：y = 0", aus: "x でくくる：", abc: "解の公式：" } },
  pt: { titel: "Comparar trajetórias", intro: "Três tacadas de golfe. x é a distância horizontal desde o tee em m, y a altura da bola em m. Calcule o alcance e a altura máxima de cada tacada (arredondados a uma casa).", weite: "alcance", hoehe: "altura máxima", amWeitesten: "Qual tacada vai mais longe?", amHoechsten: "Qual tacada sobe mais alto?", neu: "Novas tacadas", pruefen: "Verificar", richtig: "Certo!", falsch: "Ainda não.", weg: "Solução passo a passo", schlag: "Tacada", tipp: "Dica: o alcance é a raiz positiva (y = 0); a altura máxima é o y do vértice.", ax: "distância em m", ay: "altura em m", huegel: "tee a {c} m do chão",
    L: { scheitel: "Vértice: x = −b : (2a)", hoehe: "Altura no vértice:", null: "Ponto de queda: y = 0", aus: "Colocar x em evidência:", abc: "Fórmula de Bhaskara:" } }
  };
  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  if(!QF[lang]) lang = "de";
  function S(){ return QF[lang] || QF.de; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }
  function z(v, d){ if(d == null) d = 1; var s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace(/0+$/, "").replace(/\.$/, ""); if(s === "-0") s = "0"; return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  function zk(v){ return z(v, 5); } // Koeffizienten
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  var FARBE = ["#16a34a", "#2563eb", "#dc2626"], NAME = ["a", "b", "c"];

  var schlaege = [], zust = {};
  function neu(){
    var A = [-0.002, -0.0025, -0.004, -0.005, -0.008, -0.01, -0.0125, -0.02, -0.025], tries = 0, L;
    do {
      L = [];
      for(var i = 0; i < 3; i++){
        var s = null;
        for(var k = 0; k < 200 && !s; k++){
          var a = wahl(A), b = Math.round((0.4 + Math.random() * 1.6) * 10) / 10, c = i === 2 ? wahl([0, 2, 5, 8]) : 0;
          var xs = -b / (2 * a), H = c - b * b / (4 * a), W = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
          if(W >= 60 && W <= 260 && H >= 8 && H <= 90) s = { a: a, b: b, c: c, xs: xs, H: H, W: W };
        }
        L.push(s);
      }
      tries++;
    } while(tries < 50 && (Math.abs(L[0].W - L[1].W) < 8 || Math.abs(L[1].W - L[2].W) < 8 || Math.abs(L[0].W - L[2].W) < 8 || Math.abs(L[0].H - L[1].H) < 4 || Math.abs(L[1].H - L[2].H) < 4 || Math.abs(L[0].H - L[2].H) < 4));
    schlaege = L; zust = {};
  }
  function formel(s){ return "y = " + zk(s.a).replace("−", "−") + "x² + " + zk(s.b) + "x" + (s.c ? " + " + zk(s.c) : ""); }
  function wegWeite(s){
    var w = [];
    if(!s.c) w.push([S().L.null, "0 = " + zk(s.a) + "x² + " + zk(s.b) + "x"], [S().L.aus, "0 = x · (" + zk(s.a) + "x + " + zk(s.b) + ")  →  x = 0 " + "∨ x = −" + zk(s.b) + " : (" + zk(s.a) + ") = " + z(s.W) + " m"]);
    else { var D = s.b * s.b - 4 * s.a * s.c; w.push([S().L.null, "0 = " + zk(s.a) + "x² + " + zk(s.b) + "x + " + zk(s.c)], [S().L.abc, "x = (−" + zk(s.b) + " ± √(" + zk(s.b) + "² − 4 · (" + zk(s.a) + ") · " + zk(s.c) + ")) : (2 · (" + zk(s.a) + "))"], ["", "√" + z(D, 4) + " ≈ " + z(Math.sqrt(D), 4) + "  →  x ≈ " + z(s.W) + " m"]); }
    return w;
  }
  function wegHoehe(s){ return [[S().L.scheitel, "x = −" + zk(s.b) + " : (2 · (" + zk(s.a) + ")) = " + z(s.xs) + " m"], [S().L.hoehe, "y = " + zk(s.a) + " · " + z(s.xs) + "² + " + zk(s.b) + " · " + z(s.xs) + (s.c ? " + " + zk(s.c) : "") + " ≈ " + z(s.H) + " m"]]; }
  function lies(s){ s = String(s).trim().replace(/[\sm]/g, "").replace(",", "."); return /^\d*\.?\d+$/.test(s) ? +s : NaN; }
  function stimmt(e, w){ return isFinite(e) && Math.abs(e - w) <= 0.51; }

  function svg(){
    var W = 560, H = 300, L = 46, R = W - 14, T = 18, B = H - 40, xmax = 0, ymax = 0;
    schlaege.forEach(function(s){ xmax = Math.max(xmax, s.W); ymax = Math.max(ymax, s.H); });
    xmax = Math.ceil(xmax / 50) * 50 + 20; ymax = Math.ceil(ymax / 20) * 20 + 10;
    var X = function(x){ return L + x / xmax * (R - L); }, Y = function(y){ return B - y / ymax * (B - T); };
    var h = '<svg class="qf-svg" viewBox="0 0 ' + W + " " + H + '" role="img"><rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#f0f7ff"/><rect x="0" y="' + B + '" width="' + W + '" height="' + (H - B) + '" fill="#d9f99d"/>';
    for(var gx = 50; gx <= xmax; gx += 50) h += '<line x1="' + X(gx) + '" y1="' + T + '" x2="' + X(gx) + '" y2="' + B + '" stroke="#dbe7f6"/><text x="' + X(gx) + '" y="' + (B + 18) + '" class="qf-z" text-anchor="middle">' + gx + "</text>";
    for(var gy = 20; gy <= ymax; gy += 20) h += '<line x1="' + L + '" y1="' + Y(gy) + '" x2="' + R + '" y2="' + Y(gy) + '" stroke="#dbe7f6"/><text x="' + (L - 6) + '" y="' + (Y(gy) + 4) + '" class="qf-z" text-anchor="end">' + gy + "</text>";
    h += '<line x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '" stroke="#1a2233" stroke-width="2"/><line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + B + '" stroke="#1a2233" stroke-width="2"/>';
    h += '<text x="' + R + '" y="' + (B + 34) + '" class="qf-z" text-anchor="end">' + esc(S().ax) + '</text><text x="' + (L + 6) + '" y="' + (T + 4) + '" class="qf-z">' + esc(S().ay) + "</text>";
    schlaege.forEach(function(s, i){
      var d = "", n = 120, last = null;
      for(var k = 0; k <= n; k++){ var x = s.W * k / n, y = s.a * x * x + s.b * x + s.c; d += (k ? "L" : "M") + X(x).toFixed(1) + " " + Y(Math.max(0, y)).toFixed(1); last = [X(x), Y(y)]; }
      if(s.c) h += '<rect x="' + (X(0) - 6) + '" y="' + Y(s.c) + '" width="12" height="' + (B - Y(s.c)) + '" fill="#a3a3a3"/>';
      h += '<path d="' + d + '" fill="none" stroke="' + FARBE[i] + '" stroke-width="3.5"/>';
      var g = zust["w" + i] && zust["w" + i].ok, hg = zust["h" + i] && zust["h" + i].ok;
      if(hg) h += '<circle cx="' + X(s.xs) + '" cy="' + Y(s.H) + '" r="5" fill="' + FARBE[i] + '"/><text x="' + X(s.xs) + '" y="' + (Y(s.H) - 9) + '" class="qf-t" fill="' + FARBE[i] + '" text-anchor="middle">' + z(s.H) + " m</text>";
      if(g) h += '<circle cx="' + X(s.W) + '" cy="' + B + '" r="5" fill="' + FARBE[i] + '"/><text x="' + X(s.W) + '" y="' + (B - 8 - i * 18) + '" class="qf-t" fill="' + FARBE[i] + '" text-anchor="middle">' + z(s.W) + " m</text>";
      var lp = 0.86 * s.W, ly = s.a * lp * lp + s.b * lp + s.c; h += '<text x="' + (X(lp) + 10) + '" y="' + (Y(ly) - 4) + '" class="qf-t" fill="' + FARBE[i] + '" text-anchor="start">' + NAME[i] + ")</text>";
    });
    // Golfer (Strichfigur) am Abschlag
    var gx0 = X(0) - 18, gy0 = B;
    h += '<g stroke="#1e3a8a" stroke-width="3" stroke-linecap="round" fill="none"><circle cx="' + gx0 + '" cy="' + (gy0 - 40) + '" r="6" fill="#fde68a"/><line x1="' + gx0 + '" y1="' + (gy0 - 34) + '" x2="' + gx0 + '" y2="' + (gy0 - 14) + '"/><line x1="' + gx0 + '" y1="' + (gy0 - 14) + '" x2="' + (gx0 - 6) + '" y2="' + gy0 + '"/><line x1="' + gx0 + '" y1="' + (gy0 - 14) + '" x2="' + (gx0 + 6) + '" y2="' + gy0 + '"/><line x1="' + gx0 + '" y1="' + (gy0 - 28) + '" x2="' + (gx0 + 14) + '" y2="' + (gy0 - 38) + '"/><line x1="' + (gx0 + 14) + '" y1="' + (gy0 - 38) + '" x2="' + (gx0 + 22) + '" y2="' + (gy0 - 8) + '" stroke="#64748b" stroke-width="2"/></g>';
    return h + "</svg>";
  }
  function zeigen(){
    var box = document.getElementById("flug"); if(!box) return;
    if(!schlaege.length) neu();
    var s = S(), h = "<h2>" + esc(s.titel) + '</h2><p class="zeile qf-intro">' + esc(s.intro) + "</p>" + svg() + '<div class="qf-grid">';
    schlaege.forEach(function(sl, i){
      h += '<div class="qf-schlag" style="border-color:' + FARBE[i] + '"><h3 style="color:' + FARBE[i] + '">' + esc(s.schlag) + " " + NAME[i] + ')</h3><p class="qf-f"><bdi dir="ltr">' + esc(formel(sl)) + "</bdi></p>" + (sl.c ? '<p class="qf-klein">' + esc(s.huegel.replace("{c}", sl.c)) + "</p>" : "");
      [["w", s.weite, sl.W, wegWeite(sl)], ["h", s.hoehe, sl.H, wegHoehe(sl)]].forEach(function(q){
        var id = q[0] + i, zz = zust[id] || {};
        h += '<div class="qf-ein"><label>' + esc(q[1]) + ' =</label> <input class="qf-inp" data-id="' + id + '" inputmode="decimal" autocomplete="off" value="' + esc(zz.e || "") + '"> m <button type="button" class="qf-pr" data-id="' + id + '">' + esc(s.pruefen) + "</button>" +
          ' <span class="qf-m ' + (zz.ok === true ? "gut" : zz.ok === false ? "schlecht" : "") + '">' + (zz.ok === true ? "✓" : zz.ok === false ? "✗" : "") + "</span></div>" +
          (zz.ok != null ? '<details class="qf-weg"' + (zz.ok === false ? " open" : "") + "><summary>" + esc(s.weg) + '</summary><ol class="qf-lauf">' + q[3].map(function(w){ return "<li>" + (w[0] ? '<span class="qf-l">' + esc(w[0]) + "</span><br>" : "") + '<bdi dir="ltr">' + esc(w[1]) + "</bdi></li>"; }).join("") + "</ol></details>" : "");
      });
      h += "</div>";
    });
    h += "</div>";
    [["weit", s.amWeitesten, "W"], ["hoch", s.amHoechsten, "H"]].forEach(function(q){
      var beste = 0; schlaege.forEach(function(sl, i){ if(sl[q[2]] > schlaege[beste][q[2]]) beste = i; });
      var gew = zust[q[0]];
      h += '<div class="qf-frage"><b>' + esc(q[1]) + '</b> <span class="qf-knoepfe">' + NAME.map(function(n, i){ var cls = gew != null ? (i === beste ? "richtig" : i === gew ? "falsch" : "") : ""; return '<button type="button" data-q="' + q[0] + '" data-i="' + i + '" class="' + cls + '" style="--f:' + FARBE[i] + '">' + n + ")</button>"; }).join("") + "</span>" +
        (gew != null ? ' <span class="qf-m ' + (gew === beste ? "gut" : "schlecht") + '">' + esc(gew === beste ? s.richtig : s.falsch) + "</span>" : "") + "</div>";
    });
    h += '<p class="qf-tipp">' + esc(s.tipp) + '</p><p><button type="button" class="knopf hell" id="qfNeu">↻ ' + esc(s.neu) + "</button></p>";
    box.innerHTML = h;
    document.getElementById("qfNeu").addEventListener("click", function(){ neu(); zeigen(); });
    function pruefe(id){
      var inp = box.querySelector('.qf-inp[data-id="' + id + '"]'), i = +id.charAt(1), sl = schlaege[i];
      zust[id] = { e: inp.value, ok: stimmt(lies(inp.value), id.charAt(0) === "w" ? sl.W : sl.H) }; zeigen();
      var alle = Array.prototype.slice.call(box.querySelectorAll(".qf-inp")), k = alle.findIndex(function(x){ return x.dataset.id === id; });
      var nxt = zust[id].ok ? alle[k + 1] : alle[k]; if(nxt) nxt.focus();
    }
    box.querySelectorAll(".qf-pr").forEach(function(b){ b.addEventListener("click", function(){ pruefe(b.dataset.id); }); });
    box.querySelectorAll(".qf-inp").forEach(function(inp){
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); pruefe(inp.dataset.id); } });
      inp.addEventListener("input", function(){ zust[inp.dataset.id] = { e: inp.value }; });
    });
    box.querySelectorAll(".qf-knoepfe button").forEach(function(b){ b.addEventListener("click", function(){ if(zust[b.dataset.q] != null) return; zust[b.dataset.q] = +b.dataset.i; zeigen(); }); });
  }
  var css = document.createElement("style");
  css.textContent =
    "#flug{margin-top:16px;border:2px solid #c9d6ea;border-radius:14px;padding:12px;background:#ffffff;color:#1a2233}#flug h2{margin:0 0 4px;color:#1565c0;font-size:20px}" +
    ".qf-intro{font-size:16px;line-height:1.5;margin:4px 0 8px}" +
    ".qf-svg{width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border:1px solid #c9d6ea;border-radius:12px}" +
    ".qf-z{font:12px system-ui,sans-serif;fill:#334155}.qf-t{font:700 14px system-ui,sans-serif;paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round}" +
    ".qf-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:10px 0}@media(max-width:860px){.qf-grid{grid-template-columns:1fr}}" +
    ".qf-schlag{border:2px solid;border-radius:12px;padding:8px 10px;background:#fbfdff;min-width:0}.qf-schlag h3{margin:0 0 2px;font-size:17px}" +
    ".qf-f{font:18px 'Cambria Math',Cambria,'Times New Roman',serif;margin:2px 0 6px;overflow-wrap:anywhere}.qf-klein{font-size:13.5px;color:#4f5b6e;margin:0 0 4px}" +
    ".qf-ein{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:6px 0;font-size:15px}.qf-ein label{font-weight:700}" +
    ".qf-inp{width:84px;font:18px system-ui,sans-serif;padding:4px 6px;border:2px solid #b0b0b8;border-radius:8px;text-align:center;color:#1a2233;background:#ffffff}" +
    ".qf-pr{font:700 14px system-ui,sans-serif;padding:6px 10px;border-radius:9px;border:0;background:#1565c0;color:#ffffff;cursor:pointer}" +
    ".qf-m{font-weight:800;font-size:16px}.qf-m.gut{color:#15803d}.qf-m.schlecht{color:#b91c1c}" +
    ".qf-weg summary{cursor:pointer;font-weight:700;color:#1565c0;font-size:14px}.qf-lauf{font-size:15px;line-height:1.5;padding-inline-start:20px;margin:4px 0}.qf-l{color:#4f5b6e;font-size:13px}" +
    ".qf-frage{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0;font-size:16px}" +
    ".qf-knoepfe button{font:800 16px system-ui,sans-serif;width:48px;height:38px;border-radius:10px;border:2px solid var(--f);background:#ffffff;color:var(--f);cursor:pointer;margin:0 3px}" +
    ".qf-knoepfe button.richtig{background:#dcfce7;border-color:#15803d;color:#15803d}.qf-knoepfe button.falsch{background:#fee2e2;border-color:#b91c1c;color:#b91c1c}" +
    ".qf-tipp{font-size:14.5px;color:#4f5b6e;background:#fff8e1;border-inline-start:4px solid #f59e0b;padding:6px 10px;border-radius:8px}";
  document.head.appendChild(css);
  // Sprachwechsel der Kachel mitnehmen
  var A = window.MS_LANG;
  if(A && A.apply){ var alt = A.apply; A.apply = function(l){ var r = alt.apply(A, arguments); if(QF[l]) lang = l; zeigen(); return r; }; }
  window.MS_QF = { zeigen: zeigen };
  zeigen();
})();
