// Alltagsbeispiele für /winkel/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Uhrzeiger", "Wie groß ist der Winkel zwischen den Zeigern um 3 Uhr?", "Volle Drehung $360°$, 12 Stunden:\n$360° : 12 = 30°$ pro Stunde\n$3 · 30° = 90°$ – ein rechter Winkel."],
  ["Pizzastück", "Eine runde Pizza wird in 6 gleiche Stücke geschnitten. Wie groß ist der Winkel an der Spitze eines Stücks?", "$360° : 6 = 60°$"],
  ["Skateboard-Trick", "Ein „180“ ist eine halbe Drehung. Wie viele Drehungen sind ein „540“?", "$540° : 360° = 1,5$\nAnderthalb Drehungen."],
  ["Straßenkreuzung", "Zwei Straßen kreuzen sich. Ein Winkel beträgt 65°. Wie groß ist der Nebenwinkel?", "Nebenwinkel ergeben zusammen $180°$:\n$180° − 65° = 115°$"]
],
en: [
  ["Clock hands", "What is the angle between the hands at 3 o’clock?", "Full turn $360°$, 12 hours:\n$360° : 12 = 30°$ per hour\n$3 · 30° = 90°$ – a right angle."],
  ["Pizza slice", "A round pizza is cut into 6 equal slices. What is the angle at the tip of a slice?", "$360° : 6 = 60°$"],
  ["Skateboard trick", "A “180” is half a turn. How many turns is a “540”?", "$540° : 360° = 1.5$\nOne and a half turns."],
  ["Crossroads", "Two roads cross. One angle is 65°. How big is the adjacent angle?", "Adjacent angles add up to $180°$:\n$180° − 65° = 115°$"]
],
es: [
  ["Agujas del reloj", "¿Qué ángulo forman las agujas a las 3 en punto?", "Vuelta completa $360°$, 12 horas:\n$360° : 12 = 30°$ por hora\n$3 · 30° = 90°$: un ángulo recto."],
  ["Porción de pizza", "Una pizza redonda se corta en 6 porciones iguales. ¿Qué ángulo tiene la punta de una porción?", "$360° : 6 = 60°$"],
  ["Truco de skate", "Un «180» es media vuelta. ¿Cuántas vueltas es un «540»?", "$540° : 360° = 1,5$\nUna vuelta y media."],
  ["Cruce de calles", "Dos calles se cruzan. Un ángulo mide 65°. ¿Cuánto mide el ángulo adyacente?", "Los ángulos adyacentes suman $180°$:\n$180° − 65° = 115°$"]
],
zh: [
  ["钟表指针", "3 点整时，时针和分针的夹角是多少度？", "一圈 $360°$，12 小时：\n每小时 $360° : 12 = 30°$\n$3 · 30° = 90°$——直角。"],
  ["一块披萨", "圆形披萨切成 6 块一样大的。每块尖角多少度？", "$360° : 6 = 60°$"],
  ["滑板动作", "“180”是转半圈。“540”是转几圈？", "$540° : 360° = 1.5$\n一圈半。"],
  ["十字路口", "两条路相交，其中一个角是 65°。它的邻补角是多少？", "邻补角加起来是 $180°$：\n$180° − 65° = 115°$"]
],
fr: [
  ["Aiguilles d’une horloge", "Quel angle forment les aiguilles à 3 heures ?", "Tour complet $360°$, 12 heures :\n$360° : 12 = 30°$ par heure\n$3 · 30° = 90°$ : un angle droit."],
  ["Part de pizza", "Une pizza ronde est coupée en 6 parts égales. Quel est l’angle à la pointe d’une part ?", "$360° : 6 = 60°$"],
  ["Figure de skate", "Un « 180 » est un demi-tour. Combien de tours fait un « 540 » ?", "$540° : 360° = 1,5$\nUn tour et demi."],
  ["Carrefour", "Deux rues se croisent. Un angle mesure 65°. Combien mesure l’angle adjacent ?", "Les angles adjacents font $180°$ ensemble :\n$180° − 65° = 115°$"]
],
ru: [
  ["Стрелки часов", "Какой угол между стрелками в 3 часа?", "Полный оборот $360°$, 12 часов:\n$360° : 12 = 30°$ на час\n$3 · 30° = 90°$ – прямой угол."],
  ["Кусок пиццы", "Круглую пиццу режут на 6 равных кусков. Какой угол у острия куска?", "$360° : 6 = 60°$"],
  ["Трюк на скейте", "«180» – это пол-оборота. Сколько оборотов в «540»?", "$540° : 360° = 1,5$\nПолтора оборота."],
  ["Перекрёсток", "Две улицы пересекаются. Один угол равен 65°. Чему равен смежный угол?", "Смежные углы вместе дают $180°$:\n$180° − 65° = 115°$"]
],
ar: [
  ["عقارب الساعة", "كم قياس الزاوية بين العقربين عند الساعة 3؟", "دورة كاملة $360°$ و 12 ساعة:\n$360° : 12 = 30°$ لكل ساعة\n$3 · 30° = 90°$ – زاوية قائمة."],
  ["قطعة بيتزا", "تُقطّع بيتزا دائرية إلى 6 قطع متساوية. كم زاوية رأس القطعة؟", "$360° : 6 = 60°$"],
  ["حركة التزلج", "حركة «180» نصف دورة. كم دورة في «540»؟", "$540° : 360° = 1.5$\nدورة ونصف."],
  ["تقاطع طرق", "يتقاطع طريقان وإحدى الزوايا 65°. كم قياس الزاوية المجاورة؟", "مجموع الزاويتين المتجاورتين $180°$:\n$180° − 65° = 115°$"]
],
ja: [
  ["時計の針", "3 時ちょうどの長針と短針の角度は？", "1 回転 $360°$、12 時間：\n1 時間で $360° : 12 = 30°$\n$3 · 30° = 90°$――直角。"],
  ["ピザの 1 切れ", "丸いピザを 6 等分する。1 切れの先の角は何度？", "$360° : 6 = 60°$"],
  ["スケボーの技", "「180」は半回転。「540」は何回転？", "$540° : 360° = 1.5$\n1 回転半。"],
  ["交差点", "2 本の道が交わり、1 つの角が 65°。となりの角は？", "となり合う角を合わせると $180°$：\n$180° − 65° = 115°$"]
],
pt: [
  ["Ponteiros do relógio", "Qual é o ângulo entre os ponteiros às 3 horas?", "Volta completa $360°$, 12 horas:\n$360° : 12 = 30°$ por hora\n$3 · 30° = 90°$ – um ângulo reto."],
  ["Fatia de pizza", "Uma pizza redonda é cortada em 6 fatias iguais. Qual o ângulo na ponta de uma fatia?", "$360° : 6 = 60°$"],
  ["Manobra de skate", "Um “180” é meia volta. Quantas voltas tem um “540”?", "$540° : 360° = 1,5$\nUma volta e meia."],
  ["Cruzamento", "Duas ruas se cruzam. Um ângulo mede 65°. Quanto mede o ângulo adjacente?", "Ângulos adjacentes somam $180°$:\n$180° − 65° = 115°$"]
]
}});
