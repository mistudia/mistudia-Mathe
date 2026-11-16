// /funktionen/alltag-bilder.js – Zeichnungen zu den Alltagsbeispielen (FA in alltag.js).
// FA_BILD[app][i]() liefert ein SVG (ohne Sprachtexte – nur Zahlen, Einheiten, Symbole).
// Wo es passt, ist die echte Funktion Teil des Bildes (Achterbahn-Schiene, Wurfbahn, Brückenbogen …).
var FA_BILD = (function(){
  "use strict";
  var W = 320, H = 150;
  function svg(inner, h){ return '<svg class="al-svg" viewBox="0 0 ' + W + " " + (h || H) + '" role="img" aria-hidden="true">' + inner + "</svg>"; }
  // Funktionsgraph als Pfad: f auf [a, b] → Pixelrechteck (x0, y0)–(x1, y1), Wertebereich [ya, yb]
  function pfad(f, a, b, ya, yb, x0, y0, x1, y1){
    var d = "", n = 120;
    for(var i = 0; i <= n; i++){ var x = a + (b - a) * i / n, y = f(x), px = x0 + (x1 - x0) * (x - a) / (b - a), py = y1 - (y1 - y0) * (y - ya) / (yb - ya); d += (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1); }
    return d;
  }
  function txt(x, y, s, extra){ return '<text x="' + x + '" y="' + y + '" class="al-t"' + (extra || "") + ">" + s + "</text>"; }
  function boden(y){ return '<rect x="0" y="' + y + '" width="' + W + '" height="' + (H - y) + '" fill="#d9f99d"/><line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="#65a30d" stroke-width="2"/>'; }
  function himmel(h){ return '<rect width="' + W + '" height="' + (h || H) + '" fill="#eff6ff"/>'; }
  function figur(x, y, s, farbe){ s = s || 1; farbe = farbe || "#1e3a8a";
    return '<g stroke="' + farbe + '" stroke-width="' + 3 * s + '" stroke-linecap="round" fill="none"><circle cx="' + x + '" cy="' + (y - 38 * s) + '" r="' + 7 * s + '" fill="#fde68a"/><line x1="' + x + '" y1="' + (y - 31 * s) + '" x2="' + x + '" y2="' + (y - 12 * s) + '"/><line x1="' + x + '" y1="' + (y - 12 * s) + '" x2="' + (x - 7 * s) + '" y2="' + y + '"/><line x1="' + x + '" y1="' + (y - 12 * s) + '" x2="' + (x + 7 * s) + '" y2="' + y + '"/><line x1="' + x + '" y1="' + (y - 26 * s) + '" x2="' + (x - 9 * s) + '" y2="' + (y - 16 * s) + '"/><line x1="' + x + '" y1="' + (y - 26 * s) + '" x2="' + (x + 10 * s) + '" y2="' + (y - 33 * s) + '"/></g>'; }
  function telefon(x, y, buchst){ return '<rect x="' + x + '" y="' + y + '" width="46" height="84" rx="8" fill="#1f2937"/><rect x="' + (x + 4) + '" y="' + (y + 9) + '" width="38" height="64" rx="3" fill="#bfdbfe"/><circle cx="' + (x + 23) + '" cy="' + (y + 78) + '" r="2.5" fill="#6b7280"/>' + (buchst ? txt(x + 23, y + 50, buchst, ' style="font-size:26px" text-anchor="middle"') : ""); }
  function auto(x, y, farbe, schild){ return '<g><rect x="' + x + '" y="' + (y - 18) + '" width="62" height="18" rx="5" fill="' + farbe + '"/><path d="M' + (x + 12) + " " + (y - 18) + "L" + (x + 20) + " " + (y - 32) + "L" + (x + 44) + " " + (y - 32) + "L" + (x + 52) + " " + (y - 18) + 'Z" fill="' + farbe + '"/><path d="M' + (x + 17) + " " + (y - 19) + "L" + (x + 22) + " " + (y - 29) + "L" + (x + 31) + " " + (y - 29) + "L" + (x + 31) + " " + (y - 19) + 'Z" fill="#e0f2fe"/><path d="M' + (x + 34) + " " + (y - 19) + "L" + (x + 34) + " " + (y - 29) + "L" + (x + 42) + " " + (y - 29) + "L" + (x + 47) + " " + (y - 19) + 'Z" fill="#e0f2fe"/><circle cx="' + (x + 15) + '" cy="' + y + '" r="7" fill="#111827"/><circle cx="' + (x + 47) + '" cy="' + y + '" r="7" fill="#111827"/>' + (schild ? '<rect x="' + (x + 22) + '" y="' + (y - 40) + '" width="20" height="8" rx="2" fill="#111827"/>' + txt(x + 32, y - 33.5, schild, ' style="font-size:7px;fill:#fde047" text-anchor="middle"') : "") + "</g>"; }
  function haus(x, y, farbe){ return '<rect x="' + x + '" y="' + (y - 30) + '" width="40" height="30" fill="' + farbe + '"/><path d="M' + (x - 5) + " " + (y - 30) + "L" + (x + 20) + " " + (y - 50) + "L" + (x + 45) + " " + (y - 30) + 'Z" fill="#b91c1c"/><rect x="' + (x + 15) + '" y="' + (y - 16) + '" width="10" height="16" fill="#78350f"/>'; }
  function miniGraph(x, y, w, h, f, a, b, ya, yb, farbe){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#ffffff" stroke="#cbd5e1"/><path d="' + pfad(f, a, b, ya, yb, x + 4, y + 4, x + w - 4, y + h - 4) + '" fill="none" stroke="' + (farbe || "#2563eb") + '" stroke-width="2.5"/>'; }

  var B = {
    linear: [
      function(){ // Handytarif
        var stufen = ""; for(var i = 0; i < 5; i++) stufen += '<rect x="' + (128 + i * 32) + '" y="' + (120 - 30 - i * 14) + '" width="22" height="' + (30 + i * 14) + '" rx="3" fill="' + (i ? "#60a5fa" : "#93c5fd") + '"/>' + txt(139 + i * 32, 136, i + " GB", ' text-anchor="middle" style="font-size:10px"');
        return svg(himmel() + telefon(30, 30) + '<path d="M44 52 l6 -8 l6 6 l8 -12" stroke="#2563eb" stroke-width="3" fill="none"/>' + stufen + '<line x1="120" y1="90" x2="300" y2="34" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/>' + txt(139, 84, "10 €", ' text-anchor="middle"') + txt(268, 30, "+2 €", ' text-anchor="middle" style="fill:#dc2626"'));
      },
      function(){ // Kerze
        var lineal = ""; for(var i = 0; i <= 20; i += 5) lineal += '<line x1="150" y1="' + (130 - i * 5) + '" x2="' + (i % 10 ? 158 : 162) + '" y2="' + (130 - i * 5) + '" stroke="#475569" stroke-width="1.5"/>' + (i % 10 ? "" : txt(166, 134 - i * 5, i + " cm", ' style="font-size:10px"'));
        return svg(himmel() + '<rect x="80" y="30" width="44" height="100" rx="3" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/><rect x="80" y="70" width="44" height="60" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><line x1="102" y1="70" x2="102" y2="60" stroke="#1f2937" stroke-width="2"/><path d="M102 38 C92 52 95 60 102 62 C109 60 112 52 102 38Z" fill="#f97316"/><path d="M102 48 C98 55 99 59 102 60 C105 59 106 55 102 48Z" fill="#fde047"/><line x1="150" y1="30" x2="150" y2="130" stroke="#475569" stroke-width="2"/>' + lineal + '<rect x="60" y="130" width="84" height="8" rx="2" fill="#a16207"/>' + miniGraph(220, 34, 86, 80, function(x){ return 20 - 2.5 * x; }, 0, 8, 0, 21, "#d97706"));
      },
      function(){ // Taxi
        var marken = ""; for(var i = 0; i <= 8; i += 2) marken += '<line x1="' + (40 + i * 30) + '" y1="118" x2="' + (40 + i * 30) + '" y2="128" stroke="#ffffff" stroke-width="2"/>' + txt(40 + i * 30, 145, i + " km", ' text-anchor="middle" style="font-size:10px"');
        return svg(himmel() + '<rect x="0" y="108" width="' + W + '" height="24" fill="#4b5563"/><line x1="0" y1="120" x2="' + W + '" y2="120" stroke="#fde047" stroke-width="2" stroke-dasharray="12 8"/>' + marken + auto(70, 110, "#facc15", "TAXI") + '<line x1="280" y1="108" x2="280" y2="60" stroke="#475569" stroke-width="3"/><path d="M280 60 L305 68 L280 76Z" fill="#16a34a"/>' + txt(150, 40, "4 € + 2,50 € / km".replace(",", window.FK && !FK.kommaSprache() ? "." : ","), ' text-anchor="middle"'));
      },
      function(){ // Milch im Supermarkt: f(x) = 1,15·x
        var tueten = ""; for(var i = 0; i < 3; i++) tueten += '<g transform="translate(' + (24 + i * 34) + ' 52)"><path d="M0 18 L6 6 L22 6 L28 18 Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.5"/><rect x="0" y="18" width="28" height="52" fill="#ffffff" stroke="#0369a1" stroke-width="2"/><rect x="0" y="34" width="28" height="16" fill="#38bdf8"/></g>';
        return svg(himmel() + tueten + txt(66, 140, "1 l = 1,15 €", ' text-anchor="middle"') + miniGraph(150, 14, 156, 108, function(x){ return 1.15 * x; }, 0, 6, 0, 7.5, "#2563eb") + txt(228, 140, "f(x) = 1,15·x", ' text-anchor="middle"'));
      }
    ],
    quadratisch: [
      function(){ // Ballwurf
        var f = function(x){ return -0.05 * x * x + x + 1.5; };
        return svg(himmel() + boden(130) + figur(32, 130, 1.1) + '<path d="' + pfad(f, 0, 21.4, 0, 8, 40, 30, 300, 130) + '" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="7 5"/><circle cx="' + (40 + 260 * 10 / 21.4) + '" cy="' + (130 - 100 * f(10) / 8) + '" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>' + txt(160, 26, "6,5 m".replace(",", window.FK && !FK.kommaSprache() ? "." : ","), ' text-anchor="middle"'));
      },
      function(){ // Brückenbogen
        var f = function(x){ return -0.02 * x * x + 8; }, X = function(x){ return 160 + x * 6.5; }, Y = function(y){ return 120 - y * 10; }, haenger = "";
        for(var x = -16; x <= 16; x += 4) haenger += '<line x1="' + X(x) + '" y1="' + Y(f(x)) + '" x2="' + X(x) + '" y2="' + Y(9.5) + '" stroke="#64748b" stroke-width="1.5"/>';
        return svg(himmel() + '<path d="M0 120 Q40 112 80 120 T160 120 T240 120 T320 120 V150 H0Z" fill="#60a5fa"/><path d="' + pfad(f, -20, 20, 0, 12, X(-20), Y(12), X(20), Y(0)) + '" fill="none" stroke="#7c2d12" stroke-width="5"/>' + haenger + '<rect x="20" y="' + (Y(9.5) - 5) + '" width="280" height="6" fill="#57534e"/><rect x="10" y="' + (Y(9.5) - 5) + '" width="22" height="' + (120 - Y(9.5) + 5) + '" fill="#a8a29e"/><rect x="288" y="' + (Y(9.5) - 5) + '" width="22" height="' + (120 - Y(9.5) + 5) + '" fill="#a8a29e"/><line x1="160" y1="' + Y(8) + '" x2="160" y2="120" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>' + txt(166, 90, "8 m", ' style="fill:#dc2626"'));
      },
      function(){ // Kuchenverkauf
        var f = function(x){ return -10 * x * x + 80 * x - 70; };
        return svg(himmel() + '<path d="M30 110 L130 110 L80 50 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/><path d="M47 90 L113 90" stroke="#be185d" stroke-width="5"/><path d="M38 100 L122 100" stroke="#f9a8d4" stroke-width="4"/><circle cx="80" cy="46" r="7" fill="#dc2626"/><rect x="40" y="110" width="80" height="6" rx="3" fill="#94a3b8"/><path d="M128 40 L165 40 L175 52 L165 64 L128 64 Z" fill="#fef9c3" stroke="#a16207" stroke-width="2"/>' + txt(150, 57, "€", ' text-anchor="middle" style="font-size:16px"') + miniGraph(195, 30, 110, 95, f, 0.5, 7.5, -80, 100, "#16a34a") + '<circle cx="' + (199 + 102 * (4 - 0.5) / 7) + '" cy="' + (121 - 87 * (90 + 80) / 180) + '" r="4" fill="#16a34a"/>');
      }
    ],
    polynom: [
      function(){ // Schachtel falten
        var e = 18, s = 110, x0 = 20, y0 = 20;
        return svg(himmel() + '<rect x="' + x0 + '" y="' + y0 + '" width="' + s + '" height="' + s + '" fill="#d6a76a" stroke="#92400e" stroke-width="2"/>' +
          [[0, 0], [s - e, 0], [0, s - e], [s - e, s - e]].map(function(p){ return '<rect x="' + (x0 + p[0]) + '" y="' + (y0 + p[1]) + '" width="' + e + '" height="' + e + '" fill="#ffffff" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 2"/>'; }).join("") +
          '<line x1="' + (x0 + e) + '" y1="' + (y0 + e) + '" x2="' + (x0 + s - e) + '" y2="' + (y0 + e) + '" stroke="#92400e" stroke-dasharray="4 3"/><line x1="' + (x0 + e) + '" y1="' + (y0 + s - e) + '" x2="' + (x0 + s - e) + '" y2="' + (y0 + s - e) + '" stroke="#92400e" stroke-dasharray="4 3"/><line x1="' + (x0 + e) + '" y1="' + (y0 + e) + '" x2="' + (x0 + e) + '" y2="' + (y0 + s - e) + '" stroke="#92400e" stroke-dasharray="4 3"/><line x1="' + (x0 + s - e) + '" y1="' + (y0 + e) + '" x2="' + (x0 + s - e) + '" y2="' + (y0 + s - e) + '" stroke="#92400e" stroke-dasharray="4 3"/>' +
          txt(x0 + e / 2, y0 + e + 12, "x", ' text-anchor="middle" style="fill:#dc2626"') + txt(x0 + s / 2, y0 + s + 14, "20 cm", ' text-anchor="middle" style="font-size:11px"') +
          '<path d="M150 75 L175 75" stroke="#475569" stroke-width="3" marker-end="url(#alPf)"/><defs><marker id="alPf" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#475569"/></marker></defs>' +
          '<path d="M200 70 L270 70 L300 50 L230 50 Z" fill="#e7c48f" stroke="#92400e" stroke-width="2"/><path d="M200 70 L200 110 L270 110 L270 70 Z" fill="#d6a76a" stroke="#92400e" stroke-width="2"/><path d="M270 110 L300 90 L300 50 L270 70 Z" fill="#c08a4a" stroke="#92400e" stroke-width="2"/>' + txt(285, 128, "x", ' style="fill:#dc2626"') + '<line x1="278" y1="108" x2="278" y2="72" stroke="#dc2626" stroke-width="1.5"/>');
      },
      function(){ // Achterbahn
        var f = function(x){ return 0.01 * x * x * x - 0.3 * x * x + 2.25 * x + 5; }, X = function(x){ return 14 + x * 13.6; }, Y = function(y){ return 132 - y * 9.2; }, st = "", sw = "";
        for(var x = 0; x <= 21; x += 1.5) st += '<line x1="' + X(x) + '" y1="' + Y(f(x)) + '" x2="' + X(x) + '" y2="132" stroke="#78716c" stroke-width="' + (x % 3 ? 1.2 : 2.5) + '"/>';
        for(var x2 = 0; x2 <= 21; x2 += 0.7){ var y2 = f(x2), m = 0.03 * x2 * x2 - 0.6 * x2 + 2.25, n = Math.sqrt(1 + m * m * 0.46); sw += '<line x1="' + (X(x2) + 4 * m * 0.68 / n) + '" y1="' + (Y(y2) - 4 / n + 0) + '" x2="' + (X(x2) - 4 * m * 0.68 / n) + '" y2="' + (Y(y2) + 4 / n) + '" stroke="#57534e" stroke-width="1.5"/>'; }
        var xc = 4.5, yc = f(xc), mc = 0.03 * xc * xc - 0.6 * xc + 2.25, wink = -Math.atan(mc * 9.2 / 13.6) * 180 / Math.PI;
        return svg(himmel() + '<circle cx="190" cy="24" r="13" fill="#fde047"/>' + boden(132) + st + sw + '<path d="' + pfad(f, 0, 21, 0, 13.2, X(0), Y(13.2), X(21), Y(0)) + '" fill="none" stroke="#dc2626" stroke-width="4"/>' +
          '<g transform="translate(' + X(xc) + " " + Y(yc) + ") rotate(" + wink.toFixed(1) + ')"><rect x="-16" y="-17" width="32" height="13" rx="4" fill="#2563eb"/><circle cx="-6" cy="-24" r="4.5" fill="#fde68a"/><circle cx="7" cy="-24" r="4.5" fill="#fde68a"/><circle cx="-10" cy="-3" r="3.5" fill="#111827"/><circle cx="10" cy="-3" r="3.5" fill="#111827"/></g>');
      }
    ],
    rational: [
      function(){ // T-Shirts
        var shirt = function(x, y, s, farbe){ return '<path transform="translate(' + x + " " + y + ") scale(" + s + ')" d="M-30 -40 L-12 -48 Q0 -40 12 -48 L30 -40 L42 -20 L28 -12 L24 -20 L24 30 L-24 30 L-24 -20 L-28 -12 L-42 -20 Z" fill="' + farbe + '" stroke="#1e3a8a" stroke-width="2"/>'; };
        return svg(himmel() + shirt(95, 95, 1, "#93c5fd") + shirt(150, 100, 0.8, "#fca5a5") + shirt(198, 104, 0.65, "#86efac") + '<path d="M95 60 l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-11 6 l3 -11 l-8 -7 l11 -1 z" fill="#fde047" stroke="#a16207"/>' + txt(250, 50, "600 €") + txt(250, 75, "+ 2 €"));
      },
      function(){ // Fahrzeit
        return svg(himmel() + boden(118) + '<path d="M40 118 Q160 100 280 118" stroke="#4b5563" stroke-width="14" fill="none"/><path d="M40 118 Q160 100 280 118" stroke="#fde047" stroke-width="1.5" stroke-dasharray="8 6" fill="none"/>' + haus(10, 112, "#fde68a") + haus(272, 112, "#bbf7d0") + '<path d="M292 72 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4z" fill="#ec4899"/>' + auto(120, 102, "#3b82f6") + txt(160, 40, "120 km", ' text-anchor="middle"'));
      },
      function(){ // Saftschorle
        return svg(himmel() + '<path d="M120 30 L200 30 L190 135 L130 135 Z" fill="#ffffff" stroke="#64748b" stroke-width="2.5"/><path d="M125.5 70 L194.5 70 L190 135 L130 135 Z" fill="#fef3c7"/><path d="M129 115 L191 115 L190 135 L130 135 Z" fill="#f59e0b"/><path d="M230 20 L262 20 L262 40 L276 52 L276 110 L216 110 L216 52 L230 40 Z" fill="#fb923c" stroke="#9a3412" stroke-width="2" transform="rotate(-35 246 65)"/><path d="M205 52 Q190 60 180 75" stroke="#f59e0b" stroke-width="5" fill="none"/>' + txt(60, 96, "10 l", ' text-anchor="middle"') + txt(60, 128, "2 l", ' text-anchor="middle" style="fill:#d97706"') + txt(160, 24, "+ x", ' text-anchor="middle" style="fill:#d97706"'));
      }
    ],
    sinus: [
      function(){ // Riesenrad
        var cx = 130, cy = 72, r = 56, gond = "", spei = "";
        for(var i = 0; i < 8; i++){ var a = i * Math.PI / 4, gx = cx + r * Math.cos(a), gy = cy + r * Math.sin(a); spei += '<line x1="' + cx + '" y1="' + cy + '" x2="' + gx + '" y2="' + gy + '" stroke="#94a3b8" stroke-width="1.5"/>'; gond += '<rect x="' + (gx - 7) + '" y="' + (gy) + '" width="14" height="11" rx="3" fill="' + (i === 7 ? "#dc2626" : "#3b82f6") + '"/>'; }
        var gx7 = cx + r * Math.cos(7 * Math.PI / 4), gy7 = cy + r * Math.sin(7 * Math.PI / 4);
        return svg(himmel(H + 10) + '<rect x="0" y="140" width="' + W + '" height="20" fill="#d9f99d"/><line x1="' + cx + '" y1="' + cy + '" x2="' + (cx - 40) + '" y2="140" stroke="#475569" stroke-width="5"/><line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + 40) + '" y2="140" stroke="#475569" stroke-width="5"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#64748b" stroke-width="3"/>' + spei + gond + '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#1f2937"/><line x1="' + (gx7 + 20) + '" y1="' + (gy7 + 5) + '" x2="' + (gx7 + 20) + '" y2="140" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>' + txt(gx7 + 26, 100, "h(t)", ' style="fill:#dc2626"') + '<line x1="250" y1="' + cy + '" x2="250" y2="140" stroke="#475569" stroke-width="1.5"/>' + txt(256, 112, "22 m") + '<line x1="245" y1="' + (cy - r) + '" x2="255" y2="' + (cy - r) + '" stroke="#475569"/>' + '<line x1="250" y1="' + (cy - r) + '" x2="250" y2="' + cy + '" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3"/>' + txt(256, cy - 24, "20 m"), H + 10);
      },
      function(){ // Ebbe und Flut
        var skala = ""; for(var i = 0; i <= 4; i++) skala += '<line x1="70" y1="' + (130 - i * 22) + '" x2="80" y2="' + (130 - i * 22) + '" stroke="#1f2937" stroke-width="1.5"/>' + txt(62, 134 - i * 22, i + " m", ' text-anchor="end" style="font-size:10px"');
        return svg(himmel() + '<rect x="80" y="20" width="30" height="115" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>' + skala + '<path d="M110 75 Q140 70 170 75 T230 75 T290 75 T320 75 V150 H110Z" fill="#3b82f6" opacity="0.8"/><path d="M190 74 L250 74 L240 88 L200 88 Z" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="220" y1="74" x2="220" y2="44" stroke="#1f2937" stroke-width="2"/><path d="M220 46 L244 70 L220 70 Z" fill="#fca5a5"/><line x1="110" y1="42" x2="320" y2="42" stroke="#1d4ed8" stroke-width="1" stroke-dasharray="4 4"/><line x1="110" y1="108" x2="320" y2="108" stroke="#1d4ed8" stroke-width="1" stroke-dasharray="4 4"/>' + '<path d="' + pfad(function(x){ return Math.cos(x); }, 0, 2 * Math.PI, -1.2, 1.2, 240, 100, 318, 140) + '" fill="none" stroke="#ffffff" stroke-width="1.5"/>');
      },
      function(){ // Tageslänge
        return svg(himmel() + boden(120) + '<path d="M60 120 Q160 -60 260 120" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 4"/><path d="M105 120 Q160 40 215 120" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-dasharray="6 4"/><circle cx="160" cy="31" r="11" fill="#fde047" stroke="#f59e0b" stroke-width="2"/><circle cx="160" cy="80" r="8" fill="#fef9c3" stroke="#60a5fa" stroke-width="2"/>' + txt(275, 116, "☀", ' style="font-size:18px;fill:#f59e0b"') + txt(222, 116, "❄", ' style="font-size:15px;fill:#3b82f6"') + txt(20, 140, "16,8 h".replace(",", window.FK && !FK.kommaSprache() ? "." : ","), ' style="fill:#b45309"') + txt(200, 140, "7,7 h".replace(",", window.FK && !FK.kommaSprache() ? "." : ","), ' style="fill:#1d4ed8"'));
      },
      function(){ // Steckdose
        return svg(himmel() + '<rect x="20" y="30" width="90" height="90" rx="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/><circle cx="65" cy="75" r="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/><circle cx="53" cy="75" r="5" fill="#1f2937"/><circle cx="77" cy="75" r="5" fill="#1f2937"/><rect x="61" y="44" width="8" height="5" fill="#94a3b8"/><rect x="61" y="101" width="8" height="5" fill="#94a3b8"/>' + '<line x1="130" y1="75" x2="310" y2="75" stroke="#94a3b8"/><path d="' + pfad(Math.sin, 0, 6 * Math.PI, -1.1, 1.1, 130, 30, 310, 120) + '" fill="none" stroke="#2563eb" stroke-width="2.5"/>' + txt(220, 140, "50 Hz", ' text-anchor="middle"') + txt(132, 28, "325 V", ' style="font-size:11px"'));
      }
    ],
    waage: [
      function(){ // Hefte
        var heft = function(x, f){ return '<rect x="' + x + '" y="40" width="44" height="60" rx="3" fill="' + f + '" stroke="#1f2937" stroke-width="1.5"/><rect x="' + (x + 8) + '" y="52" width="28" height="10" fill="#ffffff"/>'; };
        return svg(himmel() + heft(30, "#60a5fa") + heft(82, "#60a5fa") + heft(134, "#60a5fa") + '<g transform="rotate(-20 220 80)"><rect x="190" y="74" width="60" height="9" rx="2" fill="#f59e0b"/><path d="M250 74 L262 78.5 L250 83Z" fill="#fde68a"/></g>' + txt(220, 115, "2 €", ' text-anchor="middle"') + txt(105, 125, "x  x  x", ' text-anchor="middle" style="fill:#1d4ed8"') + txt(285, 70, "= 8 €", ' text-anchor="middle"'));
      },
      function(){ // Geschwister
        return svg(himmel() + boden(130) + figur(110, 130, 1.25, "#be185d") + figur(190, 130, 0.95, "#1d4ed8") + txt(110, 50, "x + 3", ' text-anchor="middle" style="fill:#be185d"') + txt(190, 70, "x", ' text-anchor="middle" style="fill:#1d4ed8"') + txt(270, 90, "= 21", ' text-anchor="middle"'));
      },
      function(){ // Sparen
        var schwein = function(x, f){ return '<ellipse cx="' + x + '" cy="85" rx="42" ry="30" fill="' + f + '" stroke="#be185d" stroke-width="2"/><circle cx="' + (x + 40) + '" cy="82" r="10" fill="' + f + '" stroke="#be185d" stroke-width="2"/><circle cx="' + (x + 22) + '" cy="72" r="3" fill="#1f2937"/><rect x="' + (x - 6) + '" y="56" width="16" height="4" rx="2" fill="#831843"/><rect x="' + (x - 25) + '" y="110" width="8" height="12" fill="#be185d"/><rect x="' + (x + 15) + '" y="110" width="8" height="12" fill="#be185d"/>'; };
        return svg(himmel() + schwein(80, "#fbcfe8") + schwein(230, "#fbcfe8") + txt(80, 92, "12 €", ' text-anchor="middle"') + txt(230, 92, "30 €", ' text-anchor="middle"') + '<circle cx="80" cy="30" r="10" fill="#fde047" stroke="#a16207"/>'+ txt(96, 34, "+4 €", ' style="font-size:11px"') + '<circle cx="230" cy="30" r="10" fill="#fde047" stroke="#a16207"/>'+ txt(246, 34, "+1 €", ' style="font-size:11px"'));
      },
      function(){ // Handytarife
        return svg(himmel() + telefon(50, 30, "A") + telefon(200, 30, "B") + txt(150, 40, "5 € + 0,10 €".replace(/,/g, window.FK && !FK.kommaSprache() ? "." : ","), ' text-anchor="middle" style="font-size:11px"') + txt(150, 62, "15 € + 0,05 €".replace(/,/g, window.FK && !FK.kommaSprache() ? "." : ","), ' text-anchor="middle" style="font-size:11px"') + txt(150, 100, "= ?", ' text-anchor="middle" style="font-size:18px"'));
      },
      function(){ // Gartenzaun
        var pf = ""; for(var x = 40; x <= 280; x += 20){ pf += '<rect x="' + (x - 2) + '" y="22" width="4" height="12" fill="#92400e"/><rect x="' + (x - 2) + '" y="118" width="4" height="12" fill="#92400e"/>'; }
        for(var y = 38; y <= 118; y += 20){ pf += '<rect x="36" y="' + (y - 4) + '" width="12" height="4" fill="#92400e"/><rect x="272" y="' + (y - 4) + '" width="12" height="4" fill="#92400e"/>'; }
        return svg(himmel() + '<rect x="40" y="28" width="240" height="96" fill="#bbf7d0" stroke="#92400e" stroke-width="3"/>' + pf + '<circle cx="110" cy="70" r="14" fill="#16a34a"/><circle cx="210" cy="85" r="10" fill="#f472b6"/>' + txt(160, 146, "2x", ' text-anchor="middle"') + txt(296, 80, "x") + txt(160, 80, "36 m", ' text-anchor="middle" style="fill:#14532d"'));
      }
    ]
  };
  var css = document.createElement("style");
  css.textContent = ".al-bild{margin:6px 0 4px}.al-svg{width:100%;max-width:420px;height:auto;display:block;margin:0 auto;border-radius:10px;border:1px solid #c9d6ea}.al-t{font:700 13px system-ui,sans-serif;fill:#1f2937}";
  document.head.appendChild(css);
  return B;
})();
