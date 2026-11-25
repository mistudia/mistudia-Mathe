// ============================================================
// einmaleins/tabelle.js – 🆕 25.11.2026 (Chat-Wunsch): Karte „Einmaleins-Tabelle 1 bis 10“ wie beim
// großen Einmaleins: Ergebnis antippen → Rechenweg (Kernaufgabe, Zerlegen über 5, mal 9 = mal 10 minus,
// mal 4 = zweimal verdoppeln) + passende Tricks (Tauschaufgabe, Nachbaraufgabe, Quadratzahl).
// Nur auf dem kleinen Einmaleins (nicht bei ?gross=1). Eigene Texte (9 Sprachen), Sprache über MS_LANG.apply.
// ============================================================
(function(){
  if(/[?&]gross=1\b/.test(location.search)) return;
  var TX = {
    de: { titel: "Einmaleins-Tabelle 1 bis 10", intro: "Tippe auf ein Ergebnis – dann siehst du, wie man es ausrechnen kann. Gelb = Quadratzahlen.", weg: "So rechnest du:", tricks: "Das hilft auch:", kern: "Kernaufgabe – mal 1, 2, 5 und 10 kann man schnell:", k1: "mal 1 bleibt gleich", k2: "mal 2 = verdoppeln", k5: "mal 5 = mal 10, dann halbieren", k10: "mal 10 = eine Null anhängen", z5: "Zerlegen: erst mal 5, dann den Rest", n9: "mal 9 = mal 10, dann einmal weniger", v4: "mal 4 = zweimal verdoppeln", tausch: "Tauschaufgabe", nach: "Nachbaraufgabe", quad: "Quadratzahl" },
    en: { titel: "Times table 1 to 10", intro: "Tap a result to see how you can work it out. Yellow = square numbers.", weg: "How to work it out:", tricks: "This helps too:", kern: "Core facts – times 1, 2, 5 and 10 are quick:", k1: "times 1 stays the same", k2: "times 2 = double", k5: "times 5 = times 10, then halve", k10: "times 10 = add a zero", z5: "Split: first times 5, then the rest", n9: "times 9 = times 10, then one less", v4: "times 4 = double twice", tausch: "Swap the factors", nach: "Neighbour fact", quad: "Square number" },
    es: { titel: "Tabla de multiplicar del 1 al 10", intro: "Toca un resultado y verás cómo se puede calcular. Amarillo = números cuadrados.", weg: "Así se calcula:", tricks: "Esto también ayuda:", kern: "Tablas clave – por 1, 2, 5 y 10 se hacen rápido:", k1: "por 1 queda igual", k2: "por 2 = el doble", k5: "por 5 = por 10 y luego la mitad", k10: "por 10 = añadir un cero", z5: "Descomponer: primero por 5, luego el resto", n9: "por 9 = por 10 y una vez menos", v4: "por 4 = doblar dos veces", tausch: "Cambiar el orden", nach: "Tabla vecina", quad: "Número cuadrado" },
    zh: { titel: "乘法表 1 到 10", intro: "点一个结果，就能看到怎么算出来。黄色 = 平方数。", weg: "这样算：", tricks: "这些也有帮助：", kern: "核心口诀——乘 1、2、5、10 算得很快：", k1: "乘 1 不变", k2: "乘 2 = 翻倍", k5: "乘 5 = 乘 10 再除以 2", k10: "乘 10 = 后面加一个 0", z5: "拆分：先乘 5，再算剩下的", n9: "乘 9 = 乘 10 再减一次", v4: "乘 4 = 翻倍两次", tausch: "交换因数", nach: "相邻算式", quad: "平方数" },
    fr: { titel: "Table de multiplication de 1 à 10", intro: "Touche un résultat pour voir comment le calculer. Jaune = nombres carrés.", weg: "Comment calculer :", tricks: "Ça aide aussi :", kern: "Tables clés – fois 1, 2, 5 et 10 vont vite :", k1: "fois 1 ne change rien", k2: "fois 2 = le double", k5: "fois 5 = fois 10, puis la moitié", k10: "fois 10 = ajouter un zéro", z5: "Décomposer : d’abord fois 5, puis le reste", n9: "fois 9 = fois 10, puis une fois de moins", v4: "fois 4 = doubler deux fois", tausch: "Inverser les facteurs", nach: "Calcul voisin", quad: "Nombre carré" },
    ru: { titel: "Таблица умножения от 1 до 10", intro: "Нажми на результат – и увидишь, как его посчитать. Жёлтые – квадраты чисел.", weg: "Как посчитать:", tricks: "Это тоже помогает:", kern: "Опорные примеры – на 1, 2, 5 и 10 считать быстро:", k1: "умножить на 1 – число не меняется", k2: "умножить на 2 = удвоить", k5: "умножить на 5 = умножить на 10 и разделить пополам", k10: "умножить на 10 = приписать ноль", z5: "Разложить: сначала на 5, потом остаток", n9: "умножить на 9 = на 10 и один раз меньше", v4: "умножить на 4 = удвоить два раза", tausch: "Переставить множители", nach: "Соседний пример", quad: "Квадрат числа" },
    ar: { titel: "جدول الضرب من 1 إلى 10", intro: "اضغط على نتيجة لترى كيف تحسبها. الأصفر = الأعداد المربعة.", weg: "هكذا تحسب:", tricks: "وهذا يساعد أيضًا:", kern: "حقائق أساسية – الضرب في 1 و2 و5 و10 سريع:", k1: "الضرب في 1 لا يغيّر العدد", k2: "الضرب في 2 = المضاعفة", k5: "الضرب في 5 = في 10 ثم النصف", k10: "الضرب في 10 = نضيف صفرًا", z5: "التجزئة: أولًا في 5 ثم الباقي", n9: "الضرب في 9 = في 10 ثم مرة أقل", v4: "الضرب في 4 = المضاعفة مرتين", tausch: "تبديل العاملين", nach: "مسألة مجاورة", quad: "عدد مربع" },
    ja: { titel: "九九の表 1〜10", intro: "答えをタップすると、計算のしかたが見られます。黄色 = 平方数。", weg: "計算のしかた：", tricks: "これも役に立つ：", kern: "基本――×1、×2、×5、×10 はすぐできる：", k1: "×1 はそのまま", k2: "×2 = 2 倍にする", k5: "×5 = ×10 して半分", k10: "×10 = 0 を 1 つつける", z5: "分ける：まず ×5、のこりをたす", n9: "×9 = ×10 して 1 回分ひく", v4: "×4 = 2 倍を 2 回", tausch: "かける順番を入れかえる", nach: "となりの式", quad: "平方数" },
    pt: { titel: "Tabuada de 1 a 10", intro: "Toca num resultado para ver como se calcula. Amarelo = números quadrados.", weg: "Assim se calcula:", tricks: "Isto também ajuda:", kern: "Tabuadas-chave – vezes 1, 2, 5 e 10 são rápidas:", k1: "vezes 1 fica igual", k2: "vezes 2 = o dobro", k5: "vezes 5 = vezes 10 e depois metade", k10: "vezes 10 = acrescentar um zero", z5: "Decompor: primeiro vezes 5, depois o resto", n9: "vezes 9 = vezes 10 e depois uma vez a menos", v4: "vezes 4 = dobrar duas vezes", tausch: "Trocar os fatores", nach: "Conta vizinha", quad: "Número quadrado" }
  };
  var lang = window.MS_MATH_LANG; try { lang = localStorage.getItem("msMathLang") || lang; } catch(e){}
  if(!TX[lang]) lang = "de";
  function T(k){ return (TX[lang] || TX.de)[k]; }
  function li(s){ return '<li><bdi dir="ltr">' + s + "</bdi></li>"; }
  var css = document.createElement("style");
  css.textContent = ".ee-tab{max-width:900px;margin:24px auto;padding:16px 18px;background:#fff;border:2px solid #b0b0b8;border-radius:16px;font:16px/1.5 system-ui,sans-serif;color:#1a2233}" +
    ".ee-tab h2{margin:0 0 6px;color:#1565c0;font-size:21px}.ee-tab p{margin:6px 0}.ee-tw{overflow-x:auto;max-width:100%}" +
    ".ee-tab table{border-collapse:separate;border-spacing:3px;margin:6px auto;direction:ltr;font-variant-numeric:tabular-nums}" +
    ".ee-tab th{font:800 15px system-ui,sans-serif;color:#1565c0;padding:4px;min-width:30px}.ee-tab td{padding:0}" +
    ".ee-tab button.z{width:46px;height:36px;font:700 15px system-ui,sans-serif;border:2px solid #b0b0b8;border-radius:8px;background:#fff;color:#1a2233;cursor:pointer;padding:0}" +
    ".ee-tab button.z:hover{border-color:#1565c0;background:#eef5ff}.ee-tab button.z.quad{background:#fef3c7;border-color:#d97706}.ee-tab button.z.an{background:#1565c0;border-color:#1565c0;color:#fff}" +
    ".ee-tab ol.lauf{font-size:17px;line-height:1.6;margin:6px 0;padding-inline-start:22px}.ee-tab .trick{margin:6px 0;padding-inline-start:22px;font-size:16px;line-height:1.55;color:#7c2d12}" +
    "@media (max-width:600px){.ee-tab{padding:12px 10px}.ee-tab button.z{width:32px;height:32px;font-size:13px}.ee-tab th{min-width:22px;font-size:13px}}@media print{.ee-tab{display:none}}";
  document.head.appendChild(css);
  var karte = document.createElement("section"); karte.className = "ee-tab"; karte.id = "tabelle1";
  var wahl = null;
  var KERN = { 1: "k1", 2: "k2", 5: "k5", 10: "k10" };
  function weg(a, b){
    var p = a * b, L = [], tr = [], kl = Math.min(a, b), gr = Math.max(a, b);
    var kf = KERN[b] ? b : KERN[a] ? a : 0;
    if(kf){
      var o = kf === b ? a : b;
      L.push(T(KERN[kf]) + ":");
      if(kf === 5) L.push(o + " · 5 = " + o + " · 10 : 2 = " + (o * 10) + " : 2 = " + p);
      else if(kf === 2) L.push(o + " · 2 = " + o + " + " + o + " = " + p);
      else L.push(a + " · " + b + " = " + p);
    } else if(gr === 9){
      L.push(T("n9") + ":"); L.push(kl + " · 9 = " + kl + " · 10 − " + kl + " = " + (kl * 10) + " − " + kl + " = " + p);
    } else if(gr > 5){
      L.push(T("z5") + ":"); L.push(kl + " · " + gr + " = " + kl + " · 5 + " + kl + " · " + (gr - 5) + " = " + (kl * 5) + " + " + (kl * (gr - 5)) + " = " + p);
    } else if(gr === 4){
      L.push(T("v4") + ":"); L.push(kl + " · 4 = " + kl + " · 2 · 2 = " + (kl * 2) + " · 2 = " + p);
    } else {
      L.push(T("nach") + ":"); L.push(kl + " · 3 = " + kl + " · 2 + " + kl + " = " + (kl * 2) + " + " + kl + " = " + p);
    }
    if(a !== b) tr.push(T("tausch") + ": " + a + " · " + b + " = " + b + " · " + a + " = " + p);
    if(a === b) tr.push(T("quad") + ": " + a + "² = " + p);
    if(b > 1 && !KERN[b]) tr.push(T("nach") + ": " + a + " · " + b + " = " + a + " · " + (b - 1) + " + " + a + " = " + (a * (b - 1)) + " + " + a + " = " + p);
    // L[0] = Name des Rechenwegs (Überschriftzeile), danach die Rechnung
    return '<p class="zeile"><b>' + T("weg") + "</b> " + L[0] + '</p><ol class="lauf" style="list-style:none;padding-inline-start:8px">' + L.slice(1).map(li).join("") + "</ol>" +
      (tr.length ? "<p><b>" + T("tricks") + '</b></p><ul class="trick">' + tr.map(li).join("") + "</ul>" : "");
  }
  function bau(){
    var h = "<h2>" + T("titel") + "</h2><p>" + T("intro") + '</p><div class="ee-tw"><table><thead><tr><th>·</th>';
    for(var c = 1; c <= 10; c++) h += "<th>" + c + "</th>";
    h += "</tr></thead><tbody>";
    for(var r = 1; r <= 10; r++){
      h += "<tr><th>" + r + "</th>";
      for(var c2 = 1; c2 <= 10; c2++){ var an = wahl && wahl[0] === r && wahl[1] === c2; h += '<td><button type="button" class="z' + (r === c2 ? " quad" : "") + (an ? " an" : "") + '" data-r="' + r + '" data-c="' + c2 + '">' + (r * c2) + "</button></td>"; }
      h += "</tr>";
    }
    h += '</tbody></table></div><div id="eeTabWeg">' + (wahl ? weg(wahl[0], wahl[1]) : "") + "</div>";
    karte.innerHTML = h;
    karte.querySelectorAll("button.z").forEach(function(b){ b.addEventListener("click", function(){ wahl = [+b.dataset.r, +b.dataset.c]; bau(); var w = karte.querySelector("#eeTabWeg"); if(w && w.scrollIntoView) w.scrollIntoView({ block: "nearest", behavior: "smooth" }); }); });
  }
  function einhaengen(){
    var main = document.querySelector("main") || document.body, np = document.querySelector(".np-karte");
    if(np && np.parentNode) np.parentNode.insertBefore(karte, np); else main.appendChild(karte);
    bau();
    if(location.hash === "#tabelle") setTimeout(function(){ karte.scrollIntoView({ block: "start" }); }, 200);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(einhaengen, 0); }); else setTimeout(einhaengen, 0);
  var alt = window.MS_LANG && window.MS_LANG.apply;
  if(window.MS_LANG) window.MS_LANG.apply = function(l){ if(alt) alt(l); if(TX[l]){ lang = l; bau(); } };
})();
