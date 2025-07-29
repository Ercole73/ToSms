const CACHE_NAME = 'contatti-protetti-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json'
];

// Evento di installazione: salva i file principali dell'app
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento di fetch: risponde con i file salvati se sei offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è nella cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, prova a prenderla dalla rete
        return fetch(event.request);
      })
  );
});
