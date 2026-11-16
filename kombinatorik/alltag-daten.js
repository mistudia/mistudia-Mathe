// Alltagsbeispiele für /kombinatorik/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Outfits", "Du hast 4 T-Shirts und 3 Hosen. Wie viele verschiedene Outfits kannst du anziehen?", "Jedes T-Shirt mit jeder Hose:\n$4 · 3 = 12$ Outfits"],
  ["Siegertreppchen", "8 Läuferinnen starten. Wie viele Möglichkeiten gibt es für Platz 1, 2 und 3?", "Reihenfolge zählt, keine doppelt:\n$8 · 7 · 6 = 336$"],
  ["Zahlenschloss", "Ein Fahrradschloss hat 4 Rädchen mit den Ziffern 0 bis 9. Wie viele Codes gibt es?", "Jede Ziffer darf mehrmals vorkommen:\n$10⁴ = 10000$ Codes"],
  ["Kinokarten", "Von 5 Freunden dürfen 2 mit ins Kino. Wie viele verschiedene Paare gibt es?", "Reihenfolge egal:\n$(5 über 2) = 5 · 4 : 2 = 10$ Paare"]
],
en: [
  ["Outfits", "You have 4 T-shirts and 3 pairs of trousers. How many different outfits can you wear?", "Every T-shirt with every pair:\n$4 · 3 = 12$ outfits"],
  ["Podium", "8 runners start. How many possibilities are there for 1st, 2nd and 3rd place?", "Order matters, no repeats:\n$8 · 7 · 6 = 336$"],
  ["Combination lock", "A bike lock has 4 wheels with the digits 0 to 9. How many codes are there?", "Each digit may appear several times:\n$10⁴ = 10000$ codes"],
  ["Cinema tickets", "2 of 5 friends may come to the cinema. How many different pairs are there?", "Order does not matter:\n$(5 choose 2) = 5 · 4 : 2 = 10$ pairs"]
],
es: [
  ["Conjuntos", "Tienes 4 camisetas y 3 pantalones. ¿Cuántos conjuntos distintos puedes ponerte?", "Cada camiseta con cada pantalón:\n$4 · 3 = 12$ conjuntos"],
  ["Podio", "Salen 8 corredoras. ¿Cuántas posibilidades hay para el 1.º, 2.º y 3.er puesto?", "Importa el orden, sin repetir:\n$8 · 7 · 6 = 336$"],
  ["Candado de números", "Un candado de bici tiene 4 ruedas con las cifras 0 a 9. ¿Cuántos códigos hay?", "Cada cifra puede repetirse:\n$10⁴ = 10000$ códigos"],
  ["Entradas de cine", "De 5 amigos, 2 pueden ir al cine. ¿Cuántas parejas distintas hay?", "No importa el orden:\n$(5 sobre 2) = 5 · 4 : 2 = 10$ parejas"]
],
zh: [
  ["搭配衣服", "你有 4 件 T 恤和 3 条裤子。能搭配出多少种穿法？", "每件 T 恤配每条裤子：\n$4 · 3 = 12$ 种"],
  ["领奖台", "8 名选手赛跑。第 1、2、3 名有多少种可能？", "有顺序、不重复：\n$8 · 7 · 6 = 336$"],
  ["密码锁", "自行车锁有 4 个转轮，每个是 0–9。一共有多少种密码？", "每个数字可以重复：\n$10⁴ = 10000$ 种"],
  ["电影票", "5 个朋友中有 2 个可以去看电影。有多少种不同的两人组合？", "与顺序无关：\n$C(5, 2) = 5 · 4 : 2 = 10$ 种"]
],
fr: [
  ["Tenues", "Tu as 4 t-shirts et 3 pantalons. Combien de tenues différentes peux-tu porter ?", "Chaque t-shirt avec chaque pantalon :\n$4 · 3 = 12$ tenues"],
  ["Podium", "8 coureuses prennent le départ. Combien de possibilités pour les places 1, 2 et 3 ?", "L’ordre compte, sans répétition :\n$8 · 7 · 6 = 336$"],
  ["Cadenas à code", "Un cadenas de vélo a 4 molettes avec les chiffres 0 à 9. Combien de codes ?", "Chaque chiffre peut se répéter :\n$10⁴ = 10000$ codes"],
  ["Places de cinéma", "Parmi 5 amis, 2 peuvent aller au cinéma. Combien de paires différentes ?", "L’ordre ne compte pas :\n$(5 parmi 2) = 5 · 4 : 2 = 10$ paires"]
],
ru: [
  ["Наряды", "У тебя 4 футболки и 3 пары брюк. Сколько разных нарядов можно составить?", "Каждая футболка с каждыми брюками:\n$4 · 3 = 12$ нарядов"],
  ["Пьедестал", "Стартуют 8 бегуний. Сколько вариантов для 1-го, 2-го и 3-го места?", "Порядок важен, без повторов:\n$8 · 7 · 6 = 336$"],
  ["Кодовый замок", "У велозамка 4 колёсика с цифрами от 0 до 9. Сколько всего кодов?", "Цифры могут повторяться:\n$10⁴ = 10000$ кодов"],
  ["Билеты в кино", "Из 5 друзей 2 могут пойти в кино. Сколько разных пар?", "Порядок не важен:\n$C(5, 2) = 5 · 4 : 2 = 10$ пар"]
],
ar: [
  ["الملابس", "عندك 4 قمصان و 3 سراويل. كم طقمًا مختلفًا يمكنك ارتداؤه؟", "كل قميص مع كل سروال:\n$4 · 3 = 12$ طقمًا"],
  ["منصة التتويج", "تشارك 8 عدّاءات. كم احتمالًا للمراكز الأول والثاني والثالث؟", "الترتيب مهم ودون تكرار:\n$8 · 7 · 6 = 336$"],
  ["قفل الأرقام", "لقفل الدراجة 4 عجلات عليها الأرقام من 0 إلى 9. كم رمزًا ممكنًا؟", "يمكن تكرار كل رقم:\n$10⁴ = 10000$ رمز"],
  ["تذاكر السينما", "من بين 5 أصدقاء يذهب اثنان إلى السينما. كم زوجًا مختلفًا؟", "الترتيب غير مهم:\n$C(5, 2) = 5 · 4 : 2 = 10$ أزواج"]
],
ja: [
  ["服の組み合わせ", "T シャツ 4 枚とズボン 3 本。組み合わせは何通り？", "どの T シャツもどのズボンと合わせられる：\n$4 · 3 = 12$ 通り"],
  ["表彰台", "8 人が走る。1 位・2 位・3 位の決まり方は何通り？", "順番あり、重複なし：\n$8 · 7 · 6 = 336$"],
  ["ダイヤル錠", "自転車の鍵は 0〜9 のダイヤルが 4 つ。番号は何通り？", "同じ数字をくり返してよい：\n$10⁴ = 10000$ 通り"],
  ["映画のチケット", "5 人の友だちのうち 2 人が映画に行ける。2 人の組は何通り？", "順番は関係ない：\n$₅C₂ = 5 · 4 : 2 = 10$ 通り"]
],
pt: [
  ["Roupas", "Você tem 4 camisetas e 3 calças. Quantas combinações diferentes pode vestir?", "Cada camiseta com cada calça:\n$4 · 3 = 12$ combinações"],
  ["Pódio", "Largam 8 corredoras. Quantas possibilidades há para 1.º, 2.º e 3.º lugar?", "A ordem importa, sem repetir:\n$8 · 7 · 6 = 336$"],
  ["Cadeado de números", "Um cadeado de bicicleta tem 4 rodinhas com os dígitos de 0 a 9. Quantos códigos existem?", "Cada dígito pode se repetir:\n$10⁴ = 10000$ códigos"],
  ["Ingressos de cinema", "De 5 amigos, 2 podem ir ao cinema. Quantas duplas diferentes existem?", "A ordem não importa:\n$C(5, 2) = 5 · 4 : 2 = 10$ duplas"]
]
}});
