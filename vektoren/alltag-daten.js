// Alltagsbeispiele für /vektoren/, 9 Sprachen. „Ausprobieren“: MS_VEK.laden({op, a, b} | {A, B, C}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { op: "add", a: [5, 0], b: [0, 2] },
  { op: "add", a: [3, 2], b: [3, -2] },
  { op: "sub", a: [4, 3], b: [-2, 1] },
  { op: "skalar", a: [4, 3], b: [5, 0] },
  { A: [0, 0, 0], B: [30, 40, 20], C: [30, 40, 0] }
],
laden: function(w){ window.MS_VEK.laden(w); },
daten: {
de: [
  ["Flugzeug mit Seitenwind", "Ein Flugzeug fliegt mit 500 km/h nach Osten, der Wind weht mit 200 km/h nach Norden. Wie schnell ist es über dem Boden, und wie stark wird es abgetrieben? (1 Kästchen = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5,39$, also etwa 539 km/h.\nAbweichung: $tan φ = 2 : 5$ ⇒ $φ ≈ 21,8°$ nach Norden."],
  ["Boot an zwei Seilen", "Zwei Kinder ziehen ein Boot an Seilen schräg nach vorn: $a = (3 | 2)$ und $b = (3 | −2)$ (1 Kästchen = 10 N). Welche Kraft wirkt insgesamt?", "$a + b = (6 | 0)$ – die Seitenkräfte heben sich auf.\nJedes Kind zieht mit $√13 · 10 N ≈ 36 N$, zusammen wirken aber nur 60 N nach vorn (nicht 72 N)."],
  ["Treffpunkt", "Vom Schultor aus gesehen bist du bei $a = (4 | 3)$, deine Freundin bei $b = (−2 | 1)$ (1 Kästchen = 100 m). Welchen Weg muss sie zu dir gehen, wie weit ist das (Luftlinie)?", "Verbindungsvektor: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nLänge: $√(6² + 2²) = √40 ≈ 6,32$, also etwa 632 m."],
  ["Schlitten ziehen", "Du ziehst einen Schlitten am schrägen Seil mit der Kraft $a = (4 | 3)$ (in 10 N) 5 m weit nach vorn: $b = (5 | 0)$. Wie viel Arbeit verrichtest du?", "Arbeit = Skalarprodukt: $a · b = 4 · 5 + 3 · 0 = 20$, also $20 · 10 N · 1 m = 200 J$.\nNur der waagerechte Teil der Kraft hilft. Winkel zwischen Seil und Weg: $cos φ = 20 : (5 · 5) = 0,8$ ⇒ $φ ≈ 36,9°$."],
  ["Drohnenflug", "Eine Drohne startet bei $A(0 | 0 | 0)$ und fliegt geradlinig zu $B(30 | 40 | 20)$ (in m). C ist der Punkt auf dem Boden unter B. Wie lang ist der Flug, wie steil steigt sie?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53,85 m$\nAm Boden: $|AC| = 50 m$. Steigwinkel = Winkel bei A: $≈ 21,8°$."]
],
en: [
  ["Plane with crosswind", "A plane flies east at 500 km/h, the wind blows north at 200 km/h. How fast is it over the ground, and how far is it pushed off course? (1 square = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5.39$, so about 539 km/h.\nDrift: $tan φ = 2 : 5$ ⇒ $φ ≈ 21.8°$ to the north."],
  ["Boat on two ropes", "Two children pull a boat forward with ropes at an angle: $a = (3 | 2)$ and $b = (3 | −2)$ (1 square = 10 N). What is the total force?", "$a + b = (6 | 0)$ – the sideways forces cancel out.\nEach child pulls with $√13 · 10 N ≈ 36 N$, but together only 60 N act forwards (not 72 N)."],
  ["Meeting point", "Seen from the school gate you are at $a = (4 | 3)$ and your friend at $b = (−2 | 1)$ (1 square = 100 m). Which way must she walk to you, and how far is it (straight line)?", "Connecting vector: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nLength: $√(6² + 2²) = √40 ≈ 6.32$, so about 632 m."],
  ["Pulling a sledge", "You pull a sledge with a slanted rope with force $a = (4 | 3)$ (in 10 N) 5 m forward: $b = (5 | 0)$. How much work do you do?", "Work = dot product: $a · b = 4 · 5 + 3 · 0 = 20$, so $20 · 10 N · 1 m = 200 J$.\nOnly the horizontal part of the force helps. Angle between rope and path: $cos φ = 20 : (5 · 5) = 0.8$ ⇒ $φ ≈ 36.9°$."],
  ["Drone flight", "A drone takes off at $A(0 | 0 | 0)$ and flies straight to $B(30 | 40 | 20)$ (in m). C is the point on the ground below B. How long is the flight, how steeply does it climb?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53.85 m$\nOn the ground: $|AC| = 50 m$. Climb angle = angle at A: $≈ 21.8°$."]
],
es: [
  ["Avión con viento lateral", "Un avión vuela hacia el este a 500 km/h y el viento sopla hacia el norte a 200 km/h. ¿A qué velocidad va respecto al suelo y cuánto se desvía? (1 cuadro = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5,39$, unos 539 km/h.\nDesvío: $tg φ = 2 : 5$ ⇒ $φ ≈ 21,8°$ hacia el norte."],
  ["Barca con dos cuerdas", "Dos niños tiran de una barca con cuerdas en diagonal: $a = (3 | 2)$ y $b = (3 | −2)$ (1 cuadro = 10 N). ¿Qué fuerza actúa en total?", "$a + b = (6 | 0)$: las fuerzas laterales se anulan.\nCada niño tira con $√13 · 10 N ≈ 36 N$, pero juntos solo actúan 60 N hacia delante (no 72 N)."],
  ["Punto de encuentro", "Desde la puerta del colegio, tú estás en $a = (4 | 3)$ y tu amiga en $b = (−2 | 1)$ (1 cuadro = 100 m). ¿Qué camino debe hacer ella hasta ti y qué distancia es (en línea recta)?", "Vector que los une: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nLongitud: $√(6² + 2²) = √40 ≈ 6,32$, unos 632 m."],
  ["Tirar de un trineo", "Tiras de un trineo con una cuerda inclinada con la fuerza $a = (4 | 3)$ (en 10 N) 5 m hacia delante: $b = (5 | 0)$. ¿Cuánto trabajo realizas?", "Trabajo = producto escalar: $a · b = 4 · 5 + 3 · 0 = 20$, es decir $20 · 10 N · 1 m = 200 J$.\nSolo ayuda la parte horizontal de la fuerza. Ángulo entre cuerda y camino: $cos φ = 20 : (5 · 5) = 0,8$ ⇒ $φ ≈ 36,9°$."],
  ["Vuelo de un dron", "Un dron despega en $A(0 | 0 | 0)$ y vuela en línea recta hasta $B(30 | 40 | 20)$ (en m). C es el punto del suelo bajo B. ¿Cuánto mide el vuelo y con qué inclinación sube?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53,85 m$\nEn el suelo: $|AC| = 50 m$. Ángulo de subida = ángulo en A: $≈ 21,8°$."]
],
zh: [
  ["侧风中的飞机", "飞机以 500 km/h 向东飞，风以 200 km/h 向北吹。飞机相对地面有多快？偏离多少？（1 格 = 100 km/h）", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5.39$，约 539 km/h。\n偏离：$tan φ = 2 : 5$ ⇒ $φ ≈ 21.8°$，偏向北。"],
  ["两根绳拉船", "两个孩子用绳子斜着向前拉船：$a = (3 | 2)$，$b = (3 | −2)$（1 格 = 10 N）。合力是多少？", "$a + b = (6 | 0)$——侧向的力互相抵消。\n每个孩子用 $√13 · 10 N ≈ 36 N$ 的力，但合起来向前只有 60 N（不是 72 N）。"],
  ["会合", "以校门为起点，你在 $a = (4 | 3)$，朋友在 $b = (−2 | 1)$（1 格 = 100 m）。她要怎样走到你那里？直线距离多远？", "连接向量：$a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\n长度：$√(6² + 2²) = √40 ≈ 6.32$，约 632 m。"],
  ["拉雪橇", "你用斜拉的绳子以力 $a = (4 | 3)$（单位 10 N）把雪橇向前拉 5 m：$b = (5 | 0)$。做了多少功？", "功 = 数量积：$a · b = 4 · 5 + 3 · 0 = 20$，即 $20 · 10 N · 1 m = 200 J$。\n只有水平方向的力有用。绳子与路线的夹角：$cos φ = 20 : (5 · 5) = 0.8$ ⇒ $φ ≈ 36.9°$。"],
  ["无人机飞行", "无人机从 $A(0 | 0 | 0)$ 起飞，沿直线飞到 $B(30 | 40 | 20)$（单位 m）。C 是 B 正下方地面上的点。飞了多远？爬升角是多少？", "$AB = (30 | 40 | 20)$，$|AB| = √(30² + 40² + 20²) = √2900 ≈ 53.85 m$\n地面上：$|AC| = 50 m$。爬升角 = A 处的角：$≈ 21.8°$。"]
],
fr: [
  ["Avion et vent de travers", "Un avion vole vers l’est à 500 km/h, le vent souffle vers le nord à 200 km/h. Quelle est sa vitesse par rapport au sol et de combien est-il dévié ? (1 carreau = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5,39$, soit environ 539 km/h.\nDérive : $tan φ = 2 : 5$ ⇒ $φ ≈ 21,8°$ vers le nord."],
  ["Bateau tiré par deux cordes", "Deux enfants tirent un bateau en avant avec des cordes en biais : $a = (3 | 2)$ et $b = (3 | −2)$ (1 carreau = 10 N). Quelle est la force totale ?", "$a + b = (6 | 0)$ : les forces latérales s’annulent.\nChaque enfant tire avec $√13 · 10 N ≈ 36 N$, mais ensemble seulement 60 N agissent vers l’avant (pas 72 N)."],
  ["Point de rendez-vous", "Vu depuis le portail de l’école, tu es en $a = (4 | 3)$ et ton amie en $b = (−2 | 1)$ (1 carreau = 100 m). Quel chemin doit-elle faire jusqu’à toi, et quelle distance est-ce (à vol d’oiseau) ?", "Vecteur de liaison : $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nLongueur : $√(6² + 2²) = √40 ≈ 6,32$, soit environ 632 m."],
  ["Tirer une luge", "Tu tires une luge avec une corde inclinée, force $a = (4 | 3)$ (en 10 N), sur 5 m vers l’avant : $b = (5 | 0)$. Quel travail fournis-tu ?", "Travail = produit scalaire : $a · b = 4 · 5 + 3 · 0 = 20$, soit $20 · 10 N · 1 m = 200 J$.\nSeule la partie horizontale de la force est utile. Angle entre corde et trajet : $cos φ = 20 : (5 · 5) = 0,8$ ⇒ $φ ≈ 36,9°$."],
  ["Vol de drone", "Un drone décolle en $A(0 | 0 | 0)$ et vole en ligne droite jusqu’à $B(30 | 40 | 20)$ (en m). C est le point au sol sous B. Quelle est la longueur du vol, avec quelle pente monte-t-il ?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53,85 m$\nAu sol : $|AC| = 50 m$. Angle de montée = angle en A : $≈ 21,8°$."]
],
ru: [
  ["Самолёт и боковой ветер", "Самолёт летит на восток со скоростью 500 км/ч, ветер дует на север со скоростью 200 км/ч. Какова скорость относительно земли и насколько самолёт сносит? (1 клетка = 100 км/ч)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5,39$, то есть около 539 км/ч.\nСнос: $tg φ = 2 : 5$ ⇒ $φ ≈ 21,8°$ к северу."],
  ["Лодка на двух верёвках", "Двое детей тянут лодку вперёд верёвками под углом: $a = (3 | 2)$ и $b = (3 | −2)$ (1 клетка = 10 Н). Какова общая сила?", "$a + b = (6 | 0)$ – боковые силы уравновешиваются.\nКаждый тянет с силой $√13 · 10 Н ≈ 36 Н$, но вместе вперёд действует только 60 Н (а не 72 Н)."],
  ["Место встречи", "Если смотреть от ворот школы, ты находишься в точке $a = (4 | 3)$, подруга – в $b = (−2 | 1)$ (1 клетка = 100 м). Какой путь ей пройти до тебя и какое это расстояние (по прямой)?", "Соединяющий вектор: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nДлина: $√(6² + 2²) = √40 ≈ 6,32$, то есть около 632 м."],
  ["Тянем санки", "Ты тянешь санки за наклонную верёвку с силой $a = (4 | 3)$ (в 10 Н) на 5 м вперёд: $b = (5 | 0)$. Какую работу ты совершаешь?", "Работа = скалярное произведение: $a · b = 4 · 5 + 3 · 0 = 20$, то есть $20 · 10 Н · 1 м = 200 Дж$.\nПомогает только горизонтальная часть силы. Угол между верёвкой и путём: $cos φ = 20 : (5 · 5) = 0,8$ ⇒ $φ ≈ 36,9°$."],
  ["Полёт дрона", "Дрон взлетает в точке $A(0 | 0 | 0)$ и летит по прямой в $B(30 | 40 | 20)$ (в м). C – точка на земле под B. Какова длина полёта и под каким углом он поднимается?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53,85 м$\nПо земле: $|AC| = 50 м$. Угол подъёма = угол при A: $≈ 21,8°$."]
],
ar: [
  ["طائرة مع رياح جانبية", "تطير طائرة شرقًا بسرعة 500 km/h وتهب الرياح شمالًا بسرعة 200 km/h. ما سرعتها بالنسبة للأرض، وكم تنحرف؟ (المربع = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5.39$، أي نحو 539 km/h.\nالانحراف: $tan φ = 2 : 5$ ⇒ $φ ≈ 21.8°$ نحو الشمال."],
  ["قارب بحبلين", "يسحب طفلان قاربًا إلى الأمام بحبلين مائلين: $a = (3 | 2)$ و$b = (3 | −2)$ (المربع = 10 N). ما القوة الكلية؟", "$a + b = (6 | 0)$ – القوى الجانبية تلغي بعضها.\nكل طفل يسحب بقوة $√13 · 10 N ≈ 36 N$، لكن معًا تؤثر 60 N فقط إلى الأمام (لا 72 N)."],
  ["نقطة اللقاء", "إذا نظرنا من بوابة المدرسة فأنت عند $a = (4 | 3)$ وصديقتك عند $b = (−2 | 1)$ (المربع = 100 m). ما الطريق الذي تسلكه إليك، وكم المسافة (خط مستقيم)؟", "متجه الوصل: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nالطول: $√(6² + 2²) = √40 ≈ 6.32$، أي نحو 632 m."],
  ["سحب زلّاجة", "تسحب زلّاجة بحبل مائل بقوة $a = (4 | 3)$ (بوحدة 10 N) مسافة 5 m إلى الأمام: $b = (5 | 0)$. كم الشغل الذي تبذله؟", "الشغل = الضرب القياسي: $a · b = 4 · 5 + 3 · 0 = 20$، أي $20 · 10 N · 1 m = 200 J$.\nالجزء الأفقي من القوة فقط هو المفيد. الزاوية بين الحبل والطريق: $cos φ = 20 : (5 · 5) = 0.8$ ⇒ $φ ≈ 36.9°$."],
  ["طيران طائرة مسيّرة", "تقلع طائرة مسيّرة من $A(0 | 0 | 0)$ وتطير مستقيمة إلى $B(30 | 40 | 20)$ (بالمتر). C هي النقطة على الأرض تحت B. ما طول الرحلة، وما زاوية الصعود؟", "$AB = (30 | 40 | 20)$، $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53.85 m$\nعلى الأرض: $|AC| = 50 m$. زاوية الصعود = الزاوية عند A: $≈ 21.8°$."]
],
ja: [
  ["横風の中の飛行機", "飛行機が時速 500 km で東へ飛び、風が時速 200 km で北へふいている。地面に対する速さは？どれだけ流される？（1 目もり = 時速 100 km）", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5.39$、つまり時速約 539 km。\nずれ：$tan φ = 2 : 5$ ⇒ 北へ $φ ≈ 21.8°$。"],
  ["2 本のロープでボートを引く", "2 人がロープでボートをななめ前に引く：$a = (3 | 2)$、$b = (3 | −2)$（1 目もり = 10 N）。合わせた力は？", "$a + b = (6 | 0)$――横向きの力は打ち消し合う。\n1 人 $√13 · 10 N ≈ 36 N$ で引いているのに、前向きには合わせて 60 N（72 N ではない）。"],
  ["待ち合わせ", "校門から見て、あなたは $a = (4 | 3)$、友だちは $b = (−2 | 1)$ の位置（1 目もり = 100 m）。友だちはどの向きに歩けばいい？まっすぐのきょりは？", "結ぶベクトル：$a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\n長さ：$√(6² + 2²) = √40 ≈ 6.32$、約 632 m。"],
  ["そりを引く", "ななめのロープで力 $a = (4 | 3)$（単位 10 N）でそりを 5 m 前へ引く：$b = (5 | 0)$。した仕事は？", "仕事 = 内積：$a · b = 4 · 5 + 3 · 0 = 20$、つまり $20 · 10 N · 1 m = 200 J$。\n役に立つのは力の水平な部分だけ。ロープと進む向きの角：$cos φ = 20 : (5 · 5) = 0.8$ ⇒ $φ ≈ 36.9°$。"],
  ["ドローンの飛行", "ドローンが $A(0 | 0 | 0)$ から $B(30 | 40 | 20)$（単位 m）までまっすぐ飛ぶ。C は B の真下の地面の点。飛んだきょりと上昇の角度は？", "$AB = (30 | 40 | 20)$、$|AB| = √(30² + 40² + 20²) = √2900 ≈ 53.85 m$\n地面では：$|AC| = 50 m$。上昇の角度 = A の角：$≈ 21.8°$。"]
],
pt: [
  ["Avião com vento lateral", "Um avião voa para leste a 500 km/h e o vento sopra para norte a 200 km/h. Qual é a velocidade em relação ao solo e quanto se desvia? (1 quadrado = 100 km/h)", "$a + b = (5 | 0) + (0 | 2) = (5 | 2)$\n$|a + b| = √(5² + 2²) = √29 ≈ 5,39$, ou seja, cerca de 539 km/h.\nDesvio: $tg φ = 2 : 5$ ⇒ $φ ≈ 21,8°$ para norte."],
  ["Barco com duas cordas", "Duas crianças puxam um barco para a frente com cordas em diagonal: $a = (3 | 2)$ e $b = (3 | −2)$ (1 quadrado = 10 N). Qual é a força total?", "$a + b = (6 | 0)$ – as forças laterais anulam-se.\nCada criança puxa com $√13 · 10 N ≈ 36 N$, mas juntas só atuam 60 N para a frente (não 72 N)."],
  ["Ponto de encontro", "Visto do portão da escola, estás em $a = (4 | 3)$ e a tua amiga em $b = (−2 | 1)$ (1 quadrado = 100 m). Que caminho deve ela fazer até ti e qual é a distância (em linha reta)?", "Vetor de ligação: $a − b = (4 − (−2) | 3 − 1) = (6 | 2)$\nComprimento: $√(6² + 2²) = √40 ≈ 6,32$, ou seja, cerca de 632 m."],
  ["Puxar um trenó", "Puxas um trenó com uma corda inclinada com a força $a = (4 | 3)$ (em 10 N) 5 m para a frente: $b = (5 | 0)$. Quanto trabalho realizas?", "Trabalho = produto escalar: $a · b = 4 · 5 + 3 · 0 = 20$, ou seja $20 · 10 N · 1 m = 200 J$.\nSó a parte horizontal da força ajuda. Ângulo entre corda e caminho: $cos φ = 20 : (5 · 5) = 0,8$ ⇒ $φ ≈ 36,9°$."],
  ["Voo de um drone", "Um drone descola em $A(0 | 0 | 0)$ e voa em linha reta até $B(30 | 40 | 20)$ (em m). C é o ponto no chão por baixo de B. Qual é o comprimento do voo e com que inclinação sobe?", "$AB = (30 | 40 | 20)$, $|AB| = √(30² + 40² + 20²) = √2900 ≈ 53,85 m$\nNo chão: $|AC| = 50 m$. Ângulo de subida = ângulo em A: $≈ 21,8°$."]
]
}});
