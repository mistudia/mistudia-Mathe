// ============================================================
// seitenzoom.js – Lupen-Knopf (unter dem Haus-Knopf bzw. oben links auf der Startseite):
// zeigt, wie man die Seite vergrößert/verkleinert (Strg +/−/0, ⌘ am Mac, Strg + Mausrad,
// zwei Finger am Handy) und bietet einen eigenen Regler 50–200 % (CSS zoom am <body>,
// gemerkt in localStorage "msZoom"). 9 Sprachen.
// ============================================================
(function(){
  if(window.MS_SEITENZOOM) return; window.MS_SEITENZOOM = true;
  var TX = {
    de: ["Seite vergrößern oder verkleinern", "Am Computer: Strg und + (größer), Strg und − (kleiner), Strg und 0 (normal). Am Mac ⌘ statt Strg. Oder Strg gedrückt halten und am Mausrad drehen.", "Am Handy oder Tablet: mit zwei Fingern auseinanderziehen (größer) oder zusammenschieben (kleiner).", "Oder hier mit dem Regler:", "Normal", "Schließen"],
    en: ["Make the page bigger or smaller", "On a computer: Ctrl and + (bigger), Ctrl and − (smaller), Ctrl and 0 (normal). On a Mac use ⌘ instead of Ctrl. Or hold Ctrl and turn the mouse wheel.", "On a phone or tablet: spread two fingers apart (bigger) or pinch them together (smaller).", "Or use the slider here:", "Normal", "Close"],
    es: ["Agrandar o reducir la página", "En el ordenador: Ctrl y + (más grande), Ctrl y − (más pequeño), Ctrl y 0 (normal). En Mac, ⌘ en lugar de Ctrl. O mantén pulsado Ctrl y gira la rueda del ratón.", "En el móvil o la tableta: separa dos dedos (más grande) o júntalos (más pequeño).", "O con el control deslizante:", "Normal", "Cerrar"],
    zh: ["放大或缩小页面", "电脑上：Ctrl 和 +（放大），Ctrl 和 −（缩小），Ctrl 和 0（正常）。Mac 上用 ⌘ 代替 Ctrl。也可以按住 Ctrl 转动鼠标滚轮。", "手机或平板上：两指分开（放大）或捏合（缩小）。", "或者用这里的滑块：", "正常", "关闭"],
    fr: ["Agrandir ou réduire la page", "Sur ordinateur : Ctrl et + (plus grand), Ctrl et − (plus petit), Ctrl et 0 (normal). Sur Mac, ⌘ au lieu de Ctrl. Ou maintenir Ctrl et tourner la molette de la souris.", "Sur téléphone ou tablette : écarter deux doigts (plus grand) ou les rapprocher (plus petit).", "Ou avec le curseur ici :", "Normal", "Fermer"],
    ru: ["Увеличить или уменьшить страницу", "На компьютере: Ctrl и + (больше), Ctrl и − (меньше), Ctrl и 0 (обычный размер). На Mac ⌘ вместо Ctrl. Или удерживать Ctrl и крутить колёсико мыши.", "На телефоне или планшете: развести два пальца (больше) или свести их (меньше).", "Или ползунком здесь:", "Обычно", "Закрыть"],
    ar: ["تكبير الصفحة أو تصغيرها", "على الحاسوب: Ctrl و+ (تكبير)، Ctrl و− (تصغير)، Ctrl و0 (الحجم العادي). على Mac استخدم ⌘ بدل Ctrl. أو اضغط Ctrl مع تدوير عجلة الفأرة.", "على الهاتف أو الجهاز اللوحي: باعد بين إصبعين (تكبير) أو قرّبهما (تصغير).", "أو بالمؤشر هنا:", "عادي", "إغلاق"],
    ja: ["ページを大きく・小さくする", "パソコン：Ctrl と +（大きく）、Ctrl と −（小さく）、Ctrl と 0（元にもどす）。Mac では Ctrl のかわりに ⌘。Ctrl をおしたままマウスホイールを回してもできます。", "スマホ・タブレット：2 本の指を広げる（大きく）か、つまむ（小さく）。", "ここのスライダーでもできます：", "標準", "閉じる"],
    pt: ["Aumentar ou diminuir a página", "No computador: Ctrl e + (maior), Ctrl e − (menor), Ctrl e 0 (normal). No Mac, ⌘ em vez de Ctrl. Ou mantenha Ctrl premido e rode a roda do rato.", "No telemóvel ou tablet: afaste dois dedos (maior) ou junte-os (menor).", "Ou com o cursor aqui:", "Normal", "Fechar"]
  };
  var lang = window.MS_MATH_LANG; try { lang = lang || localStorage.getItem("msMathLang"); } catch(e){}
  var T = TX[lang] || TX.de, rtl = lang === "ar";
  var stufe = 100; try { stufe = +localStorage.getItem("msZoom") || 100; } catch(e){}
  function setze(p){
    stufe = Math.max(50, Math.min(200, Math.round(p / 10) * 10));
    document.body.style.zoom = stufe === 100 ? "" : String(stufe / 100);
    try { localStorage.setItem("msZoom", String(stufe)); } catch(e){}
    var r = document.getElementById("msZoomR"), z = document.getElementById("msZoomZ"); if(r) r.value = stufe; if(z) z.textContent = stufe + " %";
  }
  var css = document.createElement("style");
  css.textContent = ".ms-zoom-btn{position:absolute;left:10px;z-index:2147483000;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;color:#1565c0;border:2px solid #1565c0;box-shadow:0 2px 8px rgba(0,0,0,.22);cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent}" +
    ".ms-zoom-btn:hover{background:#e8f1ff}.ms-zoom-btn svg{width:24px;height:24px}" +
    ".ms-zoom-ov{position:fixed;inset:0;z-index:2147483100;background:rgba(15,23,42,.35);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:70px 12px 20px}" +
    ".ms-zoom-k{background:#fff;color:#1a2233;border-radius:14px;max-width:440px;width:100%;padding:16px 18px;box-shadow:0 8px 30px rgba(0,0,0,.3);font:16px/1.45 system-ui,sans-serif;max-height:90vh;max-height:90dvh;overflow-y:auto}" +
    ".ms-zoom-k h2{margin:0 0 8px;font-size:19px;color:#1565c0}.ms-zoom-k p{margin:6px 0}.ms-zoom-k kbd{display:inline-block;border:1px solid #b0b0b8;border-bottom-width:2px;border-radius:5px;padding:0 5px;font:600 14px system-ui,sans-serif;background:#f8fafc}" +
    ".ms-zoom-z{display:flex;align-items:center;gap:8px;margin:8px 0}.ms-zoom-z input{flex:1}.ms-zoom-z button,.ms-zoom-k .ms-zoom-zu{font:700 16px system-ui,sans-serif;border:2px solid #b0b0b8;background:#fff;color:#1a2233;border-radius:999px;min-width:40px;height:36px;cursor:pointer}" +
    ".ms-zoom-k .ms-zoom-zu{width:100%;margin-top:8px;background:#1565c0;border-color:#1565c0;color:#fff}@media print{.ms-zoom-btn{display:none!important}}";
  document.head.appendChild(css);
  var b = document.createElement("button"); b.type = "button"; b.className = "ms-zoom-btn"; b.title = T[0]; b.setAttribute("aria-label", T[0]);
  b.style.top = document.querySelector(".ms-home-btn") ? "62px" : "10px";
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M7 10h6M10 7v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  document.body.appendChild(b);
  function kbd(s){ return s.replace(/(Ctrl|Strg|⌘|\+|−|0)(?=[ ,.(（）)、，]|$)/g, function(x){ return "<kbd>" + x + "</kbd>"; }); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  b.addEventListener("click", function(){
    try { var l2 = localStorage.getItem("msMathLang"); if(TX[l2]){ T = TX[l2]; rtl = l2 === "ar"; } } catch(e){}
    var ov = document.createElement("div"); ov.className = "ms-zoom-ov"; if(rtl) ov.dir = "rtl";
    ov.innerHTML = '<div class="ms-zoom-k" role="dialog" aria-label="' + esc(T[0]) + '"><h2>' + esc(T[0]) + "</h2><p>" + kbd(esc(T[1])) + "</p><p>" + esc(T[2]) + "</p><p><b>" + esc(T[3]) + '</b></p><div class="ms-zoom-z" dir="ltr"><button type="button" data-d="-10">−</button><input type="range" id="msZoomR" min="50" max="200" step="10"><button type="button" data-d="10">+</button><b id="msZoomZ"></b></div>' +
      '<p><button type="button" class="ms-zoom-zu" data-n="1">' + esc(T[4]) + ' (100 %)</button><button type="button" class="ms-zoom-zu" data-x="1">' + esc(T[5]) + "</button></p></div>";
    document.body.appendChild(ov); setze(stufe);
    ov.addEventListener("click", function(e){
      var t = e.target;
      if(t === ov || t.getAttribute("data-x")) ov.remove();
      else if(t.getAttribute("data-n")) setze(100);
      else if(t.getAttribute("data-d")) setze(stufe + +t.getAttribute("data-d"));
    });
    document.getElementById("msZoomR").addEventListener("input", function(){ setze(+this.value); });
    document.addEventListener("keydown", function weg(e){ if(e.key === "Escape"){ ov.remove(); document.removeEventListener("keydown", weg); } });
  });
  if(stufe !== 100) setze(stufe);
})();
