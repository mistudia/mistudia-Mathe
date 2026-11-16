// Alltagsbeispiele für /brueche/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Pizza teilen", "Eine Pizza ist in 8 Stücke geteilt. Du isst 3, dein Freund 2. Welcher Teil der Pizza ist weg, welcher bleibt übrig?", "$3/8 + 2/8 = 5/8$ sind weg.\n$8/8 − 5/8 = 3/8$ bleiben übrig."],
  ["Rezept halbieren", "Im Rezept stehen 3/4 Liter Milch. Du backst nur die Hälfte. Wie viel Milch brauchst du?", "$3/4 · 1/2 = 3/8$\nDu brauchst 3/8 Liter Milch."],
  ["Schokolade verschenken", "Eine Tafel hat 24 Stückchen. Du verschenkst 2/3 davon. Wie viele Stückchen sind das?", "$24 : 3 = 8$\n$8 · 2 = 16$ Stückchen."],
  ["Gläser füllen", "Wie viele Gläser zu je 1/4 Liter kannst du aus 3 Litern Saft füllen?", "$3 : 1/4 = 3 · 4 = 12$\nDu kannst 12 Gläser füllen."]
],
en: [
  ["Sharing a pizza", "A pizza is cut into 8 slices. You eat 3, your friend eats 2. What fraction is gone, and what is left?", "$3/8 + 2/8 = 5/8$ is gone.\n$8/8 − 5/8 = 3/8$ is left."],
  ["Halving a recipe", "The recipe needs 3/4 litre of milk. You only make half. How much milk do you need?", "$3/4 · 1/2 = 3/8$\nYou need 3/8 litre of milk."],
  ["Giving away chocolate", "A bar has 24 pieces. You give away 2/3 of it. How many pieces is that?", "$24 : 3 = 8$\n$8 · 2 = 16$ pieces."],
  ["Filling glasses", "How many 1/4-litre glasses can you fill from 3 litres of juice?", "$3 : 1/4 = 3 · 4 = 12$\nYou can fill 12 glasses."]
],
es: [
  ["Repartir una pizza", "Una pizza está cortada en 8 trozos. Tú comes 3 y tu amigo 2. ¿Qué parte se ha comido y qué parte queda?", "$3/8 + 2/8 = 5/8$ se ha comido.\nQuedan $8/8 − 5/8 = 3/8$."],
  ["Media receta", "La receta lleva 3/4 de litro de leche. Solo haces la mitad. ¿Cuánta leche necesitas?", "$3/4 · 1/2 = 3/8$\nNecesitas 3/8 de litro."],
  ["Regalar chocolate", "Una tableta tiene 24 onzas. Regalas 2/3. ¿Cuántas onzas son?", "$24 : 3 = 8$\n$8 · 2 = 16$ onzas."],
  ["Llenar vasos", "¿Cuántos vasos de 1/4 de litro puedes llenar con 3 litros de zumo?", "$3 : 1/4 = 3 · 4 = 12$\nPuedes llenar 12 vasos."]
],
zh: [
  ["分披萨", "一个披萨切成 8 块。你吃了 3 块，朋友吃了 2 块。吃掉了几分之几？还剩几分之几？", "$3/8 + 2/8 = 5/8$ 吃掉了。\n还剩 $8/8 − 5/8 = 3/8$。"],
  ["食谱减半", "食谱要 3/4 升牛奶。你只做一半。需要多少牛奶？", "$3/4 · 1/2 = 3/8$\n需要 3/8 升牛奶。"],
  ["送巧克力", "一板巧克力有 24 小块。你送出 2/3。是多少块？", "$24 : 3 = 8$\n$8 · 2 = 16$ 块。"],
  ["倒果汁", "3 升果汁能倒满多少个 1/4 升的杯子？", "$3 : 1/4 = 3 · 4 = 12$\n能倒满 12 杯。"]
],
fr: [
  ["Partager une pizza", "Une pizza est coupée en 8 parts. Tu en manges 3, ton ami 2. Quelle fraction est mangée, quelle fraction reste ?", "$3/8 + 2/8 = 5/8$ sont mangés.\nIl reste $8/8 − 5/8 = 3/8$."],
  ["Recette divisée par deux", "La recette demande 3/4 de litre de lait. Tu n’en fais que la moitié. Combien de lait te faut-il ?", "$3/4 · 1/2 = 3/8$\nIl te faut 3/8 de litre."],
  ["Offrir du chocolat", "Une tablette a 24 carrés. Tu en offres 2/3. Combien de carrés est-ce ?", "$24 : 3 = 8$\n$8 · 2 = 16$ carrés."],
  ["Remplir des verres", "Combien de verres de 1/4 de litre peux-tu remplir avec 3 litres de jus ?", "$3 : 1/4 = 3 · 4 = 12$\nTu peux remplir 12 verres."]
],
ru: [
  ["Делим пиццу", "Пиццу разрезали на 8 кусков. Ты съел 3, твой друг 2. Какая часть съедена, какая осталась?", "$3/8 + 2/8 = 5/8$ съедено.\nОсталось $8/8 − 5/8 = 3/8$."],
  ["Половина рецепта", "В рецепте 3/4 литра молока. Ты готовишь только половину. Сколько молока нужно?", "$3/4 · 1/2 = 3/8$\nНужно 3/8 литра."],
  ["Дарим шоколад", "В плитке 24 дольки. Ты даришь 2/3. Сколько это долек?", "$24 : 3 = 8$\n$8 · 2 = 16$ долек."],
  ["Наливаем стаканы", "Сколько стаканов по 1/4 литра можно наполнить из 3 литров сока?", "$3 : 1/4 = 3 · 4 = 12$\nМожно наполнить 12 стаканов."]
],
ar: [
  ["تقسيم البيتزا", "قُسّمت بيتزا إلى 8 قطع. أكلت 3 وأكل صديقك 2. ما الجزء الذي أُكل وما الجزء الباقي؟", "$3/8 + 2/8 = 5/8$ أُكل.\nالباقي $8/8 − 5/8 = 3/8$."],
  ["نصف الوصفة", "في الوصفة 3/4 لتر حليب. ستحضّر النصف فقط. كم تحتاج من الحليب؟", "$3/4 · 1/2 = 3/8$\nتحتاج 3/8 لتر."],
  ["إهداء الشوكولاتة", "في لوح الشوكولاتة 24 مربعًا. أهديت 2/3 منه. كم مربعًا؟", "$24 : 3 = 8$\n$8 · 2 = 16$ مربعًا."],
  ["ملء الأكواب", "كم كوبًا سعته 1/4 لتر تملأ من 3 لترات عصير؟", "$3 : 1/4 = 3 · 4 = 12$\nتملأ 12 كوبًا."]
],
ja: [
  ["ピザを分ける", "ピザが 8 切れに分けてある。あなたが 3 切れ、友だちが 2 切れ食べた。食べたのは何分のいくつ？残りは？", "$3/8 + 2/8 = 5/8$ を食べた。\n残りは $8/8 − 5/8 = 3/8$。"],
  ["レシピを半分に", "レシピに牛乳 3/4 リットルとある。半分の量だけ作る。牛乳はどれだけいる？", "$3/4 · 1/2 = 3/8$\n3/8 リットルいる。"],
  ["チョコをあげる", "板チョコは 24 かけ。その 2/3 をあげる。何かけ？", "$24 : 3 = 8$\n$8 · 2 = 16$ かけ。"],
  ["コップに注ぐ", "ジュース 3 リットルで 1/4 リットルのコップは何杯？", "$3 : 1/4 = 3 · 4 = 12$\n12 杯注げる。"]
],
pt: [
  ["Dividir a pizza", "Uma pizza foi cortada em 8 fatias. Você come 3 e seu amigo 2. Que fração foi comida e que fração sobrou?", "$3/8 + 2/8 = 5/8$ foram comidos.\nSobram $8/8 − 5/8 = 3/8$."],
  ["Meia receita", "A receita pede 3/4 de litro de leite. Você faz só metade. Quanto leite precisa?", "$3/4 · 1/2 = 3/8$\nPrecisa de 3/8 de litro."],
  ["Dar chocolate", "Uma barra tem 24 quadradinhos. Você dá 2/3 dela. Quantos quadradinhos são?", "$24 : 3 = 8$\n$8 · 2 = 16$ quadradinhos."],
  ["Encher copos", "Quantos copos de 1/4 de litro dá para encher com 3 litros de suco?", "$3 : 1/4 = 3 · 4 = 12$\nDá para encher 12 copos."]
]
}});
