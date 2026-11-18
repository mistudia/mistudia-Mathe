// ============================================================
// pythagoras/puzzle.js – Karte „Selbst puzzeln“ im Reiter Beweis:
// Die vier Dreiecke aus dem linken Quadrat (a + b)² (frei bleibt c²) werden einzeln in das rechte
// gleich große Quadrat gezogen und rasten an ihrem Platz ein; frei bleiben dort a² und b².
// Eigene Texte (9 Sprachen), Sprache aus MS_MATH_LANG / msMathLang; hängt sich an MS_LANG.apply.
// ============================================================
(function(){
  var TX = {
    de: { titel: "Selbst puzzeln", anl: "Ziehe die vier Dreiecke einzeln aus dem linken Quadrat in das rechte. Ein Dreieck rastet ein, wenn es an seinem Platz liegt.", stand: "{n} von 4 Dreiecken eingerastet.", fertig: "Geschafft! Links ist das schräge Quadrat c² frei geblieben, rechts die beiden Quadrate a² und b². Beide großen Quadrate sind gleich groß und enthalten dieselben vier Dreiecke – also sind die freien Flächen gleich groß:", hilfe: "Plätze zeigen", neu: "Von vorn", loes: "Lösung zeigen", form: "Andere Dreiecke" },
    en: { titel: "Do the puzzle yourself", anl: "Drag the four triangles one by one from the left square into the right one. A triangle snaps in when it is in its place.", stand: "{n} of 4 triangles in place.", fertig: "Done! On the left the tilted square c² stayed free, on the right the two squares a² and b². Both big squares are the same size and contain the same four triangles – so the free areas are equal:", hilfe: "Show places", neu: "Start again", loes: "Show solution", form: "Other triangles" },
    es: { titel: "Haz tú el puzle", anl: "Arrastra los cuatro triángulos uno a uno del cuadrado de la izquierda al de la derecha. Un triángulo encaja cuando está en su sitio.", stand: "{n} de 4 triángulos encajados.", fertig: "¡Lo lograste! A la izquierda quedó libre el cuadrado inclinado c², a la derecha los dos cuadrados a² y b². Los dos cuadrados grandes son iguales y contienen los mismos cuatro triángulos, así que las superficies libres son iguales:", hilfe: "Mostrar sitios", neu: "Empezar de nuevo", loes: "Mostrar solución", form: "Otros triángulos" },
    zh: { titel: "自己拼一拼", anl: "把四个三角形一个一个从左边的正方形拖到右边的正方形里。三角形放到正确位置时会自动卡住。", stand: "已放好 {n} / 4 个三角形。", fertig: "成功了！左边空出的是斜放的正方形 c²，右边空出的是两个正方形 a² 和 b²。两个大正方形一样大，里面是同样的四个三角形——所以空出的面积相等：", hilfe: "显示位置", neu: "重新开始", loes: "显示答案", form: "换一组三角形" },
    fr: { titel: "Fais le puzzle toi-même", anl: "Fais glisser les quatre triangles un par un du carré de gauche vers celui de droite. Un triangle s’emboîte quand il est à sa place.", stand: "{n} triangles sur 4 en place.", fertig: "Réussi ! À gauche, le carré penché c² est resté libre ; à droite, les deux carrés a² et b². Les deux grands carrés sont de même taille et contiennent les mêmes quatre triangles – les surfaces libres sont donc égales :", hilfe: "Montrer les places", neu: "Recommencer", loes: "Montrer la solution", form: "Autres triangles" },
    ru: { titel: "Собери сам", anl: "Перетащи четыре треугольника по одному из левого квадрата в правый. Треугольник защёлкнется, когда окажется на своём месте.", stand: "На месте {n} из 4 треугольников.", fertig: "Получилось! Слева свободным остался наклонный квадрат c², справа – два квадрата a² и b². Оба больших квадрата одинаковы и содержат одни и те же четыре треугольника – значит, свободные площади равны:", hilfe: "Показать места", neu: "Сначала", loes: "Показать решение", form: "Другие треугольники" },
    ar: { titel: "ركّب اللغز بنفسك", anl: "اسحب المثلثات الأربعة واحدًا بعد الآخر من المربع الأيسر إلى المربع الأيمن. يثبت المثلث عندما يصل إلى مكانه.", stand: "ثُبّت {n} من 4 مثلثات.", fertig: "نجحت! بقي على اليسار المربع المائل c² فارغًا، وعلى اليمين المربعان a² وb². المربعان الكبيران متساويان ويحتويان المثلثات الأربعة نفسها – إذن المساحتان الفارغتان متساويتان:", hilfe: "أظهر الأماكن", neu: "من البداية", loes: "اعرض الحل", form: "مثلثات أخرى" },
    ja: { titel: "自分でパズル", anl: "4 つの三角形を 1 つずつ、左の正方形から右の正方形へドラッグしよう。正しい場所に来るとカチッとはまります。", stand: "4 つ中 {n} つがはまりました。", fertig: "できた！左にはななめの正方形 c² が、右には 2 つの正方形 a² と b² が空いています。2 つの大きな正方形は同じ大きさで、同じ 4 つの三角形が入っています――だから空いている面積も同じです：", hilfe: "場所を見せる", neu: "最初から", loes: "答えを見る", form: "ほかの三角形" },
    pt: { titel: "Faça o puzzle", anl: "Arraste os quatro triângulos um a um do quadrado da esquerda para o da direita. Um triângulo encaixa quando está no seu lugar.", stand: "{n} de 4 triângulos encaixados.", fertig: "Conseguiu! À esquerda ficou livre o quadrado inclinado c², à direita os dois quadrados a² e b². Os dois quadrados grandes são iguais e contêm os mesmos quatro triângulos – por isso as áreas livres são iguais:", hilfe: "Mostrar lugares", neu: "Recomeçar", loes: "Mostrar solução", form: "Outros triângulos" }
  };
  var lang = window.MS_MATH_LANG; try { lang = localStorage.getItem("msMathLang") || lang; } catch(e){}
  if(!TX[lang]) lang = "de";
  function T(k, v){ var s = (TX[lang] || TX.de)[k]; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  var NS = "http://www.w3.org/2000/svg", FORMEN = [[3, 4], [2, 5], [4, 5], [2.5, 3.5]], fi = 0, hilfe = false, P = null, svg = null;
  function el(n, a, t){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(t != null) e.textContent = t; return e; }
  var css = document.createElement("style");
  css.textContent = ".pz-karte{margin:16px 0;padding:14px 16px;background:#fff;border:2px solid #b0b0b8;border-radius:14px}.pz-karte h3{margin:0 0 6px;color:#1565c0}.pz-karte svg{width:100%;max-width:760px;height:auto;display:block;margin:6px auto;touch-action:none;user-select:none;-webkit-user-select:none}" +
    ".pz-knoepfe{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.pz-k{font:700 15px system-ui,sans-serif;padding:8px 14px;border-radius:12px;border:0;background:#e3eefc;color:#1565c0;cursor:pointer}.pz-dr{cursor:grab}.pz-dr.fest{cursor:default}" +
    ".pz-ok{color:#0b8a3e;font-weight:700}.pz-formel{font:800 22px system-ui,sans-serif;color:#7c3aed;text-align:center;margin:6px 0}";
  document.head.appendChild(css);
  var karte = document.createElement("div"); karte.className = "pz-karte"; karte.id = "puzzle";
  function geo(){ var a = FORMEN[fi][0], b = FORMEN[fi][1], s = a + b; return { a: a, b: b, s: s, gap: 1, k: 700 / (2 * s + 1) }; }
  // Dreieck: rechter Winkel in p, Katheten a (x) und b (y), um r·90° gedreht (mathematische Lage, y nach oben)
  function ecken(G, p, r){ var w = r * Math.PI / 2, c = Math.round(Math.cos(w)), si = Math.round(Math.sin(w)); function d(x, y){ return [p[0] + c * x - si * y, p[1] + si * x + c * y]; } return [d(0, 0), d(G.a, 0), d(0, G.b)]; }
  function start(){ var G = geo(), s = G.s, a = G.a;
    P = { G: G, teile: [[[0, 0], 0], [[s, 0], 1], [[s, s], 2], [[0, s], 3]].map(function(st, i){ var ziel = [[[0, a], 0], [[s, 0], 1], [[a, s], 2], [[a, a], 3]][i]; return { p: st[0].slice(), r: st[1], start: st[0].slice(), ziel: [ziel[0][0] + s + G.gap, ziel[0][1]], fest: false }; }) }; }
  function bau(){
    karte.innerHTML = "<h3>" + T("titel") + "</h3><p class=\"zeile\">" + T("anl") + '</p><div class="pz-knoepfe"><button type="button" class="pz-k" id="pzH">' + T("hilfe") + '</button><button type="button" class="pz-k" id="pzL">' + T("loes") + '</button><button type="button" class="pz-k" id="pzN">' + T("neu") + '</button><button type="button" class="pz-k" id="pzF">' + T("form") + '</button></div><div id="pzSvg"></div><p class="zeile" id="pzSt"></p><p class="pz-formel" id="pzFo" dir="ltr"></p>';
    karte.querySelector("#pzH").addEventListener("click", function(){ hilfe = !hilfe; zeichne(); });
    karte.querySelector("#pzN").addEventListener("click", function(){ start(); zeichne(); });
    karte.querySelector("#pzF").addEventListener("click", function(){ fi = (fi + 1) % FORMEN.length; start(); zeichne(); });
    karte.querySelector("#pzL").addEventListener("click", function(){ P.teile.forEach(function(t){ t.p = t.ziel.slice(); t.fest = true; }); zeichne(); });
    if(!P) start(); zeichne();
  }
  function zeichne(){
    var G = P.G, s = G.s, k = G.k, W = (2 * s + G.gap) * k + 20, H = s * k + 40, ox = 10, oy = 30;
    function X(x){ return ox + x * k; } function Y(y){ return oy + (s - y) * k; }
    function pfad(L){ return "M" + L.map(function(q){ return X(q[0]).toFixed(1) + " " + Y(q[1]).toFixed(1); }).join("L") + "Z"; }
    svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img" });
    var a = G.a, b = G.b, R = s + G.gap, fertig = P.teile.every(function(t){ return t.fest; });
    // linkes Quadrat: freie Fläche c²
    svg.appendChild(el("path", { d: pfad([[0, 0], [s, 0], [s, s], [0, s]]), fill: "#ffffff", stroke: "#1a2233", "stroke-width": 3 }));
    svg.appendChild(el("path", { d: pfad([[a, 0], [s, a], [b, s], [0, b]]), "class": "qc" }));
    svg.appendChild(el("text", { x: X(s / 2), y: Y(s / 2) + 9, "text-anchor": "middle", "font-size": 26, "font-weight": 800, fill: "#92400e" }, "c²"));
    // rechtes Quadrat: a² und b² erscheinen, wenn alles liegt
    svg.appendChild(el("path", { d: pfad([[R, 0], [R + s, 0], [R + s, s], [R, s]]), fill: "#ffffff", stroke: "#1a2233", "stroke-width": 3 }));
    if(fertig || hilfe){
      svg.appendChild(el("path", { d: pfad([[R, 0], [R + a, 0], [R + a, a], [R, a]]), "class": fertig ? "qa" : "", fill: fertig ? null : "none", stroke: "#1d4ed8", "stroke-width": 2, "stroke-dasharray": fertig ? "none" : "6 5" }));
      svg.appendChild(el("path", { d: pfad([[R + a, a], [R + s, a], [R + s, s], [R + a, s]]), "class": fertig ? "qb" : "", fill: fertig ? null : "none", stroke: "#15803d", "stroke-width": 2, "stroke-dasharray": fertig ? "none" : "6 5" }));
      if(fertig){ svg.appendChild(el("text", { x: X(R + a / 2), y: Y(a / 2) + 9, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: "#0b3d91" }, "a²")); svg.appendChild(el("text", { x: X(R + a + b / 2), y: Y(a + b / 2) + 9, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: "#14532d" }, "b²")); }
    }
    if(hilfe && !fertig) P.teile.forEach(function(t){ if(!t.fest) svg.appendChild(el("path", { d: pfad(ecken(G, t.ziel, t.r)), fill: "none", stroke: "#94a3b8", "stroke-width": 2, "stroke-dasharray": "5 4" })); });
    // Beschriftung a, b
    svg.appendChild(el("text", { x: X(a / 2), y: oy - 8, "text-anchor": "middle", "font-size": 18, "font-weight": 700 }, "a")); svg.appendChild(el("text", { x: X(a + b / 2), y: oy - 8, "text-anchor": "middle", "font-size": 18, "font-weight": 700 }, "b"));
    svg.appendChild(el("text", { x: X(R + a / 2), y: oy - 8, "text-anchor": "middle", "font-size": 18, "font-weight": 700 }, "a")); svg.appendChild(el("text", { x: X(R + a + b / 2), y: oy - 8, "text-anchor": "middle", "font-size": 18, "font-weight": 700 }, "b"));
    // Dreiecke
    var FARB = ["#2dd4bf", "#fbbf24", "#a78bfa", "#60a5fa"];
    P.teile.forEach(function(t, i){
      var g = el("path", { d: pfad(ecken(G, t.p, t.r)), fill: FARB[i], stroke: "#1a2233", "stroke-width": 2, "stroke-linejoin": "round", "class": "pz-dr" + (t.fest ? " fest" : ""), "data-i": i });
      svg.appendChild(g);
    });
    var box = karte.querySelector("#pzSvg"); box.innerHTML = ""; box.appendChild(svg);
    var n = P.teile.filter(function(t){ return t.fest; }).length, st = karte.querySelector("#pzSt");
    st.className = "zeile" + (fertig ? " pz-ok" : ""); st.textContent = fertig ? T("fertig") : T("stand", { n: n });
    karte.querySelector("#pzFo").textContent = fertig ? "c² = a² + b²" : "";
    if(fertig && !P.gelobt && typeof window.msRichtig === "function"){ P.gelobt = true; try { window.msRichtig(); } catch(x){} }
    ziehen(X, Y);
  }
  function ziehen(X, Y){
    var G = P.G, k = G.k, akt = null;
    function punkt(e){ var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal, sx = vb.width / r.width; return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sx]; }
    svg.addEventListener("pointerdown", function(e){
      var i = e.target.getAttribute && e.target.getAttribute("data-i"); if(i == null) return; var t = P.teile[+i]; if(t.fest) return;
      e.preventDefault(); var q = punkt(e); akt = { t: t, el: e.target, q0: q, p0: t.p.slice() }; svg.appendChild(e.target); try { svg.setPointerCapture(e.pointerId); } catch(x){}
    });
    svg.addEventListener("pointermove", function(e){
      if(!akt) return; var q = punkt(e), dx = (q[0] - akt.q0[0]) / k, dy = -(q[1] - akt.q0[1]) / k;
      akt.t.p = [akt.p0[0] + dx, akt.p0[1] + dy];
      akt.el.setAttribute("d", "M" + ecken(G, akt.t.p, akt.t.r).map(function(v){ return X(v[0]).toFixed(1) + " " + Y(v[1]).toFixed(1); }).join("L") + "Z");
    });
    function los(){
      if(!akt) return; var t = akt.t, d = Math.hypot(t.p[0] - t.ziel[0], t.p[1] - t.ziel[1]);
      if(d < 0.8){ t.p = t.ziel.slice(); t.fest = true; } akt = null; zeichne();
    }
    svg.addEventListener("pointerup", los); svg.addEventListener("pointercancel", los);
  }
  function einhaengen(){
    var ziel = document.getElementById("s_beweis"); if(!ziel) return;
    ziel.appendChild(karte); bau();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", einhaengen); else einhaengen();
  var alt = window.MS_LANG && window.MS_LANG.apply;
  if(window.MS_LANG) window.MS_LANG.apply = function(l){ if(alt) alt(l); if(TX[l]){ lang = l; bau(); } };
})();
