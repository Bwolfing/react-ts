import "@app/styles/styles.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@app/components/App";

registerServiceWorker();

ReactDOM.render(
    <App />,
    document.getElementById("App")
);

function registerServiceWorker() {
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