// /groessen/eigen.js – „Selbst umrechnen“: eigene Zahl, Einheit von → nach, mit Rechenweg (9 Sprachen).
// Hängt sich an setLang() der Seite an; MS_GROESSE.laden({kat, wert, von, nach}) für die Alltagsbeispiele.
(function(){
  "use strict";
  var EINH = {
    laenge: { km: 1000, m: 1, dm: 0.1, cm: 0.01, mm: 0.001 },
    flaeche: { "km²": 1e6, ha: 1e4, a: 100, "m²": 1, "dm²": 0.01, "cm²": 1e-4, "mm²": 1e-6 },
    volumen: { "m³": 1000, hl: 100, l: 1, "dm³": 1, dl: 0.1, cl: 0.01, ml: 0.001, "cm³": 0.001 },
    masse: { t: 1e6, kg: 1000, g: 1, mg: 0.001 },
    zeit: { d: 86400, h: 3600, min: 60, s: 1 }
  };
  var START = { laenge: ["km", "m"], flaeche: ["m²", "cm²"], volumen: ["l", "ml"], masse: ["kg", "g"], zeit: ["h", "min"] };
  var TX = {
    de: { titel: "Selbst umrechnen", text: "Gib eine eigene Zahl ein und wähle die Einheiten – der Rechenweg wird angezeigt.", kat: "Größe:", also: "also", mal: "mal", geteilt: "geteilt durch", fehler: "Bitte eine Zahl eingeben, z. B. 3,5.", gleich: "Gleiche Einheit – nichts zu rechnen.", tag: "d = Tag" },
    en: { titel: "Convert your own", text: "Enter your own number and choose the units – the working is shown.", kat: "Quantity:", also: "so", mal: "times", geteilt: "divided by", fehler: "Please enter a number, e.g. 3.5.", gleich: "Same unit – nothing to convert.", tag: "d = day" },
    es: { titel: "Convierte tú", text: "Escribe tu propio número y elige las unidades: se muestra el procedimiento.", kat: "Magnitud:", also: "es decir,", mal: "por", geteilt: "entre", fehler: "Escribe un número, p. ej. 3,5.", gleich: "Misma unidad: no hay nada que convertir.", tag: "d = día" },
    zh: { titel: "自己换算", text: "输入一个数并选择单位——会显示计算过程。", kat: "量：", also: "所以", mal: "乘", geteilt: "除以", fehler: "请输入一个数，例如 3.5。", gleich: "单位相同——不用换算。", tag: "d = 天" },
    fr: { titel: "Convertis toi-même", text: "Saisis ton propre nombre et choisis les unités : le calcul est affiché.", kat: "Grandeur :", also: "donc", mal: "fois", geteilt: "divisé par", fehler: "Saisis un nombre, p. ex. 3,5.", gleich: "Même unité : rien à convertir.", tag: "d = jour" },
    ru: { titel: "Переведи сам", text: "Введи своё число и выбери единицы – появится решение.", kat: "Величина:", also: "значит,", mal: "умножить на", geteilt: "разделить на", fehler: "Введи число, например 3,5.", gleich: "Одна и та же единица – переводить нечего.", tag: "d = сутки" },
    ar: { titel: "حوّل بنفسك", text: "أدخل عددًا من اختيارك واختر الوحدات – ستظهر خطوات الحل.", kat: "الكمية:", also: "إذن", mal: "ضرب", geteilt: "قسمة على", fehler: "أدخل عددًا، مثلًا 3.5.", gleich: "الوحدة نفسها – لا شيء للتحويل.", tag: "d = يوم" },
    ja: { titel: "自分で換算", text: "好きな数を入れて単位を選ぶと、計算のしかたが出るよ。", kat: "量：", also: "だから", mal: "×", geteilt: "÷", fehler: "数を入れてね（例：3.5）。", gleich: "同じ単位なので換算はいらないよ。", tag: "d = 日" },
    pt: { titel: "Converta você", text: "Digite seu próprio número e escolha as unidades – o cálculo é mostrado.", kat: "Grandeza:", also: "então", mal: "vezes", geteilt: "dividido por", fehler: "Digite um número, por ex. 3,5.", gleich: "Mesma unidade – nada a converter.", tag: "d = dia" }
  };
  function $(id){ return document.getElementById(id); }
  function tx(k){ return (TX[lang] || TX.de)[k]; }
  function r10(x){ return Math.round(x * 1e10) / 1e10; }
  function fz(x){ return new Intl.NumberFormat(T().locale, { maximumFractionDigits: 10, useGrouping: false }).format(r10(x)); }

  var sec = document.createElement("section"); sec.className = "eigen-karte"; sec.id = "eigenKarte";
  sec.innerHTML = '<h2 id="eTitel"></h2><p class="eigen-text" id="eText"></p>' +
    '<div class="eigen-zeile"><label><span id="eKatL"></span> <select id="eKat"></select></label></div>' +
    '<div class="eigen-zeile" dir="ltr"><input id="eWert" inputmode="decimal" autocomplete="off" value="3,5"><select id="eVon"></select><span class="eigen-gl">=</span><b id="eErg"></b><select id="eNach"></select></div>' +
    '<p class="eigen-weg" id="eWeg" dir="ltr"></p><p class="eigen-hinweis" id="eHinweis"></p>';
  var ziel = $("rechnerBox"); ziel.parentNode.insertBefore(sec, ziel.nextSibling);
  var css = document.createElement("style");
  css.textContent = ".eigen-karte{margin-top:22px;padding:20px;border-radius:15px;background:#f8fafc;border:2px solid #b0b0b8}" +
    ".eigen-karte h2{margin:0 0 6px;color:var(--blau);font-size:21px}.eigen-text{margin:0 0 12px;color:#475569;line-height:1.5}" +
    ".eigen-zeile{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0}" +
    ".eigen-zeile select{min-height:48px;padding:8px 10px;border:2px solid #b0b0b8;border-radius:8px;background:#fff;color:#1f2937;font-size:18px;outline:none}" +
    ".eigen-zeile label{font-weight:bold;color:#475569;display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap}" +
    "#eWert{width:130px;min-width:0;flex:0 0 auto;border-color:#b0b0b8}" +
    ".eigen-gl{font-size:22px;font-weight:bold;color:#64748b}#eErg{font-size:22px;color:#1d4ed8;min-width:2em;text-align:center;overflow-wrap:anywhere}" +
    ".eigen-weg{margin:10px 0 0;padding:10px 12px;border-radius:10px;background:#dbeafe;color:#1e3a8a;font-size:17px;line-height:1.6}" +
    ".eigen-weg:empty{display:none}.eigen-hinweis{margin:6px 0 0;color:#64748b;font-size:14px}.eigen-hinweis:empty{display:none}";
  document.head.appendChild(css);

  var KAT = "laenge";
  function einheitenFuellen(von, nach){
    var L = Object.keys(EINH[KAT]);
    ["eVon", "eNach"].forEach(function(id, i){ $(id).innerHTML = L.map(function(u){ return '<option value="' + u + '">' + u + "</option>"; }).join(""); $(id).value = i ? nach : von; });
  }
  function rechnen(){
    var s = $("eWert").value.trim().replace(/\s/g, "").replace(",", "."), x = s === "" ? NaN : Number(s);
    var von = $("eVon").value, nach = $("eNach").value, F = EINH[KAT];
    $("eHinweis").textContent = KAT === "zeit" ? tx("tag") : "";
    if(!isFinite(x)){ $("eErg").textContent = "?"; $("eWeg").textContent = tx("fehler"); return; }
    var erg = x * F[von] / F[nach];
    $("eErg").textContent = fz(erg);
    if(von === nach){ $("eWeg").textContent = tx("gleich"); return; }
    var q = F[von] / F[nach];
    if(q >= 1) $("eWeg").innerHTML = "1 " + von + " = " + fz(q) + " " + nach + " → " + tx("mal") + " " + fz(q) + "<br>" + fz(x) + " " + von + " = " + fz(x) + " · " + fz(q) + " " + nach + " = <b>" + fz(erg) + " " + nach + "</b>";
    else $("eWeg").innerHTML = "1 " + nach + " = " + fz(1 / q) + " " + von + " → " + tx("geteilt") + " " + fz(1 / q) + "<br>" + fz(x) + " " + von + " = " + fz(x) + " : " + fz(1 / q) + " " + nach + " = <b>" + fz(erg) + " " + nach + "</b>";
  }
  function texte(){
    $("eTitel").textContent = tx("titel"); $("eText").textContent = tx("text"); $("eKatL").textContent = tx("kat");
    var v = $("eKat").value || KAT;
    $("eKat").innerHTML = Object.keys(EINH).map(function(k){ return '<option value="' + k + '">' + T().kategorien[k] + "</option>"; }).join(""); $("eKat").value = v;
    rechnen();
  }
  $("eKat").addEventListener("change", function(){ KAT = $("eKat").value; einheitenFuellen(START[KAT][0], START[KAT][1]); rechnen(); });
  ["eVon", "eNach"].forEach(function(id){ $(id).addEventListener("change", rechnen); });
  $("eWert").addEventListener("input", rechnen);
  einheitenFuellen("km", "m");
  // Sprachwechsel der Seite mitnehmen (setLang ist global)
  var altSet = window.setLang; window.setLang = function(l){ altSet(l); texte(); };
  window.MS_GROESSE = { laden: function(w){
    KAT = w.kat; $("eKat").value = KAT; einheitenFuellen(w.von, w.nach);
    var s = String(w.wert); $("eWert").value = /^(en|zh|ja|ar)$/.test(lang) ? s : s.replace(".", ",");
    rechnen(); sec.scrollIntoView({ behavior: "smooth", block: "start" });
  } };
  texte();
})();
