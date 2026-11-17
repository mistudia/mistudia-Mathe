// flaechen/zus2.js – „Zusammengesetzt“, zweiter Teil: Formen mit Kreisteilen und Dreiecken
// Rechteck + Halbkreis, Trapez + Halbkreis, Quadrat ohne Viertelkreis, Laufbahn (Rechteck + 2 Halbkreise),
// Haus (Rechteck + Dreieck). Zufällige Maße, Eingabe von Flächeninhalt und Umfang, Zerlegung färben,
// Tipp und Lösungsweg. Texte in 9 Sprachen (Z2), Sprache über MS_FL_ZUS2.sprache(l).
(function(){
  "use strict";
  var Z2 = {
  de: { titel: "Mit Kreisteilen und Dreiecken", intro: "Zerlege die Form in bekannte Teile. Berechne Flächeninhalt A und Umfang u (auf zwei Stellen gerundet, π ≈ 3,14159).", neu: "Neue Maße", pruefen: "Prüfen", tipp: "Tipp", weg: "Lösungsweg", zerl: "Zerlegung zeigen", richtig: "Richtig!", falsch: "Noch nicht. Schau dir den Tipp an.", flaeche: "Flächeninhalt A", umfang: "Umfang u", ein: "z. B. 12,5", laengen: "Maße in cm",
    F: { rh: ["Rechteck + Halbkreis", "Auf einem Rechteck sitzt ein Halbkreis."], th: ["Trapez + Halbkreis", "Ein gleichschenkliges Trapez mit einem Halbkreis auf der kurzen Seite."], qv: ["Quadrat ohne Viertelkreis", "Aus einem Quadrat wurde an einer Ecke ein Viertelkreis ausgeschnitten."], lb: ["Laufbahn", "Ein Rechteck mit je einem Halbkreis an beiden Enden."], hs: ["Haus", "Ein Rechteck mit einem gleichschenkligen Dreieck als Dach."] },
    T: { rh: "A = Rechteck + halber Kreis. Beim Umfang zählt nur der äußere Rand: drei Rechteckseiten und der halbe Kreisumfang.", th: "Die Schräge s gehört zu einem rechtwinkligen Dreieck mit der Höhe h – so findest du mit Pythagoras die untere Seite. Umfang: untere Seite, zwei Schrägen und der Halbkreisbogen.", qv: "A = Quadrat minus Viertelkreis. Am Rand: zwei ganze Seiten, zwei verkürzte Seiten und der Viertelkreisbogen.", lb: "Die beiden Halbkreise ergeben zusammen einen ganzen Kreis. Umfang: zwei gerade Strecken und ein ganzer Kreisumfang.", hs: "A = Rechteck + Dreieck. Die Dachschräge findest du mit Pythagoras (halbe Breite und Dachhöhe)." },
    L: { rechteck: "Rechteck:", halbkreis: "Halbkreis:", viertel: "Viertelkreis:", kreis: "Zwei Halbkreise = ein Kreis:", trapez: "Trapez:", dreieck: "Dreieck:", pyth: "Pythagoras:", summe: "Zusammen:", differenz: "Quadrat minus Viertelkreis:", bogen: "Kreisbogen:", rand: "Umfang = Rand entlanggehen:" } },
  en: { titel: "With parts of circles and triangles", intro: "Split the shape into known parts. Calculate the area A and the perimeter u (rounded to two decimals, π ≈ 3.14159).", neu: "New measures", pruefen: "Check", tipp: "Hint", weg: "Solution steps", zerl: "Show the parts", richtig: "Correct!", falsch: "Not yet. Have a look at the hint.", flaeche: "Area A", umfang: "Perimeter u", ein: "e.g. 12.5", laengen: "measures in cm",
    F: { rh: ["Rectangle + semicircle", "A semicircle sits on top of a rectangle."], th: ["Trapezium + semicircle", "An isosceles trapezium with a semicircle on the short side."], qv: ["Square without a quarter circle", "A quarter circle has been cut out of one corner of a square."], lb: ["Running track", "A rectangle with a semicircle at each end."], hs: ["House", "A rectangle with an isosceles triangle as its roof."] },
    T: { rh: "A = rectangle + half a circle. For the perimeter only the outer edge counts: three sides of the rectangle and half the circumference.", th: "The slanted side s belongs to a right-angled triangle with height h – Pythagoras gives you the bottom side. Perimeter: bottom side, two slanted sides and the semicircular arc.", qv: "A = square minus quarter circle. Along the edge: two whole sides, two shortened sides and the quarter-circle arc.", lb: "The two semicircles together make one whole circle. Perimeter: two straight parts and one whole circumference.", hs: "A = rectangle + triangle. You find the sloping roof side with Pythagoras (half the width and the roof height)." },
    L: { rechteck: "Rectangle:", halbkreis: "Semicircle:", viertel: "Quarter circle:", kreis: "Two semicircles = one circle:", trapez: "Trapezium:", dreieck: "Triangle:", pyth: "Pythagoras:", summe: "Together:", differenz: "Square minus quarter circle:", bogen: "Arc:", rand: "Perimeter = walk along the edge:" } },
  es: { titel: "Con partes de círculo y triángulos", intro: "Divide la figura en partes conocidas. Calcula el área A y el perímetro u (redondeados a dos decimales, π ≈ 3,14159).", neu: "Nuevas medidas", pruefen: "Comprobar", tipp: "Pista", weg: "Solución paso a paso", zerl: "Mostrar las partes", richtig: "¡Correcto!", falsch: "Todavía no. Mira la pista.", flaeche: "Área A", umfang: "Perímetro u", ein: "p. ej. 12,5", laengen: "medidas en cm",
    F: { rh: ["Rectángulo + semicírculo", "Sobre un rectángulo hay un semicírculo."], th: ["Trapecio + semicírculo", "Un trapecio isósceles con un semicírculo en el lado corto."], qv: ["Cuadrado sin un cuarto de círculo", "A un cuadrado se le ha recortado un cuarto de círculo en una esquina."], lb: ["Pista de atletismo", "Un rectángulo con un semicírculo en cada extremo."], hs: ["Casa", "Un rectángulo con un triángulo isósceles como tejado."] },
    T: { rh: "A = rectángulo + medio círculo. Para el perímetro solo cuenta el borde exterior: tres lados del rectángulo y media circunferencia.", th: "El lado inclinado s forma un triángulo rectángulo con la altura h: con Pitágoras obtienes el lado de abajo. Perímetro: lado de abajo, dos lados inclinados y el arco del semicírculo.", qv: "A = cuadrado menos cuarto de círculo. En el borde: dos lados enteros, dos lados acortados y el arco del cuarto de círculo.", lb: "Los dos semicírculos juntos forman un círculo entero. Perímetro: dos tramos rectos y una circunferencia entera.", hs: "A = rectángulo + triángulo. El lado inclinado del tejado se calcula con Pitágoras (media anchura y altura del tejado)." },
    L: { rechteck: "Rectángulo:", halbkreis: "Semicírculo:", viertel: "Cuarto de círculo:", kreis: "Dos semicírculos = un círculo:", trapez: "Trapecio:", dreieck: "Triángulo:", pyth: "Pitágoras:", summe: "En total:", differenz: "Cuadrado menos cuarto de círculo:", bogen: "Arco:", rand: "Perímetro = recorrer el borde:" } },
  zh: { titel: "含圆的一部分和三角形", intro: "把图形分成熟悉的部分，计算面积 A 和周长 u（保留两位小数，π ≈ 3.14159）。", neu: "换一组尺寸", pruefen: "检查", tipp: "提示", weg: "解题步骤", zerl: "显示分割", richtig: "正确！", falsch: "还不对，看看提示吧。", flaeche: "面积 A", umfang: "周长 u", ein: "例如 12.5", laengen: "单位 cm",
    F: { rh: ["长方形 + 半圆", "长方形上面有一个半圆。"], th: ["梯形 + 半圆", "等腰梯形的短边上有一个半圆。"], qv: ["正方形去掉四分之一圆", "从正方形的一个角剪去一个四分之一圆。"], lb: ["跑道", "长方形两端各有一个半圆。"], hs: ["房子", "长方形上面有一个等腰三角形屋顶。"] },
    T: { rh: "A = 长方形 + 半个圆。周长只算外边：长方形的三条边加半个圆周。", th: "斜边 s 和高 h 组成直角三角形——用勾股定理求下底。周长：下底、两条斜边和半圆弧。", qv: "A = 正方形减去四分之一圆。边上：两条整边、两条变短的边和四分之一圆弧。", lb: "两个半圆合起来是一个整圆。周长：两段直线加一个整圆周。", hs: "A = 长方形 + 三角形。屋顶斜边用勾股定理（半宽和屋顶高）。" },
    L: { rechteck: "长方形：", halbkreis: "半圆：", viertel: "四分之一圆：", kreis: "两个半圆 = 一个圆：", trapez: "梯形：", dreieck: "三角形：", pyth: "勾股定理：", summe: "合起来：", differenz: "正方形减四分之一圆：", bogen: "圆弧：", rand: "周长 = 沿边走一圈：" } },
  fr: { titel: "Avec des parties de cercle et des triangles", intro: "Découpe la figure en parties connues. Calcule l’aire A et le périmètre u (arrondis au centième, π ≈ 3,14159).", neu: "Nouvelles mesures", pruefen: "Vérifier", tipp: "Indice", weg: "Solution détaillée", zerl: "Montrer le découpage", richtig: "Juste !", falsch: "Pas encore. Regarde l’indice.", flaeche: "Aire A", umfang: "Périmètre u", ein: "p. ex. 12,5", laengen: "mesures en cm",
    F: { rh: ["Rectangle + demi-cercle", "Un demi-cercle est posé sur un rectangle."], th: ["Trapèze + demi-cercle", "Un trapèze isocèle avec un demi-cercle sur le petit côté."], qv: ["Carré sans quart de cercle", "On a découpé un quart de cercle dans un coin d’un carré."], lb: ["Piste d’athlétisme", "Un rectangle avec un demi-cercle à chaque extrémité."], hs: ["Maison", "Un rectangle avec un triangle isocèle comme toit."] },
    T: { rh: "A = rectangle + demi-disque. Pour le périmètre, seul le bord extérieur compte : trois côtés du rectangle et la moitié de la circonférence.", th: "Le côté oblique s forme avec la hauteur h un triangle rectangle – Pythagore donne le côté du bas. Périmètre : côté du bas, deux côtés obliques et l’arc du demi-cercle.", qv: "A = carré moins quart de disque. Sur le bord : deux côtés entiers, deux côtés raccourcis et l’arc du quart de cercle.", lb: "Les deux demi-disques forment ensemble un disque entier. Périmètre : deux parties droites et une circonférence entière.", hs: "A = rectangle + triangle. Le pan du toit se calcule avec Pythagore (demi-largeur et hauteur du toit)." },
    L: { rechteck: "Rectangle :", halbkreis: "Demi-disque :", viertel: "Quart de disque :", kreis: "Deux demi-disques = un disque :", trapez: "Trapèze :", dreieck: "Triangle :", pyth: "Pythagore :", summe: "Ensemble :", differenz: "Carré moins quart de disque :", bogen: "Arc :", rand: "Périmètre = faire le tour du bord :" } },
  ru: { titel: "С частями круга и треугольниками", intro: "Раздели фигуру на знакомые части. Вычисли площадь A и периметр u (с точностью до сотых, π ≈ 3,14159).", neu: "Новые размеры", pruefen: "Проверить", tipp: "Подсказка", weg: "Решение по шагам", zerl: "Показать части", richtig: "Верно!", falsch: "Пока нет. Посмотри подсказку.", flaeche: "Площадь A", umfang: "Периметр u", ein: "напр. 12,5", laengen: "размеры в см",
    F: { rh: ["Прямоугольник + полукруг", "На прямоугольнике лежит полукруг."], th: ["Трапеция + полукруг", "Равнобедренная трапеция с полукругом на короткой стороне."], qv: ["Квадрат без четверти круга", "Из угла квадрата вырезали четверть круга."], lb: ["Беговая дорожка", "Прямоугольник с полукругами на обоих концах."], hs: ["Домик", "Прямоугольник с равнобедренным треугольником в виде крыши."] },
    T: { rh: "A = прямоугольник + половина круга. Для периметра считается только внешний край: три стороны прямоугольника и половина длины окружности.", th: "Боковая сторона s вместе с высотой h образует прямоугольный треугольник — по Пифагору найдёшь нижнее основание. Периметр: нижнее основание, две боковые стороны и дуга полукруга.", qv: "A = квадрат минус четверть круга. По краю: две целые стороны, две укороченные и дуга четверти круга.", lb: "Два полукруга вместе дают целый круг. Периметр: два прямых отрезка и одна целая окружность.", hs: "A = прямоугольник + треугольник. Скат крыши найдёшь по Пифагору (половина ширины и высота крыши)." },
    L: { rechteck: "Прямоугольник:", halbkreis: "Полукруг:", viertel: "Четверть круга:", kreis: "Два полукруга = один круг:", trapez: "Трапеция:", dreieck: "Треугольник:", pyth: "Пифагор:", summe: "Вместе:", differenz: "Квадрат минус четверть круга:", bogen: "Дуга:", rand: "Периметр = обойти по краю:" } },
  ar: { titel: "بأجزاء من الدائرة ومثلثات", intro: "قسّم الشكل إلى أجزاء معروفة. احسب المساحة A والمحيط u (مقرّبين لمنزلتين عشريتين، π ≈ 3.14159).", neu: "قياسات جديدة", pruefen: "تحقّق", tipp: "تلميح", weg: "خطوات الحل", zerl: "إظهار الأجزاء", richtig: "صحيح!", falsch: "ليس بعد. انظر إلى التلميح.", flaeche: "المساحة A", umfang: "المحيط u", ein: "مثل 12.5", laengen: "القياسات بالسنتيمتر",
    F: { rh: ["مستطيل + نصف دائرة", "فوق مستطيل نصف دائرة."], th: ["شبه منحرف + نصف دائرة", "شبه منحرف متساوي الساقين فوق ضلعه القصير نصف دائرة."], qv: ["مربع بلا ربع دائرة", "قُصّ ربع دائرة من زاوية مربع."], lb: ["مضمار جري", "مستطيل في كل طرف منه نصف دائرة."], hs: ["بيت", "مستطيل فوقه مثلث متساوي الساقين سقفًا."] },
    T: { rh: "A = مستطيل + نصف دائرة. في المحيط يُحسب الحد الخارجي فقط: ثلاثة أضلاع للمستطيل ونصف محيط الدائرة.", th: "الضلع المائل s يكوّن مع الارتفاع h مثلثًا قائمًا – بفيثاغورس تجد الضلع السفلي. المحيط: الضلع السفلي والضلعان المائلان وقوس نصف الدائرة.", qv: "A = مربع ناقص ربع دائرة. على الحد: ضلعان كاملان وضلعان مقصّران وقوس ربع الدائرة.", lb: "نصفا الدائرة معًا دائرة كاملة. المحيط: جزءان مستقيمان ومحيط دائرة كامل.", hs: "A = مستطيل + مثلث. ميل السقف تجده بفيثاغورس (نصف العرض وارتفاع السقف)." },
    L: { rechteck: "مستطيل:", halbkreis: "نصف دائرة:", viertel: "ربع دائرة:", kreis: "نصفا دائرة = دائرة:", trapez: "شبه منحرف:", dreieck: "مثلث:", pyth: "فيثاغورس:", summe: "معًا:", differenz: "مربع ناقص ربع دائرة:", bogen: "قوس:", rand: "المحيط = السير على الحد:" } },
  ja: { titel: "円の一部や三角形をふくむ図形", intro: "図形を知っている部分に分けよう。面積 A とまわりの長さ u を求めよう（小数第2位まで、π ≈ 3.14159）。", neu: "寸法を変える", pruefen: "確かめる", tipp: "ヒント", weg: "解き方", zerl: "分け方を表示", richtig: "正解！", falsch: "まだです。ヒントを見てみよう。", flaeche: "面積 A", umfang: "まわりの長さ u", ein: "例 12.5", laengen: "単位は cm",
    F: { rh: ["長方形 + 半円", "長方形の上に半円がのっています。"], th: ["台形 + 半円", "等脚台形の短い辺に半円がついています。"], qv: ["四分円を切りとった正方形", "正方形の1つの角から四分円が切りとられています。"], lb: ["陸上トラック", "長方形の両はしに半円がついています。"], hs: ["家", "長方形の上に二等辺三角形の屋根があります。"] },
    T: { rh: "A = 長方形 + 円の半分。まわりの長さは外側だけ：長方形の3辺と円周の半分。", th: "ななめの辺 s は高さ h と直角三角形をつくる。三平方の定理で下の辺がわかる。まわり：下の辺、ななめの辺2本、半円の弧。", qv: "A = 正方形 − 四分円。まわり：まるごとの辺2本、短くなった辺2本、四分円の弧。", lb: "2つの半円を合わせると1つの円。まわり：まっすぐな部分2本と円周1つ分。", hs: "A = 長方形 + 三角形。屋根のななめの辺は三平方の定理で（幅の半分と屋根の高さ）。" },
    L: { rechteck: "長方形：", halbkreis: "半円：", viertel: "四分円：", kreis: "半円2つ = 円1つ：", trapez: "台形：", dreieck: "三角形：", pyth: "三平方の定理：", summe: "合わせて：", differenz: "正方形 − 四分円：", bogen: "弧：", rand: "まわりの長さ = ふちを一周：" } },
  pt: { titel: "Com partes de círculo e triângulos", intro: "Divida a figura em partes conhecidas. Calcule a área A e o perímetro u (arredondados a duas casas, π ≈ 3,14159).", neu: "Novas medidas", pruefen: "Verificar", tipp: "Dica", weg: "Solução passo a passo", zerl: "Mostrar as partes", richtig: "Certo!", falsch: "Ainda não. Veja a dica.", flaeche: "Área A", umfang: "Perímetro u", ein: "ex.: 12,5", laengen: "medidas em cm",
    F: { rh: ["Retângulo + semicírculo", "Um semicírculo está sobre um retângulo."], th: ["Trapézio + semicírculo", "Um trapézio isósceles com um semicírculo no lado menor."], qv: ["Quadrado sem um quarto de círculo", "Um quarto de círculo foi recortado de um canto de um quadrado."], lb: ["Pista de corrida", "Um retângulo com um semicírculo em cada ponta."], hs: ["Casa", "Um retângulo com um triângulo isósceles como telhado."] },
    T: { rh: "A = retângulo + meio círculo. No perímetro só conta a borda externa: três lados do retângulo e metade da circunferência.", th: "O lado inclinado s forma com a altura h um triângulo retângulo – com Pitágoras você acha o lado de baixo. Perímetro: lado de baixo, dois lados inclinados e o arco do semicírculo.", qv: "A = quadrado menos quarto de círculo. Na borda: dois lados inteiros, dois lados encurtados e o arco do quarto de círculo.", lb: "Os dois semicírculos juntos formam um círculo inteiro. Perímetro: duas partes retas e uma circunferência inteira.", hs: "A = retângulo + triângulo. A água do telhado sai com Pitágoras (metade da largura e altura do telhado)." },
    L: { rechteck: "Retângulo:", halbkreis: "Semicírculo:", viertel: "Quarto de círculo:", kreis: "Dois semicírculos = um círculo:", trapez: "Trapézio:", dreieck: "Triângulo:", pyth: "Pitágoras:", summe: "Juntos:", differenz: "Quadrado menos quarto de círculo:", bogen: "Arco:", rand: "Perímetro = percorrer a borda:" } }
  };
  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  if(!Z2[lang]) lang = "de";
  function S(){ return Z2[lang] || Z2.de; }
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }
  function z(v, d){ if(d == null) d = 2; var s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace(/0+$/, "").replace(/\.$/, ""); return komma() ? s.replace(".", ",") : s; }
  function r1(a, b){ return Math.round((a + Math.random() * (b - a)) * 2) / 2; }
  var PI = Math.PI;

  // ---------- Formen ----------
  // gen → Maße; bau(P) → { A, u, wegA, wegU, svg(zerl) }
  var FO = {
    rh: { gen: function(){ return { a: r1(4, 9), b: r1(3, 7) }; },
      bau: function(P){ var a = P.a, b = P.b, r = a / 2, Ar = a * b, Ah = PI * r * r / 2, A = Ar + Ah, bo = PI * r, u = a + 2 * b + bo;
        return { A: A, u: u, geg: "a = " + z(a) + ", b = " + z(b),
          wegA: [["rechteck", "a · b = " + z(a) + " · " + z(b) + " = " + z(Ar) + " cm²"], ["halbkreis", "r = a : 2 = " + z(r) + ";  π · r² : 2 = π · " + z(r) + "² : 2 ≈ " + z(Ah) + " cm²"], ["summe", "A ≈ " + z(Ar) + " + " + z(Ah) + " ≈ " + z(A) + " cm²"]],
          wegU: [["bogen", "π · r = π · " + z(r) + " ≈ " + z(bo) + " cm"], ["rand", "u = a + 2 · b + π · r ≈ " + z(a) + " + 2 · " + z(b) + " + " + z(bo) + " ≈ " + z(u) + " cm"]],
          pts: { w: a, h: b + r }, zeichne: function(X, Y, zl){
            var s = '<path d="M' + X(0) + " " + Y(0) + " L" + X(a) + " " + Y(0) + " L" + X(a) + " " + Y(b) + " A" + (X(r) - X(0)) + " " + (X(r) - X(0)) + " 0 0 0 " + X(0) + " " + Y(b) + 'Z" class="' + (zl ? "z2-leer" : "z2-form") + '"/>';
            if(zl) s += '<rect x="' + X(0) + '" y="' + Y(b) + '" width="' + (X(a) - X(0)) + '" height="' + (Y(0) - Y(b)) + '" class="z2-t1"/><path d="M' + X(a) + " " + Y(b) + " A" + (X(r) - X(0)) + " " + (X(r) - X(0)) + " 0 0 0 " + X(0) + " " + Y(b) + 'Z" class="z2-t2"/>';
            s += '<line x1="' + X(r) + '" y1="' + Y(b) + '" x2="' + X(a) + '" y2="' + Y(b) + '" class="z2-r"/>' + lab(X(r * 1.5), Y(b) - 10, "r") + lab(X(a / 2), Y(0) + 24, z(a)) + lab(X(a) + 22, Y(b / 2) + 5, z(b));
            return s; } }; } },
    th: { gen: function(){ var c = r1(3, 6), h = r1(3, 6), x = r1(1.5, 3.5); return { c: c, h: h, x: x }; },
      bau: function(P){ var c = P.c, h = P.h, x = P.x, s = Math.hypot(x, h), g = c + 2 * x, r = c / 2, At = (g + c) / 2 * h, Ah = PI * r * r / 2, A = At + Ah, bo = PI * r, u = g + 2 * s + bo;
        return { A: A, u: u, geg: "c = " + z(c) + ", h = " + z(h) + ", s = " + z(s, 2),
          wegA: [["pyth", "x = √(s² − h²) = √(" + z(s * s, 2) + " − " + z(h * h) + ") ≈ " + z(x) + ";  g = c + 2 · x ≈ " + z(g)], ["trapez", "(g + c) : 2 · h = (" + z(g) + " + " + z(c) + ") : 2 · " + z(h) + " ≈ " + z(At) + " cm²"], ["halbkreis", "π · " + z(r) + "² : 2 ≈ " + z(Ah) + " cm²"], ["summe", "A ≈ " + z(At) + " + " + z(Ah) + " ≈ " + z(A) + " cm²"]],
          wegU: [["bogen", "π · r = π · " + z(r) + " ≈ " + z(bo) + " cm"], ["rand", "u = g + 2 · s + π · r ≈ " + z(g) + " + 2 · " + z(s) + " + " + z(bo) + " ≈ " + z(u) + " cm"]],
          pts: { w: g, h: h + r }, zeichne: function(X, Y, zl){
            var R = X(r) - X(0), arc = " A" + R + " " + R + " 0 0 0 ";
            var sp = '<path d="M' + X(0) + " " + Y(0) + " L" + X(g) + " " + Y(0) + " L" + X(x + c) + " " + Y(h) + arc + X(x) + " " + Y(h) + 'Z" class="' + (zl ? "z2-leer" : "z2-form") + '"/>';
            if(zl) sp += '<path d="M' + X(0) + " " + Y(0) + " L" + X(g) + " " + Y(0) + " L" + X(x + c) + " " + Y(h) + " L" + X(x) + " " + Y(h) + 'Z" class="z2-t1"/><path d="M' + X(x + c) + " " + Y(h) + arc + X(x) + " " + Y(h) + 'Z" class="z2-t2"/>';
            sp += '<line x1="' + X(x) + '" y1="' + Y(h) + '" x2="' + X(x) + '" y2="' + Y(0) + '" class="z2-h"/>' + lab(X(x) + 14, Y(h / 2), "h", "#dc2626") + lab(X(x + c / 2), Y(h) + 22, "c") + lab(X(g / 2), Y(0) + 24, "g") + lab(X(g - x / 2) + 16, Y(h / 2), "s");
            return sp; } }; } },
    qv: { gen: function(){ var a = r1(5, 9); return { a: a, r: r1(2, a - 1.5) }; },
      bau: function(P){ var a = P.a, r = P.r, Aq = a * a, Av = PI * r * r / 4, A = Aq - Av, bo = PI * r / 2, u = 2 * a + 2 * (a - r) + bo;
        return { A: A, u: u, geg: "a = " + z(a) + ", r = " + z(r),
          wegA: [["rechteck", "a² = " + z(a) + "² = " + z(Aq) + " cm²"], ["viertel", "π · r² : 4 = π · " + z(r) + "² : 4 ≈ " + z(Av) + " cm²"], ["differenz", "A ≈ " + z(Aq) + " − " + z(Av) + " ≈ " + z(A) + " cm²"]],
          wegU: [["bogen", "2 · π · r : 4 = π · " + z(r) + " : 2 ≈ " + z(bo) + " cm"], ["rand", "u = 2 · a + 2 · (a − r) + π · r : 2 ≈ 2 · " + z(a) + " + 2 · " + z(a - r) + " + " + z(bo) + " ≈ " + z(u) + " cm"]],
          pts: { w: a, h: a }, zeichne: function(X, Y, zl){
            var R = X(r) - X(0);
            var sp = '<path d="M' + X(0) + " " + Y(0) + " L" + X(a) + " " + Y(0) + " L" + X(a) + " " + Y(a - r) + " A" + R + " " + R + " 0 0 1 " + X(a - r) + " " + Y(a) + " L" + X(0) + " " + Y(a) + 'Z" class="z2-form"/>';
            if(zl) sp += '<path d="M' + X(a) + " " + Y(a) + " L" + X(a) + " " + Y(a - r) + " A" + R + " " + R + " 0 0 1 " + X(a - r) + " " + Y(a) + 'Z" class="z2-loch"/>';
            sp += '<line x1="' + X(a) + '" y1="' + Y(a) + '" x2="' + X(a) + '" y2="' + Y(a - r) + '" class="z2-r"/>' + lab(X(a) + 14, Y(a - r / 2), "r") + lab(X(a / 2), Y(0) + 24, "a") + lab(X(0) - 16, Y(a / 2), "a");
            return sp; } }; } },
    lb: { gen: function(){ return { l: r1(6, 10), d: r1(2.5, 5) }; },
      bau: function(P){ var l = P.l, d = P.d, r = d / 2, Ar = l * d, Ak = PI * r * r, A = Ar + Ak, bo = PI * d, u = 2 * l + bo;
        return { A: A, u: u, geg: "l = " + z(l) + ", d = " + z(d),
          wegA: [["rechteck", "l · d = " + z(l) + " · " + z(d) + " = " + z(Ar) + " cm²"], ["kreis", "r = " + z(r) + ";  π · r² ≈ " + z(Ak) + " cm²"], ["summe", "A ≈ " + z(Ar) + " + " + z(Ak) + " ≈ " + z(A) + " cm²"]],
          wegU: [["bogen", "π · d = π · " + z(d) + " ≈ " + z(bo) + " cm"], ["rand", "u = 2 · l + π · d ≈ 2 · " + z(l) + " + " + z(bo) + " ≈ " + z(u) + " cm"]],
          pts: { w: l + d, h: d, x0: -r }, zeichne: function(X, Y, zl){
            var R = X(r) - X(0);
            var sp = '<path d="M' + X(0) + " " + Y(0) + " L" + X(l) + " " + Y(0) + " A" + R + " " + R + " 0 0 0 " + X(l) + " " + Y(d) + " L" + X(0) + " " + Y(d) + " A" + R + " " + R + " 0 0 0 " + X(0) + " " + Y(0) + 'Z" class="' + (zl ? "z2-leer" : "z2-form") + '"/>';
            if(zl) sp += '<rect x="' + X(0) + '" y="' + Y(d) + '" width="' + (X(l) - X(0)) + '" height="' + (Y(0) - Y(d)) + '" class="z2-t1"/><path d="M' + X(l) + " " + Y(0) + " A" + R + " " + R + " 0 0 0 " + X(l) + " " + Y(d) + 'Z" class="z2-t2"/><path d="M' + X(0) + " " + Y(d) + " A" + R + " " + R + " 0 0 0 " + X(0) + " " + Y(0) + 'Z" class="z2-t2"/>';
            sp += '<line x1="' + X(l) + '" y1="' + Y(0) + '" x2="' + X(l) + '" y2="' + Y(d) + '" class="z2-r"/>' + lab(X(l) - 14, Y(r) + 5, "d") + lab(X(l / 2), Y(0) + 24, "l");
            return sp; } }; } },
    hs: { gen: function(){ return { a: r1(4, 8), b: r1(3, 6), h: r1(1.5, 4) }; },
      bau: function(P){ var a = P.a, b = P.b, h = P.h, s = Math.hypot(a / 2, h), Ar = a * b, Ad = a * h / 2, A = Ar + Ad, u = a + 2 * b + 2 * s;
        return { A: A, u: u, geg: "a = " + z(a) + ", b = " + z(b) + ", h = " + z(h),
          wegA: [["rechteck", "a · b = " + z(a) + " · " + z(b) + " = " + z(Ar) + " cm²"], ["dreieck", "a · h : 2 = " + z(a) + " · " + z(h) + " : 2 = " + z(Ad) + " cm²"], ["summe", "A = " + z(Ar) + " + " + z(Ad) + " = " + z(A) + " cm²"]],
          wegU: [["pyth", "s = √((a : 2)² + h²) = √(" + z(a / 2) + "² + " + z(h) + "²) ≈ " + z(s) + " cm"], ["rand", "u = a + 2 · b + 2 · s ≈ " + z(a) + " + 2 · " + z(b) + " + 2 · " + z(s) + " ≈ " + z(u) + " cm"]],
          pts: { w: a, h: b + h }, zeichne: function(X, Y, zl){
            var sp = '<path d="M' + X(0) + " " + Y(0) + " L" + X(a) + " " + Y(0) + " L" + X(a) + " " + Y(b) + " L" + X(a / 2) + " " + Y(b + h) + " L" + X(0) + " " + Y(b) + 'Z" class="' + (zl ? "z2-leer" : "z2-form") + '"/>';
            if(zl) sp += '<rect x="' + X(0) + '" y="' + Y(b) + '" width="' + (X(a) - X(0)) + '" height="' + (Y(0) - Y(b)) + '" class="z2-t1"/><path d="M' + X(0) + " " + Y(b) + " L" + X(a) + " " + Y(b) + " L" + X(a / 2) + " " + Y(b + h) + 'Z" class="z2-t2"/>';
            sp += '<line x1="' + X(a / 2) + '" y1="' + Y(b + h) + '" x2="' + X(a / 2) + '" y2="' + Y(b) + '" class="z2-h"/>' + lab(X(a / 2) + 14, Y(b + h / 2) + 5, "h", "#dc2626") + lab(X(a / 2), Y(0) + 24, "a") + lab(X(a) + 18, Y(b / 2) + 5, "b") + lab(X(a * 0.78) + 14, Y(b + h * 0.45), "s");
            return sp; } }; } }
  };
  function lab(x, y, t, f){ return '<text x="' + x + '" y="' + y + '" class="z2-lab"' + (f ? ' style="fill:' + f + '"' : "") + ' text-anchor="middle">' + esc(t) + "</text>"; }
  var REIHE = ["rh", "th", "qv", "lb", "hs"], akt = "rh", P = null, zust = {}, zerl = false;
  function neu(){ P = FO[akt].gen(); zust = {}; zerl = false; }
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/[a-zA-Z²]+$/, "").replace(",", "."); return /^\d*\.?\d+$/.test(s) ? +s : NaN; }
  function stimmt(e, w){ return isFinite(e) && Math.abs(e - w) <= Math.max(0.051, 0.005 * w); }

  function zeigen(){
    var box = $("zus2"); if(!box) return;
    var s = S(); if(!P) neu();
    var B = FO[akt].bau(P), W = 400, H = 280, pad = 40, x0 = B.pts.x0 || 0, w = B.pts.w, hh = B.pts.h;
    var m = Math.min((W - 2 * pad) / w, (H - 2 * pad) / hh), ox = (W - w * m) / 2 - x0 * m, oy = H - (H - hh * m) / 2;
    var X = function(x){ return ox + x * m; }, Y = function(y){ return oy - y * m; };
    var h = "<h2>" + esc(s.titel) + '</h2><p class="zeile">' + esc(s.intro) + '</p><div class="z2-wahl" id="z2Wahl">' +
      REIHE.map(function(k){ return '<button type="button" data-f="' + k + '" aria-pressed="' + (k === akt) + '">' + esc(s.F[k][0]) + "</button>"; }).join("") + "</div>";
    h += '<div class="zwei"><div><p class="zeile">' + esc(s.F[akt][1]) + '</p><svg class="z2-svg" viewBox="0 0 ' + W + " " + H + '">' + B.zeichne(X, Y, zerl) + "</svg>" +
      '<p class="zeile"><button type="button" class="knopf hell" id="z2Zerl" aria-pressed="' + zerl + '">◧ ' + esc(s.zerl) + "</button></p></div><div>";
    h += '<p class="zeile"><bdi dir="ltr">' + esc(B.geg) + '</bdi> <span class="muted">(' + esc(s.laengen) + ")</span></p>";
    [["A", s.flaeche, "cm²", B.A, B.wegA], ["u", s.umfang, "cm", B.u, B.wegU]].forEach(function(q){
      var zz = zust[q[0]] || {};
      h += '<div class="z2-frage"><div class="z2-ein"><label><b>' + esc(q[1]) + '</b> =</label> <input class="zahl z2-inp" data-q="' + q[0] + '" inputmode="decimal" autocomplete="off" placeholder="' + esc(s.ein) + '" value="' + esc(zz.e || "") + '"> <b>' + q[2] + "</b>" +
        ' <button type="button" class="knopf z2-pr" data-q="' + q[0] + '">' + esc(s.pruefen) + '</button> <span class="z2-m ' + (zz.ok === true ? "gut" : zz.ok === false ? "schlecht" : "") + '">' + (zz.ok === true ? esc(s.richtig) : zz.ok === false ? esc(s.falsch) : "") + "</span></div>" +
        '<details class="z2-weg"' + (zz.ok === true ? " open" : "") + "><summary>" + esc(s.weg) + '</summary><ol class="lauf">' + q[4].map(function(x){ return '<li><span class="z2-l">' + esc(s.L[x[0]]) + '</span><br><bdi dir="ltr">' + esc(x[1]) + "</bdi></li>"; }).join("") + "</ol></details></div>";
    });
    h += '<details class="z2-tipp"' + (Object.keys(zust).some(function(k){ return zust[k].ok === false; }) ? " open" : "") + "><summary>" + esc(s.tipp) + "</summary><p>" + esc(s.T[akt]) + "</p></details>";
    h += '<p><button type="button" class="knopf hell" id="z2Neu">↻ ' + esc(s.neu) + "</button></p></div></div>";
    box.innerHTML = h;
    box.querySelectorAll("#z2Wahl button").forEach(function(b){ b.addEventListener("click", function(){ akt = b.dataset.f; neu(); zeigen(); }); });
    $("z2Neu").addEventListener("click", function(){ neu(); zeigen(); });
    $("z2Zerl").addEventListener("click", function(){ zerl = !zerl; zeigen(); });
    function pruefe(q){
      var inp = box.querySelector('.z2-inp[data-q="' + q + '"]');
      zust[q] = { e: inp.value, ok: stimmt(lies(inp.value), q === "A" ? B.A : B.u) }; if(!zust[q].ok) zerl = true; zeigen();
      var n = box.querySelector('.z2-inp[data-q="' + (zust[q].ok && q === "A" ? "u" : q) + '"]'); if(n) n.focus();
    }
    box.querySelectorAll(".z2-pr").forEach(function(b){ b.addEventListener("click", function(){ pruefe(b.dataset.q); }); });
    box.querySelectorAll(".z2-inp").forEach(function(inp){
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); pruefe(inp.dataset.q); } });
      inp.addEventListener("input", function(){ zust[inp.dataset.q] = { e: inp.value }; });
    });
  }
  var css = document.createElement("style");
  css.textContent =
    "#zus2 h2{margin:0 0 4px;font-size:19px;color:#1565c0}" +
    ".z2-wahl{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 10px}.z2-wahl button{font:600 14px system-ui,sans-serif;padding:6px 12px;border-radius:999px;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;cursor:pointer}" +
    ".z2-wahl button[aria-pressed=\"true\"]{background:#1565c0;border-color:#1565c0;color:#ffffff}" +
    ".z2-svg{width:100%;height:auto;display:block;background:#ffffff;border:1px solid #c9dcf2;border-radius:12px}" +
    ".z2-form{fill:#f4c27a;stroke:#92400e;stroke-width:3;stroke-linejoin:round}.z2-leer{fill:none;stroke:#92400e;stroke-width:3;stroke-linejoin:round}" +
    ".z2-t1{fill:rgba(37,99,235,.28);stroke:#1d4ed8;stroke-width:2;stroke-dasharray:6 4}.z2-t2{fill:rgba(22,163,74,.32);stroke:#15803d;stroke-width:2;stroke-dasharray:6 4}" +
    ".z2-loch{fill:rgba(220,38,38,.12);stroke:#dc2626;stroke-width:2;stroke-dasharray:6 4}" +
    ".z2-r{stroke:#7c3aed;stroke-width:2.5}.z2-h{stroke:#dc2626;stroke-width:2.5;stroke-dasharray:6 4}" +
    ".z2-lab{font:700 17px system-ui,sans-serif;fill:#1a2233;paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round}" +
    ".z2-frage{border-top:1px solid #dbe5f3;padding-top:8px;margin-top:8px}.z2-ein{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.z2-ein .z2-inp{width:125px}" +
    ".z2-m{font-weight:700}.z2-m.gut{color:#15803d}.z2-m.schlecht{color:#b91c1c}" +
    ".z2-tipp,.z2-weg{margin:6px 0}.z2-tipp summary,.z2-weg summary{cursor:pointer;font-weight:700;color:#1565c0;font-size:15px;padding:4px 0}" +
    ".z2-tipp p{background:#fff8e1;border-inline-start:4px solid #f59e0b;padding:6px 10px;border-radius:8px;margin:4px 0;font-size:15.5px;line-height:1.45;color:#1a2233}" +
    ".z2-weg .lauf{font-size:16.5px;line-height:1.5;padding-inline-start:22px}.z2-weg .lauf li{margin:4px 0}.z2-l{color:#4f5b6e;font-size:14px}";
  document.head.appendChild(css);
  window.MS_FL_ZUS2 = { sprache: function(l){ if(Z2[l]) lang = l; zeigen(); }, zeigen: zeigen };
})();
