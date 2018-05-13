import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "@app/components/Hello";
import { Grid } from "@app/components/Grid";

ReactDOM.render(
    <div className="row">
        <div className="col-12">
            <Hello compiler="Typescript" framework="React" />
        </div>
        <div className="col-12">
            <Grid />
        </div>
    </div>,
    document.getElementById("App")
);