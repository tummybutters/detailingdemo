const CACHE_NAME = 'hardys-wash-n-wax-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  // Add only essential assets that should be available offline
  '/src/main.tsx',
  '/src/index.css'
];

// Install service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache failed to open:', err);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Serve cached content when offline with network-first strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  // For HTML pages, use a network-first strategy
  const isHTMLRequest = event.request.headers.get('accept')?.includes('text/html');
  
  if (isHTMLRequest) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // For other assets, use a cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // If we have a cached version, return it
          return cachedResponse;
        }
        
        // Otherwise try to fetch it from the network
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Clone the response to cache it for later
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => {
                console.error('Failed to cache response:', err);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // For images, return a fallback if we have one
            if (event.request.destination === 'image') {
              return caches.match('/icons/fallback.png');
            }
            throw error;
          });
      })
  );
});