// Alltagsbeispiele für /exponential/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Bakterien", "Eine Bakterienkultur verdoppelt sich jede Stunde. Am Anfang sind es 100. Wie viele sind es nach 5 Stunden?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Sparen mit Zinsen", "1000 € liegen 10 Jahre zu 3 % Zinsen pro Jahr. Wie viel ist es dann?", "$K = 1000 · 1,03¹⁰$\n$≈ 1343,92 €$"],
  ["Wertverlust", "Ein Auto für 20 000 € verliert jedes Jahr 15 % an Wert. Was ist es nach 4 Jahren wert?", "Es bleiben jedes Jahr 85 %.\n$20000 · 0,85⁴ ≈ 10440 €$"],
  ["Halbwertszeit", "Ein Medikament wird im Körper alle 6 Stunden zur Hälfte abgebaut. Von 400 mg – wie viel ist nach 24 Stunden übrig?", "24 h sind 4 Halbwertszeiten.\n$400 · 0,5⁴ = 25 mg$"]
],
en: [
  ["Bacteria", "A bacteria culture doubles every hour. It starts with 100. How many are there after 5 hours?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Saving with interest", "1000 dollars stay in the bank for 10 years at 3 % a year. How much is it then?", "$K = 1000 · 1.03¹⁰$\n$≈ 1343.92$ dollars"],
  ["Losing value", "A car worth 20 000 dollars loses 15 % of its value every year. What is it worth after 4 years?", "85 % remains each year.\n$20000 · 0.85⁴ ≈ 10440$ dollars"],
  ["Half-life", "A medicine is halved in the body every 6 hours. Starting with 400 mg – how much is left after 24 hours?", "24 h are 4 half-lives.\n$400 · 0.5⁴ = 25 mg$"]
],
es: [
  ["Bacterias", "Un cultivo de bacterias se duplica cada hora. Empieza con 100. ¿Cuántas hay tras 5 horas?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Ahorrar con intereses", "1000 € están 10 años al 3 % anual. ¿Cuánto hay entonces?", "$C = 1000 · 1,03¹⁰$\n$≈ 1343,92 €$"],
  ["Pérdida de valor", "Un coche de 20 000 € pierde el 15 % de su valor cada año. ¿Cuánto vale tras 4 años?", "Cada año queda el 85 %.\n$20000 · 0,85⁴ ≈ 10440 €$"],
  ["Vida media", "Un medicamento se reduce a la mitad en el cuerpo cada 6 horas. De 400 mg, ¿cuánto queda tras 24 horas?", "24 h son 4 vidas medias.\n$400 · 0,5⁴ = 25 mg$"]
],
zh: [
  ["细菌", "细菌每小时数量翻倍。开始有 100 个。5 小时后有多少？", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["储蓄利息", "1000 元以年利率 3% 存 10 年，最后有多少？", "$K = 1000 · 1.03¹⁰$\n$≈ 1343.92$ 元"],
  ["贬值", "一辆 200000 元的车每年贬值 15%。4 年后值多少？", "每年剩下 85%。\n$200000 · 0.85⁴ ≈ 104401$ 元"],
  ["半衰期", "一种药在体内每 6 小时减少一半。从 400 毫克开始，24 小时后剩多少？", "24 小时是 4 个半衰期。\n$400 · 0.5⁴ = 25 mg$"]
],
fr: [
  ["Bactéries", "Une culture de bactéries double chaque heure. Au départ il y en a 100. Combien après 5 heures ?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Épargne avec intérêts", "1000 € sont placés 10 ans à 3 % par an. Combien à la fin ?", "$C = 1000 · 1,03¹⁰$\n$≈ 1343,92 €$"],
  ["Perte de valeur", "Une voiture de 20 000 € perd 15 % de sa valeur chaque année. Que vaut-elle après 4 ans ?", "Il reste 85 % chaque année.\n$20000 · 0,85⁴ ≈ 10440 €$"],
  ["Demi-vie", "Un médicament est éliminé de moitié toutes les 6 heures. Sur 400 mg, combien reste-t-il après 24 heures ?", "24 h = 4 demi-vies.\n$400 · 0,5⁴ = 25 mg$"]
],
ru: [
  ["Бактерии", "Колония бактерий удваивается каждый час. Вначале их 100. Сколько их через 5 часов?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Вклад с процентами", "10000 руб. лежат 10 лет под 3 % годовых. Сколько будет в конце?", "$K = 10000 · 1,03¹⁰$\n$≈ 13439,16$ руб."],
  ["Потеря стоимости", "Машина за 2 000 000 руб. каждый год теряет 15 % стоимости. Сколько она стоит через 4 года?", "Каждый год остаётся 85 %.\n$2000000 · 0,85⁴ ≈ 1044013$ руб."],
  ["Период полураспада", "Лекарство в организме уменьшается вдвое каждые 6 часов. Из 400 мг сколько останется через 24 часа?", "24 ч – это 4 периода полураспада.\n$400 · 0,5⁴ = 25$ мг"]
],
ar: [
  ["البكتيريا", "تتضاعف مستعمرة بكتيريا كل ساعة. في البداية 100. كم تصبح بعد 5 ساعات؟", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["الادخار بفائدة", "1000 دولار مودعة 10 سنوات بفائدة 3 % سنويًا. كم تصبح؟", "$K = 1000 · 1.03¹⁰$\n$≈ 1343.92$ دولارًا"],
  ["تراجع القيمة", "سيارة ثمنها 20 000 دولار تفقد 15 % من قيمتها كل سنة. كم قيمتها بعد 4 سنوات؟", "يبقى 85 % كل سنة.\n$20000 · 0.85⁴ ≈ 10440$ دولارًا"],
  ["عمر النصف", "يتحلل دواء في الجسم إلى النصف كل 6 ساعات. من 400 ملغ، كم يبقى بعد 24 ساعة؟", "24 ساعة = 4 أعمار نصف.\n$400 · 0.5⁴ = 25 mg$"]
],
ja: [
  ["細菌", "細菌は 1 時間ごとに 2 倍になる。はじめ 100。5 時間後はいくつ？", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["利息で貯金", "100000 円を年利 3 % で 10 年預ける。最後にいくら？", "$K = 100000 · 1.03¹⁰$\n$≈ 134392$ 円"],
  ["値下がり", "200 万円の車が毎年 15 % 値下がりする。4 年後はいくら？", "毎年 85 % が残る。\n$2000000 · 0.85⁴ ≈ 1044013$ 円"],
  ["半減期", "薬は体内で 6 時間ごとに半分になる。400 mg のとき、24 時間後に残るのは？", "24 時間は半減期 4 回分。\n$400 · 0.5⁴ = 25 mg$"]
],
pt: [
  ["Bactérias", "Uma cultura de bactérias dobra a cada hora. Começa com 100. Quantas há depois de 5 horas?", "$f(t) = 100 · 2^t$\n$f(5) = 100 · 2⁵ = 3200$"],
  ["Poupar com juros", "1000 reais ficam 10 anos a 3 % ao ano. Quanto há no fim?", "$M = 1000 · 1,03¹⁰$\n$≈ 1343,92$ reais"],
  ["Desvalorização", "Um carro de 20 000 reais perde 15 % do valor por ano. Quanto vale depois de 4 anos?", "Sobra 85 % a cada ano.\n$20000 · 0,85⁴ ≈ 10440$ reais"],
  ["Meia-vida", "Um remédio cai pela metade no corpo a cada 6 horas. De 400 mg, quanto sobra após 24 horas?", "24 h são 4 meias-vidas.\n$400 · 0,5⁴ = 25 mg$"]
]
}});
