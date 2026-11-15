// /binome/eigen.js – „Eigene Aufgabe“: Formel wählen, a und b selbst eingeben (9 Sprachen).
// Nutzt setzeAufgabe(typ, a, b, true) aus index.html; MS_BINOM.laden({typ, a, b}) für die Alltagsbeispiele.
(function(){
  "use strict";
  var TX = {
    de: { knopf: "Eigene Aufgabe", formel: "Formel:", ok: "Aufgabe übernehmen", hilfe: "a und b z. B. als 3x, x^2, 2xy oder 5 eingeben (ohne Minus – das Vorzeichen steckt in der Formel).", fehler: "Das verstehe ich nicht. Bitte a und b z. B. als 3x, x^2, 2xy oder 5 eingeben." },
    en: { knopf: "Own exercise", formel: "Formula:", ok: "Use this exercise", hilfe: "Enter a and b e.g. as 3x, x^2, 2xy or 5 (no minus – the sign is in the formula).", fehler: "I can’t read that. Please enter a and b e.g. as 3x, x^2, 2xy or 5." },
    es: { knopf: "Ejercicio propio", formel: "Fórmula:", ok: "Usar este ejercicio", hilfe: "Escribe a y b, p. ej., como 3x, x^2, 2xy o 5 (sin menos: el signo está en la fórmula).", fehler: "No lo entiendo. Escribe a y b, p. ej., como 3x, x^2, 2xy o 5." },
    zh: { knopf: "自己出题", formel: "公式：", ok: "使用这道题", hilfe: "a 和 b 可以写成 3x、x^2、2xy 或 5（不要写负号——符号在公式里）。", fehler: "看不懂。请把 a 和 b 写成 3x、x^2、2xy 或 5 这样的形式。" },
    fr: { knopf: "Exercice perso", formel: "Formule :", ok: "Prendre cet exercice", hilfe: "Saisis a et b, p. ex. 3x, x^2, 2xy ou 5 (sans moins : le signe est dans la formule).", fehler: "Je ne comprends pas. Saisis a et b, p. ex. 3x, x^2, 2xy ou 5." },
    ru: { knopf: "Своё задание", formel: "Формула:", ok: "Взять это задание", hilfe: "Введи a и b, например 3x, x^2, 2xy или 5 (без минуса – знак уже в формуле).", fehler: "Не понимаю. Введи a и b, например 3x, x^2, 2xy или 5." },
    ar: { knopf: "تمرين خاص", formel: "الصيغة:", ok: "اعتمد هذا التمرين", hilfe: "أدخل a و b مثلًا 3x أو x^2 أو 2xy أو 5 (دون إشارة ناقص – الإشارة موجودة في الصيغة).", fehler: "لم أفهم ذلك. أدخل a و b مثلًا 3x أو x^2 أو 2xy أو 5." },
    ja: { knopf: "自分で問題", formel: "公式：", ok: "この問題にする", hilfe: "a と b は 3x、x^2、2xy、5 のように入れてね（マイナスはつけない――符号は公式に入っている）。", fehler: "読みとれませんでした。a と b を 3x、x^2、2xy、5 のように入れてね。" },
    pt: { knopf: "Exercício próprio", formel: "Fórmula:", ok: "Usar este exercício", hilfe: "Digite a e b, por ex. 3x, x^2, 2xy ou 5 (sem menos – o sinal está na fórmula).", fehler: "Não entendi. Digite a e b, por ex. 3x, x^2, 2xy ou 5." }
  };
  var FORMELN = [["quadPlus", "(a + b)²"], ["quadMinus", "(a − b)²"], ["diff", "(a + b)(a − b)"]];
  function $(id){ return document.getElementById(id); }
  function tx(k){ return (TX[lang] || TX.de)[k]; }
  // „3x^2y“, „x²“, „2xy“, „5“ → {c, x, y}
  function monom(s){
    s = String(s).replace(/\s|\*|·/g, "").replace(/²/g, "^2").replace(/³/g, "^3").toLowerCase();
    var m = /^(\d{0,3})(?:(x)(?:\^([1-4]))?)?(?:(y)(?:\^([1-4]))?)?$/.exec(s);
    if(!m || s === "") return null;
    var c = m[1] === "" ? 1 : Number(m[1]), x = m[2] ? Number(m[3] || 1) : 0, y = m[4] ? Number(m[5] || 1) : 0;
    if(!(c >= 1) || (m[1] === "" && !x && !y)) return null;
    return { c: c, x: x, y: y };
  }
  function txt(m){ var p = function(v, e){ return e === 0 ? "" : e === 1 ? v : v + "^" + e; }, v = p("x", m.x) + p("y", m.y); return (m.c === 1 && v ? "" : String(m.c)) + v; }

  var knopf = document.createElement("button"); knopf.type = "button"; knopf.className = "stufe-btn"; knopf.id = "btnEigen";
  $("btnSchwer").parentNode.appendChild(knopf);
  var box = document.createElement("div"); box.className = "eigen-box"; box.id = "eigenBox"; box.hidden = true;
  box.innerHTML = '<div class="eigen-reihe"><label><span id="eFormelL"></span> <select id="eFormel">' + FORMELN.map(function(f){ return '<option value="' + f[0] + '">' + f[1] + "</option>"; }).join("") + '</select></label></div>' +
    '<div class="eigen-reihe" dir="ltr"><label>a = <input id="eA" value="3x" autocomplete="off" autocapitalize="off" spellcheck="false"></label><label>b = <input id="eB" value="4" autocomplete="off" autocapitalize="off" spellcheck="false"></label><button type="button" id="eOk"></button></div>' +
    '<p class="eigen-hilfe" id="eHilfe"></p>';
  var ziel = document.querySelector("main"); ziel.parentNode.insertBefore(box, ziel);
  var css = document.createElement("style");
  css.textContent = ".eigen-box{max-width:760px;margin:10px auto;padding:14px 16px;border:2px solid #b0b0b8;border-radius:14px;background:#f8fafc;color:#1f2937}" +
    ".eigen-reihe{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;margin:6px 0}" +
    ".eigen-reihe label{font-weight:bold;display:inline-flex;gap:6px;align-items:center}" +
    ".eigen-reihe input,.eigen-reihe select{font-size:18px;padding:7px 10px;border:2px solid #b0b0b8;border-radius:8px;background:#fff;color:#1f2937}" +
    ".eigen-reihe input{width:110px}#eOk{font:bold 16px Arial,sans-serif;padding:9px 16px;border:0;border-radius:9px;background:#2563eb;color:#fff;cursor:pointer}" +
    ".eigen-hilfe{margin:6px 0 0;text-align:center;color:#475569;font-size:15px;line-height:1.4}.eigen-hilfe.fehler{color:#b91c1c;font-weight:bold}";
  document.head.appendChild(css);

  function texte(){ knopf.textContent = "✎ " + tx("knopf"); $("eFormelL").textContent = tx("formel"); $("eOk").textContent = tx("ok"); $("eHilfe").textContent = tx("hilfe"); $("eHilfe").classList.remove("fehler"); }
  function markiere(){ document.querySelectorAll(".stufe-btn").forEach(function(b){ b.classList.toggle("aktiv", b === knopf); }); }
  function uebernehmen(){
    var a = monom($("eA").value), b = monom($("eB").value);
    if(!a || !b){ $("eHilfe").textContent = tx("fehler"); $("eHilfe").classList.add("fehler"); return; }
    $("eHilfe").textContent = tx("hilfe"); $("eHilfe").classList.remove("fehler");
    setzeAufgabe($("eFormel").value, a, b, true); markiere();
  }
  knopf.addEventListener("click", function(){ box.hidden = !box.hidden; if(!box.hidden) $("eA").focus(); });
  $("eOk").addEventListener("click", uebernehmen);
  ["eA", "eB"].forEach(function(id){ $(id).addEventListener("keydown", function(e){ if(e.key === "Enter") uebernehmen(); }); });
  // neue Zufallsaufgabe (Stufen-Knöpfe) schließt die eigene Aufgabe wieder
  var altNeu = window.neueAufgabe; window.neueAufgabe = function(){ box.hidden = true; return altNeu.apply(this, arguments); };
  var altSet = window.setLang; window.setLang = function(l){ altSet(l); texte(); if(A && A.eigen) markiere(); };
  window.MS_BINOM = { laden: function(w){
    box.hidden = false; $("eFormel").value = w.typ; $("eA").value = w.a; $("eB").value = w.b; uebernehmen();
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  } };
  texte();
})();
