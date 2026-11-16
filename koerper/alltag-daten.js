// Alltagsbeispiele für /koerper/, 9 Sprachen. Baustein: /alltag.js, Zeichnungen: /alltag-bilder.js (koerper)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Getränkedose", "Eine Dose hat den Radius 4 cm und ist 11 cm hoch. Wie viel passt hinein, und wie groß ist das Etikett rundherum (Mantel)?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552,92 cm³$ (≈ 0,55 l)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276,46 cm²$"],
  ["Eistüte", "Eine Waffel (Kegel) mit r = 3 cm und h = 10 cm ist bis oben voll, darauf liegt eine halbe Kugel Eis. Wie viel Eis ist das?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94,25 + 56,55$\n$V ≈ 150,8 cm³$"],
  ["Zelt", "Ein Zelt ist ein Dreiecksprisma: unten 2 m breit, 1,5 m hoch und 3 m lang. Wie viel Luft ist drin, und wie viel Stoff braucht man ohne Boden?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1,5 · 3$\n$V = 4,5 m³$\n$s = √(1,5² + 1²)$\n$s ≈ 1,8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10,82 + 3$\n$A ≈ 13,82 m²$"],
  ["Silo", "Ein Silo besteht aus einem Zylinder (r = 3 m, h = 10 m) mit einer Halbkugel als Dach. Wie viel Getreide passt hinein?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282,74 + 56,55$\n$V ≈ 339,29 m³$"],
  ["Haus mit Dach", "Ein Haus ist 10 m lang, 8 m breit und 6 m hoch. Das Satteldach ist 3 m hoch. Wie groß ist der umbaute Raum?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Kerze", "Eine Kerze ist ein Zylinder mit r = 2,5 cm und h = 15 cm. Wie viel Wachs steckt darin?", "$V = π · r² · h$\n$V = π · 2,5² · 15$\n$V ≈ 294,52 cm³$"]
],
en: [
  ["Drink can", "A can has a radius of 4 cm and is 11 cm tall. How much fits inside, and how big is the label around it (lateral surface)?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552.92 cm³$ (≈ 0.55 l)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276.46 cm²$"],
  ["Ice cream cone", "A wafer cone with r = 3 cm and h = 10 cm is filled to the top, with half a scoop (hemisphere) on top. How much ice cream is that?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94.25 + 56.55$\n$V ≈ 150.8 cm³$"],
  ["Tent", "A tent is a triangular prism: 2 m wide at the bottom, 1.5 m high and 3 m long. How much air is inside, and how much fabric is needed without the floor?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1.5 · 3$\n$V = 4.5 m³$\n$s = √(1.5² + 1²)$\n$s ≈ 1.8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10.82 + 3$\n$A ≈ 13.82 m²$"],
  ["Silo", "A silo is a cylinder (r = 3 m, h = 10 m) with a hemisphere as its roof. How much grain fits inside?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282.74 + 56.55$\n$V ≈ 339.29 m³$"],
  ["House with a roof", "A house is 10 m long, 8 m wide and 6 m high. The gable roof is 3 m high. How big is the enclosed space?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Candle", "A candle is a cylinder with r = 2.5 cm and h = 15 cm. How much wax is in it?", "$V = π · r² · h$\n$V = π · 2.5² · 15$\n$V ≈ 294.52 cm³$"]
],
es: [
  ["Lata de bebida", "Una lata tiene 4 cm de radio y 11 cm de altura. ¿Cuánto cabe dentro y qué tamaño tiene la etiqueta de alrededor (área lateral)?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552,92 cm³$ (≈ 0,55 l)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276,46 cm²$"],
  ["Cucurucho", "Un cucurucho (cono) con r = 3 cm y h = 10 cm está lleno hasta arriba y encima lleva media bola de helado. ¿Cuánto helado es?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94,25 + 56,55$\n$V ≈ 150,8 cm³$"],
  ["Tienda de campaña", "Una tienda es un prisma triangular: 2 m de ancho abajo, 1,5 m de alto y 3 m de largo. ¿Cuánto aire hay dentro y cuánta tela hace falta sin el suelo?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1,5 · 3$\n$V = 4,5 m³$\n$s = √(1,5² + 1²)$\n$s ≈ 1,8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10,82 + 3$\n$A ≈ 13,82 m²$"],
  ["Silo", "Un silo es un cilindro (r = 3 m, h = 10 m) con una semiesfera como techo. ¿Cuánto grano cabe?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282,74 + 56,55$\n$V ≈ 339,29 m³$"],
  ["Casa con tejado", "Una casa mide 10 m de largo, 8 m de ancho y 6 m de alto. El tejado a dos aguas tiene 3 m de alto. ¿Qué volumen tiene?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Vela", "Una vela es un cilindro con r = 2,5 cm y h = 15 cm. ¿Cuánta cera tiene?", "$V = π · r² · h$\n$V = π · 2,5² · 15$\n$V ≈ 294,52 cm³$"]
],
zh: [
  ["饮料罐", "一个罐子半径 4 cm，高 11 cm。能装多少？包在外面的标签（侧面）有多大？", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552.92 cm³$ (≈ 0.55 升)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276.46 cm²$"],
  ["冰淇淋", "一个蛋筒（圆锥）r = 3 cm，h = 10 cm，装满后上面再放半球形的冰淇淋。一共有多少冰淇淋？", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94.25 + 56.55$\n$V ≈ 150.8 cm³$"],
  ["帐篷", "帐篷是一个三棱柱：底宽 2 m，高 1.5 m，长 3 m。里面有多少空气？不算底面需要多少布？", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1.5 · 3$\n$V = 4.5 m³$\n$s = √(1.5² + 1²)$\n$s ≈ 1.8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10.82 + 3$\n$A ≈ 13.82 m²$"],
  ["筒仓", "筒仓由圆柱（r = 3 m，h = 10 m）和半球形的顶组成。能装多少粮食？", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282.74 + 56.55$\n$V ≈ 339.29 m³$"],
  ["有屋顶的房子", "房子长 10 m，宽 8 m，高 6 m，人字形屋顶高 3 m。房子的体积是多少？", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["蜡烛", "蜡烛是一个圆柱，r = 2.5 cm，h = 15 cm。里面有多少蜡？", "$V = π · r² · h$\n$V = π · 2.5² · 15$\n$V ≈ 294.52 cm³$"]
],
fr: [
  ["Canette", "Une canette a un rayon de 4 cm et une hauteur de 11 cm. Combien contient-elle, et quelle est l’aire de l’étiquette tout autour (aire latérale) ?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552,92 cm³$ (≈ 0,55 l)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276,46 cm²$"],
  ["Cornet de glace", "Un cornet (cône) avec r = 3 cm et h = 10 cm est rempli jusqu’en haut, avec une demi-boule de glace dessus. Combien de glace cela fait-il ?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94,25 + 56,55$\n$V ≈ 150,8 cm³$"],
  ["Tente", "Une tente est un prisme triangulaire : 2 m de large en bas, 1,5 m de haut et 3 m de long. Quel volume d’air contient-elle, et combien de toile faut-il sans le sol ?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1,5 · 3$\n$V = 4,5 m³$\n$s = √(1,5² + 1²)$\n$s ≈ 1,8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10,82 + 3$\n$A ≈ 13,82 m²$"],
  ["Silo", "Un silo est un cylindre (r = 3 m, h = 10 m) surmonté d’une demi-boule. Combien de grain peut-il contenir ?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282,74 + 56,55$\n$V ≈ 339,29 m³$"],
  ["Maison avec toit", "Une maison mesure 10 m de long, 8 m de large et 6 m de haut. Le toit à deux pans fait 3 m de haut. Quel est son volume ?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Bougie", "Une bougie est un cylindre avec r = 2,5 cm et h = 15 cm. Combien de cire contient-elle ?", "$V = π · r² · h$\n$V = π · 2,5² · 15$\n$V ≈ 294,52 cm³$"]
],
ru: [
  ["Банка", "Банка имеет радиус 4 см и высоту 11 см. Сколько в неё помещается и какова площадь этикетки вокруг (боковая поверхность)?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552,92 cm³$ (≈ 0,55 л)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276,46 cm²$"],
  ["Рожок мороженого", "Вафельный рожок (конус) с r = 3 см и h = 10 см заполнен доверху, сверху лежит половина шарика мороженого. Сколько это мороженого?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94,25 + 56,55$\n$V ≈ 150,8 cm³$"],
  ["Палатка", "Палатка – треугольная призма: внизу 2 м шириной, 1,5 м высотой и 3 м длиной. Сколько в ней воздуха и сколько ткани нужно без пола?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1,5 · 3$\n$V = 4,5 m³$\n$s = √(1,5² + 1²)$\n$s ≈ 1,8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10,82 + 3$\n$A ≈ 13,82 m²$"],
  ["Силос", "Силос – цилиндр (r = 3 м, h = 10 м) с крышей в форме полушара. Сколько зерна в него помещается?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282,74 + 56,55$\n$V ≈ 339,29 m³$"],
  ["Дом с крышей", "Дом длиной 10 м, шириной 8 м и высотой 6 м. Двускатная крыша высотой 3 м. Каков объём дома?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Свеча", "Свеча – цилиндр с r = 2,5 см и h = 15 см. Сколько в ней воска?", "$V = π · r² · h$\n$V = π · 2,5² · 15$\n$V ≈ 294,52 cm³$"]
],
ar: [
  ["علبة مشروب", "علبة نصف قطرها 4 cm وارتفاعها 11 cm. كم تتسع، وما مساحة الملصق حولها (المساحة الجانبية)؟", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552.92 cm³$ (≈ 0.55 لتر)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276.46 cm²$"],
  ["قمع آيس كريم", "قمع (مخروط) r = 3 cm وh = 10 cm مملوء حتى الحافة، وفوقه نصف كرة من الآيس كريم. كم كمية الآيس كريم؟", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94.25 + 56.55$\n$V ≈ 150.8 cm³$"],
  ["خيمة", "الخيمة منشور ثلاثي: عرضها في الأسفل 2 m وارتفاعها 1.5 m وطولها 3 m. كم من الهواء بداخلها، وكم من القماش نحتاج بدون الأرضية؟", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1.5 · 3$\n$V = 4.5 m³$\n$s = √(1.5² + 1²)$\n$s ≈ 1.8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10.82 + 3$\n$A ≈ 13.82 m²$"],
  ["صومعة", "صومعة على شكل أسطوانة (r = 3 m، h = 10 m) سقفها نصف كرة. كم من الحبوب تتسع؟", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282.74 + 56.55$\n$V ≈ 339.29 m³$"],
  ["بيت بسقف", "بيت طوله 10 m وعرضه 8 m وارتفاعه 6 m، وارتفاع السقف الجملوني 3 m. ما حجم البيت؟", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["شمعة", "شمعة على شكل أسطوانة r = 2.5 cm وh = 15 cm. كم فيها من الشمع؟", "$V = π · r² · h$\n$V = π · 2.5² · 15$\n$V ≈ 294.52 cm³$"]
],
ja: [
  ["ジュースの缶", "半径 4 cm、高さ 11 cm の缶があります。何 cm³ 入りますか？まわりのラベル（側面）の面積は？", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552.92 cm³$ (≈ 0.55 L)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276.46 cm²$"],
  ["アイスクリーム", "r = 3 cm、h = 10 cm のコーン（円すい）に上までアイスを入れ、その上に半球のアイスをのせます。アイスは全部で何 cm³？", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94.25 + 56.55$\n$V ≈ 150.8 cm³$"],
  ["テント", "テントは三角柱です。底の幅 2 m、高さ 1.5 m、長さ 3 m。中の空気は何 m³？床なしで布は何 m² いる？", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1.5 · 3$\n$V = 4.5 m³$\n$s = √(1.5² + 1²)$\n$s ≈ 1.8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10.82 + 3$\n$A ≈ 13.82 m²$"],
  ["サイロ", "サイロは円柱（r = 3 m、h = 10 m）に半球の屋根をのせた形です。穀物は何 m³ 入りますか？", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282.74 + 56.55$\n$V ≈ 339.29 m³$"],
  ["屋根のある家", "家の長さ 10 m、幅 8 m、高さ 6 m。切妻屋根の高さは 3 m。家全体の体積は？", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["ろうそく", "ろうそくは r = 2.5 cm、h = 15 cm の円柱です。ろうは何 cm³？", "$V = π · r² · h$\n$V = π · 2.5² · 15$\n$V ≈ 294.52 cm³$"]
],
pt: [
  ["Lata de refrigerante", "Uma lata tem raio de 4 cm e 11 cm de altura. Quanto cabe nela, e qual o tamanho do rótulo em volta (área lateral)?", "$V = π · r² · h$\n$V = π · 4² · 11$\n$V ≈ 552,92 cm³$ (≈ 0,55 l)\n$M = 2 · π · r · h$\n$M = 2 · π · 4 · 11$\n$M ≈ 276,46 cm²$"],
  ["Casquinha de sorvete", "Uma casquinha (cone) com r = 3 cm e h = 10 cm está cheia até a borda, com meia bola de sorvete em cima. Quanto sorvete é?", "$V = ⅓ · π · r² · h + ⅔ · π · r³$\n$V = ⅓ · π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 94,25 + 56,55$\n$V ≈ 150,8 cm³$"],
  ["Barraca", "Uma barraca é um prisma triangular: 2 m de largura embaixo, 1,5 m de altura e 3 m de comprimento. Quanto ar há dentro, e quanto tecido é preciso sem o chão?", "$V = ½ · g · h_d · l$\n$V = ½ · 2 · 1,5 · 3$\n$V = 4,5 m³$\n$s = √(1,5² + 1²)$\n$s ≈ 1,8 m$\n$A = 2 · s · l + 2 · ½ · g · h_d$\n$A ≈ 10,82 + 3$\n$A ≈ 13,82 m²$"],
  ["Silo", "Um silo é um cilindro (r = 3 m, h = 10 m) com uma semiesfera como teto. Quanto grão cabe nele?", "$V = π · r² · h + ⅔ · π · r³$\n$V = π · 3² · 10 + ⅔ · π · 3³$\n$V ≈ 282,74 + 56,55$\n$V ≈ 339,29 m³$"],
  ["Casa com telhado", "Uma casa tem 10 m de comprimento, 8 m de largura e 6 m de altura. O telhado de duas águas tem 3 m de altura. Qual é o volume?", "$V = a · b · h + ½ · b · d · a$\n$V = 10 · 8 · 6 + ½ · 8 · 3 · 10$\n$V = 480 + 120$\n$V = 600 m³$"],
  ["Vela", "Uma vela é um cilindro com r = 2,5 cm e h = 15 cm. Quanta cera ela tem?", "$V = π · r² · h$\n$V = π · 2,5² · 15$\n$V ≈ 294,52 cm³$"]
]
}, werte: [
  { k: "zylinder", d: { r: 4, h: 11 } }, { k: "eis", d: { r: 3, h: 10 } }, { k: "prisma", d: { g: 2, hd: 1.5, h: 3 } },
  { k: "silo", d: { r: 3, h1: 10 } }, { k: "dach", d: { a: 10, b: 8, h1: 6, d: 3 } }, { k: "zylinder", d: { r: 2.5, h: 15 } }
], laden: function(w){ if(window.KO_LADEN) KO_LADEN(w); } });
