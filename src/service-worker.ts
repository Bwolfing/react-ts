import { Routes } from "@app/application-routes";

declare const __webpack_hash__: string;

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            try {
                let registration = await navigator.serviceWorker.register("/service-worker.bundle.js");

                console.log("Registered service worker!", registration.scope)
            }
            catch (e) {
                console.error("Service worked registraion failed", e);
            }
        });
    }
}

const AssetCache = `Asset_Cache_${__webpack_hash__}`;
const PageCache = `Page_Cache_${__webpack_hash__}`;
const ApplicationCaches = [
    AssetCache,
    PageCache
];

function onInstall(event: InstallEvent) {
    console.log("Installing service worker.");
    event.waitUntil(
        Promise.all([
            openAssetCache(),
            openPageCache()
        ])
    );

    function openAssetCache() {
        return caches.open(AssetCache)
            .then(cache => {
                console.log("Opened asset cache.");
                const assetsToCache = [
                    "/main.bundle.js",
                    "/vendor.bundle.js",
                    "/styles.bundle.css",
                ];

                return cache.addAll(assetsToCache).then(
                    () => console.log("Assets stored."),
                    err => console.error("Failed to add assets to asset cache.", err)
                );
            })
    }
    function openPageCache() {
        return caches.open(PageCache)
            .then(cache => {
                console.log("Opened page cache.");
                let routeUrls = [];

                for (const key in Routes) {
                    routeUrls.push(Routes[key]);
                }

                return cache.addAll(routeUrls).then(
                    () => console.log("Pages stored."),
                    err => console.error("Failed to add pages to page cache.", err)
                );
            })
    }
}

function onActivate(event: ActivateEvent) {
    console.log("activiating new service working.");
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(cacheNames.map(cacheName => {
                if (ApplicationCaches.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            }))
        )
    );
}

function onFetch(event: FetchEvent) {
    console.log("Checking cache for value ", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log("Value found in cache");
                    return response;
                }

                console.log("Fetching request")
                return fetch(event.request);
            })
    );
}

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", onActivate);