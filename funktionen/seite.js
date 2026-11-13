// Kleine gemeinsame Bausteine für die Funktions-Seiten
var FS = (function(){
  "use strict";
  var t = FK.t;
  var FARBE = { f: "#1a2b6b", a1: "#16a34a", a2: "#ea580c", N: "#334155", H: "#e11d48", T: "#059669", W: "#7c3aed", S: "#7c3aed", Y: "#0284c7", V: "#e11d48", P: "#c2410c", ach: "#8aa6e6" };
  function karte(titel, html){ return '<section class="karte"><h2>' + titel + '</h2>' + html + '</section>'; }
  function f(s){ return '<span class="f" dir="ltr">' + s + '</span>'; }
  function fleck(farbe){ return '<span class="punkt-fleck" style="background:' + farbe + '"></span>'; }
  function grenze(z, links){ return z ? FK.xtxt(z) : (links ? FK.MINUS + FK.INF : FK.INF); }
  function abschnitte(liste, plus, minus, null_){
    return "<ul>" + liste.map(function(s){
      var name = s.s > 0 ? plus : s.s < 0 ? minus : null_;
      var iv = FK.intervall(grenze(s.l, true), grenze(s.r, false), !!s.l, !!s.r);
      return "<li>" + name + " " + t("auf") + " " + f(iv) + "</li>";
    }).join("") + "</ul>";
  }
  function yKurz(y){ return y.ex != null && y.ex.length <= 7 ? y.ex : FK.zahl(y.v); }
  function label(lbl, z, y){
    var xs = FK.xtxtKurz(z), ys = yKurz(y);
    return (xs.length + ys.length <= 10) ? FK.punkt(lbl, xs, ys) : lbl;
  }
  function vollPunkt(lbl, z, y){ return FK.punkt(lbl, FK.xtxt(z), FK.ytxt(y)); }
  // Sprache: Startmenü → home-button.js → MS_LANG.apply
  function sprache(render){
    window.MS_LANG = { apply: function(l){ FK.setLang(l); document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr"; render(); } };
  }
  function zahlEingabe(s){ // einzelne Zahl (auch 1/2, −3, 0,5)
    var p = FK.parse(s);
    if(FK.grad(p) > 0) throw { code: "errParse" };
    return p[0];
  }
  return { FARBE: FARBE, karte: karte, f: f, fleck: fleck, abschnitte: abschnitte, label: label, vollPunkt: vollPunkt, yKurz: yKurz, sprache: sprache, zahlEingabe: zahlEingabe };
})();
