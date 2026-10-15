const CACHE = 'study-timer-v18';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

// キャッシュを先に返し、裏で更新する（オフラインでも起動できる）
self.addEventListener('fetch', e=>{
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit=>{
      const fresh = fetch(e.request).then(res=>{
        if (res && res.status === 200 && res.type === 'basic'){
          const copy = res.clone();
          caches.open(CACHE).then(c=>c.put(e.request, copy));
        }
        return res;
      }).catch(()=>hit);
      return hit || fresh;
    })
  );
});
