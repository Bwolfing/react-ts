import * as express from "express";

import { ShivtrAuthClient, IAuthenticateWithShivtr } from "@server/clients/shivtr-auth-client";
import { getLogger } from "log4js";
import { Controller } from "@server/controllers/controller";
import { IWriteLog } from "@server/clients/logging";


export class AuthenticationController extends Controller {
    constructor(log: IWriteLog,
        request: express.Request,
        response: express.Response,
        private readonly client: IAuthenticateWithShivtr) {
            super(log, request, response);
    }

    static registerRoutes(app: express.Express) {
        app.post("/api/log-in", async (req, res) => {
            await new AuthenticationController(
                getLogger(AuthenticationController.name),
                req,
                res,
                new ShivtrAuthClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress)
            ).logIn(req.body["email"], req.body["email"]);
        });
        app.post("/api/log-out", async (req, res) => {
            await new AuthenticationController(
                getLogger(AuthenticationController.name),
                req,
                res,
                new ShivtrAuthClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress)
            ).logOut(req.body["token"]);
        });
    }

    async logIn(email: string, password: string) {
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

    async logOut(token: string) {
        try {
            this.client.logOut(token);

            this.response.sendStatus(204);
        } catch (error) {
            this.handleRequestFailedError(error);
        }
    }
}