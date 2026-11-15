// Reiter „Begriffe“ (wahrscheinlichkeit/app.js): Zeichen und Fachbegriffe in 9 Sprachen.
// Eintrag: [Zeichen, Begriff, Erklärung, Beispiel]. $…$ = Formel (wird links-nach-rechts gesetzt).
// Die Reihenfolge und die Zeichen sind in allen Sprachen gleich.
var WB = {
de: {
  suche: "Begriff oder Zeichen suchen …", nichts: "Nichts gefunden.", bsp: "Beispiel:",
  intro: "Alle Zeichen und Fachbegriffe, die in der Schule vorkommen – jeweils mit Beispiel. Fast alle Beispiele benutzen einen normalen Würfel.",
  gruppen: [
  ["Grundbegriffe", [
    ["", "Zufallsexperiment", "Ein Vorgang mit mehreren möglichen Ausgängen, bei dem man vorher nicht weiß, was herauskommt. Man kann ihn (zumindest gedanklich) beliebig oft unter gleichen Bedingungen wiederholen.", "Würfeln, eine Münze werfen, eine Kugel aus einer Urne ziehen."],
    ["ω", "Ergebnis (Ausgang)", "Ein einzelner möglicher Ausgang des Zufallsexperiments. Zeichen: ω, das kleine griechische Omega. $ω ∈ E$ heißt: ω gehört zu E.", "Beim Würfeln ist $ω = 4$ ein Ergebnis."],
    ["Ω", "Ergebnisraum (Ergebnismenge)", "Die Menge aller möglichen Ergebnisse. Zeichen: Ω, das große griechische Omega (manchmal auch S). Die Ergebnisse stehen in Mengenklammern { }.", "Würfel: $Ω = {1, 2, 3, 4, 5, 6}$. Zwei Münzen: $Ω = {KK, KZ, ZK, ZZ}$."],
    ["|Ω|", "Mächtigkeit (Anzahl)", "Die senkrechten Striche bedeuten „Anzahl der Elemente“. |Ω| ist die Anzahl aller Ergebnisse, |E| die Anzahl der Ergebnisse in E.", "Würfel: $|Ω| = 6$. Für $E = {2, 4, 6}$ ist $|E| = 3$."],
    ["E, A, B", "Ereignis", "Eine Teilmenge des Ergebnisraums, also eine Auswahl von Ergebnissen. Ereignisse schreibt man mit Großbuchstaben: E wie Ereignis, oft auch A, B, C. Ein Ereignis tritt ein, wenn das Ergebnis darin liegt.", "E: „gerade Zahl“, $E = {2, 4, 6}$. Wird eine 4 gewürfelt, ist E eingetreten."],
    ["{ω}", "Elementarereignis", "Ein Ereignis, das aus genau einem Ergebnis besteht.", "„eine Sechs würfeln“: $E = {6}$."],
    ["Ω, ∅", "Sicheres und unmögliches Ereignis", "Das sichere Ereignis ist ganz Ω – es tritt immer ein, $P(Ω) = 1$. Das unmögliche Ereignis ist die leere Menge $∅ = { }$ – es tritt nie ein, $P(∅) = 0$.", "„Zahl kleiner als 7“ ist sicher, „eine 7 würfeln“ ist unmöglich."],
    ["Ē", "Gegenereignis", "Alle Ergebnisse, die nicht in E liegen. Gelesen „E quer“ oder „nicht E“. Es gilt $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Wahrscheinlichkeit", "P steht für Wahrscheinlichkeit (lateinisch probabilitas, englisch probability). P(E) ist eine Zahl von 0 (nie) bis 1 (sicher), also 0 % bis 100 %. Gelesen: „P von E“.", "$P(gerade Zahl) = 1/2 = 0,5 = 50 %$."],
    ["|E| : |Ω|", "Laplace-Experiment", "Ein Zufallsexperiment, bei dem alle Ergebnisse gleich wahrscheinlich sind. Dann gilt die Laplace-Regel: P(E) = Anzahl der günstigen Ergebnisse : Anzahl aller möglichen Ergebnisse.", "Fairer Würfel: $P(Zahl ≥ 5) = 2/6 = 1/3$. Kein Laplace-Experiment: eine Reißzwecke werfen."]
  ]],
  ["Ereignisse verknüpfen", [
    ["A ∩ B", "Schnitt („und“)", "A ∩ B tritt ein, wenn A und B beide eintreten. Es enthält die Ergebnisse, die in A und in B liegen.", "A: gerade, $A = {2, 4, 6}$; B: größer als 3, $B = {4, 5, 6}$. Dann $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Vereinigung („oder“)", "A ∪ B tritt ein, wenn mindestens eines der beiden eintritt (A oder B oder beide).", "Mit A und B wie oben: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Unvereinbar (disjunkt)", "A und B können nicht gleichzeitig eintreten – sie haben kein gemeinsames Ergebnis. Dann gilt $P(A ∪ B) = P(A) + P(B)$.", "„gerade“ und „ungerade“ sind unvereinbar."]
  ]],
  ["Mehrstufige Experimente", [
    ["", "Mehrstufiges Zufallsexperiment, Baumdiagramm", "Mehrere Zufallsexperimente nacheinander. Man zeichnet sie als Baumdiagramm: Jede Stufe ist eine Verzweigung, jeder Weg vom Start bis zum Ende ist ein Pfad.", "Zweimal eine Münze werfen; dreimal aus einer Urne ziehen."],
    ["·", "Pfadregel (Produktregel)", "Die Wahrscheinlichkeit eines Pfades ist das Produkt der Wahrscheinlichkeiten an seinen Ästen.", "Zweimal eine Sechs: $1/6 · 1/6 = 1/36$."],
    ["+", "Summenregel", "Gehören mehrere Pfade zu einem Ereignis, addiert man ihre Wahrscheinlichkeiten.", "Zwei Münzen, genau einmal Kopf: $P(KZ) + P(ZK) = 1/4 + 1/4 = 1/2$."],
    ["", "Mit und ohne Zurücklegen", "Mit Zurücklegen kommt die gezogene Kugel zurück in die Urne – die Wahrscheinlichkeiten bleiben auf jeder Stufe gleich. Ohne Zurücklegen fehlt sie danach – die Wahrscheinlichkeiten ändern sich.", "3 rote und 2 blaue Kugeln, zweimal rot: mit Zurücklegen $3/5 · 3/5$, ohne Zurücklegen $3/5 · 2/4$."]
  ]],
  ["Häufigkeiten", [
    ["n", "Anzahl der Durchführungen", "n gibt an, wie oft ein Experiment durchgeführt wird (Versuchsanzahl, Stichprobenumfang).", "100-mal würfeln: $n = 100$."],
    ["H, h", "Absolute und relative Häufigkeit", "Die absolute Häufigkeit H sagt, wie oft ein Ereignis eingetreten ist. Die relative Häufigkeit ist der Anteil daran: $h = H : n$.", "100 Würfe, davon 18 Sechsen: $H = 18$, $h = 18/100 = 0,18 = 18 %$."],
    ["h → P", "Gesetz der großen Zahlen", "Wird ein Experiment sehr oft wiederholt, nähert sich die relative Häufigkeit immer mehr der Wahrscheinlichkeit an. Ausprobieren im Reiter „Simulation“.", "Nach 10 Würfen sind 30 % Sechsen gut möglich, nach 10 000 Würfen liegt der Anteil sehr nah an $1/6 ≈ 16,7 %$."]
  ]],
  ["Bedingte Wahrscheinlichkeit", [
    ["", "Vierfeldertafel", "Eine Tabelle für zwei Merkmale A und B mit je zwei Möglichkeiten (A oder Ā, B oder B̄). Die vier inneren Felder sind $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. Am Rand stehen die Summen, unten rechts 1 (oder die Gesamtzahl).", "A: „krank“, B: „Test positiv“ – siehe Reiter „Vierfeldertafel“."],
    ["P(B | A) = P<sub>A</sub>(B)", "Bedingte Wahrscheinlichkeit", "Die Wahrscheinlichkeit von B, wenn man schon weiß, dass A eingetreten ist. Gelesen: „P von B unter der Bedingung A“. Andere Schreibweise: P<sub>A</sub>(B). Rechnung: $P(B | A) = P(A ∩ B) : P(A)$.", "Würfel, A: gerade, B: größer als 3. $P(B | A) = 2/3$, denn von 2, 4, 6 sind zwei Zahlen größer als 3."],
    ["", "Stochastisch unabhängig", "A und B beeinflussen sich nicht: $P(A ∩ B) = P(A) · P(B)$, gleichbedeutend $P(B | A) = P(B)$.", "Zwei Münzwürfe sind unabhängig. „gerade“ und „größer als 3“ sind es nicht: $P(B | A) = 2/3$, aber $P(B) = 1/2$."],
    ["", "Satz von Bayes (umgekehrter Baum)", "Man kennt P(B | A) und will umgekehrt P(A | B) wissen: $P(A | B) = P(A) · P(B | A) : P(B)$.", "Wie wahrscheinlich ist man krank, wenn der Test positiv ist?"]
  ]],
  ["Zufallsgrößen (ab Klasse 10)", [
    ["X", "Zufallsgröße (Zufallsvariable)", "X ordnet jedem Ergebnis eine Zahl zu. $P(X = k)$ ist die Wahrscheinlichkeit, dass X genau den Wert k annimmt.", "Zwei Würfel, X = Augensumme: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Erwartungswert", "Der Wert, der sich auf lange Sicht im Mittel ergibt: jeden Wert mal seine Wahrscheinlichkeit, alles addiert. Zeichen auch μ (griechisch „my“). Achtung: Dieses E hat nichts mit einem Ereignis E zu tun!", "Ein Würfel: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3,5$."],
    ["V(X), σ", "Varianz und Standardabweichung", "Sie messen, wie stark die Werte um den Erwartungswert streuen. σ (griechisch „sigma“) ist die Wurzel aus der Varianz: $σ = √V(X)$.", "Ein Würfel: $V(X) ≈ 2,92$, $σ ≈ 1,71$."],
    ["p, q", "Treffer- und Nietenwahrscheinlichkeit", "Bei einem Bernoulli-Experiment gibt es nur zwei Ausgänge: Treffer oder Niete. Das kleine p ist die Trefferwahrscheinlichkeit, $q = 1 − p$ die Nietenwahrscheinlichkeit. Nicht verwechseln mit dem großen P(…)!", "„Sechs“ ist Treffer: $p = 1/6$, $q = 5/6$."],
    ["n, k", "Bernoulli-Kette, Anzahl der Treffer", "Ein Bernoulli-Experiment wird n-mal unabhängig wiederholt. k ist die Anzahl der Treffer. $X ~ B(n; p)$ heißt: X ist binomialverteilt.", "10-mal würfeln, genau 2 Sechsen: $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
},
en: {
  suche: "Search for a term or symbol …", nichts: "Nothing found.", bsp: "Example:",
  intro: "All the symbols and technical terms you meet at school – each with an example. Almost all examples use an ordinary die.",
  gruppen: [
  ["Basic terms", [
    ["", "Random experiment", "A process with several possible results where you cannot know in advance what will happen. It can (at least in theory) be repeated as often as you like under the same conditions.", "Rolling a die, tossing a coin, drawing a ball from an urn."],
    ["ω", "Outcome", "A single possible result of the random experiment. Symbol: ω, the small Greek letter omega. $ω ∈ E$ means: ω belongs to E.", "When you roll a die, $ω = 4$ is an outcome."],
    ["Ω", "Sample space", "The set of all possible outcomes. Symbol: Ω, the capital Greek omega (sometimes S). The outcomes are written in set brackets { }.", "Die: $Ω = {1, 2, 3, 4, 5, 6}$. Two coins: $Ω = {HH, HT, TH, TT}$."],
    ["|Ω|", "Cardinality (number of elements)", "The vertical bars mean “number of elements”. |Ω| is the number of all outcomes, |E| the number of outcomes in E.", "Die: $|Ω| = 6$. For $E = {2, 4, 6}$, $|E| = 3$."],
    ["E, A, B", "Event", "A subset of the sample space, i.e. a selection of outcomes. Events are written with capital letters: E for event, often also A, B, C. An event happens if the outcome lies in it.", "E: “even number”, $E = {2, 4, 6}$. If you roll a 4, E has happened."],
    ["{ω}", "Elementary event", "An event that consists of exactly one outcome.", "“roll a six”: $E = {6}$."],
    ["Ω, ∅", "Certain and impossible event", "The certain event is all of Ω – it always happens, $P(Ω) = 1$. The impossible event is the empty set $∅ = { }$ – it never happens, $P(∅) = 0$.", "“number less than 7” is certain, “roll a 7” is impossible."],
    ["Ē", "Complementary event", "All outcomes that are not in E. Read “E bar” or “not E” (also written E′ or Eᶜ). $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Probability", "P stands for probability (Latin probabilitas). P(E) is a number from 0 (never) to 1 (certain), i.e. 0 % to 100 %. Read: “P of E”.", "$P(even number) = 1/2 = 0.5 = 50 %$."],
    ["|E| : |Ω|", "Laplace experiment", "A random experiment in which all outcomes are equally likely. Then the Laplace rule holds: P(E) = number of favourable outcomes : number of all possible outcomes.", "Fair die: $P(number ≥ 5) = 2/6 = 1/3$. Not a Laplace experiment: tossing a drawing pin."]
  ]],
  ["Combining events", [
    ["A ∩ B", "Intersection (“and”)", "A ∩ B happens if A and B both happen. It contains the outcomes that are in A and in B.", "A: even, $A = {2, 4, 6}$; B: greater than 3, $B = {4, 5, 6}$. Then $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Union (“or”)", "A ∪ B happens if at least one of the two happens (A or B or both).", "With A and B as above: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Mutually exclusive (disjoint)", "A and B cannot happen at the same time – they have no outcome in common. Then $P(A ∪ B) = P(A) + P(B)$.", "“even” and “odd” are mutually exclusive."]
  ]],
  ["Multi-stage experiments", [
    ["", "Multi-stage experiment, tree diagram", "Several random experiments one after another. You draw them as a tree diagram: each stage is a branching, each way from the start to the end is a path.", "Tossing a coin twice; drawing from an urn three times."],
    ["·", "Path rule (multiplication rule)", "The probability of a path is the product of the probabilities on its branches.", "Two sixes: $1/6 · 1/6 = 1/36$."],
    ["+", "Sum rule (addition rule)", "If several paths belong to an event, you add their probabilities.", "Two coins, exactly one head: $P(HT) + P(TH) = 1/4 + 1/4 = 1/2$."],
    ["", "With and without replacement", "With replacement the ball drawn goes back into the urn – the probabilities stay the same at every stage. Without replacement it is missing afterwards – the probabilities change.", "3 red and 2 blue balls, red twice: with replacement $3/5 · 3/5$, without replacement $3/5 · 2/4$."]
  ]],
  ["Frequencies", [
    ["n", "Number of trials", "n tells you how often an experiment is carried out (number of trials, sample size).", "Rolling a die 100 times: $n = 100$."],
    ["H, h", "Absolute and relative frequency", "The absolute frequency H says how often an event happened. The relative frequency is its share: $h = H : n$.", "100 rolls, 18 sixes: $H = 18$, $h = 18/100 = 0.18 = 18 %$."],
    ["h → P", "Law of large numbers", "If an experiment is repeated very often, the relative frequency gets closer and closer to the probability. Try it in the “Simulation” tab.", "After 10 rolls, 30 % sixes is quite possible; after 10,000 rolls the share is very close to $1/6 ≈ 16.7 %$."]
  ]],
  ["Conditional probability", [
    ["", "Two-way table", "A table for two features A and B with two options each (A or Ā, B or B̄). The four inner cells are $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. The margins contain the totals, the bottom right 1 (or the total number).", "A: “ill”, B: “test positive” – see the “Two-way table” tab."],
    ["P(B | A) = P<sub>A</sub>(B)", "Conditional probability", "The probability of B when you already know that A has happened. Read: “P of B given A”. Also written P<sub>A</sub>(B). Calculation: $P(B | A) = P(A ∩ B) : P(A)$.", "Die, A: even, B: greater than 3. $P(B | A) = 2/3$, because two of 2, 4, 6 are greater than 3."],
    ["", "Independent events", "A and B do not influence each other: $P(A ∩ B) = P(A) · P(B)$, which is the same as $P(B | A) = P(B)$.", "Two coin tosses are independent. “even” and “greater than 3” are not: $P(B | A) = 2/3$, but $P(B) = 1/2$."],
    ["", "Bayes’ theorem (reversed tree)", "You know P(B | A) and want the other way round, P(A | B): $P(A | B) = P(A) · P(B | A) : P(B)$.", "How likely is someone ill if the test is positive?"]
  ]],
  ["Random variables (upper grades)", [
    ["X", "Random variable", "X assigns a number to each outcome. $P(X = k)$ is the probability that X takes exactly the value k.", "Two dice, X = total: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Expected value", "The value you get on average in the long run: each value times its probability, all added up. Also written μ (Greek “mu”). Careful: this E has nothing to do with an event E!", "One die: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3.5$."],
    ["V(X), σ", "Variance and standard deviation", "They measure how much the values spread around the expected value. σ (Greek “sigma”) is the square root of the variance: $σ = √V(X)$.", "One die: $V(X) ≈ 2.92$, $σ ≈ 1.71$."],
    ["p, q", "Probability of success and failure", "A Bernoulli experiment has only two results: success or failure. The small p is the probability of success, $q = 1 − p$ the probability of failure. Don’t mix it up with the capital P(…)!", "“six” is a success: $p = 1/6$, $q = 5/6$."],
    ["n, k", "Bernoulli trials, number of successes", "A Bernoulli experiment is repeated n times independently. k is the number of successes. $X ~ B(n; p)$ means: X is binomially distributed.", "Rolling a die 10 times, exactly 2 sixes: $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
},
es: {
  suche: "Buscar un término o símbolo …", nichts: "No se ha encontrado nada.", bsp: "Ejemplo:",
  intro: "Todos los símbolos y términos que aparecen en clase, cada uno con un ejemplo. Casi todos los ejemplos usan un dado normal.",
  gruppen: [
  ["Conceptos básicos", [
    ["", "Experimento aleatorio", "Un proceso con varios resultados posibles en el que no se sabe de antemano qué saldrá. Se puede repetir (al menos en teoría) tantas veces como se quiera en las mismas condiciones.", "Lanzar un dado, lanzar una moneda, sacar una bola de una urna."],
    ["ω", "Resultado", "Un único resultado posible del experimento. Símbolo: ω, la omega griega minúscula. $ω ∈ E$ significa: ω pertenece a E.", "Al lanzar un dado, $ω = 4$ es un resultado."],
    ["Ω", "Espacio muestral", "El conjunto de todos los resultados posibles. Símbolo: Ω, la omega griega mayúscula (a veces E o S). Los resultados se escriben entre llaves { }.", "Dado: $Ω = {1, 2, 3, 4, 5, 6}$. Dos monedas: $Ω = {CC, CX, XC, XX}$."],
    ["|Ω|", "Cardinal (número de elementos)", "Las barras verticales significan «número de elementos». |Ω| es el número de todos los resultados, |E| el número de resultados de E.", "Dado: $|Ω| = 6$. Para $E = {2, 4, 6}$, $|E| = 3$."],
    ["E, A, B", "Suceso", "Un subconjunto del espacio muestral, es decir, una selección de resultados. Los sucesos se escriben con mayúsculas: E, o también A, B, C. Un suceso ocurre si el resultado está en él.", "E: «número par», $E = {2, 4, 6}$. Si sale un 4, E ha ocurrido."],
    ["{ω}", "Suceso elemental", "Un suceso formado por exactamente un resultado.", "«sacar un seis»: $E = {6}$."],
    ["Ω, ∅", "Suceso seguro e imposible", "El suceso seguro es todo Ω: ocurre siempre, $P(Ω) = 1$. El suceso imposible es el conjunto vacío $∅ = { }$: no ocurre nunca, $P(∅) = 0$.", "«número menor que 7» es seguro, «sacar un 7» es imposible."],
    ["Ē", "Suceso contrario", "Todos los resultados que no están en E. Se lee «E barra» o «no E» (también E′ o Eᶜ). Se cumple $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Probabilidad", "P viene de probabilidad (latín probabilitas). P(E) es un número de 0 (nunca) a 1 (seguro), es decir, del 0 % al 100 %. Se lee: «P de E».", "$P(número par) = 1/2 = 0,5 = 50 %$."],
    ["|E| : |Ω|", "Experimento de Laplace", "Un experimento en el que todos los resultados son igual de probables. Entonces vale la regla de Laplace: P(E) = casos favorables : casos posibles.", "Dado equilibrado: $P(número ≥ 5) = 2/6 = 1/3$. No es de Laplace: lanzar una chincheta."]
  ]],
  ["Operaciones con sucesos", [
    ["A ∩ B", "Intersección («y»)", "A ∩ B ocurre si ocurren A y B a la vez. Contiene los resultados que están en A y en B.", "A: par, $A = {2, 4, 6}$; B: mayor que 3, $B = {4, 5, 6}$. Entonces $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Unión («o»)", "A ∪ B ocurre si ocurre al menos uno de los dos (A o B o ambos).", "Con A y B como arriba: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Incompatibles (disjuntos)", "A y B no pueden ocurrir a la vez: no tienen ningún resultado en común. Entonces $P(A ∪ B) = P(A) + P(B)$.", "«par» e «impar» son incompatibles."]
  ]],
  ["Experimentos compuestos", [
    ["", "Experimento en varias etapas, diagrama de árbol", "Varios experimentos aleatorios uno tras otro. Se dibujan como diagrama de árbol: cada etapa es una ramificación y cada camino del inicio al final es una rama completa.", "Lanzar una moneda dos veces; sacar tres veces de una urna."],
    ["·", "Regla del producto", "La probabilidad de un camino es el producto de las probabilidades de sus ramas.", "Dos seises: $1/6 · 1/6 = 1/36$."],
    ["+", "Regla de la suma", "Si varios caminos pertenecen a un suceso, se suman sus probabilidades.", "Dos monedas, exactamente una cara: $P(CX) + P(XC) = 1/4 + 1/4 = 1/2$."],
    ["", "Con y sin reemplazamiento", "Con reemplazamiento la bola extraída vuelve a la urna: las probabilidades son iguales en cada etapa. Sin reemplazamiento falta después: las probabilidades cambian.", "3 bolas rojas y 2 azules, dos veces roja: con reemplazamiento $3/5 · 3/5$, sin reemplazamiento $3/5 · 2/4$."]
  ]],
  ["Frecuencias", [
    ["n", "Número de repeticiones", "n indica cuántas veces se realiza un experimento (número de pruebas, tamaño de la muestra).", "Lanzar un dado 100 veces: $n = 100$."],
    ["H, h", "Frecuencia absoluta y relativa", "La frecuencia absoluta H dice cuántas veces ha ocurrido un suceso. La frecuencia relativa es la proporción: $h = H : n$.", "100 tiradas, 18 seises: $H = 18$, $h = 18/100 = 0,18 = 18 %$."],
    ["h → P", "Ley de los grandes números", "Si un experimento se repite muchísimas veces, la frecuencia relativa se acerca cada vez más a la probabilidad. Pruébalo en la pestaña «Simulación».", "Tras 10 tiradas es fácil tener un 30 % de seises; tras 10 000 tiradas la proporción está muy cerca de $1/6 ≈ 16,7 %$."]
  ]],
  ["Probabilidad condicionada", [
    ["", "Tabla de contingencia", "Una tabla para dos características A y B con dos opciones cada una (A o Ā, B o B̄). Las cuatro casillas interiores son $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. En los márgenes están las sumas y abajo a la derecha 1 (o el total).", "A: «enfermo», B: «test positivo»; mira la pestaña «Tabla de contingencia»."],
    ["P(B | A) = P<sub>A</sub>(B)", "Probabilidad condicionada", "La probabilidad de B cuando ya se sabe que ha ocurrido A. Se lee: «P de B condicionado a A». También se escribe P<sub>A</sub>(B). Cálculo: $P(B | A) = P(A ∩ B) : P(A)$.", "Dado, A: par, B: mayor que 3. $P(B | A) = 2/3$, porque de 2, 4, 6 hay dos mayores que 3."],
    ["", "Sucesos independientes", "A y B no se influyen: $P(A ∩ B) = P(A) · P(B)$, lo mismo que $P(B | A) = P(B)$.", "Dos lanzamientos de moneda son independientes. «par» y «mayor que 3» no lo son: $P(B | A) = 2/3$, pero $P(B) = 1/2$."],
    ["", "Teorema de Bayes (árbol inverso)", "Se conoce P(B | A) y se quiere al revés P(A | B): $P(A | B) = P(A) · P(B | A) : P(B)$.", "¿Qué probabilidad hay de estar enfermo si el test es positivo?"]
  ]],
  ["Variables aleatorias (cursos superiores)", [
    ["X", "Variable aleatoria", "X asigna un número a cada resultado. $P(X = k)$ es la probabilidad de que X tome exactamente el valor k.", "Dos dados, X = suma: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Esperanza (valor esperado)", "El valor que se obtiene de media a la larga: cada valor por su probabilidad, todo sumado. También se escribe μ (griego «mi»). ¡Ojo: esta E no tiene nada que ver con un suceso E!", "Un dado: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3,5$."],
    ["V(X), σ", "Varianza y desviación típica", "Miden cuánto se dispersan los valores alrededor de la esperanza. σ (griego «sigma») es la raíz de la varianza: $σ = √V(X)$.", "Un dado: $V(X) ≈ 2,92$, $σ ≈ 1,71$."],
    ["p, q", "Probabilidad de éxito y de fracaso", "Un experimento de Bernoulli solo tiene dos resultados: éxito o fracaso. La p minúscula es la probabilidad de éxito, $q = 1 − p$ la de fracaso. ¡No confundir con la P mayúscula de P(…)!", "«seis» es éxito: $p = 1/6$, $q = 5/6$."],
    ["n, k", "Pruebas de Bernoulli, número de éxitos", "Un experimento de Bernoulli se repite n veces de forma independiente. k es el número de éxitos. $X ~ B(n; p)$ significa: X sigue una distribución binomial.", "Lanzar un dado 10 veces, exactamente 2 seises: $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
},
zh: {
  suche: "搜索术语或符号……", nichts: "没有找到。", bsp: "例子：",
  intro: "学校里会遇到的所有符号和术语，每个都配有例子。几乎所有例子都用一颗普通骰子。",
  gruppen: [
  ["基本概念", [
    ["", "随机试验", "有多个可能结果、事先无法知道会出现哪一个的过程。它可以（至少在理论上）在相同条件下重复任意多次。", "掷骰子、抛硬币、从袋中摸一个球。"],
    ["ω", "结果（样本点）", "随机试验的一个可能结果。符号：ω，小写希腊字母 omega。$ω ∈ E$ 表示：ω 属于 E。", "掷骰子时，$ω = 4$ 是一个结果。"],
    ["Ω", "样本空间", "所有可能结果组成的集合。符号：Ω，大写希腊字母 omega（有时也写 S）。结果写在集合括号 { } 中。", "骰子：$Ω = {1, 2, 3, 4, 5, 6}$。两枚硬币：$Ω = {正正, 正反, 反正, 反反}$。"],
    ["|Ω|", "元素个数", "竖线表示“元素的个数”。|Ω| 是所有结果的个数，|E| 是 E 中结果的个数。", "骰子：$|Ω| = 6$。对 $E = {2, 4, 6}$，$|E| = 3$。"],
    ["E, A, B", "事件", "样本空间的一个子集，也就是一部分结果。事件用大写字母表示：E，也常用 A、B、C。如果试验结果在事件中，就说这个事件发生了。", "E：“偶数”，$E = {2, 4, 6}$。掷出 4 时，E 发生了。"],
    ["{ω}", "基本事件", "只含一个结果的事件。", "“掷出 6”：$E = {6}$。"],
    ["Ω, ∅", "必然事件和不可能事件", "必然事件就是整个 Ω——它总会发生，$P(Ω) = 1$。不可能事件是空集 $∅ = { }$——它永远不会发生，$P(∅) = 0$。", "“点数小于 7”是必然事件，“掷出 7”是不可能事件。"],
    ["Ē", "对立事件", "所有不在 E 中的结果。读作“E 拔”或“非 E”（也写作 E′ 或 Eᶜ）。有 $P(Ē) = 1 − P(E)$。", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$。"],
    ["P(E)", "概率", "P 表示概率（拉丁文 probabilitas，英文 probability）。P(E) 是 0（不可能）到 1（必然）之间的数，即 0 % 到 100 %。读作“E 的概率”。", "$P(偶数) = 1/2 = 0.5 = 50 %$。"],
    ["|E| : |Ω|", "古典概型（拉普拉斯试验）", "所有结果出现的可能性都相等的随机试验。这时有：P(E) = 有利结果数 ÷ 所有可能结果数。", "均匀骰子：$P(点数 ≥ 5) = 2/6 = 1/3$。不是古典概型：抛一枚图钉。"]
  ]],
  ["事件的运算", [
    ["A ∩ B", "交事件（“且”）", "A 和 B 同时发生时，A ∩ B 发生。它包含既在 A 中又在 B 中的结果。", "A：偶数，$A = {2, 4, 6}$；B：大于 3，$B = {4, 5, 6}$。则 $A ∩ B = {4, 6}$。"],
    ["A ∪ B", "并事件（“或”）", "A、B 中至少有一个发生（A 或 B 或两者）时，A ∪ B 发生。", "A、B 同上：$A ∪ B = {2, 4, 5, 6}$。"],
    ["A ∩ B = ∅", "互斥事件", "A 和 B 不能同时发生——它们没有公共结果。这时 $P(A ∪ B) = P(A) + P(B)$。", "“偶数”和“奇数”互斥。"]
  ]],
  ["多步试验", [
    ["", "多步随机试验，树状图", "几个随机试验依次进行。用树状图表示：每一步是一次分叉，从起点到终点的每条路线是一条路径。", "抛两次硬币；从袋中摸三次球。"],
    ["·", "路径乘法法则", "一条路径的概率等于它各分支上概率的乘积。", "两次都是 6：$1/6 · 1/6 = 1/36$。"],
    ["+", "加法法则", "如果一个事件包含几条路径，就把它们的概率相加。", "两枚硬币，恰好一次正面：$P(正反) + P(反正) = 1/4 + 1/4 = 1/2$。"],
    ["", "有放回和无放回", "有放回：摸出的球放回袋中——每一步的概率都相同。无放回：球被拿走了——概率会变化。", "3 个红球 2 个蓝球，两次都是红球：有放回 $3/5 · 3/5$，无放回 $3/5 · 2/4$。"]
  ]],
  ["频率", [
    ["n", "试验次数", "n 表示试验进行了多少次（试验次数、样本容量）。", "掷骰子 100 次：$n = 100$。"],
    ["H, h", "频数和频率", "频数 H 表示事件发生了多少次。频率是所占的比例：$h = H : n$。", "掷 100 次，其中 18 次是 6：$H = 18$，$h = 18/100 = 0.18 = 18 %$。"],
    ["h → P", "大数定律", "试验重复非常多次时，频率会越来越接近概率。可以在“模拟”页试一试。", "掷 10 次时出现 30 % 的 6 很正常；掷 10000 次后，比例非常接近 $1/6 ≈ 16.7 %$。"]
  ]],
  ["条件概率", [
    ["", "四格表", "表示两个特征 A 和 B 的表格，每个特征有两种情况（A 或 Ā，B 或 B̄）。中间四格是 $A ∩ B$、$A ∩ B̄$、$Ā ∩ B$、$Ā ∩ B̄$。边上是合计，右下角是 1（或总数）。", "A：“患病”，B：“检测阳性”——见“四格表”页。"],
    ["P(B | A) = P<sub>A</sub>(B)", "条件概率", "已知 A 发生的情况下 B 发生的概率。读作“在 A 发生的条件下 B 的概率”。也写作 P<sub>A</sub>(B)。计算：$P(B | A) = P(A ∩ B) : P(A)$。", "骰子，A：偶数，B：大于 3。$P(B | A) = 2/3$，因为 2、4、6 中有两个大于 3。"],
    ["", "相互独立", "A 和 B 互不影响：$P(A ∩ B) = P(A) · P(B)$，等价于 $P(B | A) = P(B)$。", "两次抛硬币相互独立。“偶数”和“大于 3”不独立：$P(B | A) = 2/3$，但 $P(B) = 1/2$。"],
    ["", "贝叶斯公式（反向树）", "已知 P(B | A)，反过来求 P(A | B)：$P(A | B) = P(A) · P(B | A) : P(B)$。", "检测阳性时，真正患病的概率有多大？"]
  ]],
  ["随机变量（高年级）", [
    ["X", "随机变量", "X 给每个结果对应一个数。$P(X = k)$ 是 X 恰好取值 k 的概率。", "两颗骰子，X = 点数和：$P(X = 7) = 6/36 = 1/6$。"],
    ["E(X), μ", "数学期望", "长期平均下来得到的值：每个值乘以它的概率，再全部相加。也写作 μ（希腊字母“缪”）。注意：这个 E 和事件 E 没有关系！", "一颗骰子：$E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3.5$。"],
    ["V(X), σ", "方差和标准差", "它们衡量数值在期望周围分散的程度。σ（希腊字母“西格玛”）是方差的平方根：$σ = √V(X)$。", "一颗骰子：$V(X) ≈ 2.92$，$σ ≈ 1.71$。"],
    ["p, q", "成功概率和失败概率", "伯努利试验只有两个结果：成功或失败。小写 p 是成功的概率，$q = 1 − p$ 是失败的概率。不要和大写的 P(…) 混淆！", "把“6”看作成功：$p = 1/6$，$q = 5/6$。"],
    ["n, k", "n 次独立重复试验，成功次数", "一个伯努利试验独立重复 n 次。k 是成功的次数。$X ~ B(n; p)$ 表示：X 服从二项分布。", "掷骰子 10 次，恰好 2 次 6：$n = 10$，$k = 2$，$p = 1/6$。"]
  ]]]
},
fr: {
  suche: "Chercher un terme ou un symbole …", nichts: "Rien trouvé.", bsp: "Exemple :",
  intro: "Tous les symboles et termes que l’on rencontre en classe, chacun avec un exemple. Presque tous les exemples utilisent un dé ordinaire.",
  gruppen: [
  ["Notions de base", [
    ["", "Expérience aléatoire", "Une expérience qui a plusieurs résultats possibles et dont on ne peut pas prévoir le résultat. On peut (au moins en théorie) la répéter autant de fois qu’on veut dans les mêmes conditions.", "Lancer un dé, lancer une pièce, tirer une boule d’une urne."],
    ["ω", "Issue", "Un seul résultat possible de l’expérience. Symbole : ω, le petit oméga grec. $ω ∈ E$ signifie : ω appartient à E.", "Quand on lance un dé, $ω = 4$ est une issue."],
    ["Ω", "Univers", "L’ensemble de toutes les issues possibles. Symbole : Ω, le grand oméga grec. Les issues s’écrivent entre accolades { }.", "Dé : $Ω = {1, 2, 3, 4, 5, 6}$. Deux pièces : $Ω = {PP, PF, FP, FF}$."],
    ["|Ω|", "Cardinal (nombre d’éléments)", "Les barres verticales signifient « nombre d’éléments ». |Ω| est le nombre de toutes les issues, |E| le nombre d’issues de E.", "Dé : $|Ω| = 6$. Pour $E = {2, 4, 6}$, $|E| = 3$."],
    ["E, A, B", "Événement", "Une partie de l’univers, c’est-à-dire un choix d’issues. On note les événements avec des majuscules : E, souvent aussi A, B, C. Un événement est réalisé si l’issue en fait partie.", "E : « nombre pair », $E = {2, 4, 6}$. Si on obtient 4, E est réalisé."],
    ["{ω}", "Événement élémentaire", "Un événement formé d’une seule issue.", "« obtenir un six » : $E = {6}$."],
    ["Ω, ∅", "Événement certain et impossible", "L’événement certain est Ω tout entier : il se réalise toujours, $P(Ω) = 1$. L’événement impossible est l’ensemble vide $∅ = { }$ : il ne se réalise jamais, $P(∅) = 0$.", "« nombre inférieur à 7 » est certain, « obtenir 7 » est impossible."],
    ["Ē", "Événement contraire", "Toutes les issues qui ne sont pas dans E. Se lit « E barre » ou « non E ». On a $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Probabilité", "P vient de probabilité (latin probabilitas). P(E) est un nombre entre 0 (jamais) et 1 (certain), donc entre 0 % et 100 %. Se lit : « P de E ».", "$P(nombre pair) = 1/2 = 0,5 = 50 %$."],
    ["|E| : |Ω|", "Équiprobabilité (expérience de Laplace)", "Une expérience où toutes les issues ont la même probabilité. Alors : P(E) = nombre d’issues favorables : nombre d’issues possibles.", "Dé équilibré : $P(nombre ≥ 5) = 2/6 = 1/3$. Pas équiprobable : lancer une punaise."]
  ]],
  ["Opérations sur les événements", [
    ["A ∩ B", "Intersection (« et »)", "A ∩ B est réalisé si A et B sont réalisés tous les deux. Il contient les issues qui sont dans A et dans B.", "A : pair, $A = {2, 4, 6}$ ; B : supérieur à 3, $B = {4, 5, 6}$. Alors $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Réunion (« ou »)", "A ∪ B est réalisé si au moins l’un des deux est réalisé (A ou B ou les deux).", "Avec A et B comme ci-dessus : $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Incompatibles (disjoints)", "A et B ne peuvent pas se réaliser en même temps : ils n’ont aucune issue commune. Alors $P(A ∪ B) = P(A) + P(B)$.", "« pair » et « impair » sont incompatibles."]
  ]],
  ["Expériences à plusieurs épreuves", [
    ["", "Expérience à plusieurs épreuves, arbre", "Plusieurs expériences aléatoires à la suite. On les représente par un arbre pondéré : chaque épreuve est un embranchement, chaque chemin du départ à la fin est un chemin de l’arbre.", "Lancer une pièce deux fois ; tirer trois fois dans une urne."],
    ["·", "Règle du produit (chemin)", "La probabilité d’un chemin est le produit des probabilités sur ses branches.", "Deux six : $1/6 · 1/6 = 1/36$."],
    ["+", "Règle de la somme", "Si plusieurs chemins mènent à un événement, on additionne leurs probabilités.", "Deux pièces, exactement un pile : $P(PF) + P(FP) = 1/4 + 1/4 = 1/2$."],
    ["", "Avec et sans remise", "Avec remise, la boule tirée est remise dans l’urne : les probabilités restent les mêmes à chaque épreuve. Sans remise, elle manque ensuite : les probabilités changent.", "3 boules rouges et 2 bleues, deux fois rouge : avec remise $3/5 · 3/5$, sans remise $3/5 · 2/4$."]
  ]],
  ["Fréquences", [
    ["n", "Nombre de répétitions", "n indique combien de fois on réalise l’expérience (nombre d’essais, taille de l’échantillon).", "Lancer un dé 100 fois : $n = 100$."],
    ["H, h", "Effectif et fréquence", "L’effectif H (fréquence absolue) dit combien de fois un événement s’est réalisé. La fréquence est la proportion : $h = H : n$.", "100 lancers, 18 six : $H = 18$, $h = 18/100 = 0,18 = 18 %$."],
    ["h → P", "Loi des grands nombres", "Si on répète une expérience un très grand nombre de fois, la fréquence se rapproche de plus en plus de la probabilité. Essaie dans l’onglet « Simulation ».", "Après 10 lancers, 30 % de six est tout à fait possible ; après 10 000 lancers, la proportion est très proche de $1/6 ≈ 16,7 %$."]
  ]],
  ["Probabilité conditionnelle", [
    ["", "Tableau croisé", "Un tableau pour deux caractères A et B avec chacun deux possibilités (A ou Ā, B ou B̄). Les quatre cases intérieures sont $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. En marge on trouve les totaux, en bas à droite 1 (ou l’effectif total).", "A : « malade », B : « test positif » – voir l’onglet « Tableau croisé »."],
    ["P(B | A) = P<sub>A</sub>(B)", "Probabilité conditionnelle", "La probabilité de B quand on sait déjà que A est réalisé. Se lit : « probabilité de B sachant A ». Notation courante en France : P<sub>A</sub>(B). Calcul : $P(B | A) = P(A ∩ B) : P(A)$.", "Dé, A : pair, B : supérieur à 3. $P(B | A) = 2/3$, car parmi 2, 4, 6, deux nombres sont supérieurs à 3."],
    ["", "Événements indépendants", "A et B ne s’influencent pas : $P(A ∩ B) = P(A) · P(B)$, ce qui revient à $P(B | A) = P(B)$.", "Deux lancers de pièce sont indépendants. « pair » et « supérieur à 3 » ne le sont pas : $P(B | A) = 2/3$, mais $P(B) = 1/2$."],
    ["", "Formule de Bayes (arbre inversé)", "On connaît P(B | A) et on cherche dans l’autre sens P(A | B) : $P(A | B) = P(A) · P(B | A) : P(B)$.", "Quelle est la probabilité d’être malade si le test est positif ?"]
  ]],
  ["Variables aléatoires (lycée)", [
    ["X", "Variable aléatoire", "X associe un nombre à chaque issue. $P(X = k)$ est la probabilité que X prenne exactement la valeur k.", "Deux dés, X = somme : $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Espérance", "La valeur obtenue en moyenne à long terme : chaque valeur fois sa probabilité, le tout additionné. Notée aussi μ (grec « mu »). Attention : ce E n’a rien à voir avec un événement E !", "Un dé : $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3,5$."],
    ["V(X), σ", "Variance et écart type", "Ils mesurent à quel point les valeurs se dispersent autour de l’espérance. σ (grec « sigma ») est la racine de la variance : $σ = √V(X)$.", "Un dé : $V(X) ≈ 2,92$, $σ ≈ 1,71$."],
    ["p, q", "Probabilité de succès et d’échec", "Une épreuve de Bernoulli n’a que deux issues : succès ou échec. Le petit p est la probabilité de succès, $q = 1 − p$ celle d’échec. Ne pas confondre avec le grand P(…) !", "« six » est un succès : $p = 1/6$, $q = 5/6$."],
    ["n, k", "Schéma de Bernoulli, nombre de succès", "Une épreuve de Bernoulli est répétée n fois de façon indépendante. k est le nombre de succès. $X ~ B(n; p)$ signifie : X suit une loi binomiale.", "Lancer un dé 10 fois, exactement 2 six : $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
},
ru: {
  suche: "Найти термин или знак …", nichts: "Ничего не найдено.", bsp: "Пример:",
  intro: "Все знаки и термины, которые встречаются в школе, – каждый с примером. Почти во всех примерах используется обычный игральный кубик.",
  gruppen: [
  ["Основные понятия", [
    ["", "Случайный опыт (эксперимент)", "Действие с несколькими возможными исходами, результат которого заранее неизвестен. Его можно (хотя бы мысленно) повторять сколько угодно раз в одинаковых условиях.", "Бросить кубик, подбросить монету, вынуть шар из урны."],
    ["ω", "Исход (элементарный исход)", "Один возможный результат опыта. Знак: ω, малая греческая буква омега. $ω ∈ E$ значит: ω принадлежит E.", "При броске кубика $ω = 4$ – это исход."],
    ["Ω", "Пространство элементарных исходов", "Множество всех возможных исходов. Знак: Ω, большая греческая омега. Исходы записывают в фигурных скобках { }.", "Кубик: $Ω = {1, 2, 3, 4, 5, 6}$. Две монеты: $Ω = {ОО, ОР, РО, РР}$."],
    ["|Ω|", "Мощность (число элементов)", "Вертикальные черты означают «число элементов». |Ω| – число всех исходов, |E| – число исходов в E.", "Кубик: $|Ω| = 6$. Для $E = {2, 4, 6}$ $|E| = 3$."],
    ["E, A, B", "Событие", "Подмножество пространства исходов, то есть набор исходов. События обозначают заглавными буквами: E, часто также A, B, C. Событие наступает, если исход в нём лежит.", "E: «чётное число», $E = {2, 4, 6}$. Если выпало 4, событие E наступило."],
    ["{ω}", "Элементарное событие", "Событие, состоящее ровно из одного исхода.", "«выпала шестёрка»: $E = {6}$."],
    ["Ω, ∅", "Достоверное и невозможное событие", "Достоверное событие – это всё Ω: оно наступает всегда, $P(Ω) = 1$. Невозможное событие – пустое множество $∅ = { }$: оно не наступает никогда, $P(∅) = 0$.", "«число меньше 7» – достоверное, «выпало 7» – невозможное."],
    ["Ē", "Противоположное событие", "Все исходы, которые не входят в E. Читается «E с чертой» или «не E». Верно $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Вероятность", "P – от слова «вероятность» (лат. probabilitas, англ. probability). P(E) – число от 0 (никогда) до 1 (наверняка), то есть от 0 % до 100 %. Читается: «P от E».", "$P(чётное число) = 1/2 = 0,5 = 50 %$."],
    ["|E| : |Ω|", "Классическая вероятность (опыт Лапласа)", "Опыт, в котором все исходы равновозможны. Тогда P(E) = число благоприятных исходов : число всех исходов.", "Правильный кубик: $P(число ≥ 5) = 2/6 = 1/3$. Не классический случай: бросок канцелярской кнопки."]
  ]],
  ["Действия с событиями", [
    ["A ∩ B", "Пересечение («и»)", "A ∩ B наступает, если наступают и A, и B. Оно содержит исходы, которые лежат и в A, и в B.", "A: чётное, $A = {2, 4, 6}$; B: больше 3, $B = {4, 5, 6}$. Тогда $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Объединение («или»)", "A ∪ B наступает, если наступает хотя бы одно из двух (A, или B, или оба).", "A и B как выше: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Несовместные события", "A и B не могут наступить одновременно – у них нет общих исходов. Тогда $P(A ∪ B) = P(A) + P(B)$.", "«чётное» и «нечётное» несовместны."]
  ]],
  ["Многоэтапные опыты", [
    ["", "Многоэтапный опыт, дерево вероятностей", "Несколько случайных опытов друг за другом. Их изображают деревом: каждый этап – разветвление, каждый путь от начала до конца – ветвь (путь).", "Подбросить монету два раза; три раза вынуть шар из урны."],
    ["·", "Правило умножения (по пути)", "Вероятность пути равна произведению вероятностей на его ветвях.", "Две шестёрки: $1/6 · 1/6 = 1/36$."],
    ["+", "Правило сложения", "Если событию соответствуют несколько путей, их вероятности складывают.", "Две монеты, ровно один орёл: $P(ОР) + P(РО) = 1/4 + 1/4 = 1/2$."],
    ["", "С возвращением и без возвращения", "С возвращением вынутый шар кладут обратно – вероятности на каждом этапе одинаковы. Без возвращения его больше нет – вероятности меняются.", "3 красных и 2 синих шара, два раза красный: с возвращением $3/5 · 3/5$, без возвращения $3/5 · 2/4$."]
  ]],
  ["Частоты", [
    ["n", "Число испытаний", "n показывает, сколько раз проводится опыт (число испытаний, объём выборки).", "Бросить кубик 100 раз: $n = 100$."],
    ["H, h", "Абсолютная и относительная частота", "Абсолютная частота H показывает, сколько раз наступило событие. Относительная частота – это доля: $h = H : n$.", "100 бросков, 18 шестёрок: $H = 18$, $h = 18/100 = 0,18 = 18 %$."],
    ["h → P", "Закон больших чисел", "Если опыт повторять очень много раз, относительная частота всё ближе подходит к вероятности. Попробуй на вкладке «Моделирование».", "После 10 бросков 30 % шестёрок – вполне обычно, после 10 000 бросков доля очень близка к $1/6 ≈ 16,7 %$."]
  ]],
  ["Условная вероятность", [
    ["", "Таблица 2×2 (таблица сопряжённости)", "Таблица для двух признаков A и B, у каждого два варианта (A или Ā, B или B̄). Четыре внутренние клетки – это $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. По краям – суммы, справа внизу – 1 (или общее число).", "A: «болен», B: «тест положительный» – см. вкладку «Таблица 2×2»."],
    ["P(B | A) = P<sub>A</sub>(B)", "Условная вероятность", "Вероятность B, если уже известно, что A наступило. Читается: «вероятность B при условии A». Другая запись: P<sub>A</sub>(B). Расчёт: $P(B | A) = P(A ∩ B) : P(A)$.", "Кубик, A: чётное, B: больше 3. $P(B | A) = 2/3$, потому что из 2, 4, 6 два числа больше 3."],
    ["", "Независимые события", "A и B не влияют друг на друга: $P(A ∩ B) = P(A) · P(B)$, что то же самое, что $P(B | A) = P(B)$.", "Два броска монеты независимы. «чётное» и «больше 3» – нет: $P(B | A) = 2/3$, но $P(B) = 1/2$."],
    ["", "Формула Байеса (обратное дерево)", "Известна P(B | A), а нужна обратная P(A | B): $P(A | B) = P(A) · P(B | A) : P(B)$.", "Какова вероятность быть больным, если тест положительный?"]
  ]],
  ["Случайные величины (старшие классы)", [
    ["X", "Случайная величина", "X сопоставляет каждому исходу число. $P(X = k)$ – вероятность того, что X примет ровно значение k.", "Два кубика, X = сумма очков: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Математическое ожидание", "Значение, которое получается в среднем при многих повторениях: каждое значение умножают на его вероятность и всё складывают. В России часто пишут M(X), также μ (греч. «мю»). Внимание: это E не имеет отношения к событию E!", "Один кубик: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3,5$."],
    ["V(X), σ", "Дисперсия и стандартное отклонение", "Показывают, насколько значения разбросаны вокруг ожидания. Дисперсию часто обозначают D(X). σ (греч. «сигма») – корень из дисперсии: $σ = √V(X)$.", "Один кубик: $V(X) ≈ 2,92$, $σ ≈ 1,71$."],
    ["p, q", "Вероятность успеха и неудачи", "В испытании Бернулли только два исхода: успех или неудача. Малая p – вероятность успеха, $q = 1 − p$ – вероятность неудачи. Не путать с большой P(…)!", "«шестёрка» – успех: $p = 1/6$, $q = 5/6$."],
    ["n, k", "Схема Бернулли, число успехов", "Испытание Бернулли повторяют n раз независимо. k – число успехов. $X ~ B(n; p)$ значит: X распределена по биномиальному закону.", "10 бросков кубика, ровно 2 шестёрки: $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
},
ar: {
  suche: "ابحث عن مصطلح أو رمز …", nichts: "لم يُعثر على شيء.", bsp: "مثال:",
  intro: "كل الرموز والمصطلحات التي تصادفها في المدرسة، مع مثال لكل منها. تستخدم معظم الأمثلة حجر نرد عاديًا.",
  gruppen: [
  ["مفاهيم أساسية", [
    ["", "التجربة العشوائية", "عملية لها عدة نتائج ممكنة ولا نعرف مسبقًا أيها سيحدث. يمكن (نظريًا على الأقل) تكرارها أي عدد من المرات في الظروف نفسها.", "رمي حجر نرد، رمي قطعة نقود، سحب كرة من صندوق."],
    ["ω", "النتيجة", "نتيجة واحدة ممكنة للتجربة. الرمز: ω، حرف أوميغا اليوناني الصغير. $ω ∈ E$ تعني: ω تنتمي إلى E.", "عند رمي حجر النرد، $ω = 4$ نتيجة."],
    ["Ω", "فضاء العينة", "مجموعة كل النتائج الممكنة. الرمز: Ω، حرف أوميغا اليوناني الكبير (أحيانًا S). تُكتب النتائج بين قوسي المجموعة { }.", "حجر نرد: $Ω = {1, 2, 3, 4, 5, 6}$. قطعتا نقود: $Ω = {صص, صك, كص, كك}$."],
    ["|Ω|", "عدد العناصر", "الخطان العموديان يعنيان «عدد العناصر». |Ω| هو عدد كل النتائج، و|E| عدد النتائج في E.", "حجر نرد: $|Ω| = 6$. وللحدث $E = {2, 4, 6}$ يكون $|E| = 3$."],
    ["E, A, B", "الحدث", "مجموعة جزئية من فضاء العينة، أي مجموعة مختارة من النتائج. تُكتب الأحداث بحروف كبيرة: E، وغالبًا A وB وC. يقع الحدث إذا كانت النتيجة فيه.", "E: «عدد زوجي»، $E = {2, 4, 6}$. إذا ظهر 4 فقد وقع E."],
    ["{ω}", "الحدث البسيط", "حدث يتكوّن من نتيجة واحدة فقط.", "«ظهور ستة»: $E = {6}$."],
    ["Ω, ∅", "الحدث المؤكد والحدث المستحيل", "الحدث المؤكد هو Ω كله – يقع دائمًا، $P(Ω) = 1$. الحدث المستحيل هو المجموعة الخالية $∅ = { }$ – لا يقع أبدًا، $P(∅) = 0$.", "«عدد أصغر من 7» مؤكد، «ظهور 7» مستحيل."],
    ["Ē", "الحدث المتمم", "كل النتائج التي ليست في E. يُقرأ «E بشرطة» أو «ليس E». ويكون $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "الاحتمال", "P تعني الاحتمال (باللاتينية probabilitas وبالإنجليزية probability). P(E) عدد من 0 (لا يقع أبدًا) إلى 1 (مؤكد)، أي من 0 % إلى 100 %. يُقرأ: «احتمال E».", "$P(عدد زوجي) = 1/2 = 0.5 = 50 %$."],
    ["|E| : |Ω|", "تجربة لابلاس (النتائج متساوية الاحتمال)", "تجربة عشوائية كل نتائجها متساوية الاحتمال. عندها: P(E) = عدد الحالات المواتية : عدد كل الحالات الممكنة.", "حجر نرد منتظم: $P(عدد ≥ 5) = 2/6 = 1/3$. ليست تجربة لابلاس: رمي دبوس ورق."]
  ]],
  ["العمليات على الأحداث", [
    ["A ∩ B", "التقاطع («و»)", "يقع A ∩ B إذا وقع A وB معًا. ويضم النتائج الموجودة في A وفي B.", "A: زوجي، $A = {2, 4, 6}$؛ B: أكبر من 3، $B = {4, 5, 6}$. إذن $A ∩ B = {4, 6}$."],
    ["A ∪ B", "الاتحاد («أو»)", "يقع A ∪ B إذا وقع واحد منهما على الأقل (A أو B أو كلاهما).", "مع A وB كما سبق: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "حدثان متنافيان", "لا يمكن أن يقع A وB في الوقت نفسه – ليس بينهما أي نتيجة مشتركة. عندها $P(A ∪ B) = P(A) + P(B)$.", "«زوجي» و«فردي» حدثان متنافيان."]
  ]],
  ["التجارب متعددة المراحل", [
    ["", "تجربة متعددة المراحل، المخطط الشجري", "عدة تجارب عشوائية واحدة بعد الأخرى. تُرسم كمخطط شجري: كل مرحلة تفرّع، وكل طريق من البداية إلى النهاية مسار.", "رمي قطعة نقود مرتين؛ السحب من صندوق ثلاث مرات."],
    ["·", "قاعدة الضرب (قاعدة المسار)", "احتمال المسار هو حاصل ضرب الاحتمالات على فروعه.", "ستة مرتين: $1/6 · 1/6 = 1/36$."],
    ["+", "قاعدة الجمع", "إذا انتمت عدة مسارات إلى حدث واحد، نجمع احتمالاتها.", "قطعتا نقود، صورة مرة واحدة بالضبط: $P(صك) + P(كص) = 1/4 + 1/4 = 1/2$."],
    ["", "مع الإرجاع ودون إرجاع", "مع الإرجاع تعود الكرة المسحوبة إلى الصندوق – تبقى الاحتمالات نفسها في كل مرحلة. دون إرجاع تنقص بعد ذلك – تتغير الاحتمالات.", "3 كرات حمراء و2 زرقاء، أحمر مرتين: مع الإرجاع $3/5 · 3/5$، دون إرجاع $3/5 · 2/4$."]
  ]],
  ["التكرارات", [
    ["n", "عدد مرات التكرار", "n يبيّن كم مرة تُجرى التجربة (عدد المحاولات، حجم العينة).", "رمي حجر النرد 100 مرة: $n = 100$."],
    ["H, h", "التكرار المطلق والتكرار النسبي", "التكرار المطلق H يبيّن كم مرة وقع الحدث. التكرار النسبي هو النسبة: $h = H : n$.", "100 رمية، منها 18 ستة: $H = 18$، $h = 18/100 = 0.18 = 18 %$."],
    ["h → P", "قانون الأعداد الكبيرة", "إذا كُررت التجربة مرات كثيرة جدًا، يقترب التكرار النسبي أكثر فأكثر من الاحتمال. جرّب ذلك في تبويب «المحاكاة».", "بعد 10 رميات من الممكن تمامًا أن تكون 30 % ستات، وبعد 10000 رمية تقترب النسبة كثيرًا من $1/6 ≈ 16.7 %$."]
  ]],
  ["الاحتمال الشرطي", [
    ["", "الجدول الرباعي", "جدول لصفتين A وB لكل منهما حالتان (A أو Ā، B أو B̄). الخانات الأربع الداخلية هي $A ∩ B$ و$A ∩ B̄$ و$Ā ∩ B$ و$Ā ∩ B̄$. على الأطراف المجاميع، وفي الزاوية 1 (أو العدد الكلي).", "A: «مريض»، B: «الفحص إيجابي» – انظر تبويب «جدول رباعي»."],
    ["P(B | A) = P<sub>A</sub>(B)", "الاحتمال الشرطي", "احتمال B عندما نعرف مسبقًا أن A قد وقع. يُقرأ: «احتمال B بشرط A». ويُكتب أيضًا P<sub>A</sub>(B). الحساب: $P(B | A) = P(A ∩ B) : P(A)$.", "حجر نرد، A: زوجي، B: أكبر من 3. $P(B | A) = 2/3$، لأن عددين من 2 و4 و6 أكبر من 3."],
    ["", "حدثان مستقلان", "لا يؤثر A وB أحدهما في الآخر: $P(A ∩ B) = P(A) · P(B)$، وهذا يعني $P(B | A) = P(B)$.", "رميتان لقطعة نقود مستقلتان. «زوجي» و«أكبر من 3» ليسا كذلك: $P(B | A) = 2/3$ لكن $P(B) = 1/2$."],
    ["", "مبرهنة بايز (الشجرة المعكوسة)", "نعرف P(B | A) ونريد العكس P(A | B): $P(A | B) = P(A) · P(B | A) : P(B)$.", "ما احتمال أن يكون الشخص مريضًا إذا كان الفحص إيجابيًا؟"]
  ]],
  ["المتغيرات العشوائية (الصفوف العليا)", [
    ["X", "المتغير العشوائي", "X يربط كل نتيجة بعدد. $P(X = k)$ هو احتمال أن يأخذ X القيمة k بالضبط.", "حجرا نرد، X = مجموع النقاط: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "القيمة المتوقعة", "القيمة التي نحصل عليها في المتوسط على المدى الطويل: كل قيمة مضروبة في احتمالها، ثم نجمع الكل. يُرمز لها أيضًا بـ μ (الحرف اليوناني «مو»). انتبه: هذا الـ E لا علاقة له بالحدث E!", "حجر نرد واحد: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3.5$."],
    ["V(X), σ", "التباين والانحراف المعياري", "يقيسان مدى تشتت القيم حول القيمة المتوقعة. σ (الحرف اليوناني «سيغما») هو الجذر التربيعي للتباين: $σ = √V(X)$.", "حجر نرد واحد: $V(X) ≈ 2.92$، $σ ≈ 1.71$."],
    ["p, q", "احتمال النجاح واحتمال الإخفاق", "لتجربة برنولي نتيجتان فقط: نجاح أو إخفاق. الحرف الصغير p هو احتمال النجاح، و$q = 1 − p$ احتمال الإخفاق. لا تخلط بينه وبين P(…) الكبير!", "«ستة» نجاح: $p = 1/6$، $q = 5/6$."],
    ["n, k", "سلسلة برنولي، عدد النجاحات", "تُكرر تجربة برنولي n مرة بشكل مستقل. k هو عدد النجاحات. $X ~ B(n; p)$ تعني: X يتبع التوزيع الثنائي.", "رمي حجر النرد 10 مرات، ستة مرتين بالضبط: $n = 10$، $k = 2$، $p = 1/6$."]
  ]]]
},
ja: {
  suche: "用語や記号を検索…", nichts: "見つかりませんでした。", bsp: "例：",
  intro: "学校で出てくる記号と用語を、例といっしょにまとめました。例のほとんどはふつうのさいころを使っています。",
  gruppen: [
  ["基本の用語", [
    ["", "試行（ランダムな実験）", "結果がいくつかあり、どれが出るか前もってわからない実験。同じ条件で（少なくとも考え方の上では）何回でもくり返せる。", "さいころを投げる、硬貨を投げる、袋から玉を 1 個取り出す。"],
    ["ω", "結果（根元事象の要素）", "試行で起こりうる 1 つの結果。記号：ω（ギリシャ文字オメガの小文字）。$ω ∈ E$ は「ω は E に含まれる」という意味。", "さいころを投げたとき、$ω = 4$ は 1 つの結果。"],
    ["Ω", "標本空間（全事象）", "起こりうるすべての結果の集合。記号：Ω（オメガの大文字）。日本の教科書では U と書くことも多い。結果は集合の括弧 { } の中に書く。", "さいころ：$Ω = {1, 2, 3, 4, 5, 6}$。硬貨 2 枚：$Ω = {表表, 表裏, 裏表, 裏裏}$。"],
    ["|Ω|", "要素の個数", "縦線は「要素の個数」を表す。n(Ω) と書くこともある。|Ω| はすべての結果の数、|E| は E に含まれる結果の数。", "さいころ：$|Ω| = 6$。$E = {2, 4, 6}$ なら $|E| = 3$。"],
    ["E, A, B", "事象", "標本空間の部分集合、つまり結果をいくつか選んだもの。事象は大文字で書く：E、また A、B、C など。結果がその中に入っていれば、その事象が起こったという。", "E：「偶数の目」、$E = {2, 4, 6}$。4 が出たら E が起こった。"],
    ["{ω}", "根元事象", "ただ 1 つの結果だけからなる事象。", "「6 の目が出る」：$E = {6}$。"],
    ["Ω, ∅", "全事象と空事象", "全事象は Ω 全体で、必ず起こる：$P(Ω) = 1$。空事象は空集合 $∅ = { }$ で、決して起こらない：$P(∅) = 0$。", "「7 より小さい目」は必ず起こる。「7 の目が出る」は起こらない。"],
    ["Ē", "余事象", "E に含まれないすべての結果。「E バー」と読む（「E でない」）。$P(Ē) = 1 − P(E)$ が成り立つ。", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$。"],
    ["P(E)", "確率", "P は確率（ラテン語 probabilitas、英語 probability）の頭文字。P(E) は 0（決して起こらない）から 1（必ず起こる）までの数、つまり 0 % から 100 %。「E の確率」と読む。", "$P(偶数の目) = 1/2 = 0.5 = 50 %$。"],
    ["|E| : |Ω|", "同様に確からしい（ラプラスの試行）", "どの結果も同じ程度に起こりやすい試行。このとき P(E) = E が起こる場合の数 ÷ すべての場合の数。", "正しいさいころ：$P(5 以上の目) = 2/6 = 1/3$。同様に確からしくない例：画びょうを投げる。"]
  ]],
  ["事象の組み合わせ", [
    ["A ∩ B", "積事象（「かつ」）", "A と B がどちらも起こるとき A ∩ B が起こる。A にも B にも入っている結果の集まり。", "A：偶数、$A = {2, 4, 6}$；B：3 より大きい、$B = {4, 5, 6}$。このとき $A ∩ B = {4, 6}$。"],
    ["A ∪ B", "和事象（「または」）", "少なくとも一方が起こる（A か B か両方）とき A ∪ B が起こる。", "A、B は上と同じ：$A ∪ B = {2, 4, 5, 6}$。"],
    ["A ∩ B = ∅", "排反事象", "A と B は同時には起こらない――共通の結果がない。このとき $P(A ∪ B) = P(A) + P(B)$。", "「偶数」と「奇数」は排反。"]
  ]],
  ["何段階かの試行", [
    ["", "何段階かの試行、樹形図", "いくつかの試行を順に行うもの。樹形図で表す：各段階が枝分かれで、スタートから終わりまでの道が 1 本の経路。", "硬貨を 2 回投げる；袋から 3 回取り出す。"],
    ["·", "積の法則（経路の確率）", "1 本の経路の確率は、その枝の確率をかけたもの。", "2 回とも 6：$1/6 · 1/6 = 1/36$。"],
    ["+", "和の法則", "1 つの事象にいくつかの経路が含まれるときは、それらの確率をたす。", "硬貨 2 枚、表がちょうど 1 回：$P(表裏) + P(裏表) = 1/4 + 1/4 = 1/2$。"],
    ["", "復元抽出と非復元抽出", "復元抽出（もどす）では取り出した玉を袋にもどす――どの段階でも確率は同じ。非復元抽出（もどさない）では玉が減る――確率が変わる。", "赤玉 3 個と青玉 2 個、2 回とも赤：もどす $3/5 · 3/5$、もどさない $3/5 · 2/4$。"]
  ]],
  ["度数と相対度数", [
    ["n", "試行回数", "n は試行を何回行うかを表す（試行回数、標本の大きさ）。", "さいころを 100 回投げる：$n = 100$。"],
    ["H, h", "度数と相対度数", "度数 H はその事象が何回起こったか。相対度数はその割合：$h = H : n$。", "100 回投げて 6 が 18 回：$H = 18$、$h = 18/100 = 0.18 = 18 %$。"],
    ["h → P", "大数の法則", "試行を非常に多くくり返すと、相対度数は確率にどんどん近づく。「シミュレーション」タブで試してみよう。", "10 回なら 6 が 30 % 出ることもよくある。10000 回では割合は $1/6 ≈ 16.7 %$ にとても近い。"]
  ]],
  ["条件付き確率", [
    ["", "分割表（2×2 の表）", "2 つの特徴 A と B（それぞれ A か Ā、B か B̄）の表。内側の 4 マスは $A ∩ B$、$A ∩ B̄$、$Ā ∩ B$、$Ā ∩ B̄$。端には合計、右下は 1（または全体の数）。", "A：「病気」、B：「検査が陽性」――「分割表」タブを見よう。"],
    ["P(B | A) = P<sub>A</sub>(B)", "条件付き確率", "A が起こったとわかっているときの B の確率。「A が起こったときの B の確率」と読む。日本の教科書では P<sub>A</sub>(B) と書くことが多い。計算：$P(B | A) = P(A ∩ B) : P(A)$。", "さいころ、A：偶数、B：3 より大きい。$P(B | A) = 2/3$。2、4、6 のうち 3 より大きいのは 2 つだから。"],
    ["", "独立", "A と B は互いに影響しない：$P(A ∩ B) = P(A) · P(B)$。これは $P(B | A) = P(B)$ と同じ意味。", "硬貨を 2 回投げるのは独立。「偶数」と「3 より大きい」は独立でない：$P(B | A) = 2/3$ だが $P(B) = 1/2$。"],
    ["", "ベイズの定理（逆向きの樹形図）", "P(B | A) がわかっていて、逆の P(A | B) を求める：$P(A | B) = P(A) · P(B | A) : P(B)$。", "検査が陽性のとき、本当に病気である確率は？"]
  ]],
  ["確率変数（高校）", [
    ["X", "確率変数", "X はそれぞれの結果に数を対応させる。$P(X = k)$ は X がちょうど k になる確率。", "さいころ 2 個、X = 目の和：$P(X = 7) = 6/36 = 1/6$。"],
    ["E(X), μ", "期待値", "長い目で見たときの平均の値：それぞれの値にその確率をかけて、全部たす。μ（ギリシャ文字「ミュー」）とも書く。注意：この E は事象 E とは関係ない！", "さいころ 1 個：$E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3.5$。"],
    ["V(X), σ", "分散と標準偏差", "値が期待値のまわりにどれだけ散らばっているかを表す。σ（ギリシャ文字「シグマ」）は分散の正の平方根：$σ = √V(X)$。", "さいころ 1 個：$V(X) ≈ 2.92$、$σ ≈ 1.71$。"],
    ["p, q", "成功の確率と失敗の確率", "ベルヌーイ試行には成功か失敗かの 2 つの結果しかない。小文字の p は成功の確率、$q = 1 − p$ は失敗の確率。大文字の P(…) とまちがえないように！", "「6 の目」を成功とする：$p = 1/6$、$q = 5/6$。"],
    ["n, k", "反復試行、成功の回数", "ベルヌーイ試行を独立に n 回くり返す。k は成功の回数。$X ~ B(n; p)$ は「X は二項分布に従う」という意味。", "さいころを 10 回投げて 6 がちょうど 2 回：$n = 10$、$k = 2$、$p = 1/6$。"]
  ]]]
},
pt: {
  suche: "Procurar um termo ou símbolo …", nichts: "Nada encontrado.", bsp: "Exemplo:",
  intro: "Todos os símbolos e termos que aparecem na escola, cada um com um exemplo. Quase todos os exemplos usam um dado normal.",
  gruppen: [
  ["Conceitos básicos", [
    ["", "Experiência aleatória", "Um processo com vários resultados possíveis em que não se sabe antes o que vai sair. Pode ser repetido (pelo menos em teoria) tantas vezes quanto se queira nas mesmas condições.", "Lançar um dado, lançar uma moeda, tirar uma bola de uma urna."],
    ["ω", "Resultado", "Um único resultado possível da experiência. Símbolo: ω, o ómega grego minúsculo. $ω ∈ E$ significa: ω pertence a E.", "Ao lançar um dado, $ω = 4$ é um resultado."],
    ["Ω", "Espaço amostral (espaço de resultados)", "O conjunto de todos os resultados possíveis. Símbolo: Ω, o ómega grego maiúsculo (às vezes S). Os resultados escrevem-se entre chavetas { }.", "Dado: $Ω = {1, 2, 3, 4, 5, 6}$. Duas moedas: $Ω = {FF, FC, CF, CC}$."],
    ["|Ω|", "Cardinal (número de elementos)", "As barras verticais significam «número de elementos». |Ω| é o número de todos os resultados, |E| o número de resultados em E.", "Dado: $|Ω| = 6$. Para $E = {2, 4, 6}$, $|E| = 3$."],
    ["E, A, B", "Acontecimento", "Um subconjunto do espaço amostral, ou seja, uma seleção de resultados. Os acontecimentos escrevem-se com maiúsculas: E, muitas vezes também A, B, C. Um acontecimento realiza-se se o resultado estiver nele.", "E: «número par», $E = {2, 4, 6}$. Se sair 4, E realizou-se."],
    ["{ω}", "Acontecimento elementar", "Um acontecimento formado por exatamente um resultado.", "«sair seis»: $E = {6}$."],
    ["Ω, ∅", "Acontecimento certo e impossível", "O acontecimento certo é todo o Ω: realiza-se sempre, $P(Ω) = 1$. O acontecimento impossível é o conjunto vazio $∅ = { }$: nunca se realiza, $P(∅) = 0$.", "«número menor que 7» é certo, «sair 7» é impossível."],
    ["Ē", "Acontecimento contrário", "Todos os resultados que não estão em E. Lê-se «E barra» ou «não E». Tem-se $P(Ē) = 1 − P(E)$.", "$E = {2, 4, 6}$ → $Ē = {1, 3, 5}$."],
    ["P(E)", "Probabilidade", "P vem de probabilidade (latim probabilitas). P(E) é um número de 0 (nunca) a 1 (certo), ou seja, de 0 % a 100 %. Lê-se: «P de E».", "$P(número par) = 1/2 = 0,5 = 50 %$."],
    ["|E| : |Ω|", "Experiência de Laplace", "Uma experiência em que todos os resultados são igualmente prováveis. Então vale a regra de Laplace: P(E) = casos favoráveis : casos possíveis.", "Dado equilibrado: $P(número ≥ 5) = 2/6 = 1/3$. Não é de Laplace: lançar um pionés."]
  ]],
  ["Operações com acontecimentos", [
    ["A ∩ B", "Interseção («e»)", "A ∩ B realiza-se se A e B se realizarem ao mesmo tempo. Contém os resultados que estão em A e em B.", "A: par, $A = {2, 4, 6}$; B: maior que 3, $B = {4, 5, 6}$. Então $A ∩ B = {4, 6}$."],
    ["A ∪ B", "Reunião («ou»)", "A ∪ B realiza-se se pelo menos um dos dois se realizar (A ou B ou ambos).", "Com A e B como acima: $A ∪ B = {2, 4, 5, 6}$."],
    ["A ∩ B = ∅", "Incompatíveis (disjuntos)", "A e B não se podem realizar ao mesmo tempo: não têm nenhum resultado em comum. Então $P(A ∪ B) = P(A) + P(B)$.", "«par» e «ímpar» são incompatíveis."]
  ]],
  ["Experiências compostas", [
    ["", "Experiência em várias etapas, diagrama em árvore", "Várias experiências aleatórias seguidas. Representam-se num diagrama em árvore: cada etapa é uma ramificação e cada caminho do início ao fim é um caminho da árvore.", "Lançar uma moeda duas vezes; tirar três vezes de uma urna."],
    ["·", "Regra do produto (caminho)", "A probabilidade de um caminho é o produto das probabilidades nos seus ramos.", "Dois seis: $1/6 · 1/6 = 1/36$."],
    ["+", "Regra da soma", "Se vários caminhos pertencem a um acontecimento, somam-se as suas probabilidades.", "Duas moedas, exatamente uma face: $P(FC) + P(CF) = 1/4 + 1/4 = 1/2$."],
    ["", "Com e sem reposição", "Com reposição, a bola tirada volta à urna: as probabilidades ficam iguais em cada etapa. Sem reposição, ela falta depois: as probabilidades mudam.", "3 bolas vermelhas e 2 azuis, duas vezes vermelha: com reposição $3/5 · 3/5$, sem reposição $3/5 · 2/4$."]
  ]],
  ["Frequências", [
    ["n", "Número de repetições", "n indica quantas vezes se realiza a experiência (número de provas, dimensão da amostra).", "Lançar um dado 100 vezes: $n = 100$."],
    ["H, h", "Frequência absoluta e relativa", "A frequência absoluta H diz quantas vezes um acontecimento se realizou. A frequência relativa é a proporção: $h = H : n$.", "100 lançamentos, 18 seis: $H = 18$, $h = 18/100 = 0,18 = 18 %$."],
    ["h → P", "Lei dos grandes números", "Se uma experiência se repetir muitíssimas vezes, a frequência relativa aproxima-se cada vez mais da probabilidade. Experimenta no separador «Simulação».", "Depois de 10 lançamentos, 30 % de seis é bem possível; depois de 10 000, a proporção fica muito perto de $1/6 ≈ 16,7 %$."]
  ]],
  ["Probabilidade condicionada", [
    ["", "Tabela de dupla entrada", "Uma tabela para duas características A e B, cada uma com duas opções (A ou Ā, B ou B̄). As quatro células interiores são $A ∩ B$, $A ∩ B̄$, $Ā ∩ B$, $Ā ∩ B̄$. Nas margens estão os totais e em baixo à direita 1 (ou o total).", "A: «doente», B: «teste positivo» – vê o separador «Tabela de dupla entrada»."],
    ["P(B | A) = P<sub>A</sub>(B)", "Probabilidade condicionada", "A probabilidade de B quando já se sabe que A se realizou. Lê-se: «probabilidade de B sabendo A». Também se escreve P<sub>A</sub>(B). Cálculo: $P(B | A) = P(A ∩ B) : P(A)$.", "Dado, A: par, B: maior que 3. $P(B | A) = 2/3$, porque de 2, 4, 6 há dois maiores que 3."],
    ["", "Acontecimentos independentes", "A e B não se influenciam: $P(A ∩ B) = P(A) · P(B)$, o mesmo que $P(B | A) = P(B)$.", "Dois lançamentos de moeda são independentes. «par» e «maior que 3» não são: $P(B | A) = 2/3$, mas $P(B) = 1/2$."],
    ["", "Teorema de Bayes (árvore invertida)", "Conhece-se P(B | A) e quer-se ao contrário P(A | B): $P(A | B) = P(A) · P(B | A) : P(B)$.", "Qual é a probabilidade de estar doente se o teste for positivo?"]
  ]],
  ["Variáveis aleatórias (secundário)", [
    ["X", "Variável aleatória", "X associa um número a cada resultado. $P(X = k)$ é a probabilidade de X tomar exatamente o valor k.", "Dois dados, X = soma: $P(X = 7) = 6/36 = 1/6$."],
    ["E(X), μ", "Valor médio (valor esperado)", "O valor que se obtém em média a longo prazo: cada valor vezes a sua probabilidade, tudo somado. Também se escreve μ (grego «mi»). Atenção: este E não tem nada a ver com um acontecimento E!", "Um dado: $E(X) = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 3,5$."],
    ["V(X), σ", "Variância e desvio padrão", "Medem quanto os valores se dispersam à volta do valor médio. σ (grego «sigma») é a raiz quadrada da variância: $σ = √V(X)$.", "Um dado: $V(X) ≈ 2,92$, $σ ≈ 1,71$."],
    ["p, q", "Probabilidade de sucesso e de insucesso", "Uma prova de Bernoulli só tem dois resultados: sucesso ou insucesso. O p minúsculo é a probabilidade de sucesso, $q = 1 − p$ a de insucesso. Não confundir com o P maiúsculo de P(…)!", "«seis» é sucesso: $p = 1/6$, $q = 5/6$."],
    ["n, k", "Provas de Bernoulli, número de sucessos", "Uma prova de Bernoulli repete-se n vezes de forma independente. k é o número de sucessos. $X ~ B(n; p)$ significa: X segue uma distribuição binomial.", "Lançar um dado 10 vezes, exatamente 2 seis: $n = 10$, $k = 2$, $p = 1/6$."]
  ]]]
}
};
