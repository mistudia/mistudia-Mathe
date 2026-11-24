// Alltagsbeispiele für /rechengesetze/, 9 Sprachen. Baustein: /alltag.js (🆕 24.11.2026)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Kürbisse im Hofladen", "Ein Hofladen verkauft an drei Tagen 17, 25 und 3 Kürbisse. Wie viele sind es zusammen? Rechne geschickt.", "Vertauschen (Kommutativgesetz): erst 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ Kürbisse"],
  ["Plätze im Kino", "Ein Kinosaal hat 6 Reihen. Jede Reihe hat 12 Plätze in der Mitte und 3 Plätze am Rand. Wie viele Plätze sind es?", "Klammer oder ausmultiplizieren (Distributivgesetz):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\noder $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ Plätze"],
  ["Bücher geschenkt", "Du hast schon 3 Bücher. Zum Geburtstag bekommst du 4 Pakete mit je 2 Büchern. Wie viele Bücher hast du jetzt?", "Punkt vor Strich: erst 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ Bücher\nFalsch wäre $(3 + 4) · 2 = 14$."],
  ["Flaschen im Lager", "In einem Lager stehen 25 Paletten. Auf jeder stehen 4 Kisten mit je 7 Flaschen. Wie viele Flaschen sind es?", "Geschickt zusammenfassen (Assoziativgesetz): erst 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ Flaschen"]
],
en: [
  ["Pumpkins at the farm shop", "A farm shop sells 17, 25 and 3 pumpkins on three days. How many is that altogether? Calculate cleverly.", "Swap the order (commutative law): first 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ pumpkins"],
  ["Cinema seats", "A cinema has 6 rows. Each row has 12 seats in the middle and 3 at the side. How many seats are there?", "Bracket or multiply out (distributive law):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nor $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ seats"],
  ["Books as presents", "You already have 3 books. For your birthday you get 4 parcels with 2 books each. How many books do you have now?", "Multiplication before addition: first 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ books\nWrong would be $(3 + 4) · 2 = 14$."],
  ["Bottles in the warehouse", "A warehouse has 25 pallets. On each there are 4 crates with 7 bottles each. How many bottles are there?", "Group cleverly (associative law): first 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ bottles"]
],
es: [
  ["Calabazas en la granja", "Una tienda de granja vende 17, 25 y 3 calabazas en tres días. ¿Cuántas son en total? Calcula de forma hábil.", "Cambiar el orden (propiedad conmutativa): primero 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ calabazas"],
  ["Butacas del cine", "Una sala de cine tiene 6 filas. Cada fila tiene 12 butacas en el centro y 3 en el lateral. ¿Cuántas butacas hay?", "Paréntesis o desarrollar (propiedad distributiva):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\no $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ butacas"],
  ["Libros de regalo", "Ya tienes 3 libros. Por tu cumpleaños recibes 4 paquetes con 2 libros cada uno. ¿Cuántos libros tienes ahora?", "Primero la multiplicación: 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ libros\nSería incorrecto $(3 + 4) · 2 = 14$."],
  ["Botellas en el almacén", "En un almacén hay 25 palés. En cada uno hay 4 cajas con 7 botellas cada una. ¿Cuántas botellas hay?", "Agrupar con habilidad (propiedad asociativa): primero 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ botellas"]
],
zh: [
  ["农场小店的南瓜", "农场小店三天分别卖出 17、25 和 3 个南瓜。一共卖了多少个？请巧妙地计算。", "交换顺序（交换律）：先算 17 + 3。\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ 个南瓜"],
  ["电影院的座位", "电影院有 6 排。每排中间有 12 个座位，边上有 3 个座位。一共有多少个座位？", "用括号或展开（分配律）：\n$6 · (12 + 3) = 6 · 15$\n$= 90$\n或 $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ 个座位"],
  ["收到的书", "你已经有 3 本书。生日时你收到 4 包书，每包 2 本。现在你有多少本书？", "先乘除后加减：先算 4 · 2。\n$3 + 4 · 2 = 3 + 8$\n$= 11$ 本书\n错误的算法是 $(3 + 4) · 2 = 14$。"],
  ["仓库里的瓶子", "仓库里有 25 个托盘，每个托盘上有 4 箱，每箱 7 瓶。一共有多少瓶？", "巧妙结合（结合律）：先算 25 · 4。\n$25 · 4 · 7 = 100 · 7$\n$= 700$ 瓶"]
],
fr: [
  ["Citrouilles à la ferme", "Une boutique de ferme vend 17, 25 et 3 citrouilles en trois jours. Combien en tout ? Calcule astucieusement.", "Changer l’ordre (commutativité) : d’abord 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ citrouilles"],
  ["Places au cinéma", "Une salle de cinéma a 6 rangées. Chaque rangée a 12 places au milieu et 3 sur le côté. Combien de places y a-t-il ?", "Parenthèse ou développer (distributivité) :\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nou $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ places"],
  ["Livres en cadeau", "Tu as déjà 3 livres. Pour ton anniversaire, tu reçois 4 paquets de 2 livres. Combien de livres as-tu maintenant ?", "La multiplication avant l’addition : d’abord 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ livres\nFaux serait $(3 + 4) · 2 = 14$."],
  ["Bouteilles à l’entrepôt", "Un entrepôt contient 25 palettes. Sur chacune, il y a 4 caisses de 7 bouteilles. Combien de bouteilles y a-t-il ?", "Regrouper astucieusement (associativité) : d’abord 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ bouteilles"]
],
ru: [
  ["Тыквы на ферме", "Фермерский магазин за три дня продал 17, 25 и 3 тыквы. Сколько всего? Посчитай удобным способом.", "Переставить (переместительный закон): сначала 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ тыкв"],
  ["Места в кинотеатре", "В зале кинотеатра 6 рядов. В каждом ряду 12 мест в центре и 3 места сбоку. Сколько всего мест?", "Скобка или раскрыть скобки (распределительный закон):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nили $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ мест"],
  ["Книги в подарок", "У тебя уже есть 3 книги. На день рождения тебе дарят 4 пакета по 2 книги. Сколько книг у тебя теперь?", "Сначала умножение: 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ книг\nНеверно было бы $(3 + 4) · 2 = 14$."],
  ["Бутылки на складе", "На складе 25 поддонов. На каждом 4 ящика по 7 бутылок. Сколько всего бутылок?", "Удобно сгруппировать (сочетательный закон): сначала 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ бутылок"]
],
ar: [
  ["اليقطين في متجر المزرعة", "يبيع متجر مزرعة في ثلاثة أيام 17 و25 و3 يقطينات. كم المجموع؟ احسب بذكاء.", "نبدّل الترتيب (خاصية التبديل): أولًا 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ يقطينة"],
  ["مقاعد السينما", "في قاعة سينما 6 صفوف. في كل صف 12 مقعدًا في الوسط و3 مقاعد على الجانب. كم مقعدًا في القاعة؟", "قوس أو توزيع (خاصية التوزيع):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nأو $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ مقعدًا"],
  ["كتب هدية", "لديك 3 كتب. في عيد ميلادك تحصل على 4 طرود في كل منها كتابان. كم كتابًا لديك الآن؟", "الضرب قبل الجمع: أولًا 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ كتابًا\nالخطأ هو $(3 + 4) · 2 = 14$."],
  ["زجاجات في المستودع", "في مستودع 25 منصة نقّالة، على كل منها 4 صناديق في كل صندوق 7 زجاجات. كم زجاجة في المستودع؟", "نجمع بذكاء (خاصية التجميع): أولًا 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ زجاجة"]
],
ja: [
  ["農家の直売所のかぼちゃ", "直売所で 3 日間にかぼちゃが 17 個、25 個、3 個売れました。全部で何個？ くふうして計算しよう。", "順番を入れかえる（交換法則）：まず 17 + 3。\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ 個"],
  ["映画館の座席", "映画館に 6 列あります。どの列にも真ん中に 12 席、はしに 3 席あります。全部で何席？", "かっこを使うか、分けて計算（分配法則）：\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nまたは $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ 席"],
  ["プレゼントの本", "本を 3 冊持っています。誕生日に 2 冊ずつ入った包みを 4 つもらいました。いま本は何冊？", "かけ算が先：まず 4 · 2。\n$3 + 4 · 2 = 3 + 8$\n$= 11$ 冊\nまちがい：$(3 + 4) · 2 = 14$。"],
  ["倉庫のびん", "倉庫にパレットが 25 枚あり、どれにも 7 本入りの箱が 4 箱のっています。びんは全部で何本？", "くふうしてまとめる（結合法則）：まず 25 · 4。\n$25 · 4 · 7 = 100 · 7$\n$= 700$ 本"]
],
pt: [
  ["Abóboras na fazenda", "Uma loja de fazenda vende 17, 25 e 3 abóboras em três dias. Quantas são ao todo? Calcule de forma esperta.", "Trocar a ordem (propriedade comutativa): primeiro 17 + 3.\n$17 + 25 + 3 = 17 + 3 + 25$\n$= 20 + 25$\n$= 45$ abóboras"],
  ["Poltronas do cinema", "Uma sala de cinema tem 6 fileiras. Cada fileira tem 12 poltronas no meio e 3 na lateral. Quantas poltronas há?", "Parênteses ou distribuir (propriedade distributiva):\n$6 · (12 + 3) = 6 · 15$\n$= 90$\nou $6 · 12 + 6 · 3$\n$= 72 + 18$\n$= 90$ poltronas"],
  ["Livros de presente", "Você já tem 3 livros. No aniversário ganha 4 pacotes com 2 livros cada. Quantos livros você tem agora?", "Multiplicação antes da adição: primeiro 4 · 2.\n$3 + 4 · 2 = 3 + 8$\n$= 11$ livros\nErrado seria $(3 + 4) · 2 = 14$."],
  ["Garrafas no depósito", "Um depósito tem 25 paletes. Em cada uma há 4 caixas com 7 garrafas. Quantas garrafas há?", "Agrupar de forma esperta (propriedade associativa): primeiro 25 · 4.\n$25 · 4 · 7 = 100 · 7$\n$= 700$ garrafas"]
]
}});
