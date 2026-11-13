// Übersetzungen für die Mathe-Waage in der Mathe-App (vorher nur Deutsch).
// Feste Texte im Programm laufen über msW(key, deutsch); Seitentexte setzt MS_LANG.apply.
var MSW_T = {
  en: { title:"miStudia - Equation Balance", subtitle:"Visualising equations",
    hint:"Tip: type e.g. <b>+3</b>, <b>-2x</b>, <b>·4</b> or <b>÷2</b> and press Enter. Fractions work too: <b>1/2x + 3/4</b>.",
    swap:"⇄ Swap sides", probe:"🔍 Check", solution:"💡 Solution", simplify:"🧹 Simplify", undo:"↩️ Undo step", reset:"🔄 Original equation",
    history:"📜 Steps", info:"Enter an equation and transform it interactively.",
    leftAria:"Left side of the equation", rightAria:"Right side of the equation", cmd:"e.g. +3x, -2",
    invalid:"Please enter a valid equation, e.g. 2x-4x+7", div0:"Division by 0 is not allowed.",
    noX:"x cannot be determined here (x cancels out on both sides).",
    insertSol:"Insert the solution", original:"Original equation", insert:"Substitute", result:"Result",
    probeOk:"✅ The check works out", probeBad:"❌ The check does not work out",
    allX:"Every number is a solution (0 = 0).", noSol:"No solution possible (contradiction)." },
  es: { title:"miStudia - Balanza de ecuaciones", subtitle:"Visualizar ecuaciones",
    hint:"Consejo: escribe p. ej. <b>+3</b>, <b>-2x</b>, <b>·4</b> o <b>÷2</b> y pulsa Enter. También funcionan fracciones: <b>1/2x + 3/4</b>.",
    swap:"⇄ Cambiar lados", probe:"🔍 Comprobar", solution:"💡 Solución", simplify:"🧹 Simplificar", undo:"↩️ Deshacer paso", reset:"🔄 Ecuación original",
    history:"📜 Pasos intermedios", info:"Escribe una ecuación y transfórmala de forma interactiva.",
    leftAria:"Lado izquierdo de la ecuación", rightAria:"Lado derecho de la ecuación", cmd:"p. ej. +3x, -2",
    invalid:"Escribe una ecuación válida, p. ej. 2x-4x+7", div0:"No se permite dividir entre 0.",
    noX:"Aquí x no se puede determinar (x desaparece en ambos lados).",
    insertSol:"Sustituir la solución", original:"Ecuación original", insert:"Sustituir", result:"Resultado",
    probeOk:"✅ La comprobación es correcta", probeBad:"❌ La comprobación no es correcta",
    allX:"Cualquier número es solución (0 = 0).", noSol:"No hay solución (contradicción)." },
  zh: { title:"miStudia - 方程天平", subtitle:"让方程看得见",
    hint:"提示：输入例如 <b>+3</b>、<b>-2x</b>、<b>·4</b> 或 <b>÷2</b> 后按回车。也可以用分数：<b>1/2x + 3/4</b>。",
    swap:"⇄ 交换两边", probe:"🔍 检验", solution:"💡 答案", simplify:"🧹 化简", undo:"↩️ 撤销一步", reset:"🔄 原方程",
    history:"📜 中间步骤", info:"输入一个方程，然后互动地变形。",
    leftAria:"方程的左边", rightAria:"方程的右边", cmd:"例如 +3x, -2",
    invalid:"请输入有效的方程，例如 2x-4x+7", div0:"不能除以 0。",
    noX:"这里无法确定 x（两边的 x 都消去了）。",
    insertSol:"代入解", original:"原方程", insert:"代入", result:"结果",
    probeOk:"✅ 检验正确", probeBad:"❌ 检验不正确",
    allX:"任何数都是解（0 = 0）。", noSol:"无解（矛盾）。" },
  fr: { title:"miStudia - Balance des équations", subtitle:"Visualiser les équations",
    hint:"Astuce : tape p. ex. <b>+3</b>, <b>-2x</b>, <b>·4</b> ou <b>÷2</b> puis Entrée. Les fractions marchent aussi : <b>1/2x + 3/4</b>.",
    swap:"⇄ Échanger les côtés", probe:"🔍 Vérification", solution:"💡 Solution", simplify:"🧹 Simplifier", undo:"↩️ Annuler l’étape", reset:"🔄 Équation de départ",
    history:"📜 Étapes", info:"Saisis une équation et transforme-la de façon interactive.",
    leftAria:"Membre de gauche de l’équation", rightAria:"Membre de droite de l’équation", cmd:"p. ex. +3x, -2",
    invalid:"Saisis une équation valide, p. ex. 2x-4x+7", div0:"La division par 0 n’est pas permise.",
    noX:"Impossible de déterminer x ici (x s’annule des deux côtés).",
    insertSol:"Remplacer par la solution", original:"Équation de départ", insert:"Remplacer", result:"Résultat",
    probeOk:"✅ La vérification est juste", probeBad:"❌ La vérification n’est pas juste",
    allX:"Tout nombre est solution (0 = 0).", noSol:"Aucune solution possible (contradiction)." },
  ru: { title:"miStudia - Весы уравнений", subtitle:"Наглядные уравнения",
    hint:"Совет: введи, например, <b>+3</b>, <b>-2x</b>, <b>·4</b> или <b>÷2</b> и нажми Enter. Дроби тоже можно: <b>1/2x + 3/4</b>.",
    swap:"⇄ Поменять части", probe:"🔍 Проверка", solution:"💡 Решение", simplify:"🧹 Упростить", undo:"↩️ Шаг назад", reset:"🔄 Исходное уравнение",
    history:"📜 Промежуточные шаги", info:"Введи уравнение и преобразуй его в интерактивном режиме.",
    leftAria:"Левая часть уравнения", rightAria:"Правая часть уравнения", cmd:"напр. +3x, -2",
    invalid:"Введи правильное уравнение, например 2x-4x+7", div0:"Делить на 0 нельзя.",
    noX:"Здесь x нельзя определить однозначно (x сокращается в обеих частях).",
    insertSol:"Подставить решение", original:"Исходное уравнение", insert:"Подстановка", result:"Результат",
    probeOk:"✅ Проверка сходится", probeBad:"❌ Проверка не сходится",
    allX:"Любое число является решением (0 = 0).", noSol:"Решений нет (противоречие)." },
  ar: { title:"miStudia - ميزان المعادلات", subtitle:"تصوّر المعادلات",
    hint:"نصيحة: اكتب مثلًا <b>+3</b> أو <b>-2x</b> أو <b>·4</b> أو <b>÷2</b> ثم اضغط Enter. الكسور ممكنة أيضًا: <b>1/2x + 3/4</b>.",
    swap:"⇄ تبديل الطرفين", probe:"🔍 التحقق", solution:"💡 الحل", simplify:"🧹 تبسيط", undo:"↩️ تراجع خطوة", reset:"🔄 المعادلة الأصلية",
    history:"📜 الخطوات", info:"اكتب معادلة وحوّلها بشكل تفاعلي.",
    leftAria:"الطرف الأيسر من المعادلة", rightAria:"الطرف الأيمن من المعادلة", cmd:"مثلًا +3x, -2",
    invalid:"اكتب معادلة صحيحة، مثلًا 2x-4x+7", div0:"القسمة على 0 غير مسموحة.",
    noX:"لا يمكن تحديد x هنا (x يختفي من الطرفين).",
    insertSol:"تعويض الحل", original:"المعادلة الأصلية", insert:"التعويض", result:"النتيجة",
    probeOk:"✅ التحقق صحيح", probeBad:"❌ التحقق غير صحيح",
    allX:"كل عدد هو حل (0 = 0).", noSol:"لا يوجد حل (تناقض)." },
  ja: { title:"miStudia - 方程式てんびん", subtitle:"方程式を目で見よう",
    hint:"ヒント：<b>+3</b>、<b>-2x</b>、<b>·4</b>、<b>÷2</b> などを入力して Enter を押そう。分数もOK：<b>1/2x + 3/4</b>。",
    swap:"⇄ 左右を入れかえ", probe:"🔍 たしかめ", solution:"💡 答え", simplify:"🧹 整理する", undo:"↩️ 1つもどす", reset:"🔄 もとの方程式",
    history:"📜 途中の式", info:"方程式を入力して、操作しながら変形しよう。",
    leftAria:"方程式の左辺", rightAria:"方程式の右辺", cmd:"例：+3x, -2",
    invalid:"正しい方程式を入力してね。例：2x-4x+7", div0:"0でわることはできません。",
    noX:"ここでは x を決められません（両辺の x が消えます）。",
    insertSol:"解を代入", original:"もとの方程式", insert:"代入", result:"結果",
    probeOk:"✅ たしかめ OK", probeBad:"❌ たしかめが合いません",
    allX:"どんな数も解になります（0 = 0）。", noSol:"解はありません（矛盾）。" },
  pt: { title:"miStudia - Balança de equações", subtitle:"Visualizar equações",
    hint:"Dica: digite por ex. <b>+3</b>, <b>-2x</b>, <b>·4</b> ou <b>÷2</b> e aperte Enter. Frações também funcionam: <b>1/2x + 3/4</b>.",
    swap:"⇄ Trocar os lados", probe:"🔍 Prova real", solution:"💡 Solução", simplify:"🧹 Simplificar", undo:"↩️ Desfazer passo", reset:"🔄 Equação original",
    history:"📜 Passos", info:"Digite uma equação e transforme-a de forma interativa.",
    leftAria:"Lado esquerdo da equação", rightAria:"Lado direito da equação", cmd:"ex.: +3x, -2",
    invalid:"Digite uma equação válida, por ex. 2x-4x+7", div0:"Divisão por 0 não é permitida.",
    noX:"Aqui não dá para determinar x (o x some dos dois lados).",
    insertSol:"Substituir a solução", original:"Equação original", insert:"Substituir", result:"Resultado",
    probeOk:"✅ A prova real confere", probeBad:"❌ A prova real não confere",
    allX:"Qualquer número é solução (0 = 0).", noSol:"Não há solução (contradição)." }
};
function msW(key, de){
  var t = MSW_T[window.MS_MATH_LANG];
  return (t && t[key]) || de;
}
window.MS_LANG = {
  apply: function(l){
    var t = MSW_T[l]; if(!t) return;
    var set = function(sel, prop, val){ var el = document.querySelector(sel); if(el) el[prop] = val; };
    document.title = t.title;
    set(".centerHeader h1", "textContent", t.title);
    set(".subtitle", "textContent", t.subtitle);
    set(".commandBarHint", "innerHTML", t.hint);
    set(".btn-swap", "textContent", t.swap);
    set(".btn-pruefen", "textContent", t.probe);
    set(".btn-loesung", "textContent", t.solution);
    set(".btn-vereinfachen", "textContent", t.simplify);
    set(".btn-undo", "textContent", t.undo);
    set(".btn-reset", "textContent", t.reset);
    set(".historyTitle", "textContent", t.history);
    set(".info", "textContent", t.info);
    set("#commandInput", "placeholder", t.cmd);
    var li = document.getElementById("leftEquationInput"); if(li) li.setAttribute("aria-label", t.leftAria);
    var ri = document.getElementById("rightEquationInput"); if(ri) ri.setAttribute("aria-label", t.rightAria);
    if(l === "ar") [".subtitle", ".commandBarHint", ".info", ".centerHeader h1"].forEach(function(s){ var el = document.querySelector(s); if(el) el.dir = "rtl"; });
  }
};
