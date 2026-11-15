// Alltagsbeispiele für /teilbarkeit/, 9 Sprachen. „Ausprobieren“: MS_TEIL.laden({tab, n}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [ { tab: "teiler", n: 24 }, { tab: "regeln", n: 2028 }, { tab: "regeln", n: 471 }, { tab: "teiler", n: 36 }, null, null ],
laden: function(w){ window.MS_TEIL.laden(w); },
daten: {
de: [
  ["Gruppen bilden", "24 Kinder sollen in gleich große Gruppen aufgeteilt werden, niemand bleibt übrig. Welche Gruppengrößen gehen?", "Man braucht die Teiler von 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nAlso z. B. 12 Gruppen zu 2, 8 zu 3, 6 zu 4, 4 zu 6, 3 zu 8 oder 2 zu 12."],
  ["Schaltjahr", "Ein Jahr ist (fast immer) ein Schaltjahr, wenn es durch 4 teilbar ist. Ist 2028 ein Schaltjahr?", "Durch 4 teilbar, wenn die letzten beiden Ziffern durch 4 teilbar sind: $28 : 4 = 7$.\nAlso ist 2028 ein Schaltjahr (Ausnahme: volle Hunderter wie 2100)."],
  ["Gerecht teilen", "Drei Freunde gewinnen zusammen 471 € und wollen gerecht teilen. Geht das ohne Cent-Rest?", "Durch 3 teilbar, wenn die Quersumme durch 3 teilbar ist: $4 + 7 + 1 = 12$ – ja!\n$471 € : 3 = 157 €$ für jeden."],
  ["Zwei Buslinien", "Bus A fährt alle 12 Minuten, Bus B alle 18 Minuten. Um 8:00 Uhr fahren beide gleichzeitig ab. Wann wieder?", "Gesucht ist das kleinste gemeinsame Vielfache: $12 = 2² · 3$, $18 = 2 · 3²$\n$kgV = 2² · 3² = 36$ – also um 8:36 Uhr."],
  ["Fliesen legen", "Ein Boden ist 240 cm lang und 180 cm breit. Er soll mit möglichst großen quadratischen Fliesen belegt werden, ohne eine zu zerschneiden. Wie groß sind die Fliesen?", "Gesucht ist der größte gemeinsame Teiler: $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$ggT = 2² · 3 · 5 = 60$ – Fliesen mit 60 cm Seitenlänge, $4 · 3 = 12$ Stück."],
  ["Wochentag", "Heute ist Montag. Welcher Wochentag ist in 100 Tagen?", "Eine Woche hat 7 Tage. $100 = 14 · 7 + 2$, Rest 2.\nNach 14 ganzen Wochen ist wieder Montag, 2 Tage weiter: Mittwoch."]
],
en: [
  ["Making groups", "24 children are to be split into groups of equal size with nobody left over. Which group sizes work?", "You need the divisors of 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nSo e.g. 12 groups of 2, 8 of 3, 6 of 4, 4 of 6, 3 of 8 or 2 of 12."],
  ["Leap year", "A year is (almost always) a leap year if it is divisible by 4. Is 2028 a leap year?", "Divisible by 4 if the last two digits are divisible by 4: $28 : 4 = 7$.\nSo 2028 is a leap year (exception: whole hundreds like 2100)."],
  ["Sharing fairly", "Three friends win £471 together and want to share it fairly. Does it work without pennies left over?", "Divisible by 3 if the digit sum is divisible by 3: $4 + 7 + 1 = 12$ – yes!\n$£471 : 3 = £157$ each."],
  ["Two bus lines", "Bus A leaves every 12 minutes, bus B every 18 minutes. At 8:00 both leave together. When will they next leave together?", "You need the lowest common multiple: $12 = 2² · 3$, $18 = 2 · 3²$\n$LCM = 2² · 3² = 36$ – so at 8:36."],
  ["Laying tiles", "A floor is 240 cm long and 180 cm wide. It is to be covered with square tiles as large as possible without cutting any. How big are the tiles?", "You need the highest common factor: $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$HCF = 2² · 3 · 5 = 60$ – tiles with 60 cm sides, $4 · 3 = 12$ of them."],
  ["Day of the week", "Today is Monday. What day of the week will it be in 100 days?", "A week has 7 days. $100 = 14 · 7 + 2$, remainder 2.\nAfter 14 whole weeks it is Monday again, 2 days later: Wednesday."]
],
es: [
  ["Hacer grupos", "24 niños deben repartirse en grupos iguales sin que sobre nadie. ¿Qué tamaños de grupo son posibles?", "Hacen falta los divisores de 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nPor ejemplo, 12 grupos de 2, 8 de 3, 6 de 4, 4 de 6, 3 de 8 o 2 de 12."],
  ["Año bisiesto", "Un año es (casi siempre) bisiesto si es divisible entre 4. ¿Es 2028 bisiesto?", "Es divisible entre 4 si sus dos últimas cifras lo son: $28 : 4 = 7$.\nAsí que 2028 es bisiesto (excepción: centenas completas como 2100)."],
  ["Repartir justo", "Tres amigos ganan juntos 471 € y quieren repartirlos por igual. ¿Se puede sin que sobren céntimos?", "Divisible entre 3 si la suma de las cifras lo es: $4 + 7 + 1 = 12$, ¡sí!\n$471 € : 3 = 157 €$ para cada uno."],
  ["Dos líneas de autobús", "El autobús A sale cada 12 minutos y el B cada 18. A las 8:00 salen juntos. ¿Cuándo vuelven a coincidir?", "Se busca el mínimo común múltiplo: $12 = 2² · 3$, $18 = 2 · 3²$\n$mcm = 2² · 3² = 36$, es decir, a las 8:36."],
  ["Poner baldosas", "Un suelo mide 240 cm de largo y 180 cm de ancho. Se quiere cubrir con baldosas cuadradas lo más grandes posible sin cortar ninguna. ¿Qué tamaño tienen?", "Se busca el máximo común divisor: $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$mcd = 2² · 3 · 5 = 60$: baldosas de 60 cm de lado, $4 · 3 = 12$ en total."],
  ["Día de la semana", "Hoy es lunes. ¿Qué día de la semana será dentro de 100 días?", "Una semana tiene 7 días. $100 = 14 · 7 + 2$, resto 2.\nTras 14 semanas completas vuelve a ser lunes; 2 días más: miércoles."]
],
zh: [
  ["分组", "24 个孩子要分成人数相等的小组，不能有人多出来。每组可以有几个人？", "需要 24 的因数：$1, 2, 3, 4, 6, 8, 12, 24$。\n例如 12 组每组 2 人、8 组每组 3 人、6 组每组 4 人、4 组每组 6 人、3 组每组 8 人或 2 组每组 12 人。"],
  ["闰年", "一个年份（几乎总是）能被 4 整除就是闰年。2028 年是闰年吗？", "末两位能被 4 整除，这个数就能被 4 整除：$28 : 4 = 7$。\n所以 2028 年是闰年（例外：整百年如 2100 年）。"],
  ["平均分", "三个朋友一起赢了 471 元，想平均分。能不能分得没有零头？", "各位数字之和能被 3 整除，这个数就能被 3 整除：$4 + 7 + 1 = 12$——能！\n$471 : 3 = 157$，每人 157 元。"],
  ["两路公交车", "A 路车每 12 分钟一班，B 路车每 18 分钟一班。8:00 两车同时发车。下一次同时发车是什么时候？", "求最小公倍数：$12 = 2² · 3$，$18 = 2 · 3²$\n最小公倍数 $= 2² · 3² = 36$——所以是 8:36。"],
  ["铺瓷砖", "地面长 240 cm、宽 180 cm，要铺尽可能大的正方形瓷砖，而且一块都不切。瓷砖边长是多少？", "求最大公因数：$240 = 2⁴ · 3 · 5$，$180 = 2² · 3² · 5$\n最大公因数 $= 2² · 3 · 5 = 60$——边长 60 cm 的瓷砖，共 $4 · 3 = 12$ 块。"],
  ["星期几", "今天是星期一。100 天后是星期几？", "一周有 7 天。$100 = 14 · 7 + 2$，余 2。\n过了 14 整周又是星期一，再过 2 天：星期三。"]
],
fr: [
  ["Faire des groupes", "24 enfants doivent être répartis en groupes de même taille, sans qu’il en reste. Quelles tailles de groupes sont possibles ?", "Il faut les diviseurs de 24 : $1, 2, 3, 4, 6, 8, 12, 24$.\nPar exemple 12 groupes de 2, 8 de 3, 6 de 4, 4 de 6, 3 de 8 ou 2 de 12."],
  ["Année bissextile", "Une année est (presque toujours) bissextile si elle est divisible par 4. 2028 est-elle bissextile ?", "Divisible par 4 si le nombre formé par les deux derniers chiffres l’est : $28 : 4 = 7$.\nDonc 2028 est bissextile (exception : les centaines entières comme 2100)."],
  ["Partager équitablement", "Trois amis gagnent ensemble 471 € et veulent partager équitablement. Est-ce possible sans reste en centimes ?", "Divisible par 3 si la somme des chiffres l’est : $4 + 7 + 1 = 12$ : oui !\n$471 € : 3 = 157 €$ chacun."],
  ["Deux lignes de bus", "Le bus A passe toutes les 12 minutes, le bus B toutes les 18 minutes. À 8 h 00 ils partent ensemble. Quand repartent-ils ensemble ?", "On cherche le plus petit multiple commun : $12 = 2² · 3$, $18 = 2 · 3²$\n$PPCM = 2² · 3² = 36$ : donc à 8 h 36."],
  ["Poser du carrelage", "Un sol mesure 240 cm sur 180 cm. On veut le couvrir de carreaux carrés les plus grands possible, sans en couper. Quelle taille ont-ils ?", "On cherche le plus grand diviseur commun : $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$PGCD = 2² · 3 · 5 = 60$ : carreaux de 60 cm de côté, $4 · 3 = 12$ carreaux."],
  ["Jour de la semaine", "Aujourd’hui c’est lundi. Quel jour sera-t-on dans 100 jours ?", "Une semaine a 7 jours. $100 = 14 · 7 + 2$, reste 2.\nAprès 14 semaines entières on est de nouveau lundi, 2 jours plus tard : mercredi."]
],
ru: [
  ["Делим на группы", "24 ребёнка нужно разделить на одинаковые группы так, чтобы никто не остался. Какие размеры групп возможны?", "Нужны делители числа 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nНапример, 12 групп по 2, 8 по 3, 6 по 4, 4 по 6, 3 по 8 или 2 по 12."],
  ["Високосный год", "Год (почти всегда) високосный, если делится на 4. Високосный ли 2028 год?", "Число делится на 4, если на 4 делится число из двух последних цифр: $28 : 4 = 7$.\nЗначит, 2028 – високосный (исключение: круглые сотни, например 2100)."],
  ["Поделить поровну", "Трое друзей вместе выиграли 471 € и хотят поделить поровну. Получится без остатка в центах?", "Число делится на 3, если сумма цифр делится на 3: $4 + 7 + 1 = 12$ – да!\n$471 € : 3 = 157 €$ каждому."],
  ["Два автобуса", "Автобус A ходит каждые 12 минут, автобус B – каждые 18 минут. В 8:00 они отправились вместе. Когда снова отправятся вместе?", "Ищем наименьшее общее кратное: $12 = 2² · 3$, $18 = 2 · 3²$\n$НОК = 2² · 3² = 36$ – значит, в 8:36."],
  ["Укладка плитки", "Пол длиной 240 см и шириной 180 см нужно выложить как можно более крупной квадратной плиткой, ничего не разрезая. Какого размера плитка?", "Ищем наибольший общий делитель: $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$НОД = 2² · 3 · 5 = 60$ – плитка со стороной 60 см, $4 · 3 = 12$ штук."],
  ["День недели", "Сегодня понедельник. Какой день недели будет через 100 дней?", "В неделе 7 дней. $100 = 14 · 7 + 2$, остаток 2.\nЧерез 14 полных недель снова понедельник, ещё 2 дня – среда."]
],
ar: [
  ["تكوين مجموعات", "يجب تقسيم 24 طفلًا إلى مجموعات متساوية دون أن يبقى أحد. ما أحجام المجموعات الممكنة؟", "نحتاج قواسم 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nمثلًا 12 مجموعة من 2، أو 8 من 3، أو 6 من 4، أو 4 من 6، أو 3 من 8، أو 2 من 12."],
  ["السنة الكبيسة", "تكون السنة (غالبًا) كبيسة إذا قبلت القسمة على 4. هل 2028 سنة كبيسة؟", "يقبل العدد القسمة على 4 إذا قبله العدد المكوّن من آخر رقمين: $28 : 4 = 7$.\nإذن 2028 سنة كبيسة (الاستثناء: المئات الكاملة مثل 2100)."],
  ["القسمة بالعدل", "ربح ثلاثة أصدقاء معًا 471 € ويريدون تقسيمها بالتساوي. هل يمكن ذلك دون باقٍ من السنتات؟", "يقبل العدد القسمة على 3 إذا قبلها مجموع أرقامه: $4 + 7 + 1 = 12$ – نعم!\n$471 € : 3 = 157 €$ لكل واحد."],
  ["خطّا حافلات", "تنطلق الحافلة A كل 12 دقيقة والحافلة B كل 18 دقيقة. في الساعة 8:00 انطلقتا معًا. متى تنطلقان معًا مرة أخرى؟", "نبحث عن المضاعف المشترك الأصغر: $12 = 2² · 3$، $18 = 2 · 3²$\n$2² · 3² = 36$ – أي في الساعة 8:36."],
  ["تبليط أرضية", "أرضية طولها 240 cm وعرضها 180 cm. نريد تبليطها بأكبر بلاط مربع ممكن دون قص أي بلاطة. ما مقاس البلاط؟", "نبحث عن القاسم المشترك الأكبر: $240 = 2⁴ · 3 · 5$، $180 = 2² · 3² · 5$\n$2² · 3 · 5 = 60$ – بلاط ضلعه 60 cm، وعدده $4 · 3 = 12$."],
  ["يوم الأسبوع", "اليوم هو الاثنين. أي يوم سيكون بعد 100 يوم؟", "في الأسبوع 7 أيام. $100 = 14 · 7 + 2$، الباقي 2.\nبعد 14 أسبوعًا كاملًا يعود الاثنين، وبعد يومين آخرين: الأربعاء."]
],
ja: [
  ["グループ分け", "24 人を同じ人数のグループに分けたい。余る人がいないようにするには、1 グループ何人にできる？", "24 の約数を使う：$1, 2, 3, 4, 6, 8, 12, 24$。\nたとえば 2 人ずつ 12 組、3 人ずつ 8 組、4 人ずつ 6 組、6 人ずつ 4 組、8 人ずつ 3 組、12 人ずつ 2 組。"],
  ["うるう年", "4 でわり切れる年は（ほとんどの場合）うるう年。2028 年はうるう年？", "下 2 けたが 4 でわり切れれば 4 の倍数：$28 : 4 = 7$。\nだから 2028 年はうるう年（例外：2100 年のようなちょうど 100 の倍数の年）。"],
  ["公平に分ける", "3 人で 471 円を公平に分けたい。1 円も余らずに分けられる？", "各位の数の和が 3 でわり切れれば 3 の倍数：$4 + 7 + 1 = 12$――分けられる！\n$471 : 3 = 157$、1 人 157 円。"],
  ["2 つのバス", "A のバスは 12 分おき、B のバスは 18 分おきに出る。8:00 に同時に出発した。次に同時に出るのは？", "最小公倍数を求める：$12 = 2² · 3$、$18 = 2 · 3²$\n最小公倍数 $= 2² · 3² = 36$――つまり 8:36。"],
  ["タイルをしく", "縦 240 cm、横 180 cm の床に、切らずにできるだけ大きい正方形のタイルをしきつめたい。タイルの 1 辺は？", "最大公約数を求める：$240 = 2⁴ · 3 · 5$、$180 = 2² · 3² · 5$\n最大公約数 $= 2² · 3 · 5 = 60$――1 辺 60 cm のタイルを $4 · 3 = 12$ 枚。"],
  ["曜日", "今日は月曜日。100 日後は何曜日？", "1 週間は 7 日。$100 = 14 · 7 + 2$、あまり 2。\n14 週間後はまた月曜日、さらに 2 日後で水曜日。"]
],
pt: [
  ["Fazer grupos", "24 crianças vão ser divididas em grupos iguais, sem sobrar ninguém. Que tamanhos de grupo são possíveis?", "São precisos os divisores de 24: $1, 2, 3, 4, 6, 8, 12, 24$.\nPor exemplo, 12 grupos de 2, 8 de 3, 6 de 4, 4 de 6, 3 de 8 ou 2 de 12."],
  ["Ano bissexto", "Um ano é (quase sempre) bissexto se for divisível por 4. 2028 é bissexto?", "É divisível por 4 se o número formado pelos dois últimos algarismos o for: $28 : 4 = 7$.\nPortanto 2028 é bissexto (exceção: centenas inteiras como 2100)."],
  ["Dividir com justiça", "Três amigos ganham juntos 471 € e querem dividir igualmente. Dá sem sobrar cêntimos?", "Divisível por 3 se a soma dos algarismos o for: $4 + 7 + 1 = 12$ – sim!\n$471 € : 3 = 157 €$ para cada um."],
  ["Duas linhas de autocarro", "O autocarro A parte de 12 em 12 minutos e o B de 18 em 18. Às 8:00 partem juntos. Quando voltam a partir juntos?", "Procura-se o mínimo múltiplo comum: $12 = 2² · 3$, $18 = 2 · 3²$\n$mmc = 2² · 3² = 36$ – ou seja, às 8:36."],
  ["Pôr azulejos", "Um chão tem 240 cm por 180 cm. Quer-se cobri-lo com azulejos quadrados o maior possível, sem cortar nenhum. Que tamanho têm?", "Procura-se o máximo divisor comum: $240 = 2⁴ · 3 · 5$, $180 = 2² · 3² · 5$\n$mdc = 2² · 3 · 5 = 60$ – azulejos de 60 cm de lado, $4 · 3 = 12$ no total."],
  ["Dia da semana", "Hoje é segunda-feira. Que dia da semana será daqui a 100 dias?", "Uma semana tem 7 dias. $100 = 14 · 7 + 2$, resto 2.\nDepois de 14 semanas completas volta a ser segunda; mais 2 dias: quarta-feira."]
]
}});
