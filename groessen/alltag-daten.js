// Alltagsbeispiele für /groessen/, 9 Sprachen. „Ausprobieren“ lädt „Selbst umrechnen“ (MS_GROESSE.laden).
MS_ALLTAG.einbauen({ nach: document.getElementById("kategorieBox"),
werte: [
  { kat: "volumen", wert: 0.25, von: "l", nach: "ml" },
  { kat: "laenge", wert: 3.5, von: "km", nach: "m" },
  { kat: "flaeche", wert: 2500, von: "m²", nach: "ha" },
  { kat: "zeit", wert: 135, von: "min", nach: "h" },
  { kat: "masse", wert: 7.5, von: "t", nach: "kg" },
  { kat: "volumen", wert: 0.06, von: "m³", nach: "l" },
  { kat: "masse", wert: 500, von: "mg", nach: "g" }
],
laden: function(w){ window.MS_GROESSE.laden(w); },
daten: {
de: [
  ["Rezept", "Im Rezept stehen 0,25 l Milch, dein Messbecher zeigt aber nur ml an. Wie viel musst du abmessen?", "$1 l = 1000 ml$ ⇒ $0,25 · 1000 = 250 ml$"],
  ["Joggingrunde", "Deine Runde im Park ist 3,5 km lang. Wie viele Meter sind das?", "$1 km = 1000 m$ ⇒ $3,5 · 1000 = 3500 m$"],
  ["Bauplatz", "Ein Grundstück ist 2500 m² groß. Wie viel Hektar sind das?", "$1 ha = 10 000 m²$ ⇒ $2500 : 10 000 = 0,25 ha$ (oder 25 a)"],
  ["Kinofilm", "Ein Film dauert 135 Minuten. Wie viele Stunden sind das?", "$1 h = 60 min$ ⇒ $135 : 60 = 2,25 h$, also 2 h 15 min."],
  ["Lastwagen", "Ein Lkw darf 7,5 t wiegen. Wie viele Kilogramm sind das?", "$1 t = 1000 kg$ ⇒ $7,5 · 1000 = 7500 kg$"],
  ["Aquarium", "Ein Aquarium fasst 0,06 m³. Wie viele Liter Wasser passen hinein?", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0,06 · 1000 = 60 l$"],
  ["Tablette", "Eine Tablette enthält 500 mg Wirkstoff. Wie viel Gramm sind das?", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0,5 g$"]
],
en: [
  ["Recipe", "The recipe says 0.25 l of milk, but your measuring jug only shows ml. How much do you measure?", "$1 l = 1000 ml$ ⇒ $0.25 · 1000 = 250 ml$"],
  ["Jogging route", "Your route in the park is 3.5 km long. How many metres is that?", "$1 km = 1000 m$ ⇒ $3.5 · 1000 = 3500 m$"],
  ["Building plot", "A plot of land is 2500 m². How many hectares is that?", "$1 ha = 10,000 m²$ ⇒ $2500 : 10,000 = 0.25 ha$ (or 25 a)"],
  ["Film", "A film lasts 135 minutes. How many hours is that?", "$1 h = 60 min$ ⇒ $135 : 60 = 2.25 h$, i.e. 2 h 15 min."],
  ["Lorry", "A lorry may weigh 7.5 t. How many kilograms is that?", "$1 t = 1000 kg$ ⇒ $7.5 · 1000 = 7500 kg$"],
  ["Aquarium", "An aquarium holds 0.06 m³. How many litres of water fit in?", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0.06 · 1000 = 60 l$"],
  ["Tablet", "A tablet contains 500 mg of the active ingredient. How many grams is that?", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0.5 g$"]
],
es: [
  ["Receta", "La receta pide 0,25 l de leche, pero tu jarra medidora solo marca ml. ¿Cuánto mides?", "$1 l = 1000 ml$ ⇒ $0,25 · 1000 = 250 ml$"],
  ["Ruta para correr", "Tu vuelta por el parque mide 3,5 km. ¿Cuántos metros son?", "$1 km = 1000 m$ ⇒ $3,5 · 1000 = 3500 m$"],
  ["Solar", "Un solar mide 2500 m². ¿Cuántas hectáreas son?", "$1 ha = 10 000 m²$ ⇒ $2500 : 10 000 = 0,25 ha$ (o 25 a)"],
  ["Película", "Una película dura 135 minutos. ¿Cuántas horas son?", "$1 h = 60 min$ ⇒ $135 : 60 = 2,25 h$, es decir, 2 h 15 min."],
  ["Camión", "Un camión puede pesar 7,5 t. ¿Cuántos kilogramos son?", "$1 t = 1000 kg$ ⇒ $7,5 · 1000 = 7500 kg$"],
  ["Acuario", "Un acuario tiene 0,06 m³. ¿Cuántos litros de agua caben?", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0,06 · 1000 = 60 l$"],
  ["Pastilla", "Una pastilla contiene 500 mg de principio activo. ¿Cuántos gramos son?", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0,5 g$"]
],
zh: [
  ["食谱", "食谱上写着 0.25 l 牛奶，但量杯上只有 ml。要量多少？", "$1 l = 1000 ml$ ⇒ $0.25 · 1000 = 250 ml$"],
  ["跑步路线", "公园里一圈长 3.5 km。是多少米？", "$1 km = 1000 m$ ⇒ $3.5 · 1000 = 3500 m$"],
  ["建筑用地", "一块地面积 2500 m²。是多少公顷？", "$1 ha = 10 000 m²$ ⇒ $2500 : 10 000 = 0.25 ha$（或 25 a）"],
  ["电影", "一部电影长 135 分钟。是多少小时？", "$1 h = 60 min$ ⇒ $135 : 60 = 2.25 h$，即 2 小时 15 分。"],
  ["卡车", "一辆卡车最多重 7.5 t。是多少千克？", "$1 t = 1000 kg$ ⇒ $7.5 · 1000 = 7500 kg$"],
  ["鱼缸", "一个鱼缸的容积是 0.06 m³。能装多少升水？", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0.06 · 1000 = 60 l$"],
  ["药片", "一片药含 500 mg 有效成分。是多少克？", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0.5 g$"]
],
fr: [
  ["Recette", "La recette indique 0,25 l de lait, mais ton verre doseur n’affiche que des ml. Combien mesures-tu ?", "$1 l = 1000 ml$ ⇒ $0,25 · 1000 = 250 ml$"],
  ["Parcours de jogging", "Ton tour du parc fait 3,5 km. Combien de mètres est-ce ?", "$1 km = 1000 m$ ⇒ $3,5 · 1000 = 3500 m$"],
  ["Terrain à bâtir", "Un terrain mesure 2500 m². Combien d’hectares est-ce ?", "$1 ha = 10 000 m²$ ⇒ $2500 : 10 000 = 0,25 ha$ (ou 25 a)"],
  ["Film", "Un film dure 135 minutes. Combien d’heures est-ce ?", "$1 h = 60 min$ ⇒ $135 : 60 = 2,25 h$, soit 2 h 15 min."],
  ["Camion", "Un camion peut peser 7,5 t. Combien de kilogrammes est-ce ?", "$1 t = 1000 kg$ ⇒ $7,5 · 1000 = 7500 kg$"],
  ["Aquarium", "Un aquarium contient 0,06 m³. Combien de litres d’eau peut-il contenir ?", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0,06 · 1000 = 60 l$"],
  ["Comprimé", "Un comprimé contient 500 mg de principe actif. Combien de grammes est-ce ?", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0,5 g$"]
],
ru: [
  ["Рецепт", "В рецепте 0,25 л молока, а на мерном стакане только мл. Сколько отмерить?", "$1 л = 1000 мл$ ⇒ $0,25 · 1000 = 250 мл$"],
  ["Пробежка", "Круг по парку – 3,5 км. Сколько это метров?", "$1 км = 1000 м$ ⇒ $3,5 · 1000 = 3500 м$"],
  ["Участок", "Площадь участка 2500 м². Сколько это гектаров?", "$1 га = 10 000 м²$ ⇒ $2500 : 10 000 = 0,25 га$ (или 25 соток)"],
  ["Фильм", "Фильм идёт 135 минут. Сколько это часов?", "$1 ч = 60 мин$ ⇒ $135 : 60 = 2,25 ч$, то есть 2 ч 15 мин."],
  ["Грузовик", "Грузовик может весить 7,5 т. Сколько это килограммов?", "$1 т = 1000 кг$ ⇒ $7,5 · 1000 = 7500 кг$"],
  ["Аквариум", "Объём аквариума 0,06 м³. Сколько литров воды в него войдёт?", "$1 м³ = 1000 дм³ = 1000 л$ ⇒ $0,06 · 1000 = 60 л$"],
  ["Таблетка", "В таблетке 500 мг действующего вещества. Сколько это граммов?", "$1 г = 1000 мг$ ⇒ $500 : 1000 = 0,5 г$"]
],
ar: [
  ["وصفة طبخ", "في الوصفة 0.25 l من الحليب، لكن كوب القياس يبيّن ml فقط. كم تقيس؟", "$1 l = 1000 ml$ ⇒ $0.25 · 1000 = 250 ml$"],
  ["مسار الركض", "طول جولتك في الحديقة 3.5 km. كم مترًا هذا؟", "$1 km = 1000 m$ ⇒ $3.5 · 1000 = 3500 m$"],
  ["قطعة أرض", "مساحة قطعة أرض 2500 m². كم هكتارًا هذا؟", "$1 ha = 10000 m²$ ⇒ $2500 : 10000 = 0.25 ha$ (أو 25 a)"],
  ["فيلم", "مدة فيلم 135 دقيقة. كم ساعة هذا؟", "$1 h = 60 min$ ⇒ $135 : 60 = 2.25 h$، أي ساعتان و15 دقيقة."],
  ["شاحنة", "يُسمح لشاحنة أن تزن 7.5 t. كم كيلوغرامًا هذا؟", "$1 t = 1000 kg$ ⇒ $7.5 · 1000 = 7500 kg$"],
  ["حوض سمك", "سعة حوض سمك 0.06 m³. كم لترًا من الماء يتسع؟", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0.06 · 1000 = 60 l$"],
  ["قرص دواء", "يحتوي قرص على 500 mg من المادة الفعالة. كم غرامًا هذا؟", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0.5 g$"]
],
ja: [
  ["レシピ", "レシピには牛乳 0.25 L とあるが、計量カップは mL の目もりしかない。何 mL はかる？", "$1 l = 1000 ml$ ⇒ $0.25 · 1000 = 250 ml$"],
  ["ジョギングコース", "公園 1 周は 3.5 km。何 m ？", "$1 km = 1000 m$ ⇒ $3.5 · 1000 = 3500 m$"],
  ["土地", "土地の広さは 2500 m²。何ヘクタール？", "$1 ha = 10000 m²$ ⇒ $2500 : 10000 = 0.25 ha$（25 a）"],
  ["映画", "映画の長さは 135 分。何時間？", "$1 h = 60 min$ ⇒ $135 : 60 = 2.25 h$、つまり 2 時間 15 分。"],
  ["トラック", "トラックの重さは 7.5 t まで。何 kg ？", "$1 t = 1000 kg$ ⇒ $7.5 · 1000 = 7500 kg$"],
  ["水そう", "水そうの容積は 0.06 m³。水は何 L 入る？", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0.06 · 1000 = 60 l$"],
  ["錠剤", "錠剤 1 つに有効成分が 500 mg。何 g ？", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0.5 g$"]
],
pt: [
  ["Receita", "A receita pede 0,25 l de leite, mas o seu copo medidor só mostra ml. Quanto você mede?", "$1 l = 1000 ml$ ⇒ $0,25 · 1000 = 250 ml$"],
  ["Percurso de corrida", "A sua volta no parque tem 3,5 km. Quantos metros são?", "$1 km = 1000 m$ ⇒ $3,5 · 1000 = 3500 m$"],
  ["Terreno", "Um terreno tem 2500 m². Quantos hectares são?", "$1 ha = 10 000 m²$ ⇒ $2500 : 10 000 = 0,25 ha$ (ou 25 a)"],
  ["Filme", "Um filme dura 135 minutos. Quantas horas são?", "$1 h = 60 min$ ⇒ $135 : 60 = 2,25 h$, ou seja, 2 h 15 min."],
  ["Caminhão", "Um caminhão pode pesar 7,5 t. Quantos quilogramas são?", "$1 t = 1000 kg$ ⇒ $7,5 · 1000 = 7500 kg$"],
  ["Aquário", "Um aquário comporta 0,06 m³. Quantos litros de água cabem?", "$1 m³ = 1000 dm³ = 1000 l$ ⇒ $0,06 · 1000 = 60 l$"],
  ["Comprimido", "Um comprimido contém 500 mg de princípio ativo. Quantos gramas são?", "$1 g = 1000 mg$ ⇒ $500 : 1000 = 0,5 g$"]
]
}});
