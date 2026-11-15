// Alltagsbeispiele für /prozent/ (Prozent ↔ Dezimalzahl ↔ Bruch), 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".info"), daten: {
de: [
  ["Handy-Akku", "Dein Akku zeigt 75 %. Welcher Bruchteil ist noch geladen?", "$75 % = 75/100 = 0,75 = 3/4$\nDer Akku ist noch zu drei Vierteln voll."],
  ["Pizza", "Eine Pizza hat 8 Stücke, du isst 3. Wie viel Prozent der Pizza ist das?", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["Rabatt", "Ein Pullover kostet 40 €. Auf dem Schild steht „−25 %“. Wie viel sparst du, wie viel zahlst du?", "$25 % = 0,25 = 1/4$ – ein Viertel des Preises fällt weg.\n$40 € : 4 = 10 €$ gespart, du zahlst $30 €$ (das sind 75 %)."],
  ["Schulweg", "18 von 24 Kindern einer Klasse kommen mit dem Fahrrad. Wie viel Prozent sind das?", "$18/24 = 3/4 = 0,75 = 75 %$ (mit 6 gekürzt)."],
  ["Download", "Der Ladebalken steht bei 0,6. Wie viel Prozent sind schon heruntergeladen – und welcher Bruch?", "$0,6 = 60 % = 60/100 = 3/5$"]
],
en: [
  ["Phone battery", "Your battery shows 75%. What fraction is still charged?", "$75 % = 75/100 = 0.75 = 3/4$\nThe battery is still three quarters full."],
  ["Pizza", "A pizza has 8 slices and you eat 3. What percentage of the pizza is that?", "$3/8 = 3 : 8 = 0.375 = 37.5 %$"],
  ["Sale", "A jumper costs £40. The sign says “−25%”. How much do you save and how much do you pay?", "$25 % = 0.25 = 1/4$ – a quarter of the price is taken off.\n$£40 : 4 = £10$ saved, you pay $£30$ (that is 75%)."],
  ["Way to school", "18 of the 24 children in a class come by bike. What percentage is that?", "$18/24 = 3/4 = 0.75 = 75 %$ (simplified by 6)."],
  ["Download", "The progress bar is at 0.6. What percentage has already downloaded – and what fraction?", "$0.6 = 60 % = 60/100 = 3/5$"]
],
es: [
  ["Batería del móvil", "Tu batería marca 75 %. ¿Qué fracción está cargada todavía?", "$75 % = 75/100 = 0,75 = 3/4$\nLa batería está todavía a tres cuartos."],
  ["Pizza", "Una pizza tiene 8 trozos y te comes 3. ¿Qué porcentaje de la pizza es?", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["Descuento", "Un jersey cuesta 40 €. El cartel dice «−25 %». ¿Cuánto ahorras y cuánto pagas?", "$25 % = 0,25 = 1/4$: se descuenta un cuarto del precio.\n$40 € : 4 = 10 €$ de ahorro, pagas $30 €$ (el 75 %)."],
  ["Camino al colegio", "18 de los 24 alumnos de una clase van en bici. ¿Qué porcentaje es?", "$18/24 = 3/4 = 0,75 = 75 %$ (simplificando entre 6)."],
  ["Descarga", "La barra de progreso está en 0,6. ¿Qué porcentaje se ha descargado y qué fracción es?", "$0,6 = 60 % = 60/100 = 3/5$"]
],
zh: [
  ["手机电量", "电量显示 75 %。还剩几分之几的电？", "$75 % = 75/100 = 0.75 = 3/4$\n电池还有四分之三的电。"],
  ["比萨", "一个比萨切成 8 块，你吃了 3 块。占整个比萨的百分之几？", "$3/8 = 3 : 8 = 0.375 = 37.5 %$"],
  ["打折", "一件毛衣 40 元，标签上写着“−25 %”。省多少钱？要付多少钱？", "$25 % = 0.25 = 1/4$：便宜了价格的四分之一。\n$40 : 4 = 10$ 元，省 10 元，付 30 元（即 75 %）。"],
  ["上学", "班上 24 个孩子中有 18 个骑自行车上学。占百分之几？", "$18/24 = 3/4 = 0.75 = 75 %$（约去 6）。"],
  ["下载", "进度条显示 0.6。已经下载了百分之几？是几分之几？", "$0.6 = 60 % = 60/100 = 3/5$"]
],
fr: [
  ["Batterie du portable", "Ta batterie affiche 75 %. Quelle fraction est encore chargée ?", "$75 % = 75/100 = 0,75 = 3/4$\nLa batterie est encore pleine aux trois quarts."],
  ["Pizza", "Une pizza a 8 parts et tu en manges 3. Quel pourcentage de la pizza est-ce ?", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["Soldes", "Un pull coûte 40 €. L’étiquette indique « −25 % ». Combien économises-tu et combien paies-tu ?", "$25 % = 0,25 = 1/4$ : un quart du prix est retiré.\n$40 € : 4 = 10 €$ d’économie, tu paies $30 €$ (soit 75 %)."],
  ["Trajet à l’école", "18 des 24 élèves d’une classe viennent à vélo. Quel pourcentage est-ce ?", "$18/24 = 3/4 = 0,75 = 75 %$ (simplifié par 6)."],
  ["Téléchargement", "La barre de progression est à 0,6. Quel pourcentage est déjà téléchargé, et quelle fraction ?", "$0,6 = 60 % = 60/100 = 3/5$"]
],
ru: [
  ["Заряд телефона", "Телефон показывает 75 %. Какая часть батареи ещё заряжена?", "$75 % = 75/100 = 0,75 = 3/4$\nБатарея заряжена на три четверти."],
  ["Пицца", "Пицца разрезана на 8 кусков, ты съел 3. Сколько это процентов пиццы?", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["Скидка", "Свитер стоит 40 €. На ценнике «−25 %». Сколько ты сэкономишь и сколько заплатишь?", "$25 % = 0,25 = 1/4$ – цена уменьшается на четверть.\n$40 € : 4 = 10 €$ экономии, платишь $30 €$ (это 75 %)."],
  ["Дорога в школу", "18 из 24 учеников класса приезжают на велосипеде. Сколько это процентов?", "$18/24 = 3/4 = 0,75 = 75 %$ (сократили на 6)."],
  ["Загрузка", "Полоска загрузки стоит на 0,6. Сколько процентов уже загружено и какая это дробь?", "$0,6 = 60 % = 60/100 = 3/5$"]
],
ar: [
  ["بطارية الهاتف", "تُظهر بطاريتك 75 %. ما الكسر الذي ما زال مشحونًا؟", "$75 % = 75/100 = 0,75 = 3/4$\nالبطارية ما زالت ممتلئة بثلاثة أرباع."],
  ["بيتزا", "بيتزا مقسومة إلى 8 قطع وأكلت 3 منها. كم في المئة من البيتزا هذا؟", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["تخفيض", "كنزة ثمنها 40 €. على اللافتة «−25 %». كم توفّر وكم تدفع؟", "$25 % = 0,25 = 1/4$: يُخصم ربع السعر.\n$40 € : 4 = 10 €$ توفير، وتدفع $30 €$ (أي 75 %)."],
  ["الطريق إلى المدرسة", "18 من 24 تلميذًا في صف يأتون بالدراجة. كم في المئة هذا؟", "$18/24 = 3/4 = 0,75 = 75 %$ (بالاختصار على 6)."],
  ["التنزيل", "شريط التقدم عند 0,6. كم في المئة تم تنزيله، وما الكسر؟", "$0,6 = 60 % = 60/100 = 3/5$"]
],
ja: [
  ["スマホの電池", "電池の表示は 75 %。あと何分のいくつ残っている？", "$75 % = 75/100 = 0.75 = 3/4$\n電池はまだ 4 分の 3 残っている。"],
  ["ピザ", "8 切れのピザのうち 3 切れを食べた。ピザの何 % ？", "$3/8 = 3 : 8 = 0.375 = 37.5 %$"],
  ["値引き", "4000 円のセーターに「25 % 引き」の札。いくら安くなって、いくら払う？", "$25 % = 0.25 = 1/4$：値段の 4 分の 1 が引かれる。\n$4000 : 4 = 1000$ 円安くなり、払うのは 3000 円（75 %）。"],
  ["通学", "クラスの 24 人中 18 人が自転車で通学。何 % ？", "$18/24 = 3/4 = 0.75 = 75 %$（6 で約分）。"],
  ["ダウンロード", "進み具合のバーが 0.6 のところ。何 % ダウンロードできた？分数では？", "$0.6 = 60 % = 60/100 = 3/5$"]
],
pt: [
  ["Bateria do celular", "Sua bateria mostra 75 %. Que fração ainda está carregada?", "$75 % = 75/100 = 0,75 = 3/4$\nA bateria ainda está com três quartos."],
  ["Pizza", "Uma pizza tem 8 fatias e você come 3. Que porcentagem da pizza é isso?", "$3/8 = 3 : 8 = 0,375 = 37,5 %$"],
  ["Desconto", "Uma blusa custa 40 reais. A etiqueta diz «−25 %». Quanto você economiza e quanto paga?", "$25 % = 0,25 = 1/4$: tira-se um quarto do preço.\n$40 : 4 = 10$, você economiza 10 reais e paga 30 reais (ou seja, 75 %)."],
  ["Caminho para a escola", "18 dos 24 alunos de uma turma vêm de bicicleta. Que porcentagem é essa?", "$18/24 = 3/4 = 0,75 = 75 %$ (simplificado por 6)."],
  ["Download", "A barra de progresso está em 0,6. Que porcentagem já foi baixada, e que fração é?", "$0,6 = 60 % = 60/100 = 3/5$"]
]
}});
