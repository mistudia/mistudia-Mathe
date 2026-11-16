// Alltagsbeispiele für /einmaleins/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Eierkartons", "In einen Karton passen 6 Eier. Wie viele Eier sind in 7 Kartons?", "$7 · 6 = 42$ Eier"],
  ["Stuhlreihen", "In der Aula stehen 8 Reihen mit je 9 Stühlen. Wie viele Stühle sind das?", "$8 · 9 = 72$ Stühle"],
  ["Stickerheft", "Ein Stickerheft hat 5 Seiten mit je 8 Stickern. Wie viele Sticker passen hinein?", "$5 · 8 = 40$ Sticker"],
  ["Bonbons verteilen", "56 Bonbons werden gerecht an 7 Kinder verteilt. Wie viele bekommt jedes Kind?", "$56 : 7 = 8$, denn $7 · 8 = 56$."]
],
en: [
  ["Egg boxes", "A box holds 6 eggs. How many eggs are in 7 boxes?", "$7 · 6 = 42$ eggs"],
  ["Rows of chairs", "The hall has 8 rows with 9 chairs each. How many chairs is that?", "$8 · 9 = 72$ chairs"],
  ["Sticker book", "A sticker book has 5 pages with 8 stickers each. How many stickers fit in?", "$5 · 8 = 40$ stickers"],
  ["Sharing sweets", "56 sweets are shared fairly among 7 children. How many does each child get?", "$56 : 7 = 8$, because $7 · 8 = 56$."]
],
es: [
  ["Hueveras", "En una huevera caben 6 huevos. ¿Cuántos huevos hay en 7 hueveras?", "$7 · 6 = 42$ huevos"],
  ["Filas de sillas", "En el salón hay 8 filas de 9 sillas. ¿Cuántas sillas son?", "$8 · 9 = 72$ sillas"],
  ["Álbum de pegatinas", "Un álbum tiene 5 páginas con 8 pegatinas cada una. ¿Cuántas caben?", "$5 · 8 = 40$ pegatinas"],
  ["Repartir caramelos", "Se reparten 56 caramelos a partes iguales entre 7 niños. ¿Cuántos le tocan a cada uno?", "$56 : 7 = 8$, porque $7 · 8 = 56$."]
],
zh: [
  ["鸡蛋盒", "一个盒子装 6 个鸡蛋。7 盒有多少个鸡蛋？", "$7 · 6 = 42$ 个"],
  ["椅子", "礼堂里有 8 排椅子，每排 9 把。一共多少把？", "$8 · 9 = 72$ 把"],
  ["贴纸本", "贴纸本有 5 页，每页 8 张贴纸。一共能贴多少张？", "$5 · 8 = 40$ 张"],
  ["分糖果", "56 颗糖平均分给 7 个孩子。每人几颗？", "$56 : 7 = 8$，因为 $7 · 8 = 56$。"]
],
fr: [
  ["Boîtes d’œufs", "Une boîte contient 6 œufs. Combien d’œufs dans 7 boîtes ?", "$7 · 6 = 42$ œufs"],
  ["Rangées de chaises", "La salle compte 8 rangées de 9 chaises. Combien de chaises ?", "$8 · 9 = 72$ chaises"],
  ["Album d’autocollants", "Un album a 5 pages de 8 autocollants. Combien d’autocollants en tout ?", "$5 · 8 = 40$ autocollants"],
  ["Partager des bonbons", "On partage 56 bonbons équitablement entre 7 enfants. Combien chacun en reçoit-il ?", "$56 : 7 = 8$, car $7 · 8 = 56$."]
],
ru: [
  ["Коробки яиц", "В коробку помещается 6 яиц. Сколько яиц в 7 коробках?", "$7 · 6 = 42$ яйца"],
  ["Ряды стульев", "В зале 8 рядов по 9 стульев. Сколько всего стульев?", "$8 · 9 = 72$ стула"],
  ["Альбом наклеек", "В альбоме 5 страниц по 8 наклеек. Сколько наклеек помещается?", "$5 · 8 = 40$ наклеек"],
  ["Делим конфеты", "56 конфет поровну делят на 7 детей. Сколько получит каждый?", "$56 : 7 = 8$, потому что $7 · 8 = 56$."]
],
ar: [
  ["علب البيض", "تتسع العلبة لـ 6 بيضات. كم بيضة في 7 علب؟", "$7 · 6 = 42$ بيضة"],
  ["صفوف الكراسي", "في القاعة 8 صفوف في كل صف 9 كراسٍ. كم كرسيًا؟", "$8 · 9 = 72$ كرسيًا"],
  ["دفتر الملصقات", "في الدفتر 5 صفحات وفي كل صفحة 8 ملصقات. كم ملصقًا؟", "$5 · 8 = 40$ ملصقًا"],
  ["توزيع الحلوى", "تُوزَّع 56 حبة حلوى بالتساوي على 7 أطفال. كم يأخذ كل طفل؟", "$56 : 7 = 8$، لأن $7 · 8 = 56$."]
],
ja: [
  ["卵のパック", "1 パックに卵が 6 個。7 パックでは何個？", "$7 · 6 = 42$ 個"],
  ["いすの列", "体育館にいすが 9 脚ずつ 8 列ある。全部で何脚？", "$8 · 9 = 72$ 脚"],
  ["シール帳", "シール帳は 5 ページで、1 ページに 8 枚はれる。全部で何枚？", "$5 · 8 = 40$ 枚"],
  ["あめを分ける", "あめ 56 個を 7 人で同じ数ずつ分ける。1 人何個？", "$56 : 7 = 8$（$7 · 8 = 56$ だから）"]
],
pt: [
  ["Caixas de ovos", "Uma caixa leva 6 ovos. Quantos ovos há em 7 caixas?", "$7 · 6 = 42$ ovos"],
  ["Fileiras de cadeiras", "No auditório há 8 fileiras com 9 cadeiras cada. Quantas cadeiras são?", "$8 · 9 = 72$ cadeiras"],
  ["Álbum de figurinhas", "Um álbum tem 5 páginas com 8 figurinhas cada. Quantas cabem?", "$5 · 8 = 40$ figurinhas"],
  ["Dividir balas", "56 balas são divididas igualmente entre 7 crianças. Quantas cada uma recebe?", "$56 : 7 = 8$, porque $7 · 8 = 56$."]
]
}});
