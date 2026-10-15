const CACHE = 'study-timer-v20';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

// インストール時はブラウザのHTTPキャッシュを通さず、必ずサーバーから最新を取る
// Install: always fetch fresh copies from the server, bypassing the browser's HTTP cache
self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS.map(u=>new Request(u, {cache:'reload'}))))
      .then(()=>self.skipWaiting())
  );
});

// 古いキャッシュを削除 / Remove caches from older versions
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if (req.method !== 'GET') return;

  // ページ本体：ネット優先（オンラインなら常に最新）、オフライン時はキャッシュ
  // The page itself: network first (always latest when online), cache when offline
  if (req.mode === 'navigate'){
    e.respondWith(
      fetch(req, {cache:'no-cache'})
        .then(res=>{
          if (res && res.ok){ const copy = res.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); }
          return res;
        })
        .catch(()=>caches.match(req).then(hit=>hit || caches.match('./index.html')))
    );
    return;
  }

  // その他（アイコン等）：キャッシュ優先、裏で更新
  // Everything else (icons etc.): cache first, refresh in the background
  e.respondWith(
    caches.match(req).then(hit=>{
      const fresh = fetch(req).then(res=>{
        if (res && res.status === 200 && res.type === 'basic'){
          const copy = res.clone();
          caches.open(CACHE).then(c=>c.put(req, copy));
        }
        return res;
      }).catch(()=>hit);
      return hit || fresh;
    })
  );
});
