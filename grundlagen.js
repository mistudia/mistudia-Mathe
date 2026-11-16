// ============================================================
// /grundlagen.js – Grundlagen zum Anschauen (miStudia Mathe, 9 Sprachen)
// Karten, die mehrere Kacheln nutzen (Terme vereinfachen, Negative Zahlen):
//   minus     – Minus = Gegenzahl dazu (Guthaben/Schulden-Münzen, Regler)
//   verteilen – k · (a + b) = k · a + k · b (Punktebild, Regler)
//   sorten    – Gleichartiges farbig markieren und für sich zusammenfassen
//   potenz    – x³ = x · x · x, Hochzahlen beim Malnehmen addieren
//   kuerzen   – Bruch aus Potenzen ausschreiben und paarweise wegstreichen
// Nutzung: MS_GRUND.karten(container, ["minus", …], lang) – bei jedem
//   Sprachwechsel erneut aufrufen (Reglerstände bleiben erhalten).
// ============================================================
var MS_GRUND = (function(){
  "use strict";
  var T = {
de: {
  tab: "Grundlagen", intro: "Die wichtigsten Regeln zum Anschauen – mit Bildern statt nur mit Formeln.",
  m_t: "Minus heißt: das Gegenteil dazurechnen",
  m_txt: "Grün ist 1 € Guthaben (+1), rot ist 1 € Schulden (−1). Ein grüner und ein roter Euro heben sich auf – sie werden durchgestrichen.",
  m_plus: "plus", m_minus: "minus", m_rest: "Übrig bleibt: {r}",
  m_merk: "Minus eine Zahl ist dasselbe wie plus ihre Gegenzahl: a − b = a + (−b). 5 € Guthaben − 3 € Guthaben ist also dasselbe wie 5 € Guthaben + 3 € Schulden. Und 3 € Schulden wegnehmen ist dasselbe wie 3 € Guthaben dazugeben: 5 − (−3) = 5 + 3.",
  geld_p: "{n} € Guthaben", geld_n: "{n} € Schulden", geld_0: "0 €",
  v_t: "Mal Klammer: Jedes Glied bekommt den Faktor",
  v_txt: "{k} Reihen mit je {a} blauen und {b} orangen Punkten. Ob man zuerst die Klammer ausrechnet oder jedes Glied einzeln malnimmt – es sind immer gleich viele Punkte.",
  v_w1: "Erst die Klammer:", v_w2: "Jedes Glied einzeln:",
  v_merk: "k · (a + b) = k · a + k · b. Das gilt genauso mit Minus und mit Variablen:",
  s_t: "Gleichartiges farbig markieren und zusammenfassen",
  s_txt: "Gleiche Farbe = gleiche Sorte. Zusammenzählen darf man nur gleiche Sorten – wie 3 Äpfel + 1 Apfel = 4 Äpfel. Äpfel und Birnen bleiben getrennt.",
  s_sort: "Nach Sorten ordnen (das Vorzeichen wandert mit):", s_zus: "Jede Sorte für sich zusammenfassen:",
  s_merk: "a, b und reine Zahlen sind verschiedene Sorten. Auch x und x² sind verschieden: x² + x lässt sich nicht weiter zusammenfassen.",
  neu: "Neues Beispiel",
  p_t: "Potenzen sind kurz geschriebene Produkte",
  p_merk: "Die Hochzahl sagt, wie oft die Variable mit sich selbst malgenommen wird. Bei gleicher Variable werden die Hochzahlen beim Malnehmen addiert: x² · x³ = x⁵.",
  k_t: "Kürzen sichtbar machen",
  k_txt: "Schreibe die Potenzen als Produkte aus. Was oben und unten gleich vorkommt, darf man paarweise wegstreichen (kürzen) – denn x : x = 1.",
  k_z: "Zähler", k_n: "Nenner", k_aus: "Ausgeschrieben und gekürzt:", k_zahl: "Zahlen kürzen: {a} und {b} durch {g} teilen.",
  k_err: "Bitte oben und unten nur eine Zahl mal Variablen eingeben, z. B. 6x³y² und 3x²y.", k_nochmal: "Nochmal zeigen"
},
en: {
  tab: "Basics", intro: "The most important rules to look at – with pictures, not just formulas.",
  m_t: "Minus means: add the opposite",
  m_txt: "Green is €1 credit (+1), red is €1 debt (−1). One green and one red euro cancel each other out – they get crossed out.",
  m_plus: "plus", m_minus: "minus", m_rest: "What is left: {r}",
  m_merk: "Subtracting a number is the same as adding its opposite: a − b = a + (−b). So €5 credit − €3 credit is the same as €5 credit + €3 debt. And taking away €3 of debt is the same as adding €3 credit: 5 − (−3) = 5 + 3.",
  geld_p: "€{n} credit", geld_n: "€{n} debt", geld_0: "€0",
  v_t: "Times a bracket: every term gets the factor",
  v_txt: "{k} rows with {a} blue and {b} orange dots each. Whether you work out the bracket first or multiply each term separately – it is always the same number of dots.",
  v_w1: "Bracket first:", v_w2: "Each term separately:",
  v_merk: "k · (a + b) = k · a + k · b. This works the same way with minus and with variables:",
  s_t: "Mark like terms in colour and combine them",
  s_txt: "Same colour = same kind. You may only add things of the same kind – like 3 apples + 1 apple = 4 apples. Apples and pears stay separate.",
  s_sort: "Sort by kind (the sign moves along):", s_zus: "Combine each kind on its own:",
  s_merk: "a, b and plain numbers are different kinds. x and x² are different too: x² + x cannot be simplified any further.",
  neu: "New example",
  p_t: "Powers are products written in short",
  p_merk: "The exponent tells you how often the variable is multiplied by itself. When multiplying the same variable, the exponents are added: x² · x³ = x⁵.",
  k_t: "Seeing how cancelling works",
  k_txt: "Write the powers out as products. Whatever appears both on top and at the bottom may be crossed out in pairs (cancelled) – because x ÷ x = 1.",
  k_z: "Numerator", k_n: "Denominator", k_aus: "Written out and cancelled:", k_zahl: "Cancel the numbers: divide {a} and {b} by {g}.",
  k_err: "Please enter only a number times variables on top and at the bottom, e.g. 6x³y² and 3x²y.", k_nochmal: "Show again"
},
es: {
  tab: "Lo básico", intro: "Las reglas más importantes para mirar – con imágenes y no solo con fórmulas.",
  m_t: "Restar significa: sumar lo contrario",
  m_txt: "Verde es 1 € a favor (+1), rojo es 1 € de deuda (−1). Un euro verde y uno rojo se anulan: se tachan.",
  m_plus: "más", m_minus: "menos", m_rest: "Queda: {r}",
  m_merk: "Restar un número es lo mismo que sumar su opuesto: a − b = a + (−b). Así, 5 € a favor − 3 € a favor es lo mismo que 5 € a favor + 3 € de deuda. Y quitar 3 € de deuda es lo mismo que añadir 3 € a favor: 5 − (−3) = 5 + 3.",
  geld_p: "{n} € a favor", geld_n: "{n} € de deuda", geld_0: "0 €",
  v_t: "Por un paréntesis: cada término recibe el factor",
  v_txt: "{k} filas con {a} puntos azules y {b} naranjas cada una. Tanto si calculas primero el paréntesis como si multiplicas cada término por separado, siempre hay los mismos puntos.",
  v_w1: "Primero el paréntesis:", v_w2: "Cada término por separado:",
  v_merk: "k · (a + b) = k · a + k · b. Funciona igual con signo menos y con variables:",
  s_t: "Marcar términos semejantes con colores y agruparlos",
  s_txt: "Mismo color = misma clase. Solo se pueden sumar cosas de la misma clase, como 3 manzanas + 1 manzana = 4 manzanas. Manzanas y peras quedan separadas.",
  s_sort: "Ordenar por clases (el signo va con el término):", s_zus: "Reducir cada clase por separado:",
  s_merk: "a, b y los números solos son clases distintas. También x y x² son distintas: x² + x no se puede reducir más.",
  neu: "Nuevo ejemplo",
  p_t: "Las potencias son productos escritos en corto",
  p_merk: "El exponente dice cuántas veces se multiplica la variable por sí misma. Al multiplicar la misma variable, los exponentes se suman: x² · x³ = x⁵.",
  k_t: "Ver cómo se simplifica",
  k_txt: "Escribe las potencias como productos. Lo que aparece igual arriba y abajo se puede tachar por parejas (simplificar), porque x : x = 1.",
  k_z: "Numerador", k_n: "Denominador", k_aus: "Desarrollado y simplificado:", k_zahl: "Simplificar los números: dividir {a} y {b} entre {g}.",
  k_err: "Escribe arriba y abajo solo un número por variables, p. ej. 6x³y² y 3x²y.", k_nochmal: "Mostrar otra vez"
},
zh: {
  tab: "基础", intro: "最重要的规则，用图来看，而不只是公式。",
  m_t: "减法就是：加上相反数",
  m_txt: "绿色表示 1 欧元存款（+1），红色表示 1 欧元欠款（−1）。一个绿色和一个红色互相抵消，被划掉。",
  m_plus: "加", m_minus: "减", m_rest: "剩下：{r}",
  m_merk: "减去一个数，等于加上它的相反数：a − b = a + (−b)。所以 5 欧元存款 − 3 欧元存款 等于 5 欧元存款 + 3 欧元欠款。去掉 3 欧元欠款，等于加上 3 欧元存款：5 − (−3) = 5 + 3。",
  geld_p: "{n} 欧元存款", geld_n: "{n} 欧元欠款", geld_0: "0 欧元",
  v_t: "乘括号：每一项都乘这个因数",
  v_txt: "{k} 行，每行 {a} 个蓝点和 {b} 个橙点。先算括号，还是每一项分别相乘——点的个数总是一样的。",
  v_w1: "先算括号：", v_w2: "每一项分别乘：",
  v_merk: "k · (a + b) = k · a + k · b。有减号和字母时也一样：",
  s_t: "用颜色标出同类项并合并",
  s_txt: "同一颜色 = 同一类。只有同类的才能相加，就像 3 个苹果 + 1 个苹果 = 4 个苹果。苹果和梨要分开。",
  s_sort: "按类排列（符号跟着项走）：", s_zus: "每一类分别合并：",
  s_merk: "a、b 和单独的数是不同的类。x 和 x² 也不同：x² + x 不能再合并。",
  neu: "新例子",
  p_t: "幂是简写的乘积",
  p_merk: "指数表示这个字母自己乘了几次。同一个字母相乘时，指数相加：x² · x³ = x⁵。",
  k_t: "看见约分",
  k_txt: "把幂写成乘积。上下都有的相同因数可以成对划掉（约分），因为 x ÷ x = 1。",
  k_z: "分子", k_n: "分母", k_aus: "展开并约分：", k_zahl: "约去数字：{a} 和 {b} 都除以 {g}。",
  k_err: "上下请只输入一个数乘字母，例如 6x³y² 和 3x²y。", k_nochmal: "再看一次"
},
fr: {
  tab: "Les bases", intro: "Les règles les plus importantes à regarder – avec des images, pas seulement des formules.",
  m_t: "Moins veut dire : ajouter l’opposé",
  m_txt: "Vert = 1 € d’avoir (+1), rouge = 1 € de dette (−1). Un euro vert et un euro rouge s’annulent : on les barre.",
  m_plus: "plus", m_minus: "moins", m_rest: "Il reste : {r}",
  m_merk: "Soustraire un nombre, c’est ajouter son opposé : a − b = a + (−b). Donc 5 € d’avoir − 3 € d’avoir, c’est pareil que 5 € d’avoir + 3 € de dette. Et enlever 3 € de dette, c’est pareil qu’ajouter 3 € d’avoir : 5 − (−3) = 5 + 3.",
  geld_p: "{n} € d’avoir", geld_n: "{n} € de dette", geld_0: "0 €",
  v_t: "Fois une parenthèse : chaque terme reçoit le facteur",
  v_txt: "{k} rangées de {a} points bleus et {b} points orange. Qu’on calcule d’abord la parenthèse ou qu’on multiplie chaque terme séparément, il y a toujours le même nombre de points.",
  v_w1: "D’abord la parenthèse :", v_w2: "Chaque terme séparément :",
  v_merk: "k · (a + b) = k · a + k · b. Cela marche aussi avec moins et avec des lettres :",
  s_t: "Colorier les termes semblables et les regrouper",
  s_txt: "Même couleur = même sorte. On ne peut additionner que des choses de la même sorte – comme 3 pommes + 1 pomme = 4 pommes. Les pommes et les poires restent séparées.",
  s_sort: "Ranger par sortes (le signe suit le terme) :", s_zus: "Réduire chaque sorte à part :",
  s_merk: "a, b et les nombres seuls sont des sortes différentes. x et x² aussi : x² + x ne se réduit pas davantage.",
  neu: "Nouvel exemple",
  p_t: "Les puissances sont des produits écrits en abrégé",
  p_merk: "L’exposant dit combien de fois la lettre est multipliée par elle-même. Quand on multiplie la même lettre, on additionne les exposants : x² · x³ = x⁵.",
  k_t: "Voir la simplification",
  k_txt: "Écris les puissances sous forme de produits. Ce qui apparaît en haut et en bas peut être barré par paires (simplifié), car x : x = 1.",
  k_z: "Numérateur", k_n: "Dénominateur", k_aus: "Écrit en entier et simplifié :", k_zahl: "Simplifier les nombres : diviser {a} et {b} par {g}.",
  k_err: "En haut et en bas, écris seulement un nombre fois des lettres, p. ex. 6x³y² et 3x²y.", k_nochmal: "Revoir"
},
ru: {
  tab: "Основы", intro: "Самые важные правила наглядно – с картинками, а не только формулами.",
  m_t: "Минус значит: прибавить противоположное",
  m_txt: "Зелёный – 1 € на счёте (+1), красный – 1 € долга (−1). Один зелёный и один красный взаимно уничтожаются – их зачёркивают.",
  m_plus: "плюс", m_minus: "минус", m_rest: "Остаётся: {r}",
  m_merk: "Вычесть число – то же самое, что прибавить противоположное: a − b = a + (−b). Значит, 5 € на счёте − 3 € на счёте – то же, что 5 € на счёте + 3 € долга. А убрать 3 € долга – то же, что добавить 3 € на счёт: 5 − (−3) = 5 + 3.",
  geld_p: "{n} € на счёте", geld_n: "{n} € долга", geld_0: "0 €",
  v_t: "Умножение на скобку: каждый член получает множитель",
  v_txt: "{k} рядов, в каждом {a} синих и {b} оранжевых точек. Считаешь сначала скобку или умножаешь каждый член отдельно – точек всегда столько же.",
  v_w1: "Сначала скобка:", v_w2: "Каждый член отдельно:",
  v_merk: "k · (a + b) = k · a + k · b. Так же и с минусом, и с переменными:",
  s_t: "Отметить подобные члены цветом и сложить",
  s_txt: "Один цвет = один сорт. Складывать можно только одинаковое – как 3 яблока + 1 яблоко = 4 яблока. Яблоки и груши остаются отдельно.",
  s_sort: "Расставить по сортам (знак идёт вместе с членом):", s_zus: "Сложить каждый сорт отдельно:",
  s_merk: "a, b и просто числа – разные сорта. x и x² тоже разные: x² + x больше не упростить.",
  neu: "Новый пример",
  p_t: "Степень – это коротко записанное произведение",
  p_merk: "Показатель говорит, сколько раз переменная умножается сама на себя. При умножении одинаковых переменных показатели складываются: x² · x³ = x⁵.",
  k_t: "Как выглядит сокращение",
  k_txt: "Распиши степени как произведения. То, что есть и сверху, и снизу, можно попарно зачеркнуть (сократить) – ведь x : x = 1.",
  k_z: "Числитель", k_n: "Знаменатель", k_aus: "Расписано и сокращено:", k_zahl: "Сократить числа: {a} и {b} разделить на {g}.",
  k_err: "Сверху и снизу введи только число, умноженное на переменные, например 6x³y² и 3x²y.", k_nochmal: "Показать ещё раз"
},
ar: {
  tab: "الأساسيات", intro: "أهم القواعد للمشاهدة – بالصور وليس بالصيغ فقط.",
  m_t: "الطرح يعني: إضافة العكس",
  m_txt: "الأخضر 1 € رصيد (+1)، والأحمر 1 € دين (−1). يلغي يورو أخضر ويورو أحمر بعضهما – فيُشطبان.",
  m_plus: "زائد", m_minus: "ناقص", m_rest: "يبقى: {r}",
  m_merk: "طرح عدد هو نفسه إضافة معكوسه: a − b = a + (−b). إذن 5 € رصيد − 3 € رصيد هو نفسه 5 € رصيد + 3 € دين. وإزالة دين 3 € هي نفسها إضافة رصيد 3 €: 5 − (−3) = 5 + 3.",
  geld_p: "{n} € رصيد", geld_n: "{n} € دين", geld_0: "0 €",
  v_t: "الضرب في قوس: كل حدّ يُضرب في العامل",
  v_txt: "{k} صفوف، في كل منها {a} نقاط زرقاء و{b} نقاط برتقالية. سواء حسبت القوس أولًا أو ضربت كل حد على حدة – يبقى عدد النقاط نفسه دائمًا.",
  v_w1: "القوس أولًا:", v_w2: "كل حد على حدة:",
  v_merk: "k · (a + b) = k · a + k · b. وهذا صحيح أيضًا مع الطرح ومع المتغيرات:",
  s_t: "تلوين الحدود المتشابهة وجمعها",
  s_txt: "اللون نفسه = النوع نفسه. لا يُجمع إلا ما هو من النوع نفسه – مثل 3 تفاحات + تفاحة = 4 تفاحات. التفاح والإجاص يبقيان منفصلين.",
  s_sort: "الترتيب حسب النوع (الإشارة تنتقل مع الحد):", s_zus: "جمع كل نوع وحده:",
  s_merk: "a وb والأعداد وحدها أنواع مختلفة. وكذلك x وx² مختلفان: لا يمكن تبسيط x² + x أكثر.",
  neu: "مثال جديد",
  p_t: "القوى حواصل ضرب مكتوبة باختصار",
  p_merk: "الأس يبين كم مرة يُضرب المتغير في نفسه. عند ضرب المتغير نفسه تُجمع الأسس: x² · x³ = x⁵.",
  k_t: "رؤية الاختصار",
  k_txt: "اكتب القوى كحواصل ضرب. ما يظهر في الأعلى والأسفل معًا يمكن شطبه أزواجًا (اختصاره)، لأن x ÷ x = 1.",
  k_z: "البسط", k_n: "المقام", k_aus: "مكتوب بالتفصيل ومختصر:", k_zahl: "اختصار الأعداد: قسمة {a} و{b} على {g}.",
  k_err: "أدخل في الأعلى والأسفل عددًا مضروبًا في متغيرات فقط، مثل 6x³y² و3x²y.", k_nochmal: "أعد العرض"
},
ja: {
  tab: "きほん", intro: "いちばん大事なきまりを、式だけでなく図で見てみよう。",
  m_t: "ひき算は「反対の数をたす」こと",
  m_txt: "緑は 1 ユーロの残高（+1）、赤は 1 ユーロの借金（−1）。緑と赤が 1 つずつで打ち消し合い、線で消されます。",
  m_plus: "たす", m_minus: "ひく", m_rest: "残り：{r}",
  m_merk: "ある数をひくことは、その反対の数をたすことと同じです：a − b = a + (−b)。だから 5 ユーロの残高 − 3 ユーロの残高 は 5 ユーロの残高 + 3 ユーロの借金 と同じ。3 ユーロの借金をなくすことは 3 ユーロの残高をたすことと同じ：5 − (−3) = 5 + 3。",
  geld_p: "{n} ユーロの残高", geld_n: "{n} ユーロの借金", geld_0: "0 ユーロ",
  v_t: "かっこにかける：どの項にも同じ数をかける",
  v_txt: "{k} 列、各列に青い点 {a} 個とオレンジの点 {b} 個。先にかっこを計算しても、項ごとにかけても、点の数はいつも同じです。",
  v_w1: "先にかっこ：", v_w2: "項ごとにかける：",
  v_merk: "k · (a + b) = k · a + k · b。マイナスや文字があっても同じです：",
  s_t: "同類項に色をつけてまとめる",
  s_txt: "同じ色 = 同じ種類。たせるのは同じ種類どうしだけ。りんご 3 個 + りんご 1 個 = りんご 4 個。りんごとなしは別々のまま。",
  s_sort: "種類ごとに並べる（符号は項といっしょに動く）：", s_zus: "種類ごとにまとめる：",
  s_merk: "a、b、数だけの項はちがう種類。x と x² もちがいます：x² + x はこれ以上まとめられません。",
  neu: "別の例",
  p_t: "累乗はかけ算を短く書いたもの",
  p_merk: "指数は、その文字を何回かけるかを表します。同じ文字どうしをかけると指数はたし算：x² · x³ = x⁵。",
  k_t: "約分を目で見る",
  k_txt: "累乗をかけ算の形に書き出そう。上と下に同じものがあれば、ペアで消せます（約分）。x ÷ x = 1 だからです。",
  k_z: "分子", k_n: "分母", k_aus: "書き出して約分：", k_zahl: "数を約分：{a} と {b} を {g} でわる。",
  k_err: "上と下には「数 × 文字」だけを入れてください。例：6x³y² と 3x²y。", k_nochmal: "もう一度見る"
},
pt: {
  tab: "O básico", intro: "As regras mais importantes para ver – com imagens, não só com fórmulas.",
  m_t: "Menos quer dizer: somar o oposto",
  m_txt: "Verde é 1 € de saldo (+1), vermelho é 1 € de dívida (−1). Um euro verde e um vermelho se anulam – são riscados.",
  m_plus: "mais", m_minus: "menos", m_rest: "Sobra: {r}",
  m_merk: "Subtrair um número é o mesmo que somar o seu oposto: a − b = a + (−b). Então 5 € de saldo − 3 € de saldo é o mesmo que 5 € de saldo + 3 € de dívida. E tirar 3 € de dívida é o mesmo que somar 3 € de saldo: 5 − (−3) = 5 + 3.",
  geld_p: "{n} € de saldo", geld_n: "{n} € de dívida", geld_0: "0 €",
  v_t: "Vezes um parêntese: cada termo recebe o fator",
  v_txt: "{k} fileiras com {a} pontos azuis e {b} laranja cada. Calculando primeiro o parêntese ou multiplicando cada termo separadamente – são sempre os mesmos pontos.",
  v_w1: "Primeiro o parêntese:", v_w2: "Cada termo separadamente:",
  v_merk: "k · (a + b) = k · a + k · b. Vale do mesmo jeito com menos e com variáveis:",
  s_t: "Marcar termos semelhantes com cores e juntá-los",
  s_txt: "Mesma cor = mesmo tipo. Só se somam coisas do mesmo tipo – como 3 maçãs + 1 maçã = 4 maçãs. Maçãs e peras ficam separadas.",
  s_sort: "Ordenar por tipo (o sinal vai junto):", s_zus: "Juntar cada tipo separadamente:",
  s_merk: "a, b e números sozinhos são tipos diferentes. x e x² também: x² + x não se simplifica mais.",
  neu: "Novo exemplo",
  p_t: "Potências são produtos escritos de forma curta",
  p_merk: "O expoente diz quantas vezes a variável é multiplicada por ela mesma. Multiplicando a mesma variável, os expoentes se somam: x² · x³ = x⁵.",
  k_t: "Ver a simplificação",
  k_txt: "Escreva as potências como produtos. O que aparece igual em cima e embaixo pode ser riscado aos pares (simplificado), porque x : x = 1.",
  k_z: "Numerador", k_n: "Denominador", k_aus: "Escrito por extenso e simplificado:", k_zahl: "Simplificar os números: dividir {a} e {b} por {g}.",
  k_err: "Em cima e embaixo, digite só um número vezes variáveis, p. ex. 6x³y² e 3x²y.", k_nochmal: "Mostrar de novo"
}
  };
  var lang = "de";
  function t(k, v){ var s = (T[lang] && T[lang][k]) || T.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  // Arabisch: Formeln im Fließtext links-nach-rechts halten
  function tx(k, v){ var s = esc(t(k, v)); return lang === "ar" ? s.replace(/[(−\-]*[0-9a-z][0-9a-z²³⁵ ()·:+−=÷\-]*[0-9a-z²³⁵)]/gi, function(m){ return /[=+−·:÷]/.test(m) ? '<bdi dir="ltr" style="white-space:nowrap">' + m + "</bdi>" : m; }) : s; }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zz(n){ return n < 0 ? "−" + (-n) : String(n); }       // Zahl mit echtem Minus
  function kl(n){ return n < 0 ? "(−" + (-n) + ")" : String(n); } // negative Zahl in Klammern
  function geld(n){ return n > 0 ? t("geld_p", { n: n }) : n < 0 ? t("geld_n", { n: -n }) : t("geld_0"); }
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(k){ return String(k).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }

  var css = document.createElement("style");
  css.textContent =
    ".gl-karte{border:2px solid #c9dcf2;border-radius:14px;padding:12px;margin-bottom:12px;background:#ffffff;color:#1a2233}" +
    ".gl-karte h2{color:#1565c0;font-size:19px;margin:2px 0 6px}.gl-p{font-size:16.5px;line-height:1.5;margin:6px 0}" +
    ".gl-f{font-size:20px;line-height:1.75;font-weight:700;margin:6px 0;font-variant-numeric:tabular-nums}" +
    ".gl-merk{border-inline-start:5px solid #1565c0;background:#f4f8ff;padding:8px 12px;border-radius:8px;font-size:16px;line-height:1.45;margin:8px 0}" +
    ".gl-regler{display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;margin:6px 0;direction:ltr}.gl-regler label{display:inline-flex;align-items:center;gap:8px;font:700 18px system-ui,sans-serif}" +
    ".gl-regler input[type=range]{width:150px;max-width:42vw;accent-color:#1565c0}.gl-regler b{min-width:2.2em;color:#1565c0}" +
    ".gl-wahl{display:inline-flex;background:#e3eefc;border-radius:12px;padding:3px;gap:3px}.gl-wahl button{font:700 18px system-ui,sans-serif;padding:5px 14px;border:0;border-radius:9px;background:transparent;color:#1565c0;cursor:pointer}" +
    ".gl-wahl button[aria-pressed=true]{background:#1565c0;color:#ffffff}" +
    ".gl-muenzen{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:8px 0;direction:ltr;min-height:40px}" +
    ".gl-m{width:36px;height:36px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font:800 14px system-ui,sans-serif;color:#ffffff;position:relative;flex:none}" +
    ".gl-m.p{background:#16a34a;box-shadow:inset 0 0 0 3px #15803d}.gl-m.n{background:#dc2626;box-shadow:inset 0 0 0 3px #b91c1c}" +
    ".gl-m.weg{opacity:.45}.gl-m.weg::after{content:'';position:absolute;left:-3px;right:-3px;top:50%;border-top:3px solid #1a2233;transform:rotate(-35deg)}" +
    ".gl-trenn{font:800 22px system-ui,sans-serif;margin:0 6px;color:#1a2233}" +
    ".gl-geld{font-size:17px;line-height:1.6;margin:4px 0}.gl-geld .p{color:#15803d;font-weight:700}.gl-geld .n{color:#b91c1c;font-weight:700}" +
    ".gl-zwei{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:center}@media (max-width:700px){.gl-zwei{grid-template-columns:1fr}}" +
    ".gl-punkte{display:grid;gap:5px;justify-content:start;direction:ltr;margin:6px 0}.gl-reihe{display:flex;gap:5px;align-items:center}" +
    ".gl-pk{width:18px;height:18px;border-radius:50%;flex:none}.gl-pk.a{background:#2563eb}.gl-pk.b{background:#f59e0b}.gl-lucke{width:10px}" +
    ".gl-k{color:#7c3aed}.gl-a{color:#2563eb}.gl-b{color:#d97706}" +
    ".gl-chip{display:inline-block;padding:0 8px;border-radius:10px;margin:2px 1px;font-weight:700;border:2px solid transparent}" +
    ".gl-c0{background:#dbeafe;border-color:#2563eb;color:#1e3a8a}.gl-c1{background:#dcfce7;border-color:#16a34a;color:#14532d}.gl-c2{background:#fef3c7;border-color:#d97706;color:#78350f}" +
    ".gl-c3{background:#fce7f3;border-color:#db2777;color:#831843}.gl-c4{background:#ede9fe;border-color:#7c3aed;color:#3b0764}.gl-ck{background:#f1f5f9;border-color:#64748b;color:#1a2233}" +
    ".gl-knopf{font:700 15px system-ui,sans-serif;padding:7px 14px;border-radius:10px;border:0;background:#e3eefc;color:#1565c0;cursor:pointer}" +
    ".gl-bruch{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:4px 6px;direction:ltr}" +
    ".gl-bruch>span{display:flex;gap:4px;align-items:center;justify-content:center;padding:3px 6px;flex-wrap:nowrap}.gl-bruch>span:first-child{border-bottom:3px solid #1a2233}" +
    ".gl-fk{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:32px;padding:0 6px;border-radius:9px;font:800 20px system-ui,sans-serif;position:relative;border:2px solid transparent}" +
    ".gl-fk.weg::after{content:'';position:absolute;left:-2px;right:-2px;top:50%;border-top:3px solid #dc2626;transform:rotate(-30deg) scaleX(0);transform-origin:left;animation:glStrich .35s ease-out forwards;animation-delay:var(--d,0s)}" +
    ".gl-fk.weg{animation:glBlass .35s ease-out forwards;animation-delay:var(--d,0s)}" +
    "@keyframes glStrich{to{transform:rotate(-30deg) scaleX(1)}}@keyframes glBlass{to{opacity:.4}}" +
    ".gl-kz{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin:6px 0}.gl-kz label{font-weight:700;display:inline-flex;align-items:center;gap:6px}" +
    ".gl-kz input{width:150px;font:20px system-ui,sans-serif;padding:5px 8px;border:2px solid #b0b0b8;border-radius:10px;direction:ltr;text-align:center;color:#1a2233;background:#ffffff}" +
    ".gl-bsp{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;direction:ltr}.gl-bsp button{font:600 15px system-ui,sans-serif;padding:5px 10px;border-radius:999px;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;cursor:pointer}" +
    ".gl-fehler{color:#b91c1c;font-weight:700}" +
    ".gl-ergebnis{font:800 22px system-ui,sans-serif;color:#1565c0}";
  document.head.appendChild(css);

  // Zustand der Regler (bleibt beim Sprachwechsel erhalten)
  var Z = { ma: 5, mb: 3, mop: "-", vk: 2, va: 3, vb: 4, sBsp: null, kz: "x³y²", kn: "x²y" };
  var FARBE = { x: "gl-c0", y: "gl-c1", a: "gl-c2", b: "gl-c3", z: "gl-c4", m: "gl-c2", n: "gl-c3" };
  function vfarbe(v){ return FARBE[v] || "gl-c4"; }

  // ---------- Karte 1: Minus = Gegenzahl dazu ----------
  function minusHtml(){
    return '<div class="gl-karte" id="glMinus"><h2>' + esc(t("m_t")) + '</h2><p class="gl-p">' + tx("m_txt") + "</p>" +
      '<div class="gl-regler"><label>a <input type="range" min="-8" max="8" step="1" id="glMa"> <b id="glMaW"></b></label>' +
      '<span class="gl-wahl" id="glMop"><button type="button" data-op="+">+</button><button type="button" data-op="-">−</button></span>' +
      '<label>b <input type="range" min="-8" max="8" step="1" id="glMb"> <b id="glMbW"></b></label></div>' +
      '<p class="gl-f" id="glMf"></p><p class="gl-geld" id="glMg"></p><div class="gl-muenzen" id="glMm"></div><p class="gl-p" id="glMr"></p>' +
      '<p class="gl-merk">' + tx("m_merk") + "</p></div>";
  }
  function minusRechnen(box){
    var a = Z.ma, b = Z.mb, minus = Z.mop === "-", d = minus ? -b : b, r = a + d;
    box.querySelector("#glMaW").textContent = zz(a); box.querySelector("#glMbW").textContent = zz(b);
    box.querySelectorAll("#glMop button").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.op === Z.mop ? "true" : "false"); });
    var f = zz(a) + (minus ? " − " : " + ") + kl(b);
    if(minus) f += " = " + zz(a) + " + " + kl(d);
    f += " = " + zz(r);
    box.querySelector("#glMf").innerHTML = bdi(f);
    function g(n){ return '<span class="' + (n > 0 ? "p" : n < 0 ? "n" : "") + '">' + esc(geld(n)) + "</span>"; }
    var gt = g(a) + " " + (minus ? "−" : "+") + " " + g(b);
    if(minus) gt += "<br>= " + g(a) + " + " + g(d);
    gt += "<br>= " + g(r);
    box.querySelector("#glMg").innerHTML = gt;
    // Münzen: Startbestand | was dazukommt (bei Minus die Gegenzahl); Paare + / − werden gestrichen
    var L = [], R = [], i;
    for(i = 0; i < Math.abs(a); i++) L.push(a > 0 ? 1 : -1);
    for(i = 0; i < Math.abs(d); i++) R.push(d > 0 ? 1 : -1);
    var alle = L.concat(R), pos = [], neg = [];
    alle.forEach(function(m, k){ (m > 0 ? pos : neg).push(k); });
    var weg = {}, paare = Math.min(pos.length, neg.length);
    for(i = 0; i < paare; i++){ weg[pos[i]] = 1; weg[neg[i]] = 1; }
    function m(v, k){ return '<span class="gl-m ' + (v > 0 ? "p" : "n") + (weg[k] ? " weg" : "") + '">' + (v > 0 ? "+1" : "−1") + "</span>"; }
    box.querySelector("#glMm").innerHTML = L.map(function(v, k){ return m(v, k); }).join("") + (R.length ? '<span class="gl-trenn">+</span>' + R.map(function(v, k){ return m(v, L.length + k); }).join("") : "");
    box.querySelector("#glMr").innerHTML = esc(t("m_rest", { r: geld(r) })) + " " + bdi("(" + zz(r) + ")");
  }
  function minusBinden(box){
    var A = box.querySelector("#glMa"), B = box.querySelector("#glMb");
    A.value = Z.ma; B.value = Z.mb;
    A.addEventListener("input", function(){ Z.ma = +A.value; minusRechnen(box); });
    B.addEventListener("input", function(){ Z.mb = +B.value; minusRechnen(box); });
    box.querySelectorAll("#glMop button").forEach(function(x){ x.addEventListener("click", function(){ Z.mop = x.dataset.op; minusRechnen(box); }); });
    minusRechnen(box);
  }

  // ---------- Karte 2: k · (a + b) = k · a + k · b ----------
  function verteilenHtml(){
    return '<div class="gl-karte" id="glVert"><h2>' + esc(t("v_t")) + "</h2>" +
      '<div class="gl-regler"><label><span class="gl-k">k</span> <input type="range" min="1" max="5" step="1" id="glVk"> <b id="glVkW"></b></label>' +
      '<label><span class="gl-a">a</span> <input type="range" min="1" max="6" step="1" id="glVa"> <b id="glVaW"></b></label>' +
      '<label><span class="gl-b">b</span> <input type="range" min="1" max="6" step="1" id="glVb"> <b id="glVbW"></b></label></div>' +
      '<div class="gl-zwei"><div class="gl-punkte" id="glVp"></div><div><p class="gl-p" id="glVt"></p><p class="gl-f" id="glVf"></p></div></div>' +
      '<p class="gl-merk">' + tx("v_merk") + "<br>" + bdi("2 · (3 − 4) = 2 · 3 + 2 · (−4) = 6 − 8 = −2") + "<br>" + bdi("3 · (a + 4) = 3 · a + 3 · 4 = 3a + 12") + "<br>" + bdi("−(x − 3) = (−1) · x + (−1) · (−3) = −x + 3") + "</p></div>";
  }
  function verteilenRechnen(box){
    var k = Z.vk, a = Z.va, b = Z.vb;
    box.querySelector("#glVkW").textContent = k; box.querySelector("#glVaW").textContent = a; box.querySelector("#glVbW").textContent = b;
    var h = "";
    for(var r = 0; r < k; r++){ h += '<div class="gl-reihe">'; for(var i = 0; i < a; i++) h += '<span class="gl-pk a"></span>'; h += '<span class="gl-lucke"></span>'; for(i = 0; i < b; i++) h += '<span class="gl-pk b"></span>'; h += "</div>"; }
    box.querySelector("#glVp").innerHTML = h;
    box.querySelector("#glVt").textContent = t("v_txt", { k: k, a: a, b: b });
    var K = '<span class="gl-k">' + k + "</span>", A = '<span class="gl-a">' + a + "</span>", B = '<span class="gl-b">' + b + "</span>";
    box.querySelector("#glVf").innerHTML = esc(t("v_w1")) + "<br>" + bdi(K + " · (" + A + " + " + B + ") = " + K + " · " + (a + b) + " = " + k * (a + b)) +
      "<br>" + esc(t("v_w2")) + "<br>" + bdi(K + " · (" + A + " + " + B + ") = " + K + " · " + A + " + " + K + " · " + B + " = " + k * a + " + " + k * b + " = " + k * (a + b));
  }
  function verteilenBinden(box){
    [["glVk", "vk"], ["glVa", "va"], ["glVb", "vb"]].forEach(function(p){ var e = box.querySelector("#" + p[0]); e.value = Z[p[1]]; e.addEventListener("input", function(){ Z[p[1]] = +e.value; verteilenRechnen(box); }); });
    verteilenRechnen(box);
  }

  // ---------- Karte 3: Sorten farbig markieren und zusammenfassen ----------
  // Glied: {c: Zahl, v: Sorte ("" = reine Zahl, "x", "y", "x²" …)}
  function sortenNeu(){
    var V = [["a", "b"], ["x", "y"], ["x", "x²"]][zuf(0, 2)], S = [V[0], V[1], ""], L = [];
    S.forEach(function(s){ var n = zuf(1, 2); for(var i = 0; i < n; i++){ var c; do { c = zuf(-7, 7); } while(!c); L.push({ c: c, v: s }); } });
    for(var i = L.length - 1; i > 0; i--){ var j = zuf(0, i), x = L[i]; L[i] = L[j]; L[j] = x; }
    Z.sBsp = L;
  }
  function gtxt(g, erst){ var a = Math.abs(g.c), kern = g.v ? (a === 1 ? "" : a) + g.v : String(a); return erst ? (g.c < 0 ? "−" : "") + kern : (g.c < 0 ? " − " : " + ") + kern; }
  function sortenHtml(){
    return '<div class="gl-karte" id="glSort"><h2>' + esc(t("s_t")) + '</h2><p class="gl-p">' + tx("s_txt") + "</p>" +
      '<p class="gl-f" id="glSa"></p><p class="gl-p">' + esc(t("s_sort")) + '</p><p class="gl-f" id="glSb"></p><p class="gl-p">' + esc(t("s_zus")) + '</p><p class="gl-f" id="glSc"></p>' +
      '<p><button type="button" class="gl-knopf" id="glSneu">' + esc(t("neu")) + '</button></p><p class="gl-merk">' + tx("s_merk") + "</p></div>";
  }
  function sortenRechnen(box){
    if(!Z.sBsp) sortenNeu();
    var L = Z.sBsp, sorten = [], farbe = {};
    L.forEach(function(g){ if(!(g.v in farbe)){ farbe[g.v] = g.v === "" ? "gl-ck" : "gl-c" + sorten.length; sorten.push(g.v); } });
    sorten.sort(function(p, q){ return (p === "") - (q === "") || (q.length - p.length) || (p < q ? -1 : 1); });
    function chip(g, erst){ return '<span class="gl-chip ' + farbe[g.v] + '">' + gtxt(g, erst).trim() + "</span>"; }
    box.querySelector("#glSa").innerHTML = bdi(L.map(function(g, i){ return chip(g, i === 0); }).join(" "));
    var gr = sorten.map(function(s){ return L.filter(function(g){ return g.v === s; }); });
    box.querySelector("#glSb").innerHTML = bdi(gr.map(function(G, i){ var inner = G.map(function(g, j){ return gtxt(g, j === 0); }).join(""); return (i ? " + " : "") + '<span class="gl-chip ' + farbe[G[0].v] + '">' + (G.length > 1 ? "(" + inner + ")" : inner) + "</span>"; }).join(""));
    var erg = gr.map(function(G){ return { v: G[0].v, c: G.reduce(function(s, g){ return s + g.c; }, 0) }; }).filter(function(g){ return g.c !== 0; });
    box.querySelector("#glSc").innerHTML = bdi(erg.length ? erg.map(function(g, i){ return '<span class="gl-chip ' + farbe[g.v] + '">' + gtxt(g, i === 0).trim() + "</span>"; }).join(" ") : "0");
  }
  function sortenBinden(box){ box.querySelector("#glSneu").addEventListener("click", function(){ sortenNeu(); sortenRechnen(box); }); sortenRechnen(box); }

  // ---------- Karte 4: Potenzen ausschreiben ----------
  function ch(v){ return '<span class="gl-chip ' + vfarbe(v) + '">' + v + "</span>"; }
  function aus(v, n){ var L = []; for(var i = 0; i < n; i++) L.push(ch(v)); return L.join(" · "); }
  function potenzHtml(){
    var Z1 = [
      "x³ = " + aus("x", 3),
      "y² = " + aus("y", 2),
      "x³ · y² = " + aus("x", 3) + " · " + aus("y", 2),
      "x² · x³ = (" + aus("x", 2) + ") · (" + aus("x", 3) + ") = x⁵",
      "(2a)² = 2a · 2a = 2 · 2 · " + aus("a", 2) + " = 4a²"
    ];
    return '<div class="gl-karte" id="glPot"><h2>' + esc(t("p_t")) + "</h2>" + Z1.map(function(z){ return '<p class="gl-f">' + bdi(z) + "</p>"; }).join("") +
      '<p class="gl-merk">' + tx("p_merk") + "</p></div>";
  }

  // ---------- Karte 5: Kürzen sichtbar ----------
  function monom(s){ // "6x³y²" → {c: 6, v: {x: 3, y: 2}}
    s = String(s).replace(/\s+/g, "").replace(/[·*⋅]/g, "").replace(/[−–]/g, "-").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, function(m){ return "^" + m.split("").map(function(c){ return HOCH.indexOf(c); }).join(""); }).toLowerCase();
    var m = /^(-?\d*)((?:[a-z](?:\^?\d+)?)*)$/.exec(s); if(!m || !s) return null;
    var c = m[1] === "" ? 1 : m[1] === "-" ? -1 : parseInt(m[1], 10); if(!c) return null;
    var v = {}, re = /([a-z])(?:\^?(\d+))?/g, x;
    while((x = re.exec(m[2]))){ var e = x[2] == null ? 1 : +x[2]; if(e > 8) return null; v[x[1]] = (v[x[1]] || 0) + e; }
    return { c: c, v: v };
  }
  function mtxt(M){
    var V = Object.keys(M.v).filter(function(k){ return M.v[k]; }).sort(), a = Math.abs(M.c);
    var kern = (a === 1 && V.length ? "" : String(a)) + V.map(function(k){ return k + (M.v[k] > 1 ? hoch(M.v[k]) : ""); }).join("");
    return (M.c < 0 ? "−" : "") + kern;
  }
  function kuerzenHtml(){
    return '<div class="gl-karte" id="glKuerz"><h2>' + esc(t("k_t")) + '</h2><p class="gl-p">' + tx("k_txt") + "</p>" +
      '<div class="gl-kz"><label>' + esc(t("k_z")) + ' <input id="glKz" autocomplete="off" autocapitalize="off" spellcheck="false"></label><label>' + esc(t("k_n")) + ' <input id="glKn" autocomplete="off" autocapitalize="off" spellcheck="false"></label>' +
      '<button type="button" class="gl-knopf" id="glKnochmal">' + esc(t("k_nochmal")) + "</button></div>" +
      '<div class="gl-bsp" id="glKbsp"></div><p class="gl-fehler" id="glKf"></p><div id="glKa"></div></div>';
  }
  function kuerzenRechnen(box){
    var Zm = monom(Z.kz), Nm = monom(Z.kn), out = box.querySelector("#glKa"), fe = box.querySelector("#glKf");
    if(!Zm || !Nm){ fe.textContent = t("k_err"); out.innerHTML = ""; return; }
    fe.textContent = "";
    var V = Object.keys(Zm.v).concat(Object.keys(Nm.v)).filter(function(v, i, A){ return A.indexOf(v) === i; }).sort();
    var g = ggt(Zm.c, Nm.c), zr = Zm.c / g, nr = Nm.c / g; if(nr < 0){ zr = -zr; nr = -nr; }
    var d = 0, step = 0.45;
    function reihe(M, andere, neu){
      var teile = [], hatV = V.some(function(v){ return M.v[v]; });
      // Zahl: wird durch den ggT geteilt → alte Zahl durchgestrichen, gekürzte daneben
      if(g > 1){ var k = '<span class="gl-fk gl-ck weg" style="--d:0s">' + zz(M.c) + "</span>"; if(Math.abs(neu) !== 1 || !hatV) k += '<span class="gl-fk gl-ck">' + zz(neu) + "</span>"; teile.push(k); }
      else if(Math.abs(M.c) !== 1 || !hatV) teile.push('<span class="gl-fk gl-ck">' + zz(M.c) + "</span>");
      V.forEach(function(v){
        var n = M.v[v] || 0, w = Math.min(n, andere.v[v] || 0);
        for(var i = 0; i < n; i++) teile.push('<span class="gl-fk ' + vfarbe(v) + (i < w ? ' weg" style="--d:' + ((i + V.indexOf(v) * 3 + (g > 1 ? 1 : 0)) * step).toFixed(2) + 's"' : '"') + ">" + v + "</span>");
      });
      return teile.join("<span>·</span>");
    }
    var R = { c: zr, v: {} }, Rn = { c: nr, v: {} };
    V.forEach(function(v){ var e = (Zm.v[v] || 0) - (Nm.v[v] || 0); if(e > 0) R.v[v] = e; else if(e < 0) Rn.v[v] = -e; });
    var nennerEins = nr === 1 && !Object.keys(Rn.v).length;
    var erg = nennerEins ? mtxt(R) : '<span class="gl-bruch"><span>' + mtxt(R) + "</span><span>" + mtxt(Rn) + "</span></span>";
    var h = '<p class="gl-f">' + bdi('<span class="gl-bruch"><span>' + mtxt(Zm) + "</span><span>" + mtxt(Nm) + "</span></span>") + "</p>";
    h += '<p class="gl-p">' + esc(t("k_aus")) + "</p>";
    h += '<p class="gl-f">' + bdi("= " + '<span class="gl-bruch"><span>' + reihe(Zm, Nm, Zm.c / g) + "</span><span>" + reihe(Nm, Zm, Nm.c / g) + "</span></span> = " + '<span class="gl-ergebnis">' + erg + "</span>") + "</p>";
    if(g > 1) h += '<p class="gl-p">' + esc(t("k_zahl", { a: zz(Zm.c), b: zz(Nm.c), g: g })) + " " + bdi(zz(Zm.c) + " : " + g + " = " + zz(Zm.c / g) + ", " + zz(Nm.c) + " : " + g + " = " + zz(Nm.c / g)) + "</p>";
    out.innerHTML = h;
  }
  function kuerzenBinden(box){
    var A = box.querySelector("#glKz"), B = box.querySelector("#glKn");
    A.value = Z.kz; B.value = Z.kn;
    A.addEventListener("input", function(){ Z.kz = A.value; kuerzenRechnen(box); });
    B.addEventListener("input", function(){ Z.kn = B.value; kuerzenRechnen(box); });
    box.querySelector("#glKnochmal").addEventListener("click", function(){ kuerzenRechnen(box); });
    var bsp = box.querySelector("#glKbsp");
    [["x³y²", "x²y"], ["6a²b", "3ab"], ["12x⁴", "4x"], ["a²b³", "ab⁵"], ["15x²y", "10xy³"]].forEach(function(p){
      var k = document.createElement("button"); k.type = "button"; k.innerHTML = p[0] + " / " + p[1];
      k.addEventListener("click", function(){ Z.kz = A.value = p[0]; Z.kn = B.value = p[1]; kuerzenRechnen(box); });
      bsp.appendChild(k);
    });
    kuerzenRechnen(box);
  }

  var KARTEN = {
    minus: [minusHtml, minusBinden], verteilen: [verteilenHtml, verteilenBinden], sorten: [sortenHtml, sortenBinden],
    potenz: [potenzHtml, null], kuerzen: [kuerzenHtml, kuerzenBinden]
  };
  function karten(box, liste, l){
    if(l && T[l]) lang = l;
    if(!box) return;
    box.innerHTML = (liste.length > 2 ? '<p class="gl-p" style="color:#4f5b6e">' + esc(t("intro")) + "</p>" : "") + liste.map(function(k){ return KARTEN[k][0](); }).join("");
    liste.forEach(function(k){ if(KARTEN[k][1]) KARTEN[k][1](box); });
  }
  return { karten: karten, t: function(k, l){ var a = lang; if(l && T[l]) lang = l; var s = t(k); lang = a; return s; } };
})();
