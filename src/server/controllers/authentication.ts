import * as express from "express";

import { ShivtrClient } from "@server/clients/shivtr-client";
import { Logger, getLogger } from "log4js";
import { Controller } from "@server/controllers/controller";


export class AuthenticationController extends Controller {
    private constructor(logger: Logger,
        request: express.Request,
        response: express.Response,
        private readonly client: ShivtrClient) {
            super(logger, request, response);
    }

    static registerRoutes(app: express.Express) {
        app.post("/api/log-in", (req, res) => {
            new AuthenticationController(
                getLogger(AuthenticationController.name),
                req,
                res,
                new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress)
            ).logIn(req.body["email"], req.body["email"]);
        });
        app.post("/api/log-out", (req, res) => {
            new AuthenticationController(
                getLogger(AuthenticationController.name),
                req,
                res,
                new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress)
            ).logOut(req.body["token"]);
        });
    }

    private async logIn(email: string, password: string) {
        try {
            let logInResponse = await this.client.logIn(
                email,
                password
            );

            this.response.json(logInResponse);
        } catch (error) {
            this.handleRequestFailedError(error);
        }
    }

    private async logOut(token: string) {
        try {
            this.client.logOut(token);

            this.response.sendStatus(204);
        } catch (error) {
            this.handleRequestFailedError(error);
        }
    }
}