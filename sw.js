const CACHE_NAME = "WorldLeague-v1";
const urlToCache = [
    "/",
    "/index.html",
    "/pages/home.html",
    "/assets/css/home.css",
    "/assets/css/premier-league.css",
    "/assets/css/team.css",
    "/assets/js/front-end/home.js",
    "/assets/js/back-end/registerServiceWorker.js",
    "/manifest.json",
    "/node_modules/materialize-css/dist/css/materialize.min.css",
    "/node_modules/materialize-css/dist/js/materialize.min.js",
    "/node_modules/jquery/dist/jquery.min.js",
    "/assets/img/bola.jpg",
    "/assets/img/bundesliga.png",
    "/assets/img/champion-league.jpg",
    "/assets/img/eredivise.jpg",
    "/assets/img/FIFA-20_2.png",
    "/assets/img/icons8-bookmark-30.png",
    "/assets/img/icons8-menu-50.png",
    "/assets/img/La-Liga.png",
    "/assets/img/league1.jpg",
    "/assets/img/messi.jpg",
    "/assets/img/pogba.jpg",
    "/assets/img/premier-league.jpg",
    "/assets/img/salah.png",
    "/assets/img/splash.png",
    "/assets/img/icon/icon-192x192.png",
    "/assets/img/icon/icon-384x384.png",
    "/assets/img/icon/icon-72x72.png",
    "/assets/img/icon/icon-96x96.png",
    "/assets/img/icon/icon-128x128.png",
    "/assets/img/icon/icon-144x144.png",
    "/assets/img/icon/icon-152x152.png",
    "/assets/img/icon/icon-512x512.png",
    "/page/vaforites.html",
    "/assets/js/front-end/favorites.js",
    "/assets/js/back-end/module/getMatch.js",
    "/assets/js/back-end/module/idb.js",
    "/assets/js/back-end/module/getStandings.js",
    "/assets/js/back-end/module/getTeam.js",
    "/assets/js/back-end/db.js",
    "/assets/img/iconified/favicon.ico",
    "/assets/img/iconified/apple-touch-icon.png",
    "/assets/img/iconified/apple-touch-icon-57x57.png",
    "/assets/img/iconified/apple-touch-icon-72x72.png",
    "/assets/img/iconified/apple-touch-icon-76x76.png",
    "/assets/img/iconified/apple-touch-icon-114x114.png",
    "/assets/img/iconified/apple-touch-icon-120x120.png",
    "/assets/img/iconified/apple-touch-icon-144x144.png",
    "/assets/img/iconified/apple-touch-icon-152x152.png",
    "/assets/img/iconified/apple-touch-icon-180x180.png",
    "/page/bundes-liga.html",
    "/page/champion-league.html",
    "/page/eradivise.html",
    "/page/laliga.html",
    "/page/league1.html",
    "/page/premier-league.html",
    "/page/team.html",
  ];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlToCache);
    })
  );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request, {cacheName:CACHE_NAME})
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
        );
      })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Aktivasi service worker baru');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME && cacheName.startsWith("WorldLeague")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('notificationclick', function(event){
    if (!event.action) {
      console.log('notification onclick');
      return;
    }
  })

  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      requireInteraction:true,
      icon: 'assets/img/icon/icon-192x192.png',
      badge: 'assets/img/icon/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

  self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});