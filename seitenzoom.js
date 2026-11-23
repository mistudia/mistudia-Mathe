// ============================================================
// seitenzoom.js – immer sichtbare Zoom-Leiste am rechten Rand (alle Seiten der Mathe-App):
// + oben, senkrechter Regler 50–200 %, − unten, Prozentanzeige; Lupe öffnet einen kurzen Hinweis
// zu den Tastenkürzeln (Strg + / Strg − / Strg 0, ⌘ am Mac, Strg + Mausrad).
// CSS zoom am <body>, gemerkt in localStorage "msZoom"; die Leiste selbst wird gegenskaliert,
// damit sie immer gleich groß bleibt. 9 Sprachen.
// ============================================================
(function(){
  if(window.MS_SEITENZOOM) return; window.MS_SEITENZOOM = true;
  var TX = {
    de: ["Seite vergrößern oder verkleinern", "Mit der Tastatur: Strg und + (größer), Strg und − (kleiner), Strg und 0 (normal). Am Mac ⌘ statt Strg. Oder Strg gedrückt halten und am Mausrad drehen.", "Normal (100 %)", "Schließen", "größer", "kleiner"],
    en: ["Make the page bigger or smaller", "With the keyboard: Ctrl and + (bigger), Ctrl and − (smaller), Ctrl and 0 (normal). On a Mac use ⌘ instead of Ctrl. Or hold Ctrl and turn the mouse wheel.", "Normal (100 %)", "Close", "bigger", "smaller"],
    es: ["Agrandar o reducir la página", "Con el teclado: Ctrl y + (más grande), Ctrl y − (más pequeño), Ctrl y 0 (normal). En Mac, ⌘ en lugar de Ctrl. O mantén pulsado Ctrl y gira la rueda del ratón.", "Normal (100 %)", "Cerrar", "más grande", "más pequeño"],
    zh: ["放大或缩小页面", "键盘：Ctrl 和 +（放大），Ctrl 和 −（缩小），Ctrl 和 0（正常）。Mac 上用 ⌘ 代替 Ctrl。也可以按住 Ctrl 转动鼠标滚轮。", "正常（100 %）", "关闭", "放大", "缩小"],
    fr: ["Agrandir ou réduire la page", "Au clavier : Ctrl et + (plus grand), Ctrl et − (plus petit), Ctrl et 0 (normal). Sur Mac, ⌘ au lieu de Ctrl. Ou maintenir Ctrl et tourner la molette de la souris.", "Normal (100 %)", "Fermer", "plus grand", "plus petit"],
    ru: ["Увеличить или уменьшить страницу", "С клавиатуры: Ctrl и + (больше), Ctrl и − (меньше), Ctrl и 0 (обычный размер). На Mac ⌘ вместо Ctrl. Или удерживать Ctrl и крутить колёсико мыши.", "Обычно (100 %)", "Закрыть", "больше", "меньше"],
    ar: ["تكبير الصفحة أو تصغيرها", "بلوحة المفاتيح: Ctrl و+ (تكبير)، Ctrl و− (تصغير)، Ctrl و0 (الحجم العادي). على Mac استخدم ⌘ بدل Ctrl. أو اضغط Ctrl مع تدوير عجلة الفأرة.", "عادي (100 %)", "إغلاق", "تكبير", "تصغير"],
    ja: ["ページを大きく・小さくする", "キーボード：Ctrl と +（大きく）、Ctrl と −（小さく）、Ctrl と 0（元にもどす）。Mac では Ctrl のかわりに ⌘。Ctrl をおしたままマウスホイールを回してもできます。", "標準（100 %）", "閉じる", "大きく", "小さく"],
    pt: ["Aumentar ou diminuir a página", "Com o teclado: Ctrl e + (maior), Ctrl e − (menor), Ctrl e 0 (normal). No Mac, ⌘ em vez de Ctrl. Ou mantenha Ctrl premido e rode a roda do rato.", "Normal (100 %)", "Fechar", "maior", "menor"]
  };
  function sprache(){ var l = window.MS_MATH_LANG; try { l = localStorage.getItem("msMathLang") || l; } catch(e){} return TX[l] ? l : "de"; }
  var stufe = 100; try { stufe = +localStorage.getItem("msZoom") || 100; } catch(e){}
  var leiste;
  function setze(p){
    stufe = Math.max(50, Math.min(200, Math.round(p / 10) * 10));
    document.body.style.zoom = stufe === 100 ? "" : String(stufe / 100);
    if(leiste) leiste.style.zoom = stufe === 100 ? "" : String(100 / stufe);
    try { localStorage.setItem("msZoom", String(stufe)); } catch(e){}
    var r = document.getElementById("msZoomR"), z = document.getElementById("msZoomZ"); if(r) r.value = stufe; if(z) z.textContent = stufe + "%";
  }
  var css = document.createElement("style");
  css.textContent =
    ".ms-zl{position:fixed;right:4px;top:50%;transform:translateY(-50%);z-index:2147482900;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 3px;background:rgba(255,255,255,.92);border:2px solid #b0b0b8;border-radius:22px;box-shadow:0 2px 8px rgba(0,0,0,.18);width:36px;box-sizing:border-box}" +
    ".ms-zl button{width:28px;height:28px;border-radius:50%;border:2px solid #1565c0;background:#fff;color:#1565c0;font:800 18px/1 system-ui,sans-serif;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}" +
    ".ms-zl button:hover{background:#e8f1ff}.ms-zl svg{width:18px;height:18px}" +
    ".ms-zl input{writing-mode:vertical-lr;direction:rtl;-webkit-appearance:slider-vertical;width:22px;height:120px;margin:2px 0;accent-color:#1565c0;cursor:pointer}" +
    ".ms-zl b{font:700 10px system-ui,sans-serif;color:#1a2233}" +
    "@media (hover:none) and (pointer:coarse){.ms-zl .ms-zl-kb{display:none}}@media (max-height:420px){.ms-zl input{height:70px}}@media print{.ms-zl{display:none!important}}" +
    ".ms-zoom-ov{position:fixed;inset:0;z-index:2147483100;background:rgba(15,23,42,.35);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:70px 12px 20px}" +
    ".ms-zoom-k{background:#fff;color:#1a2233;border-radius:14px;max-width:420px;width:100%;padding:16px 18px;box-shadow:0 8px 30px rgba(0,0,0,.3);font:16px/1.45 system-ui,sans-serif;max-height:90vh;max-height:90dvh;overflow-y:auto}" +
    ".ms-zoom-k h2{margin:0 0 8px;font-size:19px;color:#1565c0}.ms-zoom-k p{margin:6px 0}.ms-zoom-k kbd{display:inline-block;border:1px solid #b0b0b8;border-bottom-width:2px;border-radius:5px;padding:0 5px;font:600 14px system-ui,sans-serif;background:#f8fafc}" +
    ".ms-zoom-k .ms-zoom-zu{font:700 16px system-ui,sans-serif;width:100%;margin-top:8px;height:38px;border-radius:999px;cursor:pointer;border:2px solid #1565c0;background:#1565c0;color:#fff}.ms-zoom-k .ms-zoom-zu.hell{background:#fff;color:#1565c0}";
  document.head.appendChild(css);
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function kbd(s){ return s.replace(/(Ctrl|Strg|⌘|\+|−|0)(?=[ ,.(（）)、，]|$)/g, function(x){ return "<kbd>" + x + "</kbd>"; }); }
  // ⌨ Tastenkürzel-Übersicht (/tastenkuerzel.js, auch in VocabBoss) – ersetzt den alten Zoom-Hinweis
  function tkLaden(f){
    if(window.TK_OEFFNEN) return f();
    var sc = document.querySelector('script[src="/tastenkuerzel.js"]');
    if(!sc){ sc = document.createElement("script"); sc.src = "/tastenkuerzel.js"; document.head.appendChild(sc); }
    sc.addEventListener("load", f);
  }
  var TKT = { de: "Tastenkürzel", en: "Keyboard shortcuts", es: "Atajos de teclado", zh: "键盘快捷键", fr: "Raccourcis clavier", ru: "Сочетания клавиш", ar: "اختصارات لوحة المفاتيح", ja: "キーボードショートカット", pt: "Atalhos de teclado" };
  function hilfe(){ tkLaden(function(){ window.TK_OEFFNEN({ lang: sprache(), reset: function(){ setze(100); } }); }); }
  function hilfeAlt(){
    var T = TX[sprache()], ov = document.createElement("div"); ov.className = "ms-zoom-ov"; if(sprache() === "ar") ov.dir = "rtl";
    ov.innerHTML = '<div class="ms-zoom-k" role="dialog" aria-label="' + esc(T[0]) + '"><h2>' + esc(T[0]) + "</h2><p>" + kbd(esc(T[1])) + '</p><p><button type="button" class="ms-zoom-zu hell" data-n="1">' + esc(T[2]) + '</button><button type="button" class="ms-zoom-zu" data-x="1">' + esc(T[3]) + "</button></p></div>";
    document.body.appendChild(ov);
    ov.addEventListener("click", function(e){ var t = e.target; if(t === ov || t.getAttribute("data-x")) ov.remove(); else if(t.getAttribute("data-n")) setze(100); });
    document.addEventListener("keydown", function weg(e){ if(e.key === "Escape"){ ov.remove(); document.removeEventListener("keydown", weg); } });
  }
  function bauen(){
    var T = TX[sprache()];
    leiste = document.createElement("div"); leiste.className = "ms-zl"; leiste.setAttribute("role", "group"); leiste.setAttribute("aria-label", T[0]);
    leiste.innerHTML = '<button type="button" data-d="10" title="' + esc(T[4]) + '" aria-label="' + esc(T[4]) + '">+</button><input type="range" id="msZoomR" min="50" max="200" step="10" aria-label="' + esc(T[0]) + '" data-nofit data-nonav><button type="button" data-d="-10" title="' + esc(T[5]) + '" aria-label="' + esc(T[5]) + '">−</button><b id="msZoomZ"></b>' +
      '<button type="button" data-h="1" title="' + esc(T[0]) + '" aria-label="' + esc(T[0]) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg></button>' +
      '<button type="button" data-h="1" class="ms-zl-kb" title="' + esc(TKT[sprache()] || TKT.de) + '" aria-label="' + esc(TKT[sprache()] || TKT.de) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 10h1.6M9.2 10h1.6M12.4 10h1.6M15.6 10h2.4M6 13.4h2M16 13.4h2M9.4 13.4h5.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg></button>';
    document.body.appendChild(leiste);
    leiste.addEventListener("click", function(e){ var b = e.target.closest("button"); if(!b) return; if(b.getAttribute("data-h")) hilfe(); else setze(stufe + +b.getAttribute("data-d")); });
    document.getElementById("msZoomR").addEventListener("input", function(){ setze(+this.value); });
    setze(stufe);
  }
  if(document.body) bauen(); else document.addEventListener("DOMContentLoaded", bauen);
})();
