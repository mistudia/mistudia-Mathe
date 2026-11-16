// Alltagsbeispiele für /normalverteilung/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Körpergröße", "Die Größe von 12-Jährigen ist etwa normalverteilt mit μ = 150 cm und σ = 8 cm. Wie viel Prozent sind zwischen 142 und 158 cm groß?", "142 bis 158 cm ist $μ ± σ$.\nDort liegen etwa 68 %."],
  ["Saftflaschen", "Eine Maschine füllt Flaschen mit μ = 1000 ml und σ = 5 ml. Wie viel Prozent der Flaschen haben weniger als 990 ml?", "$990 = μ − 2σ$\nUnter $μ − 2σ$ liegen etwa 2,3 %."],
  ["Testpunkte", "In einem Test gilt μ = 60 Punkte und σ = 10. Ab wie vielen Punkten gehört man zu den besten 16 %?", "Über $μ + σ$ liegen etwa 16 %.\n$60 + 10 = 70$ Punkte"],
  ["Äpfel wiegen", "Äpfel wiegen im Mittel μ = 180 g mit σ = 20 g. Wie viel Prozent wiegen zwischen 140 g und 220 g?", "140 bis 220 g ist $μ ± 2σ$.\nDort liegen etwa 95 %."]
],
en: [
  ["Body height", "The height of 12-year-olds is roughly normally distributed with μ = 150 cm and σ = 8 cm. What percentage is between 142 and 158 cm?", "142 to 158 cm is $μ ± σ$.\nAbout 68 % lie there."],
  ["Juice bottles", "A machine fills bottles with μ = 1000 ml and σ = 5 ml. What percentage of bottles contain less than 990 ml?", "$990 = μ − 2σ$\nAbout 2.3 % lie below $μ − 2σ$."],
  ["Test scores", "In a test μ = 60 points and σ = 10. From how many points are you in the top 16 %?", "About 16 % lie above $μ + σ$.\n$60 + 10 = 70$ points"],
  ["Weighing apples", "Apples weigh μ = 180 g on average with σ = 20 g. What percentage weigh between 140 g and 220 g?", "140 to 220 g is $μ ± 2σ$.\nAbout 95 % lie there."]
],
es: [
  ["Estatura", "La estatura de niños de 12 años es aproximadamente normal con μ = 150 cm y σ = 8 cm. ¿Qué porcentaje mide entre 142 y 158 cm?", "De 142 a 158 cm es $μ ± σ$.\nAhí está aproximadamente el 68 %."],
  ["Botellas de zumo", "Una máquina llena botellas con μ = 1000 ml y σ = 5 ml. ¿Qué porcentaje tiene menos de 990 ml?", "$990 = μ − 2σ$\nPor debajo de $μ − 2σ$ está aproximadamente el 2,3 %."],
  ["Puntos del examen", "En un examen μ = 60 puntos y σ = 10. ¿A partir de cuántos puntos estás entre el mejor 16 %?", "Por encima de $μ + σ$ está aproximadamente el 16 %.\n$60 + 10 = 70$ puntos"],
  ["Pesar manzanas", "Las manzanas pesan de media μ = 180 g con σ = 20 g. ¿Qué porcentaje pesa entre 140 g y 220 g?", "De 140 a 220 g es $μ ± 2σ$.\nAhí está aproximadamente el 95 %."]
],
zh: [
  ["身高", "12 岁孩子的身高近似服从正态分布，μ = 150 cm，σ = 8 cm。身高在 142 到 158 cm 之间的约占百分之几？", "142 到 158 cm 就是 $μ ± σ$。\n约占 68 %。"],
  ["果汁瓶", "机器灌装果汁，μ = 1000 ml，σ = 5 ml。少于 990 ml 的瓶子约占百分之几？", "$990 = μ − 2σ$\n低于 $μ − 2σ$ 的约占 2.3 %。"],
  ["考试分数", "考试 μ = 60 分，σ = 10。多少分以上才能进入前 16 %？", "高于 $μ + σ$ 的约占 16 %。\n$60 + 10 = 70$ 分"],
  ["苹果重量", "苹果平均重 μ = 180 g，σ = 20 g。重量在 140 g 到 220 g 之间的约占百分之几？", "140 到 220 g 就是 $μ ± 2σ$。\n约占 95 %。"]
],
fr: [
  ["Taille", "La taille des enfants de 12 ans suit à peu près une loi normale avec μ = 150 cm et σ = 8 cm. Quel pourcentage mesure entre 142 et 158 cm ?", "142 à 158 cm, c’est $μ ± σ$.\nEnviron 68 % s’y trouvent."],
  ["Bouteilles de jus", "Une machine remplit des bouteilles avec μ = 1000 ml et σ = 5 ml. Quel pourcentage contient moins de 990 ml ?", "$990 = μ − 2σ$\nEnviron 2,3 % sont sous $μ − 2σ$."],
  ["Notes au test", "À un test, μ = 60 points et σ = 10. À partir de combien de points fait-on partie des 16 % meilleurs ?", "Environ 16 % sont au-dessus de $μ + σ$.\n$60 + 10 = 70$ points"],
  ["Peser des pommes", "Les pommes pèsent en moyenne μ = 180 g avec σ = 20 g. Quel pourcentage pèse entre 140 g et 220 g ?", "140 à 220 g, c’est $μ ± 2σ$.\nEnviron 95 % s’y trouvent."]
],
ru: [
  ["Рост", "Рост 12-летних примерно нормально распределён: μ = 150 см, σ = 8 см. Какой процент имеет рост от 142 до 158 см?", "От 142 до 158 см – это $μ ± σ$.\nТам около 68 %."],
  ["Бутылки сока", "Автомат наливает бутылки: μ = 1000 мл, σ = 5 мл. Какой процент бутылок содержит меньше 990 мл?", "$990 = μ − 2σ$\nНиже $μ − 2σ$ – около 2,3 %."],
  ["Баллы за тест", "В тесте μ = 60 баллов, σ = 10. Со скольких баллов ты в числе лучших 16 %?", "Выше $μ + σ$ – около 16 %.\n$60 + 10 = 70$ баллов"],
  ["Взвешиваем яблоки", "Яблоки весят в среднем μ = 180 г, σ = 20 г. Какой процент весит от 140 до 220 г?", "От 140 до 220 г – это $μ ± 2σ$.\nТам около 95 %."]
],
ar: [
  ["الطول", "طول الأطفال في سن 12 موزّع تقريبًا توزيعًا طبيعيًا بـ μ = 150 سم و σ = 8 سم. ما النسبة المئوية لمن أطوالهم بين 142 و 158 سم؟", "من 142 إلى 158 سم هو $μ ± σ$.\nنحو 68 %."],
  ["زجاجات العصير", "آلة تملأ زجاجات بـ μ = 1000 مل و σ = 5 مل. ما نسبة الزجاجات التي تحتوي أقل من 990 مل؟", "$990 = μ − 2σ$\nتحت $μ − 2σ$ نحو 2.3 %."],
  ["درجات الاختبار", "في اختبار μ = 60 درجة و σ = 10. من كم درجة تكون ضمن أفضل 16 %؟", "فوق $μ + σ$ نحو 16 %.\n$60 + 10 = 70$ درجة"],
  ["وزن التفاح", "متوسط وزن التفاحة μ = 180 غ و σ = 20 غ. ما نسبة التفاح الذي يزن بين 140 و 220 غ؟", "من 140 إلى 220 غ هو $μ ± 2σ$.\nنحو 95 %."]
],
ja: [
  ["身長", "12 才の身長はほぼ正規分布で μ = 150 cm、σ = 8 cm。142〜158 cm の人は何 % ？", "142〜158 cm は $μ ± σ$。\nおよそ 68 %。"],
  ["ジュースのびん", "機械が μ = 1000 ml、σ = 5 ml でびんにつめる。990 ml 未満のびんは何 % ？", "$990 = μ − 2σ$\n$μ − 2σ$ より下はおよそ 2.3 %。"],
  ["テストの点", "テストは μ = 60 点、σ = 10。上位 16 % に入るには何点以上？", "$μ + σ$ より上がおよそ 16 %。\n$60 + 10 = 70$ 点"],
  ["りんごの重さ", "りんごの重さは平均 μ = 180 g、σ = 20 g。140 g から 220 g のりんごは何 % ？", "140〜220 g は $μ ± 2σ$。\nおよそ 95 %。"]
],
pt: [
  ["Altura", "A altura de crianças de 12 anos é aproximadamente normal com μ = 150 cm e σ = 8 cm. Que porcentagem mede entre 142 e 158 cm?", "De 142 a 158 cm é $μ ± σ$.\nCerca de 68 %."],
  ["Garrafas de suco", "Uma máquina enche garrafas com μ = 1000 ml e σ = 5 ml. Que porcentagem tem menos de 990 ml?", "$990 = μ − 2σ$\nAbaixo de $μ − 2σ$ ficam cerca de 2,3 %."],
  ["Pontos na prova", "Numa prova μ = 60 pontos e σ = 10. A partir de quantos pontos você está entre os 16 % melhores?", "Acima de $μ + σ$ ficam cerca de 16 %.\n$60 + 10 = 70$ pontos"],
  ["Pesar maçãs", "Maçãs pesam em média μ = 180 g com σ = 20 g. Que porcentagem pesa entre 140 g e 220 g?", "De 140 a 220 g é $μ ± 2σ$.\nCerca de 95 %."]
]
}});
