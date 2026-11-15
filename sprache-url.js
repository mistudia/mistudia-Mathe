// ============================================================
// /sprache-url.js – eigene Adresse pro Sprache: …/kachel/?lang=en
// Läuft als ERSTES Skript im <head> (vor allen anderen), damit alle Teile der
// Kachel schon die richtige Sprache aus localStorage lesen.
//   • ?lang=xx → Sprache merken (msMathLang), <html lang/dir> setzen
//   • canonical = genau diese Adresse (mit ?lang, ohne sonstige Parameter)
//   • Titel und Beschreibung aus MS_SEO[xx] (steht davor im <!-- SEO -->-Block)
//   • window.MS_URL_LANG = Sprache aus der Adresse oder null (für Links)
// ============================================================
(function(){
  var L = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"], p = null;
  try { p = new URLSearchParams(location.search).get("lang"); } catch(e){}
  if(L.indexOf(p) < 0) p = null;
  window.MS_URL_LANG = p;
  if(p){
    try { localStorage.setItem("msMathLang", p); } catch(e){}
    document.documentElement.lang = p; document.documentElement.dir = p === "ar" ? "rtl" : "ltr";
    var M = window.MS_SEO;
    if(M && M[p]){
      document.title = M[p][0];
      var d = document.querySelector('meta[name="description"]'); if(d) d.setAttribute("content", M[p][1]);
      var ot = document.querySelector('meta[property="og:title"]'); if(ot) ot.setAttribute("content", M[p][0]);
      var od = document.querySelector('meta[property="og:description"]'); if(od) od.setAttribute("content", M[p][1]);
    }
  }
  var c = document.createElement("link"); c.rel = "canonical"; c.href = location.origin + location.pathname + (p ? "?lang=" + p : "");
  document.head.appendChild(c);
  var ou = document.querySelector('meta[property="og:url"]'); if(ou) ou.setAttribute("content", c.href);
})();
