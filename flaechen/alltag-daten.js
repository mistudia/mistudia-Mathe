// Alltagsbeispiele für /flaechen/, 9 Sprachen. Baustein: /alltag.js, „Ausprobieren“ lädt die Figur (MS_FLAECHE.laden).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { typ: "rechteck", einheit: "m", P: { a: 5, b: 4 } },
  { typ: "kreis", einheit: "cm", P: { r: 15 } },
  { typ: "quadrat", einheit: "m", P: { a: 4 } },
  { typ: "drachen", einheit: "cm", P: { e: 80, f: 50, p: 20 } },
  { typ: "dreieck", einheit: "m", P: { g: 8, h: 3, v: 4 } }
],
laden: function(w){ window.MS_FLAECHE.laden(w); },
daten: {
de: [
  ["Neuer Fußboden", "Ein Zimmer ist 5 m lang und 4 m breit. Wie viel Laminat braucht man? Wie lang ist die Fußleiste rundherum (die Tür ist 1 m breit)?", "Fläche: $A = 5 m · 4 m = 20 m²$ Laminat.\nUmfang: $u = 2 · (5 m + 4 m) = 18 m$, ohne Tür $18 m − 1 m = 17 m$ Fußleiste."],
  ["Pizza-Vergleich", "Lohnt sich eine große Pizza mit 30 cm Durchmesser mehr als zwei kleine mit je 20 cm?", "Groß: $r = 15 cm$, $A = π · 15² ≈ 706,9 cm²$.\nKlein: $r = 10 cm$, $A = π · 10² ≈ 314,2 cm²$, zwei Stück $≈ 628,3 cm²$.\nDie große Pizza hat etwa 79 cm² mehr – obwohl 30 cm weniger ist als 2 · 20 cm."],
  ["Gartenbeet", "Ein quadratisches Beet hat 4 m Seitenlänge. Wie viel Zaun braucht man, wie groß ist die Fläche?", "Zaun = Umfang: $u = 4 · 4 m = 16 m$.\nFläche: $A = 4 m · 4 m = 16 m²$. Gleiche Zahl, aber andere Einheit: m und m²!"],
  ["Drachen basteln", "Ein Drachen hat Diagonalen von 80 cm und 50 cm. Wie viel Papier braucht man (ohne Rand)?", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0,2 m²$"],
  ["Giebelwand streichen", "Die dreieckige Giebelwand eines Hauses ist unten 8 m breit und 3 m hoch. Wie groß ist die Fläche?", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nReicht 1 Liter Farbe für 6 m², braucht man 2 Liter (pro Anstrich)."]
],
en: [
  ["New floor", "A room is 5 m long and 4 m wide. How much laminate do you need? How long is the skirting board all round (the door is 1 m wide)?", "Area: $A = 5 m · 4 m = 20 m²$ of laminate.\nPerimeter: $u = 2 · (5 m + 4 m) = 18 m$, without the door $18 m − 1 m = 17 m$ of skirting board."],
  ["Pizza comparison", "Is one large pizza with a 30 cm diameter better value than two small ones of 20 cm each?", "Large: $r = 15 cm$, $A = π · 15² ≈ 706.9 cm²$.\nSmall: $r = 10 cm$, $A = π · 10² ≈ 314.2 cm²$, two of them $≈ 628.3 cm²$.\nThe large pizza has about 79 cm² more – although 30 cm is less than 2 · 20 cm."],
  ["Garden bed", "A square flower bed has sides of 4 m. How much fencing do you need, and how big is the area?", "Fence = perimeter: $u = 4 · 4 m = 16 m$.\nArea: $A = 4 m · 4 m = 16 m²$. Same number, different unit: m and m²!"],
  ["Making a kite", "A kite has diagonals of 80 cm and 50 cm. How much paper do you need (without overlap)?", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0.2 m²$"],
  ["Painting a gable", "The triangular gable wall of a house is 8 m wide at the bottom and 3 m high. How big is its area?", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nIf 1 litre of paint covers 6 m², you need 2 litres (per coat)."]
],
es: [
  ["Suelo nuevo", "Una habitación mide 5 m de largo y 4 m de ancho. ¿Cuánto parqué hace falta? ¿Qué longitud tiene el rodapié alrededor (la puerta mide 1 m)?", "Área: $A = 5 m · 4 m = 20 m²$ de parqué.\nPerímetro: $u = 2 · (5 m + 4 m) = 18 m$, sin la puerta $18 m − 1 m = 17 m$ de rodapié."],
  ["Comparar pizzas", "¿Compensa más una pizza grande de 30 cm de diámetro que dos pequeñas de 20 cm cada una?", "Grande: $r = 15 cm$, $A = π · 15² ≈ 706,9 cm²$.\nPequeña: $r = 10 cm$, $A = π · 10² ≈ 314,2 cm²$, las dos $≈ 628,3 cm²$.\nLa grande tiene unos 79 cm² más, aunque 30 cm es menos que 2 · 20 cm."],
  ["Bancal del jardín", "Un bancal cuadrado tiene 4 m de lado. ¿Cuánta valla hace falta y qué superficie tiene?", "Valla = perímetro: $u = 4 · 4 m = 16 m$.\nÁrea: $A = 4 m · 4 m = 16 m²$. Mismo número, distinta unidad: ¡m y m²!"],
  ["Hacer una cometa", "Una cometa tiene diagonales de 80 cm y 50 cm. ¿Cuánto papel hace falta (sin bordes)?", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0,2 m²$"],
  ["Pintar un hastial", "La pared triangular del tejado de una casa mide 8 m de ancho abajo y 3 m de alto. ¿Qué área tiene?", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nSi 1 litro de pintura cubre 6 m², hacen falta 2 litros (por mano)."]
],
zh: [
  ["铺新地板", "一个房间长 5 m、宽 4 m。需要多少地板？四周的踢脚线有多长（门宽 1 m）？", "面积：$A = 5 m · 4 m = 20 m²$ 地板。\n周长：$u = 2 · (5 m + 4 m) = 18 m$，去掉门 $18 m − 1 m = 17 m$ 踢脚线。"],
  ["比较比萨", "一个直径 30 cm 的大比萨，和两个直径各 20 cm 的小比萨，哪个更划算？", "大：$r = 15 cm$，$A = π · 15² ≈ 706.9 cm²$。\n小：$r = 10 cm$，$A = π · 10² ≈ 314.2 cm²$，两个 $≈ 628.3 cm²$。\n大比萨多出约 79 cm²——虽然 30 cm 比 2 · 20 cm 小。"],
  ["花坛", "一个正方形花坛边长 4 m。需要多长的篱笆？面积多大？", "篱笆 = 周长：$u = 4 · 4 m = 16 m$。\n面积：$A = 4 m · 4 m = 16 m²$。数字相同，单位不同：m 和 m²！"],
  ["做风筝", "一个风筝的两条对角线分别是 80 cm 和 50 cm。需要多少纸（不算边）？", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0.2 m²$"],
  ["粉刷山墙", "房子三角形的山墙底宽 8 m，高 3 m。面积是多少？", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\n如果 1 升油漆能刷 6 m²，需要 2 升（刷一遍）。"]
],
fr: [
  ["Nouveau sol", "Une chambre mesure 5 m de long et 4 m de large. Combien de parquet faut-il ? Quelle est la longueur de la plinthe tout autour (la porte fait 1 m) ?", "Aire : $A = 5 m · 4 m = 20 m²$ de parquet.\nPérimètre : $u = 2 · (5 m + 4 m) = 18 m$, sans la porte $18 m − 1 m = 17 m$ de plinthe."],
  ["Comparer des pizzas", "Une grande pizza de 30 cm de diamètre vaut-elle mieux que deux petites de 20 cm chacune ?", "Grande : $r = 15 cm$, $A = π · 15² ≈ 706,9 cm²$.\nPetite : $r = 10 cm$, $A = π · 10² ≈ 314,2 cm²$, les deux $≈ 628,3 cm²$.\nLa grande a environ 79 cm² de plus, alors que 30 cm est moins que 2 · 20 cm."],
  ["Massif du jardin", "Un massif carré a 4 m de côté. Combien de clôture faut-il, et quelle est son aire ?", "Clôture = périmètre : $u = 4 · 4 m = 16 m$.\nAire : $A = 4 m · 4 m = 16 m²$. Même nombre, unité différente : m et m² !"],
  ["Fabriquer un cerf-volant", "Un cerf-volant a des diagonales de 80 cm et 50 cm. Combien de papier faut-il (sans les bords) ?", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0,2 m²$"],
  ["Peindre un pignon", "Le mur triangulaire du pignon d’une maison fait 8 m de large en bas et 3 m de haut. Quelle est son aire ?", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nSi 1 litre de peinture couvre 6 m², il faut 2 litres (par couche)."]
],
ru: [
  ["Новый пол", "Комната длиной 5 м и шириной 4 м. Сколько нужно ламината? Какой длины плинтус по периметру (дверь шириной 1 м)?", "Площадь: $A = 5 м · 4 м = 20 м²$ ламината.\nПериметр: $u = 2 · (5 м + 4 м) = 18 м$, без двери $18 м − 1 м = 17 м$ плинтуса."],
  ["Сравнение пицц", "Что выгоднее: одна большая пицца диаметром 30 см или две маленькие по 20 см?", "Большая: $r = 15 см$, $A = π · 15² ≈ 706,9 см²$.\nМаленькая: $r = 10 см$, $A = π · 10² ≈ 314,2 см²$, две $≈ 628,3 см²$.\nВ большой примерно на 79 см² больше – хотя 30 см меньше, чем 2 · 20 см."],
  ["Грядка", "Квадратная грядка со стороной 4 м. Сколько нужно забора и какова площадь?", "Забор = периметр: $u = 4 · 4 м = 16 м$.\nПлощадь: $A = 4 м · 4 м = 16 м²$. Число то же, но единицы разные: м и м²!"],
  ["Воздушный змей", "У воздушного змея диагонали 80 см и 50 см. Сколько нужно бумаги (без запаса)?", "$A = e · f : 2 = 80 см · 50 см : 2 = 2000 см² = 0,2 м²$"],
  ["Покраска фронтона", "Треугольный фронтон дома внизу шириной 8 м и высотой 3 м. Какова его площадь?", "$A = g · h : 2 = 8 м · 3 м : 2 = 12 м²$\nЕсли 1 литр краски хватает на 6 м², нужно 2 литра (на один слой)."]
],
ar: [
  ["أرضية جديدة", "غرفة طولها 5 m وعرضها 4 m. كم نحتاج من الباركيه؟ وما طول الإطار السفلي حول الغرفة (عرض الباب 1 m)؟", "المساحة: $A = 5 m · 4 m = 20 m²$ من الباركيه.\nالمحيط: $u = 2 · (5 m + 4 m) = 18 m$، ودون الباب $18 m − 1 m = 17 m$."],
  ["مقارنة البيتزا", "هل بيتزا كبيرة قطرها 30 cm أفضل من بيتزاتين صغيرتين قطر كل منهما 20 cm؟", "الكبيرة: $r = 15 cm$، $A = π · 15² ≈ 706.9 cm²$.\nالصغيرة: $r = 10 cm$، $A = π · 10² ≈ 314.2 cm²$، والاثنتان $≈ 628.3 cm²$.\nالكبيرة أكبر بنحو 79 cm² – مع أن 30 cm أقل من 2 · 20 cm."],
  ["حوض في الحديقة", "حوض زهور مربع طول ضلعه 4 m. كم نحتاج من السياج، وما مساحته؟", "السياج = المحيط: $u = 4 · 4 m = 16 m$.\nالمساحة: $A = 4 m · 4 m = 16 m²$. العدد نفسه لكن الوحدة مختلفة: m و m²!"],
  ["صنع طائرة ورقية", "طائرة ورقية قطراها 80 cm و50 cm. كم نحتاج من الورق (دون الحواف)؟", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0.2 m²$"],
  ["طلاء جدار مثلث", "الجدار المثلث تحت سقف بيت عرضه في الأسفل 8 m وارتفاعه 3 m. ما مساحته؟", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nإذا كان لتر الطلاء يكفي 6 m²، نحتاج 2 لتر (للطبقة الواحدة)."]
],
ja: [
  ["新しい床", "部屋の縦が 5 m、横が 4 m。床材は何 m² 必要？まわりの幅木の長さは（ドアの幅は 1 m）？", "面積：$A = 5 m · 4 m = 20 m²$。\nまわりの長さ：$u = 2 · (5 m + 4 m) = 18 m$、ドアの分を引いて $18 m − 1 m = 17 m$。"],
  ["ピザくらべ", "直径 30 cm の大きいピザ 1 枚と、直径 20 cm の小さいピザ 2 枚、どちらが多い？", "大：$r = 15 cm$、$A = π · 15² ≈ 706.9 cm²$。\n小：$r = 10 cm$、$A = π · 10² ≈ 314.2 cm²$、2 枚で $≈ 628.3 cm²$。\n30 cm は 2 · 20 cm より短いのに、大きいピザのほうが約 79 cm² 多い。"],
  ["花だん", "1 辺 4 m の正方形の花だん。さくは何 m 必要？面積は？", "さく = まわりの長さ：$u = 4 · 4 m = 16 m$。\n面積：$A = 4 m · 4 m = 16 m²$。同じ数でも単位がちがう：m と m²！"],
  ["たこ作り", "対角線が 80 cm と 50 cm のたこ。紙は何 cm² 必要（のりしろなし）？", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0.2 m²$"],
  ["かべのペンキぬり", "家の三角形のかべは底辺 8 m、高さ 3 m。面積は？", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nペンキ 1 L で 6 m² ぬれるなら、2 L 必要（1 回ぬり）。"]
],
pt: [
  ["Chão novo", "Um quarto tem 5 m de comprimento e 4 m de largura. Quanto piso é preciso? Qual é o comprimento do rodapé à volta (a porta tem 1 m)?", "Área: $A = 5 m · 4 m = 20 m²$ de piso.\nPerímetro: $u = 2 · (5 m + 4 m) = 18 m$, sem a porta $18 m − 1 m = 17 m$ de rodapé."],
  ["Comparar pizzas", "Compensa mais uma pizza grande de 30 cm de diâmetro do que duas pequenas de 20 cm cada?", "Grande: $r = 15 cm$, $A = π · 15² ≈ 706,9 cm²$.\nPequena: $r = 10 cm$, $A = π · 10² ≈ 314,2 cm²$, as duas $≈ 628,3 cm²$.\nA grande tem cerca de 79 cm² a mais – embora 30 cm seja menos que 2 · 20 cm."],
  ["Canteiro do jardim", "Um canteiro quadrado tem 4 m de lado. Quanta cerca é preciso e qual é a área?", "Cerca = perímetro: $u = 4 · 4 m = 16 m$.\nÁrea: $A = 4 m · 4 m = 16 m²$. O mesmo número, mas unidades diferentes: m e m²!"],
  ["Fazer um papagaio", "Um papagaio de papel tem diagonais de 80 cm e 50 cm. Quanto papel é preciso (sem margens)?", "$A = e · f : 2 = 80 cm · 50 cm : 2 = 2000 cm² = 0,2 m²$"],
  ["Pintar uma empena", "A parede triangular do telhado de uma casa tem 8 m de largura em baixo e 3 m de altura. Qual é a área?", "$A = g · h : 2 = 8 m · 3 m : 2 = 12 m²$\nSe 1 litro de tinta dá para 6 m², são precisos 2 litros (por demão)."]
]
}});
