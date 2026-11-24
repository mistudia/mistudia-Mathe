// Alltagsbeispiele für /differential/, 9 Sprachen. Baustein: /alltag.js (🆕 24.11.2026)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Der Tacho", "Ein Auto fährt los. Nach t Sekunden hat es den Weg s(t) = 2t² (in Metern) zurückgelegt. Wie schnell ist es nach 5 Sekunden?", "Die Geschwindigkeit ist die Ableitung des Wegs:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nDas sind $20 · 3,6 = 72$ km/h."],
  ["Steile Straße", "Eine Straße steigt nach dem Profil h(x) = 0,0005x² an (x und h in Metern). Wie steil ist sie nach 100 m?", "Die Steigung ist die Ableitung:\n$h′(x) = 0,001x$\n$h′(100) = 0,001 · 100$\n$= 0,1$\nAlso 10 % Steigung."],
  ["Gehege mit 40 m Zaun", "Mit 40 m Zaun soll ein rechteckiges Gehege möglichst groß werden. Wie lang müssen die Seiten sein?", "Seiten x und 20 − x (halber Umfang 20 m):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nMaximum bei $A′(x) = 0$:\n$x = 10$\nAlso ein Quadrat mit 10 m Seite, $A = 100$ m²."],
  ["Ball hochwerfen", "Ein Ball fliegt nach h(t) = 20t − 5t² (h in Metern, t in Sekunden). Wann ist er am höchsten, und wie hoch?", "Am höchsten Punkt ist die Steigung 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
en: [
  ["The speedometer", "A car pulls away. After t seconds it has travelled s(t) = 2t² (in metres). How fast is it after 5 seconds?", "Speed is the derivative of distance:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nThat is $20 · 3.6 = 72$ km/h."],
  ["Steep road", "A road rises with the profile h(x) = 0.0005x² (x and h in metres). How steep is it after 100 m?", "The gradient is the derivative:\n$h′(x) = 0.001x$\n$h′(100) = 0.001 · 100$\n$= 0.1$\nSo a 10 % gradient."],
  ["Pen with 40 m of fence", "40 m of fence should enclose a rectangular pen that is as big as possible. How long must the sides be?", "Sides x and 20 − x (half the perimeter is 20 m):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nMaximum where $A′(x) = 0$:\n$x = 10$\nSo a square with 10 m sides, $A = 100$ m²."],
  ["Throwing a ball up", "A ball flies according to h(t) = 20t − 5t² (h in metres, t in seconds). When is it highest, and how high?", "At the highest point the gradient is 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
es: [
  ["El velocímetro", "Un coche arranca. Tras t segundos ha recorrido s(t) = 2t² (en metros). ¿A qué velocidad va a los 5 segundos?", "La velocidad es la derivada del camino:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nSon $20 · 3,6 = 72$ km/h."],
  ["Carretera empinada", "Una carretera sube según el perfil h(x) = 0,0005x² (x y h en metros). ¿Qué pendiente tiene a los 100 m?", "La pendiente es la derivada:\n$h′(x) = 0,001x$\n$h′(100) = 0,001 · 100$\n$= 0,1$\nO sea, un 10 % de pendiente."],
  ["Corral con 40 m de valla", "Con 40 m de valla se quiere un corral rectangular lo más grande posible. ¿Cuánto deben medir los lados?", "Lados x y 20 − x (medio perímetro = 20 m):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nMáximo donde $A′(x) = 0$:\n$x = 10$\nUn cuadrado de 10 m de lado, $A = 100$ m²."],
  ["Lanzar una pelota", "Una pelota vuela según h(t) = 20t − 5t² (h en metros, t en segundos). ¿Cuándo está más alta y a qué altura?", "En el punto más alto la pendiente es 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
zh: [
  ["速度表", "一辆车起步。t 秒后它走过的路程是 s(t) = 2t²（单位：米）。5 秒后它的速度是多少？", "速度是路程的导数：\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\n也就是 $20 · 3.6 = 72$ km/h。"],
  ["陡峭的路", "一条路按照 h(x) = 0.0005x² 上升（x 和 h 的单位是米）。在 100 m 处有多陡？", "坡度就是导数：\n$h′(x) = 0.001x$\n$h′(100) = 0.001 · 100$\n$= 0.1$\n也就是 10 % 的坡度。"],
  ["40 m 篱笆围栏", "用 40 m 篱笆围一个面积尽量大的长方形围栏。边长应该是多少？", "边长 x 和 20 − x（周长的一半是 20 m）：\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\n当 $A′(x) = 0$ 时最大：\n$x = 10$\n是边长 10 m 的正方形，$A = 100$ m²。"],
  ["向上抛球", "球的高度是 h(t) = 20t − 5t²（h 单位米，t 单位秒）。什么时候最高？有多高？", "最高点处斜率为 0：\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
fr: [
  ["Le compteur de vitesse", "Une voiture démarre. Après t secondes, elle a parcouru s(t) = 2t² (en mètres). À quelle vitesse roule-t-elle après 5 secondes ?", "La vitesse est la dérivée de la distance :\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nSoit $20 · 3,6 = 72$ km/h."],
  ["Route en pente", "Une route monte selon le profil h(x) = 0,0005x² (x et h en mètres). Quelle est sa pente au bout de 100 m ?", "La pente est la dérivée :\n$h′(x) = 0,001x$\n$h′(100) = 0,001 · 100$\n$= 0,1$\nDonc une pente de 10 %."],
  ["Enclos avec 40 m de clôture", "Avec 40 m de clôture, on veut un enclos rectangulaire le plus grand possible. Quelles doivent être les longueurs des côtés ?", "Côtés x et 20 − x (demi-périmètre 20 m) :\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nMaximum là où $A′(x) = 0$ :\n$x = 10$\nUn carré de 10 m de côté, $A = 100$ m²."],
  ["Lancer une balle", "Une balle vole selon h(t) = 20t − 5t² (h en mètres, t en secondes). Quand est-elle au plus haut, et à quelle hauteur ?", "Au point le plus haut, la pente vaut 0 :\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
ru: [
  ["Спидометр", "Машина трогается с места. Через t секунд она проехала путь s(t) = 2t² (в метрах). С какой скоростью она едет через 5 секунд?", "Скорость – это производная пути:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ м/с\nЭто $20 · 3,6 = 72$ км/ч."],
  ["Крутая дорога", "Дорога поднимается по профилю h(x) = 0,0005x² (x и h в метрах). Какой уклон через 100 м?", "Уклон – это производная:\n$h′(x) = 0,001x$\n$h′(100) = 0,001 · 100$\n$= 0,1$\nТо есть уклон 10 %."],
  ["Загон из 40 м забора", "Из 40 м забора нужно сделать прямоугольный загон как можно большей площади. Какими должны быть стороны?", "Стороны x и 20 − x (полупериметр 20 м):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nМаксимум там, где $A′(x) = 0$:\n$x = 10$\nКвадрат со стороной 10 м, $A = 100$ м²."],
  ["Бросок мяча вверх", "Мяч летит по закону h(t) = 20t − 5t² (h в метрах, t в секундах). Когда он выше всего и на какой высоте?", "В самой высокой точке наклон равен 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ с\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ м"]
],
ar: [
  ["عدّاد السرعة", "تنطلق سيارة. بعد t ثانية تكون قد قطعت المسافة s(t) = 2t² (بالأمتار). ما سرعتها بعد 5 ثوانٍ؟", "السرعة هي مشتقة المسافة:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nأي $20 · 3.6 = 72$ km/h."],
  ["طريق شديد الانحدار", "يرتفع طريق وفق h(x) = 0.0005x² (x وh بالأمتار). ما ميله بعد 100 m؟", "الميل هو المشتقة:\n$h′(x) = 0.001x$\n$h′(100) = 0.001 · 100$\n$= 0.1$\nأي ميل 10 %."],
  ["حظيرة بسياج 40 m", "نريد بسياج طوله 40 m حظيرة مستطيلة أكبر ما يمكن. كم يجب أن يكون طول الضلعين؟", "الضلعان x و20 − x (نصف المحيط 20 m):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nالقيمة العظمى عند $A′(x) = 0$:\n$x = 10$\nأي مربع ضلعه 10 m، و$A = 100$ m²."],
  ["رمي كرة إلى أعلى", "تطير كرة وفق h(t) = 20t − 5t² (h بالأمتار وt بالثواني). متى تكون في أعلى نقطة، وما ارتفاعها؟", "في أعلى نقطة يكون الميل 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
ja: [
  ["スピードメーター", "車が走り出します。t 秒後に進んだ道のりは s(t) = 2t²（メートル）です。5 秒後の速さは？", "速さは道のりの導関数です：\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nつまり $20 · 3.6 = 72$ km/h。"],
  ["急な坂道", "道路が h(x) = 0.0005x²（x と h はメートル）にしたがって上っています。100 m 地点での傾きは？", "傾きは導関数です：\n$h′(x) = 0.001x$\n$h′(100) = 0.001 · 100$\n$= 0.1$\nつまり 10 % の勾配。"],
  ["40 m のさくの囲い", "40 m のさくで、できるだけ広い長方形の囲いを作ります。辺の長さはいくつ？", "辺を x と 20 − x とします（周の半分は 20 m）：\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\n$A′(x) = 0$ で最大：\n$x = 10$\n1 辺 10 m の正方形で、$A = 100$ m²。"],
  ["ボールを投げ上げる", "ボールは h(t) = 20t − 5t²（h はメートル、t は秒）で飛びます。いちばん高くなるのはいつ？ 高さは？", "いちばん高い点では傾きが 0：\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
],
pt: [
  ["O velocímetro", "Um carro arranca. Depois de t segundos percorreu s(t) = 2t² (em metros). Qual é a velocidade após 5 segundos?", "A velocidade é a derivada da distância:\n$s′(t) = 4t$\n$s′(5) = 4 · 5$\n$= 20$ m/s\nSão $20 · 3,6 = 72$ km/h."],
  ["Estrada íngreme", "Uma estrada sobe segundo o perfil h(x) = 0,0005x² (x e h em metros). Qual é a inclinação após 100 m?", "A inclinação é a derivada:\n$h′(x) = 0,001x$\n$h′(100) = 0,001 · 100$\n$= 0,1$\nOu seja, 10 % de inclinação."],
  ["Cercado com 40 m de cerca", "Com 40 m de cerca quer-se um cercado retangular o maior possível. Quanto devem medir os lados?", "Lados x e 20 − x (meio perímetro = 20 m):\n$A(x) = x · (20 − x)$\n$= 20x − x²$\n$A′(x) = 20 − 2x$\nMáximo onde $A′(x) = 0$:\n$x = 10$\nUm quadrado de 10 m de lado, $A = 100$ m²."],
  ["Jogar uma bola para cima", "Uma bola voa segundo h(t) = 20t − 5t² (h em metros, t em segundos). Quando ela está mais alta, e a que altura?", "No ponto mais alto a inclinação é 0:\n$h′(t) = 20 − 10t$\n$20 − 10t = 0$\n$t = 2$ s\n$h(2) = 20 · 2 − 5 · 4$\n$= 20$ m"]
]
}});
