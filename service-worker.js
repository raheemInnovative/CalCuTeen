// The name of the cache
const CACHE_NAME = 'calcuTeen-cache-v1';

// Files to be cached
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon-192x192.png.png',
  '/icon-512x512.png.png',
  '/manifest.json',
  '/sitemap.xml'
];

// Install event - Cache the necessary files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential assets');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Serve cached assets or fetch from the network if not cached
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached response if it exists, else fetch from the network
      return cachedResponse || fetch(event.request);
    })
  );
});

// Activate event - Clear out old caches and take control of the page immediately
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Ensure the service worker takes control immediately
    })
  );
});
 
