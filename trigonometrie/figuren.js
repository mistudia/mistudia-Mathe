// trigonometrie/figuren.js – Reiter „In Figuren“
// Trigonometrie in Rechteck, Trapez, gleichschenkligem Dreieck, Raute und Eratosthenes (Erdumfang).
// Man sucht in der Figur ein rechtwinkliges Dreieck (Knopf hebt es hervor), rechnet die rot markierten
// Größen aus und trägt sie ein; Tipp und Lösungsweg Schritt für Schritt. Zufällige Maße („Neue Maße“).
// Texte in 9 Sprachen (FG), Sprache über MS_TRIG_FIG.sprache(l), Reitername in TG[l].tab_fig.
(function(){
  "use strict";
  var FG = {
  de: { tab: "In Figuren", intro: "Suche in der Figur ein rechtwinkliges Dreieck – dann helfen sin, cos und tan. Berechne die rot markierten Größen (auf zwei Stellen gerundet).", neu: "Neue Maße", pruefen: "Prüfen", tipp: "Tipp", weg: "Lösungsweg", zeig: "Rechtwinkliges Dreieck zeigen", richtig: "Richtig!", falsch: "Noch nicht. Schau dir den Tipp an.", gegeben: "Gegeben:", gesucht: "Gesucht:", ein: "z. B. 3,5", flaeche: "Flächeninhalt", winkelO: "Winkel α an der Spitze", umfang: "Erdumfang U", laengen: "Längen in cm",
    F: { viereck: ["Viereck", "Viereck ABCD mit rechtem Winkel bei B."], pyramide: ["Pyramide", "Quadratische Pyramide mit der Grundkante a und der Höhe h. M ist der Mittelpunkt der Grundfläche."], rechteck: ["Rechteck", "Rechteck ABCD mit den Diagonalen. M ist ihr Schnittpunkt."], trapez: ["Trapez", "Trapez ABCD mit rechten Winkeln bei A und D."], gleich: ["Gleichschenkliges Dreieck", "Gleichschenkliges Dreieck ABC mit der Basis AB."], raute: ["Raute", "Raute ABCD mit den Diagonalen e = AC und f = BD."], erat: ["Erdumfang (Eratosthenes)", "Um 240 v. Chr.: Mittags wirft in Syene ein Stab keinen Schatten, in Alexandria wirft ein {H} m hoher Obelisk einen {S} m langen Schatten. Alexandria liegt {d} km nördlich von Syene."] },
    T: { viereck: "Zeichne das Lot von D auf AB (Fußpunkt F): Im Dreieck AFD helfen sin und cos. Für c: Die waagerechte Linie von D trifft die Verlängerung von BC in G – im rechtwinkligen Dreieck DGC hilft Pythagoras.", pyramide: "Im Dreieck MBS ist bei M ein rechter Winkel. MB ist die halbe Diagonale des Quadrats. Für die Seitenfläche BCS brauchst du die Seitenhöhe h_s (Pythagoras mit h und a : 2).", rechteck: "Das Dreieck ABC hat bei B einen rechten Winkel. Für α₁ kennst du die Gegenkathete BC und die Ankathete AB – also tan. Für ε: Die Diagonalen halbieren sich, das Dreieck MBC ist gleichschenklig.", trapez: "Zeichne die Höhe von C auf AB ein (Fußpunkt E). So entsteht das rechtwinklige Dreieck EBC mit dem Winkel β.", gleich: "Die Höhe von C teilt das Dreieck in zwei gleiche rechtwinklige Dreiecke. Die Basis wird dabei halbiert.", raute: "Die Diagonalen stehen senkrecht aufeinander, halbieren sich und halbieren den Winkel α. Nimm das Dreieck ABM.", erat: "Obelisk und Schatten bilden ein rechtwinkliges Dreieck: tan α = Schatten : Höhe. Die Sonnenstrahlen sind parallel – derselbe Winkel steckt im Erdmittelpunkt." },
    L: { lot: "Hilfslinie: Lot von D auf AB mit Fußpunkt F", hilfdr: "Rechtwinkliges Dreieck DGC: DG = AB − AF, GC = DF − BC", halbdiag: "MB ist die halbe Diagonale des Quadrats", hs: "Seitenhöhe h_s im Dreieck aus h und a : 2", flBCS: "Flächeninhalt des Dreiecks BCS:", dreieck: "Rechtwinkliges Dreieck {d}:", pyth: "Satz des Pythagoras:", hoehe: "Hilfslinie: Höhe von C auf AB mit Fußpunkt E", diag: "Die Diagonalen halbieren sich: MB = MC, also ist MBC gleichschenklig", wsum: "Winkelsumme", basis: "Die Höhe halbiert die Basis: AM = c : 2", raute: "Diagonalen senkrecht, halbieren sich und den Winkel α", flaeche: "Flächeninhalt der Raute:", wechsel: "Parallele Sonnenstrahlen: Der Winkel im Erdmittelpunkt ist genauso groß (Wechselwinkel)", prop: "Verhältnis: 360° entsprechen dem ganzen Umfang" } },
  en: { tab: "In figures", intro: "Look for a right-angled triangle in the figure – then sin, cos and tan help. Calculate the quantities marked in red (rounded to two decimals).", neu: "New measures", pruefen: "Check", tipp: "Hint", weg: "Solution steps", zeig: "Show right-angled triangle", richtig: "Correct!", falsch: "Not yet. Have a look at the hint.", gegeben: "Given:", gesucht: "Find:", ein: "e.g. 3.5", flaeche: "Area", winkelO: "Angle α at the top", umfang: "Earth’s circumference U", laengen: "Lengths in cm",
    F: { viereck: ["Quadrilateral", "Quadrilateral ABCD with a right angle at B."], pyramide: ["Pyramid", "Square pyramid with base edge a and height h. M is the centre of the base."], rechteck: ["Rectangle", "Rectangle ABCD with its diagonals. M is where they cross."], trapez: ["Trapezium", "Trapezium ABCD with right angles at A and D."], gleich: ["Isosceles triangle", "Isosceles triangle ABC with base AB."], raute: ["Rhombus", "Rhombus ABCD with diagonals e = AC and f = BD."], erat: ["Earth’s circumference (Eratosthenes)", "Around 240 BC: at noon a stick in Syene casts no shadow, while in Alexandria an obelisk {H} m high casts a shadow {S} m long. Alexandria lies {d} km north of Syene."] },
    T: { viereck: "Draw the perpendicular from D to AB (foot F): in triangle AFD, sin and cos help. For c: the horizontal line from D meets the extension of BC at G – in the right triangle DGC, Pythagoras helps.", pyramide: "Triangle MBS has a right angle at M. MB is half the diagonal of the square. For the side face BCS you need the slant height h_s (Pythagoras with h and a : 2).", rechteck: "Triangle ABC has a right angle at B. For α₁ you know the opposite side BC and the adjacent side AB – so use tan. For ε: the diagonals bisect each other, so triangle MBC is isosceles.", trapez: "Draw the height from C down to AB (foot E). This gives the right-angled triangle EBC with the angle β.", gleich: "The height from C splits the triangle into two equal right-angled triangles. The base is halved.", raute: "The diagonals are perpendicular, bisect each other and bisect the angle α. Use triangle ABM.", erat: "Obelisk and shadow form a right-angled triangle: tan α = shadow : height. The sun’s rays are parallel – the same angle appears at the centre of the Earth." },
    L: { lot: "Helper line: perpendicular from D to AB with foot F", hilfdr: "Right triangle DGC: DG = AB − AF, GC = DF − BC", halbdiag: "MB is half the diagonal of the square", hs: "Slant height h_s from h and a : 2", flBCS: "Area of triangle BCS:", dreieck: "Right-angled triangle {d}:", pyth: "Pythagoras’ theorem:", hoehe: "Helper line: height from C to AB with foot E", diag: "The diagonals bisect each other: MB = MC, so MBC is isosceles", wsum: "Angle sum", basis: "The height halves the base: AM = c : 2", raute: "Diagonals are perpendicular, bisect each other and the angle α", flaeche: "Area of the rhombus:", wechsel: "Parallel sun rays: the angle at the Earth’s centre is the same (alternate angles)", prop: "Ratio: 360° correspond to the whole circumference" } },
  es: { tab: "En figuras", intro: "Busca en la figura un triángulo rectángulo: ahí ayudan el seno, el coseno y la tangente. Calcula las magnitudes marcadas en rojo (redondeadas a dos decimales).", neu: "Nuevas medidas", pruefen: "Comprobar", tipp: "Pista", weg: "Solución paso a paso", zeig: "Mostrar el triángulo rectángulo", richtig: "¡Correcto!", falsch: "Todavía no. Mira la pista.", gegeben: "Datos:", gesucht: "Incógnitas:", ein: "p. ej. 3,5", flaeche: "Área", winkelO: "Ángulo α en la punta", umfang: "Circunferencia terrestre U", laengen: "Longitudes en cm",
    F: { viereck: ["Cuadrilátero", "Cuadrilátero ABCD con ángulo recto en B."], pyramide: ["Pirámide", "Pirámide cuadrada de arista básica a y altura h. M es el centro de la base."], rechteck: ["Rectángulo", "Rectángulo ABCD con sus diagonales. M es el punto donde se cortan."], trapez: ["Trapecio", "Trapecio ABCD con ángulos rectos en A y D."], gleich: ["Triángulo isósceles", "Triángulo isósceles ABC de base AB."], raute: ["Rombo", "Rombo ABCD con las diagonales e = AC y f = BD."], erat: ["Circunferencia terrestre (Eratóstenes)", "Hacia el 240 a. C.: a mediodía un palo en Siena no da sombra, mientras que en Alejandría un obelisco de {H} m da una sombra de {S} m. Alejandría está {d} km al norte de Siena."] },
    T: { viereck: "Traza la perpendicular de D a AB (pie F): en el triángulo AFD ayudan el seno y el coseno. Para c: la horizontal desde D corta la prolongación de BC en G; en el triángulo rectángulo DGC ayuda Pitágoras.", pyramide: "El triángulo MBS tiene un ángulo recto en M. MB es la mitad de la diagonal del cuadrado. Para la cara BCS necesitas la apotema h_s (Pitágoras con h y a : 2).", rechteck: "El triángulo ABC tiene un ángulo recto en B. Para α₁ conoces el cateto opuesto BC y el contiguo AB: usa la tangente. Para ε: las diagonales se cortan en su punto medio, así que MBC es isósceles.", trapez: "Traza la altura desde C hasta AB (pie E). Así aparece el triángulo rectángulo EBC con el ángulo β.", gleich: "La altura desde C divide el triángulo en dos triángulos rectángulos iguales. La base queda dividida por la mitad.", raute: "Las diagonales son perpendiculares, se cortan en su punto medio y dividen el ángulo α por la mitad. Usa el triángulo ABM.", erat: "Obelisco y sombra forman un triángulo rectángulo: tan α = sombra : altura. Los rayos del sol son paralelos: el mismo ángulo aparece en el centro de la Tierra." },
    L: { lot: "Línea auxiliar: perpendicular de D a AB con pie F", hilfdr: "Triángulo rectángulo DGC: DG = AB − AF, GC = DF − BC", halbdiag: "MB es la mitad de la diagonal del cuadrado", hs: "Apotema h_s a partir de h y a : 2", flBCS: "Área del triángulo BCS:", dreieck: "Triángulo rectángulo {d}:", pyth: "Teorema de Pitágoras:", hoehe: "Línea auxiliar: altura desde C hasta AB con pie E", diag: "Las diagonales se cortan en su punto medio: MB = MC, así que MBC es isósceles", wsum: "Suma de ángulos", basis: "La altura divide la base por la mitad: AM = c : 2", raute: "Diagonales perpendiculares, se cortan en su punto medio y dividen α", flaeche: "Área del rombo:", wechsel: "Rayos del sol paralelos: el ángulo en el centro de la Tierra es igual (ángulos alternos)", prop: "Proporción: 360° corresponden a toda la circunferencia" } },
  zh: { tab: "图形中", intro: "在图形中找一个直角三角形——然后用 sin、cos 和 tan。计算红色标出的量（保留两位小数）。", neu: "换一组尺寸", pruefen: "检查", tipp: "提示", weg: "解题步骤", zeig: "显示直角三角形", richtig: "正确！", falsch: "还不对，看看提示吧。", gegeben: "已知：", gesucht: "求：", ein: "例如 3.5", flaeche: "面积", winkelO: "塔尖处的角 α", umfang: "地球周长 U", laengen: "长度单位 cm",
    F: { viereck: ["四边形", "四边形 ABCD，B 处是直角。"], pyramide: ["棱锥", "正四棱锥，底边 a，高 h。M 是底面中心。"], rechteck: ["长方形", "长方形 ABCD 及其对角线，M 是交点。"], trapez: ["梯形", "梯形 ABCD，A 和 D 处是直角。"], gleich: ["等腰三角形", "等腰三角形 ABC，底边为 AB。"], raute: ["菱形", "菱形 ABCD，对角线 e = AC，f = BD。"], erat: ["地球周长（埃拉托色尼）", "约公元前 240 年：正午时，赛伊尼的木杆没有影子，而亚历山大城一座 {H} m 高的方尖碑投下 {S} m 长的影子。亚历山大城位于赛伊尼以北 {d} km。"] },
    T: { viereck: "过 D 作 AB 的垂线（垂足 F）：在三角形 AFD 中用 sin 和 cos。求 c：过 D 的水平线与 BC 的延长线交于 G，在直角三角形 DGC 中用勾股定理。", pyramide: "三角形 MBS 在 M 处是直角。MB 是正方形对角线的一半。求侧面 BCS 需要斜高 h_s（用 h 和 a : 2 的勾股定理）。", rechteck: "三角形 ABC 在 B 处是直角。求 α₁ 时已知对边 BC 和邻边 AB——用 tan。求 ε：对角线互相平分，三角形 MBC 是等腰三角形。", trapez: "从 C 向 AB 作高（垂足 E），得到含角 β 的直角三角形 EBC。", gleich: "从 C 作的高把三角形分成两个相同的直角三角形，底边被平分。", raute: "对角线互相垂直、互相平分，并平分角 α。用三角形 ABM。", erat: "方尖碑和影子构成直角三角形：tan α = 影长 : 高。阳光是平行的——同样的角出现在地心。" },
    L: { lot: "辅助线：过 D 作 AB 的垂线，垂足 F", hilfdr: "直角三角形 DGC：DG = AB − AF，GC = DF − BC", halbdiag: "MB 是正方形对角线的一半", hs: "由 h 和 a : 2 求斜高 h_s", flBCS: "三角形 BCS 的面积：", dreieck: "直角三角形 {d}：", pyth: "勾股定理：", hoehe: "辅助线：从 C 向 AB 作高，垂足 E", diag: "对角线互相平分：MB = MC，所以 MBC 是等腰三角形", wsum: "内角和", basis: "高平分底边：AM = c : 2", raute: "对角线互相垂直、互相平分，并平分 α", flaeche: "菱形面积：", wechsel: "阳光平行：地心处的角同样大（内错角）", prop: "比例：360° 对应整个周长" } },
  fr: { tab: "Dans les figures", intro: "Cherche un triangle rectangle dans la figure – alors sin, cos et tan t’aident. Calcule les grandeurs en rouge (arrondies au centième).", neu: "Nouvelles mesures", pruefen: "Vérifier", tipp: "Indice", weg: "Solution détaillée", zeig: "Montrer le triangle rectangle", richtig: "Juste !", falsch: "Pas encore. Regarde l’indice.", gegeben: "Données :", gesucht: "À trouver :", ein: "p. ex. 3,5", flaeche: "Aire", winkelO: "Angle α au sommet", umfang: "Circonférence de la Terre U", laengen: "Longueurs en cm",
    F: { viereck: ["Quadrilatère", "Quadrilatère ABCD avec un angle droit en B."], pyramide: ["Pyramide", "Pyramide à base carrée d’arête a et de hauteur h. M est le centre de la base."], rechteck: ["Rectangle", "Rectangle ABCD avec ses diagonales. M est leur point d’intersection."], trapez: ["Trapèze", "Trapèze ABCD avec des angles droits en A et D."], gleich: ["Triangle isocèle", "Triangle isocèle ABC de base AB."], raute: ["Losange", "Losange ABCD de diagonales e = AC et f = BD."], erat: ["Circonférence de la Terre (Ératosthène)", "Vers 240 av. J.-C. : à midi, un bâton à Syène ne fait pas d’ombre, tandis qu’à Alexandrie un obélisque de {H} m fait une ombre de {S} m. Alexandrie est à {d} km au nord de Syène."] },
    T: { viereck: "Trace la perpendiculaire de D à AB (pied F) : dans le triangle AFD, sin et cos aident. Pour c : l’horizontale passant par D coupe le prolongement de BC en G – dans le triangle rectangle DGC, Pythagore aide.", pyramide: "Le triangle MBS est rectangle en M. MB est la moitié de la diagonale du carré. Pour la face BCS, il te faut l’apothème h_s (Pythagore avec h et a : 2).", rechteck: "Le triangle ABC est rectangle en B. Pour α₁, tu connais le côté opposé BC et le côté adjacent AB – donc tan. Pour ε : les diagonales se coupent en leur milieu, le triangle MBC est isocèle.", trapez: "Trace la hauteur issue de C sur AB (pied E). On obtient le triangle rectangle EBC avec l’angle β.", gleich: "La hauteur issue de C partage le triangle en deux triangles rectangles égaux. La base est coupée en deux.", raute: "Les diagonales sont perpendiculaires, se coupent en leur milieu et partagent l’angle α en deux. Utilise le triangle ABM.", erat: "L’obélisque et son ombre forment un triangle rectangle : tan α = ombre : hauteur. Les rayons du soleil sont parallèles – le même angle se retrouve au centre de la Terre." },
    L: { lot: "Ligne auxiliaire : perpendiculaire de D à AB, pied F", hilfdr: "Triangle rectangle DGC : DG = AB − AF, GC = DF − BC", halbdiag: "MB est la moitié de la diagonale du carré", hs: "Apothème h_s à partir de h et a : 2", flBCS: "Aire du triangle BCS :", dreieck: "Triangle rectangle {d} :", pyth: "Théorème de Pythagore :", hoehe: "Ligne auxiliaire : hauteur issue de C sur AB, pied E", diag: "Les diagonales se coupent en leur milieu : MB = MC, donc MBC est isocèle", wsum: "Somme des angles", basis: "La hauteur coupe la base en deux : AM = c : 2", raute: "Diagonales perpendiculaires, se coupent en leur milieu et partagent α", flaeche: "Aire du losange :", wechsel: "Rayons du soleil parallèles : l’angle au centre de la Terre est le même (angles alternes-internes)", prop: "Proportion : 360° correspondent à toute la circonférence" } },
  ru: { tab: "В фигурах", intro: "Найди в фигуре прямоугольный треугольник — тогда помогут sin, cos и tan. Вычисли величины, отмеченные красным (с точностью до сотых).", neu: "Новые размеры", pruefen: "Проверить", tipp: "Подсказка", weg: "Решение по шагам", zeig: "Показать прямоугольный треугольник", richtig: "Верно!", falsch: "Пока нет. Посмотри подсказку.", gegeben: "Дано:", gesucht: "Найти:", ein: "напр. 3,5", flaeche: "Площадь", winkelO: "Угол α на вершине", umfang: "Длина окружности Земли U", laengen: "Длины в см",
    F: { viereck: ["Четырёхугольник", "Четырёхугольник ABCD с прямым углом при B."], pyramide: ["Пирамида", "Правильная четырёхугольная пирамида с ребром основания a и высотой h. M – центр основания."], rechteck: ["Прямоугольник", "Прямоугольник ABCD с диагоналями. M — точка их пересечения."], trapez: ["Трапеция", "Трапеция ABCD с прямыми углами при A и D."], gleich: ["Равнобедренный треугольник", "Равнобедренный треугольник ABC с основанием AB."], raute: ["Ромб", "Ромб ABCD с диагоналями e = AC и f = BD."], erat: ["Окружность Земли (Эратосфен)", "Около 240 г. до н. э.: в полдень палка в Сиене не отбрасывает тени, а в Александрии обелиск высотой {H} м отбрасывает тень длиной {S} м. Александрия лежит в {d} км к северу от Сиены."] },
    T: { viereck: "Опусти перпендикуляр из D на AB (основание F): в треугольнике AFD помогают sin и cos. Для c: горизонталь из D пересекает продолжение BC в точке G – в прямоугольном треугольнике DGC помогает теорема Пифагора.", pyramide: "В треугольнике MBS прямой угол при M. MB – половина диагонали квадрата. Для грани BCS нужна апофема h_s (Пифагор с h и a : 2).", rechteck: "Треугольник ABC прямоугольный с прямым углом при B. Для α₁ известны противолежащий катет BC и прилежащий AB — значит, tan. Для ε: диагонали делятся пополам, треугольник MBC равнобедренный.", trapez: "Проведи высоту из C на AB (основание E). Получится прямоугольный треугольник EBC с углом β.", gleich: "Высота из C делит треугольник на два равных прямоугольных треугольника. Основание делится пополам.", raute: "Диагонали перпендикулярны, делятся пополам и делят угол α пополам. Возьми треугольник ABM.", erat: "Обелиск и тень образуют прямоугольный треугольник: tan α = тень : высота. Солнечные лучи параллельны — тот же угол есть в центре Земли." },
    L: { lot: "Вспомогательная линия: перпендикуляр из D на AB с основанием F", hilfdr: "Прямоугольный треугольник DGC: DG = AB − AF, GC = DF − BC", halbdiag: "MB – половина диагонали квадрата", hs: "Апофема h_s из h и a : 2", flBCS: "Площадь треугольника BCS:", dreieck: "Прямоугольный треугольник {d}:", pyth: "Теорема Пифагора:", hoehe: "Вспомогательная линия: высота из C на AB с основанием E", diag: "Диагонали делятся пополам: MB = MC, значит, MBC равнобедренный", wsum: "Сумма углов", basis: "Высота делит основание пополам: AM = c : 2", raute: "Диагонали перпендикулярны, делятся пополам и делят угол α", flaeche: "Площадь ромба:", wechsel: "Параллельные солнечные лучи: угол в центре Земли такой же (накрест лежащие углы)", prop: "Пропорция: 360° соответствуют всей окружности" } },
  ar: { tab: "في الأشكال", intro: "ابحث في الشكل عن مثلث قائم – عندها يساعدك الجيب وجيب التمام والظل. احسب المقادير المعلّمة بالأحمر (مقرّبة لمنزلتين عشريتين).", neu: "قياسات جديدة", pruefen: "تحقّق", tipp: "تلميح", weg: "خطوات الحل", zeig: "إظهار المثلث القائم", richtig: "صحيح!", falsch: "ليس بعد. انظر إلى التلميح.", gegeben: "المعطيات:", gesucht: "المطلوب:", ein: "مثل 3.5", flaeche: "المساحة", winkelO: "الزاوية α عند القمة", umfang: "محيط الأرض U", laengen: "الأطوال بالسنتيمتر",
    F: { viereck: ["رباعي", "الرباعي ABCD بزاوية قائمة عند B."], pyramide: ["هرم", "هرم رباعي منتظم طول حرف قاعدته a وارتفاعه h. ‏M مركز القاعدة."], rechteck: ["مستطيل", "المستطيل ABCD مع قطريه. M نقطة تقاطعهما."], trapez: ["شبه منحرف", "شبه المنحرف ABCD بزاويتين قائمتين عند A وD."], gleich: ["مثلث متساوي الساقين", "المثلث المتساوي الساقين ABC وقاعدته AB."], raute: ["معيّن", "المعيّن ABCD وقطراه e = AC وf = BD."], erat: ["محيط الأرض (إراتوستينس)", "نحو 240 ق. م.: عند الظهيرة لا يلقي عود في أسوان ظلًا، بينما في الإسكندرية يلقي مسلّة ارتفاعها {H} م ظلًا طوله {S} م. تقع الإسكندرية على بعد {d} كم شمال أسوان."] },
    T: { viereck: "ارسم العمود من D على AB (موقعه F): في المثلث AFD يساعد sin وcos. ولحساب c: المستقيم الأفقي من D يقطع امتداد BC في G – وفي المثلث القائم DGC تساعد مبرهنة فيثاغورس.", pyramide: "المثلث MBS قائم عند M. ‏MB نصف قطر المربع. ولحساب مساحة الوجه BCS تحتاج الارتفاع الجانبي h_s (فيثاغورس مع h وa : 2).", rechteck: "المثلث ABC قائم عند B. لحساب α₁ تعرف الضلع المقابل BC والمجاور AB – إذن الظل. ولحساب ε: القطران ينصّف كل منهما الآخر، فالمثلث MBC متساوي الساقين.", trapez: "ارسم الارتفاع من C على AB (القدم E). ينتج المثلث القائم EBC بالزاوية β.", gleich: "الارتفاع من C يقسم المثلث إلى مثلثين قائمين متطابقين، وتنقسم القاعدة نصفين.", raute: "القطران متعامدان وينصّف كل منهما الآخر وينصّفان الزاوية α. استخدم المثلث ABM.", erat: "المسلّة وظلّها يكوّنان مثلثًا قائمًا: tan α = الظل : الارتفاع. أشعة الشمس متوازية – فالزاوية نفسها تظهر في مركز الأرض." },
    L: { lot: "خط مساعد: العمود من D على AB وموقعه F", hilfdr: "المثلث القائم DGC: ‏DG = AB − AF، ‏GC = DF − BC", halbdiag: "‏MB نصف قطر المربع", hs: "الارتفاع الجانبي h_s من h وa : 2", flBCS: "مساحة المثلث BCS:", dreieck: "المثلث القائم {d}:", pyth: "مبرهنة فيثاغورس:", hoehe: "خط مساعد: الارتفاع من C على AB بالقدم E", diag: "القطران ينصّف كل منهما الآخر: MB = MC، إذن MBC متساوي الساقين", wsum: "مجموع الزوايا", basis: "الارتفاع ينصّف القاعدة: AM = c : 2", raute: "القطران متعامدان وينصّف كل منهما الآخر والزاوية α", flaeche: "مساحة المعيّن:", wechsel: "أشعة الشمس متوازية: الزاوية في مركز الأرض بالقدر نفسه (زاويتان متبادلتان)", prop: "تناسب: 360° تقابل المحيط كله" } },
  ja: { tab: "図形の中で", intro: "図形の中から直角三角形を見つけよう。そうすれば sin・cos・tan が使えます。赤で示した量を求めよう（小数第2位まで）。", neu: "寸法を変える", pruefen: "確かめる", tipp: "ヒント", weg: "解き方", zeig: "直角三角形を表示", richtig: "正解！", falsch: "まだです。ヒントを見てみよう。", gegeben: "わかっていること：", gesucht: "求めるもの：", ein: "例 3.5", flaeche: "面積", winkelO: "先端の角 α", umfang: "地球の周 U", laengen: "長さの単位は cm",
    F: { viereck: ["四角形", "B が直角の四角形 ABCD。"], pyramide: ["角すい", "底面の辺 a、高さ h の正四角すい。M は底面の中心。"], rechteck: ["長方形", "対角線をひいた長方形 ABCD。M は対角線の交点です。"], trapez: ["台形", "A と D が直角の台形 ABCD。"], gleich: ["二等辺三角形", "AB を底辺とする二等辺三角形 ABC。"], raute: ["ひし形", "対角線 e = AC、f = BD のひし形 ABCD。"], erat: ["地球の周（エラトステネス）", "紀元前240年ごろ：正午、シエネでは棒に影ができないが、アレクサンドリアでは高さ {H} m のオベリスクが長さ {S} m の影をつくる。アレクサンドリアはシエネの {d} km 北にある。"] },
    T: { viereck: "D から AB に垂線をひく（足 F）：三角形 AFD で sin と cos。c は：D を通る水平線が BC の延長と G で交わる。直角三角形 DGC で三平方の定理。", pyramide: "三角形 MBS は M が直角。MB は正方形の対角線の半分。側面 BCS には側面の高さ h_s（h と a : 2 で三平方）が必要。", rechteck: "三角形 ABC は B が直角。α₁ には対辺 BC と隣辺 AB がわかっているので tan。ε：対角線はたがいに二等分するので、三角形 MBC は二等辺三角形。", trapez: "C から AB に高さをひこう（足 E）。角 β をもつ直角三角形 EBC ができる。", gleich: "C からの高さは三角形を合同な2つの直角三角形に分ける。底辺は半分になる。", raute: "対角線は垂直に交わり、たがいに二等分し、角 α も二等分する。三角形 ABM を使おう。", erat: "オベリスクと影で直角三角形ができる：tan α = 影 : 高さ。太陽の光は平行なので、同じ角が地球の中心にも現れる。" },
    L: { lot: "補助線：D から AB への垂線、足 F", hilfdr: "直角三角形 DGC：DG = AB − AF、GC = DF − BC", halbdiag: "MB は正方形の対角線の半分", hs: "h と a : 2 から側面の高さ h_s", flBCS: "三角形 BCS の面積：", dreieck: "直角三角形 {d}：", pyth: "三平方の定理：", hoehe: "補助線：C から AB への高さ（足 E）", diag: "対角線はたがいに二等分：MB = MC なので MBC は二等辺三角形", wsum: "角の和", basis: "高さは底辺を二等分：AM = c : 2", raute: "対角線は垂直で、たがいに二等分し、α も二等分", flaeche: "ひし形の面積：", wechsel: "太陽の光は平行：地球の中心の角も同じ大きさ（錯角）", prop: "比：360° が周全体にあたる" } },
  pt: { tab: "Em figuras", intro: "Procure um triângulo retângulo na figura – aí seno, cosseno e tangente ajudam. Calcule as grandezas marcadas em vermelho (arredondadas a duas casas).", neu: "Novas medidas", pruefen: "Verificar", tipp: "Dica", weg: "Solução passo a passo", zeig: "Mostrar o triângulo retângulo", richtig: "Certo!", falsch: "Ainda não. Veja a dica.", gegeben: "Dados:", gesucht: "Pede-se:", ein: "ex.: 3,5", flaeche: "Área", winkelO: "Ângulo α na ponta", umfang: "Circunferência da Terra U", laengen: "Comprimentos em cm",
    F: { viereck: ["Quadrilátero", "Quadrilátero ABCD com ângulo reto em B."], pyramide: ["Pirâmide", "Pirâmide quadrada com aresta da base a e altura h. M é o centro da base."], rechteck: ["Retângulo", "Retângulo ABCD com as diagonais. M é o ponto onde se cruzam."], trapez: ["Trapézio", "Trapézio ABCD com ângulos retos em A e D."], gleich: ["Triângulo isósceles", "Triângulo isósceles ABC de base AB."], raute: ["Losango", "Losango ABCD com as diagonais e = AC e f = BD."], erat: ["Circunferência da Terra (Eratóstenes)", "Por volta de 240 a.C.: ao meio-dia, uma vara em Siena não faz sombra, enquanto em Alexandria um obelisco de {H} m faz uma sombra de {S} m. Alexandria fica {d} km ao norte de Siena."] },
    T: { viereck: "Trace a perpendicular de D a AB (pé F): no triângulo AFD ajudam seno e cosseno. Para c: a horizontal por D corta o prolongamento de BC em G – no triângulo retângulo DGC ajuda Pitágoras.", pyramide: "O triângulo MBS tem ângulo reto em M. MB é metade da diagonal do quadrado. Para a face BCS você precisa do apótema h_s (Pitágoras com h e a : 2).", rechteck: "O triângulo ABC tem ângulo reto em B. Para α₁ você conhece o cateto oposto BC e o adjacente AB – então use a tangente. Para ε: as diagonais se cortam ao meio, então MBC é isósceles.", trapez: "Trace a altura de C até AB (pé E). Assim surge o triângulo retângulo EBC com o ângulo β.", gleich: "A altura a partir de C divide o triângulo em dois triângulos retângulos iguais. A base fica dividida ao meio.", raute: "As diagonais são perpendiculares, cortam-se ao meio e dividem o ângulo α ao meio. Use o triângulo ABM.", erat: "Obelisco e sombra formam um triângulo retângulo: tan α = sombra : altura. Os raios de sol são paralelos – o mesmo ângulo aparece no centro da Terra." },
    L: { lot: "Linha auxiliar: perpendicular de D a AB com pé F", hilfdr: "Triângulo retângulo DGC: DG = AB − AF, GC = DF − BC", halbdiag: "MB é metade da diagonal do quadrado", hs: "Apótema h_s a partir de h e a : 2", flBCS: "Área do triângulo BCS:", dreieck: "Triângulo retângulo {d}:", pyth: "Teorema de Pitágoras:", hoehe: "Linha auxiliar: altura de C até AB com pé E", diag: "As diagonais se cortam ao meio: MB = MC, logo MBC é isósceles", wsum: "Soma dos ângulos", basis: "A altura divide a base ao meio: AM = c : 2", raute: "Diagonais perpendiculares, cortam-se ao meio e dividem α", flaeche: "Área do losango:", wechsel: "Raios de sol paralelos: o ângulo no centro da Terra é igual (ângulos alternos)", prop: "Proporção: 360° correspondem à circunferência inteira" } }
  };
  if(window.TG) for(var l0 in FG) if(TG[l0]) TG[l0].tab_fig = FG[l0].tab;

  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  if(!FG[lang]) lang = "de";
  function S(){ return FG[lang] || FG.de; }
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function fuell(s, v){ for(var k in v) s = s.split("{" + k + "}").join(v[k]); return s; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }
  function z(v, d){ if(d == null) d = 2; var s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace(/0+$/, "").replace(/\.$/, ""); if(s === "-0") s = "0"; return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  var RAD = Math.PI / 180;
  function deg(x){ return Math.atan(x) / RAD; }
  var rnd = Math.random;
  function zufR(a, b, d){ var f = Math.pow(10, d || 0); return Math.round((a + rnd() * (b - a)) * f) / f; }

  // ---------- Figuren ----------
  // gen() → Maße; bau(P) → { pts, poly, linien, rw (rechte Winkel), winkel, seiten, drei, fragen, geg }
  var FIG = {
    rechteck: {
      gen: function(){ var a = zufR(5, 9, 1), b = zufR(2.5, Math.min(a - 1, 5.5), 1); return { a: a, b: b }; },
      bau: function(P){
        var a = P.a, b = P.b, al = deg(b / a), e = Math.hypot(a, b), ep = 2 * al;
        return { pts: { A: [0, 0], B: [a, 0], C: [a, b], D: [0, b], M: [a / 2, b / 2] }, poly: ["A", "B", "C", "D"],
          linien: [["A", "C", 1], ["B", "D", 1]], rw: ["A", "B", "C", "D"],
          winkel: [{ p: "A", von: "B", zu: "C", t: "α₁", f: "al" }, { p: "M", von: "B", zu: "C", t: "ε", f: "ep" }],
          seiten: [["A", "B", z(a)], ["D", "A", z(b)], ["A", "C", "e", "e"]], drei: ["A", "B", "C"], dreiName: "ABC", rwDrei: "B",
          geg: "AB = " + z(a) + " cm, BC = " + z(b) + " cm",
          fragen: [
            { id: "al", n: "α₁", e: "°", w: al, weg: [["dreieck", "tan α₁ = BC / AB = " + z(b) + " / " + z(a) + " ≈ " + z(b / a, 4)], ["", "α₁ = tan⁻¹(" + z(b / a, 4) + ") ≈ " + z(al) + "°"]] },
            { id: "e", n: "e = AC", e: "cm", w: e, weg: [["pyth", "e² = " + z(a) + "² + " + z(b) + "² = " + z(a * a + b * b)], ["", "e = √" + z(a * a + b * b) + " ≈ " + z(e) + " cm"]] },
            { id: "ep", n: "ε", e: "°", w: ep, weg: [["diag", "∠MBC = ∠MCB = 90° − α₁ ≈ " + z(90 - al) + "°"], ["wsum", "ε = 180° − 2 · " + z(90 - al) + "° = 2 · α₁ ≈ " + z(ep) + "°"]] }] };
      } },
    trapez: {
      gen: function(){ for(var i = 0; i < 50; i++){ var a = zufR(5.5, 9, 1), h = zufR(2.5, 4.5, 1), be = Math.round(zufR(38, 70)); if(a - h / Math.tan(be * RAD) >= 1.8) return { a: a, h: h, be: be }; } return { a: 5.5, h: 3.2, be: 47.8 }; },
      bau: function(P){
        var a = P.a, h = P.h, be = P.be, eb = h / Math.tan(be * RAD), c = a - eb, s = h / Math.sin(be * RAD), ga = 180 - be;
        return { pts: { A: [0, 0], B: [a, 0], C: [c, h], D: [0, h], E: [c, 0] }, poly: ["A", "B", "C", "D"],
          linien: [["C", "E", 2]], rw: ["A", "D"], rwExtra: ["E"],
          winkel: [{ p: "B", von: "C", zu: "A", t: z(be, 1) + "°", f: null }, { p: "C", von: "B", zu: "D", t: "γ", f: "ga" }],
          seiten: [["A", "B", z(a)], ["D", "A", z(h)], ["C", "D", "c", "c"], ["B", "C", "BC", "s"]], drei: ["E", "B", "C"], dreiName: "EBC", rwDrei: "E",
          geg: "AB = " + z(a) + " cm, AD = " + z(h) + " cm, β = " + z(be, 1) + "°",
          fragen: [
            { id: "c", n: "c = DC", e: "cm", w: c, weg: [["hoehe", "CE = AD = " + z(h) + " cm"], ["dreieck", "tan β = CE / EB  →  EB = " + z(h) + " / tan " + z(be, 1) + "° ≈ " + z(eb)], ["", "c = AB − EB = " + z(a) + " − " + z(eb) + " ≈ " + z(c) + " cm"]] },
            { id: "s", n: "BC", e: "cm", w: s, weg: [["dreieck", "sin β = CE / BC  →  BC = " + z(h) + " / sin " + z(be, 1) + "° ≈ " + z(s) + " cm"]] },
            { id: "ga", n: "γ", e: "°", w: ga, weg: [["wsum", "α + β + γ + δ = 360°, α = δ = 90°  →  γ = 180° − " + z(be, 1) + "° = " + z(ga) + "°"]] }] };
      } },
    gleich: {
      gen: function(){ return { c: zufR(4.5, 9, 1), al: Math.round(zufR(35, 70)) }; },
      bau: function(P){
        var c = P.c, al = P.al, h = c / 2 * Math.tan(al * RAD), s = c / 2 / Math.cos(al * RAD), ga = 180 - 2 * al;
        return { pts: { A: [0, 0], B: [c, 0], C: [c / 2, h], M: [c / 2, 0] }, poly: ["A", "B", "C"],
          linien: [["C", "M", 2]], rw: [], rwExtra: ["M"],
          winkel: [{ p: "A", von: "B", zu: "C", t: al + "°", f: null }, { p: "B", von: "C", zu: "A", t: "", f: null }, { p: "C", von: "A", zu: "B", t: "γ", f: "ga" }],
          seiten: [["A", "B", z(c)], ["C", "M", "h", "h"], ["B", "C", "s", "s"]], drei: ["A", "M", "C"], dreiName: "AMC", rwDrei: "M",
          geg: "AB = c = " + z(c) + " cm, α = β = " + al + "°",
          fragen: [
            { id: "h", n: "h", e: "cm", w: h, weg: [["basis", "AM = " + z(c) + " : 2 = " + z(c / 2)], ["dreieck", "tan α = h / AM  →  h = " + z(c / 2) + " · tan " + al + "° ≈ " + z(h) + " cm"]] },
            { id: "s", n: "s = AC = BC", e: "cm", w: s, weg: [["dreieck", "cos α = AM / s  →  s = " + z(c / 2) + " / cos " + al + "° ≈ " + z(s) + " cm"]] },
            { id: "ga", n: "γ", e: "°", w: ga, weg: [["wsum", "γ = 180° − 2 · " + al + "° = " + ga + "°"]] }] };
      } },
    raute: {
      gen: function(){ return { s: zufR(3, 6.5, 1), al: Math.round(zufR(42, 80)) }; },
      bau: function(P){
        var s = P.s, al = P.al, h2 = al / 2 * RAD, e = 2 * s * Math.cos(h2), f = 2 * s * Math.sin(h2), D = [s * Math.cos(al * RAD), s * Math.sin(al * RAD)], C = [s + D[0], D[1]], M = [C[0] / 2, C[1] / 2];
        return { pts: { A: [0, 0], B: [s, 0], C: C, D: D, M: M }, poly: ["A", "B", "C", "D"],
          linien: [["A", "C", 1], ["B", "D", 1]], rw: [], rwExtra: ["M"],
          winkel: [{ p: "A", von: "B", zu: "D", t: al + "°", f: null }],
          seiten: [["A", "B", z(s)], ["A", "C", "e", "e"], ["B", "D", "f", "f"]], drei: ["A", "B", "M"], dreiName: "ABM", rwDrei: "M",
          geg: "s = " + z(s) + " cm, α = " + al + "°",
          fragen: [
            { id: "e", n: "e = AC", e: "cm", w: e, weg: [["raute", "∠BAM = α : 2 = " + z(al / 2, 1) + "°"], ["dreieck", "cos " + z(al / 2, 1) + "° = (e/2) / s  →  e = 2 · " + z(s) + " · cos " + z(al / 2, 1) + "° ≈ " + z(e) + " cm"]] },
            { id: "f", n: "f = BD", e: "cm", w: f, weg: [["dreieck", "sin " + z(al / 2, 1) + "° = (f/2) / s  →  f = 2 · " + z(s) + " · sin " + z(al / 2, 1) + "° ≈ " + z(f) + " cm"]] },
            { id: "A", n: "flaeche", e: "cm²", w: e * f / 2, weg: [["flaeche", "A = e · f / 2 ≈ " + z(e) + " · " + z(f) + " / 2 ≈ " + z(e * f / 2) + " cm²"]] }] };
      } },
    viereck: {
      gen: function(){ for(var i = 0; i < 80; i++){ var a = zufR(5, 7.5, 1), b = zufR(2.5, 4.5, 1), d = zufR(5, 7, 1), al = zufR(62, 80, 1), dx = d * Math.cos(al * RAD), dy = d * Math.sin(al * RAD); if(dx < a - 1.2 && dy > b + 1) return { a: a, b: b, d: d, al: al }; } return { a: 6.2, b: 4, d: 6.5, al: 71.5 }; },
      bau: function(P){
        var a = P.a, b = P.b, d = P.d, al = P.al, h = d * Math.sin(al * RAD), af = d * Math.cos(al * RAD), dg = a - af, gc = h - b, c = Math.hypot(dg, gc);
        return { pts: { A: [0, 0], B: [a, 0], C: [a, b], D: [af, h], F: [af, 0], G: [a, h] }, poly: ["A", "B", "C", "D"],
          linien: [["D", "F", 2], ["D", "G", 2], ["C", "G", 2]], rw: ["B"], rwExtra: [["F", "D", "B"], ["G", "D", "C"]],
          winkel: [{ p: "A", von: "B", zu: "D", t: z(al, 1) + "°", f: null }],
          seiten: [["A", "B", z(a)], ["B", "C", z(b)], ["D", "A", z(d)], ["C", "D", "c", "c"], ["D", "F", "DF", "h"]], drei: ["D", "G", "C"], dreiName: "DGC", rwDrei: "G",
          geg: "AB = " + z(a) + " cm, BC = " + z(b) + " cm, AD = " + z(d) + " cm, α = " + z(al, 1) + "°",
          fragen: [
            { id: "h", n: "DF", e: "cm", w: h, weg: [["lot", "sin α = DF / AD  →  DF = " + z(d) + " · sin " + z(al, 1) + "° ≈ " + z(h) + " cm"]] },
            { id: "af", n: "AF", e: "cm", w: af, weg: [["lot", "cos α = AF / AD  →  AF = " + z(d) + " · cos " + z(al, 1) + "° ≈ " + z(af) + " cm"]] },
            { id: "c", n: "c = CD", e: "cm", w: c, weg: [["hilfdr", "DG ≈ " + z(a) + " − " + z(af) + " ≈ " + z(dg) + ",  GC ≈ " + z(h) + " − " + z(b) + " ≈ " + z(gc)], ["pyth", "c² ≈ " + z(dg) + "² + " + z(gc) + "² ≈ " + z(dg * dg + gc * gc)], ["", "c ≈ " + z(c) + " cm"]] }] };
      } },
    pyramide: {
      gen: function(){ return { a: zufR(6, 10, 1), h: zufR(6, 10, 1) }; },
      bau: function(P){
        var a = P.a, h = P.h, mb = a * Math.SQRT2 / 2, be = deg(h / mb), ep = 90 - be, hs = Math.hypot(h, a / 2), A = a * hs / 2;
        return { pyr: true, P: P, drei: [], geg: "a = " + z(a) + " cm, h = " + z(h) + " cm",
          fragen: [
            { id: "mb", n: "MB", e: "cm", w: mb, weg: [["halbdiag", "MB = a · √2 : 2 = " + z(a) + " · √2 : 2 ≈ " + z(mb) + " cm"]] },
            { id: "be", n: "β", e: "°", w: be, weg: [["dreieck", "tan β = h / MB = " + z(h) + " / " + z(mb) + " ≈ " + z(h / mb, 4)], ["", "β = tan⁻¹(" + z(h / mb, 4) + ") ≈ " + z(be) + "°"]] },
            { id: "ep", n: "ε", e: "°", w: ep, weg: [["wsum", "ε = 180° − 90° − β ≈ " + z(ep) + "°"]] },
            { id: "A", n: "A(BCS)", e: "cm²", w: A, weg: [["hs", "h_s² = h² + (a : 2)² = " + z(h) + "² + " + z(a / 2) + "² = " + z(h * h + a * a / 4)], ["", "h_s ≈ " + z(hs) + " cm"], ["flBCS", "A = ½ · a · h_s ≈ ½ · " + z(a) + " · " + z(hs) + " ≈ " + z(A) + " cm²"]] }], dreiName: "MBS" };
      } },
    erat: {
      gen: function(){ return { H: Math.round(zufR(15, 30)), S: zufR(1.8, 4, 1), d: Math.round(zufR(70, 90)) * 10 }; },
      bau: function(P){
        var al = deg(P.S / P.H), U = 360 / al * P.d;
        return { erat: true, P: P,
          geg: "H = " + P.H + " m, S = " + z(P.S) + " m, d = " + P.d + " km",
          fragen: [
            { id: "al", n: "winkelO", e: "°", w: al, weg: [["dreieck", "tan α = S / H = " + z(P.S) + " / " + P.H + " ≈ " + z(P.S / P.H, 4)], ["", "α = tan⁻¹(" + z(P.S / P.H, 4) + ") ≈ " + z(al) + "°"]] },
            { id: "U", n: "umfang", e: "km", w: U, rel: 0.012, weg: [["wechsel", "α ≈ " + z(al) + "°"], ["prop", "360° : " + z(al) + "° = U : " + P.d + " km"], ["", "U = 360° : " + z(al) + "° · " + P.d + " km ≈ " + z(U, 0) + " km"]] }] };
      } }
  };
  var REIHE = ["rechteck", "trapez", "gleich", "raute", "viereck", "pyramide", "erat"];
  var akt = "rechteck", P = null, zust = {}, zeigDrei = false;
  function neu(){ P = FIG[akt].gen(); zust = {}; zeigDrei = false; }

  // ---------- Zeichnen ----------
  function svgFigur(G, gel){
    var W = 520, H = 300, pad = 46, xs = [], ys = [];
    for(var k in G.pts){ xs.push(G.pts[k][0]); ys.push(G.pts[k][1]); }
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var m = Math.min((W - 2 * pad) / (x1 - x0), (H - 2 * pad) / (y1 - y0)), ox = (W - (x1 - x0) * m) / 2, oy = (H - (y1 - y0) * m) / 2;
    var X = function(p){ return [ox + (p[0] - x0) * m, H - oy - (p[1] - y0) * m]; };
    var Q = {}; for(var k2 in G.pts) Q[k2] = X(G.pts[k2]);
    var cx = 0, cy = 0; G.poly.forEach(function(k){ cx += Q[k][0]; cy += Q[k][1]; }); cx /= G.poly.length; cy /= G.poly.length;
    var s = '<svg class="fg-svg" viewBox="0 0 ' + W + " " + H + '" role="img">';
    s += '<polygon points="' + G.poly.map(function(k){ return Q[k].join(","); }).join(" ") + '" class="fg-flaeche"/>';
    if(zeigDrei) s += '<polygon points="' + G.drei.map(function(k){ return Q[k].join(","); }).join(" ") + '" class="fg-drei"/>';
    (G.linien || []).forEach(function(l){ s += '<line x1="' + Q[l[0]][0] + '" y1="' + Q[l[0]][1] + '" x2="' + Q[l[1]][0] + '" y2="' + Q[l[1]][1] + '" class="' + (l[2] === 2 ? "fg-hilf" : "fg-diag") + '"/>'; });
    // rechte Winkel
    function rwMark(k, a, b){ var p = Q[k], u = norm(Q[a], p), v = norm(Q[b], p), r = 15, sw = (u[0] * v[1] - u[1] * v[0]) > 0 ? 1 : 0; s += '<path d="M' + (p[0] + u[0] * r) + " " + (p[1] + u[1] * r) + " A" + r + " " + r + " 0 0 " + sw + " " + (p[0] + v[0] * r) + " " + (p[1] + v[1] * r) + '" class="fg-rw"/><circle cx="' + (p[0] + (u[0] + v[0]) * r * 0.36) + '" cy="' + (p[1] + (u[1] + v[1]) * r * 0.36) + '" r="1.8" fill="#1a2233"/>'; }
    var idx = function(k){ return G.poly.indexOf(k); };
    (G.rw || []).forEach(function(k){ var i = idx(k), n = G.poly.length; rwMark(k, G.poly[(i + 1) % n], G.poly[(i + n - 1) % n]); });
    if(G.rwExtra) G.rwExtra.forEach(function(k){
      if(Array.isArray(k)) rwMark(k[0], k[1], k[2]);
      else if(k === "E") rwMark("E", "C", "B"); else if(k === "M" && G.pts.M && G.drei.indexOf("M") >= 0) rwMark("M", G.drei[0] === "M" ? G.drei[1] : G.drei[0], G.drei[2] === "M" ? G.drei[1] : G.drei[2]);
    });
    s += '<polygon points="' + G.poly.map(function(k){ return Q[k].join(","); }).join(" ") + '" class="fg-rand"/>';
    // Winkel
    G.winkel.forEach(function(w){
      var p = Q[w.p], u = norm(Q[w.von], p), v = norm(Q[w.zu], p), r = w.p === "M" ? 20 : 30;
      var a1 = Math.atan2(u[1], u[0]), a2 = Math.atan2(v[1], v[0]), d = a2 - a1; while(d <= -Math.PI) d += 2 * Math.PI; while(d > Math.PI) d -= 2 * Math.PI;
      var rot = !!w.f && !gel[w.f];
      s += '<path d="M' + p[0] + " " + p[1] + " L" + (p[0] + r * Math.cos(a1)) + " " + (p[1] + r * Math.sin(a1)) + " A" + r + " " + r + " 0 0 " + (d > 0 ? 1 : 0) + " " + (p[0] + r * Math.cos(a2)) + " " + (p[1] + r * Math.sin(a2)) + 'Z" class="' + (rot ? "fg-wb rot" : "fg-wb") + '"/>';
      if(w.t){ var am = a1 + d / 2, rr = r + (w.t.length > 2 ? 22 : 13); s += '<text x="' + (p[0] + rr * Math.cos(am)) + '" y="' + (p[1] + rr * Math.sin(am) + 5) + '" class="fg-t' + (rot ? " rot" : "") + '" text-anchor="middle">' + esc(w.f && gel[w.f] ? z(gel[w.f]) + "°" : w.t) + "</text>"; }
    });
    // Seiten
    G.seiten.forEach(function(sd){
      var p = Q[sd[0]], q = Q[sd[1]], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, nx = -(q[1] - p[1]), ny = q[0] - p[0], l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      if((mx + nx * 10 - cx) * nx + (my + ny * 10 - cy) * ny < 0){ nx = -nx; ny = -ny; }
      var i1 = G.poly.indexOf(sd[0]), i2 = G.poly.indexOf(sd[1]), nP = G.poly.length;
      var innen = !(i1 >= 0 && i2 >= 0 && ((i1 - i2 + nP) % nP === 1 || (i2 - i1 + nP) % nP === 1));
      var rot = !!sd[3] && !gel[sd[3]], t = sd[3] && gel[sd[3]] ? z(gel[sd[3]]) : sd[2];
      if(rot && sd[3]) s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" class="fg-ges"/>';
      var off = innen ? 14 : 16;
      if(innen){ mx = p[0] + (q[0] - p[0]) * 0.28; my = p[1] + (q[1] - p[1]) * 0.28; nx = -(q[1] - p[1]) / (Math.hypot(q[0] - p[0], q[1] - p[1]) || 1); ny = (q[0] - p[0]) / (Math.hypot(q[0] - p[0], q[1] - p[1]) || 1); if(ny > 0){ nx = -nx; ny = -ny; } }
      s += '<text x="' + (mx + nx * off) + '" y="' + (my + ny * off + 5) + '" class="fg-t' + (rot ? " rot" : "") + '" text-anchor="middle">' + esc(t) + "</text>";
    });
    // Ecken
    for(var k3 in Q){
      var p3 = Q[k3], dx = p3[0] - cx, dy = p3[1] - cy, l3 = Math.hypot(dx, dy) || 1;
      if(k3 === "M"){ s += '<circle cx="' + p3[0] + '" cy="' + p3[1] + '" r="3.5" fill="#1a2233"/><text x="' + (p3[0] + 10) + '" y="' + (p3[1] - 8) + '" class="fg-ecke">M</text>'; continue; }
      if((k3 === "F" || k3 === "G") && akt === "viereck"){ s += '<circle cx="' + p3[0] + '" cy="' + p3[1] + '" r="3.5" fill="#2563eb"/><text x="' + (p3[0] + (k3 === "G" ? 12 : 0)) + '" y="' + (p3[1] + (k3 === "F" ? 22 : -8)) + '" class="fg-ecke" text-anchor="middle" style="fill:#2563eb">' + k3 + "</text>"; continue; }
      if(k3 === "E" && G.pts.E){ s += '<text x="' + p3[0] + '" y="' + (p3[1] + 22) + '" class="fg-ecke" text-anchor="middle">E</text>'; continue; }
      s += '<text x="' + (p3[0] + dx / l3 * 18) + '" y="' + (p3[1] + dy / l3 * 18 + 6) + '" class="fg-ecke" text-anchor="middle">' + k3 + "</text>";
    }
    return s + "</svg>";
  }
  function norm(a, p){ var dx = a[0] - p[0], dy = a[1] - p[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; }
  function svgPyr(G, gel){
    var a = G.P.a, h = G.P.h, sa = a / 2, th = -22 * RAD, sq = 0.45, T = {};
    function pr(x, zz){ return [x * Math.cos(th) - zz * Math.sin(th), (x * Math.sin(th) + zz * Math.cos(th)) * sq]; }
    T.A = pr(-sa, -sa); T.B = pr(sa, -sa); T.C = pr(sa, sa); T.D = pr(-sa, sa); T.M = [0, 0]; T.S = [0, h];
    var mx0 = Math.min(T.A[0], T.D[0]), my0 = Math.min(T.A[1], T.B[1]); for(var k0 in T){ T[k0] = [T[k0][0] - mx0, T[k0][1] - my0]; }
    var x1 = T.C[0], y1 = T.S[1];
    var W = 520, H = 340, pad = 40, m = Math.min((W - 2 * pad) / x1, (H - 2 * pad) / y1), ox = (W - x1 * m) / 2, oy = (H - y1 * m) / 2, Q = {};
    for(var kk in T) Q[kk] = [ox + T[kk][0] * m, H - oy - T[kk][1] * m];
    function pl(L, cls){ return '<polygon points="' + L.map(function(k){ return Q[k].join(","); }).join(" ") + '" class="' + cls + '"/>'; }
    function li(p, q, cls, extra){ return '<line x1="' + Q[p][0] + '" y1="' + Q[p][1] + '" x2="' + Q[q][0] + '" y2="' + Q[q][1] + '" class="' + cls + '"' + (extra || "") + "/>"; }
    var s = '<svg class="fg-svg" viewBox="0 0 ' + W + " " + H + '" role="img">';
    s += pl(["A", "B", "S"], "fg-flaeche") + pl(["B", "C", "S"], "fg-bcs") + pl(["M", "B", "S"], zeigDrei ? "fg-drei" : "fg-mbs");
    s += li("A", "D", "fg-verd") + li("D", "C", "fg-verd") + li("D", "S", "fg-verd") + li("S", "M", "fg-hilf");
    s += li("A", "B", "fg-k") + li("B", "C", "fg-k") + li("A", "S", "fg-k") + li("B", "S", "fg-k") + li("C", "S", "fg-k") + li("M", "B", "fg-k");
    // rechter Winkel bei M, Winkel β bei B und ε bei S
    var p = Q.M, u = norm(Q.S, p), v = norm(Q.B, p), r = 15, sw = (u[0] * v[1] - u[1] * v[0]) > 0 ? 1 : 0;
    s += '<path d="M' + (p[0] + u[0] * r) + " " + (p[1] + u[1] * r) + " A" + r + " " + r + " 0 0 " + sw + " " + (p[0] + v[0] * r) + " " + (p[1] + v[1] * r) + '" class="fg-rw"/><circle cx="' + (p[0] + (u[0] + v[0]) * r * 0.36) + '" cy="' + (p[1] + (u[1] + v[1]) * r * 0.36) + '" r="1.8" fill="#1a2233"/>';
    [["B", "M", "S", "β", "be", 26], ["S", "M", "B", "ε", "ep", 34]].forEach(function(wi){
      var p2 = Q[wi[0]], u2 = norm(Q[wi[1]], p2), v2 = norm(Q[wi[2]], p2), rr = wi[5], a1 = Math.atan2(u2[1], u2[0]), a2 = Math.atan2(v2[1], v2[0]), d = a2 - a1; while(d <= -Math.PI) d += 2 * Math.PI; while(d > Math.PI) d -= 2 * Math.PI;
      var rot = !gel[wi[4]];
      s += '<path d="M' + p2[0] + " " + p2[1] + " L" + (p2[0] + rr * Math.cos(a1)) + " " + (p2[1] + rr * Math.sin(a1)) + " A" + rr + " " + rr + " 0 0 " + (d > 0 ? 1 : 0) + " " + (p2[0] + rr * Math.cos(a2)) + " " + (p2[1] + rr * Math.sin(a2)) + 'Z" class="fg-wb' + (rot ? " rot" : "") + '"/>';
      var am = a1 + d / 2, r3 = rr + 14; s += '<text x="' + (p2[0] + r3 * Math.cos(am)) + '" y="' + (p2[1] + r3 * Math.sin(am) + 6) + '" class="fg-t' + (rot ? " rot" : "") + '" text-anchor="middle">' + (gel[wi[4]] ? z(gel[wi[4]]) + "°" : wi[3]) + "</text>";
    });
    s += '<text x="' + ((Q.A[0] + Q.B[0]) / 2) + '" y="' + ((Q.A[1] + Q.B[1]) / 2 + 30) + '" class="fg-t" text-anchor="middle">a = ' + z(a) + "</text>";
    s += '<text x="' + (Q.S[0] - 8) + '" y="' + ((Q.S[1] + Q.M[1]) / 2) + '" class="fg-t" text-anchor="end">h = ' + z(h) + "</text>";
    s += '<text x="' + ((Q.M[0] + Q.B[0]) / 2 - 18) + '" y="' + ((Q.M[1] + Q.B[1]) / 2 + 18) + '" class="fg-t' + (gel.mb ? "" : " rot") + '" text-anchor="middle">' + (gel.mb ? z(gel.mb) : "MB") + "</text>";
    var E = { A: [-16, 18], B: [10, 20], C: [16, 4], D: [-14, -6], S: [0, -12], M: [-14, 14] };
    for(var k2 in Q) s += '<text x="' + (Q[k2][0] + E[k2][0]) + '" y="' + (Q[k2][1] + E[k2][1]) + '" class="fg-ecke" text-anchor="middle">' + k2 + "</text>";
    return s + "</svg>";
  }
  function svgErat(G, gel){
    var P0 = G.P, al = Math.atan(P0.S / P0.H), s = '<svg class="fg-svg" viewBox="0 0 560 300" role="img">';
    // links: Obelisk mit Schatten (überhöht gezeichnet)
    var fx = 110, fy = 250, h = 190, sl = h * Math.tan(Math.max(al, 6 * RAD)) * 1.4;
    s += '<rect x="0" y="0" width="560" height="300" fill="#f0f7ff"/><rect x="0" y="250" width="270" height="50" fill="#e9f5d6"/>';
    if(zeigDrei) s += '<polygon points="' + fx + "," + (fy - h) + " " + fx + "," + fy + " " + (fx + sl) + "," + fy + '" class="fg-drei"/>';
    s += '<polygon points="' + (fx - 9) + "," + fy + " " + (fx - 7) + "," + (fy - h + 14) + " " + fx + "," + (fy - h) + " " + (fx + 7) + "," + (fy - h + 14) + " " + (fx + 9) + "," + fy + '" fill="#d6c7a1" stroke="#7c6a43" stroke-width="2"/>';
    s += '<line x1="' + fx + '" y1="' + fy + '" x2="' + (fx + sl) + '" y2="' + fy + '" stroke="#475569" stroke-width="6" stroke-linecap="round"/>';
    for(var i = -1; i <= 1; i++) s += '<line x1="' + (fx - 60 + i * 30) + '" y1="' + (fy - h - 40) + '" x2="' + (fx + sl + i * 30) + '" y2="' + (fy + (i ? 0 : 0)) + '" stroke="#f59e0b" stroke-width="' + (i ? 1.5 : 2.5) + '" stroke-dasharray="' + (i ? "6 5" : "") + '" opacity="' + (i ? 0.6 : 1) + '"/>';
    var aw = Math.atan2(h, sl), r = 40;
    s += '<path d="M' + fx + " " + (fy - h) + " L" + fx + " " + (fy - h + r) + " A" + r + " " + r + " 0 0 0 " + (fx + r * Math.cos(aw)) + " " + (fy - h + r * Math.sin(aw)) + 'Z" class="fg-wb' + (gel.al ? "" : " rot") + '"/>';
    s += '<text x="' + (fx + 14) + '" y="' + (fy - h + 60) + '" class="fg-t' + (gel.al ? "" : " rot") + '">' + (gel.al ? "α ≈ " + z(gel.al) + "°" : "α") + "</text>";
    s += '<text x="' + (fx - 16) + '" y="' + (fy - h / 2) + '" class="fg-t" text-anchor="end">' + P0.H + " m</text>";
    s += '<text x="' + (fx + sl / 2) + '" y="' + (fy + 24) + '" class="fg-t" text-anchor="middle">' + z(P0.S) + " m</text>";
    s += '<path d="M' + (fx + 14) + " " + fy + " A14 14 0 0 0 " + fx + " " + (fy - 14) + '" class="fg-rw"/><circle cx="' + (fx + 5) + '" cy="' + (fy - 5) + '" r="1.8" fill="#1a2233"/>';
    // rechts: Erde mit den beiden Städten
    var ex = 420, ey = 170, er = 105, aw2 = Math.max(al * 3, 16 * RAD), wS = -90 * RAD, wA = wS - aw2;
    var Sy = [ex + er * Math.cos(wS), ey + er * Math.sin(wS)], Al = [ex + er * Math.cos(wA), ey + er * Math.sin(wA)];
    s += '<circle cx="' + ex + '" cy="' + ey + '" r="' + er + '" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>';
    s += '<line x1="' + ex + '" y1="' + ey + '" x2="' + Sy[0] + '" y2="' + Sy[1] + '" stroke="#1a2233" stroke-width="2"/><line x1="' + ex + '" y1="' + ey + '" x2="' + Al[0] + '" y2="' + Al[1] + '" stroke="#1a2233" stroke-width="2"/>';
    s += '<path d="M' + Al[0] + " " + Al[1] + " A" + er + " " + er + " 0 0 1 " + Sy[0] + " " + Sy[1] + '" fill="none" stroke="#dc2626" stroke-width="5"/>';
    s += '<text x="' + ((Al[0] + Sy[0]) / 2 - 2) + '" y="' + (Math.min(Al[1], Sy[1]) - 12) + '" class="fg-t" text-anchor="middle">' + P0.d + " km</text>";
    var r2 = 30; s += '<path d="M' + ex + " " + ey + " L" + (ex + r2 * Math.cos(wS)) + " " + (ey + r2 * Math.sin(wS)) + " A" + r2 + " " + r2 + " 0 0 0 " + (ex + r2 * Math.cos(wA)) + " " + (ey + r2 * Math.sin(wA)) + 'Z" class="fg-wb' + (gel.al ? "" : " rot") + '"/>';
    s += '<text x="' + (ex - 8) + '" y="' + (ey - 40) + '" class="fg-t' + (gel.al ? "" : " rot") + '" text-anchor="end">α</text>';
    s += '<line x1="' + Sy[0] + '" y1="' + (Sy[1] - 60) + '" x2="' + Sy[0] + '" y2="' + Sy[1] + '" stroke="#f59e0b" stroke-width="2.5"/><line x1="' + (Al[0]) + '" y1="' + (Al[1] - 60) + '" x2="' + Al[0] + '" y2="' + Al[1] + '" stroke="#f59e0b" stroke-width="2.5"/>';
    s += '<circle cx="' + Sy[0] + '" cy="' + Sy[1] + '" r="5" fill="#1a2233"/><circle cx="' + Al[0] + '" cy="' + Al[1] + '" r="5" fill="#1a2233"/>';
    s += '<text x="' + (ex) + '" y="' + (ey + 30) + '" class="fg-t" text-anchor="middle">' + (gel.U ? "U ≈ " + z(gel.U, 0) + " km" : "U = ?") + "</text>";
    return s + "</svg>";
  }

  // ---------- Prüfen ----------
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/[°a-zA-Z²]+$/, "").replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  function stimmt(e, f){ if(!isFinite(e)) return false; if(f.rel) return Math.abs(e - f.w) <= f.rel * f.w; return Math.abs(e - f.w) <= 0.051 + 0.002 * Math.abs(f.w); }

  // ---------- Anzeige ----------
  function zeigen(){
    var box = $("figuren"); if(!box) return;
    var s = S(); if(!P) neu();
    var G = FIG[akt].bau(P), gel = {};
    G.fragen.forEach(function(f){ if(zust[f.id] && zust[f.id].ok) gel[f.id] = f.w; });
    var FT = s.F[akt];
    var h = '<p class="zeile">' + esc(s.intro) + '</p><div class="sa-wahl" id="fgWahl">' +
      REIHE.map(function(k){ return '<button type="button" data-f="' + k + '" aria-pressed="' + (k === akt) + '">' + esc(s.F[k][0]) + "</button>"; }).join("") + "</div>";
    h += '<div class="fg-grid"><div><p class="zeile">' + esc(fuell(FT[1], P)) + "</p>" + (G.erat ? svgErat(G, gel) : G.pyr ? svgPyr(G, gel) : svgFigur(G, gel)) +
      '<p class="zeile"><button type="button" class="knopf hell" id="fgDrei" aria-pressed="' + zeigDrei + '">◺ ' + esc(s.zeig) + "</button></p></div><div>";
    h += '<p class="zeile"><b>' + esc(s.gegeben) + '</b> <bdi dir="ltr">' + esc(G.geg) + "</bdi>" + (G.erat ? "" : ' <span class="muted">(' + esc(s.laengen) + ")</span>") + "</p>";
    h += '<p class="zeile"><b>' + esc(s.gesucht) + "</b></p>";
    G.fragen.forEach(function(f){
      var zz = zust[f.id] || {}, name = s[f.n] || f.n;
      h += '<div class="sa-frage"><div class="sa-ein"><label class="fg-lab"><bdi dir="ltr">' + esc(name) + "</bdi> =</label> " +
        '<input class="zahl sa-inp" data-f="' + f.id + '" inputmode="decimal" autocomplete="off" placeholder="' + esc(s.ein) + '" value="' + esc(zz.e || "") + '"> <span class="fg-einh">' + esc(f.e) + "</span>" +
        ' <button type="button" class="knopf sa-pr" data-f="' + f.id + '">' + esc(s.pruefen) + "</button>" +
        ' <span class="meldung sa-m ' + (zz.ok === true ? "gut" : zz.ok === false ? "schlecht" : "") + '">' + (zz.ok === true ? esc(s.richtig) : zz.ok === false ? esc(s.falsch) : "") + "</span></div>" +
        '<details class="sa-weg"' + (zz.ok === true ? " open" : "") + "><summary>" + esc(s.weg) + '</summary><ol class="lauf">' +
        f.weg.map(function(w){ return "<li>" + (w[0] ? '<span class="sa-l">' + esc(fuell(s.L[w[0]], { d: G.dreiName || "" })) + "</span><br>" : "") + '<bdi dir="ltr">' + esc(w[1]) + "</bdi></li>"; }).join("") + "</ol></details></div>";
    });
    h += '<details class="sa-tipp"' + (Object.keys(zust).some(function(k){ return zust[k].ok === false; }) ? " open" : "") + "><summary>" + esc(s.tipp) + "</summary><p>" + esc(s.T[akt]) + "</p></details>";
    h += '<p><button type="button" class="knopf hell" id="fgNeu">↻ ' + esc(s.neu) + "</button></p></div></div>";
    box.innerHTML = h;
    box.querySelectorAll("#fgWahl button").forEach(function(b){ b.addEventListener("click", function(){ akt = b.dataset.f; neu(); zeigen(); }); });
    $("fgNeu").addEventListener("click", function(){ neu(); zeigen(); });
    $("fgDrei").addEventListener("click", function(){ zeigDrei = !zeigDrei; zeigen(); });
    function pruefe(id){
      var inp = box.querySelector('.sa-inp[data-f="' + id + '"]'), f = G.fragen.filter(function(x){ return x.id === id; })[0];
      zust[id] = { e: inp.value, ok: stimmt(lies(inp.value), f) }; if(!zust[id].ok) zeigDrei = true; zeigen();
      var alle = box.querySelectorAll(".sa-inp"), i = G.fragen.indexOf(f) + (zust[id].ok ? 1 : 0); if(alle[i]) alle[i].focus();
    }
    box.querySelectorAll(".sa-pr").forEach(function(b){ b.addEventListener("click", function(){ pruefe(b.dataset.f); }); });
    box.querySelectorAll(".sa-inp").forEach(function(inp){
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); pruefe(inp.dataset.f); } });
      inp.addEventListener("input", function(){ zust[inp.dataset.f] = { e: inp.value }; });
    });
  }
  var css = document.createElement("style");
  css.textContent =
    ".sa-wahl{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px}" +
    ".sa-wahl button{font:600 14px system-ui,sans-serif;padding:6px 12px;border-radius:999px;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;cursor:pointer}" +
    ".sa-wahl button[aria-pressed=\"true\"]{background:#1565c0;border-color:#1565c0;color:#ffffff}" +
    ".fg-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px;align-items:start}@media(max-width:860px){.fg-grid{grid-template-columns:1fr}}" +
    ".fg-svg{width:100%;height:auto;display:block;background:#ffffff;border:1px solid #c9dcf2;border-radius:12px}" +
    ".fg-bcs{fill:#fcd34d;opacity:.85}.fg-mbs{fill:rgba(37,99,235,.18)}.fg-verd{stroke:#475569;stroke-width:1.8;stroke-dasharray:6 5}.fg-k{stroke:#1a2233;stroke-width:2.5;stroke-linecap:round}" +
    ".fg-flaeche{fill:#c7e2a4}.fg-rand{fill:none;stroke:#1a2233;stroke-width:2.5;stroke-linejoin:round}.fg-drei{fill:rgba(245,158,11,.45);stroke:#d97706;stroke-width:3}" +
    ".fg-diag{stroke:#dc2626;stroke-width:3}.fg-hilf{stroke:#2563eb;stroke-width:2.5;stroke-dasharray:7 5}.fg-ges{stroke:#dc2626;stroke-width:4}" +
    ".fg-rw{fill:none;stroke:#1a2233;stroke-width:1.6}.fg-wb{fill:rgba(37,99,235,.18);stroke:#2563eb;stroke-width:1.8}.fg-wb.rot{fill:rgba(220,38,38,.18);stroke:#dc2626}" +
    ".fg-t{font:700 19px system-ui,sans-serif;fill:#1a2233;paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round}.fg-t.rot{fill:#dc2626}" +
    ".fg-ecke{font:800 21px system-ui,sans-serif;fill:#1a2233}" +
    ".sa-frage{border-top:1px solid #dbe5f3;padding-top:8px;margin-top:8px}.sa-ein{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.sa-inp{width:110px !important}.sa-m{margin:0 !important}" +
    ".fg-lab{font:italic 700 19px 'Cambria Math',Cambria,'Times New Roman',serif;color:#dc2626}.fg-einh{font-weight:700;color:#1a2233}" +
    ".sa-tipp,.sa-weg{margin:6px 0}.sa-tipp summary,.sa-weg summary{cursor:pointer;font-weight:700;color:#1565c0;font-size:15px;padding:4px 0}" +
    ".sa-tipp p{background:#fff8e1;border-inline-start:4px solid #f59e0b;padding:6px 10px;border-radius:8px;margin:4px 0;font-size:15.5px;line-height:1.45;color:#1a2233}" +
    ".sa-weg .lauf{font-size:16.5px;line-height:1.5}.sa-weg .lauf li{margin:4px 0}.sa-l{color:#4f5b6e;font-size:14px}";
  document.head.appendChild(css);
  window.MS_TRIG_FIG = { sprache: function(l){ if(FG[l]) lang = l; zeigen(); }, zeigen: zeigen };
})();
