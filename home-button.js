// Fügt in jede Unter-App der Mathe-App einen runden Knopf oben links ein,
// der zurück zum Startmenü (/) führt. Sprache des Hinweistexts aus der
// Startmenü-Auswahl (localStorage "msMathLang"), sonst Deutsch.
(function(){
  var T = { de: "Alle Mathe-Apps", en: "All math apps", es: "Todas las apps de mate", fr: "Toutes les applis de maths", zh: "全部数学应用" };
  var lang = "de";
  try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  var label = T[lang] || T.de;
  var a = document.createElement("a");
  a.href = "/"; a.className = "ms-home-btn"; a.setAttribute("aria-label", label); a.title = label;
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 2.5 11.1a1 1 0 0 0 1.3 1.5l.7-.6V20a1 1 0 0 0 1 1h4.5v-5.5h4V21H18.5a1 1 0 0 0 1-1v-8l.7.6a1 1 0 1 0 1.3-1.5Z"/></svg>';
  document.body.appendChild(a);
})();
