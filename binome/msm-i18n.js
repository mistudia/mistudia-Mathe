// Zusätzliche Sprachen für "Binomische Formeln" in der Mathe-App (fr, ru, ar, ja, pt).
function msBinomBase(o){
  return Object.assign({
    aInfo:"a = <b>{v}</b>", bInfo:"b = <b>{v}</b>",
    a2Info:"a² = ({a})² = <b>{v}</b>", twoabInfo:"2ab = 2 · {a} · {b} = <b>{v}</b>", b2Info:"b² = ({b})² = <b>{v}</b>"
  }, o);
}
TR.fr = msBinomBase({
  title:"Identités remarquables", easy:"😊 Facile", medium:"🧠 Moyen", hard:"🔥 Difficile",
  artText:"Développer deux parenthèses – chaque terme de la 1re parenthèse avec chaque terme de la 2e",
  formelName:["1re identité remarquable","2e identité remarquable","3e identité remarquable"],
  zuordnungDefault:"Ici s’affiche ce que signifie cette partie dans l’exercice.",
  twoabNote:"  (ce sont les flèches 2 + 3 ensemble)",
  zuordnungHover:"a = <b>{a}</b>, b = <b>{b}</b> – passe sur une partie de la formule.",
  steps:["1er terme de la 1re parenthèse · 1er terme de la 2e parenthèse","1er terme de la 1re parenthèse · 2e terme de la 2e parenthèse","2e terme de la 1re parenthèse · 1er terme de la 2e parenthèse","2e terme de la 1re parenthèse · 2e terme de la 2e parenthèse"],
  zwischenergebnis:"Résultat intermédiaire", ergebnisLabel:"Résultat réduit :", ergebnisPlaceholder:"p. ex. x^2+10x+25",
  pruefenBtn:"✓ Vérifier", loesungBtn:"💡 Solution", neueAufgabeBtn:"🔄 Nouvel exercice",
  statusRichtig:"🎉 Super, tout est juste !", statusFalsch:"Pas tout à fait – regarde les flèches !", statusLoesung:"💡 Voilà comment faire !"
});
TR.ru = msBinomBase({
  title:"Формулы сокращённого умножения", easy:"😊 Легко", medium:"🧠 Средне", hard:"🔥 Сложно",
  artText:"Раскрываем две скобки – каждый член 1-й скобки умножаем на каждый член 2-й скобки",
  formelName:["Квадрат суммы","Квадрат разности","Разность квадратов"],
  zuordnungDefault:"Здесь показано, что означает эта часть в задании.",
  twoabNote:"  (это стрелки 2 + 3 вместе)",
  zuordnungHover:"a = <b>{a}</b>, b = <b>{b}</b> – наведи на часть формулы.",
  steps:["1-й член 1-й скобки · 1-й член 2-й скобки","1-й член 1-й скобки · 2-й член 2-й скобки","2-й член 1-й скобки · 1-й член 2-й скобки","2-й член 1-й скобки · 2-й член 2-й скобки"],
  zwischenergebnis:"Промежуточный результат", ergebnisLabel:"Итоговый результат:", ergebnisPlaceholder:"напр. x^2+10x+25",
  pruefenBtn:"✓ Проверить", loesungBtn:"💡 Решение", neueAufgabeBtn:"🔄 Новое задание",
  statusRichtig:"🎉 Отлично, всё верно!", statusFalsch:"Ещё не совсем – посмотри на стрелки!", statusLoesung:"💡 Вот как это делается!"
});
TR.ar = msBinomBase({
  title:"المتطابقات الشهيرة", easy:"😊 سهل", medium:"🧠 متوسط", hard:"🔥 صعب",
  artText:"فك قوسين – نضرب كل حد من القوس الأول في كل حد من القوس الثاني",
  formelName:["المتطابقة الأولى: مربع المجموع","المتطابقة الثانية: مربع الفرق","المتطابقة الثالثة: فرق مربعين"],
  zuordnungDefault:"هنا يظهر معنى هذا الجزء في المسألة.",
  twoabNote:"  (هذا هو السهمان 2 + 3 معًا)",
  zuordnungHover:"a = <b>{a}</b>، b = <b>{b}</b> – مرّر فوق جزء من الصيغة.",
  steps:["الحد الأول من القوس الأول · الحد الأول من القوس الثاني","الحد الأول من القوس الأول · الحد الثاني من القوس الثاني","الحد الثاني من القوس الأول · الحد الأول من القوس الثاني","الحد الثاني من القوس الأول · الحد الثاني من القوس الثاني"],
  zwischenergebnis:"نتيجة مرحلية", ergebnisLabel:"النتيجة المبسّطة:", ergebnisPlaceholder:"مثلًا x^2+10x+25",
  pruefenBtn:"✓ تحقق", loesungBtn:"💡 الحل", neueAufgabeBtn:"🔄 مسألة جديدة",
  statusRichtig:"🎉 رائع، كل شيء صحيح!", statusFalsch:"ليس تمامًا بعد – انظر إلى الأسهم!", statusLoesung:"💡 هكذا تُحل!"
});
TR.ja = msBinomBase({
  title:"乗法公式", easy:"😊 かんたん", medium:"🧠 ふつう", hard:"🔥 むずかしい",
  artText:"2つのかっこを展開しよう――1つ目のかっこのそれぞれの項に、2つ目のかっこのそれぞれの項をかける",
  formelName:["乗法公式①（和の平方）","乗法公式②（差の平方）","乗法公式③（和と差の積）"],
  zuordnungDefault:"ここに、この部分が問題で何を表すかが出るよ。",
  twoabNote:"  （矢印2と矢印3を合わせたもの）",
  zuordnungHover:"a = <b>{a}</b>, b = <b>{b}</b> – 公式の部分にカーソルを合わせてね。",
  steps:["1つ目のかっこの1番目の項 · 2つ目のかっこの1番目の項","1つ目のかっこの1番目の項 · 2つ目のかっこの2番目の項","1つ目のかっこの2番目の項 · 2つ目のかっこの1番目の項","1つ目のかっこの2番目の項 · 2つ目のかっこの2番目の項"],
  zwischenergebnis:"途中の結果", ergebnisLabel:"まとめた答え：", ergebnisPlaceholder:"例：x^2+10x+25",
  pruefenBtn:"✓ 答え合わせ", loesungBtn:"💡 答え", neueAufgabeBtn:"🔄 新しい問題",
  statusRichtig:"🎉 すごい、全部正解！", statusFalsch:"おしい――矢印を見てみよう！", statusLoesung:"💡 こうやって解くよ！"
});
TR.pt = msBinomBase({
  title:"Produtos notáveis", easy:"😊 Fácil", medium:"🧠 Médio", hard:"🔥 Difícil",
  artText:"Multiplicar dois parênteses – cada termo do 1º parêntese por cada termo do 2º parêntese",
  formelName:["Quadrado da soma","Quadrado da diferença","Produto da soma pela diferença"],
  zuordnungDefault:"Aqui aparece o que esta parte significa na tarefa.",
  twoabNote:"  (são as setas 2 + 3 juntas)",
  zuordnungHover:"a = <b>{a}</b>, b = <b>{b}</b> – passe o mouse sobre uma parte da fórmula.",
  steps:["1º termo do 1º parêntese · 1º termo do 2º parêntese","1º termo do 1º parêntese · 2º termo do 2º parêntese","2º termo do 1º parêntese · 1º termo do 2º parêntese","2º termo do 1º parêntese · 2º termo do 2º parêntese"],
  zwischenergebnis:"Resultado parcial", ergebnisLabel:"Resultado simplificado:", ergebnisPlaceholder:"ex.: x^2+10x+25",
  pruefenBtn:"✓ Conferir", loesungBtn:"💡 Solução", neueAufgabeBtn:"🔄 Nova tarefa",
  statusRichtig:"🎉 Ótimo, tudo certo!", statusFalsch:"Ainda não – olhe as setas!", statusLoesung:"💡 Assim se faz!"
});
window.MS_LANG = {
  hide: ".sprachleiste",
  apply: function(l){ if(TR[l]) setLang(l); }
};
