// Alltagsbeispiele für /grosses-einmaleins/, 9 Sprachen. Baustein: /alltag.js (🆕 24.11.2026)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Plätze im Kinosaal", "Ein Kinosaal hat 14 Reihen mit je 16 Plätzen. Wie viele Plätze gibt es?", "In Zehner und Einer zerlegen:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ Plätze"],
  ["Eier verpacken", "Ein Hof packt 13 Kartons mit je 12 Eiern. Wie viele Eier sind das?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ Eier"],
  ["Wochen im Halbjahr", "Ein Schulhalbjahr hat etwa 17 Wochen. Wie viele Tage sind das?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ Tage"],
  ["Terrasse mit Platten", "Eine quadratische Terrasse wird mit 15 Reihen zu je 15 Platten belegt. Wie viele Platten braucht man?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ Platten"]
],
en: [
  ["Cinema seats", "A cinema has 14 rows with 16 seats each. How many seats are there?", "Split into tens and ones:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ seats"],
  ["Packing eggs", "A farm packs 13 boxes with 12 eggs each. How many eggs is that?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ eggs"],
  ["Weeks in a term", "Half a school year has about 17 weeks. How many days is that?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ days"],
  ["Patio with tiles", "A square patio is covered with 15 rows of 15 tiles each. How many tiles are needed?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ tiles"]
],
es: [
  ["Butacas del cine", "Una sala de cine tiene 14 filas de 16 butacas. ¿Cuántas butacas hay?", "Descomponer en decenas y unidades:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ butacas"],
  ["Empaquetar huevos", "Una granja llena 13 cajas de 12 huevos. ¿Cuántos huevos son?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ huevos"],
  ["Semanas de un trimestre", "Medio curso escolar tiene unas 17 semanas. ¿Cuántos días son?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ días"],
  ["Terraza con baldosas", "Una terraza cuadrada se cubre con 15 filas de 15 baldosas. ¿Cuántas baldosas hacen falta?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ baldosas"]
],
zh: [
  ["电影院的座位", "电影院有 14 排，每排 16 个座位。一共有多少个座位？", "拆成十位和个位：\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ 个座位"],
  ["装鸡蛋", "农场装了 13 盒鸡蛋，每盒 12 个。一共有多少个鸡蛋？", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ 个鸡蛋"],
  ["一个学期的周数", "半个学年大约有 17 周。是多少天？", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ 天"],
  ["铺地砖的露台", "一个正方形露台铺了 15 排地砖，每排 15 块。一共需要多少块？", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ 块"]
],
fr: [
  ["Places au cinéma", "Une salle de cinéma a 14 rangées de 16 places. Combien de places y a-t-il ?", "Décomposer en dizaines et unités :\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ places"],
  ["Emballer des œufs", "Une ferme remplit 13 boîtes de 12 œufs. Combien d’œufs cela fait-il ?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ œufs"],
  ["Semaines d’un semestre", "Un semestre scolaire compte environ 17 semaines. Combien de jours cela fait-il ?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ jours"],
  ["Terrasse en dalles", "Une terrasse carrée est couverte de 15 rangées de 15 dalles. Combien de dalles faut-il ?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ dalles"]
],
ru: [
  ["Места в кинотеатре", "В зале кинотеатра 14 рядов по 16 мест. Сколько всего мест?", "Разложить на десятки и единицы:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ места"],
  ["Упаковка яиц", "На ферме упаковали 13 коробок по 12 яиц. Сколько это яиц?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ яиц"],
  ["Недели полугодия", "В учебном полугодии примерно 17 недель. Сколько это дней?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ дней"],
  ["Терраса из плитки", "Квадратную террасу выложили плиткой: 15 рядов по 15 плиток. Сколько плиток нужно?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ плиток"]
],
ar: [
  ["مقاعد السينما", "في قاعة سينما 14 صفًا، في كل صف 16 مقعدًا. كم مقعدًا في القاعة؟", "نجزّئ إلى عشرات وآحاد:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ مقعدًا"],
  ["تعبئة البيض", "تعبّئ مزرعة 13 علبة في كل منها 12 بيضة. كم بيضة هذا؟", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ بيضة"],
  ["أسابيع الفصل الدراسي", "في نصف العام الدراسي نحو 17 أسبوعًا. كم يومًا هذا؟", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ يومًا"],
  ["شرفة بالبلاط", "تُغطّى شرفة مربعة بـ15 صفًا في كل صف 15 بلاطة. كم بلاطة نحتاج؟", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ بلاطة"]
],
ja: [
  ["映画館の座席", "映画館に 16 席の列が 14 列あります。座席は全部で何席？", "十の位と一の位に分けて：\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ 席"],
  ["卵のパック詰め", "農家が 12 個入りのパックを 13 パック作ります。卵は何個？", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ 個"],
  ["学期の週の数", "半年の学期はおよそ 17 週です。何日になる？", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ 日"],
  ["タイルをしいたテラス", "正方形のテラスに、15 枚ずつ 15 列のタイルをしきます。タイルは何枚必要？", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ 枚"]
],
pt: [
  ["Poltronas do cinema", "Uma sala de cinema tem 14 fileiras com 16 poltronas cada. Quantas poltronas há?", "Separar em dezenas e unidades:\n$14 · 16 = 14 · 10 + 14 · 6$\n$= 140 + 84$\n$= 224$ poltronas"],
  ["Embalar ovos", "Uma granja enche 13 caixas com 12 ovos cada. Quantos ovos são?", "$13 · 12 = 13 · 10 + 13 · 2$\n$= 130 + 26$\n$= 156$ ovos"],
  ["Semanas do semestre", "Um semestre escolar tem cerca de 17 semanas. Quantos dias são?", "$17 · 7 = 10 · 7 + 7 · 7$\n$= 70 + 49$\n$= 119$ dias"],
  ["Terraço com lajotas", "Um terraço quadrado é coberto com 15 fileiras de 15 lajotas. Quantas lajotas são necessárias?", "$15 · 15 = 15 · 10 + 15 · 5$\n$= 150 + 75$\n$= 225$ lajotas"]
]
}});
