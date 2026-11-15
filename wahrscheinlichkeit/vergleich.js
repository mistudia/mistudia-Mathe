// wahrscheinlichkeit/vergleich.js – Reiter „Bäume vergleichen“
// Drei Situationen; für jede werden drei Baumdiagramme zur selben Frage nebeneinander gezeigt
// (vollständig / zusammengefasst / Kurzform oder typischer Fehler), mit Rechnung, Urteil und
// dem Hinweis, was in der Schule üblich ist. Texte in 9 Sprachen (VG), Sprache über MS_WK_VGL.sprache(l).
(function(){
  "use strict";
  var VG = {
  de: { ueblich: "üblich", tab: "Bäume vergleichen", sitL: "Situation:", rechnung: "Rechnung:", richtig: "✓ richtig", falsch: "✗ falsch", schule: "In der Schule üblich:", pfade: "{n} Pfade",
    intro: "Zur selben Frage kann man verschiedene Baumdiagramme zeichnen. Hier siehst du drei Bäume für dieselbe Situation – alle markierten Pfade gehören zum gesuchten Ereignis.",
    g: "g", u: "u", n6: "6̅", r: "r", b: "b",
    s1: ["Gerade, dann ungerade", "In einer Urne liegen vier Kugeln mit den Zahlen 1 bis 4. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist die Wahrscheinlichkeit, erst eine gerade und dann eine ungerade Zahl zu ziehen?",
      ["Vollständiger Baum", "Jede Zahl bekommt einen eigenen Ast: 4 · 4 = 16 Pfade. Richtig, aber viel Arbeit – vier Pfade müssen addiert werden."],
      ["Zusammengefasster Baum", "Es zählt nur gerade (g) oder ungerade (u). Je 2 von 4 Zahlen, also 1/2. Nur noch 4 Pfade, ein einziger passt."],
      ["Nur der benötigte Pfad", "Man zeichnet nur den Pfad, der gebraucht wird. Das ist richtig – die übrigen Äste wurden nur weggelassen."],
      "Der zusammengefasste Baum (B). Man fasst die Ergebnisse so zusammen, wie es die Frage braucht. Der vollständige Baum ist nicht falsch, aber unnötig groß. Nur den einen Pfad zu zeichnen ist als Kurzform meist in Ordnung, wenn klar ist, wofür g und u stehen."],
    s2: ["Mindestens eine Sechs", "Ein Würfel wird zweimal geworfen. Wie groß ist die Wahrscheinlichkeit für mindestens eine Sechs?",
      ["Vollständiger Baum", "Jede Augenzahl ein Ast: 6 · 6 = 36 Pfade, jeder mit 1/36. 11 Pfade enthalten eine Sechs. Richtig, aber kaum zu zeichnen."],
      ["Baum mit 6 und keine 6", "Nur „6“ oder „keine 6“ (6̅). 3 von 4 Pfaden passen, ihre Wahrscheinlichkeiten werden addiert."],
      ["Gegenereignis", "„Mindestens eine 6“ ist das Gegenteil von „keine 6, keine 6“. Ein einziger Pfad – und dann 1 minus."],
      "Der Baum mit „6 / keine 6“ – und bei „mindestens einmal“ fast immer das Gegenereignis (C): P(mindestens eine 6) = 1 − P(keine 6). Das spart viel Rechnen, besonders bei vielen Würfen."],
    s3: ["Ohne Zurücklegen", "In einer Urne liegen 3 rote und 2 blaue Kugeln. Es werden zwei Kugeln ohne Zurücklegen gezogen. Wie groß ist die Wahrscheinlichkeit, dass beide dieselbe Farbe haben?",
      ["Jede Kugel einzeln", "Die Kugeln heißen R1, R2, R3, B1, B2. Erst 5, dann 4 Möglichkeiten: 20 Pfade mit je 1/5 · 1/4. 8 davon sind gleichfarbig."],
      ["Nur nach Farben", "Rot (r) oder blau (b). Auf der 2. Stufe ist eine Kugel weniger in der Urne – und von der gezogenen Farbe eine weniger."],
      ["Typischer Fehler", "Hier wurde auf der 2. Stufe so gerechnet, als würde zurückgelegt (wieder 3/5 und 2/5). Ohne Zurücklegen ändern sich die Wahrscheinlichkeiten aber."],
      "Der Baum nach Farben (B). Wichtig: Ohne Zurücklegen auf jeder Stufe neu zählen – Nenner und Zähler werden kleiner. Die Probe: Die Äste an jeder Verzweigung ergeben zusammen 1."] },
  en: { ueblich: "usual", tab: "Compare trees", sitL: "Situation:", rechnung: "Calculation:", richtig: "✓ correct", falsch: "✗ wrong", schule: "Usual at school:", pfade: "{n} paths",
    intro: "You can draw different tree diagrams for the same question. Here you see three trees for the same situation – all highlighted paths belong to the event asked for.",
    g: "e", u: "o", n6: "6̅", r: "r", b: "b",
    s1: ["Even, then odd", "An urn contains four balls numbered 1 to 4. Two balls are drawn with replacement. What is the probability of drawing first an even and then an odd number?",
      ["Complete tree", "Each number gets its own branch: 4 · 4 = 16 paths. Correct, but a lot of work – four paths have to be added."],
      ["Combined tree", "Only even (e) or odd (o) matters. 2 of 4 numbers each, so 1/2. Only 4 paths, exactly one fits."],
      ["Only the path needed", "You draw only the path you need. That is correct – the other branches were just left out."],
      "The combined tree (B). You group the outcomes the way the question needs them. The complete tree isn’t wrong, but it is unnecessarily big. Drawing only the one path is usually fine as a short form if it is clear what e and o mean."],
    s2: ["At least one six", "A die is rolled twice. What is the probability of at least one six?",
      ["Complete tree", "One branch per number: 6 · 6 = 36 paths, each 1/36. 11 paths contain a six. Correct, but hardly drawable."],
      ["Tree with 6 and not 6", "Only “6” or “not 6” (6̅). 3 of 4 paths fit; their probabilities are added."],
      ["Complement", "“At least one 6” is the opposite of “no 6, no 6”. A single path – and then 1 minus."],
      "The tree with “6 / not 6” – and for “at least once” almost always the complement (C): P(at least one 6) = 1 − P(no 6). It saves a lot of work, especially with many rolls."],
    s3: ["Without replacement", "An urn contains 3 red and 2 blue balls. Two balls are drawn without replacement. What is the probability that both have the same colour?",
      ["Every ball separately", "The balls are R1, R2, R3, B1, B2. First 5, then 4 options: 20 paths, each 1/5 · 1/4. 8 of them have the same colour."],
      ["Colours only", "Red (r) or blue (b). At the 2nd stage there is one ball less in the urn – and one less of the colour drawn."],
      ["Typical mistake", "Here the 2nd stage was calculated as if the ball were put back (again 3/5 and 2/5). Without replacement the probabilities change, though."],
      "The colour tree (B). Important: without replacement, count again at every stage – numerator and denominator get smaller. Check: the branches at each fork add up to 1."] },
  es: { ueblich: "habitual", tab: "Comparar árboles", sitL: "Situación:", rechnung: "Cálculo:", richtig: "✓ correcto", falsch: "✗ incorrecto", schule: "Lo habitual en clase:", pfade: "{n} caminos",
    intro: "Para la misma pregunta se pueden dibujar distintos diagramas de árbol. Aquí ves tres árboles de la misma situación; todos los caminos marcados pertenecen al suceso buscado.",
    g: "p", u: "i", n6: "6̅", r: "r", b: "a",
    s1: ["Par y luego impar", "En una urna hay cuatro bolas con los números del 1 al 4. Se extraen dos con reemplazamiento. ¿Cuál es la probabilidad de sacar primero un número par y luego uno impar?",
      ["Árbol completo", "Cada número tiene su rama: 4 · 4 = 16 caminos. Correcto, pero laborioso: hay que sumar cuatro caminos."],
      ["Árbol agrupado", "Solo importa par (p) o impar (i). 2 de 4 números cada vez, o sea 1/2. Solo 4 caminos y sirve uno."],
      ["Solo el camino necesario", "Se dibuja solo el camino que hace falta. Es correcto: las demás ramas simplemente se omiten."],
      "El árbol agrupado (B). Se agrupan los resultados como lo pide la pregunta. El completo no es incorrecto, pero sí innecesariamente grande. Dibujar solo el camino suele aceptarse como forma corta si queda claro qué significan p e i."],
    s2: ["Al menos un seis", "Se lanza un dado dos veces. ¿Cuál es la probabilidad de sacar al menos un seis?",
      ["Árbol completo", "Una rama por número: 6 · 6 = 36 caminos de 1/36. 11 caminos tienen un seis. Correcto, pero casi imposible de dibujar."],
      ["Árbol con 6 y no 6", "Solo «6» o «no 6» (6̅). Sirven 3 de 4 caminos; se suman sus probabilidades."],
      ["Suceso contrario", "«Al menos un 6» es lo contrario de «ningún 6, ningún 6». Un solo camino y luego 1 menos."],
      "El árbol «6 / no 6» y, para «al menos una vez», casi siempre el suceso contrario (C): P(al menos un 6) = 1 − P(ningún 6). Ahorra mucho cálculo, sobre todo con muchos lanzamientos."],
    s3: ["Sin reemplazamiento", "En una urna hay 3 bolas rojas y 2 azules. Se sacan dos bolas sin reemplazamiento. ¿Cuál es la probabilidad de que las dos sean del mismo color?",
      ["Cada bola por separado", "Las bolas son R1, R2, R3, A1, A2. Primero 5 y luego 4 opciones: 20 caminos de 1/5 · 1/4. 8 son del mismo color."],
      ["Solo colores", "Roja (r) o azul (a). En la 2.ª etapa hay una bola menos en la urna, y una menos del color sacado."],
      ["Error típico", "Aquí la 2.ª etapa se calculó como si se devolviera la bola (otra vez 3/5 y 2/5). Pero sin reemplazamiento las probabilidades cambian."],
      "El árbol por colores (B). Importante: sin reemplazamiento hay que volver a contar en cada etapa; numerador y denominador disminuyen. Comprobación: las ramas de cada nudo suman 1."] },
  zh: { ueblich: "常用", tab: "比较树状图", sitL: "情境：", rechnung: "计算：", richtig: "✓ 正确", falsch: "✗ 错误", schule: "学校里通常这样做：", pfade: "{n} 条路径",
    intro: "同一个问题可以画出不同的树状图。这里是同一情境的三棵树——标出的路径都属于所求事件。",
    g: "偶", u: "奇", n6: "非6", r: "红", b: "蓝",
    s1: ["先偶后奇", "袋中有标着 1 到 4 的四个球。有放回地摸两次。先摸到偶数、再摸到奇数的概率是多少？",
      ["完整的树", "每个数字一条枝：4 · 4 = 16 条路径。正确，但很费事——要把四条路径相加。"],
      ["合并后的树", "只关心偶数还是奇数。每次 4 个中有 2 个，即 1/2。只有 4 条路径，正好一条符合。"],
      ["只画需要的路径", "只画需要的那条路径。这是对的——其余的枝只是省略了。"],
      "合并后的树（B）。按题目的需要把结果合并。完整的树不算错，但太大了。只画一条路径作为简写通常也可以，只要说清楚“偶”“奇”代表什么。"],
    s2: ["至少一个六", "掷一颗骰子两次。至少出现一个六点的概率是多少？",
      ["完整的树", "每个点数一条枝：6 · 6 = 36 条路径，每条 1/36。其中 11 条含六点。正确，但几乎画不下。"],
      ["“6 / 非6”的树", "只分“6”和“非 6”。4 条路径中 3 条符合，把概率相加。"],
      ["对立事件", "“至少一个 6”是“非 6、非 6”的对立事件。只要一条路径，再用 1 减。"],
      "画“6 / 非6”的树——遇到“至少一次”几乎总用对立事件（C）：P(至少一个 6) = 1 − P(没有 6)。能省很多计算，次数多时尤其如此。"],
    s3: ["不放回", "袋中有 3 个红球和 2 个蓝球。不放回地摸两个球。两个球颜色相同的概率是多少？",
      ["每个球单独画", "球记作 R1、R2、R3、B1、B2。先 5 种，再 4 种：20 条路径，每条 1/5 · 1/4。其中 8 条同色。"],
      ["只按颜色", "红或蓝。第 2 步袋中少了一个球——摸出的那种颜色也少一个。"],
      ["典型错误", "第 2 步按“放回”计算了（又是 3/5 和 2/5）。但不放回时概率会变。"],
      "按颜色画的树（B）。注意：不放回时每一步都要重新数——分子分母都变小。检验：每个分叉处的枝加起来是 1。"] },
  fr: { ueblich: "habituel", tab: "Comparer des arbres", sitL: "Situation :", rechnung: "Calcul :", richtig: "✓ juste", falsch: "✗ faux", schule: "Ce qu’on fait d’habitude en classe :", pfade: "{n} chemins",
    intro: "Pour une même question, on peut dessiner différents arbres. Voici trois arbres pour la même situation – tous les chemins surlignés appartiennent à l’événement cherché.",
    g: "p", u: "i", n6: "6̅", r: "r", b: "b",
    s1: ["Pair puis impair", "Une urne contient quatre boules numérotées de 1 à 4. On tire deux fois avec remise. Quelle est la probabilité d’obtenir d’abord un nombre pair puis un nombre impair ?",
      ["Arbre complet", "Chaque nombre a sa branche : 4 · 4 = 16 chemins. Juste, mais long – il faut additionner quatre chemins."],
      ["Arbre regroupé", "Seul compte pair (p) ou impair (i). 2 nombres sur 4 à chaque fois, donc 1/2. Seulement 4 chemins, un seul convient."],
      ["Seulement le chemin utile", "On ne dessine que le chemin dont on a besoin. C’est juste – les autres branches ont seulement été omises."],
      "L’arbre regroupé (B). On regroupe les issues comme la question l’exige. L’arbre complet n’est pas faux, mais inutilement grand. Ne dessiner que le chemin est souvent accepté comme forme courte si p et i sont clairs."],
    s2: ["Au moins un six", "On lance un dé deux fois. Quelle est la probabilité d’obtenir au moins un six ?",
      ["Arbre complet", "Une branche par face : 6 · 6 = 36 chemins de 1/36. 11 chemins contiennent un six. Juste, mais presque impossible à dessiner."],
      ["Arbre 6 / pas 6", "Seulement « 6 » ou « pas 6 » (6̅). 3 chemins sur 4 conviennent ; on additionne leurs probabilités."],
      ["Événement contraire", "« Au moins un 6 » est le contraire de « pas de 6, pas de 6 ». Un seul chemin – puis 1 moins."],
      "L’arbre « 6 / pas 6 » – et pour « au moins une fois », presque toujours l’événement contraire (C) : P(au moins un 6) = 1 − P(aucun 6). Cela économise beaucoup de calculs, surtout avec de nombreux lancers."],
    s3: ["Sans remise", "Une urne contient 3 boules rouges et 2 bleues. On tire deux boules sans remise. Quelle est la probabilité qu’elles soient de la même couleur ?",
      ["Chaque boule séparément", "Les boules s’appellent R1, R2, R3, B1, B2. D’abord 5, puis 4 possibilités : 20 chemins de 1/5 · 1/4. 8 sont de même couleur."],
      ["Seulement les couleurs", "Rouge (r) ou bleu (b). Au 2e tirage, il y a une boule de moins dans l’urne – et une de moins de la couleur tirée."],
      ["Erreur typique", "Ici, le 2e tirage a été calculé comme avec remise (encore 3/5 et 2/5). Or sans remise, les probabilités changent."],
      "L’arbre des couleurs (B). Important : sans remise, recompter à chaque étape – numérateur et dénominateur diminuent. Vérification : les branches de chaque nœud font 1 au total."] },
  ru: { ueblich: "обычно", tab: "Сравнить деревья", sitL: "Ситуация:", rechnung: "Расчёт:", richtig: "✓ верно", falsch: "✗ неверно", schule: "Как обычно делают в школе:", pfade: "путей: {n}",
    intro: "Для одного и того же вопроса можно нарисовать разные деревья. Здесь три дерева для одной ситуации – все выделенные пути относятся к искомому событию.",
    g: "ч", u: "н", n6: "6̅", r: "к", b: "с",
    s1: ["Сначала чётное, потом нечётное", "В урне четыре шара с номерами от 1 до 4. Шар вынимают дважды с возвращением. Какова вероятность сначала вынуть чётное, а потом нечётное число?",
      ["Полное дерево", "У каждого числа своя ветка: 4 · 4 = 16 путей. Верно, но долго – надо сложить четыре пути."],
      ["Укрупнённое дерево", "Важно только чётное (ч) или нечётное (н). Каждый раз 2 из 4, то есть 1/2. Всего 4 пути, подходит один."],
      ["Только нужный путь", "Рисуют только нужный путь. Это верно – остальные ветки просто опущены."],
      "Укрупнённое дерево (B). Исходы объединяют так, как требует вопрос. Полное дерево не ошибка, но слишком большое. Один путь как краткая запись обычно допустим, если ясно, что означают ч и н."],
    s2: ["Хотя бы одна шестёрка", "Кубик бросают дважды. Какова вероятность хотя бы одной шестёрки?",
      ["Полное дерево", "По ветке на каждое число: 6 · 6 = 36 путей по 1/36. 11 путей содержат шестёрку. Верно, но нарисовать почти невозможно."],
      ["Дерево «6 / не 6»", "Только «6» или «не 6» (6̅). Подходят 3 пути из 4, их вероятности складывают."],
      ["Противоположное событие", "«Хотя бы одна 6» – противоположность «не 6, не 6». Один путь – и потом 1 минус."],
      "Дерево «6 / не 6», а для «хотя бы один раз» почти всегда противоположное событие (C): P(хотя бы одна 6) = 1 − P(ни одной 6). Это экономит много вычислений, особенно при многих бросках."],
    s3: ["Без возвращения", "В урне 3 красных и 2 синих шара. Вынимают два шара без возвращения. Какова вероятность, что оба одного цвета?",
      ["Каждый шар отдельно", "Шары: R1, R2, R3, B1, B2. Сначала 5, потом 4 варианта: 20 путей по 1/5 · 1/4. 8 из них одноцветные."],
      ["Только цвета", "Красный (к) или синий (с). На 2-м шаге в урне на шар меньше – и на один меньше вынутого цвета."],
      ["Типичная ошибка", "Здесь 2-й шаг посчитан так, будто шар вернули (снова 3/5 и 2/5). Но без возвращения вероятности меняются."],
      "Дерево по цветам (B). Важно: без возвращения на каждом шаге считать заново – числитель и знаменатель уменьшаются. Проверка: ветки из каждого узла в сумме дают 1."] },
  ar: { ueblich: "المعتاد", tab: "مقارنة الأشجار", sitL: "الموقف:", rechnung: "الحساب:", richtig: "✓ صحيح", falsch: "✗ خطأ", schule: "المعتاد في المدرسة:", pfade: "{n} مسارات",
    intro: "يمكن رسم مخططات شجرية مختلفة للسؤال نفسه. هنا ثلاث أشجار للموقف نفسه – كل المسارات المظللة تنتمي إلى الحدث المطلوب.",
    g: "ز", u: "ف", n6: "6̅", r: "ح", b: "ز",
    s1: ["زوجي ثم فردي", "في كيس أربع كرات مرقمة من 1 إلى 4. نسحب مرتين مع الإرجاع. ما احتمال أن نسحب أولًا عددًا زوجيًا ثم عددًا فرديًا؟",
      ["الشجرة الكاملة", "لكل عدد فرع: 4 · 4 = 16 مسارًا. صحيح لكنه متعب – يجب جمع أربعة مسارات."],
      ["الشجرة المختصرة", "المهم فقط زوجي (ز) أو فردي (ف). في كل مرة 2 من 4، أي 1/2. أربعة مسارات فقط، يناسب واحد منها."],
      ["المسار المطلوب فقط", "نرسم المسار الذي نحتاجه فقط. هذا صحيح – الفروع الأخرى حُذفت فقط."],
      "الشجرة المختصرة (B). نجمع النتائج بحسب ما يحتاجه السؤال. الشجرة الكاملة ليست خطأ لكنها كبيرة بلا داعٍ. رسم المسار الواحد مقبول غالبًا كصيغة قصيرة إذا كان معنى ز و ف واضحًا."],
    s2: ["ستة واحدة على الأقل", "يُرمى حجر نرد مرتين. ما احتمال ظهور ستة واحدة على الأقل؟",
      ["الشجرة الكاملة", "فرع لكل عدد: 6 · 6 = 36 مسارًا، لكل منها 1/36. في 11 منها ستة. صحيح لكن يصعب رسمه."],
      ["شجرة 6 / ليس 6", "فقط «6» أو «ليس 6» (6̅). تناسب 3 من 4 مسارات، ونجمع احتمالاتها."],
      ["الحدث المتمم", "«ستة واحدة على الأقل» عكس «ليس 6، ليس 6». مسار واحد – ثم 1 ناقص."],
      "شجرة «6 / ليس 6» – ومع «مرة واحدة على الأقل» غالبًا الحدث المتمم (C): P(ستة واحدة على الأقل) = 1 − P(لا ستة). يوفر حسابًا كثيرًا، خاصةً مع رميات كثيرة."],
    s3: ["دون إرجاع", "في كيس 3 كرات حمراء و2 زرقاء. نسحب كرتين دون إرجاع. ما احتمال أن تكون الكرتان من اللون نفسه؟",
      ["كل كرة على حدة", "الكرات R1 وR2 وR3 وB1 وB2. أولًا 5 ثم 4 إمكانيات: 20 مسارًا لكل منها 1/5 · 1/4. منها 8 من اللون نفسه."],
      ["الألوان فقط", "أحمر (ح) أو أزرق (ز). في المرحلة الثانية تنقص كرة من الكيس – وتنقص كرة من اللون المسحوب."],
      ["خطأ شائع", "هنا حُسبت المرحلة الثانية كأن الكرة أُرجعت (مرة أخرى 3/5 و2/5). لكن دون إرجاع تتغير الاحتمالات."],
      "شجرة الألوان (B). مهم: دون إرجاع نعدّ من جديد في كل مرحلة – البسط والمقام يصغران. للتحقق: مجموع الفروع عند كل تفرع يساوي 1."] },
  ja: { ueblich: "ふつう", tab: "樹形図をくらべる", sitL: "場面：", rechnung: "計算：", richtig: "✓ 正しい", falsch: "✗ まちがい", schule: "学校でふつう使うのは：", pfade: "{n} 本の道すじ",
    intro: "同じ問題でも、いろいろな樹形図がかける。ここでは同じ場面の 3 つの樹形図をくらべる――色のついた道すじが、求める事象にあたる。",
    g: "偶", u: "奇", n6: "6̅", r: "赤", b: "青",
    s1: ["偶数のあと奇数", "袋に 1〜4 の番号の玉が 4 個ある。もどしながら 2 回取り出す。1 回目が偶数、2 回目が奇数になる確率は？",
      ["全部かいた樹形図", "数ごとに枝をかく：4 · 4 = 16 本の道すじ。正しいが大変――4 本を足す必要がある。"],
      ["まとめた樹形図", "偶数か奇数かだけを見る。毎回 4 個中 2 個なので 1/2。道すじは 4 本で、あてはまるのは 1 本。"],
      ["必要な道すじだけ", "必要な道すじだけをかく。これも正しい――ほかの枝を省略しただけ。"],
      "まとめた樹形図（B）。問題に合わせて結果をまとめる。全部かいた樹形図もまちがいではないが、大きすぎる。1 本の道すじだけかくのは、偶・奇の意味がはっきりしていれば省略形としてたいてい OK。"],
    s2: ["少なくとも 1 回 6", "さいころを 2 回投げる。少なくとも 1 回 6 が出る確率は？",
      ["全部かいた樹形図", "目ごとに枝：6 · 6 = 36 本、どれも 1/36。6 をふくむのは 11 本。正しいが、かくのはほぼ無理。"],
      ["「6 / 6 以外」の樹形図", "「6」か「6 以外」（6̅）だけ。4 本中 3 本があてはまり、確率を足す。"],
      ["余事象", "「少なくとも 1 回 6」は「6 以外、6 以外」の反対。道すじは 1 本――あとは 1 からひく。"],
      "「6 / 6 以外」の樹形図――「少なくとも 1 回」ならほぼ必ず余事象（C）：P(少なくとも 1 回 6) = 1 − P(6 が出ない)。投げる回数が多いほど計算がぐっと楽になる。"],
    s3: ["もどさない", "袋に赤玉 3 個と青玉 2 個がある。もどさずに 2 個取り出す。2 個が同じ色になる確率は？",
      ["玉を 1 個ずつ区別", "玉を R1、R2、R3、B1、B2 とする。はじめ 5 通り、次は 4 通り：20 本、どれも 1/5 · 1/4。同じ色は 8 本。"],
      ["色だけで分ける", "赤か青。2 回目は袋の玉が 1 個へり、取り出した色も 1 個へる。"],
      ["よくあるまちがい", "2 回目を、もどしたときのように計算している（また 3/5 と 2/5）。もどさないときは確率が変わる。"],
      "色で分けた樹形図（B）。大切：もどさないときは毎回数え直す――分母も分子も小さくなる。確かめ：それぞれの分かれ目の枝の確率の和は 1。"] },
  pt: { ueblich: "habitual", tab: "Comparar árvores", sitL: "Situação:", rechnung: "Cálculo:", richtig: "✓ certo", falsch: "✗ errado", schule: "O habitual na escola:", pfade: "{n} caminhos",
    intro: "Para a mesma pergunta podem desenhar-se árvores diferentes. Aqui estão três árvores da mesma situação – todos os caminhos destacados pertencem ao acontecimento pedido.",
    g: "p", u: "i", n6: "6̅", r: "v", b: "a",
    s1: ["Par e depois ímpar", "Numa urna há quatro bolas numeradas de 1 a 4. Tira-se duas vezes com reposição. Qual é a probabilidade de tirar primeiro um número par e depois um ímpar?",
      ["Árvore completa", "Cada número tem o seu ramo: 4 · 4 = 16 caminhos. Certo, mas trabalhoso – é preciso somar quatro caminhos."],
      ["Árvore agrupada", "Só interessa par (p) ou ímpar (i). 2 de 4 números de cada vez, ou seja 1/2. Só 4 caminhos, serve um."],
      ["Só o caminho necessário", "Desenha-se apenas o caminho de que se precisa. Está certo – os outros ramos só foram omitidos."],
      "A árvore agrupada (B). Agrupam-se os resultados como a pergunta pede. A completa não está errada, mas é desnecessariamente grande. Desenhar só o caminho costuma ser aceite como forma curta, se ficar claro o que significam p e i."],
    s2: ["Pelo menos um seis", "Lança-se um dado duas vezes. Qual é a probabilidade de sair pelo menos um seis?",
      ["Árvore completa", "Um ramo por face: 6 · 6 = 36 caminhos de 1/36. 11 caminhos têm um seis. Certo, mas quase impossível de desenhar."],
      ["Árvore 6 / não 6", "Só «6» ou «não 6» (6̅). Servem 3 de 4 caminhos; somam-se as probabilidades."],
      ["Acontecimento contrário", "«Pelo menos um 6» é o contrário de «nenhum 6, nenhum 6». Um só caminho – e depois 1 menos."],
      "A árvore «6 / não 6» – e, para «pelo menos uma vez», quase sempre o acontecimento contrário (C): P(pelo menos um 6) = 1 − P(nenhum 6). Poupa muitas contas, sobretudo com muitos lançamentos."],
    s3: ["Sem reposição", "Numa urna há 3 bolas vermelhas e 2 azuis. Tiram-se duas bolas sem reposição. Qual é a probabilidade de terem a mesma cor?",
      ["Cada bola à parte", "As bolas são V1, V2, V3, A1, A2. Primeiro 5, depois 4 opções: 20 caminhos de 1/5 · 1/4. 8 têm a mesma cor."],
      ["Só as cores", "Vermelha (v) ou azul (a). Na 2.ª etapa há uma bola a menos na urna – e uma a menos da cor tirada."],
      ["Erro típico", "Aqui a 2.ª etapa foi calculada como se houvesse reposição (de novo 3/5 e 2/5). Mas sem reposição as probabilidades mudam."],
      "A árvore das cores (B). Importante: sem reposição, contar de novo em cada etapa – numerador e denominador diminuem. Verificação: os ramos de cada nó somam 1."] }
  };
  VG.ja.s3[5] = VG.ja.s3[5].replace("each ", "それぞれの");
  VG.ar.s2[5] = VG.ar.s2[5].replace(" (C)", " (C)");
  for(var l in VG) if(window.WT && WT[l]) WT[l].tab_vergl = VG[l].tab;

  var lang = "de", sit = "s1", NS = "http://www.w3.org/2000/svg";
  function $(id){ return document.getElementById(id); }
  function tx(k){ return (VG[lang] && VG[lang][k] != null) ? VG[lang][k] : VG.de[k]; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function ggt(a, b){ return b ? ggt(b, a % b) : a; }
  function bruch(z, n){ var g = ggt(z, n); return (z / g) + "/" + (n / g); }

  // Baum: stufe(i, pfad) liefert [{k, lab, z, n, farbe}], ziel(pfad) markiert die gesuchten Pfade.
  var FB = { g: "#2563eb", u: "#d97706", "6": "#16a34a", n6: "#64748b", r: "#dc2626", b: "#2563eb", z: "#475569" };
  function baue(stufen, stufe, ziel){
    var blaetter = [];
    function knoten(t, pfad){ var n = { kinder: [], pfad: pfad }; if(t === stufen){ n.blatt = blaetter.length; blaetter.push({ pfad: pfad, an: ziel(pfad) }); return n; }
      stufe(t, pfad).forEach(function(o){ var c = knoten(t + 1, pfad.concat([o])); c.o = o; n.kinder.push(c); }); return n; }
    return { wurzel: knoten(0, []), blaetter: blaetter, stufen: stufen };
  }
  function zeichne(svg, B, nurEbene1){
    while(svg.lastChild) svg.removeChild(svg.lastChild);
    var L = B.blaetter.length, zeile = L > 20 ? 15 : L > 10 ? 22 : L > 2 ? 34 : 44, W = 300, H = L * zeile + 16, r = zeile >= 30 ? 13 : zeile >= 20 ? 10 : 7;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var blattX = 196, colW = (blattX - 30) / B.stufen, y = 8 + zeile / 2;
    function lage(n, t){ n.x = 14 + t * colW; if(!n.kinder.length){ n.y = y; y += zeile; return; } n.kinder.forEach(function(c){ lage(c, t + 1); }); n.y = n.kinder.reduce(function(s, c){ return s + c.y; }, 0) / n.kinder.length; }
    lage(B.wurzel, 0);
    B.blaetter.forEach(function(b, i){ if(b.an) svg.appendChild(el("rect", { x: blattX - 8, y: 8 + i * zeile + 1, width: W - blattX + 6, height: zeile - 2, rx: 6, "class": "vg-an" })); });
    function an(n){ return n.blatt != null ? B.blaetter[n.blatt].an : n.kinder.some(an); }
    function kanten(n, t){
      n.kinder.forEach(function(c){
        svg.appendChild(el("line", { x1: n.x + (t ? r : 3), y1: n.y, x2: c.x - r, y2: c.y, "class": "b-kante" + (an(c) ? " an" : "") }));
        if(!(nurEbene1 && t > 0)){
          var q = n.kinder.length > 2 ? 0.66 : 0.5, mx = n.x + (c.x - n.x) * q, my = n.y + (c.y - n.y) * q;
          svg.appendChild(el("text", { x: mx, y: c.y > n.y + 1 ? my + (zeile < 20 ? 10 : 14) : my - 4, "class": "vg-p", "text-anchor": "middle" }, c.o.z + "/" + c.o.n));
        }
        kanten(c, t + 1);
      });
      if(t > 0) kreis(n.x, n.y, n.o, r);
    }
    function kreis(x, y, o, rr){ svg.appendChild(el("circle", { cx: x, cy: y, r: rr, fill: FB[o.f] || FB.z })); svg.appendChild(el("text", { x: x, y: y + rr * 0.38, "class": "vg-k", "font-size": Math.round(rr * (o.lab.length > 2 ? 0.8 : o.lab.length > 1 ? 0.95 : 1.15)) }, o.lab)); }
    svg.appendChild(el("circle", { cx: B.wurzel.x, cy: B.wurzel.y, r: 4, fill: "#1a2233" }));
    kanten(B.wurzel, 0);
    B.blaetter.forEach(function(b, i){
      var cy = 8 + i * zeile + zeile / 2, z = 1, nn = 1; b.pfad.forEach(function(o){ z *= o.z; nn *= o.n; });
      svg.appendChild(el("text", { x: blattX, y: cy + (zeile < 20 ? 4 : 5), "class": "vg-blatt", "font-size": zeile < 20 ? 11 : 14 }, "(" + b.pfad.map(function(o){ return o.lab; }).join(", ") + ") " + bruch(z, nn)));
    });
  }

  // ---------- die drei Situationen ----------
  function o(k, lab, z, n, f){ return { k: k, lab: lab, z: z, n: n, f: f }; }
  function situation(s){
    var g = tx("g"), u = tx("u"), n6 = tx("n6"), rr = tx("r"), bb = tx("b");
    if(s === "s1"){
      var zahlen = function(){ return [1, 2, 3, 4].map(function(i){ return o(i % 2 ? "u" : "g", String(i), 1, 4, i % 2 ? "u" : "g"); }); };
      var gu = function(){ return [o("g", g, 1, 2, "g"), o("u", u, 1, 2, "u")]; };
      var zielGU = function(p){ return p[0].k === "g" && p[1].k === "u"; };
      return [
        { B: baue(2, zahlen, zielGU), ok: true, r: "P = P(2, 1) + P(2, 3) + P(4, 1) + P(4, 3) = 4 · 1/4 · 1/4 = 4/16 = 1/4" },
        { B: baue(2, gu, zielGU), ok: true, r: "P(" + g + ", " + u + ") = 1/2 · 1/2 = 1/4" },
        { B: baue(2, function(i){ return [i === 0 ? o("g", g, 1, 2, "g") : o("u", u, 1, 2, "u")]; }, function(){ return true; }), ok: true, r: "P(" + g + ", " + u + ") = 1/2 · 1/2 = 1/4" }
      ];
    }
    if(s === "s2"){
      var sechs = function(){ return [1, 2, 3, 4, 5, 6].map(function(i){ return o(i === 6 ? "6" : "n6", String(i), 1, 6, i === 6 ? "6" : "z"); }); };
      var sn = function(){ return [o("6", "6", 1, 6, "6"), o("n6", n6, 5, 6, "n6")]; };
      var mind = function(p){ return p.some(function(x){ return x.k === "6"; }); };
      return [
        { B: baue(2, sechs, mind), ok: true, eb1: true, r: "P = 11 · 1/6 · 1/6 = 11/36" },
        { B: baue(2, sn, mind), ok: true, r: "P = P(6, 6) + P(6, " + n6 + ") + P(" + n6 + ", 6) = 1/36 + 5/36 + 5/36 = 11/36" },
        { B: baue(2, function(){ return [o("n6", n6, 5, 6, "n6")]; }, function(){ return true; }), ok: true, r: "P = 1 − P(" + n6 + ", " + n6 + ") = 1 − 5/6 · 5/6 = 1 − 25/36 = 11/36" }
      ];
    }
    var namen = lang === "pt" ? ["V1", "V2", "V3", "A1", "A2"] : lang === "es" ? ["R1", "R2", "R3", "A1", "A2"] : ["R1", "R2", "R3", "B1", "B2"];
    var einzeln = function(t, p){ return namen.filter(function(x){ return !p.some(function(y){ return y.lab === x; }); }).map(function(x, i, A){ var rot = namen.indexOf(x) < 3; return o(rot ? "r" : "b", x, 1, A.length, rot ? "r" : "b"); }); };
    var farben = function(t, p){ var R = 3, Bl = 2; p.forEach(function(x){ if(x.k === "r") R--; else Bl--; }); return [o("r", rr, R, R + Bl, "r"), o("b", bb, Bl, R + Bl, "b")]; };
    var falsch = function(){ return [o("r", rr, 3, 5, "r"), o("b", bb, 2, 5, "b")]; };
    var gleich = function(p){ return p[0].k === p[1].k; };
    return [
      { B: baue(2, einzeln, gleich), ok: true, r: "P = 8 · 1/5 · 1/4 = 8/20 = 2/5" },
      { B: baue(2, farben, gleich), ok: true, r: "P = P(" + rr + ", " + rr + ") + P(" + bb + ", " + bb + ") = 3/5 · 2/4 + 2/5 · 1/4 = 6/20 + 2/20 = 8/20 = 2/5" },
      { B: baue(2, falsch, gleich), ok: false, r: "3/5 · 3/5 + 2/5 · 2/5 = 9/25 + 4/25 = 13/25" }
    ];
  }

  function zeigen(){
    var box = $("vgl"); if(!box) return;
    var S = tx(sit), bs = situation(sit);
    var h = '<p class="zeile">' + esc(tx("intro")) + '</p><div class="wahl" id="vgWahl">' +
      ["s1", "s2", "s3"].map(function(k){ return '<button type="button" data-s="' + k + '" aria-pressed="' + (k === sit) + '">' + esc(tx(k)[0]) + "</button>"; }).join("") + "</div>" +
      '<p class="zeile vg-auf"><b>' + esc(tx("sitL")) + "</b> " + esc(S[1]) + '</p><div class="vg-grid">';
    bs.forEach(function(x, i){
      h += '<div class="vg-box' + (i === 1 ? " vg-schule" : "") + (x.ok ? "" : " vg-falsch") + '"><h3>' + String.fromCharCode(65 + i) + ") " + esc(S[2 + i][0]) + (i === 1 ? ' <span class="vg-badge">★ ' + esc(tx("ueblich")) + "</span>" : "") + '</h3><p class="vg-zahl">' + esc(tx("pfade").replace("{n}", x.B.blaetter.length)) + '</p><svg class="vg-svg" id="vgSvg' + i + '"></svg>' +
        '<p class="vg-urteil ' + (x.ok ? "ja" : "nein") + '">' + esc(tx(x.ok ? "richtig" : "falsch")) + "</p>" +
        '<p class="vg-r"><b>' + esc(tx("rechnung")) + '</b><br><bdi dir="ltr">' + esc(x.r) + '</bdi></p><p class="vg-t">' + esc(S[2 + i][1]) + "</p></div>";
    });
    h += '</div><p class="merke"><b>' + esc(tx("schule")) + "</b> " + esc(S[5]) + "</p>";
    box.innerHTML = h;
    bs.forEach(function(x, i){ zeichne($("vgSvg" + i), x.B, x.eb1); });
    box.querySelectorAll("#vgWahl button").forEach(function(b){ b.addEventListener("click", function(){ sit = b.dataset.s; zeigen(); }); });
  }
  var css = document.createElement("style");
  css.textContent = ".vg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:10px 0}@media(max-width:860px){.vg-grid{grid-template-columns:1fr}}" +
    ".vg-box{border:2px solid #c9dcf2;border-radius:12px;padding:10px;background:#fbfdff;min-width:0}.vg-box h3{margin:0 0 2px;font-size:17px;color:#1565c0}" +
    ".vg-box.vg-schule{border-color:#15803d;box-shadow:0 0 0 2px #bbf7d0}.vg-box.vg-falsch{border-color:#fca5a5;background:#fff7f7}" +
    ".vg-zahl{margin:0 0 4px;color:#4f5b6e;font-size:14px}.vg-svg{width:100%;max-width:420px;height:auto;display:block;margin:0 auto}" +
    ".vg-urteil{font-weight:800;font-size:17px;margin:6px 0}.vg-urteil.ja{color:#15803d}.vg-urteil.nein{color:#b91c1c}" +
    ".vg-r{font-size:15.5px;line-height:1.5;margin:4px 0;font-variant-numeric:tabular-nums}.vg-t{font-size:15.5px;line-height:1.5;margin:4px 0;color:#1a2233}" +
    ".vg-an{fill:#fef3c7}.vg-p{font:700 11px system-ui,sans-serif;fill:#1a2233;paint-order:stroke;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round}" +
    ".vg-k{font-family:system-ui,sans-serif;font-weight:800;fill:#ffffff;text-anchor:middle}.vg-blatt{font-family:system-ui,sans-serif;font-weight:700;fill:#1a2233}" +
    ".vg-auf{margin-top:10px}.vg-badge{display:inline-block;font-size:13px;background:#dcfce7;color:#15803d;border-radius:999px;padding:1px 8px;vertical-align:2px}";
  document.head.appendChild(css);
  window.MS_WK_VGL = { sprache: function(l){ if(VG[l]) lang = l; zeigen(); }, zeigen: zeigen };
})();
