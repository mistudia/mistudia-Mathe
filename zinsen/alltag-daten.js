// Alltagsbeispiele für /zinsen/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Sparbuch", "Du legst 500 € für ein Jahr zu 2 % Zinsen an. Wie viele Zinsen bekommst du?", "$Z = 500 € · 2 : 100 = 10 €$"],
  ["Jacke im Sale", "Eine Jacke kostet 80 €, es gibt 30 % Rabatt. Was zahlst du?", "Du zahlst $100 % − 30 % = 70 %$.\n$80 € · 0,7 = 56 €$"],
  ["Mehrwertsteuer", "Ein Fahrrad kostet ohne Steuer 400 €. Dazu kommen 19 % Mehrwertsteuer. Wie teuer ist es?", "$400 € · 1,19 = 476 €$"],
  ["Zinseszins", "1000 € liegen 3 Jahre lang zu 5 % – die Zinsen werden jedes Jahr mitverzinst. Wie viel ist es am Ende?", "$K = 1000 € · 1,05³$\n$= 1157,63 €$"]
],
en: [
  ["Savings account", "You put 500 dollars in the bank for one year at 2 % interest. How much interest do you get?", "$I = 500 · 2 : 100 = 10$ dollars"],
  ["Jacket on sale", "A jacket costs 80 dollars and there is 30 % off. What do you pay?", "You pay $100 % − 30 % = 70 %$.\n$80 · 0.7 = 56$ dollars"],
  ["Sales tax", "A bike costs 400 dollars before tax. 19 % tax is added. What is the price?", "$400 · 1.19 = 476$ dollars"],
  ["Compound interest", "1000 dollars stay in the bank for 3 years at 5 %, and the interest earns interest too. How much is it at the end?", "$K = 1000 · 1.05³$\n$= 1157.63$ dollars"]
],
es: [
  ["Cuenta de ahorro", "Ingresas 500 € durante un año al 2 % de interés. ¿Cuántos intereses recibes?", "$I = 500 € · 2 : 100 = 10 €$"],
  ["Rebajas", "Una chaqueta cuesta 80 € y tiene un 30 % de descuento. ¿Cuánto pagas?", "Pagas el $100 % − 30 % = 70 %$.\n$80 € · 0,7 = 56 €$"],
  ["IVA", "Una bici cuesta 400 € sin impuestos. Se añade un 21 % de IVA. ¿Cuánto cuesta?", "$400 € · 1,21 = 484 €$"],
  ["Interés compuesto", "1000 € están 3 años al 5 % y los intereses también generan intereses. ¿Cuánto hay al final?", "$C = 1000 € · 1,05³$\n$= 1157,63 €$"]
],
zh: [
  ["储蓄", "你把 500 元存一年，年利率 2%。能得多少利息？", "$利息 = 500 · 2 : 100 = 10$ 元"],
  ["打折外套", "外套 80 元，打七折（便宜 30%）。要付多少？", "要付 $100 % − 30 % = 70 %$。\n$80 · 0.7 = 56$ 元"],
  ["增值税", "自行车不含税 400 元，加 13% 的税。含税多少钱？", "$400 · 1.13 = 452$ 元"],
  ["复利", "1000 元存 3 年，年利率 5%，利息也计息（复利）。最后有多少？", "$K = 1000 · 1.05³$\n$= 1157.63$ 元"]
],
fr: [
  ["Livret d’épargne", "Tu places 500 € pendant un an à 2 %. Combien d’intérêts reçois-tu ?", "$I = 500 € · 2 : 100 = 10 €$"],
  ["Soldes", "Une veste coûte 80 € avec 30 % de réduction. Combien paies-tu ?", "Tu paies $100 % − 30 % = 70 %$.\n$80 € · 0,7 = 56 €$"],
  ["TVA", "Un vélo coûte 400 € hors taxe. On ajoute 20 % de TVA. Quel est son prix ?", "$400 € · 1,2 = 480 €$"],
  ["Intérêts composés", "1000 € sont placés 3 ans à 5 %, les intérêts rapportent aussi des intérêts. Combien à la fin ?", "$C = 1000 € · 1,05³$\n$= 1157,63 €$"]
],
ru: [
  ["Вклад", "Ты кладёшь 5000 руб. в банк на год под 2 %. Сколько процентов получишь?", "$5000 · 2 : 100 = 100$ руб."],
  ["Распродажа", "Куртка стоит 8000 руб., скидка 30 %. Сколько платишь?", "Платишь $100 % − 30 % = 70 %$.\n$8000 · 0,7 = 5600$ руб."],
  ["НДС", "Велосипед без налога стоит 40000 руб. Добавляется 20 % НДС. Сколько он стоит?", "$40000 · 1,2 = 48000$ руб."],
  ["Сложные проценты", "10000 руб. лежат 3 года под 5 %, проценты тоже приносят проценты. Сколько будет в конце?", "$K = 10000 · 1,05³$\n$= 11576,25$ руб."]
],
ar: [
  ["حساب التوفير", "تودع 500 دولار لمدة سنة بفائدة 2 %. كم تبلغ الفائدة؟", "$500 · 2 : 100 = 10$ دولارات"],
  ["تخفيضات", "سعر سترة 80 دولارًا وعليها خصم 30 %. كم تدفع؟", "تدفع $100 % − 30 % = 70 %$.\n$80 · 0.7 = 56$ دولارًا"],
  ["ضريبة القيمة المضافة", "سعر دراجة دون ضريبة 400 دولار، وتضاف ضريبة 15 %. كم السعر؟", "$400 · 1.15 = 460$ دولارًا"],
  ["الفائدة المركبة", "1000 دولار مودعة 3 سنوات بفائدة 5 %، والفوائد تُضاف وتربح فائدة أيضًا. كم المبلغ في النهاية؟", "$K = 1000 · 1.05³$\n$= 1157.63$ دولارًا"]
],
ja: [
  ["預金", "50000 円を 1 年間、利率 2 % で預ける。利息はいくら？", "$50000 · 2 : 100 = 1000$ 円"],
  ["セール", "8000 円の上着が 30 % 引き。いくら払う？", "払うのは $100 % − 30 % = 70 %$。\n$8000 · 0.7 = 5600$ 円"],
  ["消費税", "税抜き 40000 円の自転車に消費税 10 % がつく。いくら？", "$40000 · 1.1 = 44000$ 円"],
  ["複利", "100000 円を 3 年間、利率 5 % の複利で預ける。最後にいくら？", "$K = 100000 · 1.05³$\n$= 115762.5$ 円"]
],
pt: [
  ["Poupança", "Você aplica 500 reais por um ano a 2 % de juros. Quanto recebe de juros?", "$J = 500 · 2 : 100 = 10$ reais"],
  ["Liquidação", "Uma jaqueta custa 80 reais com 30 % de desconto. Quanto você paga?", "Você paga $100 % − 30 % = 70 %$.\n$80 · 0,7 = 56$ reais"],
  ["Imposto", "Uma bicicleta custa 400 reais sem imposto. Somam-se 18 % de imposto. Qual é o preço?", "$400 · 1,18 = 472$ reais"],
  ["Juros compostos", "1000 reais ficam 3 anos a 5 %, e os juros também rendem juros. Quanto há no final?", "$M = 1000 · 1,05³$\n$= 1157,63$ reais"]
]
}});
