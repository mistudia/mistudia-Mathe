// Kleine gemeinsame Bausteine für die Funktions-Seiten
var FS = (function(){
  "use strict";
  var t = FK.t;
  var FARBE = { f: "#1a2b6b", a1: "#16a34a", a2: "#ea580c", N: "#334155", H: "#e11d48", T: "#059669", W: "#7c3aed", S: "#7c3aed", Y: "#0284c7", V: "#e11d48", P: "#c2410c", ach: "#8aa6e6" };
  // Karten-Überschrift → passender Lexikon-Eintrag (i-Knopf)
  var KARTE = { dom: "defb", rng: "wertb", sym: "sym", inf: "unendl", ySchn: "achsab", nst: "nst", abl: "abl", ext: "extrem", wp: "wende", mon: "mono", kr: "wende",
                scheitel: "scheitel", diskr: "diskr", asym: "asym", luecken: "defl", anPol: "pol", form: "parabel", m: "steigung", b: "achsab" };
  function infoZu(titel){
    if(titel === "f(x)") return [FB.knopf("fx")];
    return titel.split(" / ").map(function(teil){
      for(var k in KARTE) if(t(k) === teil) return FB.knopf(KARTE[k]);
      return "";
    });
  }
  function karte(titel, html, key){
    var knoepfe = key ? [FB.knopf(key)] : infoZu(titel);
    return '<section class="karte"><h2>' + titel + knoepfe.join("") + '</h2>' + html + '</section>';
  }
  var mathe = FB.mathe; // Formelsatz: /funktionen/lexikon.js
  function f(s){ return '<span class="f" dir="ltr">' + mathe(s) + '</span>'; }
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
    window.MS_LANG = { apply: function(l){ FK.setLang(l); document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr"; render(); lexKnopf(); } };
  }
  function lexKnopf(){
    var fuss = document.querySelector(".footer"); if(!fuss) return;
    var b = document.getElementById("lexKnopf");
    if(!b){ b = document.createElement("button"); b.type = "button"; b.id = "lexKnopf"; b.className = "b-alle lex-knopf"; b.setAttribute("data-lex", "1"); fuss.parentNode.insertBefore(b, fuss); }
    b.textContent = FB.ui("lex");
  }


  // ---------- Rechenwege: farbiges Einsetzen ----------
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(n){ return String(n).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function ein(txt, farbe){ return '<b class="ein" style="color:' + farbe + '">' + txt + "</b>"; }
  // x: {b: Bruch|null, ex: Text|null, x: Zahl}
  function xRoh(x){ return x.b ? FK.btxt(x.b) : (x.ex != null ? x.ex : FK.zahl(x.x)); }
  function xEin(x, farbe){ // eingesetzt in einen Term: bei Bedarf in Klammern
    var s = xRoh(x);
    if(/^[−-]|\/|[+−] |√/.test(s) && !/^\d+(,\d+|\.\d+)?$/.test(s)) s = "(" + s + ")";
    return ein(s, farbe);
  }
  function termeEin(p, X){ // "3·(2)² − 12·(2) + 9"
    p = FK.trim(p); var out = [];
    for(var i = p.length - 1; i >= 0; i--){
      var c = p[i]; if(Bz.null(c) && p.length > 1) continue;
      var neg = c.n < 0, a = FK.B(Math.abs(c.n), c.d), ct = FK.btxt(a), s;
      if(i === 0) s = ct;
      else s = (a.n === 1 && a.d === 1 ? "" : ct + " · ") + X + (i > 1 ? hoch(i) : "");
      out.push(out.length ? (neg ? " " + FK.MINUS + " " : " + ") + s : (neg ? FK.MINUS : "") + s);
    }
    return out.join("") || "0";
  }
  function werteEin(p, xb){ // Einzelwerte der Terme, z. B. "12 − 24 + 9"
    p = FK.trim(p); var out = [];
    for(var i = p.length - 1; i >= 0; i--){
      if(Bz.null(p[i])) continue;
      var w = Bz.mul(p[i], pot(xb, i)), neg = w.n < 0, s = FK.btxt(FK.B(Math.abs(w.n), w.d));
      out.push(out.length ? (neg ? " " + FK.MINUS + " " : " + ") + s : (neg ? FK.MINUS : "") + s);
    }
    return out;
  }
  function pot(b, n){ var r = FK.B(1); for(var i = 0; i < n; i++) r = Bz.mul(r, b); return r; }
  var Bz = FK.Bz;
  // Zeilen für name(x) = … (HTML, schon gesetzt)
  function einsetzen(p, x, farbe, name){
    var X = xEin(x, farbe), z = [name + "(" + ein(xRoh(x), farbe) + ") = " + termeEin(p, X)];
    if(x.b){
      var w = werteEin(p, x.b), erg = FK.btxt(FK.wertB(p, x.b));
      if(w.length > 1) z.push("= " + w.join(""));
      if(w.length !== 1 || w[0] !== erg) z.push("= " + erg);
    } else {
      var v = FK.wertN(p, x.x), g = null;
      for(var d = 1; d <= 12 && !g; d++){ var n = Math.round(v * d); if(Math.abs(n / d - v) < 1e-9 * Math.max(1, Math.abs(v))) g = FK.B(n, d); }
      z.push(g ? "= " + FK.btxt(g) : "≈ " + FK.zahl(v));
    }
    return z.map(f).join("<br>");
  }
  function einsetzenBruch(Z, N, x, farbe){
    var X = xEin(x, farbe), z = ["f(" + ein(xRoh(x), farbe) + ") = (" + termeEin(Z, X) + ") / (" + termeEin(N, X) + ")"];
    if(x.b){
      var zw = FK.wertB(Z, x.b), nw = FK.wertB(N, x.b);
      z.push("= " + FK.btxt(zw) + " / " + (nw.n < 0 ? "(" + FK.btxt(nw) + ")" : FK.btxt(nw)));
      z.push("= " + FK.btxt(Bz.div(zw, nw)));
    } else z.push("≈ " + FK.zahl(FK.wertN(Z, x.x) / FK.wertN(N, x.x)));
    return z.map(f).join("<br>");
  }
  function rechenweg(schritte){
    return '<details class="rw"><summary>' + t("rwT") + '</summary><ol>' + schritte.map(function(s){
      return '<li><span class="rw-h">' + t(s[0]) + "</span><div>" + s[1] + "</div></li>";
    }).join("") + '</ol><div class="klein-text">' + t("rwFarbe") + "</div></details>";
  }
  function xListe(nst){ return nst.length ? "x = " + nst.map(FK.xtxt).join("; ") : "–"; }

  // ---------- Eingabehilfe + Live-Vorschau ----------
  // opts.text(eingabe) → Formeltext (wirft bei Fehler); opts.zeilen: [[Eingabe, Textschlüssel], …]
  var vorschauFn = null;
  function eingabeHilfe(opts){
    var form = document.getElementById("form"), inp = document.getElementById("eingabe");
    var q = document.createElement("button"); q.type = "button"; q.className = "knopf hell hilfe-knopf"; q.textContent = "?";
    form.insertBefore(q, inp.nextSibling);
    var v = document.createElement("div"); v.className = "vorschau"; v.id = "vorschau"; v.setAttribute("aria-live", "polite");
    form.appendChild(v);
    vorschauFn = function(){
      var s = inp.value.trim(), h = "";
      if(s){ try { h = f(opts.text(s)); } catch(e){ h = '<span class="vorschau-leer">…</span>'; } }
      v.innerHTML = h;
      q.setAttribute("aria-label", t("hilfeT")); q.title = t("hilfeT");
    };
    inp.addEventListener("input", vorschauFn);
    q.addEventListener("click", function(){
      var rows = opts.zeilen.map(function(z){
        var erg; try { erg = f(opts.text(z[0])); } catch(e){ erg = ""; }
        return "<tr><td><code>" + FB.esc(z[0]) + "</code></td><td>→</td><td>" + erg + '</td></tr><tr><td colspan="3" class="b-klein">' + t(z[1]) + "</td></tr>";
      }).join("");
      FB.popup(FB.esc(t("hilfeT")), '<table class="b-tab">' + rows + '</table><p class="b-klein">' + t("hVorschau") + "</p>");
    });
    vorschauFn();
  }
  function vorschau(){ if(vorschauFn) vorschauFn(); }
  function zahlEingabe(s){ // einzelne Zahl (auch 1/2, −3, 0,5)
    var p = FK.parse(s);
    if(FK.grad(p) > 0) throw { code: "errParse" };
    return p[0];
  }
  return { ein: ein, xEin: xEin, einsetzen: einsetzen, einsetzenBruch: einsetzenBruch, rechenweg: rechenweg, xListe: xListe, mathe: mathe, eingabeHilfe: eingabeHilfe, vorschau: vorschau, FARBE: FARBE, karte: karte, f: f, fleck: fleck, abschnitte: abschnitte, label: label, vollPunkt: vollPunkt, yKurz: yKurz, sprache: sprache, zahlEingabe: zahlEingabe };
})();
