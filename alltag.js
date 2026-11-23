// ============================================================
// /alltag.js – Knopf „Aus dem Alltag“ mit Beispielkarten (9 Sprachen)
// für die Kacheln ohne Funktionen-Lexikon (Prozent, Flächen, Trigonometrie …).
//   MS_ALLTAG.einbauen({ nach: Element, daten: {de: [[Titel, Situation, Lösung], …], …},
//                        werte: [w0, w1, …] (optional), laden: function(w){…} (optional) })
//                        loesBild: [f0, f1, …] (optional, HTML-Bild unter der Lösung, z. B. Pfeildarstellung)
//     → Knopf hinter „nach“; jede Karte: Situation, aufklappbare Lösung,
//       bei vorhandenem Wert ein Knopf „Ausprobieren“, der laden(w) aufruft.
//   MS_ALLTAG.sprache(l) – bei jedem Sprachwechsel aufrufen (Knopf + offenes Fenster).
// Textauszeichnung: $…$ = Formel (links-nach-rechts), Zeilenumbruch \n.
// ============================================================
var MS_ALLTAG = (function(){
  "use strict";
  var UI = {
    de: { titel: "Aus dem Alltag", loesung: "Lösung zeigen", probieren: "Ausprobieren", zu: "Schließen" },
    en: { titel: "Everyday examples", loesung: "Show solution", probieren: "Try it", zu: "Close" },
    es: { titel: "Ejemplos de la vida real", loesung: "Ver solución", probieren: "Probar", zu: "Cerrar" },
    zh: { titel: "生活中的例子", loesung: "显示解答", probieren: "试一试", zu: "关闭" },
    fr: { titel: "Exemples de la vie courante", loesung: "Voir la solution", probieren: "Essayer", zu: "Fermer" },
    ru: { titel: "Примеры из жизни", loesung: "Показать решение", probieren: "Попробовать", zu: "Закрыть" },
    ar: { titel: "أمثلة من الحياة اليومية", loesung: "عرض الحل", probieren: "جرّب", zu: "إغلاق" },
    ja: { titel: "身近な例", loesung: "解答を見る", probieren: "ためしてみる", zu: "閉じる" },
    pt: { titel: "Exemplos do dia a dia", loesung: "Ver solução", probieren: "Experimentar", zu: "Fechar" }
  };
  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  var boxen = [], offen = null;
  function ui(k){ return (UI[lang] || UI.de)[k]; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function text(s){ return esc(s).replace(/ %/g, " %").replace(/\$([^$]+)\$/g, '<bdi dir="ltr">$1</bdi>').replace(/\n/g, "<br>"); }
  function liste(B){ return B.daten[lang] || B.daten.de; }

  function zeigen(B){
    schliessen(); offen = B;
    var ov = document.createElement("div"); ov.className = "msa-ov"; ov.dir = lang === "ar" ? "rtl" : "ltr";
    var h = '<div class="msa-karte" role="dialog" aria-modal="true"><div class="msa-kopf"><h2>' + esc(ui("titel")) + '</h2><button type="button" class="msa-zu" aria-label="' + esc(ui("zu")) + '">×</button></div><div class="msa-liste">';
    liste(B).forEach(function(e, i){
      h += '<div class="msa-bsp"><h3>' + esc(e[0]) + "</h3><p>" + text(e[1]) + "</p>";
      var bf = bilder(B); if(bf && bf[i]){ try { h += '<div class="msa-bild">' + bf[i]() + "</div>"; } catch(x){} }
      var lb = ""; if(B.loesBild && B.loesBild[i]){ try { lb = '<div class="msa-lbild" dir="ltr">' + B.loesBild[i]() + "</div>"; } catch(x){} }
      // 🆕 23.11.: „Ausprobieren“ rechnet die Aufgabe sofort aus → erst nach „Lösung zeigen“
      var los = (B.laden && B.werte && B.werte[i] != null) ? '<button type="button" class="msa-los" data-i="' + i + '">' + esc(ui("probieren")) + "</button>" : "";
      if(e[2]) h += '<details><summary>' + esc(ui("loesung")) + "</summary><p>" + text(e[2]) + "</p>" + lb + los + "</details>";
      else h += los;
      h += "</div>";
    });
    ov.innerHTML = h + "</div></div>";
    document.body.appendChild(ov);
    ov.addEventListener("click", function(ev){ if(ev.target === ov) schliessen(); });
    ov.querySelector(".msa-zu").addEventListener("click", schliessen);
    ov.querySelectorAll(".msa-los").forEach(function(b){ b.addEventListener("click", function(){ var w = B.werte[+b.dataset.i]; schliessen(); B.laden(w); }); });
    ov.querySelector(".msa-zu").focus();
  }
  // Zeichnungen aus /alltag-bilder.js (Schlüssel = B.bild oder Ordnername der Kachel)
  function bilder(B){ var M = window.MS_ALLTAG_BILD; if(!M) return null; var k = B.bild || (location.pathname.split("/").filter(Boolean)[0] || ""); return M[k] || null; }
  function bilderLaden(){ if(window.MS_ALLTAG_BILD || document.querySelector('script[src="/alltag-bilder.js"]')) return; var sc = document.createElement("script"); sc.src = "/alltag-bilder.js"; sc.onload = function(){ if(offen) zeigen(offen); }; document.head.appendChild(sc); }
  function schliessen(){ var o = document.querySelector(".msa-ov"); if(o) o.remove(); offen = null; }
  document.addEventListener("keydown", function(ev){ if(ev.key === "Escape") schliessen(); });

  function einbauen(B){
    var k = document.createElement("button"); k.type = "button"; k.className = "msa-knopf";
    k.addEventListener("click", function(){ zeigen(B); });
    B.nach.parentNode.insertBefore(k, B.nach.nextSibling);
    B.knopf = k; boxen.push(B); k.textContent = ui("titel"); bilderLaden();
    // Sprachwechsel der Kachel automatisch mitnehmen
    var A = window.MS_LANG;
    if(A && A.apply && !A._msa){ var alt = A.apply; A.apply = function(l){ var r = alt.apply(A, arguments); sprache(l); return r; }; A._msa = true; }
    return k;
  }
  function sprache(l){
    if(UI[l]) lang = l;
    boxen.forEach(function(B){ B.knopf.textContent = ui("titel"); });
    if(offen){ var B = offen; zeigen(B); }
  }
  var css = document.createElement("style");
  css.textContent =
    ".msa-knopf{display:block;margin:8px auto 10px;font:700 15px system-ui,sans-serif;padding:9px 18px;border-radius:999px;border:2px solid #0d9488;background:#f0fdfa;color:#0f766e;cursor:pointer}" +
    ".msa-knopf:hover{background:#0d9488;color:#ffffff}" +
    ".msa-ov{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:2147483001;overflow-y:auto;padding:16px 10px;box-sizing:border-box}" +
    ".msa-karte{max-width:680px;margin:0 auto;background:#ffffff;color:#1a2233;border-radius:16px;padding:14px 16px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
    ".msa-kopf{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}" +
    ".msa-kopf h2{margin:0;font-size:20px;color:#0f766e}" +
    ".msa-zu{font:700 24px system-ui,sans-serif;width:40px;height:40px;border-radius:50%;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;cursor:pointer;flex:none;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:none;margin:0}" +
    ".msa-liste{display:grid;gap:10px}" +
    ".msa-bsp{border:2px solid #c9d6ea;border-radius:12px;padding:10px 12px;background:#fbfdff}" +
    ".msa-bsp h3{margin:0 0 4px;font-size:17px;color:#0f766e}.msa-bsp p{margin:4px 0;font-size:16px;line-height:1.45;color:#1a2233}" +
    ".msa-bsp summary{cursor:pointer;color:#1565c0;font-weight:700;font-size:15px;margin-top:4px}" +
    ".msa-bsp details p{background:#f4f8ff;border-radius:8px;padding:6px 8px;font-size:15px}" +
    ".msa-lbild{margin:6px 0;text-align:center}.msa-lbild svg{max-width:100%;height:auto}" +
    ".msa-los{margin-top:6px;font:700 14px system-ui,sans-serif;padding:7px 14px;border-radius:999px;border:0;background:#1565c0;color:#ffffff;cursor:pointer}";
  document.head.appendChild(css);
  return { einbauen: einbauen, sprache: sprache, schliessen: schliessen, lang: function(){ return lang; }, boxen: function(){ return boxen; }, zeigen: zeigen };
})();
