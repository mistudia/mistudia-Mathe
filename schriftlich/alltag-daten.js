// Alltagsbeispiele für /schriftlich/, 9 Sprachen. „Ausprobieren“ legt die Rechnung als eigene Aufgabe an (MS_SCHRIFT.laden).
MS_ALLTAG.einbauen({ nach: document.querySelector(".art-box"),
werte: [
  { art: "plus", a: 238, b: 175 },
  { art: "minus", a: 1000, b: 368 },
  { art: "mal", a: 145, b: 27 },
  { art: "geteilt", a: 1176, b: 24 }
],
laden: function(w){ window.MS_SCHRIFT.laden(w); },
daten: {
de: [
  ["Fahrrad und Helm", "Ein Fahrrad kostet 238 €, ein Helm 175 €. Was kostet beides zusammen?", "$238 + 175 = 413$, also 413 €.\nEiner: 8 + 5 = 13, schreibe 3, merke 1. Zehner: 3 + 7 + 1 = 11, schreibe 1, merke 1. Hunderter: 2 + 1 + 1 = 4."],
  ["Erspartes", "Du hast 1000 € gespart und kaufst ein Handy für 368 €. Wie viel bleibt übrig?", "$1000 − 368 = 632$, also 632 €.\nBei den Nullen muss man mehrmals entbündeln (leihen)."],
  ["Klassenfahrt", "27 Kinder fahren auf Klassenfahrt, jedes zahlt 145 €. Wie viel Geld kommt zusammen?", "$145 · 27 = 3915$, also 3915 €.\nTeilrechnungen: $145 · 20 = 2900$ und $145 · 7 = 1015$, zusammen 3915."],
  ["Bonbons verteilen", "1176 Bonbons werden gerecht an 24 Kinder verteilt. Wie viele bekommt jedes Kind?", "$1176 : 24 = 49$ Bonbons.\nProbe: $49 · 24 = 1176$ ✓"]
],
en: [
  ["Bike and helmet", "A bike costs £238 and a helmet £175. What do both cost together?", "$238 + 175 = 413$, so £413.\nOnes: 8 + 5 = 13, write 3, carry 1. Tens: 3 + 7 + 1 = 11, write 1, carry 1. Hundreds: 2 + 1 + 1 = 4."],
  ["Savings", "You have saved £1000 and buy a phone for £368. How much is left?", "$1000 − 368 = 632$, so £632.\nWith the zeros you have to exchange (borrow) several times."],
  ["School trip", "27 children go on a school trip and each pays £145. How much money is collected?", "$145 · 27 = 3915$, so £3915.\nParts: $145 · 20 = 2900$ and $145 · 7 = 1015$, together 3915."],
  ["Sharing sweets", "1176 sweets are shared fairly among 24 children. How many does each child get?", "$1176 : 24 = 49$ sweets.\nCheck: $49 · 24 = 1176$ ✓"]
],
es: [
  ["Bici y casco", "Una bici cuesta 238 € y un casco 175 €. ¿Cuánto cuestan juntos?", "$238 + 175 = 413$, es decir, 413 €.\nUnidades: 8 + 5 = 13, escribo 3 y me llevo 1. Decenas: 3 + 7 + 1 = 11, escribo 1 y me llevo 1. Centenas: 2 + 1 + 1 = 4."],
  ["Ahorros", "Has ahorrado 1000 € y compras un móvil de 368 €. ¿Cuánto te queda?", "$1000 − 368 = 632$, es decir, 632 €.\nCon los ceros hay que pedir prestado varias veces."],
  ["Excursión", "27 alumnos van de excursión y cada uno paga 145 €. ¿Cuánto dinero se reúne?", "$145 · 27 = 3915$, es decir, 3915 €.\nPor partes: $145 · 20 = 2900$ y $145 · 7 = 1015$, en total 3915."],
  ["Repartir caramelos", "Se reparten 1176 caramelos a partes iguales entre 24 niños. ¿Cuántos recibe cada uno?", "$1176 : 24 = 49$ caramelos.\nComprobación: $49 · 24 = 1176$ ✓"]
],
zh: [
  ["自行车和头盔", "一辆自行车 238 元，一个头盔 175 元。一共多少钱？", "$238 + 175 = 413$，一共 413 元。\n个位：8 + 5 = 13，写 3 进 1。十位：3 + 7 + 1 = 11，写 1 进 1。百位：2 + 1 + 1 = 4。"],
  ["存款", "你存了 1000 元，买了一部 368 元的手机。还剩多少？", "$1000 − 368 = 632$，还剩 632 元。\n遇到 0 时要连续退位。"],
  ["春游", "27 个同学去春游，每人交 145 元。一共收多少钱？", "$145 · 27 = 3915$，一共 3915 元。\n分开算：$145 · 20 = 2900$，$145 · 7 = 1015$，合起来 3915。"],
  ["分糖", "1176 颗糖平均分给 24 个孩子。每个孩子分到几颗？", "$1176 : 24 = 49$ 颗。\n验算：$49 · 24 = 1176$ ✓"]
],
fr: [
  ["Vélo et casque", "Un vélo coûte 238 € et un casque 175 €. Combien coûtent-ils ensemble ?", "$238 + 175 = 413$, donc 413 €.\nUnités : 8 + 5 = 13, j’écris 3 et je retiens 1. Dizaines : 3 + 7 + 1 = 11, j’écris 1 et je retiens 1. Centaines : 2 + 1 + 1 = 4."],
  ["Économies", "Tu as économisé 1000 € et tu achètes un téléphone à 368 €. Combien te reste-t-il ?", "$1000 − 368 = 632$, donc 632 €.\nAvec les zéros, il faut faire plusieurs retenues."],
  ["Voyage scolaire", "27 élèves partent en voyage scolaire, chacun paie 145 €. Combien d’argent est réuni ?", "$145 · 27 = 3915$, donc 3915 €.\nPar parties : $145 · 20 = 2900$ et $145 · 7 = 1015$, en tout 3915."],
  ["Partager des bonbons", "On partage 1176 bonbons équitablement entre 24 enfants. Combien chaque enfant en reçoit-il ?", "$1176 : 24 = 49$ bonbons.\nVérification : $49 · 24 = 1176$ ✓"]
],
ru: [
  ["Велосипед и шлем", "Велосипед стоит 238 €, шлем – 175 €. Сколько стоят оба вместе?", "$238 + 175 = 413$, то есть 413 €.\nЕдиницы: 8 + 5 = 13, пишем 3, 1 в уме. Десятки: 3 + 7 + 1 = 11, пишем 1, 1 в уме. Сотни: 2 + 1 + 1 = 4."],
  ["Накопления", "Ты накопил 1000 € и покупаешь телефон за 368 €. Сколько останется?", "$1000 − 368 = 632$, то есть 632 €.\nИз-за нулей приходится несколько раз занимать."],
  ["Школьная поездка", "27 учеников едут на экскурсию, каждый платит 145 €. Сколько денег соберут?", "$145 · 27 = 3915$, то есть 3915 €.\nПо частям: $145 · 20 = 2900$ и $145 · 7 = 1015$, вместе 3915."],
  ["Делим конфеты", "1176 конфет поровну делят между 24 детьми. Сколько получит каждый?", "$1176 : 24 = 49$ конфет.\nПроверка: $49 · 24 = 1176$ ✓"]
],
ar: [
  ["دراجة وخوذة", "ثمن الدراجة 238 € وثمن الخوذة 175 €. كم ثمنهما معًا؟", "$238 + 175 = 413$، أي 413 €.\nالآحاد: 8 + 5 = 13، نكتب 3 ونحمل 1. العشرات: 3 + 7 + 1 = 11، نكتب 1 ونحمل 1. المئات: 2 + 1 + 1 = 4."],
  ["المدخرات", "ادّخرت 1000 € واشتريت هاتفًا بـ 368 €. كم يبقى معك؟", "$1000 − 368 = 632$، أي 632 €.\nمع الأصفار نحتاج إلى الاستلاف عدة مرات."],
  ["رحلة مدرسية", "يذهب 27 تلميذًا في رحلة مدرسية ويدفع كل منهم 145 €. كم يُجمع من المال؟", "$145 · 27 = 3915$، أي 3915 €.\nعلى أجزاء: $145 · 20 = 2900$ و$145 · 7 = 1015$، والمجموع 3915."],
  ["توزيع الحلوى", "تُوزَّع 1176 قطعة حلوى بالتساوي على 24 طفلًا. كم يأخذ كل طفل؟", "$1176 : 24 = 49$ قطعة.\nالتحقق: $49 · 24 = 1176$ ✓"]
],
ja: [
  ["自転車とヘルメット", "自転車が 238 ユーロ、ヘルメットが 175 ユーロ。合わせていくら？", "$238 + 175 = 413$、413 ユーロ。\n一の位：8 + 5 = 13、3 を書いて 1 くり上がり。十の位：3 + 7 + 1 = 11、1 を書いて 1 くり上がり。百の位：2 + 1 + 1 = 4。"],
  ["貯金", "1000 ユーロ貯めて、368 ユーロのスマホを買った。残りはいくら？", "$1000 − 368 = 632$、632 ユーロ。\n0 があるので何回もくり下がりをする。"],
  ["修学旅行", "27 人が修学旅行に行き、1 人 145 ユーロはらう。全部でいくら集まる？", "$145 · 27 = 3915$、3915 ユーロ。\n分けて計算：$145 · 20 = 2900$、$145 · 7 = 1015$、合わせて 3915。"],
  ["あめを分ける", "あめ 1176 個を 24 人で同じ数ずつ分ける。1 人何個？", "$1176 : 24 = 49$ 個。\nたしかめ：$49 · 24 = 1176$ ✓"]
],
pt: [
  ["Bicicleta e capacete", "Uma bicicleta custa 238 reais e um capacete 175 reais. Quanto custam juntos?", "$238 + 175 = 413$, ou seja, 413 reais.\nUnidades: 8 + 5 = 13, escreve 3 e vai 1. Dezenas: 3 + 7 + 1 = 11, escreve 1 e vai 1. Centenas: 2 + 1 + 1 = 4."],
  ["Economias", "Você economizou 1000 reais e compra um celular por 368 reais. Quanto sobra?", "$1000 − 368 = 632$, ou seja, 632 reais.\nCom os zeros é preciso emprestar várias vezes."],
  ["Excursão da escola", "27 alunos vão numa excursão e cada um paga 145 reais. Quanto dinheiro é arrecadado?", "$145 · 27 = 3915$, ou seja, 3915 reais.\nPor partes: $145 · 20 = 2900$ e $145 · 7 = 1015$, juntos 3915."],
  ["Dividir balas", "1176 balas são divididas igualmente entre 24 crianças. Quantas cada uma recebe?", "$1176 : 24 = 49$ balas.\nProva: $49 · 24 = 1176$ ✓"]
]
}});
