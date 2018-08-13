import * as express from "express";

import { ShivtrClient, RequestFailedError } from "@server/clients/shivtr-client";
import { Logger, getLogger } from "log4js";


interface ShivtrLogInResponse {
    user: {
        id: number,
        name: string,
        email: string,
        time_zone: string,
        authentication_token: string
    };
}

export class AuthenticationController {
    private constructor(
        private readonly logger: Logger,
        private readonly client: ShivtrClient,
        private readonly request: express.Request,
        private readonly response: express.Response) {
    }

    static registerRoutes(app: express.Express) {
        app.post("/api/log-in", (req, res) => {
            new AuthenticationController(getLogger(AuthenticationController.name),
            new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress),
            req,
            res).logIn();
        });
        app.post("/api/log-out", (req, res) => {
            new AuthenticationController(getLogger(AuthenticationController.name),
            new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress),
            req,
            res).logOut();
        });
    }

    private async logIn() {
        try {
            let logInResponse = await this.client.logIn(
                this.request.body["email"],
                this.request.body["password"]
            );

            this.response.json(logInResponse);
        } catch (error) {
            this.handleRequestFailedError(error);
        }
    }

    private async logOut() {
        try {
            this.client.logOut(this.request.body["token"]);

            this.response.sendStatus(204);
        } catch (error) {
            this.handleRequestFailedError(error);
        }
    }

    private handleRequestFailedError(error: RequestFailedError | any) {
        this.logger.error(error);

        if ((<RequestFailedError>error).statusCode) {
            this.response.status(error.statusCode).send(error.error);
        }
        else {
            this.response.sendStatus(500);
        }
    }
}