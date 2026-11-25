// ============================================================
// einmaleins/zeit2.js – 🆕 25.11.2026 (Chat-Wunsch): Schalter „Doppelte Zeit (zum Üben – ohne Diplom)“
// für das kleine und das große Einmaleins (/einmaleins/ und /einmaleins/?gross=1, auch eingebettet).
// Verdoppelt Gesamtzeit und Zeit pro Aufgabe; wer alles richtig hat, bekommt dann KEIN Diplom
// (und keine Bestzeit), sondern einen Hinweis. Gemerkt in localStorage „msEEDoppelt“.
// Muss NACH gross.js geladen werden (umhüllt dessen neueAufgaben/zeigeDiplom).
// ============================================================
(function(){
  var TX = {
    de: { lab: "⏱️ Doppelte Zeit (zum Üben – ohne Diplom)", info: "Doppelte Zeit: {m} Minuten insgesamt, {s} Sekunden pro Aufgabe. Ein Diplom gibt es dabei nicht.", fertig: "Alles richtig – super! Mit doppelter Zeit gibt es kein Diplom. Schalte die doppelte Zeit aus und hol dir das Diplom!" },
    en: { lab: "⏱️ Double time (for practice – no diploma)", info: "Double time: {m} minutes in total, {s} seconds per task. There is no diploma in this mode.", fertig: "All correct – great! With double time there is no diploma. Switch double time off and earn your diploma!" },
    es: { lab: "⏱️ Doble de tiempo (para practicar – sin diploma)", info: "Doble de tiempo: {m} minutos en total, {s} segundos por tarea. Así no hay diploma.", fertig: "¡Todo correcto, genial! Con el doble de tiempo no hay diploma. ¡Desactívalo y consigue tu diploma!" },
    zh: { lab: "⏱️ 双倍时间（练习用——不发证书）", info: "双倍时间：总共 {m} 分钟，每题 {s} 秒。这种模式不发证书。", fertig: "全部正确，太棒了！双倍时间下不发证书。关掉双倍时间，去拿你的证书吧！" },
    fr: { lab: "⏱️ Temps doublé (pour s’entraîner – sans diplôme)", info: "Temps doublé : {m} minutes au total, {s} secondes par calcul. Pas de diplôme dans ce mode.", fertig: "Tout est juste – bravo ! Avec le temps doublé, il n’y a pas de diplôme. Désactive-le et gagne ton diplôme !" },
    ru: { lab: "⏱️ Двойное время (для тренировки – без диплома)", info: "Двойное время: всего {m} мин., {s} сек. на пример. Диплома в этом режиме нет.", fertig: "Всё верно – супер! С двойным временем диплома нет. Выключи двойное время и получи диплом!" },
    ar: { lab: "⏱️ وقت مضاعف (للتدرّب – بدون شهادة)", info: "وقت مضاعف: {m} دقيقة إجمالًا و{s} ثانية لكل مسألة. لا توجد شهادة في هذا الوضع.", fertig: "كل الإجابات صحيحة – رائع! مع الوقت المضاعف لا توجد شهادة. أوقف الوقت المضاعف واحصل على شهادتك!" },
    ja: { lab: "⏱️ 時間 2 倍（練習用――賞状なし）", info: "時間 2 倍：全部で {m} 分、1 問 {s} 秒。このモードでは賞状は出ません。", fertig: "全問正解、すごい！時間 2 倍では賞状は出ません。2 倍をオフにして賞状をもらおう！" },
    pt: { lab: "⏱️ Tempo a dobrar (para treinar – sem diploma)", info: "Tempo a dobrar: {m} minutos no total, {s} segundos por conta. Neste modo não há diploma.", fertig: "Tudo certo – fantástico! Com tempo a dobrar não há diploma. Desliga o tempo a dobrar e ganha o teu diploma!" }
  };
  function L(){ var l = (typeof aktivSprache !== "undefined" && aktivSprache) || "de"; return TX[l] ? l : "de"; }
  function T(k, v){ var s = TX[L()][k]; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  var an = false; try { an = localStorage.getItem("msEEDoppelt") === "1"; } catch(e){}
  window.MS_EE_DOPPELT = function(){ return an; };

  var origNeu = neueAufgaben;
  neueAufgaben = function(){
    origNeu.apply(this, arguments);
    if(an){
      GESAMTZEIT *= 2; FRAGENZEIT *= 2; timerSekunden = GESAMTZEIT;
      try { aktualisiereTimerAnzeige(); } catch(e){}
    }
    info();
  };
  var origDiplom = zeigeDiplom;
  zeigeDiplom = function(){
    if(!an) return origDiplom.apply(this, arguments);
    var msg = document.getElementById("ergebnisMsg");
    if(msg){ msg.textContent = T("fertig"); msg.className = "gut"; }
  };
  var css = document.createElement("style");
  css.textContent = ".ee2{display:flex;flex-direction:column;align-items:center;gap:4px;margin:8px auto 0;font:700 16px system-ui,sans-serif;color:#1a2233}" +
    ".ee2 label{display:inline-flex;align-items:center;gap:8px;cursor:pointer;background:#fff;border:2px solid #b0b0b8;border-radius:999px;padding:6px 14px}" +
    ".ee2 input{width:20px;height:20px;margin:0}.ee2.an label{border-color:#d97706;background:#fef3c7}.ee2 small{font-weight:600;color:#7c2d12;max-width:560px;text-align:center}@media print{.ee2{display:none}}";
  document.head.appendChild(css);
  var box = null;
  function info(){
    if(!box) return;
    box.classList.toggle("an", an);
    box.querySelector("span").textContent = T("lab");
    var sm = box.querySelector("small");
    if(an){ var g = typeof GESAMTZEIT !== "undefined" ? GESAMTZEIT : 0, f = typeof FRAGENZEIT !== "undefined" ? FRAGENZEIT : 0; sm.textContent = T("info", { m: Math.round(g / 60), s: f }); sm.hidden = false; }
    else sm.hidden = true;
  }
  function einbauen(){
    var tb = document.querySelector(".toolbar"); if(!tb || box) return;
    box = document.createElement("div"); box.className = "ee2";
    box.innerHTML = '<label><input type="checkbox" id="ee2Box"' + (an ? " checked" : "") + '> <span></span></label><small hidden></small>';
    tb.insertAdjacentElement("afterend", box);
    box.querySelector("input").addEventListener("change", function(){
      an = this.checked; try { localStorage.setItem("msEEDoppelt", an ? "1" : "0"); } catch(e){}
      neueAufgaben();
    });
    // die Seite hat beim Laden schon Aufgaben gebaut – mit doppelter Zeit neu starten
    if(an) neueAufgaben(); else info();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(einbauen, 0); }); else setTimeout(einbauen, 0);
  var origSprache = sprache;
  sprache = function(){ origSprache.apply(this, arguments); info(); };
})();
