importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url:"/", revision: '1' },
  { url:"/pages/home.html", revision: '1' },
  { url:"/assets/css/home.css", revision: '1' },
  { url:"/assets/css/premier-league.css", revision: '1' },
  { url:"/assets/css/team.css", revision: '1' },
  { url:"/assets/js/front-end/home.js", revision: '1' },
  { url:"/assets/js/back-end/registerServiceWorker.js", revision: '1' },
  { url:"/manifest.json", revision: '1' },
  { url:"/node_modules/materialize-css/dist/css/materialize.min.css", revision: '1' },
  { url:"/node_modules/materialize-css/dist/js/materialize.min.js", revision: '1' },
  { url:"/node_modules/jquery/dist/jquery.min.js", revision: '1' },
  { url:"/assets/img/bola.jpg", revision: '1' },
  { url:"/assets/img/bundesliga.png", revision: '1' },
  { url:"/assets/img/champion-league.jpg", revision: '1' },
  { url:"/assets/img/eredivise.jpg", revision: '1' },
  { url:"/assets/img/FIFA-20_2.png", revision: '1' },
  { url:"/assets/img/icons8-bookmark-30.png", revision: '1' },
  { url:"/assets/img/icons8-menu-50.png", revision: '1' },
  { url:"/assets/img/La-Liga.png", revision: '1' },
  { url:"/assets/img/league1.jpg", revision: '1' },
  { url:"/assets/img/messi.jpg", revision: '1' },
  { url:"/assets/img/pogba.jpg", revision: '1' },
  { url:"/assets/img/premier-league.jpg", revision: '1' },
  { url:"/assets/img/salah.png", revision: '1' },
  { url:"/assets/img/splash.png", revision: '1' },
  { url:"/assets/img/icon/icon-192x192.png", revision: '1' },
  { url:"/assets/img/icon/icon-384x384.png", revision: '1' },
  { url:"/assets/img/icon/icon-72x72.png", revision: '1' },
  { url:"/assets/img/icon/icon-96x96.png", revision: '1' },
  { url:"/assets/img/icon/icon-128x128.png", revision: '1' },
  { url:"/assets/img/icon/icon-144x144.png", revision: '1' },
  { url:"/assets/img/icon/icon-152x152.png", revision: '1' },
  { url:"/assets/img/icon/icon-512x512.png", revision: '1' },
  { url:"/page/vaforites.html", revision: '1' },
  { url:"/assets/js/front-end/favorites.js", revision: '1' },
  { url:"/assets/js/back-end/module/getMatch.js", revision: '1' },
  { url:"/assets/js/back-end/module/idb.js", revision: '1' },
  { url:"/assets/js/back-end/module/getStandings.js", revision: '1' },
  { url:"/assets/js/back-end/module/getTeam.js", revision: '1' },
  { url:"/assets/js/back-end/db.js", revision: '1' },
  { url:"/assets/img/iconified/favicon.ico", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-57x57.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-72x72.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-76x76.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-114x114.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-120x120.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-144x144.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-152x152.png", revision: '1' },
  { url:"/assets/img/iconified/apple-touch-icon-180x180.png", revision: '1' },
  { url:"/page/bundes-liga.html", revision: '1' },
  { url:"/page/champion-league.html", revision: '1' },
  { url:"/page/eradivise.html", revision: '1' },
  { url:"/page/laliga.html", revision: '1' },
  { url:"/page/league1.html", revision: '1' },
  { url:"/page/premier-league.html", revision: '1' },
  { url:"/page/team.html", revision: '1' },
  { url:"/assets/js/back-end/notification.js", revision: '1' },
],{
// Ignore all URL parameters.
ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);


  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.cacheFirst({
        cacheName: 'validate'
    })
  );


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

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-data'
    })
  );
