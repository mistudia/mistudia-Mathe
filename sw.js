// ============================================================
// sw.js — Service Worker der miStudia-Mathe-App
// HTML/JS/CSS: zuerst Netz (Änderungen sind sofort da), bei Fehler die
// gespeicherte Fassung. Bilder und Schriften: zuerst Zwischenspeicher.
// Jede besuchte Unter-App ist danach auch ohne Netz startbar.
// ============================================================
const CACHE = "ms-mathe-v1";
const CORE = ["/", "/manifest.webmanifest", "/home-button.css", "/home-button.js", "/icons/icon-192.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("ms-mathe-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return;
  const put = res => { if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
  if(/\.(png|jpe?g|webp|svg|woff2)$/i.test(url.pathname)){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(put)));
    return;
  }
  e.respondWith(fetch(req).then(put).catch(() => caches.match(req, { ignoreSearch: true })));
});
