// ============================================================
// griechisch/app.js – Griechisches Alphabet
// Alphabet: 24 Karten (groß/klein, Nebenform, Name in der Menüsprache,
// Bedeutung in Mathe/Physik); antippen zeigt den Buchstaben groß.
// Üben: Name ↔ Zeichen, Groß ↔ klein, Bedeutung – je 4 Antworten zum
// Antippen (ein Versuch), Fragearten wählbar (localStorage "msGR").
// Daten und Texte: texte.js (GR_BUCH, GR_NAME, GR_BED, GR).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (GR[lang] && GR[lang][k]) || GR.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function misch(L){ L = L.slice(); for(var i = L.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), x = L[i]; L[i] = L[j]; L[j] = x; } return L; }
  function name(i){ return (GR_NAME[lang] || GR_NAME.de)[i]; }
  function bed(z){ var B = GR_BED[lang] || GR_BED.de; return B[z] || ""; }

  // ---------- Alphabet ----------
  var gewaehlt = 0;
  function alphabet(){
    var h = "";
    GR_BUCH.forEach(function(b, i){
      var m = [bed(b[1]), bed(b[0]) && bed(b[0]) !== bed(b[1]) ? b[0] + ": " + bed(b[0]) : ""].filter(Boolean);
      if(bed(b[0]) && !bed(b[1])) m = [b[0] + ": " + bed(b[0])];
      h += '<button type="button" class="gk' + (i === gewaehlt ? " an" : "") + '" data-i="' + i + '"><span class="gz" lang="el">' + b[0] + " " + b[1] + (b[2] ? '<small title="' + esc(t("neben")) + '"> ' + b[2] + "</small>" : "") +
        '</span><span class="gn">' + esc(name(i)) + "</span>" + (m.length ? '<span class="gb">' + esc(m.join(" · ")) + "</span>" : "") + "</button>";
    });
    $("karten").innerHTML = h;
    $("karten").querySelectorAll(".gk").forEach(function(b){ b.addEventListener("click", function(){ gewaehlt = +b.dataset.i; alphabet(); }); });
    var b = GR_BUCH[gewaehlt], mm = [];
    if(bed(b[1])) mm.push(b[1] + ": " + bed(b[1])); if(bed(b[0])) mm.push(b[0] + ": " + bed(b[0]));
    $("gross").innerHTML = '<span class="gg" lang="el">' + b[0] + " " + b[1] + (b[2] ? ' <span class="neben">' + b[2] + "</span>" : "") + '</span><span class="ggn">' + esc(name(gewaehlt)) + (b[2] ? ' <span class="muted">(' + esc(t("neben")) + ": " + b[2] + ")</span>" : "") + "</span>" +
      (mm.length ? '<span class="ggb"><b>' + esc(t("inMathe")) + "</b> " + esc(mm.join(" · ")) + "</span>" : "");
  }

  // ---------- Üben ----------
  var ARTEN = ["name", "zeichen", "gross", "bed"];
  var AN = (function(){ try { var a = JSON.parse(localStorage.getItem("msGR") || "null"); if(Array.isArray(a) && a.length) return a; } catch(e){} return ARTEN.slice(); })();
  // nur Buchstaben mit eindeutiger, unverwechselbarer Bedeutung (kein „Winkel“ doppelt)
  var BED_Z = ["Δ", "λ", "μ", "π", "ρ", "σ", "Σ", "ω", "Ω", "τ", "χ", "ν", "η"];
  var auf = null, punkte = 0, anzahl = 0, serie = 0, fertig = false;
  function artenHtml(){
    $("arten").innerHTML = "<b>" + esc(t("arten")) + "</b> " + ARTEN.map(function(a){ return '<button type="button" class="chip" data-a="' + a + '" aria-pressed="' + (AN.indexOf(a) >= 0) + '">' + esc(t("a_" + a)) + "</button>"; }).join("");
    $("arten").querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ var a = b.dataset.a, i = AN.indexOf(a); if(i >= 0){ if(AN.length > 1) AN.splice(i, 1); } else AN.push(a); try { localStorage.setItem("msGR", JSON.stringify(AN)); } catch(e){} artenHtml(); neueAufgabe(); }); });
  }
  function neueAufgabe(){
    var art = wahl(AN), i, opts, richtig;
    if(art === "bed"){
      var z = wahl(BED_Z); i = GR_BUCH.findIndex(function(b){ return b[0] === z || b[1] === z; });
      var andere = misch(BED_Z.filter(function(x){ return x !== z && bed(x) !== bed(z); })).slice(0, 3);
      auf = { art: art, i: i, z: z, opts: misch([z].concat(andere)).map(function(x){ return { k: x, t: bed(x) }; }), richtig: z };
    } else {
      do { i = Math.floor(Math.random() * 24); } while(auf && auf.i === i);
      var rest = misch(GR_BUCH.map(function(_, n){ return n; }).filter(function(n){ return n !== i; })).slice(0, 3), alle = misch([i].concat(rest));
      var klein = Math.random() < 0.6;
      if(art === "name") opts = alle.map(function(n){ return { k: n, t: name(n) }; });
      else if(art === "zeichen") opts = alle.map(function(n){ return { k: n, t: GR_BUCH[n][klein ? 1 : 0], gr: 1 }; });
      else opts = alle.map(function(n){ return { k: n, t: GR_BUCH[n][0], gr: 1 }; });
      auf = { art: art, i: i, klein: klein, opts: opts, richtig: i };
    }
    fertig = false; zeige();
  }
  function frage(){
    var A = auf, b = GR_BUCH[A.i];
    if(A.art === "name") return { t: t("q_name"), gross: A.klein ? b[1] : b[0] };
    if(A.art === "zeichen") return { t: t("q_zeichen", { n: name(A.i) }) };
    if(A.art === "gross") return { t: t("q_gross", { z: b[1] }), gross: b[1] };
    return { t: t("q_bed", { z: A.z }), gross: A.z };
  }
  function loesungText(){ var A = auf, b = GR_BUCH[A.i]; return A.art === "bed" ? A.z + " = " + bed(A.z) : b[0] + " " + b[1] + " = " + name(A.i); }
  function zeige(){
    if(!auf) return;
    var F = frage();
    $("frage").textContent = F.t;
    $("fzeichen").innerHTML = F.gross ? '<span lang="el">' + esc(F.gross) + "</span>" : ""; sicht($("fzeichen"), !!F.gross);
    $("optionen").innerHTML = auf.opts.map(function(o, n){ return '<button type="button" class="opt' + (o.gr ? " gr" : "") + '" data-n="' + n + '"' + (o.gr ? ' lang="el"' : "") + ">" + esc(o.t) + "</button>"; }).join("");
    $("optionen").querySelectorAll(".opt").forEach(function(b){ b.addEventListener("click", function(){ antwort(+b.dataset.n); }); });
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
    $("weiter").textContent = t("weiter");
    var m = $("meldung"); if(!fertig){ m.className = "meldung"; m.textContent = ""; }
  }
  function markieren(){
    var n = auf.n, ok = auf.opts[n].k === auf.richtig, m = $("meldung");
    $("optionen").querySelectorAll(".opt").forEach(function(b, k){ b.disabled = true; if(auf.opts[k].k === auf.richtig) b.classList.add("richtig"); else if(k === n) b.classList.add("falsch"); });
    if(ok){ m.className = "meldung gut"; m.textContent = t("richtig") + " " + loesungText(); }
    else { m.className = "meldung schlecht"; m.textContent = t("falsch", { l: loesungText() }); }
    return ok;
  }
  function antwort(n){
    if(fertig) return; fertig = true; anzahl++; auf.n = n;
    var ok = markieren();
    if(ok){ punkte++; serie++; } else serie = 0;
    if(typeof msRichtig === "function" && ok) try { msRichtig(); } catch(e){}
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
  }
  $("weiter").addEventListener("click", neueAufgabe);
  document.addEventListener("keydown", function(e){
    if(tab !== "ueben" || e.target.tagName === "INPUT") return;
    if(e.key === "Enter" && fertig){ e.preventDefault(); neueAufgabe(); }
    else if(!fertig && /^[1-4]$/.test(e.key)){ antwort(+e.key - 1); }
  });

  // ---------- Reiter & Texte ----------
  var tab = "alpha", TABS = ["alpha", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("intro").textContent = t("intro");
    alphabet(); artenHtml();
    if(auf){ zeige(); if(fertig) markieren(); }
  }
  window.MS_LANG = { apply: function(l){ if(GR[l]){ lang = l; alles(); } } };
  alles();
})();
