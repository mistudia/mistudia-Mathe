// ============================================================
// funktionen/ueben.js – Übungsmodus für /linear/, /quadratisch/,
// /polynom/, /rational/. Zufällige Aufgaben mit glatten Ergebnissen,
// Schritt für Schritt; die erwarteten Antworten berechnet derselbe
// Kern (FK/FR), der auch die Untersuchung macht.
// Schritt-Arten: zahl, zahlen (Menge, ";"), punkt (x, y), poly, wahl.
// ============================================================
var FU = (function(){
  "use strict";
  var B = FK.B, Bz = FK.Bz, t = FK.t, M = FK.MINUS;
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function mischen(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function poly(koeff){ return FK.trim(koeff.map(function(c){ return typeof c === "number" ? B(c) : c; })); } // aufsteigend
  function lin(a, b){ return poly([B(-b), B(a)]); } // a·x − b  → (x − b) bei a = 1
  function f(s){ return '<span class="f" dir="ltr">' + s + '</span>'; }
  function eingabeTxt(p){ return FK.ptxt(p).replace(/−/g, "-"); }
  function klammerP(p){ var s = FK.ptxt(p); return FK.grad(p) >= 1 && / [+−] /.test(s) ? "(" + s + ")" : s; }
  // (x − 1)(x + 2)·x  – Linearfaktoren als Text, Faktor x zuerst
  function faktTxt(rs){
    rs = rs.slice().sort(function(a, b){ return (a === 0 ? -99 : a) - (b === 0 ? -99 : b); });
    return rs.map(function(r){ return r === 0 ? "x" : "(x " + (r > 0 ? M + " " + r : "+ " + (-r)) + ")"; }).join("");
  }
  var BRUECHE = [B(1, 2), B(-1, 2), B(3, 2), B(-3, 2), B(1, 3), B(-2, 3)];

  // ---------- Aufgaben ----------
  var GEN = {
    linear: function(){
      if(Math.random() < 0.6){
        var m = Math.random() < 0.7 ? B(wahl([-3, -2, -1, 1, 2, 3, 4])) : wahl(BRUECHE), b = B(zuf(-6, 6));
        var p = FK.trim([b, m]);
        return { text: "f(x) = " + FK.ptxt(p), eingabe: eingabeTxt(p), schritte: [
          { art: "zahl", q: "qM", h: "hM", soll: m },
          { art: "zahl", q: "qB", h: "hB", soll: b },
          { art: "zahlen", q: "qNst", h: "hNstLin", soll: [Bz.div(Bz.neg(b), m)] } ] };
      }
      var m2 = Math.random() < 0.6 ? B(wahl([-3, -2, -1, 1, 2, 3])) : wahl(BRUECHE);
      var x1 = zuf(-4, 3), d = wahl([1, 2, 3, 4]); if(m2.d > 1) d = m2.d * wahl([1, 2]);
      var y1 = zuf(-5, 5), x2 = x1 + d, y2 = Bz.add(B(y1), Bz.mul(m2, B(d)));
      var b2 = Bz.sub(B(y1), Bz.mul(m2, B(x1))), p2 = FK.trim([b2, m2]);
      var P1 = FK.punkt("P₁", FK.zahl(x1, 0), FK.zahl(y1, 0)), P2 = FK.punkt("P₂", FK.zahl(x2, 0), FK.btxt(y2));
      return { text: t("aufg2P", { p1: P1, p2: P2 }), eingabe: eingabeTxt(p2), schritte: [
        { art: "zahl", q: "qM", h: "h2Pm", soll: m2 },
        { art: "zahl", q: "qBb", h: "h2Pb", soll: b2 },
        { art: "zahlen", q: "qNst", h: "hNstLin", soll: [Bz.div(Bz.neg(b2), m2)] } ] };
    },
    quadratisch: function(){
      var a = wahl([B(1), B(-1), B(2), B(-2), B(1, 2), B(-1, 2)]), p;
      if(Math.random() < 0.75){
        var r1 = zuf(-5, 4), r2 = Math.random() < 0.15 ? r1 : zuf(r1 + 1, 6);
        p = FK.pmul(FK.pmul(poly([a]), lin(1, r1)), lin(1, r2));
      } else {
        var dd = zuf(-4, 4), e = (Bz.num(a) > 0 ? 1 : -1) * zuf(1, 5);
        p = FK.padd(FK.pmul(poly([a]), FK.pmul(lin(1, dd), lin(1, dd))), poly([e]));
      }
      var A = FK.analyse(p), xs = Bz.div(Bz.neg(p[1]), Bz.mul(B(2), p[2])), ys = FK.wertB(p, xs);
      var D = Bz.sub(Bz.mul(p[1], p[1]), Bz.mul(B(4), Bz.mul(p[2], p[0])));
      return { text: "f(x) = " + FK.ptxt(p), eingabe: eingabeTxt(p), schritte: [
        { art: "wahl", q: "qOeff", h: "hOeff", optionen: ["uOben", "uUnten"], soll: Bz.num(a) > 0 ? "uOben" : "uUnten" },
        { art: "punkt", q: "qS", h: "hS", soll: [xs, ys] },
        { art: "zahl", q: "qD", h: "hD", soll: D },
        { art: "zahlen", q: "qNst", h: "hNstQ", soll: A.nst.map(function(z){ return z.b; }) },
        { art: "zahl", q: "qY", h: "hY", soll: p[0] } ] };
    },
    polynom: function(){
      if(Math.random() < 0.3){
        var rs = mischen([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3).sort(function(u, v){ return u - v; }), k = wahl([1, -1]);
        var p0 = poly([k]); rs.forEach(function(r){ p0 = FK.pmul(p0, lin(1, r)); });
        return { text: "f(x) = " + (k < 0 ? M : "") + faktTxt(rs), eingabe: eingabeTxt(p0), schritte: [
          { art: "zahlen", q: "qNst", h: "hNstP", soll: rs.map(function(r){ return B(r); }) },
          { art: "zahl", q: "qY", h: "hY", soll: p0[0] } ] };
      }
      var u = zuf(-3, 2), v = zuf(u + 1, 3), kk = wahl([1, -1]), c = zuf(-5, 5);
      var p = poly([c, 6 * u * v * kk, -3 * (u + v) * kk, 2 * kk]);
      var A = FK.analyse(p), H = A.ext.filter(function(e){ return e.art === "H"; })[0], T = A.ext.filter(function(e){ return e.art === "T"; })[0], W = A.wp[0];
      var pk = function(e){ return [e.z.b, FK.wertB(p, e.z.b)]; };
      return { text: "f(x) = " + FK.ptxt(p), eingabe: eingabeTxt(p), schritte: [
        { art: "poly", q: "qA1", h: "hA1", soll: A.a1 },
        { art: "poly", q: "qA2", h: "hA2", soll: A.a2 },
        { art: "zahlen", q: "qKand", h: "hKand", soll: [B(u), B(v)] },
        { art: "punkt", q: "qH", h: "hH", soll: pk(H) },
        { art: "punkt", q: "qT", h: "hT", soll: pk(T) },
        { art: "punkt", q: "qW", h: "hW", soll: pk(W) } ] };
    },
    rational: function(){
      var v = zuf(1, 4), z, n, tx;
      if(v === 1){ // (a(x − z)) / (x − p)
        var pp = zuf(-4, 4), zz = zuf(-4, 4); while(zz === pp) zz = zuf(-4, 4); var a = wahl([1, 2, -1, 3]);
        z = FK.pmul(poly([a]), lin(1, zz)); n = lin(1, pp);
      } else if(v === 2){ // hebbare Lücke
        var q = mischen([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 3);
        z = FK.pmul(lin(1, q[0]), lin(1, q[1])); n = FK.pmul(lin(1, q[0]), lin(1, q[2]));
      } else if(v === 3){ // c / (x² − p²)
        var s = zuf(1, 3), c = wahl([1, 2, 4, -2]);
        z = poly([c]); n = FK.pmul(lin(1, s), lin(1, -s));
      } else { // schräg: (x² − s²)/(x − p) oder (x² + q)/(x − p)
        var p4 = wahl([-3, -2, -1, 1, 2, 3]), s4 = zuf(1, 3); while(s4 === Math.abs(p4)) s4 = zuf(1, 4);
        z = Math.random() < 0.6 ? poly([-s4 * s4, 0, 1]) : poly([zuf(1, 4), 0, 1]); n = lin(1, p4);
      }
      var A = FR.analyse(z, n);
      tx = "f(x) = " + (v === 1 ? (a === 1 ? "" : a === -1 ? M : a) + faktTxt([zz]) + " / " + faktTxt([pp])
                       : v === 2 ? faktTxt([q[0], q[1]]) + " / (" + faktTxt([q[0], q[2]]) + ")"
                       : klammerP(z) + " / " + klammerP(n));
      return { text: tx, eingabe: klammerP(z).replace(/−/g, "-") + "/" + klammerP(n).replace(/−/g, "-"), schritte: [
        { art: "zahlen", q: "qLuecken", h: "hLuecken", soll: A.luecken.map(function(l){ return l.b; }) },
        { art: "zahlen", q: "qPole", h: "hPole", soll: A.pole.map(function(p){ return p.z.b; }) },
        { art: "zahlen", q: "qHebbar", h: "hHebbar", soll: A.hebbar.map(function(h){ return h.z.b; }) },
        { art: "zahlen", q: "qNst", h: "hNstR", soll: A.nst.map(function(s){ return s.b; }) },
        { art: "poly", q: "qAsym", h: "hAsym", soll: A.asym.q, praefix: "y =" } ] };
    }
  };

  // ---------- Eingaben lesen ----------
  function zahlLesen(s){
    s = String(s || "").trim().replace(/^x\s*=\s*/i, "");
    if(!s) throw { code: "uLeer" };
    var p = FK.parse(s); if(FK.grad(p) > 0) throw { code: "uLesen" };
    return p[0];
  }
  function mengeLesen(s){
    s = String(s || "").trim();
    if(/^(∅|\{\s*\}|-|—|–)$/.test(s) || s.toLowerCase() === t("keine").toLowerCase()) return [];
    if(!s) throw { code: "uLeer" };
    var teile = s.split(/[;|]/).map(function(x){ return x.trim(); }).filter(Boolean);
    if(teile.length === 1 && /\s/.test(teile[0]) && !/[+*\/^]/.test(teile[0].replace(/^-/, ""))) teile = teile[0].split(/\s+/);
    return teile.map(zahlLesen);
  }
  function gleichZ(a, b){ return a.n === b.n && a.d === b.d; }
  function mengeGleich(ist, soll){
    var u = []; ist.forEach(function(x){ if(!u.some(function(y){ return gleichZ(x, y); })) u.push(x); });
    return u.length === soll.length && soll.every(function(s){ return u.some(function(x){ return gleichZ(x, s); }); });
  }
  function polyGleich(a, b){ a = FK.trim(a); b = FK.trim(b); return a.length === b.length && a.every(function(c, i){ return gleichZ(c, b[i]); }); }
  function pruefe(st, w){
    if(st.art === "wahl") return w.wahl === st.soll;
    if(st.art === "zahl") return gleichZ(zahlLesen(w.a), st.soll);
    if(st.art === "zahlen") return mengeGleich(mengeLesen(w.a), st.soll);
    if(st.art === "punkt") return gleichZ(zahlLesen(w.x), st.soll[0]) && gleichZ(zahlLesen(w.y), st.soll[1]);
    if(st.art === "poly"){ var s = String(w.a || "").replace(/^\s*(f\s*['′″]*\s*\(\s*x\s*\)|y)\s*=\s*/i, ""); if(!s.trim()) throw { code: "uLeer" }; return polyGleich(FK.parse(s), st.soll); }
    return false;
  }
  function loesungTxt(st){
    if(st.art === "wahl") return t(st.soll);
    if(st.art === "zahl") return FK.btxt(st.soll);
    if(st.art === "zahlen") return st.soll.length ? "x = " + st.soll.slice().sort(function(a, b){ return Bz.num(a) - Bz.num(b); }).map(FK.btxt).join("; ") : t("keine");
    if(st.art === "punkt") return FK.punkt("", FK.btxt(st.soll[0]), FK.btxt(st.soll[1]));
    return (st.praefix ? st.praefix + " " : "") + FK.ptxt(st.soll);
  }

  // ---------- Oberfläche ----------
  function Uebung(box, typ, oeffnen){
    this.box = box; this.typ = typ; this.oeffnen = oeffnen; this.richtig = 0; this.gesamt = 0; this.neu();
  }
  Uebung.prototype.neu = function(){
    this.aufg = GEN[this.typ]();
    this.zust = this.aufg.schritte.map(function(){ return { w: {}, versuche: 0, fertig: false, ok: false, meldung: null, tipp: false, gezeigt: false }; });
    this.render();
  };
  Uebung.prototype.aktuell = function(){ for(var i = 0; i < this.zust.length; i++) if(!this.zust[i].fertig) return i; return this.zust.length; };
  Uebung.prototype.render = function(){
    var self = this, a = this.aufg, ak = this.aktuell(), h = "";
    h += '<div class="u-kopf"><span>' + t("uPunkte") + ": <b>" + this.richtig + " / " + this.gesamt + '</b></span><button type="button" class="knopf hell" data-u="neu">' + t("uNeu") + "</button></div>";
    h += '<div class="u-aufgabe">' + f(a.text) + "</div>";
    h += '<div class="u-hilfe">' + t("uHilfe") + "</div>";
    a.schritte.forEach(function(st, i){
      if(i > ak) return;
      var z = self.zust[i], dis = z.fertig ? " disabled" : "";
      h += '<section class="karte u-schritt' + (z.fertig ? (z.ok ? " u-ok" : " u-gez") : "") + '" data-i="' + i + '"><h2>' + (i + 1) + ". " + t(st.q) + "</h2>";
      if(st.art === "wahl"){
        h += '<div class="u-wahl">' + st.optionen.map(function(o){ return '<button type="button" class="knopf hell' + (z.w.wahl === o ? " u-gewaehlt" : "") + '" data-wahl="' + o + '"' + dis + ">" + t(o) + "</button>"; }).join("") + "</div>";
      } else if(st.art === "punkt"){
        h += '<div class="u-zeile" dir="ltr"><label>x = <input data-f="x" value="' + esc(z.w.x) + '"' + dis + '></label><label>y = <input data-f="y" value="' + esc(z.w.y) + '"' + dis + "></label></div>";
      } else {
        var pre = st.art === "poly" ? (st.praefix || (st.q === "qA1" ? "f′(x) =" : st.q === "qA2" ? "f″(x) =" : "")) : (st.art === "zahlen" ? "x =" : "");
        h += '<div class="u-zeile" dir="ltr"><label>' + pre + ' <input data-f="a" value="' + esc(z.w.a) + '"' + dis + (st.art === "poly" ? ' class="u-breit"' : "") + "></label>" +
             (st.art === "zahlen" && !z.fertig ? '<button type="button" class="knopf hell" data-u="keine">' + t("keine") + "</button>" : "") + "</div>";
      }
      if(!z.fertig) h += '<div class="u-knoepfe"><button type="button" class="knopf" data-u="pruefen">' + t("uPruefen") + '</button><button type="button" class="knopf hell" data-u="tipp">' + t("uTipp") + '</button><button type="button" class="knopf hell" data-u="zeigen">' + t("uZeigen") + "</button></div>";
      if(z.meldung) h += '<div class="u-meldung ' + (z.ok ? "gut" : "schlecht") + '">' + t(z.meldung) + "</div>";
      if(z.tipp && !z.fertig) h += '<div class="u-tipp">💡 ' + t(st.h) + "</div>";
      if(z.gezeigt) h += '<div class="u-loesung">' + t("uLoesung") + " " + f(loesungTxt(st)) + "</div>";
      h += "</section>";
    });
    if(ak >= a.schritte.length){
      var erst = this.zust.filter(function(z){ return z.ok && z.versuche === 1; }).length;
      h += '<section class="karte u-ende"><b>🎉 ' + t("uFertig", { r: erst, n: a.schritte.length }) + '</b><div class="u-knoepfe"><button type="button" class="knopf" data-u="neu">' + t("uNeu") + '</button><button type="button" class="knopf hell" data-u="graph">' + t("uGraph") + "</button></div></section>";
    }
    this.box.innerHTML = h;
    this.box.querySelectorAll("input").forEach(function(inp){
      inp.setAttribute("autocomplete", "off"); inp.setAttribute("autocapitalize", "off"); inp.setAttribute("spellcheck", "false");
      inp.addEventListener("input", function(){ self.zust[+inp.closest(".u-schritt").dataset.i].w[inp.dataset.f] = inp.value; });
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); self.pruefen(+inp.closest(".u-schritt").dataset.i); } });
    });
    this.box.querySelectorAll("[data-wahl]").forEach(function(b){ b.addEventListener("click", function(){ var i = +b.closest(".u-schritt").dataset.i; self.zust[i].w.wahl = b.dataset.wahl; self.pruefen(i); }); });
    this.box.querySelectorAll("[data-u]").forEach(function(b){
      b.addEventListener("click", function(){
        var u = b.dataset.u, s = b.closest(".u-schritt"), i = s ? +s.dataset.i : -1;
        if(u === "neu") self.neu();
        else if(u === "graph") self.oeffnen(self.aufg.eingabe);
        else if(u === "pruefen") self.pruefen(i);
        else if(u === "tipp"){ self.zust[i].tipp = true; self.render(); }
        else if(u === "zeigen"){ var z = self.zust[i]; z.gezeigt = true; z.fertig = true; z.ok = false; z.meldung = null; if(!z.versuche){ z.versuche = 1; self.gesamt++; } self.render(); }
        else if(u === "keine"){ self.zust[i].w.a = "∅"; self.render(); }
      });
    });
    var offen = this.box.querySelector(".u-schritt:not(.u-ok):not(.u-gez) input");
    if(offen && this.fokus) offen.focus();
  };
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  Uebung.prototype.pruefen = function(i){
    var st = this.aufg.schritte[i], z = this.zust[i];
    var ok;
    try { ok = pruefe(st, z.w); } catch(e){ z.meldung = e.code === "uLeer" ? "uLeer" : "uLesen"; z.ok = false; this.fokus = true; this.render(); return; }
    z.versuche++;
    if(z.versuche === 1) this.gesamt++;
    if(ok){ z.ok = true; z.fertig = true; z.meldung = "uRichtig"; if(z.versuche === 1) this.richtig++; }
    else { z.meldung = "uFalsch"; if(z.versuche >= 2) z.tipp = true; }
    this.fokus = true; this.render();
  };
  // Reiter „Untersuchen | Üben“ in eine Funktionsseite einbauen.
  // Erwartet #modErk, #modUeb, #erkunden, #ueben und das Formular #form mit #eingabe.
  function einbauen(typ){
    var bErk = document.getElementById("modErk"), bUeb = document.getElementById("modUeb");
    var erk = document.getElementById("erkunden"), box = document.getElementById("ueben"), ueb = null;
    var basis = window.MS_LANG && window.MS_LANG.apply;
    function zeige(m){
      var u = m === "ueb";
      bErk.setAttribute("aria-selected", u ? "false" : "true"); bUeb.setAttribute("aria-selected", u ? "true" : "false");
      erk.hidden = u; box.hidden = !u;
      if(u && !ueb) ueb = new Uebung(box, typ, oeffnen);
      if(!u && basis) basis(FK.getLang()); // Graph mit echter Größe neu zeichnen
      try { sessionStorage.setItem("msFuModus", m); } catch(e){}
    }
    function oeffnen(eingabe){
      zeige("erk");
      var tMB = document.getElementById("tabMB"); if(tMB && tMB.getAttribute("aria-selected") !== "true") tMB.click();
      document.getElementById("eingabe").value = eingabe;
      var form = document.getElementById("form");
      if(form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event("submit", { cancelable: true }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function texte(){ bErk.textContent = t("mErk"); bUeb.textContent = t("mUeb"); if(ueb) ueb.render(); }
    bErk.addEventListener("click", function(){ zeige("erk"); });
    bUeb.addEventListener("click", function(){ zeige("ueb"); });
    if(window.MS_LANG) window.MS_LANG.apply = function(l){ basis(l); texte(); };
    texte();
    var start = null; try { start = sessionStorage.getItem("msFuModus"); } catch(e){}
    if(start === "ueb") zeige("ueb");
  }
  return { einbauen: einbauen, Uebung: Uebung, GEN: GEN, pruefe: pruefe, loesungTxt: loesungTxt };
})();
