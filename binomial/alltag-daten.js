// Alltagsbeispiele für /binomial/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Münzwurf", "Du wirfst eine Münze 10-mal. Wie wahrscheinlich ist genau 5-mal Kopf?", "$n = 10$, $p = 0,5$, $k = 5$\n$P = (10 über 5) · 0,5¹⁰$\n$= 252 : 1024 ≈ 24,6 %$"],
  ["Raten im Test", "Ein Test hat 5 Fragen mit je 4 Antworten. Du rätst bei allen. Wie wahrscheinlich ist keine richtig?", "$p = 0,25$, also $1 − p = 0,75$\n$P(X = 0) = 0,75⁵ ≈ 23,7 %$"],
  ["Elfmeter", "Eine Spielerin trifft 80 % ihrer Elfmeter. Wie wahrscheinlich trifft sie alle 3?", "$P(X = 3) = 0,8³$\n$= 0,512 ≈ 51,2 %$"],
  ["Überraschungseier", "In jedem 6. Ei steckt eine Figur. Du kaufst 30 Eier. Wie viele Figuren kannst du erwarten?", "$E(X) = n · p = 30 · 1/6 = 5$ Figuren"]
],
en: [
  ["Tossing a coin", "You toss a coin 10 times. How likely are exactly 5 heads?", "$n = 10$, $p = 0.5$, $k = 5$\n$P = (10 choose 5) · 0.5¹⁰$\n$= 252 : 1024 ≈ 24.6 %$"],
  ["Guessing in a test", "A test has 5 questions with 4 answers each. You guess them all. How likely is none correct?", "$p = 0.25$, so $1 − p = 0.75$\n$P(X = 0) = 0.75⁵ ≈ 23.7 %$"],
  ["Penalties", "A player scores 80 % of her penalties. How likely does she score all 3?", "$P(X = 3) = 0.8³$\n$= 0.512 ≈ 51.2 %$"],
  ["Surprise eggs", "Every 6th egg contains a figure. You buy 30 eggs. How many figures can you expect?", "$E(X) = n · p = 30 · 1/6 = 5$ figures"]
],
es: [
  ["Lanzar una moneda", "Lanzas una moneda 10 veces. ¿Qué probabilidad hay de exactamente 5 caras?", "$n = 10$, $p = 0,5$, $k = 5$\n$P = (10 sobre 5) · 0,5¹⁰$\n$= 252 : 1024 ≈ 24,6 %$"],
  ["Adivinar en un examen", "Un examen tiene 5 preguntas con 4 respuestas cada una. Lo adivinas todo. ¿Probabilidad de no acertar ninguna?", "$p = 0,25$, así que $1 − p = 0,75$\n$P(X = 0) = 0,75⁵ ≈ 23,7 %$"],
  ["Penaltis", "Una jugadora marca el 80 % de sus penaltis. ¿Probabilidad de marcar los 3?", "$P(X = 3) = 0,8³$\n$= 0,512 ≈ 51,2 %$"],
  ["Huevos sorpresa", "Uno de cada 6 huevos trae una figura. Compras 30. ¿Cuántas figuras puedes esperar?", "$E(X) = n · p = 30 · 1/6 = 5$ figuras"]
],
zh: [
  ["抛硬币", "抛硬币 10 次，恰好 5 次正面的概率是多少？", "$n = 10$，$p = 0.5$，$k = 5$\n$P = C(10, 5) · 0.5¹⁰$\n$= 252 : 1024 ≈ 24.6 %$"],
  ["考试蒙答案", "测验有 5 道题，每题 4 个选项。全部靠猜，一题都不对的概率？", "$p = 0.25$，所以 $1 − p = 0.75$\n$P(X = 0) = 0.75⁵ ≈ 23.7 %$"],
  ["点球", "一名球员罚点球命中率 80%。3 个全进的概率？", "$P(X = 3) = 0.8³$\n$= 0.512 ≈ 51.2 %$"],
  ["奇趣蛋", "每 6 个奇趣蛋里有 1 个公仔。买 30 个，预计有几个公仔？", "$E(X) = n · p = 30 · 1/6 = 5$ 个"]
],
fr: [
  ["Pile ou face", "Tu lances une pièce 10 fois. Quelle est la probabilité d’obtenir exactement 5 fois pile ?", "$n = 10$, $p = 0,5$, $k = 5$\n$P = (10 parmi 5) · 0,5¹⁰$\n$= 252 : 1024 ≈ 24,6 %$"],
  ["Deviner au QCM", "Un QCM a 5 questions à 4 réponses. Tu réponds au hasard. Probabilité de n’avoir aucune bonne réponse ?", "$p = 0,25$, donc $1 − p = 0,75$\n$P(X = 0) = 0,75⁵ ≈ 23,7 %$"],
  ["Penalties", "Une joueuse marque 80 % de ses penalties. Probabilité de marquer les 3 ?", "$P(X = 3) = 0,8³$\n$= 0,512 ≈ 51,2 %$"],
  ["Œufs surprise", "Un œuf sur 6 contient une figurine. Tu en achètes 30. Combien de figurines peux-tu espérer ?", "$E(X) = n · p = 30 · 1/6 = 5$ figurines"]
],
ru: [
  ["Бросаем монету", "Ты бросаешь монету 10 раз. Какова вероятность ровно 5 орлов?", "$n = 10$, $p = 0,5$, $k = 5$\n$P = C(10, 5) · 0,5¹⁰$\n$= 252 : 1024 ≈ 24,6 %$"],
  ["Угадываем в тесте", "В тесте 5 вопросов по 4 варианта ответа. Ты угадываешь все. Какова вероятность не угадать ни одного?", "$p = 0,25$, значит $1 − p = 0,75$\n$P(X = 0) = 0,75⁵ ≈ 23,7 %$"],
  ["Пенальти", "Футболистка забивает 80 % пенальти. Какова вероятность забить все 3?", "$P(X = 3) = 0,8³$\n$= 0,512 ≈ 51,2 %$"],
  ["Киндер-сюрприз", "В каждом 6-м яйце есть фигурка. Ты покупаешь 30 яиц. Сколько фигурок можно ожидать?", "$E(X) = n · p = 30 · 1/6 = 5$ фигурок"]
],
ar: [
  ["رمي قطعة نقود", "ترمي قطعة نقود 10 مرات. ما احتمال ظهور الصورة 5 مرات بالضبط؟", "$n = 10$، $p = 0.5$، $k = 5$\n$P = C(10, 5) · 0.5¹⁰$\n$= 252 : 1024 ≈ 24.6 %$"],
  ["التخمين في الاختبار", "في اختبار 5 أسئلة لكل منها 4 إجابات. تخمّن في الجميع. ما احتمال ألا تصيب أي إجابة؟", "$p = 0.25$، إذن $1 − p = 0.75$\n$P(X = 0) = 0.75⁵ ≈ 23.7 %$"],
  ["ركلات الجزاء", "لاعبة تسجّل 80 % من ركلات الجزاء. ما احتمال أن تسجّل الثلاث كلها؟", "$P(X = 3) = 0.8³$\n$= 0.512 ≈ 51.2 %$"],
  ["بيض المفاجآت", "في كل بيضة سادسة لعبة صغيرة. تشتري 30 بيضة. كم لعبة تتوقع؟", "$E(X) = n · p = 30 · 1/6 = 5$ ألعاب"]
],
ja: [
  ["コイン投げ", "コインを 10 回投げる。表がちょうど 5 回出る確率は？", "$n = 10$、$p = 0.5$、$k = 5$\n$P = ₁₀C₅ · 0.5¹⁰$\n$= 252 : 1024 ≈ 24.6 %$"],
  ["テストで当てずっぽう", "4 択の問題が 5 問。全部当てずっぽうで答える。1 問も正解しない確率は？", "$p = 0.25$、だから $1 − p = 0.75$\n$P(X = 0) = 0.75⁵ ≈ 23.7 %$"],
  ["PK", "PK の成功率が 80 % の選手。3 本とも決める確率は？", "$P(X = 3) = 0.8³$\n$= 0.512 ≈ 51.2 %$"],
  ["おまけ付きお菓子", "6 個に 1 個フィギュアが入っている。30 個買うと、フィギュアはいくつ期待できる？", "$E(X) = n · p = 30 · 1/6 = 5$ 個"]
],
pt: [
  ["Jogar moeda", "Você joga uma moeda 10 vezes. Qual a probabilidade de exatamente 5 caras?", "$n = 10$, $p = 0,5$, $k = 5$\n$P = C(10, 5) · 0,5¹⁰$\n$= 252 : 1024 ≈ 24,6 %$"],
  ["Chutar na prova", "Uma prova tem 5 questões com 4 alternativas. Você chuta todas. Qual a probabilidade de não acertar nenhuma?", "$p = 0,25$, então $1 − p = 0,75$\n$P(X = 0) = 0,75⁵ ≈ 23,7 %$"],
  ["Pênaltis", "Uma jogadora acerta 80 % dos pênaltis. Qual a probabilidade de acertar os 3?", "$P(X = 3) = 0,8³$\n$= 0,512 ≈ 51,2 %$"],
  ["Ovos surpresa", "Um em cada 6 ovos tem um bonequinho. Você compra 30. Quantos bonequinhos pode esperar?", "$E(X) = n · p = 30 · 1/6 = 5$ bonequinhos"]
]
}});
