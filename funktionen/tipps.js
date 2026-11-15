// /funktionen/tipps.js – Erklär-Blasen für die Zeichen der Funktions-Seiten (9 Sprachen).
// Beobachtet #analyse, #formLive und #regler. Jede Formel (span.f), die mit einem bekannten Zeichen
// beginnt (xS =, D =, N₁(…), f′(x) = …), bekommt an diesem Zeichen eine Erklärung; welches Zeichen
// was bedeutet, hängt von der Karte ab (i-Knopf data-b). Parameter-Buchstaben (a, b, c, m, t …)
// im Formelkasten und an den Reglern bekommen eine Erklärung passend zur Seite.
(function(){
  "use strict";
  var TX = {
  de: { xS: "xₛ = x-Koordinate des Scheitelpunkts: Dort liegt die Symmetrieachse der Parabel.", yS: "yₛ = y-Koordinate des Scheitelpunkts: der kleinste (oder größte) Funktionswert.", S: "S = Scheitelpunkt: der tiefste Punkt (Öffnung nach oben) oder höchste Punkt (Öffnung nach unten) der Parabel.",
    Sy: "Sy = Schnittpunkt mit der y-Achse: Man setzt x = 0 ein, also Sy(0 | f(0)).", N: "N = Nullstelle: Dort schneidet oder berührt der Graph die x-Achse, also f(x) = 0.",
    Ddiskr: "D = Diskriminante b² − 4ac: Sie entscheidet, wie viele Nullstellen es gibt (D > 0: zwei, D = 0: eine, D < 0: keine).", Ddef: "D = Definitionsbereich: alle x-Werte, die man einsetzen darf.", W: "W = Wertebereich: alle y-Werte, die die Funktion annehmen kann.",
    WP: "W = Wendepunkt: Dort wechselt der Graph von einer Links- in eine Rechtskurve (oder umgekehrt).", H: "H = Hochpunkt: höchster Punkt in seiner Umgebung (lokales Maximum).", T: "T = Tiefpunkt: tiefster Punkt in seiner Umgebung (lokales Minimum).",
    x12: "x₁,₂ = die beiden Lösungen (Nullstellen): einmal mit +, einmal mit − vor der Wurzel.", f1: "f′ = erste Ableitung: die Steigung des Graphen an jeder Stelle. f′(x) = 0 bei waagerechter Tangente.", f2: "f″ = zweite Ableitung: die Krümmung. f″ > 0 Linkskurve (Tiefpunkt), f″ < 0 Rechtskurve (Hochpunkt).", f3: "f‴ = dritte Ableitung: Ist sie ≠ 0, ist eine Stelle mit f″ = 0 wirklich ein Wendepunkt.",
    m: "m = Steigung: So viel geht der Graph nach oben (bei negativem m nach unten), wenn man 1 nach rechts geht.", alpha: "α = Steigungswinkel: der Winkel zwischen Graph und x-Achse, tan α = m.",
    asx: "x = …: senkrechte Asymptote (Polstelle) – der Graph kommt dieser Geraden beliebig nahe, berührt sie aber nie.", asy: "y = …: Asymptote für x → ±∞ – dieser Linie nähert sich der Graph ganz außen an.",
    lin_m: "m = Steigung: 1 nach rechts, m nach oben.", lin_t: "y-Achsenabschnitt: Hier schneidet die Gerade die y-Achse (Punkt (0 | Achsenabschnitt)).",
    q_a: "a = Streckfaktor: a > 0 nach oben offen, a < 0 nach unten. |a| > 1 schmaler, |a| < 1 breiter als die Normalparabel.", q_b: "b verschiebt die Parabel schräg; der Scheitel liegt bei x = −b : (2a).", q_c: "c = y-Achsenabschnitt: f(0) = c.",
    q_d: "d = Verschiebung nach rechts (bei negativem d nach links): Scheitel bei x = d. Achtung: in a(x − d)² + e steht ein Minus!", q_e: "e = Verschiebung nach oben (bei negativem e nach unten): Scheitel bei y = e." },
  en: { xS: "xₛ = x-coordinate of the vertex: the axis of symmetry of the parabola lies there.", yS: "yₛ = y-coordinate of the vertex: the smallest (or largest) function value.", S: "S = vertex: the lowest point (opens upward) or highest point (opens downward) of the parabola.",
    Sy: "Sy = y-intercept: substitute x = 0, so Sy(0 | f(0)).", N: "N = zero (root): the graph crosses or touches the x-axis there, i.e. f(x) = 0.",
    Ddiskr: "D = discriminant b² − 4ac: it decides how many zeros there are (D > 0: two, D = 0: one, D < 0: none).", Ddef: "D = domain: all x-values you may substitute.", W: "W = range: all y-values the function can take.",
    WP: "W = inflection point: the graph changes from turning left to turning right (or vice versa).", H: "H = maximum point: highest point in its neighbourhood (local maximum).", T: "T = minimum point: lowest point in its neighbourhood (local minimum).",
    x12: "x₁,₂ = the two solutions (zeros): once with +, once with − in front of the root.", f1: "f′ = first derivative: the slope of the graph at every point. f′(x) = 0 where the tangent is horizontal.", f2: "f″ = second derivative: the curvature. f″ > 0 turning left (minimum), f″ < 0 turning right (maximum).", f3: "f‴ = third derivative: if it is ≠ 0, a point with f″ = 0 really is an inflection point.",
    m: "m = slope: the graph goes up this much (down if m is negative) when you go 1 to the right.", alpha: "α = angle of inclination: the angle between the graph and the x-axis, tan α = m.",
    asx: "x = …: vertical asymptote (pole) – the graph gets arbitrarily close to this line but never touches it.", asy: "y = …: asymptote for x → ±∞ – the graph approaches this line far out.",
    lin_m: "m = slope: 1 to the right, m up.", lin_t: "y-intercept: the line crosses the y-axis here (point (0 | intercept)).",
    q_a: "a = stretch factor: a > 0 opens upward, a < 0 downward. |a| > 1 narrower, |a| < 1 wider than the standard parabola.", q_b: "b shifts the parabola diagonally; the vertex is at x = −b : (2a).", q_c: "c = y-intercept: f(0) = c.",
    q_d: "d = shift to the right (to the left if d is negative): vertex at x = d. Careful: a(x − d)² + e contains a minus!", q_e: "e = shift up (down if e is negative): vertex at y = e." },
  es: { xS: "xₛ = coordenada x del vértice: ahí está el eje de simetría de la parábola.", yS: "yₛ = coordenada y del vértice: el valor mínimo (o máximo) de la función.", S: "S = vértice: el punto más bajo (abre hacia arriba) o más alto (abre hacia abajo) de la parábola.",
    Sy: "Sy = corte con el eje y: se sustituye x = 0, o sea Sy(0 | f(0)).", N: "N = cero (raíz): ahí el gráfico corta o toca el eje x, es decir f(x) = 0.",
    Ddiskr: "D = discriminante b² − 4ac: decide cuántos ceros hay (D > 0: dos, D = 0: uno, D < 0: ninguno).", Ddef: "D = dominio: todos los valores de x que se pueden sustituir.", W: "W = recorrido (imagen): todos los valores de y que toma la función.",
    WP: "W = punto de inflexión: el gráfico pasa de curvarse a la izquierda a curvarse a la derecha (o al revés).", H: "H = máximo: el punto más alto de su entorno (máximo local).", T: "T = mínimo: el punto más bajo de su entorno (mínimo local).",
    x12: "x₁,₂ = las dos soluciones (ceros): una con + y otra con − delante de la raíz.", f1: "f′ = primera derivada: la pendiente del gráfico en cada punto. f′(x) = 0 donde la tangente es horizontal.", f2: "f″ = segunda derivada: la curvatura. f″ > 0 cóncava hacia arriba (mínimo), f″ < 0 hacia abajo (máximo).", f3: "f‴ = tercera derivada: si es ≠ 0, un punto con f″ = 0 es de verdad un punto de inflexión.",
    m: "m = pendiente: el gráfico sube tanto (baja si m es negativa) al avanzar 1 a la derecha.", alpha: "α = ángulo de inclinación: el ángulo entre el gráfico y el eje x, tan α = m.",
    asx: "x = …: asíntota vertical (polo): el gráfico se acerca todo lo que quiera a esta recta, pero nunca la toca.", asy: "y = …: asíntota para x → ±∞: el gráfico se acerca a esta recta muy lejos.",
    lin_m: "m = pendiente: 1 a la derecha, m hacia arriba.", lin_t: "Ordenada en el origen: aquí la recta corta el eje y (punto (0 | ordenada)).",
    q_a: "a = factor de dilatación: a > 0 abre hacia arriba, a < 0 hacia abajo. |a| > 1 más estrecha, |a| < 1 más ancha que la parábola normal.", q_b: "b desplaza la parábola en diagonal; el vértice está en x = −b : (2a).", q_c: "c = corte con el eje y: f(0) = c.",
    q_d: "d = desplazamiento a la derecha (a la izquierda si d es negativo): vértice en x = d. ¡Ojo: en a(x − d)² + e hay un menos!", q_e: "e = desplazamiento hacia arriba (abajo si e es negativo): vértice en y = e." },
  zh: { xS: "xₛ = 顶点的横坐标：抛物线的对称轴就在这里。", yS: "yₛ = 顶点的纵坐标：函数的最小值（或最大值）。", S: "S = 顶点：抛物线的最低点（开口向上）或最高点（开口向下）。",
    Sy: "Sy = 与 y 轴的交点：代入 x = 0，即 Sy(0 | f(0))。", N: "N = 零点：图像在这里与 x 轴相交或相切，即 f(x) = 0。",
    Ddiskr: "D = 判别式 b² − 4ac：决定零点个数（D > 0 两个，D = 0 一个，D < 0 没有）。", Ddef: "D = 定义域：可以代入的所有 x 值。", W: "W = 值域：函数能取到的所有 y 值。",
    WP: "W = 拐点：图像在这里由向左弯变成向右弯（或相反）。", H: "H = 极大值点：附近最高的点。", T: "T = 极小值点：附近最低的点。",
    x12: "x₁,₂ = 两个解（零点）：根号前一次取 +，一次取 −。", f1: "f′ = 一阶导数：图像在每一点的斜率。切线水平处 f′(x) = 0。", f2: "f″ = 二阶导数：弯曲方向。f″ > 0 向左弯（极小值），f″ < 0 向右弯（极大值）。", f3: "f‴ = 三阶导数：若它 ≠ 0，f″ = 0 的点确实是拐点。",
    m: "m = 斜率：向右走 1，图像上升 m（m 为负则下降）。", alpha: "α = 倾斜角：图像与 x 轴的夹角，tan α = m。",
    asx: "x = …：竖直渐近线（极点）——图像无限接近这条线，但永远碰不到。", asy: "y = …：x → ±∞ 时的渐近线——图像在很远处靠近这条线。",
    lin_m: "m = 斜率：向右 1，向上 m。", lin_t: "y 轴截距：直线在这里与 y 轴相交（点 (0 | 截距)）。",
    q_a: "a = 伸缩系数：a > 0 开口向上，a < 0 向下。|a| > 1 比标准抛物线窄，|a| < 1 宽。", q_b: "b 使抛物线斜向平移；顶点在 x = −b : (2a)。", q_c: "c = y 轴截距：f(0) = c。",
    q_d: "d = 向右平移（d 为负则向左）：顶点在 x = d。注意：a(x − d)² + e 里是减号！", q_e: "e = 向上平移（e 为负则向下）：顶点在 y = e。" },
  fr: { xS: "xₛ = abscisse du sommet : l’axe de symétrie de la parabole passe là.", yS: "yₛ = ordonnée du sommet : la plus petite (ou plus grande) valeur de la fonction.", S: "S = sommet : le point le plus bas (ouverte vers le haut) ou le plus haut (vers le bas) de la parabole.",
    Sy: "Sy = intersection avec l’axe des y : on remplace x par 0, donc Sy(0 | f(0)).", N: "N = zéro (racine) : la courbe coupe ou touche l’axe des x, donc f(x) = 0.",
    Ddiskr: "D = discriminant b² − 4ac : il décide du nombre de zéros (D > 0 : deux, D = 0 : un, D < 0 : aucun).", Ddef: "D = ensemble de définition : toutes les valeurs de x que l’on peut remplacer.", W: "W = ensemble des valeurs (image) : toutes les valeurs de y que prend la fonction.",
    WP: "W = point d’inflexion : la courbe passe de convexe à concave (ou l’inverse).", H: "H = maximum : le point le plus haut dans son voisinage (maximum local).", T: "T = minimum : le point le plus bas dans son voisinage (minimum local).",
    x12: "x₁,₂ = les deux solutions (zéros) : une fois avec +, une fois avec − devant la racine.", f1: "f′ = dérivée première : la pente de la courbe en chaque point. f′(x) = 0 si la tangente est horizontale.", f2: "f″ = dérivée seconde : la courbure. f″ > 0 convexe (minimum), f″ < 0 concave (maximum).", f3: "f‴ = dérivée troisième : si elle est ≠ 0, un point où f″ = 0 est vraiment un point d’inflexion.",
    m: "m = pente (coefficient directeur) : la courbe monte de m (descend si m < 0) quand on avance de 1 vers la droite.", alpha: "α = angle d’inclinaison : l’angle entre la courbe et l’axe des x, tan α = m.",
    asx: "x = … : asymptote verticale (pôle) – la courbe s’approche autant qu’on veut de cette droite sans jamais la toucher.", asy: "y = … : asymptote pour x → ±∞ – la courbe s’approche de cette droite très loin.",
    lin_m: "m = pente : 1 vers la droite, m vers le haut.", lin_t: "Ordonnée à l’origine : la droite coupe ici l’axe des y (point (0 | ordonnée)).",
    q_a: "a = coefficient d’étirement : a > 0 ouverte vers le haut, a < 0 vers le bas. |a| > 1 plus étroite, |a| < 1 plus large que la parabole usuelle.", q_b: "b déplace la parabole en biais ; le sommet est en x = −b : (2a).", q_c: "c = ordonnée à l’origine : f(0) = c.",
    q_d: "d = translation vers la droite (vers la gauche si d < 0) : sommet en x = d. Attention : a(x − d)² + e contient un moins !", q_e: "e = translation vers le haut (vers le bas si e < 0) : sommet en y = e." },
  ru: { xS: "xₛ = абсцисса вершины: там проходит ось симметрии параболы.", yS: "yₛ = ордината вершины: наименьшее (или наибольшее) значение функции.", S: "S = вершина: самая низкая точка (ветви вверх) или самая высокая (ветви вниз) параболы.",
    Sy: "Sy = точка пересечения с осью y: подставляем x = 0, т. е. Sy(0 | f(0)).", N: "N = нуль функции: здесь график пересекает или касается оси x, т. е. f(x) = 0.",
    Ddiskr: "D = дискриминант b² − 4ac: он решает, сколько нулей (D > 0 – два, D = 0 – один, D < 0 – нет).", Ddef: "D = область определения: все x, которые можно подставлять.", W: "W = множество значений: все y, которые принимает функция.",
    WP: "W = точка перегиба: здесь график меняет выпуклость.", H: "H = точка максимума: самая высокая точка в своей окрестности.", T: "T = точка минимума: самая низкая точка в своей окрестности.",
    x12: "x₁,₂ = два решения (нуля): один раз с +, один раз с − перед корнем.", f1: "f′ = первая производная: наклон графика в каждой точке. f′(x) = 0 там, где касательная горизонтальна.", f2: "f″ = вторая производная: выпуклость. f″ > 0 – минимум, f″ < 0 – максимум.", f3: "f‴ = третья производная: если она ≠ 0, точка с f″ = 0 действительно точка перегиба.",
    m: "m = угловой коэффициент: при шаге на 1 вправо график поднимается на m (опускается, если m < 0).", alpha: "α = угол наклона: угол между графиком и осью x, tg α = m.",
    asx: "x = …: вертикальная асимптота (полюс) – график сколь угодно близко подходит к этой прямой, но не касается её.", asy: "y = …: асимптота при x → ±∞ – к этой прямой график приближается далеко слева и справа.",
    lin_m: "m = угловой коэффициент: 1 вправо, m вверх.", lin_t: "Отрезок на оси y: здесь прямая пересекает ось y (точка (0 | b)).",
    q_a: "a = коэффициент растяжения: a > 0 – ветви вверх, a < 0 – вниз. |a| > 1 – уже, |a| < 1 – шире обычной параболы.", q_b: "b сдвигает параболу наискосок; вершина в точке x = −b : (2a).", q_c: "c = точка пересечения с осью y: f(0) = c.",
    q_d: "d = сдвиг вправо (влево, если d < 0): вершина при x = d. Внимание: в a(x − d)² + e стоит минус!", q_e: "e = сдвиг вверх (вниз, если e < 0): вершина при y = e." },
  ar: { xS: "xₛ = الإحداثي السيني للرأس: هناك يقع محور تماثل القطع المكافئ.", yS: "yₛ = الإحداثي الصادي للرأس: أصغر (أو أكبر) قيمة للدالة.", S: "S = الرأس: أدنى نقطة (فتحة لأعلى) أو أعلى نقطة (فتحة لأسفل) في القطع المكافئ.",
    Sy: "Sy = نقطة التقاطع مع محور y: نعوّض x = 0، أي Sy(0 | f(0)).", N: "N = صفر الدالة: هناك يقطع المنحنى محور x أو يمسه، أي f(x) = 0.",
    Ddiskr: "D = المميّز b² − 4ac: يحدد عدد الأصفار (D > 0 صفران، D = 0 صفر واحد، D < 0 لا أصفار).", Ddef: "D = المجال: كل قيم x التي يجوز تعويضها.", W: "W = المدى: كل قيم y التي تأخذها الدالة.",
    WP: "W = نقطة الانعطاف: يتغير عندها اتجاه تقعر المنحنى.", H: "H = نقطة عظمى: أعلى نقطة في جوارها (قيمة عظمى محلية).", T: "T = نقطة صغرى: أدنى نقطة في جوارها (قيمة صغرى محلية).",
    x12: "x₁,₂ = الحلّان (الصفران): مرة مع + ومرة مع − قبل الجذر.", f1: "f′ = المشتقة الأولى: ميل المنحنى عند كل نقطة. f′(x) = 0 حيث المماس أفقي.", f2: "f″ = المشتقة الثانية: التقعر. f″ > 0 نقطة صغرى، f″ < 0 نقطة عظمى.", f3: "f‴ = المشتقة الثالثة: إذا كانت ≠ 0 فالنقطة التي فيها f″ = 0 نقطة انعطاف فعلًا.",
    m: "m = الميل: يرتفع المنحنى بمقدار m (أو ينخفض إذا كان m سالبًا) عند التقدم 1 إلى اليمين.", alpha: "α = زاوية الميل: الزاوية بين المنحنى ومحور x، tan α = m.",
    asx: "x = …: خط تقارب رأسي (قطب) – يقترب المنحنى من هذا الخط بلا حدود لكنه لا يلمسه.", asy: "y = …: خط تقارب عندما x → ±∞ – يقترب المنحنى من هذا الخط بعيدًا.",
    lin_m: "m = الميل: 1 إلى اليمين و m إلى الأعلى.", lin_t: "المقطع الصادي: هنا يقطع المستقيم محور y (النقطة (0 | المقطع)).",
    q_a: "a = معامل التمدد: a > 0 فتحة لأعلى، a < 0 لأسفل. |a| > 1 أضيق، |a| < 1 أعرض من القطع المكافئ الأساسي.", q_b: "b يزيح القطع المكافئ بشكل مائل؛ الرأس عند x = −b : (2a).", q_c: "c = المقطع الصادي: f(0) = c.",
    q_d: "d = إزاحة إلى اليمين (إلى اليسار إذا كان d سالبًا): الرأس عند x = d. انتبه: في a(x − d)² + e إشارة ناقص!", q_e: "e = إزاحة إلى الأعلى (إلى الأسفل إذا كان e سالبًا): الرأس عند y = e." },
  ja: { xS: "xₛ = 頂点の x 座標：放物線の対称軸がここを通る。", yS: "yₛ = 頂点の y 座標：関数の最小値（または最大値）。", S: "S = 頂点：放物線のいちばん低い点（上に開く）またはいちばん高い点（下に開く）。",
    Sy: "Sy = y 軸との交点：x = 0 を代入する。Sy(0 | f(0))。", N: "N = 零点：グラフが x 軸と交わる、または接する点。f(x) = 0。",
    Ddiskr: "D = 判別式 b² − 4ac：零点の個数を決める（D > 0 なら 2 つ、D = 0 なら 1 つ、D < 0 ならなし）。", Ddef: "D = 定義域：代入してよい x の値全体。", W: "W = 値域：関数がとる y の値全体。",
    WP: "W = 変曲点：グラフの曲がり方（上に凸・下に凸）が変わる点。", H: "H = 極大点：まわりでいちばん高い点。", T: "T = 極小点：まわりでいちばん低い点。",
    x12: "x₁,₂ = 2 つの解（零点）：ルートの前が + のときと − のとき。", f1: "f′ = 1 回微分（導関数）：各点でのグラフの傾き。接線が水平なところで f′(x) = 0。", f2: "f″ = 2 回微分：曲がり方。f″ > 0 なら下に凸（極小）、f″ < 0 なら上に凸（極大）。", f3: "f‴ = 3 回微分：これが 0 でなければ、f″ = 0 の点は本当に変曲点。",
    m: "m = 傾き：右へ 1 進むと m だけ上がる（m が負なら下がる）。", alpha: "α = 傾きの角：グラフと x 軸のなす角。tan α = m。",
    asx: "x = …：垂直な漸近線（極）――グラフはこの直線にいくらでも近づくが、ふれない。", asy: "y = …：x → ±∞ での漸近線――遠くでグラフがこの直線に近づく。",
    lin_m: "m = 傾き：右へ 1、上へ m。", lin_t: "切片：直線が y 軸と交わるところ（点 (0 | 切片)）。",
    q_a: "a = 開き具合：a > 0 なら上に開く、a < 0 なら下。|a| > 1 ならせまく、|a| < 1 なら広くなる。", q_b: "b は放物線をななめに動かす。頂点は x = −b : (2a)。", q_c: "c = y 切片：f(0) = c。",
    q_d: "d = 右への平行移動（d が負なら左）：頂点は x = d。注意：a(x − d)² + e はマイナス！", q_e: "e = 上への平行移動（e が負なら下）：頂点は y = e。" },
  pt: { xS: "xₛ = abscissa do vértice: ali fica o eixo de simetria da parábola.", yS: "yₛ = ordenada do vértice: o menor (ou maior) valor da função.", S: "S = vértice: o ponto mais baixo (abre para cima) ou mais alto (abre para baixo) da parábola.",
    Sy: "Sy = interseção com o eixo y: substitui-se x = 0, ou seja Sy(0 | f(0)).", N: "N = zero (raiz): ali o gráfico corta ou toca o eixo x, ou seja f(x) = 0.",
    Ddiskr: "D = discriminante b² − 4ac: decide quantos zeros há (D > 0: dois, D = 0: um, D < 0: nenhum).", Ddef: "D = domínio: todos os valores de x que se podem substituir.", W: "W = imagem (contradomínio): todos os valores de y que a função assume.",
    WP: "W = ponto de inflexão: o gráfico muda de concavidade.", H: "H = ponto de máximo: o mais alto na sua vizinhança (máximo local).", T: "T = ponto de mínimo: o mais baixo na sua vizinhança (mínimo local).",
    x12: "x₁,₂ = as duas soluções (zeros): uma com + e outra com − antes da raiz.", f1: "f′ = primeira derivada: a inclinação do gráfico em cada ponto. f′(x) = 0 onde a tangente é horizontal.", f2: "f″ = segunda derivada: a concavidade. f″ > 0 mínimo, f″ < 0 máximo.", f3: "f‴ = terceira derivada: se for ≠ 0, um ponto com f″ = 0 é mesmo um ponto de inflexão.",
    m: "m = inclinação (coeficiente angular): o gráfico sobe m (desce se m < 0) ao andar 1 para a direita.", alpha: "α = ângulo de inclinação: o ângulo entre o gráfico e o eixo x, tg α = m.",
    asx: "x = …: assíntota vertical (polo) – o gráfico aproxima-se o quanto quiser desta reta, mas nunca a toca.", asy: "y = …: assíntota para x → ±∞ – o gráfico aproxima-se desta reta lá longe.",
    lin_m: "m = inclinação: 1 para a direita, m para cima.", lin_t: "Coeficiente linear: aqui a reta corta o eixo y (ponto (0 | coeficiente)).",
    q_a: "a = fator de abertura: a > 0 abre para cima, a < 0 para baixo. |a| > 1 mais estreita, |a| < 1 mais larga que a parábola padrão.", q_b: "b desloca a parábola na diagonal; o vértice fica em x = −b : (2a).", q_c: "c = interseção com o eixo y: f(0) = c.",
    q_d: "d = deslocamento para a direita (esquerda se d < 0): vértice em x = d. Atenção: em a(x − d)² + e há um menos!", q_e: "e = deslocamento para cima (baixo se e < 0): vértice em y = e." }
  };
  function tx(k){ var l = document.documentElement.lang || "de"; return (TX[l] && TX[l][k]) || TX.de[k]; }
  var seite = (location.pathname.match(/\/(\w+)\/?/) || [])[1] || "";
  var PARAM = { linear: { m: "lin_m", t: "lin_t", b: "lin_t", n: "lin_t", c: "lin_t" }, quadratisch: { a: "q_a", b: "q_b", c: "q_c", d: "q_d", e: "q_e" } }[seite] || {};

  // welches Zeichen in welcher Karte was bedeutet
  function schluessel(lab, karten){
    var hat = function(k){ return karten.indexOf(k) >= 0; };
    if(lab === "xS") return "xS"; if(lab === "yS") return "yS"; if(lab === "S" && hat("scheitel")) return "S";
    if(lab === "Sy") return "Sy"; if(/^N[₀-₉]*$/.test(lab)) return "N";
    if(lab === "D") return hat("diskr") ? "Ddiskr" : hat("defb") ? "Ddef" : null;
    if(lab === "W") return hat("wende") ? "WP" : hat("wertb") ? "W" : null;
    if(lab === "H") return "H"; if(lab === "T") return "T";
    if(lab === "x1,2" || lab === "x₁,₂") return "x12";
    if(lab === "f′") return "f1"; if(lab === "f″") return "f2"; if(lab === "f‴") return "f3";
    if(lab === "m" && hat("steigung")) return "m"; if(lab === "α") return "alpha";
    if(hat("asym")){ if(lab === "x") return "asx"; if(lab === "y") return "asy"; }
    return null;
  }
  // die ersten n Zeichen (Textinhalt) eines Elements in ein .sym einpacken
  function packe(el, n, tipp){
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), node, rest = n, lead = true;
    while((node = w.nextNode())){
      var s = node.nodeValue;
      if(lead){ var m = s.match(/^\s*/)[0].length; if(m === s.length) continue; lead = false; if(m) { node = node.splitText(m); s = node.nodeValue; w.currentNode = node; } var start = node; }
      if(s.length >= rest){ var r = document.createRange(); r.setStartBefore(start); r.setEnd(node, rest);
        var sp = document.createElement("span"); sp.className = "sym"; sp.tabIndex = 0; sp.setAttribute("data-tip", tipp);
        sp.appendChild(r.extractContents()); r.insertNode(sp); return; }
      rest -= s.length;
    }
  }
  function bearbeiten(wurzel){
    wurzel.querySelectorAll("span.f:not([data-tp])").forEach(function(f){
      f.setAttribute("data-tp", "1");
      if(f.closest(".sym, button")) return;
      var m = f.textContent.match(/^\s*([^=(|]{1,8}?)\s*(=|\()/); if(!m) return;
      var karte = f.closest("section"), karten = karte ? Array.prototype.map.call(karte.querySelectorAll(".b-info"), function(b){ return b.getAttribute("data-b"); }) : [];
      var k = schluessel(m[1], karten); if(!k) return;
      // Anfang des Elements bis zum Ende des Zeichens (inkl. tiefgestellter Teile) einpacken
      packe(f, m[1].length, tx(k));
    });
    // Parameter-Buchstaben im Formelkasten und an den Reglern
    wurzel.querySelectorAll("b.ein:not([data-tp]), .regel .m:not([data-tp])").forEach(function(b){
      b.setAttribute("data-tp", "1");
      var L = b.textContent.trim(); if(!/^[a-z]$/.test(L) || !PARAM[L] || b.closest(".sym")) return;
      var sp = document.createElement("span"); sp.className = "sym"; sp.tabIndex = 0; sp.setAttribute("data-tip", tx(PARAM[L])); sp.setAttribute("data-pk", PARAM[L]);
      b.parentNode.insertBefore(sp, b); sp.appendChild(b);
    });
  }
  function beobachten(id){
    var e = document.getElementById(id); if(!e) return;
    var mo = new MutationObserver(function(){ mo.disconnect(); bearbeiten(e); mo.observe(e, { childList: true, subtree: true, characterData: true }); });
    bearbeiten(e); mo.observe(e, { childList: true, subtree: true, characterData: true });
  }
  // Sprachwechsel: Blasen an Parameter-Buchstaben neu beschriften (die Karten werden ohnehin neu gezeichnet)
  new MutationObserver(function(){ document.querySelectorAll(".sym[data-pk]").forEach(function(sp){ sp.setAttribute("data-tip", tx(sp.getAttribute("data-pk"))); }); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  // kurzer Hinweis unter den Reglern
  function hinweis(){
    var r = document.getElementById("regler"); if(!r || !window.MS_TIPP) return;
    var h = document.getElementById("tippHinweis");
    if(!h){ h = document.createElement("p"); h.id = "tippHinweis"; h.style.cssText = "margin:4px 0 8px;font-size:14px;color:#4f5b6e"; r.parentNode.insertBefore(h, r.nextSibling); }
    h.textContent = MS_TIPP.hinweis(document.documentElement.lang || "de");
  }
  new MutationObserver(hinweis).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  function start(){ ["analyse", "formLive", "regler"].forEach(beobachten); hinweis(); }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
