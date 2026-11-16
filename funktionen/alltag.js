// ============================================================
// funktionen/alltag.js – Beispiele aus dem echten Leben (9 Sprachen)
// für /linear/, /quadratisch/, /polynom/, /rational/, /sinus/ und /waage/.
//   FA.einbauen(app, nachElement, laden, formel)
//     laden(eingabe)  – lädt das Beispiel in die App (fehlt bei sinus)
//     formel(eingabe) – Formeltext für die Anzeige
//   FA.texte()        – Knopftext nach Sprachwechsel neu setzen
// Braucht /funktionen/lexikon.js (FB) für Popup und Formelsatz.
// ============================================================
var FA = (function(){
  "use strict";
  var F = {"linear": ["1,15x", "2x + 10", "-2,5x + 20", "2,5x + 4"], "quadratisch": ["-0,05x^2 + x + 1,5", "-0,02x^2 + 8", "-10x^2 + 80x - 70"], "polynom": ["4x^3 - 80x^2 + 400x", "0,01x^3 - 0,3x^2 + 2,25x + 5"], "rational": ["(2x + 600)/x", "120/x", "(x + 2)/(x + 10)"], "sinus": [null, null, null, null], "waage": [["3x+2", "8"], ["x+x+3", "21"], ["12+4x", "30+x"], ["5+0,1x", "15+0,05x"], ["2x+4x", "36"]]};
  var UI = {"de": {"titel": "Aus dem Alltag", "probieren": "Ausprobieren", "bedeutung": "Was bedeutet was?", "waage": "Auf die Waage legen"}, "en": {"titel": "Everyday examples", "probieren": "Try it", "bedeutung": "What means what?", "waage": "Put it on the balance"}, "es": {"titel": "Ejemplos de la vida real", "probieren": "Probar", "bedeutung": "¿Qué significa cada cosa?", "waage": "Poner en la balanza"}, "fr": {"titel": "Exemples du quotidien", "probieren": "Essayer", "bedeutung": "Que signifie quoi ?", "waage": "Mettre sur la balance"}, "pt": {"titel": "Exemplos do dia a dia", "probieren": "Experimentar", "bedeutung": "O que significa o quê?", "waage": "Colocar na balança"}, "ru": {"titel": "Примеры из жизни", "probieren": "Попробовать", "bedeutung": "Что что значит?", "waage": "Положить на весы"}, "zh": {"titel": "生活中的例子", "probieren": "试一试", "bedeutung": "各部分的含义", "waage": "放到天平上"}, "ja": {"titel": "身近な例", "probieren": "試してみる", "bedeutung": "それぞれの意味", "waage": "てんびんにのせる"}, "ar": {"titel": "أمثلة من الحياة", "probieren": "جرّب", "bedeutung": "ماذا يعني كل جزء؟", "waage": "ضعها على الميزان"}};
  var D = {
"de": {
"linear": [
[
"Milch im Supermarkt",
"Ein Liter Milch kostet 1,15 €. x = Anzahl Liter, f(x) = Gesamtpreis in €.",
"f(x) = 1,15·x: m = 1,15 € pro Liter, t = 0 (0 Liter kosten nichts – Ursprungsgerade, proportional). 2 Liter: f(2) = 1,15·2 = 2,30 €. 3 Liter: f(3) = 1,15·3 = 3,45 €. 6 Liter: f(6) = 1,15·6 = 6,90 €. Rückwärts: Für 9,20 € bekommst du 9,20 : 1,15 = 8 Liter."
],
[
"Handytarif",
"Ein Handytarif kostet 10 € Grundgebühr im Monat und 2 € für jedes Gigabyte. x = Gigabyte, f(x) = Kosten in €.",
"t = 10 ist die Grundgebühr (Kosten bei 0 GB), m = 2 der Preis pro GB: Jedes GB mehr kostet 2 € mehr. Sinnvoll ist nur x ≥ 0."
],
[
"Kerze",
"Eine Kerze ist 20 cm lang und brennt pro Stunde 2,5 cm ab. x = Stunden, f(x) = Länge in cm.",
"t = 20: Länge am Anfang. m = −2,5: Sie wird jede Stunde 2,5 cm kürzer (fallende Gerade). Nullstelle x = 8: Nach 8 Stunden ist die Kerze abgebrannt. Sinnvoll ist nur 0 ≤ x ≤ 8."
],
[
"Taxifahrt",
"Eine Taxifahrt kostet 4 € Grundpreis und 2,50 € pro Kilometer. x = Kilometer, f(x) = Preis in €.",
"t = 4 € zahlt man schon beim Einsteigen, m = 2,5 € pro km. Wie weit kommst du mit 24 €? Löse 2,5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"Ballwurf",
"Ein Ball wird aus 1,5 m Höhe schräg nach oben geworfen. x = waagerechte Entfernung in m, f(x) = Höhe in m.",
"f(0) = 1,5: Abwurfhöhe. Scheitelpunkt S(10 | 6,5): Nach 10 m ist der Ball am höchsten, 6,5 m hoch. Positive Nullstelle x ≈ 21,4: Dort landet der Ball. Die Parabel ist nach unten geöffnet, weil a < 0."
],
[
"Brückenbogen",
"Ein Brückenbogen ist in der Mitte 8 m hoch. x = Abstand von der Mitte in m, f(x) = Höhe in m.",
"Scheitel S(0 | 8): die höchste Stelle in der Mitte. Nullstellen x = −20 und x = 20: Dort steht der Bogen auf dem Boden – die Spannweite ist 40 m. Der Graph ist achsensymmetrisch, genau wie die Brücke."
],
[
"Kuchenverkauf",
"Beim Schulfest verkauft eure Klasse Kuchen. Je teurer ein Stück, desto weniger Leute kaufen. x = Preis pro Stück in €, f(x) = Gewinn in €.",
"Scheitel S(4 | 90): Bei 4 € pro Stück ist der Gewinn am größten, nämlich 90 €. Nullstellen x = 1 und x = 7: Unter 1 € oder über 7 € macht ihr Verlust (f(x) < 0)."
]
],
"polynom": [
[
"Schachtel falten",
"Aus einem quadratischen Karton (20 cm × 20 cm) schneidest du an den Ecken Quadrate mit der Seitenlänge x aus und faltest eine offene Schachtel. Ihr Volumen ist V(x) = x · (20 − 2x)².",
"Sinnvoll ist nur 0 < x < 10. Hochpunkt bei x = 10/3 ≈ 3,33 cm: So wird die Schachtel am größten, etwa 593 cm³. Nullstellen x = 0 und x = 10 (doppelt): Dann gibt es keine Schachtel."
],
[
"Achterbahn",
"Ein Stück Achterbahn: x = waagerechte Strecke in m, f(x) = Höhe der Schiene in m.",
"Hochpunkt H(5 | 10): Kuppe in 10 m Höhe. Tiefpunkt T(15 | 5): Senke in 5 m Höhe. Wendepunkt W(10 | 7,5): Hier ist die Abfahrt am steilsten – die Bahn wechselt von der Rechts- in die Linkskurve."
]
],
"rational": [
[
"T-Shirts bedrucken",
"Eure Klasse lässt T-Shirts bedrucken: einmalig 600 € für die Druckvorlage, dazu 2 € pro Shirt. Kosten pro Shirt: k(x) = (2x + 600) / x, x = Anzahl Shirts.",
"Polstelle x = 0: Bei sehr wenigen Shirts wird jedes riesig teuer. Waagerechte Asymptote y = 2: Je mehr Shirts, desto näher kommen die Kosten pro Stück an 2 € – darunter geht es nie. Sinnvoll ist nur x > 0."
],
[
"Fahrzeit",
"Bis zur Oma sind es 120 km. x = Geschwindigkeit in km/h, f(x) = Fahrzeit in Stunden.",
"Doppelt so schnell heißt halbe Zeit. Polstelle x = 0: Wer steht, kommt nie an. Asymptote y = 0: Die Zeit wird immer kürzer, aber nie 0. Beispiel: f(80) = 1,5 Stunden."
],
[
"Saftschorle",
"In 10 Litern Schorle sind 2 Liter Saft. Du gießt x Liter reinen Saft dazu. f(x) = Saftanteil (0,2 bedeutet 20 %).",
"f(0) = 0,2: anfangs 20 % Saft. Asymptote y = 1: Mit immer mehr Saft nähert sich der Anteil 100 %, erreicht sie aber nie. Die Polstelle x = −10 hat hier keine Bedeutung – sinnvoll ist nur x ≥ 0."
]
],
"sinus": [
[
"Riesenrad",
"Ein Riesenrad hat 40 m Durchmesser, seine Achse ist 22 m hoch, eine Runde dauert 10 Minuten. Höhe einer Gondel nach t Minuten: h(t) = 20 · sin(2π/10 · (t − 2,5)) + 22.",
"a = 20: der Radius – so weit geht es über und unter die Achse. d = 22: Höhe der Achse (Mittellinie). Periode p = 10 min, darum b = 2π/10. Die Verschiebung sorgt dafür, dass man bei t = 0 ganz unten einsteigt, 2 m über dem Boden."
],
[
"Ebbe und Flut",
"In einem Hafen schwankt der Wasserstand zwischen 1 m bei Ebbe und 4 m bei Flut. Von einer Flut zur nächsten vergehen etwa 12,4 Stunden.",
"d = 2,5 m: mittlerer Wasserstand. a = 1,5 m: halber Unterschied zwischen Ebbe und Flut (Tidenhub 3 m). p ≈ 12,4 h, also b = 2π/12,4 ≈ 0,51."
],
[
"Tageslänge",
"In Berlin ist der kürzeste Tag (21. Dezember) knapp 7,7 Stunden hell, der längste (21. Juni) etwa 16,8 Stunden.",
"d ≈ 12,2 h: mittlere Tageslänge (im März und September). a ≈ 4,5 h. p = 365 Tage, b = 2π/365. Am steilsten steigt die Kurve im März – dann werden die Tage am schnellsten länger."
],
[
"Steckdose",
"Die Spannung in der Steckdose schwingt 50-mal pro Sekunde hin und her (50 Hertz): U(t) = 325 · sin(2π · 50 · t), t in Sekunden.",
"a = 325 V: Spitzenspannung – die bekannten 230 V sind ein Mittelwert (Effektivwert). p = 1/50 s = 0,02 s, also b = 2π · 50 ≈ 314. d = 0: Die Spannung pendelt um 0, mal plus, mal minus."
]
],
"waage": [
[
"Hefte kaufen",
"3 gleiche Hefte und ein Stift für 2 € kosten zusammen 8 €. Wie teuer ist ein Heft?",
"x = Preis eines Hefts. Die Lösung x = 2 heißt: Ein Heft kostet 2 €."
],
[
"Geschwister",
"Mia ist 3 Jahre älter als ihr Bruder. Zusammen sind sie 21 Jahre alt. Wie alt ist der Bruder?",
"x = Alter des Bruders, Mia ist x + 3. Lösung x = 9: Der Bruder ist 9, Mia 12."
],
[
"Sparen",
"Ben hat 12 € und spart jede Woche 4 €. Lea hat 30 € und spart 1 € pro Woche. Nach wie vielen Wochen haben beide gleich viel?",
"x = Anzahl der Wochen. Lösung x = 6: Nach 6 Wochen haben beide 36 €."
],
[
"Handytarife vergleichen",
"Tarif A: 5 € im Monat und 10 Cent pro Minute. Tarif B: 15 € im Monat und 5 Cent pro Minute. Bei wie vielen Minuten sind beide gleich teuer?",
"x = Minuten. Lösung x = 200: Bei 200 Minuten kosten beide 25 €. Wer mehr telefoniert, fährt mit Tarif B günstiger."
],
[
"Gartenzaun",
"Ein Garten ist doppelt so lang wie breit. Der Zaun rundherum ist 36 m lang. Wie breit ist der Garten?",
"x = Breite, die Länge ist 2x, der Umfang 2 · x + 2 · 2x = 6x. Lösung x = 6: Der Garten ist 6 m breit und 12 m lang."
]
]
},
"en": {
"linear": [
[
"Milk in the supermarket",
"One litre of milk costs €1.15. x = number of litres, f(x) = total price in €.",
"f(x) = 1.15·x: m = €1.15 per litre, t = 0 (0 litres cost nothing – line through the origin, proportional). 2 litres: f(2) = 1.15·2 = €2.30. 3 litres: f(3) = 1.15·3 = €3.45. 6 litres: f(6) = 1.15·6 = €6.90. Backwards: for €9.20 you get 9.20 : 1.15 = 8 litres."
],
[
"Phone plan",
"A phone plan costs a basic fee of 10 € a month plus 2 € for every gigabyte. x = gigabytes, f(x) = cost in €.",
"t = 10 is the basic fee (cost at 0 GB), m = 2 the price per GB: every extra GB costs 2 € more. Only x ≥ 0 makes sense."
],
[
"Candle",
"A candle is 20 cm long and burns down 2.5 cm per hour. x = hours, f(x) = length in cm.",
"t = 20: length at the start. m = −2.5: it gets 2.5 cm shorter every hour (falling line). Zero x = 8: after 8 hours the candle has burnt down. Only 0 ≤ x ≤ 8 makes sense."
],
[
"Taxi ride",
"A taxi ride costs a 4 € base fare plus 2.50 € per kilometre. x = kilometres, f(x) = price in €.",
"You pay t = 4 € as soon as you get in, m = 2.5 € per km. How far can you go with 24 €? Solve 2.5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"Throwing a ball",
"A ball is thrown upwards at an angle from a height of 1.5 m. x = horizontal distance in m, f(x) = height in m.",
"f(0) = 1.5: release height. Vertex S(10, 6.5): after 10 m the ball is highest, 6.5 m up. Positive zero x ≈ 21.4: that is where the ball lands. The parabola opens downwards because a < 0."
],
[
"Bridge arch",
"A bridge arch is 8 m high in the middle. x = distance from the middle in m, f(x) = height in m.",
"Vertex S(0, 8): the highest point in the middle. Zeros x = −20 and x = 20: there the arch meets the ground – the span is 40 m. The graph is symmetric, just like the bridge."
],
[
"Cake sale",
"At the school fair your class sells cake. The more expensive a slice, the fewer people buy. x = price per slice in €, f(x) = profit in €.",
"Vertex S(4, 90): at 4 € a slice the profit is largest, 90 €. Zeros x = 1 and x = 7: below 1 € or above 7 € you make a loss (f(x) < 0)."
]
],
"polynom": [
[
"Folding a box",
"From a square piece of card (20 cm × 20 cm) you cut squares of side x from the corners and fold an open box. Its volume is V(x) = x · (20 − 2x)².",
"Only 0 < x < 10 makes sense. Maximum at x = 10/3 ≈ 3.33 cm: then the box is biggest, about 593 cm³. Zeros x = 0 and x = 10 (double): then there is no box."
],
[
"Roller coaster",
"A piece of roller coaster: x = horizontal distance in m, f(x) = height of the track in m.",
"Maximum H(5, 10): a hilltop 10 m high. Minimum T(15, 5): a dip 5 m high. Inflection point W(10, 7.5): here the descent is steepest – the track switches from a right bend to a left bend."
]
],
"rational": [
[
"Printing T-shirts",
"Your class has T-shirts printed: 600 € once for the print design plus 2 € per shirt. Cost per shirt: k(x) = (2x + 600) / x, x = number of shirts.",
"Pole x = 0: with very few shirts each one is hugely expensive. Horizontal asymptote y = 2: the more shirts, the closer the cost per shirt gets to 2 € – it never goes below. Only x > 0 makes sense."
],
[
"Travel time",
"Grandma lives 120 km away. x = speed in km/h, f(x) = travel time in hours.",
"Twice as fast means half the time. Pole x = 0: if you stand still you never arrive. Asymptote y = 0: the time keeps getting shorter but never reaches 0. Example: f(80) = 1.5 hours."
],
[
"Juice spritzer",
"10 litres of spritzer contain 2 litres of juice. You pour in x litres of pure juice. f(x) = share of juice (0.2 means 20 %).",
"f(0) = 0.2: 20 % juice at the start. Asymptote y = 1: with more and more juice the share approaches 100 % but never reaches it. The pole x = −10 has no meaning here – only x ≥ 0 makes sense."
]
],
"sinus": [
[
"Ferris wheel",
"A Ferris wheel is 40 m across, its axle is 22 m high and one turn takes 10 minutes. Height of a cabin after t minutes: h(t) = 20 · sin(2π/10 · (t − 2.5)) + 22.",
"a = 20: the radius – how far you go above and below the axle. d = 22: height of the axle (middle line). Period p = 10 min, so b = 2π/10. The shift makes you board at the very bottom at t = 0, 2 m above the ground."
],
[
"Tides",
"In a harbour the water level varies between 1 m at low tide and 4 m at high tide. About 12.4 hours pass from one high tide to the next.",
"d = 2.5 m: mean water level. a = 1.5 m: half the difference between low and high tide (tidal range 3 m). p ≈ 12.4 h, so b = 2π/12.4 ≈ 0.51."
],
[
"Length of day",
"In Berlin the shortest day (21 December) has just under 7.7 hours of daylight, the longest (21 June) about 16.8 hours.",
"d ≈ 12.2 h: average day length (in March and September). a ≈ 4.5 h. p = 365 days, b = 2π/365. The curve rises most steeply in March – that is when days get longer fastest."
],
[
"Power socket",
"The voltage in a European socket swings back and forth 50 times a second (50 hertz): U(t) = 325 · sin(2π · 50 · t), t in seconds.",
"a = 325 V: peak voltage – the familiar 230 V is an average (the effective value). p = 1/50 s = 0.02 s, so b = 2π · 50 ≈ 314. d = 0: the voltage swings around 0, sometimes plus, sometimes minus."
]
],
"waage": [
[
"Buying notebooks",
"3 identical notebooks and a pen for 2 € cost 8 € altogether. How much is one notebook?",
"x = price of one notebook. The solution x = 2 means one notebook costs 2 €."
],
[
"Siblings",
"Mia is 3 years older than her brother. Together they are 21 years old. How old is her brother?",
"x = the brother’s age, Mia is x + 3. Solution x = 9: the brother is 9, Mia is 12."
],
[
"Saving money",
"Ben has 12 € and saves 4 € every week. Lea has 30 € and saves 1 € a week. After how many weeks do both have the same amount?",
"x = number of weeks. Solution x = 6: after 6 weeks both have 36 €."
],
[
"Comparing phone plans",
"Plan A: 5 € a month and 10 cents per minute. Plan B: 15 € a month and 5 cents per minute. For how many minutes do both cost the same?",
"x = minutes. Solution x = 200: at 200 minutes both cost 25 €. If you call more, plan B is cheaper."
],
[
"Garden fence",
"A garden is twice as long as it is wide. The fence all around is 36 m long. How wide is the garden?",
"x = width, the length is 2x, the perimeter 2 · x + 2 · 2x = 6x. Solution x = 6: the garden is 6 m wide and 12 m long."
]
]
},
"es": {
"linear": [
[
"Leche en el supermercado",
"Un litro de leche cuesta 1,15 €. x = número de litros, f(x) = precio total en €.",
"f(x) = 1,15·x: m = 1,15 € por litro, t = 0 (0 litros no cuestan nada: recta por el origen, proporcional). 2 litros: f(2) = 1,15·2 = 2,30 €. 3 litros: f(3) = 1,15·3 = 3,45 €. 6 litros: f(6) = 1,15·6 = 6,90 €. Al revés: con 9,20 € compras 9,20 : 1,15 = 8 litros."
],
[
"Tarifa de móvil",
"Una tarifa de móvil cuesta 10 € al mes de cuota fija y 2 € por cada gigabyte. x = gigabytes, f(x) = coste en €.",
"t = 10 es la cuota fija (coste con 0 GB), m = 2 el precio por GB: cada GB más cuesta 2 € más. Solo tiene sentido x ≥ 0."
],
[
"Vela",
"Una vela mide 20 cm y se consume 2,5 cm por hora. x = horas, f(x) = longitud en cm.",
"t = 20: longitud al principio. m = −2,5: cada hora es 2,5 cm más corta (recta decreciente). Cero x = 8: a las 8 horas la vela se ha consumido. Solo tiene sentido 0 ≤ x ≤ 8."
],
[
"Taxi",
"Un viaje en taxi cuesta 4 € de bajada de bandera y 2,50 € por kilómetro. x = kilómetros, f(x) = precio en €.",
"t = 4 € se paga nada más subir, m = 2,5 € por km. ¿Hasta dónde llegas con 24 €? Resuelve 2,5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"Lanzar una pelota",
"Se lanza una pelota hacia arriba en diagonal desde 1,5 m de altura. x = distancia horizontal en m, f(x) = altura en m.",
"f(0) = 1,5: altura de lanzamiento. Vértice S(10; 6,5): a los 10 m la pelota está más alta, a 6,5 m. Cero positivo x ≈ 21,4: ahí cae la pelota. La parábola se abre hacia abajo porque a < 0."
],
[
"Arco de un puente",
"El arco de un puente mide 8 m de alto en el centro. x = distancia al centro en m, f(x) = altura en m.",
"Vértice S(0; 8): el punto más alto, en el centro. Ceros x = −20 y x = 20: ahí el arco toca el suelo; la luz del puente es de 40 m. La gráfica es simétrica, igual que el puente."
],
[
"Venta de pasteles",
"En la fiesta del colegio tu clase vende pastel. Cuanto más caro el trozo, menos gente compra. x = precio por trozo en €, f(x) = beneficio en €.",
"Vértice S(4; 90): con 4 € por trozo el beneficio es máximo, 90 €. Ceros x = 1 y x = 7: por debajo de 1 € o por encima de 7 € perdéis dinero (f(x) < 0)."
]
],
"polynom": [
[
"Plegar una caja",
"De un cartón cuadrado (20 cm × 20 cm) recortas en las esquinas cuadrados de lado x y doblas una caja abierta. Su volumen es V(x) = x · (20 − 2x)².",
"Solo tiene sentido 0 < x < 10. Máximo en x = 10/3 ≈ 3,33 cm: así la caja es la más grande, unos 593 cm³. Ceros x = 0 y x = 10 (doble): entonces no hay caja."
],
[
"Montaña rusa",
"Un tramo de montaña rusa: x = distancia horizontal en m, f(x) = altura del carril en m.",
"Máximo H(5; 10): una cima a 10 m. Mínimo T(15; 5): un valle a 5 m. Punto de inflexión W(10; 7,5): aquí la bajada es más empinada; la vía pasa de curva a la derecha a curva a la izquierda."
]
],
"rational": [
[
"Camisetas impresas",
"Tu clase manda imprimir camisetas: 600 € una sola vez por el diseño y 2 € por camiseta. Coste por camiseta: k(x) = (2x + 600) / x, x = número de camisetas.",
"Polo x = 0: con muy pocas camisetas cada una sale carísima. Asíntota horizontal y = 2: cuantas más camisetas, más se acerca el coste por unidad a 2 €, pero nunca baja de ahí. Solo tiene sentido x > 0."
],
[
"Tiempo de viaje",
"La casa de la abuela está a 120 km. x = velocidad en km/h, f(x) = tiempo de viaje en horas.",
"El doble de rápido es la mitad de tiempo. Polo x = 0: quien está parado nunca llega. Asíntota y = 0: el tiempo es cada vez menor, pero nunca 0. Ejemplo: f(80) = 1,5 horas."
],
[
"Zumo con agua",
"En 10 litros de bebida hay 2 litros de zumo. Añades x litros de zumo puro. f(x) = proporción de zumo (0,2 significa 20 %).",
"f(0) = 0,2: al principio, 20 % de zumo. Asíntota y = 1: con cada vez más zumo la proporción se acerca al 100 %, pero nunca lo alcanza. El polo x = −10 no tiene sentido aquí; solo vale x ≥ 0."
]
],
"sinus": [
[
"Noria",
"Una noria tiene 40 m de diámetro, su eje está a 22 m de altura y una vuelta dura 10 minutos. Altura de una cabina tras t minutos: h(t) = 20 · sen(2π/10 · (t − 2,5)) + 22.",
"a = 20: el radio, lo que se sube y se baja respecto al eje. d = 22: altura del eje (línea media). Periodo p = 10 min, por eso b = 2π/10. El desplazamiento hace que en t = 0 subas abajo del todo, a 2 m del suelo."
],
[
"Mareas",
"En un puerto el nivel del agua varía entre 1 m en bajamar y 4 m en pleamar. De una pleamar a la siguiente pasan unas 12,4 horas.",
"d = 2,5 m: nivel medio. a = 1,5 m: la mitad de la diferencia entre bajamar y pleamar (carrera de marea de 3 m). p ≈ 12,4 h, así que b = 2π/12,4 ≈ 0,51."
],
[
"Duración del día",
"En Berlín el día más corto (21 de diciembre) tiene algo menos de 7,7 horas de luz y el más largo (21 de junio) unas 16,8 horas.",
"d ≈ 12,2 h: duración media del día (en marzo y septiembre). a ≈ 4,5 h. p = 365 días, b = 2π/365. La curva sube más rápido en marzo: entonces los días se alargan más deprisa."
],
[
"Enchufe",
"La tensión de un enchufe europeo oscila 50 veces por segundo (50 hercios): U(t) = 325 · sen(2π · 50 · t), t en segundos.",
"a = 325 V: tensión máxima; los conocidos 230 V son un valor medio (valor eficaz). p = 1/50 s = 0,02 s, así que b = 2π · 50 ≈ 314. d = 0: la tensión oscila alrededor de 0, a veces positiva, a veces negativa."
]
],
"waage": [
[
"Comprar cuadernos",
"3 cuadernos iguales y un bolígrafo de 2 € cuestan en total 8 €. ¿Cuánto cuesta un cuaderno?",
"x = precio de un cuaderno. La solución x = 2 significa: un cuaderno cuesta 2 €."
],
[
"Hermanos",
"Mía tiene 3 años más que su hermano. Juntos suman 21 años. ¿Cuántos años tiene el hermano?",
"x = edad del hermano, Mía tiene x + 3. Solución x = 9: el hermano tiene 9 y Mía 12."
],
[
"Ahorrar",
"Ben tiene 12 € y ahorra 4 € cada semana. Lea tiene 30 € y ahorra 1 € por semana. ¿Después de cuántas semanas tienen lo mismo?",
"x = número de semanas. Solución x = 6: a las 6 semanas los dos tienen 36 €."
],
[
"Comparar tarifas",
"Tarifa A: 5 € al mes y 10 céntimos por minuto. Tarifa B: 15 € al mes y 5 céntimos por minuto. ¿Con cuántos minutos cuestan lo mismo?",
"x = minutos. Solución x = 200: con 200 minutos ambas cuestan 25 €. Quien habla más, ahorra con la tarifa B."
],
[
"Valla del jardín",
"Un jardín es el doble de largo que de ancho. La valla que lo rodea mide 36 m. ¿Qué ancho tiene el jardín?",
"x = ancho, el largo es 2x, el perímetro 2 · x + 2 · 2x = 6x. Solución x = 6: el jardín mide 6 m de ancho y 12 m de largo."
]
]
},
"fr": {
"linear": [
[
"Lait au supermarché",
"Un litre de lait coûte 1,15 €. x = nombre de litres, f(x) = prix total en €.",
"f(x) = 1,15·x : m = 1,15 € par litre, t = 0 (0 litre ne coûte rien – droite passant par l’origine, proportionnalité). 2 litres : f(2) = 1,15·2 = 2,30 €. 3 litres : f(3) = 1,15·3 = 3,45 €. 6 litres : f(6) = 1,15·6 = 6,90 €. À l’envers : avec 9,20 € tu as 9,20 : 1,15 = 8 litres."
],
[
"Forfait mobile",
"Un forfait mobile coûte 10 € par mois d’abonnement plus 2 € par gigaoctet. x = gigaoctets, f(x) = coût en €.",
"t = 10 est l’abonnement (coût pour 0 Go), m = 2 le prix par Go : chaque Go en plus coûte 2 € de plus. Seul x ≥ 0 a un sens."
],
[
"Bougie",
"Une bougie mesure 20 cm et diminue de 2,5 cm par heure. x = heures, f(x) = longueur en cm.",
"t = 20 : longueur au départ. m = −2,5 : elle raccourcit de 2,5 cm chaque heure (droite décroissante). Zéro x = 8 : au bout de 8 heures la bougie est consumée. Seul 0 ≤ x ≤ 8 a un sens."
],
[
"Course en taxi",
"Une course en taxi coûte 4 € de prise en charge plus 2,50 € par kilomètre. x = kilomètres, f(x) = prix en €.",
"On paie t = 4 € dès qu’on monte, m = 2,5 € par km. Jusqu’où va-t-on avec 24 € ? Résous 2,5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"Lancer de ballon",
"On lance un ballon vers le haut, en biais, depuis 1,5 m de hauteur. x = distance horizontale en m, f(x) = hauteur en m.",
"f(0) = 1,5 : hauteur de lancer. Sommet S(10 ; 6,5) : après 10 m le ballon est au plus haut, à 6,5 m. Zéro positif x ≈ 21,4 : c’est là qu’il retombe. La parabole est tournée vers le bas car a < 0."
],
[
"Arche de pont",
"L’arche d’un pont mesure 8 m de haut au milieu. x = distance au milieu en m, f(x) = hauteur en m.",
"Sommet S(0 ; 8) : le point le plus haut, au milieu. Zéros x = −20 et x = 20 : l’arche y touche le sol – la portée est de 40 m. Le graphe est symétrique, comme le pont."
],
[
"Vente de gâteaux",
"À la fête de l’école, ta classe vend des gâteaux. Plus la part est chère, moins les gens achètent. x = prix d’une part en €, f(x) = bénéfice en €.",
"Sommet S(4 ; 90) : à 4 € la part, le bénéfice est maximal, 90 €. Zéros x = 1 et x = 7 : en dessous de 1 € ou au-dessus de 7 €, vous perdez de l’argent (f(x) < 0)."
]
],
"polynom": [
[
"Plier une boîte",
"Dans un carton carré (20 cm × 20 cm), tu découpes aux coins des carrés de côté x et tu plies une boîte ouverte. Son volume est V(x) = x · (20 − 2x)².",
"Seul 0 < x < 10 a un sens. Maximum en x = 10/3 ≈ 3,33 cm : la boîte est alors la plus grande, environ 593 cm³. Zéros x = 0 et x = 10 (double) : il n’y a plus de boîte."
],
[
"Montagnes russes",
"Un tronçon de montagnes russes : x = distance horizontale en m, f(x) = hauteur du rail en m.",
"Maximum H(5 ; 10) : une bosse à 10 m. Minimum T(15 ; 5) : un creux à 5 m. Point d’inflexion W(10 ; 7,5) : la descente y est la plus raide – le rail passe d’un virage à droite à un virage à gauche."
]
],
"rational": [
[
"T-shirts imprimés",
"Ta classe fait imprimer des T-shirts : 600 € une seule fois pour le modèle, plus 2 € par T-shirt. Coût par T-shirt : k(x) = (2x + 600) / x, x = nombre de T-shirts.",
"Pôle x = 0 : avec très peu de T-shirts, chacun coûte une fortune. Asymptote horizontale y = 2 : plus il y a de T-shirts, plus le coût unitaire s’approche de 2 € – sans jamais descendre en dessous. Seul x > 0 a un sens."
],
[
"Durée du trajet",
"Mamie habite à 120 km. x = vitesse en km/h, f(x) = durée du trajet en heures.",
"Deux fois plus vite, c’est deux fois moins de temps. Pôle x = 0 : à l’arrêt, on n’arrive jamais. Asymptote y = 0 : la durée diminue toujours, sans jamais atteindre 0. Exemple : f(80) = 1,5 heure."
],
[
"Jus allongé",
"Dans 10 litres de boisson, il y a 2 litres de jus. Tu ajoutes x litres de jus pur. f(x) = part de jus (0,2 signifie 20 %).",
"f(0) = 0,2 : 20 % de jus au départ. Asymptote y = 1 : avec de plus en plus de jus, la part s’approche de 100 % sans l’atteindre. Le pôle x = −10 n’a pas de sens ici – seul x ≥ 0 compte."
]
],
"sinus": [
[
"Grande roue",
"Une grande roue a 40 m de diamètre, son axe est à 22 m de haut et un tour dure 10 minutes. Hauteur d’une nacelle après t minutes : h(t) = 20 · sin(2π/10 · (t − 2,5)) + 22.",
"a = 20 : le rayon – on monte et descend d’autant autour de l’axe. d = 22 : hauteur de l’axe (ligne médiane). Période p = 10 min, donc b = 2π/10. Le décalage fait qu’à t = 0 on monte tout en bas, à 2 m du sol."
],
[
"Marées",
"Dans un port, le niveau de l’eau varie entre 1 m à marée basse et 4 m à marée haute. Il s’écoule environ 12,4 heures entre deux marées hautes.",
"d = 2,5 m : niveau moyen. a = 1,5 m : la moitié de l’écart entre marée basse et haute (marnage de 3 m). p ≈ 12,4 h, donc b = 2π/12,4 ≈ 0,51."
],
[
"Durée du jour",
"À Berlin, le jour le plus court (21 décembre) dure un peu moins de 7,7 heures, le plus long (21 juin) environ 16,8 heures.",
"d ≈ 12,2 h : durée moyenne du jour (en mars et en septembre). a ≈ 4,5 h. p = 365 jours, b = 2π/365. La courbe monte le plus vite en mars – c’est alors que les jours rallongent le plus vite."
],
[
"Prise électrique",
"La tension d’une prise européenne oscille 50 fois par seconde (50 hertz) : U(t) = 325 · sin(2π · 50 · t), t en secondes.",
"a = 325 V : tension de crête – les fameux 230 V sont une moyenne (valeur efficace). p = 1/50 s = 0,02 s, donc b = 2π · 50 ≈ 314. d = 0 : la tension oscille autour de 0, tantôt positive, tantôt négative."
]
],
"waage": [
[
"Acheter des cahiers",
"3 cahiers identiques et un stylo à 2 € coûtent 8 € en tout. Combien coûte un cahier ?",
"x = prix d’un cahier. La solution x = 2 signifie : un cahier coûte 2 €."
],
[
"Frère et sœur",
"Mia a 3 ans de plus que son frère. Ensemble, ils ont 21 ans. Quel âge a son frère ?",
"x = âge du frère, Mia a x + 3 ans. Solution x = 9 : le frère a 9 ans, Mia 12."
],
[
"Économiser",
"Ben a 12 € et économise 4 € par semaine. Léa a 30 € et économise 1 € par semaine. Au bout de combien de semaines ont-ils la même somme ?",
"x = nombre de semaines. Solution x = 6 : après 6 semaines, chacun a 36 €."
],
[
"Comparer des forfaits",
"Forfait A : 5 € par mois et 10 centimes la minute. Forfait B : 15 € par mois et 5 centimes la minute. Pour combien de minutes coûtent-ils la même chose ?",
"x = minutes. Solution x = 200 : à 200 minutes, les deux coûtent 25 €. Si l’on téléphone plus, le forfait B est moins cher."
],
[
"Clôture du jardin",
"Un jardin est deux fois plus long que large. La clôture tout autour mesure 36 m. Quelle est la largeur du jardin ?",
"x = largeur, la longueur vaut 2x, le périmètre 2 · x + 2 · 2x = 6x. Solution x = 6 : le jardin fait 6 m de large et 12 m de long."
]
]
},
"pt": {
"linear": [
[
"Leite no supermercado",
"Um litro de leite custa 1,15 €. x = número de litros, f(x) = preço total em €.",
"f(x) = 1,15·x: m = 1,15 € por litro, t = 0 (0 litro não custa nada – reta pela origem, proporcional). 2 litros: f(2) = 1,15·2 = 2,30 €. 3 litros: f(3) = 1,15·3 = 3,45 €. 6 litros: f(6) = 1,15·6 = 6,90 €. Ao contrário: com 9,20 € você compra 9,20 : 1,15 = 8 litros."
],
[
"Plano de celular",
"Um plano de celular custa 10 € por mês de assinatura e 2 € por gigabyte. x = gigabytes, f(x) = custo em €.",
"t = 10 é a assinatura (custo com 0 GB), m = 2 o preço por GB: cada GB a mais custa 2 € a mais. Só faz sentido x ≥ 0."
],
[
"Vela",
"Uma vela tem 20 cm e queima 2,5 cm por hora. x = horas, f(x) = comprimento em cm.",
"t = 20: comprimento no início. m = −2,5: a cada hora fica 2,5 cm mais curta (reta decrescente). Zero x = 8: depois de 8 horas a vela acabou. Só faz sentido 0 ≤ x ≤ 8."
],
[
"Corrida de táxi",
"Uma corrida de táxi custa 4 € de bandeirada e 2,50 € por quilômetro. x = quilômetros, f(x) = preço em €.",
"t = 4 € se paga ao entrar, m = 2,5 € por km. Até onde você vai com 24 €? Resolva 2,5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"Lançar uma bola",
"Uma bola é lançada para cima, em diagonal, de 1,5 m de altura. x = distância horizontal em m, f(x) = altura em m.",
"f(0) = 1,5: altura de lançamento. Vértice V(10; 6,5): depois de 10 m a bola está mais alta, a 6,5 m. Zero positivo x ≈ 21,4: ali a bola cai. A parábola tem concavidade para baixo porque a < 0."
],
[
"Arco de ponte",
"O arco de uma ponte tem 8 m de altura no meio. x = distância do meio em m, f(x) = altura em m.",
"Vértice V(0; 8): o ponto mais alto, no meio. Zeros x = −20 e x = 20: ali o arco toca o chão – o vão é de 40 m. O gráfico é simétrico, como a ponte."
],
[
"Venda de bolo",
"Na festa da escola sua turma vende bolo. Quanto mais caro o pedaço, menos gente compra. x = preço por pedaço em €, f(x) = lucro em €.",
"Vértice V(4; 90): com 4 € por pedaço o lucro é máximo, 90 €. Zeros x = 1 e x = 7: abaixo de 1 € ou acima de 7 € vocês têm prejuízo (f(x) < 0)."
]
],
"polynom": [
[
"Dobrar uma caixa",
"De um papelão quadrado (20 cm × 20 cm) você corta nos cantos quadrados de lado x e dobra uma caixa aberta. O volume é V(x) = x · (20 − 2x)².",
"Só faz sentido 0 < x < 10. Máximo em x = 10/3 ≈ 3,33 cm: assim a caixa fica maior, cerca de 593 cm³. Zeros x = 0 e x = 10 (duplo): aí não há caixa."
],
[
"Montanha-russa",
"Um trecho de montanha-russa: x = distância horizontal em m, f(x) = altura do trilho em m.",
"Máximo H(5; 10): um topo a 10 m. Mínimo T(15; 5): um vale a 5 m. Ponto de inflexão W(10; 7,5): aqui a descida é mais íngreme – o trilho passa de curva à direita para curva à esquerda."
]
],
"rational": [
[
"Camisetas estampadas",
"Sua turma manda estampar camisetas: 600 € uma única vez pela arte e 2 € por camiseta. Custo por camiseta: k(x) = (2x + 600) / x, x = número de camisetas.",
"Polo x = 0: com pouquíssimas camisetas cada uma sai caríssima. Assíntota horizontal y = 2: quanto mais camisetas, mais o custo por unidade se aproxima de 2 € – nunca fica abaixo disso. Só faz sentido x > 0."
],
[
"Tempo de viagem",
"A casa da avó fica a 120 km. x = velocidade em km/h, f(x) = tempo de viagem em horas.",
"O dobro da velocidade é metade do tempo. Polo x = 0: quem está parado nunca chega. Assíntota y = 0: o tempo fica cada vez menor, mas nunca 0. Exemplo: f(80) = 1,5 hora."
],
[
"Suco diluído",
"Em 10 litros de bebida há 2 litros de suco. Você acrescenta x litros de suco puro. f(x) = proporção de suco (0,2 significa 20 %).",
"f(0) = 0,2: no início, 20 % de suco. Assíntota y = 1: com cada vez mais suco a proporção se aproxima de 100 %, mas nunca chega. O polo x = −10 não tem sentido aqui – só vale x ≥ 0."
]
],
"sinus": [
[
"Roda-gigante",
"Uma roda-gigante tem 40 m de diâmetro, seu eixo fica a 22 m de altura e uma volta dura 10 minutos. Altura de uma cabine após t minutos: h(t) = 20 · sen(2π/10 · (t − 2,5)) + 22.",
"a = 20: o raio – quanto se sobe e desce em relação ao eixo. d = 22: altura do eixo (linha média). Período p = 10 min, por isso b = 2π/10. O deslocamento faz com que em t = 0 se embarque lá embaixo, a 2 m do chão."
],
[
"Marés",
"Num porto o nível da água varia entre 1 m na maré baixa e 4 m na maré alta. De uma maré alta à seguinte passam cerca de 12,4 horas.",
"d = 2,5 m: nível médio. a = 1,5 m: metade da diferença entre maré baixa e alta (amplitude de maré de 3 m). p ≈ 12,4 h, então b = 2π/12,4 ≈ 0,51."
],
[
"Duração do dia",
"Em Berlim o dia mais curto (21 de dezembro) tem pouco menos de 7,7 horas de luz e o mais longo (21 de junho) cerca de 16,8 horas.",
"d ≈ 12,2 h: duração média do dia (em março e setembro). a ≈ 4,5 h. p = 365 dias, b = 2π/365. A curva sobe mais rápido em março – é quando os dias crescem mais depressa."
],
[
"Tomada",
"A tensão de uma tomada europeia oscila 50 vezes por segundo (50 hertz): U(t) = 325 · sen(2π · 50 · t), t em segundos.",
"a = 325 V: tensão de pico – os conhecidos 230 V são um valor médio (valor eficaz). p = 1/50 s = 0,02 s, então b = 2π · 50 ≈ 314. d = 0: a tensão oscila em torno de 0, ora positiva, ora negativa."
]
],
"waage": [
[
"Comprar cadernos",
"3 cadernos iguais e uma caneta de 2 € custam juntos 8 €. Quanto custa um caderno?",
"x = preço de um caderno. A solução x = 2 significa: um caderno custa 2 €."
],
[
"Irmãos",
"Mia é 3 anos mais velha que o irmão. Juntos eles têm 21 anos. Quantos anos tem o irmão?",
"x = idade do irmão, Mia tem x + 3. Solução x = 9: o irmão tem 9 anos, Mia 12."
],
[
"Poupar",
"Ben tem 12 € e poupa 4 € por semana. Lea tem 30 € e poupa 1 € por semana. Depois de quantas semanas os dois têm o mesmo valor?",
"x = número de semanas. Solução x = 6: depois de 6 semanas os dois têm 36 €."
],
[
"Comparar planos",
"Plano A: 5 € por mês e 10 centavos por minuto. Plano B: 15 € por mês e 5 centavos por minuto. Com quantos minutos os dois custam o mesmo?",
"x = minutos. Solução x = 200: com 200 minutos ambos custam 25 €. Quem fala mais economiza com o plano B."
],
[
"Cerca do jardim",
"Um jardim é duas vezes mais comprido do que largo. A cerca em volta mede 36 m. Qual é a largura do jardim?",
"x = largura, o comprimento é 2x, o perímetro 2 · x + 2 · 2x = 6x. Solução x = 6: o jardim tem 6 m de largura e 12 m de comprimento."
]
]
},
"ru": {
"linear": [
[
"Молоко в супермаркете",
"Литр молока стоит 1,15 €. x = число литров, f(x) = общая цена в €.",
"f(x) = 1,15·x: m = 1,15 € за литр, t = 0 (0 литров ничего не стоят – прямая через начало координат, пропорциональность). 2 литра: f(2) = 1,15·2 = 2,30 €. 3 литра: f(3) = 1,15·3 = 3,45 €. 6 литров: f(6) = 1,15·6 = 6,90 €. Обратно: на 9,20 € купишь 9,20 : 1,15 = 8 литров."
],
[
"Мобильный тариф",
"Тариф стоит 10 € абонентской платы в месяц и 2 € за каждый гигабайт. x — гигабайты, f(x) — стоимость в €.",
"t = 10 — абонентская плата (стоимость при 0 ГБ), m = 2 — цена за ГБ: каждый лишний ГБ стоит на 2 € больше. Смысл имеет только x ≥ 0."
],
[
"Свеча",
"Свеча длиной 20 см сгорает на 2,5 см в час. x — часы, f(x) — длина в см.",
"t = 20 — длина в начале. m = −2,5 — каждый час свеча короче на 2,5 см (убывающая прямая). Нуль x = 8: через 8 часов свеча сгорела. Смысл имеет только 0 ≤ x ≤ 8."
],
[
"Такси",
"Поездка на такси стоит 4 € за посадку и 2,50 € за километр. x — километры, f(x) — цена в €.",
"t = 4 € платишь сразу при посадке, m = 2,5 € за км. Как далеко уедешь на 24 €? Реши 2,5x + 4 = 24 → x = 8 км."
]
],
"quadratisch": [
[
"Бросок мяча",
"Мяч бросают вверх под углом с высоты 1,5 м. x — расстояние по горизонтали в м, f(x) — высота в м.",
"f(0) = 1,5 — высота броска. Вершина S(10; 6,5): через 10 м мяч выше всего, на 6,5 м. Положительный нуль x ≈ 21,4: там мяч падает. Ветви направлены вниз, потому что a < 0."
],
[
"Арка моста",
"Арка моста в середине высотой 8 м. x — расстояние от середины в м, f(x) — высота в м.",
"Вершина S(0; 8) — самая высокая точка посередине. Нули x = −20 и x = 20: там арка касается земли, пролёт 40 м. График симметричен, как и мост."
],
[
"Продажа пирогов",
"На школьном празднике ваш класс продаёт пироги. Чем дороже кусок, тем меньше покупают. x — цена куска в €, f(x) — прибыль в €.",
"Вершина S(4; 90): при цене 4 € прибыль наибольшая — 90 €. Нули x = 1 и x = 7: дешевле 1 € или дороже 7 € — убыток (f(x) < 0)."
]
],
"polynom": [
[
"Коробка из картона",
"Из квадратного картона 20 см × 20 см по углам вырезают квадраты со стороной x и складывают открытую коробку. Её объём V(x) = x · (20 − 2x)².",
"Смысл имеет только 0 < x < 10. Максимум при x = 10/3 ≈ 3,33 см: коробка самая большая, около 593 см³. Нули x = 0 и x = 10 (двукратный): коробки нет."
],
[
"Американские горки",
"Участок американских горок: x — расстояние по горизонтали в м, f(x) — высота рельса в м.",
"Максимум H(5; 10): вершина на высоте 10 м. Минимум T(15; 5): впадина на высоте 5 м. Точка перегиба W(10; 7,5): здесь спуск самый крутой — поворот вправо сменяется поворотом влево."
]
],
"rational": [
[
"Футболки с принтом",
"Класс заказывает футболки с принтом: один раз 600 € за макет и по 2 € за футболку. Стоимость одной: k(x) = (2x + 600) / x, x — число футболок.",
"Полюс x = 0: при очень малом числе футболок каждая страшно дорогая. Горизонтальная асимптота y = 2: чем больше футболок, тем ближе цена штуки к 2 € — но ниже не бывает. Смысл имеет только x > 0."
],
[
"Время в пути",
"До бабушки 120 км. x — скорость в км/ч, f(x) — время в пути в часах.",
"Вдвое быстрее — вдвое меньше времени. Полюс x = 0: стоя на месте, не доедешь. Асимптота y = 0: время всё меньше, но никогда не 0. Пример: f(80) = 1,5 часа."
],
[
"Разбавленный сок",
"В 10 литрах напитка 2 литра сока. Ты доливаешь x литров чистого сока. f(x) — доля сока (0,2 значит 20 %).",
"f(0) = 0,2: сначала 20 % сока. Асимптота y = 1: с добавлением сока доля приближается к 100 %, но не достигает их. Полюс x = −10 здесь смысла не имеет — только x ≥ 0."
]
],
"sinus": [
[
"Колесо обозрения",
"Колесо обозрения диаметром 40 м, его ось на высоте 22 м, один оборот — 10 минут. Высота кабинки через t минут: h(t) = 20 · sin(2π/10 · (t − 2,5)) + 22.",
"a = 20 — радиус: на столько поднимаешься выше и опускаешься ниже оси. d = 22 — высота оси (средняя линия). Период p = 10 мин, поэтому b = 2π/10. Сдвиг делает так, что при t = 0 садишься в самом низу, в 2 м над землёй."
],
[
"Приливы и отливы",
"В гавани уровень воды меняется от 1 м при отливе до 4 м при приливе. От прилива до прилива проходит около 12,4 часа.",
"d = 2,5 м — средний уровень. a = 1,5 м — половина разницы между отливом и приливом (3 м). p ≈ 12,4 ч, значит b = 2π/12,4 ≈ 0,51."
],
[
"Длина дня",
"В Берлине самый короткий день (21 декабря) длится чуть меньше 7,7 часа, самый длинный (21 июня) — около 16,8 часа.",
"d ≈ 12,2 ч — средняя длина дня (в марте и сентябре). a ≈ 4,5 ч. p = 365 дней, b = 2π/365. Круче всего кривая растёт в марте — тогда дни удлиняются быстрее всего."
],
[
"Розетка",
"Напряжение в европейской розетке колеблется 50 раз в секунду (50 герц): U(t) = 325 · sin(2π · 50 · t), t в секундах.",
"a = 325 В — пиковое напряжение; привычные 230 В — это среднее (действующее значение). p = 1/50 с = 0,02 с, значит b = 2π · 50 ≈ 314. d = 0: напряжение колеблется около 0, то плюс, то минус."
]
],
"waage": [
[
"Тетради",
"3 одинаковые тетради и ручка за 2 € стоят вместе 8 €. Сколько стоит одна тетрадь?",
"x — цена тетради. Решение x = 2: одна тетрадь стоит 2 €."
],
[
"Брат и сестра",
"Мия на 3 года старше брата. Вместе им 21 год. Сколько лет брату?",
"x — возраст брата, Мии x + 3. Решение x = 9: брату 9, Мии 12."
],
[
"Копилка",
"У Бена 12 €, он откладывает по 4 € в неделю. У Леи 30 €, она откладывает по 1 € в неделю. Через сколько недель у них будет поровну?",
"x — число недель. Решение x = 6: через 6 недель у обоих по 36 €."
],
[
"Сравнение тарифов",
"Тариф A: 5 € в месяц и 10 центов за минуту. Тариф B: 15 € в месяц и 5 центов за минуту. При скольких минутах они стоят одинаково?",
"x — минуты. Решение x = 200: при 200 минутах оба стоят 25 €. Кто говорит больше, тому выгоднее тариф B."
],
[
"Забор вокруг сада",
"Сад вдвое длиннее, чем шире. Забор вокруг него длиной 36 м. Какова ширина сада?",
"x — ширина, длина 2x, периметр 2 · x + 2 · 2x = 6x. Решение x = 6: сад шириной 6 м и длиной 12 м."
]
]
},
"zh": {
"linear": [
[
"超市里的牛奶",
"1 升牛奶 1.15 €。x = 升数，f(x) = 总价（€）。",
"f(x) = 1.15·x：m = 每升 1.15 €，t = 0（0 升不花钱——过原点的直线，成正比）。2 升：f(2) = 1.15·2 = 2.30 €。3 升：f(3) = 1.15·3 = 3.45 €。6 升：f(6) = 1.15·6 = 6.90 €。反过来：9.20 € 能买 9.20 : 1.15 = 8 升。"
],
[
"手机套餐",
"某手机套餐每月月租 10 €，每用 1 GB 流量再付 2 €。x = 流量（GB），f(x) = 费用（€）。",
"t = 10 是月租（0 GB 时的费用），m = 2 是每 GB 的价格：每多 1 GB 多花 2 €。只有 x ≥ 0 有意义。"
],
[
"蜡烛",
"一根蜡烛长 20 cm，每小时烧掉 2.5 cm。x = 小时，f(x) = 长度（cm）。",
"t = 20：开始时的长度。m = −2.5：每小时短 2.5 cm（下降的直线）。零点 x = 8：8 小时后蜡烛烧完。只有 0 ≤ x ≤ 8 有意义。"
],
[
"打车",
"打车起步价 4 €，每公里 2.50 €。x = 公里数，f(x) = 价格（€）。",
"上车就付 t = 4 €，每公里 m = 2.5 €。24 € 能坐多远？解 2.5x + 4 = 24 → x = 8 km。"
]
],
"quadratisch": [
[
"抛球",
"从 1.5 m 高处斜向上抛出一个球。x = 水平距离（m），f(x) = 高度（m）。",
"f(0) = 1.5：出手高度。顶点 S(10, 6.5)：水平飞出 10 m 时球最高，6.5 m。正零点 x ≈ 21.4：球落地的位置。因为 a < 0，抛物线开口向下。"
],
[
"桥拱",
"一座桥的拱中间高 8 m。x = 到中间的距离（m），f(x) = 高度（m）。",
"顶点 S(0, 8)：中间最高点。零点 x = −20 和 x = 20：拱在那里落地，跨度 40 m。图像左右对称，就像桥一样。"
],
[
"义卖蛋糕",
"学校节日上你们班卖蛋糕。每块越贵，买的人越少。x = 每块价格（€），f(x) = 利润（€）。",
"顶点 S(4, 90)：每块卖 4 € 时利润最大，为 90 €。零点 x = 1 和 x = 7：低于 1 € 或高于 7 € 就会亏本（f(x) < 0）。"
]
],
"polynom": [
[
"折纸盒",
"从 20 cm × 20 cm 的正方形纸板四角各剪去边长为 x 的正方形，折成无盖盒子。体积 V(x) = x · (20 − 2x)²。",
"只有 0 < x < 10 有意义。极大值在 x = 10/3 ≈ 3.33 cm：此时盒子最大，约 593 cm³。零点 x = 0 和 x = 10（二重）：就没有盒子了。"
],
[
"过山车",
"一段过山车轨道：x = 水平距离（m），f(x) = 轨道高度（m）。",
"极大值点 H(5, 10)：10 m 高的坡顶。极小值点 T(15, 5)：5 m 高的谷底。拐点 W(10, 7.5)：这里下坡最陡，轨道从右弯变成左弯。"
]
],
"rational": [
[
"印文化衫",
"你们班定制文化衫：设计费一次 600 €，每件另付 2 €。每件成本 k(x) = (2x + 600) / x，x = 件数。",
"极点 x = 0：件数很少时每件贵得离谱。水平渐近线 y = 2：件数越多，每件成本越接近 2 €，但永远不会低于 2 €。只有 x > 0 有意义。"
],
[
"路程时间",
"去奶奶家有 120 km。x = 速度（km/h），f(x) = 行驶时间（小时）。",
"速度加倍，时间减半。极点 x = 0：停着不动永远到不了。渐近线 y = 0：时间越来越短，但永远不是 0。例：f(80) = 1.5 小时。"
],
[
"兑水果汁",
"10 升饮料中含 2 升果汁。你再倒入 x 升纯果汁。f(x) = 果汁所占比例（0.2 表示 20%）。",
"f(0) = 0.2：开始时 20% 是果汁。渐近线 y = 1：果汁越加越多，比例接近 100%，但达不到。极点 x = −10 在这里没有意义，只有 x ≥ 0 有意义。"
]
],
"sinus": [
[
"摩天轮",
"摩天轮直径 40 m，轴高 22 m，转一圈 10 分钟。t 分钟后座舱的高度：h(t) = 20 · sin(2π/10 · (t − 2.5)) + 22。",
"a = 20：半径——在轴上下各移动这么多。d = 22：轴的高度（中线）。周期 p = 10 分钟，所以 b = 2π/10。平移使得 t = 0 时从最低处上车，离地 2 m。"
],
[
"潮汐",
"某港口的水位在低潮 1 m 与高潮 4 m 之间变化。两次高潮相隔约 12.4 小时。",
"d = 2.5 m：平均水位。a = 1.5 m：高低潮差的一半（潮差 3 m）。p ≈ 12.4 小时，所以 b = 2π/12.4 ≈ 0.51。"
],
[
"白昼长度",
"在柏林，最短的一天（12 月 21 日）白昼不到 7.7 小时，最长的一天（6 月 21 日）约 16.8 小时。",
"d ≈ 12.2 小时：平均白昼长度（3 月和 9 月）。a ≈ 4.5 小时。p = 365 天，b = 2π/365。曲线在 3 月上升最快——这时白天变长得最快。"
],
[
"插座",
"欧洲插座的电压每秒来回振动 50 次（50 赫兹）：U(t) = 325 · sin(2π · 50 · t)，t 以秒计。",
"a = 325 V：峰值电压——常说的 230 V 是平均意义上的有效值。p = 1/50 秒 = 0.02 秒，所以 b = 2π · 50 ≈ 314。d = 0：电压围绕 0 上下变化，时正时负。"
]
],
"waage": [
[
"买本子",
"3 本同样的本子和一支 2 € 的笔一共 8 €。一本本子多少钱？",
"x = 一本本子的价格。解 x = 2：一本本子 2 €。"
],
[
"兄妹",
"米娅比她弟弟大 3 岁，两人年龄加起来 21 岁。弟弟几岁？",
"x = 弟弟的年龄，米娅是 x + 3。解 x = 9：弟弟 9 岁，米娅 12 岁。"
],
[
"存钱",
"本有 12 €，每周存 4 €。莉娅有 30 €，每周存 1 €。几周后两人的钱一样多？",
"x = 周数。解 x = 6：6 周后两人都有 36 €。"
],
[
"比较套餐",
"套餐 A：每月 5 €，每分钟 10 分。套餐 B：每月 15 €，每分钟 5 分。通话多少分钟时两者一样贵？",
"x = 分钟数。解 x = 200：200 分钟时都要 25 €。打得更多的人用套餐 B 更省钱。"
],
[
"花园围栏",
"一个花园的长是宽的 2 倍，四周的围栏长 36 m。花园有多宽？",
"x = 宽，长为 2x，周长 2 · x + 2 · 2x = 6x。解 x = 6：花园宽 6 m，长 12 m。"
]
]
},
"ja": {
"linear": [
[
"スーパーの牛乳",
"牛乳 1 L は 1.15 €。x = 何 L、f(x) = 合計金額（€）。",
"f(x) = 1.15·x：m = 1 L あたり 1.15 €、t = 0（0 L なら 0 € ――原点を通る直線、比例）。2 L：f(2) = 1.15·2 = 2.30 €。3 L：f(3) = 1.15·3 = 3.45 €。6 L：f(6) = 1.15·6 = 6.90 €。逆に：9.20 € なら 9.20 : 1.15 = 8 L。"
],
[
"スマホの料金",
"スマホのプランは基本料金が月 10 €、データ 1 GB ごとに 2 €。x = ギガバイト、f(x) = 料金（€）。",
"t = 10 は基本料金（0 GB のときの料金）、m = 2 は 1 GB あたりの値段：1 GB 増えるごとに 2 € 高くなります。意味があるのは x ≥ 0 だけ。"
],
[
"ろうそく",
"長さ 20 cm のろうそくが 1 時間に 2.5 cm ずつ燃えます。x = 時間、f(x) = 長さ（cm）。",
"t = 20：最初の長さ。m = −2.5：1 時間ごとに 2.5 cm 短くなる（右下がりの直線）。零点 x = 8：8 時間で燃えつきます。意味があるのは 0 ≤ x ≤ 8。"
],
[
"タクシー",
"タクシーは初乗り 4 €、1 km ごとに 2.50 €。x = キロメートル、f(x) = 料金（€）。",
"乗った瞬間に t = 4 €、1 km ごとに m = 2.5 €。24 € でどこまで行ける？ 2.5x + 4 = 24 を解くと x = 8 km。"
]
],
"quadratisch": [
[
"ボール投げ",
"高さ 1.5 m からボールを斜め上に投げます。x = 水平距離（m）、f(x) = 高さ（m）。",
"f(0) = 1.5：投げた高さ。頂点 S(10, 6.5)：10 m 進んだところでいちばん高く、6.5 m。正の零点 x ≈ 21.4：ボールが落ちる場所。a < 0 なので下に開く放物線です。"
],
[
"橋のアーチ",
"橋のアーチは真ん中で高さ 8 m。x = 真ん中からの距離（m）、f(x) = 高さ（m）。",
"頂点 S(0, 8)：真ん中のいちばん高い点。零点 x = −20 と x = 20：アーチが地面に着く所で、幅は 40 m。グラフは橋と同じく左右対称です。"
],
[
"ケーキ販売",
"学校祭でクラスがケーキを売ります。1 切れが高いほど買う人は減ります。x = 1 切れの値段（€）、f(x) = 利益（€）。",
"頂点 S(4, 90)：1 切れ 4 € のとき利益が最大で 90 €。零点 x = 1 と x = 7：1 € より安いか 7 € より高いと赤字（f(x) < 0）。"
]
],
"polynom": [
[
"箱を折る",
"20 cm × 20 cm の正方形の厚紙の四すみから 1 辺 x の正方形を切り取り、ふたのない箱を作ります。体積は V(x) = x · (20 − 2x)²。",
"意味があるのは 0 < x < 10。極大は x = 10/3 ≈ 3.33 cm：箱がいちばん大きくなり、約 593 cm³。零点 x = 0 と x = 10（2 重）：箱ができません。"
],
[
"ジェットコースター",
"ジェットコースターの一部：x = 水平距離（m）、f(x) = レールの高さ（m）。",
"極大点 H(5, 10)：高さ 10 m の山。極小点 T(15, 5)：高さ 5 m の谷。変曲点 W(10, 7.5)：ここで下りがいちばん急で、右カーブから左カーブに変わります。"
]
],
"rational": [
[
"T シャツのプリント",
"クラスで T シャツをプリントします：版代が 1 回 600 €、1 枚ごとに 2 €。1 枚あたりの費用 k(x) = (2x + 600) / x、x = 枚数。",
"極 x = 0：枚数がとても少ないと 1 枚がものすごく高い。水平な漸近線 y = 2：枚数が多いほど 1 枚あたりは 2 € に近づくが、それより安くはならない。意味があるのは x > 0。"
],
[
"移動時間",
"おばあちゃんの家まで 120 km。x = 速さ（km/h）、f(x) = かかる時間（時間）。",
"速さが 2 倍なら時間は半分。極 x = 0：止まっていたら着かない。漸近線 y = 0：時間はどんどん短くなるが 0 にはならない。例：f(80) = 1.5 時間。"
],
[
"ジュースの水割り",
"10 L の飲み物にジュースが 2 L 入っています。そこに純粋なジュースを x L 加えます。f(x) = ジュースの割合（0.2 は 20 %）。",
"f(0) = 0.2：最初は 20 % がジュース。漸近線 y = 1：ジュースを足すほど割合は 100 % に近づくが届かない。極 x = −10 はここでは意味がなく、x ≥ 0 だけを考えます。"
]
],
"sinus": [
[
"観覧車",
"直径 40 m、軸の高さ 22 m、1 周 10 分の観覧車。t 分後のゴンドラの高さ：h(t) = 20 · sin(2π/10 · (t − 2.5)) + 22。",
"a = 20：半径（軸から上下にこれだけ動く）。d = 22：軸の高さ（中心線）。周期 p = 10 分なので b = 2π/10。ずらしているので、t = 0 ではいちばん下（地上 2 m）から乗ります。"
],
[
"潮の満ち引き",
"ある港では水位が干潮の 1 m と満潮の 4 m の間で変わります。満潮から次の満潮まで約 12.4 時間です。",
"d = 2.5 m：平均の水位。a = 1.5 m：干満の差の半分（潮位差 3 m）。p ≈ 12.4 時間なので b = 2π/12.4 ≈ 0.51。"
],
[
"昼の長さ",
"ベルリンでは、いちばん短い日（12 月 21 日）の昼は 7.7 時間弱、いちばん長い日（6 月 21 日）は約 16.8 時間です。",
"d ≈ 12.2 時間：昼の長さの平均（3 月と 9 月）。a ≈ 4.5 時間。p = 365 日、b = 2π/365。曲線は 3 月にいちばん急に上がり、そのころ昼がいちばん速く長くなります。"
],
[
"コンセント",
"ヨーロッパのコンセントの電圧は 1 秒に 50 回ふれます（50 ヘルツ）：U(t) = 325 · sin(2π · 50 · t)、t は秒。",
"a = 325 V：最大電圧（おなじみの 230 V は平均的な値「実効値」）。p = 1/50 秒 = 0.02 秒なので b = 2π · 50 ≈ 314。d = 0：電圧は 0 を中心にプラスとマイナスをくり返します。"
]
],
"waage": [
[
"ノートを買う",
"同じノート 3 冊と 2 € のペン 1 本で合計 8 €。ノート 1 冊はいくら？",
"x = ノート 1 冊の値段。答え x = 2：ノートは 1 冊 2 €。"
],
[
"きょうだい",
"ミアは弟より 3 才年上で、2 人の年れいの合計は 21 才。弟は何才？",
"x = 弟の年れい、ミアは x + 3。答え x = 9：弟は 9 才、ミアは 12 才。"
],
[
"ちょきん",
"ベンは 12 € 持っていて毎週 4 € ためます。レアは 30 € 持っていて毎週 1 € ためます。何週間後に同じ金額になる？",
"x = 週の数。答え x = 6：6 週間後に 2 人とも 36 €。"
],
[
"料金プランくらべ",
"プラン A：月 5 € と 1 分 10 セント。プラン B：月 15 € と 1 分 5 セント。何分なら同じ料金？",
"x = 分。答え x = 200：200 分でどちらも 25 €。もっと話す人はプラン B が安い。"
],
[
"庭のさく",
"庭の長さは幅の 2 倍です。まわりのさくの長さは 36 m。庭の幅は？",
"x = 幅、長さは 2x、周りの長さは 2 · x + 2 · 2x = 6x。答え x = 6：幅 6 m、長さ 12 m。"
]
]
},
"ar": {
"linear": [
[
"الحليب في السوبرماركت",
"لتر الحليب بـ 1.15 €. x = عدد اللترات، f(x) = السعر الكلي بالـ €.",
"f(x) = 1.15·x: ‏m = 1.15 € للتر، t = 0 (صفر لتر لا يكلف شيئًا – مستقيم يمر بالأصل، تناسب طردي). لتران: f(2) = 1.15·2 = 2.30 €. ‏3 لترات: f(3) = 1.15·3 = 3.45 €. ‏6 لترات: f(6) = 1.15·6 = 6.90 €. وبالعكس: بـ 9.20 € تحصل على 9.20 : 1.15 = 8 لترات."
],
[
"باقة الهاتف",
"تكلّف باقة الهاتف 10 € اشتراكًا شهريًا و 2 € لكل غيغابايت. x = عدد الغيغابايت، f(x) = التكلفة باليورو.",
"t = 10 هو الاشتراك (التكلفة عند 0 GB)، و m = 2 سعر الغيغابايت: كل غيغابايت إضافي يزيد التكلفة 2 €. المعنى فقط عندما x ≥ 0."
],
[
"شمعة",
"طول شمعة 20 cm وتحترق 2.5 cm في الساعة. x = الساعات، f(x) = الطول بالسنتيمتر.",
"t = 20: الطول في البداية. m = −2.5: تقصر 2.5 cm كل ساعة (مستقيم هابط). الصفر x = 8: بعد 8 ساعات تنتهي الشمعة. المعنى فقط عندما 0 ≤ x ≤ 8."
],
[
"سيارة أجرة",
"رحلة سيارة الأجرة تكلّف 4 € أجرة بداية و 2.50 € لكل كيلومتر. x = الكيلومترات، f(x) = السعر باليورو.",
"تدفع t = 4 € بمجرد الركوب، و m = 2.5 € لكل كيلومتر. إلى أي مسافة تصل بـ 24 €؟ حلّ 2.5x + 4 = 24 → x = 8 km."
]
],
"quadratisch": [
[
"رمي كرة",
"تُرمى كرة بشكل مائل إلى الأعلى من ارتفاع 1.5 m. ‏x = المسافة الأفقية بالمتر، f(x) = الارتفاع بالمتر.",
"f(0) = 1.5: ارتفاع الرمي. الرأس S(10, 6.5): بعد 10 m تكون الكرة في أعلى نقطة، على ارتفاع 6.5 m. الصفر الموجب x ≈ 21.4: هناك تسقط الكرة. القطع مفتوح لأسفل لأن a < 0."
],
[
"قوس جسر",
"ارتفاع قوس جسر في منتصفه 8 m. ‏x = البعد عن المنتصف بالمتر، f(x) = الارتفاع بالمتر.",
"الرأس S(0, 8): أعلى نقطة في المنتصف. الصفران x = −20 و x = 20: هناك يلامس القوس الأرض، فيكون طول الجسر 40 m. المنحنى متماثل مثل الجسر تمامًا."
],
[
"بيع الكعك",
"في حفل المدرسة يبيع صفّكم الكعك. كلما غلا سعر القطعة قلّ المشترون. x = سعر القطعة باليورو، f(x) = الربح باليورو.",
"الرأس S(4, 90): عند سعر 4 € للقطعة يكون الربح أكبر ما يمكن، 90 €. الصفران x = 1 و x = 7: تحت 1 € أو فوق 7 € تخسرون (f(x) < 0)."
]
],
"polynom": [
[
"طيّ علبة",
"من ورقة كرتون مربعة (20 cm × 20 cm) تقصّ من الزوايا مربعات طول ضلعها x وتطوي علبة مفتوحة. حجمها V(x) = x · (20 − 2x)².",
"المعنى فقط عندما 0 < x < 10. القيمة العظمى عند x = 10/3 ≈ 3.33 cm: تكون العلبة أكبر ما يمكن، نحو 593 cm³. الصفران x = 0 و x = 10 (مضاعف): لا تبقى علبة."
],
[
"قطار الملاهي",
"جزء من مسار قطار الملاهي: x = المسافة الأفقية بالمتر، f(x) = ارتفاع السكة بالمتر.",
"النقطة العظمى H(5, 10): قمة على ارتفاع 10 m. النقطة الصغرى T(15, 5): منخفض على ارتفاع 5 m. نقطة الانعطاف W(10, 7.5): هنا يكون النزول أشد انحدارًا، والمسار يتحول من منعطف لليمين إلى منعطف لليسار."
]
],
"rational": [
[
"طباعة القمصان",
"يطبع صفّكم قمصانًا: 600 € مرة واحدة للتصميم، و 2 € لكل قميص. تكلفة القميص الواحد: k(x) = (2x + 600) / x، و x = عدد القمصان.",
"القطب x = 0: مع عدد قليل جدًا يصبح كل قميص غاليًا جدًا. خط التقارب الأفقي y = 2: كلما زاد العدد اقتربت تكلفة القطعة من 2 € دون أن تنزل تحتها. المعنى فقط عندما x > 0."
],
[
"مدة الرحلة",
"بيت الجدة على بعد 120 km. ‏x = السرعة بالكيلومتر في الساعة، f(x) = مدة الرحلة بالساعات.",
"ضعف السرعة يعني نصف الوقت. القطب x = 0: من يقف لا يصل أبدًا. خط التقارب y = 0: يقصر الوقت باستمرار لكنه لا يصبح 0. مثال: f(80) = 1.5 ساعة."
],
[
"عصير مخفّف",
"في 10 لترات من المشروب يوجد 2 لتر عصير. تضيف x لتر من العصير الصافي. f(x) = نسبة العصير (0.2 تعني 20 %).",
"f(0) = 0.2: في البداية 20 % عصير. خط التقارب y = 1: كلما أضفت عصيرًا اقتربت النسبة من 100 % دون أن تبلغها. القطب x = −10 لا معنى له هنا، فالمعنى فقط عندما x ≥ 0."
]
],
"sinus": [
[
"الدولاب الدوّار",
"قطر دولاب دوّار 40 m، ومحوره على ارتفاع 22 m، والدورة الكاملة تستغرق 10 دقائق. ارتفاع المقصورة بعد t دقيقة: h(t) = 20 · sin(2π/10 · (t − 2.5)) + 22.",
"a = 20: نصف القطر، أي مقدار الصعود والنزول حول المحور. d = 22: ارتفاع المحور (الخط الأوسط). الدورة p = 10 دقائق، لذلك b = 2π/10. الإزاحة تجعلك تركب عند t = 0 من أسفل نقطة، على ارتفاع 2 m."
],
[
"المد والجزر",
"في ميناء يتغير مستوى الماء بين 1 m عند الجزر و 4 m عند المد. بين مدّ وآخر نحو 12.4 ساعة.",
"d = 2.5 m: المستوى المتوسط. a = 1.5 m: نصف الفرق بين الجزر والمد (3 m). p ≈ 12.4 ساعة، إذن b = 2π/12.4 ≈ 0.51."
],
[
"طول النهار",
"في برلين يكون أقصر نهار (21 ديسمبر) أقل بقليل من 7.7 ساعة، وأطول نهار (21 يونيو) نحو 16.8 ساعة.",
"d ≈ 12.2 ساعة: متوسط طول النهار (في مارس وسبتمبر). a ≈ 4.5 ساعة. p = 365 يومًا، b = 2π/365. يصعد المنحنى بأقصى سرعة في مارس، وحينها يطول النهار بأسرع ما يمكن."
],
[
"مقبس الكهرباء",
"يتذبذب الجهد في المقبس الأوروبي 50 مرة في الثانية (50 هرتز): U(t) = 325 · sin(2π · 50 · t)، و t بالثواني.",
"a = 325 V: الجهد الأقصى، أما 230 V المعروفة فهي قيمة متوسطة (القيمة الفعالة). p = 1/50 ثانية = 0.02 ثانية، إذن b = 2π · 50 ≈ 314. d = 0: يتأرجح الجهد حول 0، موجبًا مرة وسالبًا مرة."
]
],
"waage": [
[
"شراء الدفاتر",
"3 دفاتر متماثلة وقلم بسعر 2 € تكلّف معًا 8 €. كم سعر الدفتر الواحد؟",
"x = سعر الدفتر. الحل x = 2 يعني أن الدفتر يكلّف 2 €."
],
[
"الأخوان",
"ميا أكبر من أخيها بـ 3 سنوات، ومجموع عمريهما 21 سنة. كم عمر الأخ؟",
"x = عمر الأخ، وعمر ميا x + 3. الحل x = 9: الأخ عمره 9 وميا 12."
],
[
"الادخار",
"مع بن 12 € ويدّخر 4 € كل أسبوع. ومع ليا 30 € وتدّخر 1 € في الأسبوع. بعد كم أسبوعًا يصبح معهما المبلغ نفسه؟",
"x = عدد الأسابيع. الحل x = 6: بعد 6 أسابيع يكون مع كلٍّ منهما 36 €."
],
[
"مقارنة الباقات",
"الباقة A: ‏5 € شهريًا و 10 سنتات للدقيقة. الباقة B: ‏15 € شهريًا و 5 سنتات للدقيقة. عند كم دقيقة تتساوى التكلفة؟",
"x = عدد الدقائق. الحل x = 200: عند 200 دقيقة تكلّف كلتاهما 25 €. ومن يتكلم أكثر توفّر له الباقة B."
],
[
"سياج الحديقة",
"طول حديقة ضعف عرضها، وطول السياج حولها 36 m. كم عرض الحديقة؟",
"x = العرض، والطول 2x، والمحيط 2 · x + 2 · 2x = 6x. الحل x = 6: عرض الحديقة 6 m وطولها 12 m."
]
]
}
};
  var knopf = null, APP = null, LADEN = null, FORMEL = null;
  function lang(){ var l = FB.lang(); return D[l] ? l : "de"; }
  function ui(k){ return UI[lang()][k] || UI.de[k]; }
  function zeigen(){
    var l = lang(), liste = D[l][APP], h = '<div class="al-liste">';
    liste.forEach(function(e, i){
      var ein = F[APP][i];
      h += '<div class="al-karte"><h3>' + FB.esc(e[0]) + "</h3><p>" + FB.text(e[1]) + "</p>";
      if(window.FA_BILD && FA_BILD[APP] && FA_BILD[APP][i]){ try { h += '<div class="al-bild">' + FA_BILD[APP][i]() + "</div>"; } catch(x){} }
      if(ein && FORMEL){ var ft = ""; try { ft = FORMEL(ein); } catch(x){} if(ft) h += '<div class="al-formel"><span class="f" dir="ltr">' + FB.mathe(ft) + "</span></div>"; }
      h += '<details class="al-deut"><summary>' + FB.esc(ui("bedeutung")) + "</summary><p>" + FB.text(e[2]) + "</p></details>";
      if(ein && LADEN) h += '<button type="button" class="al-los" data-i="' + i + '">' + FB.esc(ui(APP === "waage" ? "waage" : "probieren")) + "</button>";
      h += "</div>";
    });
    FB.popup(FB.esc(ui("titel")), h + "</div>");
    document.querySelectorAll(".al-los").forEach(function(b){
      b.addEventListener("click", function(){
        var ein = F[APP][+b.dataset.i];
        var zu = document.querySelector(".b-zu"); if(zu) zu.click();
        LADEN(ein);
      });
    });
  }
  function einbauen(app, nach, laden, formel){
    APP = app; LADEN = laden || null; FORMEL = formel || null;
    knopf = document.createElement("button"); knopf.type = "button"; knopf.className = "alltag-knopf";
    knopf.addEventListener("click", zeigen);
    nach.parentNode.insertBefore(knopf, nach.nextSibling);
    texte();
  }
  function texte(){ if(knopf) knopf.textContent = ui("titel"); }
  var css = document.createElement("style");
  css.textContent =
    ".alltag-knopf{display:block;margin:8px auto 10px;font:700 15px system-ui,sans-serif;padding:9px 18px;border-radius:999px;border:2px solid #0d9488;background:#f0fdfa;color:#0f766e;cursor:pointer}" +
    ".alltag-knopf:hover{background:#0d9488;color:#fff}" +
    ".al-liste{display:grid;gap:10px}.al-karte{border:2px solid #c9d6ea;border-radius:12px;padding:10px 12px;background:#fbfdff}" +
    ".al-karte h3{margin:0 0 4px;font-size:17px;color:#0f766e}.al-karte p{margin:4px 0}" +
    ".al-formel{text-align:center;margin:6px 0}.al-formel .f{font:19px 'Cambria Math',Cambria,'Times New Roman',serif}" +
    ".al-deut summary{cursor:pointer;color:#1565c0;font-weight:700;font-size:14px}.al-deut p{background:#f4f8ff;border-radius:8px;padding:6px 8px;font-size:15px}" +
    ".al-los{margin-top:6px;font:700 14px system-ui,sans-serif;padding:7px 14px;border-radius:999px;border:0;background:#1565c0;color:#fff;cursor:pointer}";
  document.head.appendChild(css);
  return { einbauen: einbauen, texte: texte, zeigen: zeigen, D: D, F: F, app: function(){ return APP; } };
})();
