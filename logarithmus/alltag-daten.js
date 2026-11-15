// Alltagsbeispiele für /logarithmus/, 9 Sprachen. „Ausprobieren“: MS_LOG.laden({b, x}) oder ({a, b, c}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { b: 10, x: 10000000 },
  { b: 10, x: 100 },
  { b: 10, x: 0.01 },
  { a: 1000, b: 1.03, c: 1500 },
  { a: 400, b: 0.8, c: 50 }
],
laden: function(w){ window.MS_LOG.laden(w); },
daten: {
de: [
  ["Lautstärke in Dezibel", "Ein Presslufthammer ist 10 Millionen-mal so intensiv wie das leiseste hörbare Geräusch. Wie viel Dezibel sind das? (Lautstärke = 10 · lg(Intensität im Vergleich zur Hörschwelle))", "$lg(10 000 000) = 7$, denn $10⁷ = 10 000 000$.\nLautstärke $= 10 · 7 = 70 dB$. Jede +10 dB bedeuten die 10-fache Intensität."],
  ["Erdbeben", "Auf der Richterskala hat ein Beben die Stärke 7, ein anderes die Stärke 5. Die Ausschläge des Messgeräts unterscheiden sich um den Faktor 100. Passt das?", "Die Stärke ist der Zehnerlogarithmus des Ausschlags. Unterschied $7 − 5 = 2$ und $lg(100) = 2$, also ist der Ausschlag $10² = 100$-mal so groß."],
  ["pH-Wert", "Zitronensaft enthält 0,01 mol Wasserstoff-Ionen pro Liter. Der pH-Wert ist der negative Zehnerlogarithmus davon. Wie groß ist er?", "$lg(0,01) = −2$, denn $10⁻² = 0,01$.\n$pH = −lg(0,01) = 2$ – stark sauer. Wasser hat pH 7."],
  ["Sparen", "Du legst 1000 € zu 3 % Zinsen pro Jahr an. Nach wie vielen Jahren hast du 1500 €?", "$1000 · 1,03ˣ = 1500$ ⇒ $1,03ˣ = 1,5$\n$x = ln(1,5) : ln(1,03) ≈ 13,7$ – also nach 14 Jahren."],
  ["Medikament im Blut", "Im Blut sind 400 mg eines Medikaments. Jede Stunde baut der Körper 20 % davon ab. Wann sind nur noch 50 mg übrig?", "Pro Stunde bleiben 80 %: $400 · 0,8ˣ = 50$ ⇒ $0,8ˣ = 0,125$\n$x = ln(0,125) : ln(0,8) ≈ 9,3$ Stunden."]
],
en: [
  ["Loudness in decibels", "A jackhammer is 10 million times as intense as the quietest sound you can hear. How many decibels is that? (loudness = 10 · lg(intensity compared with the hearing threshold))", "$lg(10,000,000) = 7$, because $10⁷ = 10,000,000$.\nLoudness $= 10 · 7 = 70 dB$. Every +10 dB means 10 times the intensity."],
  ["Earthquakes", "On the Richter scale one earthquake has magnitude 7, another magnitude 5. The seismograph readings differ by a factor of 100. Does that fit?", "The magnitude is the base-10 logarithm of the reading. Difference $7 − 5 = 2$ and $lg(100) = 2$, so the reading is $10² = 100$ times as large."],
  ["pH value", "Lemon juice contains 0.01 mol of hydrogen ions per litre. The pH value is the negative base-10 logarithm of that. What is it?", "$lg(0.01) = −2$, because $10⁻² = 0.01$.\n$pH = −lg(0.01) = 2$ – very acidic. Water has pH 7."],
  ["Saving", "You invest £1000 at 3% interest per year. After how many years do you have £1500?", "$1000 · 1.03ˣ = 1500$ ⇒ $1.03ˣ = 1.5$\n$x = ln(1.5) : ln(1.03) ≈ 13.7$ – so after 14 years."],
  ["Medicine in the blood", "There are 400 mg of a medicine in the blood. Every hour the body breaks down 20% of it. When are only 50 mg left?", "80% remains every hour: $400 · 0.8ˣ = 50$ ⇒ $0.8ˣ = 0.125$\n$x = ln(0.125) : ln(0.8) ≈ 9.3$ hours."]
],
es: [
  ["Volumen en decibelios", "Un martillo neumático es 10 millones de veces más intenso que el sonido más débil que se oye. ¿Cuántos decibelios son? (volumen = 10 · lg(intensidad comparada con el umbral de audición))", "$lg(10 000 000) = 7$, porque $10⁷ = 10 000 000$.\nVolumen $= 10 · 7 = 70 dB$. Cada +10 dB significa 10 veces más intensidad."],
  ["Terremotos", "En la escala de Richter un terremoto tiene magnitud 7 y otro magnitud 5. Las amplitudes del sismógrafo se diferencian en un factor 100. ¿Encaja?", "La magnitud es el logaritmo decimal de la amplitud. Diferencia $7 − 5 = 2$ y $lg(100) = 2$, así que la amplitud es $10² = 100$ veces mayor."],
  ["Valor del pH", "El zumo de limón contiene 0,01 mol de iones de hidrógeno por litro. El pH es el logaritmo decimal de eso, cambiado de signo. ¿Cuánto vale?", "$lg(0,01) = −2$, porque $10⁻² = 0,01$.\n$pH = −lg(0,01) = 2$: muy ácido. El agua tiene pH 7."],
  ["Ahorrar", "Depositas 1000 € al 3 % de interés anual. ¿Al cabo de cuántos años tienes 1500 €?", "$1000 · 1,03ˣ = 1500$ ⇒ $1,03ˣ = 1,5$\n$x = ln(1,5) : ln(1,03) ≈ 13,7$, es decir, a los 14 años."],
  ["Medicamento en la sangre", "En la sangre hay 400 mg de un medicamento. Cada hora el cuerpo elimina el 20 %. ¿Cuándo quedan solo 50 mg?", "Cada hora queda el 80 %: $400 · 0,8ˣ = 50$ ⇒ $0,8ˣ = 0,125$\n$x = ln(0,125) : ln(0,8) ≈ 9,3$ horas."]
],
zh: [
  ["分贝", "风镐的声音强度是人能听到的最弱声音的 1000 万倍。是多少分贝？（声级 = 10 · lg(与听阈相比的强度)）", "$lg(10 000 000) = 7$，因为 $10⁷ = 10 000 000$。\n声级 $= 10 · 7 = 70 dB$。每增加 10 dB，强度变为 10 倍。"],
  ["地震", "按里氏震级，一次地震是 7 级，另一次是 5 级。地震仪的振幅相差 100 倍。对吗？", "震级是振幅的常用对数。相差 $7 − 5 = 2$，而 $lg(100) = 2$，所以振幅是 $10² = 100$ 倍。"],
  ["pH 值", "柠檬汁每升含 0.01 mol 氢离子。pH 值是它的常用对数的相反数。是多少？", "$lg(0.01) = −2$，因为 $10⁻² = 0.01$。\n$pH = −lg(0.01) = 2$——酸性很强。水的 pH 是 7。"],
  ["存钱", "你存 1000 元，年利率 3 %。多少年后有 1500 元？", "$1000 · 1.03ˣ = 1500$ ⇒ $1.03ˣ = 1.5$\n$x = ln(1.5) : ln(1.03) ≈ 13.7$——也就是 14 年后。"],
  ["血液中的药物", "血液中有 400 mg 药物。身体每小时分解其中的 20 %。什么时候只剩 50 mg？", "每小时剩下 80 %：$400 · 0.8ˣ = 50$ ⇒ $0.8ˣ = 0.125$\n$x = ln(0.125) : ln(0.8) ≈ 9.3$ 小时。"]
],
fr: [
  ["Intensité sonore en décibels", "Un marteau-piqueur est 10 millions de fois plus intense que le son le plus faible qu’on peut entendre. Combien de décibels cela fait-il ? (niveau = 10 · lg(intensité par rapport au seuil d’audition))", "$lg(10 000 000) = 7$, car $10⁷ = 10 000 000$.\nNiveau $= 10 · 7 = 70 dB$. Chaque +10 dB signifie une intensité 10 fois plus grande."],
  ["Séismes", "Sur l’échelle de Richter, un séisme a une magnitude 7, un autre une magnitude 5. Les amplitudes du sismographe diffèrent d’un facteur 100. Est-ce cohérent ?", "La magnitude est le logarithme décimal de l’amplitude. Écart $7 − 5 = 2$ et $lg(100) = 2$ : l’amplitude est $10² = 100$ fois plus grande."],
  ["pH", "Le jus de citron contient 0,01 mol d’ions hydrogène par litre. Le pH est l’opposé du logarithme décimal de cette valeur. Combien vaut-il ?", "$lg(0,01) = −2$, car $10⁻² = 0,01$.\n$pH = −lg(0,01) = 2$ : très acide. L’eau a un pH de 7."],
  ["Épargne", "Tu places 1000 € à 3 % d’intérêts par an. Au bout de combien d’années as-tu 1500 € ?", "$1000 · 1,03ˣ = 1500$ ⇒ $1,03ˣ = 1,5$\n$x = ln(1,5) : ln(1,03) ≈ 13,7$ : donc au bout de 14 ans."],
  ["Médicament dans le sang", "Le sang contient 400 mg d’un médicament. Chaque heure, le corps en élimine 20 %. Quand ne reste-t-il que 50 mg ?", "Il reste 80 % chaque heure : $400 · 0,8ˣ = 50$ ⇒ $0,8ˣ = 0,125$\n$x = ln(0,125) : ln(0,8) ≈ 9,3$ heures."]
],
ru: [
  ["Громкость в децибелах", "Отбойный молоток в 10 миллионов раз интенсивнее самого тихого слышимого звука. Сколько это децибел? (громкость = 10 · lg(интенсивность относительно порога слышимости))", "$lg(10 000 000) = 7$, так как $10⁷ = 10 000 000$.\nГромкость $= 10 · 7 = 70 дБ$. Каждые +10 дБ – это в 10 раз большая интенсивность."],
  ["Землетрясения", "По шкале Рихтера одно землетрясение имеет магнитуду 7, другое – 5. Амплитуды сейсмографа отличаются в 100 раз. Сходится?", "Магнитуда – это десятичный логарифм амплитуды. Разница $7 − 5 = 2$ и $lg(100) = 2$, значит, амплитуда в $10² = 100$ раз больше."],
  ["Водородный показатель pH", "В лимонном соке 0,01 моль ионов водорода на литр. pH – это десятичный логарифм этого числа со знаком минус. Чему он равен?", "$lg(0,01) = −2$, так как $10⁻² = 0,01$.\n$pH = −lg(0,01) = 2$ – очень кисло. У воды pH 7."],
  ["Вклад", "Ты кладёшь 1000 € под 3 % годовых. Через сколько лет будет 1500 €?", "$1000 · 1,03ˣ = 1500$ ⇒ $1,03ˣ = 1,5$\n$x = ln(1,5) : ln(1,03) ≈ 13,7$ – то есть через 14 лет."],
  ["Лекарство в крови", "В крови 400 мг лекарства. Каждый час организм выводит 20 %. Когда останется только 50 мг?", "Каждый час остаётся 80 %: $400 · 0,8ˣ = 50$ ⇒ $0,8ˣ = 0,125$\n$x = ln(0,125) : ln(0,8) ≈ 9,3$ часа."]
],
ar: [
  ["شدة الصوت بالديسيبل", "مطرقة هوائية أشد بـ 10 ملايين مرة من أضعف صوت يمكن سماعه. كم ديسيبل هذا؟ (شدة الصوت = 10 · lg(الشدة مقارنة بعتبة السمع))", "$lg(10000000) = 7$ لأن $10⁷ = 10000000$.\nشدة الصوت $= 10 · 7 = 70 dB$. كل زيادة 10 dB تعني شدة أكبر بعشر مرات."],
  ["الزلازل", "على مقياس ريختر قوة زلزال 7 وقوة آخر 5. تختلف سعة جهاز القياس بمعامل 100. هل هذا صحيح؟", "القوة هي اللوغاريتم العشري للسعة. الفرق $7 − 5 = 2$ و$lg(100) = 2$، إذن السعة أكبر $10² = 100$ مرة."],
  ["الرقم الهيدروجيني pH", "يحتوي عصير الليمون على 0.01 مول من أيونات الهيدروجين في اللتر. الـ pH هو سالب اللوغاريتم العشري لهذا العدد. كم يساوي؟", "$lg(0.01) = −2$ لأن $10⁻² = 0.01$.\n$pH = −lg(0.01) = 2$ – حمضي جدًا. الماء له pH 7."],
  ["الادخار", "تودع 1000 € بفائدة 3 % سنويًا. بعد كم سنة يصبح لديك 1500 €؟", "$1000 · 1.03ˣ = 1500$ ⇒ $1.03ˣ = 1.5$\n$x = ln(1.5) : ln(1.03) ≈ 13.7$ – أي بعد 14 سنة."],
  ["دواء في الدم", "في الدم 400 mg من دواء. كل ساعة يتخلص الجسم من 20 % منه. متى يبقى 50 mg فقط؟", "يبقى 80 % كل ساعة: $400 · 0.8ˣ = 50$ ⇒ $0.8ˣ = 0.125$\n$x = ln(0.125) : ln(0.8) ≈ 9.3$ ساعات."]
],
ja: [
  ["デシベル（音の大きさ）", "削岩機の音は、聞こえるいちばん小さい音の 1000 万倍の強さ。何デシベル？（音の大きさ = 10 · lg(聞こえる限界と比べた強さ)）", "$lg(10000000) = 7$、なぜなら $10⁷ = 10000000$。\n音の大きさ $= 10 · 7 = 70 dB$。10 dB 増えるごとに強さは 10 倍。"],
  ["地震", "マグニチュード 7 の地震と 5 の地震。地震計のゆれ幅は 100 倍ちがう。合っている？", "マグニチュードはゆれ幅の常用対数。差は $7 − 5 = 2$、$lg(100) = 2$ なので、ゆれ幅は $10² = 100$ 倍。"],
  ["pH", "レモン汁には 1 L あたり 0.01 mol の水素イオンがある。pH はその常用対数にマイナスをつけたもの。いくつ？", "$lg(0.01) = −2$、なぜなら $10⁻² = 0.01$。\n$pH = −lg(0.01) = 2$――とても酸性。水は pH 7。"],
  ["貯金", "10 万円を年利 3 % で預ける。何年後に 15 万円になる？", "$1000 · 1.03ˣ = 1500$（単位：百円）⇒ $1.03ˣ = 1.5$\n$x = ln(1.5) : ln(1.03) ≈ 13.7$――つまり 14 年後。"],
  ["血液中の薬", "血液中に薬が 400 mg ある。体は 1 時間ごとにその 20 % を分解する。50 mg になるのはいつ？", "1 時間ごとに 80 % が残る：$400 · 0.8ˣ = 50$ ⇒ $0.8ˣ = 0.125$\n$x = ln(0.125) : ln(0.8) ≈ 9.3$ 時間。"]
],
pt: [
  ["Intensidade sonora em decibéis", "Um martelo pneumático é 10 milhões de vezes mais intenso do que o som mais fraco que se ouve. Quantos decibéis são? (nível = 10 · lg(intensidade comparada com o limiar de audição))", "$lg(10 000 000) = 7$, porque $10⁷ = 10 000 000$.\nNível $= 10 · 7 = 70 dB$. Cada +10 dB significa 10 vezes mais intensidade."],
  ["Sismos", "Na escala de Richter um sismo tem magnitude 7 e outro magnitude 5. As amplitudes do sismógrafo diferem por um fator 100. Faz sentido?", "A magnitude é o logaritmo decimal da amplitude. Diferença $7 − 5 = 2$ e $lg(100) = 2$, logo a amplitude é $10² = 100$ vezes maior."],
  ["pH", "O sumo de limão tem 0,01 mol de iões de hidrogénio por litro. O pH é o simétrico do logaritmo decimal desse valor. Quanto é?", "$lg(0,01) = −2$, porque $10⁻² = 0,01$.\n$pH = −lg(0,01) = 2$ – muito ácido. A água tem pH 7."],
  ["Poupar", "Depositas 1000 € a 3 % de juro por ano. Ao fim de quantos anos tens 1500 €?", "$1000 · 1,03ˣ = 1500$ ⇒ $1,03ˣ = 1,5$\n$x = ln(1,5) : ln(1,03) ≈ 13,7$ – ou seja, ao fim de 14 anos."],
  ["Medicamento no sangue", "No sangue há 400 mg de um medicamento. Em cada hora o corpo elimina 20 %. Quando restam só 50 mg?", "Em cada hora fica 80 %: $400 · 0,8ˣ = 50$ ⇒ $0,8ˣ = 0,125$\n$x = ln(0,125) : ln(0,8) ≈ 9,3$ horas."]
]
}});
