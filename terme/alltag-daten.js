// Alltagsbeispiele für /terme/, 9 Sprachen. „Ausprobieren“: MS_TERM_LADEN({tab, term}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { tab: "einfach", term: "3a + 2b + 2a + b" },
  { tab: "einfach", term: "2x + 2(x + 3)" },
  { tab: "mult", term: "4(2x + 3y)" },
  { tab: "mult", term: "(x + 2)(x + 7)" },
  { tab: "klammer", term: "12a + 18b" },
  { tab: "mult", term: "7(100 − 2)" }
],
laden: function(w){ window.MS_TERM_LADEN(w); },
daten: {
de: [
  ["Einkauf", "Ein Heft kostet a €, ein Stift b €. Du kaufst 3 Hefte und 2 Stifte, später noch 2 Hefte und 1 Stift. Was kostet alles zusammen?", "$3a + 2b + 2a + b = 5a + 3b$\nGleichartige Terme zusammenfassen: Hefte zu Heften, Stifte zu Stiften. Kostet ein Heft 2 € und ein Stift 1 €: $5 · 2 + 3 · 1 = 13 €$."],
  ["Zaun ums Beet", "Ein rechteckiges Beet ist x m breit und 3 m länger als breit. Wie viel Zaun braucht man?", "Umfang $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nBei $x = 4$: $4 · 4 + 6 = 22 m$ Zaun."],
  ["Kinokarten", "Eine Karte für Erwachsene kostet x €, für Kinder y €. Vier Familien mit je 2 Erwachsenen und 3 Kindern gehen ins Kino. Was zahlen sie insgesamt?", "$4 · (2x + 3y) = 8x + 12y$\nAusmultiplizieren: Jeder Summand in der Klammer wird mit 4 multipliziert – 8 Erwachsene und 12 Kinder."],
  ["Garten vergrößern", "Ein Garten ist x m breit und (x + 5) m lang. Er wird in beide Richtungen um 2 m größer. Wie groß ist die neue Fläche?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nJeder mit jedem: 4 Teilrechtecke. Bei $x = 10$: $100 + 90 + 14 = 204 m²$."],
  ["Obsttüten packen", "Du hast 12 Äpfel und 18 Birnen und packst möglichst viele gleiche Tüten. Wie viele Tüten, was ist in jeder?", "Ausklammern mit dem ggT 6: $12a + 18b = 6(2a + 3b)$\n6 Tüten mit je 2 Äpfeln und 3 Birnen."],
  ["Kopfrechen-Trick", "Wie rechnet man 7 · 98 schnell im Kopf?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nDas ist Ausmultiplizieren (Distributivgesetz) mit Zahlen."]
],
en: [
  ["Shopping", "An exercise book costs £a, a pen £b. You buy 3 books and 2 pens, later 2 more books and 1 pen. What does it all cost?", "$3a + 2b + 2a + b = 5a + 3b$\nCollect like terms: books with books, pens with pens. If a book costs £2 and a pen £1: $5 · 2 + 3 · 1 = £13$."],
  ["Fence round a bed", "A rectangular flower bed is x m wide and 3 m longer than it is wide. How much fencing do you need?", "Perimeter $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nFor $x = 4$: $4 · 4 + 6 = 22 m$ of fencing."],
  ["Cinema tickets", "An adult ticket costs £x, a child ticket £y. Four families, each with 2 adults and 3 children, go to the cinema. What do they pay altogether?", "$4 · (2x + 3y) = 8x + 12y$\nExpanding: every term in the bracket is multiplied by 4 – 8 adults and 12 children."],
  ["Bigger garden", "A garden is x m wide and (x + 5) m long. It is made 2 m bigger in both directions. What is the new area?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nEach with each: 4 small rectangles. For $x = 10$: $100 + 90 + 14 = 204 m²$."],
  ["Packing fruit bags", "You have 12 apples and 18 pears and pack as many identical bags as possible. How many bags, and what is in each?", "Factorise with the HCF 6: $12a + 18b = 6(2a + 3b)$\n6 bags, each with 2 apples and 3 pears."],
  ["Mental maths trick", "How can you work out 7 · 98 quickly in your head?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nThat is expanding brackets (distributive law) with numbers."]
],
es: [
  ["Compras", "Un cuaderno cuesta a € y un bolígrafo b €. Compras 3 cuadernos y 2 bolígrafos, y luego 2 cuadernos y 1 bolígrafo más. ¿Cuánto cuesta todo?", "$3a + 2b + 2a + b = 5a + 3b$\nSe agrupan términos semejantes: cuadernos con cuadernos, bolígrafos con bolígrafos. Si un cuaderno cuesta 2 € y un bolígrafo 1 €: $5 · 2 + 3 · 1 = 13 €$."],
  ["Valla del bancal", "Un bancal rectangular mide x m de ancho y es 3 m más largo que ancho. ¿Cuánta valla hace falta?", "Perímetro $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nCon $x = 4$: $4 · 4 + 6 = 22 m$ de valla."],
  ["Entradas de cine", "Una entrada de adulto cuesta x € y una de niño y €. Cuatro familias con 2 adultos y 3 niños cada una van al cine. ¿Cuánto pagan en total?", "$4 · (2x + 3y) = 8x + 12y$\nAl multiplicar, cada sumando del paréntesis se multiplica por 4: 8 adultos y 12 niños."],
  ["Ampliar el jardín", "Un jardín mide x m de ancho y (x + 5) m de largo. Se amplía 2 m en cada dirección. ¿Qué superficie tiene ahora?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nTodos con todos: 4 rectángulos. Con $x = 10$: $100 + 90 + 14 = 204 m²$."],
  ["Bolsas de fruta", "Tienes 12 manzanas y 18 peras y haces el mayor número posible de bolsas iguales. ¿Cuántas bolsas y qué lleva cada una?", "Sacar factor común con el mcd 6: $12a + 18b = 6(2a + 3b)$\n6 bolsas con 2 manzanas y 3 peras cada una."],
  ["Truco de cálculo mental", "¿Cómo se calcula rápido 7 · 98 de cabeza?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nEs la propiedad distributiva con números."]
],
zh: [
  ["买东西", "一个本子 a 元，一支笔 b 元。你买了 3 个本子和 2 支笔，后来又买了 2 个本子和 1 支笔。一共多少钱？", "$3a + 2b + 2a + b = 5a + 3b$\n合并同类项：本子和本子合并，笔和笔合并。如果本子 2 元、笔 1 元：$5 · 2 + 3 · 1 = 13$ 元。"],
  ["花坛的篱笆", "一个长方形花坛宽 x m，长比宽多 3 m。需要多长的篱笆？", "周长 $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\n当 $x = 4$ 时：$4 · 4 + 6 = 22 m$。"],
  ["电影票", "成人票 x 元，儿童票 y 元。四个家庭，每家 2 个大人 3 个孩子去看电影。一共付多少钱？", "$4 · (2x + 3y) = 8x + 12y$\n去括号：括号里每一项都乘 4——8 个大人和 12 个孩子。"],
  ["扩大花园", "花园宽 x m，长 (x + 5) m。两个方向各加宽 2 m。新的面积是多少？", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\n每项乘每项：4 个小长方形。当 $x = 10$ 时：$100 + 90 + 14 = 204 m²$。"],
  ["装水果袋", "你有 12 个苹果和 18 个梨，要装成尽可能多的相同的袋子。能装几袋？每袋装什么？", "提取公因式（最大公因数 6）：$12a + 18b = 6(2a + 3b)$\n6 袋，每袋 2 个苹果和 3 个梨。"],
  ["口算技巧", "怎样快速口算 7 · 98？", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\n这就是用数字做的乘法分配律。"]
],
fr: [
  ["Courses", "Un cahier coûte a €, un stylo b €. Tu achètes 3 cahiers et 2 stylos, puis encore 2 cahiers et 1 stylo. Combien coûte le tout ?", "$3a + 2b + 2a + b = 5a + 3b$\nOn regroupe les termes semblables : cahiers avec cahiers, stylos avec stylos. Si un cahier coûte 2 € et un stylo 1 € : $5 · 2 + 3 · 1 = 13 €$."],
  ["Clôture d’un massif", "Un massif rectangulaire fait x m de large et 3 m de plus en longueur. Combien de clôture faut-il ?", "Périmètre $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nPour $x = 4$ : $4 · 4 + 6 = 22 m$ de clôture."],
  ["Places de cinéma", "Une place adulte coûte x €, une place enfant y €. Quatre familles de 2 adultes et 3 enfants vont au cinéma. Combien paient-elles en tout ?", "$4 · (2x + 3y) = 8x + 12y$\nEn développant, chaque terme de la parenthèse est multiplié par 4 : 8 adultes et 12 enfants."],
  ["Agrandir le jardin", "Un jardin mesure x m de large et (x + 5) m de long. On l’agrandit de 2 m dans les deux sens. Quelle est la nouvelle aire ?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nChacun avec chacun : 4 petits rectangles. Pour $x = 10$ : $100 + 90 + 14 = 204 m²$."],
  ["Sacs de fruits", "Tu as 12 pommes et 18 poires et tu fais le plus possible de sacs identiques. Combien de sacs, et que contient chacun ?", "Factoriser par le PGCD 6 : $12a + 18b = 6(2a + 3b)$\n6 sacs de 2 pommes et 3 poires."],
  ["Astuce de calcul mental", "Comment calculer vite 7 · 98 de tête ?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nC’est le développement (distributivité) avec des nombres."]
],
ru: [
  ["Покупки", "Тетрадь стоит a €, ручка – b €. Ты купил 3 тетради и 2 ручки, а потом ещё 2 тетради и 1 ручку. Сколько стоит всё вместе?", "$3a + 2b + 2a + b = 5a + 3b$\nПриводим подобные слагаемые: тетради к тетрадям, ручки к ручкам. Если тетрадь стоит 2 €, а ручка 1 €: $5 · 2 + 3 · 1 = 13 €$."],
  ["Забор вокруг грядки", "Прямоугольная грядка шириной x м и на 3 м длиннее, чем шире. Сколько нужно забора?", "Периметр $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nПри $x = 4$: $4 · 4 + 6 = 22 м$ забора."],
  ["Билеты в кино", "Взрослый билет стоит x €, детский – y €. Четыре семьи, в каждой 2 взрослых и 3 ребёнка, идут в кино. Сколько они платят вместе?", "$4 · (2x + 3y) = 8x + 12y$\nРаскрываем скобки: каждое слагаемое умножаем на 4 – 8 взрослых и 12 детей."],
  ["Увеличиваем сад", "Сад шириной x м и длиной (x + 5) м. Его увеличивают на 2 м в обе стороны. Какова новая площадь?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nКаждое на каждое: 4 прямоугольника. При $x = 10$: $100 + 90 + 14 = 204 м²$."],
  ["Пакеты с фруктами", "У тебя 12 яблок и 18 груш, ты раскладываешь их в как можно больше одинаковых пакетов. Сколько пакетов и что в каждом?", "Выносим общий множитель (НОД 6): $12a + 18b = 6(2a + 3b)$\n6 пакетов, в каждом 2 яблока и 3 груши."],
  ["Приём устного счёта", "Как быстро посчитать 7 · 98 в уме?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nЭто раскрытие скобок (распределительный закон) с числами."]
],
ar: [
  ["التسوق", "ثمن الدفتر a € وثمن القلم b €. تشتري 3 دفاتر وقلمين، ثم دفترين وقلمًا آخر. كم ثمن الكل؟", "$3a + 2b + 2a + b = 5a + 3b$\nنجمع الحدود المتشابهة: الدفاتر مع الدفاتر والأقلام مع الأقلام. إذا كان الدفتر بـ 2 € والقلم بـ 1 €: $5 · 2 + 3 · 1 = 13 €$."],
  ["سياج حول حوض", "حوض مستطيل عرضه x m وطوله أكبر من عرضه بـ 3 m. كم نحتاج من السياج؟", "المحيط $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nعندما $x = 4$: $4 · 4 + 6 = 22 m$."],
  ["تذاكر السينما", "تذكرة الكبار بـ x € وتذكرة الأطفال بـ y €. أربع عائلات في كل منها كبيران و3 أطفال تذهب إلى السينما. كم تدفع كلها؟", "$4 · (2x + 3y) = 8x + 12y$\nفك الأقواس: كل حد داخل القوس يُضرب في 4 – 8 كبار و12 طفلًا."],
  ["توسيع الحديقة", "حديقة عرضها x m وطولها (x + 5) m. توسَّع 2 m في الاتجاهين. ما المساحة الجديدة؟", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nكل حد في كل حد: 4 مستطيلات. عندما $x = 10$: $100 + 90 + 14 = 204 m²$."],
  ["أكياس الفاكهة", "لديك 12 تفاحة و18 إجاصة وتريد أكبر عدد ممكن من الأكياس المتماثلة. كم كيسًا، وماذا في كل كيس؟", "إخراج العامل المشترك (القاسم المشترك الأكبر 6): $12a + 18b = 6(2a + 3b)$\n6 أكياس في كل منها تفاحتان و3 إجاصات."],
  ["حيلة للحساب الذهني", "كيف تحسب 7 · 98 بسرعة في ذهنك؟", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nهذا هو قانون التوزيع مع الأعداد."]
],
ja: [
  ["買い物", "ノート 1 冊 a 円、ペン 1 本 b 円。ノート 3 冊とペン 2 本を買い、あとでノート 2 冊とペン 1 本を買った。全部でいくら？", "$3a + 2b + 2a + b = 5a + 3b$\n同類項をまとめる：ノートはノート、ペンはペン。ノート 200 円、ペン 100 円なら $5 · 200 + 3 · 100 = 1300$ 円。"],
  ["花だんのさく", "長方形の花だんの横は x m、縦は横より 3 m 長い。さくは何 m 必要？", "まわりの長さ $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\n$x = 4$ なら $4 · 4 + 6 = 22 m$。"],
  ["映画のチケット", "大人 x 円、子ども y 円。大人 2 人と子ども 3 人の家族が 4 組映画を見に行く。全部でいくら？", "$4 · (2x + 3y) = 8x + 12y$\nかっこをはずす：かっこの中の各項に 4 をかける――大人 8 人と子ども 12 人。"],
  ["庭を広げる", "横 x m、縦 (x + 5) m の庭を、縦横それぞれ 2 m 広げる。新しい面積は？", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\n全部の組み合わせ：4 つの長方形。$x = 10$ なら $100 + 90 + 14 = 204 m²$。"],
  ["くだものの袋づめ", "りんご 12 個となし 18 個を、同じ中身の袋にできるだけ多く分ける。何袋できて、1 袋に何が入る？", "最大公約数 6 でくくる：$12a + 18b = 6(2a + 3b)$\n6 袋、それぞれりんご 2 個となし 3 個。"],
  ["暗算のコツ", "7 · 98 を暗算ですばやく計算するには？", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\n数でつかう分配法則。"]
],
pt: [
  ["Compras", "Um caderno custa a € e uma caneta b €. Compras 3 cadernos e 2 canetas, e depois mais 2 cadernos e 1 caneta. Quanto custa tudo?", "$3a + 2b + 2a + b = 5a + 3b$\nJuntam-se termos semelhantes: cadernos com cadernos, canetas com canetas. Se um caderno custa 2 € e uma caneta 1 €: $5 · 2 + 3 · 1 = 13 €$."],
  ["Cerca do canteiro", "Um canteiro retangular tem x m de largura e é 3 m mais comprido do que largo. Quanta cerca é precisa?", "Perímetro $= 2 · x + 2 · (x + 3) = 2x + 2x + 6 = 4x + 6$\nPara $x = 4$: $4 · 4 + 6 = 22 m$ de cerca."],
  ["Bilhetes de cinema", "Um bilhete de adulto custa x € e um de criança y €. Quatro famílias, cada uma com 2 adultos e 3 crianças, vão ao cinema. Quanto pagam ao todo?", "$4 · (2x + 3y) = 8x + 12y$\nAo desembaraçar parênteses, cada parcela é multiplicada por 4: 8 adultos e 12 crianças."],
  ["Aumentar o jardim", "Um jardim tem x m de largura e (x + 5) m de comprimento. É aumentado 2 m em cada direção. Qual é a nova área?", "$(x + 2)(x + 7) = x² + 7x + 2x + 14 = x² + 9x + 14$\nTodos com todos: 4 retângulos. Para $x = 10$: $100 + 90 + 14 = 204 m²$."],
  ["Sacos de fruta", "Tens 12 maçãs e 18 peras e fazes o maior número possível de sacos iguais. Quantos sacos, e o que leva cada um?", "Pôr em evidência com o mdc 6: $12a + 18b = 6(2a + 3b)$\n6 sacos, cada um com 2 maçãs e 3 peras."],
  ["Truque de cálculo mental", "Como se calcula depressa 7 · 98 de cabeça?", "$7 · 98 = 7(100 − 2) = 700 − 14 = 686$\nÉ a propriedade distributiva com números."]
]
}});
