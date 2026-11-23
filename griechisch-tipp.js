// ============================================================
// griechisch-tipp.js – Erklär-Blase für griechische Buchstaben (überall in der
// Mathe-App, über home-button.js geladen). Fährt man mit der Maus über ε, ζ, η,
// θ … (ab Epsilon, dazu Γ Δ Θ Λ Ξ Π Σ Φ Ψ Ω) oder tippt am Handy darauf, erscheint
// der Name in der Menüsprache (Deutsch mit Aussprache-Hilfe) und ein Link zur
// Kachel „Griechisches Alphabet“. Funktioniert in normalem Text und in SVG-Zeichnungen,
// ohne den Text umzubauen (Zeichen wird per caretRangeFromPoint gefunden).
// Abschalten: data-nogr an einem Element.
// ============================================================
(function(){
  "use strict";
  if(window.MS_GRTIPP) return; window.MS_GRTIPP = true;
  var KLEIN = "αβγδεζηθικλμνξοπρστυφχψω", GROSS = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
  var NEBEN = { "ς": 17, "ϑ": 7, "ϕ": 20, "ϵ": 4 };
  var NAME = {"de": ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "My", "Ny", "Xi", "Omikron", "Pi", "Rho", "Sigma", "Tau", "Ypsilon", "Phi", "Chi", "Psi", "Omega"], "en": ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"], "es": ["alfa", "beta", "gamma", "delta", "épsilon", "dseta", "eta", "theta", "iota", "kappa", "lambda", "mi", "ni", "xi", "ómicron", "pi", "rho", "sigma", "tau", "ípsilon", "fi", "ji", "psi", "omega"], "zh": ["阿尔法", "贝塔", "伽马", "德尔塔", "艾普西隆", "泽塔", "伊塔", "西塔", "约塔", "卡帕", "兰姆达", "缪", "纽", "克西", "奥密克戎", "派", "柔", "西格玛", "陶", "宇普西隆", "斐", "希", "普西", "欧米伽"], "fr": ["alpha", "bêta", "gamma", "delta", "epsilon", "zêta", "êta", "thêta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rhô", "sigma", "tau", "upsilon", "phi", "khi", "psi", "oméga"], "ru": ["альфа", "бета", "гамма", "дельта", "эпсилон", "дзета", "эта", "тета", "йота", "каппа", "лямбда", "мю", "ню", "кси", "омикрон", "пи", "ро", "сигма", "тау", "ипсилон", "фи", "хи", "пси", "омега"], "ar": ["ألفا", "بيتا", "غاما", "دلتا", "إبسيلون", "زيتا", "إيتا", "ثيتا", "يوتا", "كابا", "لامدا", "ميو", "نيو", "كساي", "أوميكرون", "باي", "رو", "سيغما", "تاو", "أبسيلون", "فاي", "كاي", "بساي", "أوميغا"], "ja": ["アルファ", "ベータ", "ガンマ", "デルタ", "イプシロン", "ゼータ", "イータ", "シータ", "イオタ", "カッパ", "ラムダ", "ミュー", "ニュー", "クシー", "オミクロン", "パイ", "ロー", "シグマ", "タウ", "ウプシロン", "ファイ", "カイ", "プサイ", "オメガ"], "pt": ["alfa", "beta", "gama", "delta", "épsilon", "zeta", "eta", "teta", "iota", "capa", "lambda", "mi", "ni", "csi", "ómicron", "pi", "rô", "sigma", "tau", "ípsilon", "fi", "qui", "psi", "ômega"]};
  var TITEL = {"de": "Griechisches Alphabet", "en": "Greek alphabet", "es": "Alfabeto griego", "zh": "希腊字母表", "fr": "Alphabet grec", "ru": "Греческий алфавит", "ar": "الأبجدية اليونانية", "ja": "ギリシャ文字一覧", "pt": "Alfabeto grego"}, SPR = {"de": "gesprochen", "en": "say", "es": "se pronuncia", "zh": "读作", "fr": "se prononce", "ru": "читается", "ar": "تُنطق", "ja": "読み方", "pt": "pronuncia-se"}, DE_AUSSPR = {"Zeta": "Tseta", "Eta": "Äta", "Theta": "Teta", "Iota": "Jota", "My": "Mü", "Ny": "Nü", "Xi": "Ksi", "Ypsilon": "Üpsilon", "Phi": "Fi", "Chi": "Chi wie in „ach“", "Omikron": "Ómikron", "Epsilon": "Épsilon", "Omega": "Ómega", "Lambda": "Lambda", "Kappa": "Kappa"};
  function sprache(){ var l = "de"; try { l = localStorage.getItem("msMathLang") || window.MS_MATH_LANG || "de"; } catch(e){} return NAME[l] ? l : "de"; }
  // Index im Alphabet oder -1 (α–δ und lateinisch aussehende Großbuchstaben bekommen keine Blase)
  function index(ch){
    var i = KLEIN.indexOf(ch); if(i >= 4) return i;
    if(NEBEN[ch] != null) return NEBEN[ch];
    i = GROSS.indexOf(ch); if(i >= 0 && "ΓΔΘΛΞΠΣΦΨΩ".indexOf(ch) >= 0) return i;
    return -1;
  }
  var tip = null, hideT = null, aktiv = "";
  function box(){
    if(tip) return tip;
    tip = document.createElement("div"); tip.className = "ms-gr-tip"; tip.setAttribute("role", "tooltip");
    var st = document.createElement("style");
    st.textContent = ".ms-gr-tip{position:fixed;z-index:30000;max-width:min(320px,90vw);background:#fff;color:#1a2233;border:1.5px solid #7c3aed;border-radius:12px;box-shadow:0 6px 22px rgba(0,0,0,.18);padding:8px 12px;font:15px/1.35 system-ui,sans-serif;pointer-events:auto}" +
      ".ms-gr-tip b{font:700 24px 'Cambria Math',Cambria,'Times New Roman',serif;color:#7c3aed;margin-right:8px;vertical-align:-2px}" +
      ".ms-gr-tip .gn{font-weight:700}.ms-gr-tip .ga{display:block;color:#475569;font-size:13px}" +
      ".ms-gr-tip a{display:inline-block;margin-top:4px;color:#1565c0;font-weight:600;text-decoration:none}.ms-gr-tip a:hover{text-decoration:underline}";
    document.head.appendChild(st);
    tip.addEventListener("mouseenter", function(){ clearTimeout(hideT); });
    tip.addEventListener("mouseleave", function(){ verstecken(250); });
    document.body.appendChild(tip);
    return tip;
  }
  function zeigen(chars, x, y){
    var l = sprache(), key = chars.join("") + l;
    var t = box();
    if(aktiv !== key){
      aktiv = key;
      var h = chars.map(function(ch){
        var n = NAME[l][index(ch)], a = l === "de" && DE_AUSSPR[n] ? '<span class="ga">' + SPR.de + ": " + DE_AUSSPR[n] + "</span>" : "";
        return '<div><b>' + ch + '</b><span class="gn">' + n + "</span>" + a + "</div>";
      }).join("");
      var dir = l === "ar" ? ' dir="rtl"' : "";
      t.innerHTML = "<div" + dir + ">" + h + '<a href="/griechisch/?lang=' + l + '">' + TITEL[l] + " ›</a></div>";
    }
    clearTimeout(hideT);
    t.style.display = "block";
    var w = t.offsetWidth, hh = t.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
    var lx = Math.min(vw - w - 8, Math.max(8, x + 14)), ly = y + 18 + hh > vh - 8 ? y - hh - 14 : y + 18;
    t.style.left = lx + "px"; t.style.top = Math.max(8, ly) + "px";
  }
  function verstecken(ms){
    clearTimeout(hideT);
    hideT = setTimeout(function(){ if(tip){ tip.style.display = "none"; } aktiv = ""; }, ms || 0);
  }
  // Zeichen unter dem Zeiger finden
  function zeichenBei(x, y, ziel){
    if(!ziel || !ziel.closest) return null;
    if(ziel.closest("input, textarea, select, [data-nogr], .ms-gr-tip")) return null;
    var sv = ziel.closest("text");
    if(sv && ziel.ownerSVGElement !== undefined){
      var gef = [];
      (sv.textContent || "").split("").forEach(function(c){ if(index(c) >= 0 && gef.indexOf(c) < 0) gef.push(c); });
      return gef.length ? gef : null;
    }
    var node = null, off = 0;
    if(document.caretPositionFromPoint){ var cp = document.caretPositionFromPoint(x, y); if(cp){ node = cp.offsetNode; off = cp.offset; } }
    else if(document.caretRangeFromPoint){ var cr = document.caretRangeFromPoint(x, y); if(cr){ node = cr.startContainer; off = cr.startOffset; } }
    if(!node || node.nodeType !== 3) return null;
    var txt = node.nodeValue;
    for(var k = off - 1; k <= off; k++){
      if(k < 0 || k >= txt.length || index(txt[k]) < 0) continue;
      var r = document.createRange(); r.setStart(node, k); r.setEnd(node, k + 1);
      var b = r.getBoundingClientRect();
      if(x >= b.left - 2 && x <= b.right + 2 && y >= b.top - 2 && y <= b.bottom + 2) return [txt[k]];
    }
    return null;
  }
  var raf = 0, letztes = null, cursorEl = null;
  function cursor(el){
    if(cursorEl === el) return;
    if(cursorEl) cursorEl.style.cursor = cursorEl._msGrCur || "";
    cursorEl = el;
    if(el){ el._msGrCur = el.style.cursor; el.style.cursor = "help"; }
  }
  document.addEventListener("mousemove", function(e){
    letztes = e;
    if(raf) return;
    raf = requestAnimationFrame(function(){
      raf = 0; var ev = letztes;
      if(tip && tip.contains(ev.target)) return;
      var c = zeichenBei(ev.clientX, ev.clientY, ev.target);
      if(c){ zeigen(c, ev.clientX, ev.clientY); cursor(ev.target); }
      else { cursor(null); if(tip && tip.style.display === "block") verstecken(350); }
    });
  }, { passive: true });
  // Handy: Antippen zeigt die Blase 5 s lang
  document.addEventListener("pointerup", function(e){
    if(e.pointerType === "mouse") return;
    if(tip && tip.contains(e.target)) return;
    var c = zeichenBei(e.clientX, e.clientY, e.target);
    if(c){ zeigen(c, e.clientX, e.clientY); verstecken(5000); }
    else if(tip && tip.style.display === "block") verstecken(0);
  }, true);
  window.addEventListener("scroll", function(){ if(tip && tip.style.display === "block") verstecken(0); }, { passive: true });
  window.MS_GRTIPP_TEST = { index: index, zeichenBei: zeichenBei };
})();
