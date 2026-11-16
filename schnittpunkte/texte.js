// Texte für „Schnittpunkte“ (schnittpunkte/app.js) in 9 Sprachen.
var SN = {
de: {
  titel: "Schnittpunkte von Graphen", tab_rechnen: "Rechnen", tab_ueben: "Üben",
  art_gg: "Gerade und Gerade", art_pg: "Parabel und Gerade", art_pp: "Parabel und Parabel",
  rechnen: "Berechnen", fehler: "Das verstehe ich nicht – Beispiel: x^2 − 2x − 3", fehlerGrad: "Bitte nur Geraden und Parabeln (höchstens x²).",
  s_gleich: "Gleichsetzen:", s_seite: "Alles auf eine Seite bringen:", s_loesen: "Gleichung lösen:", s_y: "y-Wert: x in g(x) einsetzen:", s_erg: "Ergebnis:",
  n0: "Kein Schnittpunkt.", n1: "Ein gemeinsamer Punkt.", n2: "Zwei Schnittpunkte.", nInf: "Die Graphen sind gleich – alle Punkte sind gemeinsam.",
  parallel: "Die Geraden sind parallel (gleiche Steigung).", sekante: "Die Gerade ist eine Sekante (schneidet die Parabel zweimal).", tangente: "Die Gerade ist eine Tangente (berührt die Parabel in einem Punkt).", passante: "Die Gerade ist eine Passante (geht an der Parabel vorbei).", beruehr: "Die Parabeln berühren sich in einem Punkt.",
  merke: "Schnittpunkte: f(x) = g(x) setzen, alles auf eine Seite bringen und die Gleichung lösen. Die x-Werte in eine der beiden Funktionen einsetzen ergibt die y-Werte. Bei Parabel und Gerade entscheidet die Diskriminante: D > 0 zwei, D = 0 einer, D < 0 keiner.",
  u_auftrag: "Berechne die Schnittpunkte der Graphen von f und g.", u_wie: "Wie viele Schnittpunkte gibt es?", u_pkt: "Schnittpunkt", pruefen: "Prüfen", weiterA: "Nächste Aufgabe", punkte: "{p} von {n} richtig",
  richtig: "Richtig!", nochmal: "Noch nicht richtig – versuch es noch einmal.", falsch: "Leider nicht. Die Lösung:", eingabeFehlt: "Bitte alle Felder ausfüllen."
},
en: {
  titel: "Intersection points of graphs", tab_rechnen: "Calculate", tab_ueben: "Practice",
  art_gg: "Line and line", art_pg: "Parabola and line", art_pp: "Parabola and parabola",
  rechnen: "Calculate", fehler: "I don’t understand that – example: x^2 − 2x − 3", fehlerGrad: "Only lines and parabolas please (at most x²).",
  s_gleich: "Set equal:", s_seite: "Bring everything to one side:", s_loesen: "Solve the equation:", s_y: "y-value: substitute x into g(x):", s_erg: "Result:",
  n0: "No intersection point.", n1: "One common point.", n2: "Two intersection points.", nInf: "The graphs are the same – all points are common.",
  parallel: "The lines are parallel (same slope).", sekante: "The line is a secant (cuts the parabola twice).", tangente: "The line is a tangent (touches the parabola at one point).", passante: "The line misses the parabola.", beruehr: "The parabolas touch at one point.",
  merke: "Intersection points: set f(x) = g(x), bring everything to one side and solve. Substituting the x-values into one of the functions gives the y-values. For a parabola and a line, the discriminant decides: D > 0 two, D = 0 one, D < 0 none.",
  u_auftrag: "Find the intersection points of the graphs of f and g.", u_wie: "How many intersection points are there?", u_pkt: "Intersection point", pruefen: "Check", weiterA: "Next exercise", punkte: "{p} of {n} correct",
  richtig: "Correct!", nochmal: "Not quite – try once more.", falsch: "Not quite. The solution:", eingabeFehlt: "Please fill in all fields."
},
es: {
  titel: "Puntos de intersección de gráficas", tab_rechnen: "Calcular", tab_ueben: "Practicar",
  art_gg: "Recta y recta", art_pg: "Parábola y recta", art_pp: "Parábola y parábola",
  rechnen: "Calcular", fehler: "No lo entiendo – ejemplo: x^2 − 2x − 3", fehlerGrad: "Solo rectas y parábolas (como mucho x²).",
  s_gleich: "Igualar:", s_seite: "Pasar todo a un lado:", s_loesen: "Resolver la ecuación:", s_y: "Valor de y: sustituir x en g(x):", s_erg: "Resultado:",
  n0: "Ningún punto de intersección.", n1: "Un punto en común.", n2: "Dos puntos de intersección.", nInf: "Las gráficas son iguales: todos los puntos son comunes.",
  parallel: "Las rectas son paralelas (misma pendiente).", sekante: "La recta es secante (corta la parábola dos veces).", tangente: "La recta es tangente (toca la parábola en un punto).", passante: "La recta es exterior (no toca la parábola).", beruehr: "Las parábolas se tocan en un punto.",
  merke: "Puntos de intersección: iguala f(x) = g(x), pasa todo a un lado y resuelve. Sustituyendo los valores de x en una de las funciones obtienes los valores de y. Con parábola y recta decide el discriminante: D > 0 dos, D = 0 uno, D < 0 ninguno.",
  u_auftrag: "Calcula los puntos de intersección de las gráficas de f y g.", u_wie: "¿Cuántos puntos de intersección hay?", u_pkt: "Punto de intersección", pruefen: "Comprobar", weiterA: "Siguiente ejercicio", punkte: "{p} de {n} correctas",
  richtig: "¡Correcto!", nochmal: "Todavía no – inténtalo otra vez.", falsch: "No. La solución:", eingabeFehlt: "Rellena todos los campos."
},
zh: {
  titel: "图像的交点", tab_rechnen: "计算", tab_ueben: "练习",
  art_gg: "直线与直线", art_pg: "抛物线与直线", art_pp: "抛物线与抛物线",
  rechnen: "计算", fehler: "看不懂——例如：x^2 − 2x − 3", fehlerGrad: "只能输入直线和抛物线（最高 x²）。",
  s_gleich: "令两式相等：", s_seite: "移到一边：", s_loesen: "解方程：", s_y: "求 y：把 x 代入 g(x)：", s_erg: "结果：",
  n0: "没有交点。", n1: "一个公共点。", n2: "两个交点。", nInf: "两个图像相同——所有点都是公共点。",
  parallel: "两直线平行（斜率相同）。", sekante: "直线与抛物线相交于两点（割线）。", tangente: "直线与抛物线相切于一点（切线）。", passante: "直线与抛物线没有公共点（相离）。", beruehr: "两条抛物线相切于一点。",
  merke: "求交点：令 f(x) = g(x)，移项后解方程。把 x 代入其中一个函数得到 y。抛物线与直线由判别式决定：D > 0 两个，D = 0 一个，D < 0 没有。",
  u_auftrag: "求 f 和 g 图像的交点。", u_wie: "有几个交点？", u_pkt: "交点", pruefen: "检查", weiterA: "下一题", punkte: "答对 {p} / {n}",
  richtig: "对了！", nochmal: "还不对——再试一次。", falsch: "不对。答案：", eingabeFehlt: "请填写所有空格。"
},
fr: {
  titel: "Points d’intersection de courbes", tab_rechnen: "Calculer", tab_ueben: "S’entraîner",
  art_gg: "Droite et droite", art_pg: "Parabole et droite", art_pp: "Parabole et parabole",
  rechnen: "Calculer", fehler: "Je ne comprends pas – exemple : x^2 − 2x − 3", fehlerGrad: "Seulement des droites et des paraboles (au plus x²).",
  s_gleich: "Égaler :", s_seite: "Tout passer d’un côté :", s_loesen: "Résoudre l’équation :", s_y: "Valeur de y : remplacer x dans g(x) :", s_erg: "Résultat :",
  n0: "Aucun point d’intersection.", n1: "Un point commun.", n2: "Deux points d’intersection.", nInf: "Les courbes sont identiques – tous les points sont communs.",
  parallel: "Les droites sont parallèles (même pente).", sekante: "La droite est sécante (coupe la parabole deux fois).", tangente: "La droite est tangente (touche la parabole en un point).", passante: "La droite ne rencontre pas la parabole.", beruehr: "Les paraboles se touchent en un point.",
  merke: "Points d’intersection : poser f(x) = g(x), tout passer d’un côté et résoudre. En remplaçant les valeurs de x dans une des fonctions, on obtient les y. Pour une parabole et une droite, le discriminant décide : Δ > 0 deux, Δ = 0 un, Δ < 0 aucun.",
  u_auftrag: "Calcule les points d’intersection des courbes de f et g.", u_wie: "Combien de points d’intersection y a-t-il ?", u_pkt: "Point d’intersection", pruefen: "Vérifier", weiterA: "Exercice suivant", punkte: "{p} sur {n} justes",
  richtig: "Juste !", nochmal: "Pas encore – essaie encore une fois.", falsch: "Non. La solution :", eingabeFehlt: "Remplis tous les champs."
},
ru: {
  titel: "Точки пересечения графиков", tab_rechnen: "Вычислить", tab_ueben: "Упражнения",
  art_gg: "Прямая и прямая", art_pg: "Парабола и прямая", art_pp: "Парабола и парабола",
  rechnen: "Вычислить", fehler: "Не понимаю – пример: x^2 − 2x − 3", fehlerGrad: "Только прямые и параболы (не выше x²).",
  s_gleich: "Приравниваем:", s_seite: "Переносим всё в одну сторону:", s_loesen: "Решаем уравнение:", s_y: "Значение y: подставляем x в g(x):", s_erg: "Ответ:",
  n0: "Точек пересечения нет.", n1: "Одна общая точка.", n2: "Две точки пересечения.", nInf: "Графики совпадают – все точки общие.",
  parallel: "Прямые параллельны (одинаковый наклон).", sekante: "Прямая – секущая (пересекает параболу дважды).", tangente: "Прямая – касательная (касается параболы в одной точке).", passante: "Прямая не пересекает параболу.", beruehr: "Параболы касаются в одной точке.",
  merke: "Точки пересечения: приравнять f(x) = g(x), перенести всё в одну сторону и решить. Подставив x в одну из функций, получаем y. Для параболы и прямой решает дискриминант: D > 0 – две, D = 0 – одна, D < 0 – ни одной.",
  u_auftrag: "Найди точки пересечения графиков f и g.", u_wie: "Сколько точек пересечения?", u_pkt: "Точка пересечения", pruefen: "Проверить", weiterA: "Следующее задание", punkte: "{p} из {n} верно",
  richtig: "Верно!", nochmal: "Пока неверно – попробуй ещё раз.", falsch: "Неверно. Решение:", eingabeFehlt: "Заполни все поля."
},
ar: {
  titel: "نقاط تقاطع المنحنيات", tab_rechnen: "حساب", tab_ueben: "تمرين",
  art_gg: "مستقيم ومستقيم", art_pg: "قطع مكافئ ومستقيم", art_pp: "قطع مكافئ وقطع مكافئ",
  rechnen: "احسب", fehler: "لم أفهم – مثال: x^2 − 2x − 3", fehlerGrad: "مستقيمات وقطوع مكافئة فقط (حتى x²).",
  s_gleich: "المساواة:", s_seite: "نقل كل الحدود إلى طرف واحد:", s_loesen: "حل المعادلة:", s_y: "قيمة y: نعوض x في g(x):", s_erg: "النتيجة:",
  n0: "لا توجد نقطة تقاطع.", n1: "نقطة مشتركة واحدة.", n2: "نقطتا تقاطع.", nInf: "المنحنيان متطابقان – كل النقاط مشتركة.",
  parallel: "المستقيمان متوازيان (الميل نفسه).", sekante: "المستقيم قاطع (يقطع القطع المكافئ مرتين).", tangente: "المستقيم مماس (يمس القطع المكافئ في نقطة).", passante: "المستقيم لا يلاقي القطع المكافئ.", beruehr: "القطعان المكافئان يتماسان في نقطة.",
  merke: "نقاط التقاطع: نضع f(x) = g(x)، ننقل كل الحدود إلى طرف واحد ونحل. بتعويض قيم x في إحدى الدالتين نحصل على y. للقطع المكافئ والمستقيم يقرر المميّز: D > 0 نقطتان، D = 0 نقطة، D < 0 لا شيء.",
  u_auftrag: "أوجد نقاط تقاطع منحنيي f وg.", u_wie: "كم عدد نقاط التقاطع؟", u_pkt: "نقطة التقاطع", pruefen: "تحقق", weiterA: "التمرين التالي", punkte: "{p} من {n} صحيحة",
  richtig: "صحيح!", nochmal: "ليس بعد – حاول مرة أخرى.", falsch: "خطأ. الحل:", eingabeFehlt: "املأ كل الحقول."
},
ja: {
  titel: "グラフの交点", tab_rechnen: "計算", tab_ueben: "練習",
  art_gg: "直線と直線", art_pg: "放物線と直線", art_pp: "放物線と放物線",
  rechnen: "計算する", fehler: "読めません――例：x^2 − 2x − 3", fehlerGrad: "直線と放物線だけ（x² まで）にしてください。",
  s_gleich: "等しいとおく：", s_seite: "左辺にまとめる：", s_loesen: "方程式を解く：", s_y: "y の値：x を g(x) に代入：", s_erg: "答え：",
  n0: "交点はありません。", n1: "共有点は 1 つ。", n2: "交点は 2 つ。", nInf: "2 つのグラフは同じ――すべての点が共有点。",
  parallel: "2 直線は平行（傾きが同じ）。", sekante: "直線は放物線と 2 点で交わる。", tangente: "直線は放物線に接する（接線）。", passante: "直線は放物線と交わらない。", beruehr: "2 つの放物線は 1 点で接する。",
  merke: "交点：f(x) = g(x) とおき、左辺にまとめて解く。x の値をどちらかの式に代入すると y が求まる。放物線と直線では判別式で決まる：D > 0 なら 2 つ、D = 0 なら 1 つ、D < 0 なら 0。",
  u_auftrag: "f と g のグラフの交点を求めよう。", u_wie: "交点はいくつ？", u_pkt: "交点", pruefen: "確かめる", weiterA: "次の問題", punkte: "{n} 問中 {p} 問正解",
  richtig: "正解！", nochmal: "まだちがうよ――もう一度。", falsch: "ざんねん。答え：", eingabeFehlt: "すべてのらんを入力してね。"
},
pt: {
  titel: "Pontos de interseção de gráficos", tab_rechnen: "Calcular", tab_ueben: "Praticar",
  art_gg: "Reta e reta", art_pg: "Parábola e reta", art_pp: "Parábola e parábola",
  rechnen: "Calcular", fehler: "Não entendi – exemplo: x^2 − 2x − 3", fehlerGrad: "Só retas e parábolas (no máximo x²).",
  s_gleich: "Igualar:", s_seite: "Passar tudo para um lado:", s_loesen: "Resolver a equação:", s_y: "Valor de y: substituir x em g(x):", s_erg: "Resultado:",
  n0: "Nenhum ponto de interseção.", n1: "Um ponto em comum.", n2: "Dois pontos de interseção.", nInf: "Os gráficos são iguais – todos os pontos são comuns.",
  parallel: "As retas são paralelas (mesma inclinação).", sekante: "A reta é secante (corta a parábola duas vezes).", tangente: "A reta é tangente (toca a parábola em um ponto).", passante: "A reta é exterior (não toca a parábola).", beruehr: "As parábolas se tocam em um ponto.",
  merke: "Pontos de interseção: igualar f(x) = g(x), passar tudo para um lado e resolver. Substituindo os valores de x em uma das funções obtém-se os y. Para parábola e reta, o discriminante decide: Δ > 0 dois, Δ = 0 um, Δ < 0 nenhum.",
  u_auftrag: "Calcule os pontos de interseção dos gráficos de f e g.", u_wie: "Quantos pontos de interseção há?", u_pkt: "Ponto de interseção", pruefen: "Verificar", weiterA: "Próximo exercício", punkte: "{p} de {n} certas",
  richtig: "Certo!", nochmal: "Ainda não – tente mais uma vez.", falsch: "Não. A solução:", eingabeFehlt: "Preencha todos os campos."
}
};
