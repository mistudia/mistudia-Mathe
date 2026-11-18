// ============================================================
// einmaleins/gross.js – dieselbe Diplom-Ansicht für das Große Einmaleins (/einmaleins/?gross=1).
//   Malnehmen: Reihen 11–20 mal 2–10 (45 zufällige Aufgaben, 10 Minuten, 20 s je Aufgabe)
//   Geteilt:   dieselben Aufgaben rückwärts
//   Profi:     11–20 mal 11–20 (45 von 55 Aufgaben, 15 Minuten, 30 s je Aufgabe)
// Plus/Minus sind hier ausgeblendet. Mit &embed=1 läuft die Seite als Einbettung in
// /grosses-einmaleins/ (ohne Logo, Haus-Knopf, Zoomleiste, Napier, Bildergalerie; meldet ihre Höhe).
// ============================================================
(function(){
  if(!/[?&]gross=1\b/.test(location.search)) return;
  var EMBED = /[?&]embed=1\b/.test(location.search);
  window.MS_GROSS = true; if(EMBED) window.MS_EMBED = true;
  var GT = {
    de: { titel: "Großes Einmaleins – Diplom", profi: "Profi", mal: "Löse 45 Aufgaben aus den Reihen 11 bis 20 (mal 2 bis 10) fehlerfrei in 10 Minuten, um dein Diplom zu bekommen!", geteilt: "Löse 45 Geteiltaufgaben aus den Reihen 11 bis 20 fehlerfrei in 10 Minuten, um dein Diplom zu bekommen!", profiA: "Profi: Löse 45 Aufgaben von 11 · 11 bis 20 · 20 fehlerfrei in 15 Minuten, um dein Diplom zu bekommen!", nMal: "Diplom zum großen Einmaleins teilgenommen hat.", nGet: "Geteilt-Diplom zum großen Einmaleins teilgenommen hat.", nProfi: "Profi-Diplom zum großen Einmaleins teilgenommen hat." },
    en: { titel: "Big Times Tables – Diploma", profi: "Pro", mal: "Solve 45 tasks from the tables 11 to 20 (times 2 to 10) without mistakes in 10 minutes to earn your diploma!", geteilt: "Solve 45 division tasks from the tables 11 to 20 without mistakes in 10 minutes to earn your diploma!", profiA: "Pro: solve 45 tasks from 11 · 11 to 20 · 20 without mistakes in 15 minutes to earn your diploma!", nMal: "Big Times Tables Diploma.", nGet: "Big Division Diploma.", nProfi: "Big Times Tables Pro Diploma." },
    es: { titel: "Tablas grandes – Diploma", profi: "Experto", mal: "¡Resuelve 45 tareas de las tablas del 11 al 20 (por 2 a 10) sin errores en 10 minutos para obtener tu diploma!", geteilt: "¡Resuelve 45 divisiones de las tablas del 11 al 20 sin errores en 10 minutos para obtener tu diploma!", profiA: "Experto: ¡resuelve 45 tareas de 11 · 11 a 20 · 20 sin errores en 15 minutos para obtener tu diploma!", nMal: "Diploma de las Tablas Grandes.", nGet: "Diploma de División de las Tablas Grandes.", nProfi: "Diploma Experto de las Tablas Grandes." },
    zh: { titel: "大乘法表证书", profi: "高手", mal: "请在10分钟内正确解答11到20乘法表（乘2到10）中的45道题目，即可获得证书！", geteilt: "请在10分钟内正确解答11到20的45道除法题目，即可获得证书！", profiA: "高手：请在15分钟内正确解答从11 · 11到20 · 20的45道题目，即可获得证书！", nMal: "大乘法表证书。", nGet: "大除法表证书。", nProfi: "大乘法表高手证书。" },
    fr: { titel: "Grandes tables – Diplôme", profi: "Expert", mal: "Résous sans erreur 45 calculs des tables de 11 à 20 (fois 2 à 10) en 10 minutes pour obtenir ton diplôme !", geteilt: "Résous sans erreur 45 divisions des tables de 11 à 20 en 10 minutes pour obtenir ton diplôme !", profiA: "Expert : résous sans erreur 45 calculs de 11 · 11 à 20 · 20 en 15 minutes pour obtenir ton diplôme !", nMal: "diplôme des grandes tables de multiplication.", nGet: "diplôme de division des grandes tables.", nProfi: "diplôme expert des grandes tables." },
    ru: { titel: "Большая таблица умножения – диплом", profi: "Профи", mal: "Реши без ошибок 45 примеров из рядов от 11 до 20 (умножить на 2–10) за 10 минут и получи диплом!", geteilt: "Реши без ошибок 45 примеров на деление из рядов от 11 до 20 за 10 минут и получи диплом!", profiA: "Профи: реши без ошибок 45 примеров от 11 · 11 до 20 · 20 за 15 минут и получи диплом!", nMal: "диплом по большой таблице умножения.", nGet: "диплом по делению (большая таблица).", nProfi: "диплом профи по большой таблице умножения." },
    ar: { titel: "جدول الضرب الكبير – شهادة", profi: "محترف", mal: "حلّ 45 مسألة من جداول 11 إلى 20 (في 2 إلى 10) دون أخطاء خلال 10 دقائق لتحصل على شهادتك!", geteilt: "حلّ 45 مسألة قسمة من جداول 11 إلى 20 دون أخطاء خلال 10 دقائق لتحصل على شهادتك!", profiA: "محترف: حلّ 45 مسألة من 11 · 11 إلى 20 · 20 دون أخطاء خلال 15 دقيقة لتحصل على شهادتك!", nMal: "شهادة جدول الضرب الكبير.", nGet: "شهادة القسمة لجدول الضرب الكبير.", nProfi: "شهادة المحترف لجدول الضرب الكبير." },
    ja: { titel: "大きなかけ算の賞状", profi: "プロ", mal: "11〜20 の段（× 2〜10）から 45 問を、10 分以内にまちがえずに解いて賞状をもらおう！", geteilt: "11〜20 の段のわり算 45 問を、10 分以内にまちがえずに解いて賞状をもらおう！", profiA: "プロ：11 · 11 から 20 · 20 までの 45 問を、15 分以内にまちがえずに解いて賞状をもらおう！", nMal: "大きなかけ算の賞状に合格しました。", nGet: "大きなわり算の賞状に合格しました。", nProfi: "大きなかけ算プロの賞状に合格しました。" },
    pt: { titel: "Tabuada grande – Diploma", profi: "Profissional", mal: "Resolve 45 contas das tabuadas de 11 a 20 (vezes 2 a 10) sem erros em 10 minutos para ganhares o diploma!", geteilt: "Resolve 45 divisões das tabuadas de 11 a 20 sem erros em 10 minutos para ganhares o diploma!", profiA: "Profissional: resolve 45 contas de 11 · 11 a 20 · 20 sem erros em 15 minutos para ganhares o diploma!", nMal: "diploma da tabuada grande.", nGet: "diploma de divisão da tabuada grande.", nProfi: "diploma profissional da tabuada grande." }
  };
  function G(){ return GT[aktivSprache] || GT.de; }
  // Aufgaben
  var bauen = false, origMische = mische, origNeu = neueAufgaben;
  function grossAufgaben(){
    var L = [];
    if(aktivModus === "profi"){ for(var a = 11; a <= 20; a++) for(var b = a; b <= 20; b++) L.push(Math.random() < 0.5 ? { typ: "mal", x: a, y: b, ergebnis: a * b } : { typ: "mal", x: b, y: a, ergebnis: a * b }); }
    else for(var r = 11; r <= 20; r++) for(var f = 2; f <= 10; f++){
      if(aktivModus === "geteilt") L.push(Math.random() < 0.5 ? { typ: "geteilt", x: r * f, y: r, ergebnis: f } : { typ: "geteilt", x: r * f, y: f, ergebnis: r });
      else L.push(Math.random() < 0.5 ? { typ: "mal", x: r, y: f, ergebnis: r * f } : { typ: "mal", x: f, y: r, ergebnis: r * f });
    }
    return origMische(L).slice(0, 45);
  }
  mische = function(arr){ if(bauen){ bauen = false; return grossAufgaben(); } return origMische(arr); };
  neueAufgaben = function(){
    GESAMTZEIT_NORMAL = aktivModus === "profi" ? 15 * 60 : 10 * 60;
    FRAGENZEIT_NORMAL = aktivModus === "profi" ? 30 : 20;
    bauen = aktivModus !== "plus" && aktivModus !== "minus";
    origNeu();
    bauen = false;
  };
  // Texte
  aktuelleAnleitung = function(){ return aktivModus === "profi" ? G().profiA : aktivModus === "geteilt" ? G().geteilt : G().mal; };
  aktuellerDiplomText2Nach = function(){ return aktivModus === "profi" ? G().nProfi : aktivModus === "geteilt" ? G().nGet : G().nMal; };
  var origSprache = sprache;
  sprache = function(s){ origSprache(s); document.getElementById("titel").textContent = G().titel; var pl = document.getElementById("modusProfiLabel"); if(pl) pl.textContent = G().profi; document.title = "miStudia – " + G().titel; };
  var origDiplom = zeigeDiplom;
  zeigeDiplom = function(){ origDiplom(); document.getElementById("badgeReihen").textContent = "11–20"; };
  // Modus-Knöpfe: Plus/Minus weg, Profi dazu
  var origModus = modus;
  modus = function(m){
    if(m !== "profi") return origModus(m);
    aktivModus = "profi";
    document.querySelectorAll(".modus-btn").forEach(function(b){ b.classList.remove("active"); });
    document.getElementById("btnModusProfi").classList.add("active");
    var t = texte[aktivSprache];
    document.getElementById("anleitung").textContent = aktuelleAnleitung(t);
    document.getElementById("badgeReihenLabel").textContent = aktuellesBereichLabel(t);
    document.getElementById("diplomText2").innerHTML = t.diplomText2Vor + "<br><span class=\"marke\">" + t.diplomText2Marke + "</span> " + aktuellerDiplomText2Nach(t);
    neueAufgaben();
  };
  var css = document.createElement("style");
  css.textContent = "#btnModusPlus,#btnModusMinus{display:none!important}" + (EMBED ? "html,body{background:transparent!important}header img,#logo,.logo,#titel,footer,#napier,.msbb,.msa-knopf,.ms-home-btn,.ms-zl{display:none!important}body{padding-top:0!important;margin-top:0!important}" : "");
  document.head.appendChild(css);
  function start(){
    var mal = document.getElementById("btnModusMal");
    if(mal && !document.getElementById("btnModusProfi")){
      var b = document.createElement("button"); b.id = "btnModusProfi"; b.className = "modus-btn"; b.type = "button";
      b.innerHTML = '<span class="modus-symbol">★</span> <span id="modusProfiLabel"></span>'; b.addEventListener("click", function(){ modus("profi"); });
      var g = document.getElementById("btnModusGeteilt"); (g || mal).insertAdjacentElement("afterend", b);
    }
    sprache(aktivSprache);
    modus(aktivModus === "plus" || aktivModus === "minus" ? "mal" : aktivModus);
    if(EMBED && window.parent !== window){
      var last = 0;
      function melde(){ var h = Math.ceil(document.documentElement.scrollHeight); if(Math.abs(h - last) > 2){ last = h; try { window.parent.postMessage({ msEmbedH: h }, location.origin); } catch(x){} } }
      if(window.ResizeObserver) new ResizeObserver(melde).observe(document.body);
      setInterval(melde, 800); melde();
    }
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
