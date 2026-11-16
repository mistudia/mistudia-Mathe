// Alltagsbeispiele für /schnittpunkte/, 9 Sprachen. Baustein: /alltag.js, Zeichnungen: /alltag-bilder.js (schnittpunkte)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.querySelector(".oben") || document.getElementById("titel"), daten: {
de: [
  ["Handytarife vergleichen", "Tarif A: 10 € Grundgebühr und 0,05 € pro Minute. Tarif B: 0,15 € pro Minute. Ab wann ist A günstiger?", "$0,05x + 10 = 0,15x$\n$10 = 0,1x$\n$x = 100$\n$y = 0,15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Ball am Hang", "Ein Ball fliegt auf der Bahn f(x) = −0,1x² + 2x, der Hang steigt mit g(x) = 0,5x. Wo landet der Ball?", "$−0,1x² + 2x = 0,5x$\n$−0,1x² + 1,5x = 0$\n$x·(−0,1x + 1,5) = 0$\n$x = 0$ | $x = 15$\n$y = 0,5 · 15$\n$y = 7,5$"],
  ["Zwei Wasserstrahlen", "Zwei Brunnenstrahlen: f(x) = −x² + 4x und g(x) = −x² + 8x − 12. Wo treffen sie sich?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Straße unter dem Bogen", "Ein Brückenbogen hat die Form f(x) = −0,02x² + 8. Eine Fahrbahn liegt in 6 m Höhe. Wie breit ist sie unter dem Bogen?", "$−0,02x² + 8 = 6$\n$−0,02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
en: [
  ["Comparing phone plans", "Plan A: €10 basic fee and €0.05 per minute. Plan B: €0.15 per minute. From when is A cheaper?", "$0.05x + 10 = 0.15x$\n$10 = 0.1x$\n$x = 100$\n$y = 0.15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Ball on a slope", "A ball flies along f(x) = −0.1x² + 2x, the slope rises as g(x) = 0.5x. Where does the ball land?", "$−0.1x² + 2x = 0.5x$\n$−0.1x² + 1.5x = 0$\n$x·(−0.1x + 1.5) = 0$\n$x = 0$ | $x = 15$\n$y = 0.5 · 15$\n$y = 7.5$"],
  ["Two water jets", "Two fountain jets: f(x) = −x² + 4x and g(x) = −x² + 8x − 12. Where do they meet?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Road under the arch", "A bridge arch has the shape f(x) = −0.02x² + 8. A road lies at a height of 6 m. How wide is it under the arch?", "$−0.02x² + 8 = 6$\n$−0.02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
es: [
  ["Comparar tarifas", "Tarifa A: 10 € fijos y 0,05 € por minuto. Tarifa B: 0,15 € por minuto. ¿A partir de cuándo es más barata A?", "$0,05x + 10 = 0,15x$\n$10 = 0,1x$\n$x = 100$\n$y = 0,15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Balón en la ladera", "Un balón vuela según f(x) = −0,1x² + 2x y la ladera sube según g(x) = 0,5x. ¿Dónde cae el balón?", "$−0,1x² + 2x = 0,5x$\n$−0,1x² + 1,5x = 0$\n$x·(−0,1x + 1,5) = 0$\n$x = 0$ | $x = 15$\n$y = 0,5 · 15$\n$y = 7,5$"],
  ["Dos chorros de agua", "Dos chorros de una fuente: f(x) = −x² + 4x y g(x) = −x² + 8x − 12. ¿Dónde se encuentran?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Carretera bajo el arco", "Un arco de puente tiene la forma f(x) = −0,02x² + 8. Una calzada está a 6 m de altura. ¿Qué ancho tiene bajo el arco?", "$−0,02x² + 8 = 6$\n$−0,02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
zh: [
  ["比较手机套餐", "套餐 A：月租 10 €，每分钟 0.05 €。套餐 B：每分钟 0.15 €。从多少分钟起 A 更便宜？", "$0.05x + 10 = 0.15x$\n$10 = 0.1x$\n$x = 100$\n$y = 0.15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["山坡上的球", "球沿 f(x) = −0.1x² + 2x 飞行，山坡沿 g(x) = 0.5x 上升。球落在哪里？", "$−0.1x² + 2x = 0.5x$\n$−0.1x² + 1.5x = 0$\n$x·(−0.1x + 1.5) = 0$\n$x = 0$ | $x = 15$\n$y = 0.5 · 15$\n$y = 7.5$"],
  ["两股水柱", "喷泉的两股水柱：f(x) = −x² + 4x 和 g(x) = −x² + 8x − 12。它们在哪里相遇？", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["拱下的路", "桥拱的形状是 f(x) = −0.02x² + 8，路面高 6 m。拱下的路面有多宽？", "$−0.02x² + 8 = 6$\n$−0.02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
fr: [
  ["Comparer des forfaits", "Forfait A : 10 € d’abonnement et 0,05 € la minute. Forfait B : 0,15 € la minute. À partir de quand A est-il moins cher ?", "$0,05x + 10 = 0,15x$\n$10 = 0,1x$\n$x = 100$\n$y = 0,15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Balle sur la pente", "Une balle suit f(x) = −0,1x² + 2x, la pente monte selon g(x) = 0,5x. Où la balle atterrit-elle ?", "$−0,1x² + 2x = 0,5x$\n$−0,1x² + 1,5x = 0$\n$x·(−0,1x + 1,5) = 0$\n$x = 0$ | $x = 15$\n$y = 0,5 · 15$\n$y = 7,5$"],
  ["Deux jets d’eau", "Deux jets de fontaine : f(x) = −x² + 4x et g(x) = −x² + 8x − 12. Où se rencontrent-ils ?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Route sous l’arche", "Une arche de pont a la forme f(x) = −0,02x² + 8. Une chaussée se trouve à 6 m de haut. Quelle est sa largeur sous l’arche ?", "$−0,02x² + 8 = 6$\n$−0,02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
ru: [
  ["Сравнение тарифов", "Тариф A: 10 € абонплата и 0,05 € за минуту. Тариф B: 0,15 € за минуту. С какого момента A дешевле?", "$0,05x + 10 = 0,15x$\n$10 = 0,1x$\n$x = 100$\n$y = 0,15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Мяч на склоне", "Мяч летит по f(x) = −0,1x² + 2x, склон поднимается по g(x) = 0,5x. Где мяч упадёт?", "$−0,1x² + 2x = 0,5x$\n$−0,1x² + 1,5x = 0$\n$x·(−0,1x + 1,5) = 0$\n$x = 0$ | $x = 15$\n$y = 0,5 · 15$\n$y = 7,5$"],
  ["Две струи воды", "Две струи фонтана: f(x) = −x² + 4x и g(x) = −x² + 8x − 12. Где они встречаются?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Дорога под аркой", "Арка моста имеет форму f(x) = −0,02x² + 8. Проезжая часть на высоте 6 м. Какой ширины она под аркой?", "$−0,02x² + 8 = 6$\n$−0,02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
ar: [
  ["مقارنة باقتين", "الباقة A: رسوم ثابتة 10 € و0.05 € للدقيقة. الباقة B: ‏0.15 € للدقيقة. متى تصبح A أرخص؟", "$0.05x + 10 = 0.15x$\n$10 = 0.1x$\n$x = 100$\n$y = 0.15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["كرة على منحدر", "تطير كرة على المسار f(x) = −0.1x² + 2x ويرتفع المنحدر وفق g(x) = 0.5x. أين تسقط الكرة؟", "$−0.1x² + 2x = 0.5x$\n$−0.1x² + 1.5x = 0$\n$x·(−0.1x + 1.5) = 0$\n$x = 0$ | $x = 15$\n$y = 0.5 · 15$\n$y = 7.5$"],
  ["نافورتا ماء", "نافورتان: f(x) = −x² + 4x وg(x) = −x² + 8x − 12. أين تلتقيان؟", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["طريق تحت القوس", "قوس جسر شكله f(x) = −0.02x² + 8 وطريق على ارتفاع 6 m. ما عرض الطريق تحت القوس؟", "$−0.02x² + 8 = 6$\n$−0.02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
ja: [
  ["料金プランの比較", "プラン A：基本料 10 € と 1 分 0.05 €。プラン B：1 分 0.15 €。何分から A が安い？", "$0.05x + 10 = 0.15x$\n$10 = 0.1x$\n$x = 100$\n$y = 0.15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["坂とボール", "ボールは f(x) = −0.1x² + 2x の線を飛び、坂は g(x) = 0.5x で上る。ボールはどこに落ちる？", "$−0.1x² + 2x = 0.5x$\n$−0.1x² + 1.5x = 0$\n$x·(−0.1x + 1.5) = 0$\n$x = 0$ | $x = 15$\n$y = 0.5 · 15$\n$y = 7.5$"],
  ["2 本の噴水", "噴水の 2 本の水：f(x) = −x² + 4x と g(x) = −x² + 8x − 12。どこで出会う？", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["アーチの下の道", "橋のアーチは f(x) = −0.02x² + 8。道路は高さ 6 m。アーチの下の道幅は？", "$−0.02x² + 8 = 6$\n$−0.02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
],
pt: [
  ["Comparar planos", "Plano A: 10 € de mensalidade e 0,05 € por minuto. Plano B: 0,15 € por minuto. A partir de quando A é mais barato?", "$0,05x + 10 = 0,15x$\n$10 = 0,1x$\n$x = 100$\n$y = 0,15 · 100$\n$y = 15$\nS(100 | 15)"],
  ["Bola na encosta", "Uma bola voa segundo f(x) = −0,1x² + 2x, a encosta sobe segundo g(x) = 0,5x. Onde a bola cai?", "$−0,1x² + 2x = 0,5x$\n$−0,1x² + 1,5x = 0$\n$x·(−0,1x + 1,5) = 0$\n$x = 0$ | $x = 15$\n$y = 0,5 · 15$\n$y = 7,5$"],
  ["Dois jatos d’água", "Dois jatos de fonte: f(x) = −x² + 4x e g(x) = −x² + 8x − 12. Onde se encontram?", "$−x² + 4x = −x² + 8x − 12$\n$4x = 8x − 12$\n$−4x = −12$\n$x = 3$\n$y = −3² + 4 · 3$\n$y = 3$"],
  ["Rua sob o arco", "Um arco de ponte tem a forma f(x) = −0,02x² + 8. Uma pista está a 6 m de altura. Qual é a largura dela sob o arco?", "$−0,02x² + 8 = 6$\n$−0,02x² = −2$\n$x² = 100$\n$x = −10$ | $x = 10$\n$10 − (−10) = 20$"]
]
}, werte: [
  { art: "gg", f: "0.05x + 10", g: "0.15x" }, { art: "pg", f: "-0.1x^2 + 2x", g: "0.5x" }, { art: "pp", f: "-x^2 + 4x", g: "-x^2 + 8x - 12" }, { art: "pg", f: "-0.02x^2 + 8", g: "6" }
], laden: function(w){ if(window.SN_LADEN) SN_LADEN(w); } });
