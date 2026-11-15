// Alltagsbeispiele für /integral/, 9 Sprachen. „Ausprobieren“: MS_INT.laden({tab, f, a, b}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { tab: "riemann", f: "2x", a: 0, b: 10 },
  { tab: "riemann", f: "-0.5x^2 + 4x", a: 0, b: 8 },
  { tab: "riemann", f: "-0.25x^2 + 6x - 27", a: 6, b: 18 },
  { tab: "flaeche", f: "0.5x^2 - 2", a: -2, b: 2 }
],
laden: function(w){ window.MS_INT.laden(w); },
daten: {
de: [
  ["Weg aus der Geschwindigkeit", "Ein Auto fährt an, seine Geschwindigkeit ist $v(t) = 2t$ (t in s, v in m/s). Wie weit kommt es in den ersten 10 Sekunden?", "Weg = Fläche unter der Geschwindigkeitskurve:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(Nach 10 s fährt es 20 m/s = 72 km/h.)"],
  ["Wasser im Becken", "Wasser fließt in ein Becken, die Zuflussrate ist $f(t) = −0,5t² + 4t$ (t in min, f in Liter pro Minute). Wie viel Wasser ist nach 8 Minuten drin?", "Menge = Integral der Zuflussrate:\n$∫₀⁸ (−0,5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85,33 + 128 ≈ 42,7 Liter$"],
  ["Solaranlage", "Die Leistung einer Solaranlage an einem Sommertag ist $P(t) = −0,25t² + 6t − 27$ (t = Uhrzeit, P in kW), von 6 bis 18 Uhr. Wie viel Energie liefert sie?", "Energie = Fläche unter der Leistungskurve:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nMittags um 12 Uhr ist die Leistung am größten: $P(12) = 9 kW$."],
  ["Querschnitt eines Grabens", "Ein Graben hat den Querschnitt $f(x) = 0,5x² − 2$ (in m) zwischen $x = −2$ und $x = 2$. Wie groß ist die Querschnittsfläche (für Wasser)?", "$∫₋₂² (0,5x² − 2) dx = [x³/6 − 2x]₋₂² = −2,67 − 2,67 ≈ −5,33$\nDas Integral ist negativ, weil die Kurve unter der x-Achse liegt. Fläche $≈ 5,33 m²$ – pro Meter Graben passen also etwa 5,3 m³ Wasser hinein."]
],
en: [
  ["Distance from speed", "A car pulls away with speed $v(t) = 2t$ (t in s, v in m/s). How far does it get in the first 10 seconds?", "Distance = area under the speed graph:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(After 10 s it is going at 20 m/s = 72 km/h.)"],
  ["Water in a tank", "Water flows into a tank at the rate $f(t) = −0.5t² + 4t$ (t in min, f in litres per minute). How much water is in it after 8 minutes?", "Amount = integral of the flow rate:\n$∫₀⁸ (−0.5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85.33 + 128 ≈ 42.7 litres$"],
  ["Solar panels", "On a summer day the power of a solar system is $P(t) = −0.25t² + 6t − 27$ (t = time of day, P in kW), from 6 am to 6 pm. How much energy does it deliver?", "Energy = area under the power graph:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nAt noon the power is greatest: $P(12) = 9 kW$."],
  ["Cross-section of a ditch", "A ditch has the cross-section $f(x) = 0.5x² − 2$ (in m) between $x = −2$ and $x = 2$. How big is the cross-sectional area (for water)?", "$∫₋₂² (0.5x² − 2) dx = [x³/6 − 2x]₋₂² = −2.67 − 2.67 ≈ −5.33$\nThe integral is negative because the curve lies below the x-axis. Area $≈ 5.33 m²$ – so each metre of ditch holds about 5.3 m³ of water."]
],
es: [
  ["Distancia a partir de la velocidad", "Un coche arranca con velocidad $v(t) = 2t$ (t en s, v en m/s). ¿Qué distancia recorre en los primeros 10 segundos?", "Distancia = área bajo la curva de velocidad:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(A los 10 s va a 20 m/s = 72 km/h.)"],
  ["Agua en un depósito", "Entra agua en un depósito con caudal $f(t) = −0,5t² + 4t$ (t en min, f en litros por minuto). ¿Cuánta agua hay a los 8 minutos?", "Cantidad = integral del caudal:\n$∫₀⁸ (−0,5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85,33 + 128 ≈ 42,7 litros$"],
  ["Placas solares", "Un día de verano la potencia de una instalación solar es $P(t) = −0,25t² + 6t − 27$ (t = hora, P en kW), de 6 a 18 h. ¿Cuánta energía produce?", "Energía = área bajo la curva de potencia:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nA mediodía la potencia es máxima: $P(12) = 9 kW$."],
  ["Sección de una zanja", "Una zanja tiene la sección $f(x) = 0,5x² − 2$ (en m) entre $x = −2$ y $x = 2$. ¿Qué área tiene la sección (para el agua)?", "$∫₋₂² (0,5x² − 2) dx = [x³/6 − 2x]₋₂² = −2,67 − 2,67 ≈ −5,33$\nLa integral es negativa porque la curva está bajo el eje x. Área $≈ 5,33 m²$: por cada metro de zanja caben unos 5,3 m³ de agua."]
],
zh: [
  ["由速度求路程", "一辆车起步，速度为 $v(t) = 2t$（t 单位 s，v 单位 m/s）。前 10 秒走了多远？", "路程 = 速度曲线下的面积：\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n（10 s 后速度为 20 m/s = 72 km/h。）"],
  ["水池里的水", "水流入水池，流量为 $f(t) = −0.5t² + 4t$（t 单位 min，f 单位升/分）。8 分钟后池里有多少水？", "水量 = 流量的积分：\n$∫₀⁸ (−0.5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85.33 + 128 ≈ 42.7 升$"],
  ["太阳能电站", "夏天某日太阳能设备的功率为 $P(t) = −0.25t² + 6t − 27$（t 为时刻，P 单位 kW），从 6 点到 18 点。共发电多少？", "能量 = 功率曲线下的面积：\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\n中午 12 点功率最大：$P(12) = 9 kW$。"],
  ["水沟的横截面", "一条水沟的横截面是 $f(x) = 0.5x² − 2$（单位 m），从 $x = −2$ 到 $x = 2$。横截面面积多大？", "$∫₋₂² (0.5x² − 2) dx = [x³/6 − 2x]₋₂² = −2.67 − 2.67 ≈ −5.33$\n积分是负的，因为曲线在 x 轴下方。面积 $≈ 5.33 m²$——每米水沟大约能装 5.3 m³ 水。"]
],
fr: [
  ["Distance à partir de la vitesse", "Une voiture démarre avec la vitesse $v(t) = 2t$ (t en s, v en m/s). Quelle distance parcourt-elle pendant les 10 premières secondes ?", "Distance = aire sous la courbe de vitesse :\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(Après 10 s, elle roule à 20 m/s = 72 km/h.)"],
  ["Eau dans un bassin", "De l’eau coule dans un bassin avec le débit $f(t) = −0,5t² + 4t$ (t en min, f en litres par minute). Combien d’eau y a-t-il après 8 minutes ?", "Quantité = intégrale du débit :\n$∫₀⁸ (−0,5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85,33 + 128 ≈ 42,7 litres$"],
  ["Panneaux solaires", "Un jour d’été, la puissance d’une installation solaire est $P(t) = −0,25t² + 6t − 27$ (t = heure, P en kW), de 6 h à 18 h. Quelle énergie produit-elle ?", "Énergie = aire sous la courbe de puissance :\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nÀ midi la puissance est maximale : $P(12) = 9 kW$."],
  ["Section d’un fossé", "Un fossé a la section $f(x) = 0,5x² − 2$ (en m) entre $x = −2$ et $x = 2$. Quelle est l’aire de la section (pour l’eau) ?", "$∫₋₂² (0,5x² − 2) dx = [x³/6 − 2x]₋₂² = −2,67 − 2,67 ≈ −5,33$\nL’intégrale est négative car la courbe est sous l’axe des x. Aire $≈ 5,33 m²$ : chaque mètre de fossé contient environ 5,3 m³ d’eau."]
],
ru: [
  ["Путь по скорости", "Машина трогается со скоростью $v(t) = 2t$ (t в с, v в м/с). Какой путь она проедет за первые 10 секунд?", "Путь = площадь под графиком скорости:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 м$\n(Через 10 с её скорость 20 м/с = 72 км/ч.)"],
  ["Вода в бассейне", "Вода течёт в бассейн со скоростью притока $f(t) = −0,5t² + 4t$ (t в мин, f в литрах в минуту). Сколько воды будет через 8 минут?", "Объём = интеграл скорости притока:\n$∫₀⁸ (−0,5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85,33 + 128 ≈ 42,7 л$"],
  ["Солнечная электростанция", "Летним днём мощность солнечной установки $P(t) = −0,25t² + 6t − 27$ (t – время суток, P в кВт), с 6 до 18 часов. Сколько энергии она выработает?", "Энергия = площадь под графиком мощности:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 кВт·ч$\nВ полдень мощность наибольшая: $P(12) = 9 кВт$."],
  ["Сечение канавы", "Канава имеет поперечное сечение $f(x) = 0,5x² − 2$ (в м) между $x = −2$ и $x = 2$. Какова площадь сечения (для воды)?", "$∫₋₂² (0,5x² − 2) dx = [x³/6 − 2x]₋₂² = −2,67 − 2,67 ≈ −5,33$\nИнтеграл отрицательный, потому что кривая лежит ниже оси x. Площадь $≈ 5,33 м²$ – на каждый метр канавы около 5,3 м³ воды."]
],
ar: [
  ["المسافة من السرعة", "تنطلق سيارة بسرعة $v(t) = 2t$ (t بالثانية، v بـ m/s). كم تقطع في أول 10 ثوانٍ؟", "المسافة = المساحة تحت منحنى السرعة:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(بعد 10 s تكون سرعتها 20 m/s = 72 km/h.)"],
  ["الماء في حوض", "يتدفق الماء إلى حوض بمعدل $f(t) = −0.5t² + 4t$ (t بالدقائق، f باللتر في الدقيقة). كم من الماء في الحوض بعد 8 دقائق؟", "الكمية = تكامل معدل التدفق:\n$∫₀⁸ (−0.5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85.33 + 128 ≈ 42.7$ لترًا"],
  ["الألواح الشمسية", "في يوم صيفي قدرة منظومة شمسية هي $P(t) = −0.25t² + 6t − 27$ (t الساعة، P بالكيلوواط)، من 6 إلى 18. كم طاقة تنتج؟", "الطاقة = المساحة تحت منحنى القدرة:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nعند الظهر تكون القدرة أكبر ما يمكن: $P(12) = 9 kW$."],
  ["مقطع خندق", "مقطع خندق هو $f(x) = 0.5x² − 2$ (بالمتر) بين $x = −2$ و$x = 2$. ما مساحة المقطع (للماء)؟", "$∫₋₂² (0.5x² − 2) dx = [x³/6 − 2x]₋₂² = −2.67 − 2.67 ≈ −5.33$\nالتكامل سالب لأن المنحنى تحت محور x. المساحة $≈ 5.33 m²$ – أي يتسع كل متر من الخندق لنحو 5.3 m³ من الماء."]
],
ja: [
  ["速さから道のりへ", "車が発進し、速さは $v(t) = 2t$（t の単位は秒、v は m/s）。最初の 10 秒で何 m 進む？", "道のり = 速さのグラフの下の面積：\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n（10 秒後の速さは 20 m/s = 時速 72 km。）"],
  ["水そうの水", "水そうに水が入る。1 分あたりの量は $f(t) = −0.5t² + 4t$（t は分、f は L/分）。8 分後に水は何 L ？", "量 = 流入の速さの積分：\n$∫₀⁸ (−0.5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85.33 + 128 ≈ 42.7 L$"],
  ["太陽光発電", "夏のある日、太陽光発電の出力は $P(t) = −0.25t² + 6t − 27$（t は時刻、P は kW）、6 時から 18 時まで。発電量は？", "エネルギー = 出力のグラフの下の面積：\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\n正午に出力が最大：$P(12) = 9 kW$。"],
  ["みぞの断面", "みぞの断面が $f(x) = 0.5x² − 2$（単位 m）、$x = −2$ から $x = 2$ まで。断面積は？", "$∫₋₂² (0.5x² − 2) dx = [x³/6 − 2x]₋₂² = −2.67 − 2.67 ≈ −5.33$\n曲線が x 軸より下にあるので積分は負。面積 $≈ 5.33 m²$――みぞ 1 m あたり約 5.3 m³ の水が入る。"]
],
pt: [
  ["Distância a partir da velocidade", "Um carro arranca com velocidade $v(t) = 2t$ (t em s, v em m/s). Que distância percorre nos primeiros 10 segundos?", "Distância = área sob o gráfico da velocidade:\n$∫₀¹⁰ 2t dt = [t²]₀¹⁰ = 100 − 0 = 100 m$\n(Aos 10 s vai a 20 m/s = 72 km/h.)"],
  ["Água num tanque", "Entra água num tanque com caudal $f(t) = −0,5t² + 4t$ (t em min, f em litros por minuto). Quanta água há ao fim de 8 minutos?", "Quantidade = integral do caudal:\n$∫₀⁸ (−0,5t² + 4t) dt = [−t³/6 + 2t²]₀⁸ = −85,33 + 128 ≈ 42,7 litros$"],
  ["Painéis solares", "Num dia de verão a potência de uma instalação solar é $P(t) = −0,25t² + 6t − 27$ (t = hora, P em kW), das 6 às 18 h. Quanta energia produz?", "Energia = área sob o gráfico da potência:\n$∫₆¹⁸ P(t) dt = [−t³/12 + 3t² − 27t]₆¹⁸ = 0 − (−72) = 72 kWh$\nAo meio-dia a potência é máxima: $P(12) = 9 kW$."],
  ["Secção de uma vala", "Uma vala tem a secção $f(x) = 0,5x² − 2$ (em m) entre $x = −2$ e $x = 2$. Qual é a área da secção (para a água)?", "$∫₋₂² (0,5x² − 2) dx = [x³/6 − 2x]₋₂² = −2,67 − 2,67 ≈ −5,33$\nO integral é negativo porque a curva está abaixo do eixo x. Área $≈ 5,33 m²$ – cada metro de vala leva cerca de 5,3 m³ de água."]
]
}});
