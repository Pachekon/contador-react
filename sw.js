// se crea el cache de nuestro sitio debemos cachar todas las rutas del site
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
]

const CACHE_NAME = "v2_cache_contador_react"

self.addEventListener("install", (e) =>{
    e.waitUntil(//waitUntil espera hasta que pase algo y devuelve una promesa
        caches.open(CACHE_NAME).then(cache => {
            //se agregan todas las paths
            cache.addAll(CACHE_ELEMENTS).then(()=>{
                self.skipWaiting();
            })
            .catch(console.log)
        })
    )
});
self.addEventListener("activate", (e) =>{
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(//.keys da todas las clave en cao de tener mas de un cache
        caches.keys().then(cacheNames =>{
            return Promise.all(cacheNames.map(cacheName =>{
                return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) =>{
//fecth checa cad que se abra la consola de application y buscar nuevas versiones de arhivos
    e.respondWith(
        caches.match(e.request).then((res) => res ? res : fetch(e.request) )
    );
});