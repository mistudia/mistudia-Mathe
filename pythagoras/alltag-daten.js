// Alltagsbeispiele für /pythagoras/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Leiter an der Wand", "Eine 5 m lange Leiter steht unten 1,5 m von der Wand entfernt. Wie hoch reicht sie?", "$h² = 5² − 1,5²$\n$h² = 25 − 2,25 = 22,75$\n$h ≈ 4,77 m$"],
  ["Fernseher", "Ein Fernseher ist 80 cm breit und 45 cm hoch. Wie lang ist die Bildschirmdiagonale?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91,8 cm$ (etwa 36 Zoll)"],
  ["Abkürzung über die Wiese", "Statt 60 m und dann 80 m an den Wegen entlang läufst du schräg über die Wiese. Wie viel Weg sparst du?", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nGespart: $140 m − 100 m = 40 m$"],
  ["Rampe", "Eine 4 m lange Rampe überwindet 0,5 m Höhe. Wie weit reicht sie über den Boden?", "$b² = 4² − 0,5²$\n$b² = 15,75$\n$b ≈ 3,97 m$"]
],
en: [
  ["Ladder against a wall", "A 5 m ladder stands 1.5 m away from the wall at the bottom. How high does it reach?", "$h² = 5² − 1.5²$\n$h² = 25 − 2.25 = 22.75$\n$h ≈ 4.77 m$"],
  ["Television", "A TV is 80 cm wide and 45 cm high. How long is the screen diagonal?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91.8 cm$ (about 36 inches)"],
  ["Shortcut across the lawn", "Instead of walking 60 m and then 80 m along the paths, you cut diagonally across the lawn. How much do you save?", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nSaved: $140 m − 100 m = 40 m$"],
  ["Ramp", "A 4 m ramp rises 0.5 m. How far does it reach along the ground?", "$b² = 4² − 0.5²$\n$b² = 15.75$\n$b ≈ 3.97 m$"]
],
es: [
  ["Escalera en la pared", "Una escalera de 5 m está apoyada a 1,5 m de la pared. ¿Hasta qué altura llega?", "$h² = 5² − 1,5²$\n$h² = 25 − 2,25 = 22,75$\n$h ≈ 4,77 m$"],
  ["Televisor", "Un televisor mide 80 cm de ancho y 45 cm de alto. ¿Cuánto mide la diagonal?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91,8 cm$ (unas 36 pulgadas)"],
  ["Atajo por el césped", "En vez de andar 60 m y luego 80 m por los caminos, cruzas el césped en diagonal. ¿Cuánto ahorras?", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nAhorras: $140 m − 100 m = 40 m$"],
  ["Rampa", "Una rampa de 4 m salva 0,5 m de altura. ¿Cuánto ocupa en el suelo?", "$b² = 4² − 0,5²$\n$b² = 15,75$\n$b ≈ 3,97 m$"]
],
zh: [
  ["靠墙的梯子", "5 米长的梯子，底端离墙 1.5 米。梯子能够到多高？", "$h² = 5² − 1.5²$\n$h² = 25 − 2.25 = 22.75$\n$h ≈ 4.77 m$"],
  ["电视机", "电视宽 80 厘米、高 45 厘米。屏幕对角线多长？", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91.8 cm$（约 36 英寸）"],
  ["穿过草坪抄近路", "不沿路走 60 米再走 80 米，而是斜穿草坪。能少走多少？", "$d² = 60² + 80² = 10000$\n$d = 100 m$\n少走 $140 m − 100 m = 40 m$"],
  ["斜坡", "4 米长的斜坡升高 0.5 米。它在地面上延伸多远？", "$b² = 4² − 0.5²$\n$b² = 15.75$\n$b ≈ 3.97 m$"]
],
fr: [
  ["Échelle contre un mur", "Une échelle de 5 m est posée à 1,5 m du mur. Jusqu’à quelle hauteur monte-t-elle ?", "$h² = 5² − 1,5²$\n$h² = 25 − 2,25 = 22,75$\n$h ≈ 4,77 m$"],
  ["Télévision", "Une télé mesure 80 cm de large et 45 cm de haut. Quelle est la diagonale de l’écran ?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91,8 cm$ (environ 36 pouces)"],
  ["Raccourci par la pelouse", "Au lieu de marcher 60 m puis 80 m le long des chemins, tu traverses la pelouse en diagonale. Combien gagnes-tu ?", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nGagné : $140 m − 100 m = 40 m$"],
  ["Rampe", "Une rampe de 4 m monte de 0,5 m. Quelle longueur occupe-t-elle au sol ?", "$b² = 4² − 0,5²$\n$b² = 15,75$\n$b ≈ 3,97 m$"]
],
ru: [
  ["Лестница у стены", "Лестница длиной 5 м стоит в 1,5 м от стены. На какую высоту она достаёт?", "$h² = 5² − 1,5²$\n$h² = 25 − 2,25 = 22,75$\n$h ≈ 4,77 м$"],
  ["Телевизор", "Телевизор шириной 80 см и высотой 45 см. Какова диагональ экрана?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91,8 см$ (около 36 дюймов)"],
  ["Срезать через газон", "Вместо 60 м и затем 80 м по дорожкам ты идёшь наискосок через газон. Сколько метров экономишь?", "$d² = 60² + 80² = 10000$\n$d = 100 м$\nЭкономия: $140 м − 100 м = 40 м$"],
  ["Пандус", "Пандус длиной 4 м поднимается на 0,5 м. Какое расстояние он занимает по земле?", "$b² = 4² − 0,5²$\n$b² = 15,75$\n$b ≈ 3,97 м$"]
],
ar: [
  ["سلّم على الحائط", "سلّم طوله 5 م، قاعدته تبعد 1.5 م عن الحائط. إلى أي ارتفاع يصل؟", "$h² = 5² − 1.5²$\n$h² = 25 − 2.25 = 22.75$\n$h ≈ 4.77 m$"],
  ["التلفاز", "عرض التلفاز 80 سم وارتفاعه 45 سم. كم طول قطر الشاشة؟", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91.8 cm$ (نحو 36 بوصة)"],
  ["اختصار عبر العشب", "بدل أن تمشي 60 م ثم 80 م على الممرات، تقطع العشب قطريًا. كم توفّر؟", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nالتوفير: $140 m − 100 m = 40 m$"],
  ["المنحدر", "منحدر طوله 4 م يرتفع 0.5 م. كم يمتد على الأرض؟", "$b² = 4² − 0.5²$\n$b² = 15.75$\n$b ≈ 3.97 m$"]
],
ja: [
  ["かべに立てたはしご", "長さ 5 m のはしごの下はしが、かべから 1.5 m。高さはどこまでとどく？", "$h² = 5² − 1.5²$\n$h² = 25 − 2.25 = 22.75$\n$h ≈ 4.77 m$"],
  ["テレビ", "テレビの横 80 cm、たて 45 cm。画面の対角線は？", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91.8 cm$（約 36 インチ）"],
  ["芝生を近道", "道にそって 60 m、80 m と歩くかわりに芝生をななめに横切る。何 m 近い？", "$d² = 60² + 80² = 10000$\n$d = 100 m$\n近くなる：$140 m − 100 m = 40 m$"],
  ["スロープ", "長さ 4 m のスロープで 0.5 m 上がる。地面ではどれだけの長さ？", "$b² = 4² − 0.5²$\n$b² = 15.75$\n$b ≈ 3.97 m$"]
],
pt: [
  ["Escada na parede", "Uma escada de 5 m está a 1,5 m da parede na base. Até que altura ela alcança?", "$h² = 5² − 1,5²$\n$h² = 25 − 2,25 = 22,75$\n$h ≈ 4,77 m$"],
  ["Televisão", "Uma TV tem 80 cm de largura e 45 cm de altura. Qual é a diagonal da tela?", "$d² = 80² + 45²$\n$d² = 6400 + 2025 = 8425$\n$d ≈ 91,8 cm$ (cerca de 36 polegadas)"],
  ["Atalho pelo gramado", "Em vez de andar 60 m e depois 80 m pelos caminhos, você corta o gramado na diagonal. Quanto economiza?", "$d² = 60² + 80² = 10000$\n$d = 100 m$\nEconomia: $140 m − 100 m = 40 m$"],
  ["Rampa", "Uma rampa de 4 m sobe 0,5 m. Quanto ela ocupa no chão?", "$b² = 4² − 0,5²$\n$b² = 15,75$\n$b ≈ 3,97 m$"]
]
}});
