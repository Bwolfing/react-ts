import "@app/styles/styles.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "@app/components/App";
import { registerServiceWorker } from "@app/service-worker";

registerServiceWorker();

ReactDOM.render(
    <App />,
    document.getElementById("App")
);