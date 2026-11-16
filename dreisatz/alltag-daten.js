// Alltagsbeispiele für /dreisatz/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Brötchen kaufen", "3 Brötchen kosten 1,20 €. Was kosten 7 Brötchen?", "1 Brötchen: $1,20 € : 3 = 0,40 €$\n7 Brötchen: $0,40 € · 7 = 2,80 €$"],
  ["Maler", "4 Maler streichen eine Schule in 6 Tagen. Wie lange brauchen 3 Maler?", "Antiproportional – weniger Maler brauchen länger.\n1 Maler: $6 · 4 = 24$ Tage\n3 Maler: $24 : 3 = 8$ Tage"],
  ["Radtour", "Mit dem Rad fährst du 15 km in 60 Minuten. Wie weit kommst du in 20 Minuten?", "1 Minute: $15 km : 60 = 0,25 km$\n20 Minuten: $0,25 km · 20 = 5 km$"],
  ["Klassenfahrt", "Der Bus kostet insgesamt 600 €. Wie viel zahlt jedes Kind bei 20 Kindern, wie viel bei 25?", "Antiproportional – mehr Kinder, weniger pro Kind.\n20 Kinder: $600 € : 20 = 30 €$\n25 Kinder: $600 € : 25 = 24 €$"]
],
en: [
  ["Buying rolls", "3 bread rolls cost 1.20 dollars. How much do 7 rolls cost?", "1 roll: $1.20 : 3 = 0.40$ dollars\n7 rolls: $0.40 · 7 = 2.80$ dollars"],
  ["Painters", "4 painters paint a school in 6 days. How long do 3 painters take?", "Inverse proportion – fewer painters take longer.\n1 painter: $6 · 4 = 24$ days\n3 painters: $24 : 3 = 8$ days"],
  ["Bike ride", "You cycle 15 km in 60 minutes. How far do you get in 20 minutes?", "1 minute: $15 km : 60 = 0.25 km$\n20 minutes: $0.25 km · 20 = 5 km$"],
  ["School trip", "The bus costs 600 dollars in total. How much does each child pay with 20 children, and with 25?", "Inverse proportion – more children, less each.\n20 children: $600 : 20 = 30$ dollars\n25 children: $600 : 25 = 24$ dollars"]
],
es: [
  ["Comprar panecillos", "3 panecillos cuestan 1,20 €. ¿Cuánto cuestan 7?", "1 panecillo: $1,20 € : 3 = 0,40 €$\n7 panecillos: $0,40 € · 7 = 2,80 €$"],
  ["Pintores", "4 pintores pintan un colegio en 6 días. ¿Cuánto tardan 3 pintores?", "Proporción inversa: menos pintores tardan más.\n1 pintor: $6 · 4 = 24$ días\n3 pintores: $24 : 3 = 8$ días"],
  ["En bici", "En bici recorres 15 km en 60 minutos. ¿Cuánto recorres en 20 minutos?", "1 minuto: $15 km : 60 = 0,25 km$\n20 minutos: $0,25 km · 20 = 5 km$"],
  ["Excursión", "El autobús cuesta 600 € en total. ¿Cuánto paga cada niño si van 20? ¿Y si van 25?", "Proporción inversa: más niños, menos por niño.\n20 niños: $600 € : 20 = 30 €$\n25 niños: $600 € : 25 = 24 €$"]
],
zh: [
  ["买面包", "3 个面包 1.20 元。7 个面包多少钱？", "1 个：$1.20 : 3 = 0.40$ 元\n7 个：$0.40 · 7 = 2.80$ 元"],
  ["油漆工", "4 个油漆工 6 天刷完一所学校。3 个油漆工要几天？", "反比例：人越少，用时越长。\n1 人：$6 · 4 = 24$ 天\n3 人：$24 : 3 = 8$ 天"],
  ["骑车", "骑车 60 分钟走 15 千米。20 分钟走多远？", "1 分钟：$15 km : 60 = 0.25 km$\n20 分钟：$0.25 km · 20 = 5 km$"],
  ["春游包车", "大巴一共 600 元。20 个孩子每人付多少？25 个呢？", "反比例：人越多，每人越少。\n20 人：$600 : 20 = 30$ 元\n25 人：$600 : 25 = 24$ 元"]
],
fr: [
  ["Acheter des petits pains", "3 petits pains coûtent 1,20 €. Combien coûtent 7 petits pains ?", "1 petit pain : $1,20 € : 3 = 0,40 €$\n7 petits pains : $0,40 € · 7 = 2,80 €$"],
  ["Peintres", "4 peintres peignent une école en 6 jours. Combien de temps faut-il à 3 peintres ?", "Proportionnalité inverse : moins de peintres, plus de temps.\n1 peintre : $6 · 4 = 24$ jours\n3 peintres : $24 : 3 = 8$ jours"],
  ["À vélo", "À vélo, tu fais 15 km en 60 minutes. Quelle distance en 20 minutes ?", "1 minute : $15 km : 60 = 0,25 km$\n20 minutes : $0,25 km · 20 = 5 km$"],
  ["Sortie scolaire", "Le car coûte 600 € en tout. Combien paie chaque enfant s’ils sont 20 ? Et s’ils sont 25 ?", "Proportionnalité inverse : plus d’enfants, moins par enfant.\n20 enfants : $600 € : 20 = 30 €$\n25 enfants : $600 € : 25 = 24 €$"]
],
ru: [
  ["Покупаем булочки", "3 булочки стоят 120 руб. Сколько стоят 7 булочек?", "1 булочка: $120 : 3 = 40$ руб.\n7 булочек: $40 · 7 = 280$ руб."],
  ["Маляры", "4 маляра красят школу за 6 дней. За сколько дней справятся 3 маляра?", "Обратная пропорциональность: меньше маляров – дольше.\n1 маляр: $6 · 4 = 24$ дня\n3 маляра: $24 : 3 = 8$ дней"],
  ["На велосипеде", "На велосипеде ты проезжаешь 15 км за 60 минут. Сколько проедешь за 20 минут?", "1 минута: $15 км : 60 = 0,25 км$\n20 минут: $0,25 км · 20 = 5 км$"],
  ["Экскурсия", "Автобус стоит всего 6000 руб. Сколько платит каждый ребёнок, если их 20? А если 25?", "Обратная пропорциональность: больше детей – меньше с каждого.\n20 детей: $6000 : 20 = 300$ руб.\n25 детей: $6000 : 25 = 240$ руб."]
],
ar: [
  ["شراء الخبز", "3 أرغفة صغيرة ثمنها 1.20 دولار. كم ثمن 7 أرغفة؟", "رغيف واحد: $1.20 : 3 = 0.40$ دولار\n7 أرغفة: $0.40 · 7 = 2.80$ دولار"],
  ["الدهّانون", "4 دهّانين يدهنون مدرسة في 6 أيام. كم يومًا يحتاج 3 دهّانين؟", "تناسب عكسي: عدد أقل يحتاج وقتًا أطول.\nدهّان واحد: $6 · 4 = 24$ يومًا\n3 دهّانين: $24 : 3 = 8$ أيام"],
  ["رحلة بالدراجة", "تقطع بالدراجة 15 كم في 60 دقيقة. كم تقطع في 20 دقيقة؟", "دقيقة واحدة: $15 km : 60 = 0.25 km$\n20 دقيقة: $0.25 km · 20 = 5 km$"],
  ["رحلة مدرسية", "أجرة الحافلة 600 دولار كاملة. كم يدفع كل طفل إذا كانوا 20؟ وإذا كانوا 25؟", "تناسب عكسي: أطفال أكثر، مبلغ أقل لكل طفل.\n20 طفلًا: $600 : 20 = 30$ دولارًا\n25 طفلًا: $600 : 25 = 24$ دولارًا"]
],
ja: [
  ["パンを買う", "パン 3 個で 120 円。7 個ではいくら？", "1 個：$120 : 3 = 40$ 円\n7 個：$40 · 7 = 280$ 円"],
  ["ペンキ屋さん", "4 人で学校を 6 日でぬる。3 人では何日かかる？", "反比例：人数が少ないと日数が増える。\n1 人：$6 · 4 = 24$ 日\n3 人：$24 : 3 = 8$ 日"],
  ["サイクリング", "自転車で 60 分に 15 km 進む。20 分では何 km？", "1 分：$15 km : 60 = 0.25 km$\n20 分：$0.25 km · 20 = 5 km$"],
  ["遠足のバス", "バス代は全部で 60000 円。20 人なら 1 人いくら？25 人なら？", "反比例：人数が多いほど 1 人分は少ない。\n20 人：$60000 : 20 = 3000$ 円\n25 人：$60000 : 25 = 2400$ 円"]
],
pt: [
  ["Comprar pãezinhos", "3 pãezinhos custam 1,20 real. Quanto custam 7?", "1 pãozinho: $1,20 : 3 = 0,40$ real\n7 pãezinhos: $0,40 · 7 = 2,80$ reais"],
  ["Pintores", "4 pintores pintam uma escola em 6 dias. Quanto tempo levam 3 pintores?", "Proporção inversa: menos pintores levam mais tempo.\n1 pintor: $6 · 4 = 24$ dias\n3 pintores: $24 : 3 = 8$ dias"],
  ["De bicicleta", "De bicicleta você percorre 15 km em 60 minutos. Quanto percorre em 20 minutos?", "1 minuto: $15 km : 60 = 0,25 km$\n20 minutos: $0,25 km · 20 = 5 km$"],
  ["Excursão", "O ônibus custa 600 reais no total. Quanto paga cada criança se forem 20? E se forem 25?", "Proporção inversa: mais crianças, menos para cada uma.\n20 crianças: $600 : 20 = 30$ reais\n25 crianças: $600 : 25 = 24$ reais"]
]
}});
