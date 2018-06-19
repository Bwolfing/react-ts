declare const __webpack_hash__: string;

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            try {
                console.log("Environment: ", process.env.NODE_ENV);
                if (process.env.NODE_ENV === "production") {
                    console.log("hash: ",__webpack_hash__);
                }

                let registration = await navigator.serviceWorker.register("/service-worker.bundle.js");

                console.log("Registered service worker!", registration.scope)
            }
            catch (e) {
                console.error("Service worked registraion failed", e);
            }
        });
    }
}