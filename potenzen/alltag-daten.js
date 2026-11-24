// Alltagsbeispiele für /potenzen/, 9 Sprachen. Baustein: /alltag.js (🆕 24.11.2026)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Ein Geheimnis verbreitet sich", "Du erzählst ein Geheimnis 2 Freunden. Am nächsten Tag erzählt es jeder von ihnen 2 neuen Leuten weiter, und so weiter. Wie viele Leute erfahren es am 5. Tag neu?", "Jeden Tag verdoppelt sich die Zahl:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ Leute"],
  ["Speicher im Computer", "Computer rechnen mit Zweierpotenzen. 1 Kibibyte (KiB) sind 2¹⁰ Byte. Wie viele Byte sind das?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ Byte"],
  ["Entfernung zur Sonne", "Die Sonne ist etwa 1,5 · 10⁸ km von der Erde entfernt. Schreib die Zahl ohne Zehnerpotenz.", "$10⁸$ ist eine 1 mit 8 Nullen.\n$1,5 · 10⁸ = 1,5 · 100 000 000$\n$= 150 000 000$ km"],
  ["Quadratisches Beet", "Ein quadratisches Beet hat eine Fläche von 49 m². Wie lang ist eine Seite?", "Fläche = Seite · Seite, also Wurzel ziehen:\n$s = √49$\n$= 7$ m, denn $7 · 7 = 49$"]
],
en: [
  ["A secret spreads", "You tell a secret to 2 friends. The next day each of them tells 2 new people, and so on. How many people hear it for the first time on day 5?", "The number doubles every day:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ people"],
  ["Computer memory", "Computers work with powers of two. 1 kibibyte (KiB) is 2¹⁰ bytes. How many bytes is that?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ bytes"],
  ["Distance to the sun", "The sun is about 1.5 · 10⁸ km from the earth. Write the number without the power of ten.", "$10⁸$ is a 1 with 8 zeros.\n$1.5 · 10⁸ = 1.5 · 100 000 000$\n$= 150 000 000$ km"],
  ["Square flower bed", "A square flower bed has an area of 49 m². How long is one side?", "Area = side · side, so take the square root:\n$s = √49$\n$= 7$ m, because $7 · 7 = 49$"]
],
es: [
  ["Un secreto se extiende", "Cuentas un secreto a 2 amigos. Al día siguiente cada uno se lo cuenta a 2 personas nuevas, y así sucesivamente. ¿Cuántas personas se enteran por primera vez el 5.º día?", "Cada día el número se duplica:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ personas"],
  ["Memoria del ordenador", "Los ordenadores trabajan con potencias de dos. 1 kibibyte (KiB) son 2¹⁰ bytes. ¿Cuántos bytes son?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ bytes"],
  ["Distancia al Sol", "El Sol está a unos 1,5 · 10⁸ km de la Tierra. Escribe el número sin potencia de diez.", "$10⁸$ es un 1 con 8 ceros.\n$1,5 · 10⁸ = 1,5 · 100 000 000$\n$= 150 000 000$ km"],
  ["Parterre cuadrado", "Un parterre cuadrado tiene una superficie de 49 m². ¿Cuánto mide un lado?", "Área = lado · lado, así que sacamos la raíz:\n$s = √49$\n$= 7$ m, porque $7 · 7 = 49$"]
],
zh: [
  ["秘密的传播", "你把一个秘密告诉 2 个朋友。第二天他们每人再告诉 2 个新的人，依此类推。第 5 天有多少人第一次听到？", "人数每天翻倍：\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ 人"],
  ["电脑的存储", "电脑用 2 的幂计算。1 KiB 等于 2¹⁰ 字节。是多少字节？", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ 字节"],
  ["到太阳的距离", "太阳离地球大约 1.5 · 10⁸ km。不用 10 的幂把这个数写出来。", "$10⁸$ 是 1 后面 8 个 0。\n$1.5 · 10⁸ = 1.5 · 100 000 000$\n$= 150 000 000$ km"],
  ["正方形花坛", "一个正方形花坛的面积是 49 m²。边长是多少？", "面积 = 边长 · 边长，所以开平方：\n$s = √49$\n$= 7$ m，因为 $7 · 7 = 49$"]
],
fr: [
  ["Un secret se répand", "Tu racontes un secret à 2 amis. Le lendemain, chacun le raconte à 2 nouvelles personnes, et ainsi de suite. Combien de personnes l’apprennent pour la première fois le 5e jour ?", "Le nombre double chaque jour :\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ personnes"],
  ["Mémoire de l’ordinateur", "Les ordinateurs calculent avec des puissances de deux. 1 kibioctet (Kio) vaut 2¹⁰ octets. Combien d’octets cela fait-il ?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ octets"],
  ["Distance au Soleil", "Le Soleil est à environ 1,5 · 10⁸ km de la Terre. Écris ce nombre sans puissance de dix.", "$10⁸$, c’est un 1 suivi de 8 zéros.\n$1,5 · 10⁸ = 1,5 · 100 000 000$\n$= 150 000 000$ km"],
  ["Parterre carré", "Un parterre carré a une aire de 49 m². Quelle est la longueur d’un côté ?", "Aire = côté · côté, donc on prend la racine :\n$c = √49$\n$= 7$ m, car $7 · 7 = 49$"]
],
ru: [
  ["Секрет расходится", "Ты рассказываешь секрет 2 друзьям. На следующий день каждый из них рассказывает 2 новым людям, и так далее. Сколько человек впервые узнают его на 5-й день?", "Каждый день число удваивается:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ человека"],
  ["Память компьютера", "Компьютеры считают степенями двойки. 1 кибибайт (КиБ) – это 2¹⁰ байт. Сколько это байт?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ байта"],
  ["Расстояние до Солнца", "Солнце находится примерно в 1,5 · 10⁸ км от Земли. Запиши число без степени десяти.", "$10⁸$ – это 1 и 8 нулей.\n$1,5 · 10⁸ = 1,5 · 100 000 000$\n$= 150 000 000$ км"],
  ["Квадратная клумба", "Площадь квадратной клумбы 49 м². Какова длина её стороны?", "Площадь = сторона · сторона, значит, извлекаем корень:\n$s = √49$\n$= 7$ м, потому что $7 · 7 = 49$"]
],
ar: [
  ["انتشار سرّ", "تخبر صديقين بسرّ. في اليوم التالي يخبر كلٌّ منهما شخصين جديدين، وهكذا. كم شخصًا يعرف السرّ لأول مرة في اليوم الخامس؟", "يتضاعف العدد كل يوم:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ شخصًا"],
  ["ذاكرة الحاسوب", "يحسب الحاسوب بقوى العدد 2. الكيبيبايت الواحد (KiB) يساوي 2¹⁰ بايت. كم بايتًا هذا؟", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ بايت"],
  ["المسافة إلى الشمس", "تبعد الشمس عن الأرض نحو 1.5 · 10⁸ km. اكتب العدد من دون قوة العشرة.", "$10⁸$ هو 1 وبعده 8 أصفار.\n$1.5 · 10⁸ = 1.5 · 100 000 000$\n$= 150 000 000$ km"],
  ["حوض زهور مربع", "مساحة حوض زهور مربع 49 m². كم طول ضلعه؟", "المساحة = الضلع · الضلع، لذا نأخذ الجذر:\n$s = √49$\n$= 7$ m، لأن $7 · 7 = 49$"]
],
ja: [
  ["ひみつが広がる", "あなたがひみつを友だち 2 人に話します。次の日、その 1 人 1 人がまた新しい 2 人に話し、これがつづきます。5 日目に初めて知る人は何人？", "人数は毎日 2 倍になります：\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ 人"],
  ["コンピューターの記憶容量", "コンピューターは 2 の累乗で計算します。1 KiB は 2¹⁰ バイトです。何バイト？", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ バイト"],
  ["太陽までの距離", "太陽は地球からおよそ 1.5 · 10⁸ km はなれています。10 の累乗を使わずに書こう。", "$10⁸$ は 1 のあとに 0 が 8 個。\n$1.5 · 10⁸ = 1.5 · 100 000 000$\n$= 150 000 000$ km"],
  ["正方形の花だん", "正方形の花だんの面積は 49 m² です。1 辺の長さは？", "面積 = 1 辺 · 1 辺 なので、平方根をとります：\n$s = √49$\n$= 7$ m（$7 · 7 = 49$ だから）"]
],
pt: [
  ["Um segredo se espalha", "Você conta um segredo a 2 amigos. No dia seguinte cada um conta a 2 pessoas novas, e assim por diante. Quantas pessoas ficam sabendo pela primeira vez no 5.º dia?", "O número dobra a cada dia:\n$2⁵ = 2 · 2 · 2 · 2 · 2$\n$= 32$ pessoas"],
  ["Memória do computador", "Computadores calculam com potências de dois. 1 kibibyte (KiB) são 2¹⁰ bytes. Quantos bytes são?", "$2¹⁰ = 2⁵ · 2⁵$\n$= 32 · 32$\n$= 1024$ bytes"],
  ["Distância até o Sol", "O Sol fica a cerca de 1,5 · 10⁸ km da Terra. Escreva o número sem a potência de dez.", "$10⁸$ é um 1 com 8 zeros.\n$1,5 · 10⁸ = 1,5 · 100 000 000$\n$= 150 000 000$ km"],
  ["Canteiro quadrado", "Um canteiro quadrado tem área de 49 m². Quanto mede um lado?", "Área = lado · lado, então tiramos a raiz:\n$s = √49$\n$= 7$ m, porque $7 · 7 = 49$"]
]
}});
