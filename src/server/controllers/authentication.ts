import * as express from "express";

import { ShivtrClient, RequestFailedError } from "@server/clients/shivtr-client";
import { Logger } from "log4js";


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
    constructor(private readonly logger: Logger) {
    }

    registerRoutes(app: express.Express) {
        app.post("/api/log-in", this.logIn.bind(this));
    }

    private async logIn(request: express.Request, response: express.Response) {
        try {
            const client = new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);

            let logInResponse = await client.logIn(request.body["email"], request.body["password"]);

            response.json(logInResponse);
        } catch (err) {
            this.logger.error(err);

            if ((<RequestFailedError>err).statusCode) {
                response.status(err.statusCode).send(err.error);
            }
            else {
                response.sendStatus(500);
            }
        }
    }
}

async function LogOut(request: express.Request, response: express.Response) {
    try {
        const client = new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);


    } catch (error) {

    }
}