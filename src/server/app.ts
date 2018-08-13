import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import { configure, connectLogger, getLogger, Logger } from "log4js";

import { RegisterForumsRoutes } from "@server/controllers/forums";
import { AuthenticationController } from "@server/controllers/authentication";


export class ServerApp {
    private readonly app: express.Express;
    private readonly log: Logger;
    private readonly distPath: string;

    constructor() {
        this.distPath = path.join(process.cwd(), "dist");
        this.app = express();

        this.configureLogging();

        this.log = getLogger();

        this.configureMiddleware();
        this.registerRoutes();

        this.log.info("Application configured.");
    }

    private configureLogging() {
        const log4jsConfig = fs.readFileSync(
            path.join(process.cwd(), "config/log4js.json"),
            "utf8"
        );

        configure(JSON.parse(log4jsConfig));
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(connectLogger(getLogger(), {}));
        this.app.use(express.static(this.distPath));
        this.app.use(express.static(path.join(this.distPath, "assets")));
    }

    private registerRoutes() {
        new AuthenticationController(getLogger(AuthenticationController.name)).registerRoutes(this.app);

        RegisterForumsRoutes(this.app);

        this.app.get("*", (request, response) => {
            response.sendfile(path.join(this.distPath, "index.html"));
        });
    }

    start(port: string | number) {
        this.app.listen(port, () => {
            this.log.info(`Listening on port ${port}. Press Ctrl + C to exit.`);
        });
    }
}