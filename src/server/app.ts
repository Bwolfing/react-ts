import * as express from "express";
import * as path from "path";
import { configure, connectLogger, Configuration, getLogger } from "log4js";

import { RegisterForumsRoutes } from "@server/controllers/forums";
import { RegisterAuthenticationRoutes } from "@server/controllers/authentication";

export const ServerApp = express();
const dist = path.join(process.cwd(), "dist");

let config: Configuration = {
    appenders: {
        console: {
            type: "console"
        }
    },
    categories: {
        default: {
            appenders: ["console"],
            level: "all"
        }
    }
};

configure(config);

ServerApp.use(connectLogger(getLogger(), {}));
ServerApp.use(express.json());
ServerApp.use(express.static(dist));
ServerApp.use(express.static(path.join(dist, "assets")));

ServerApp.get("/api/todos", (request, response) => {
    setTimeout(() => {
        if (new Date(Date.now()).getSeconds() % 2) {
            response.statusMessage = "Intentional failure";
            response.status(400).send({
                error: "Bad Request",
                errorDetail: "Wanted an intentional error"
            });
            return;
        }

        response.send([
            {
                id: 1,
                completed: true,
                text: "Read about React"
            },
            {
                id: 2,
                completed: true,
                text: "Build with React"
            },
            {
                id: 3,
                completed: false,
                text: "Read about Redux"
            },
            {
                id: 4,
                completed: false,
                text: "Build with Redux"
            },
        ])
    }, 3000);
});

RegisterAuthenticationRoutes(ServerApp);
RegisterForumsRoutes(ServerApp);

ServerApp.get("*", (request: express.Request, response: express.Response) => {
    response.sendFile(path.join(dist, "index.html"));
});