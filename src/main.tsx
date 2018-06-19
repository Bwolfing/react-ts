import "@app/styles/styles.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { registerServiceWorker } from "@app/service-worker";
import { App } from "@app/components/App";

registerServiceWorker();

ReactDOM.render(
    <App />,
    document.getElementById("App")
);