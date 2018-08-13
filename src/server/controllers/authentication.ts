import * as express from "express";

import { ShivtrClient } from "@server/clients/shivtr-client";

export function RegisterAuthenticationRoutes(app: express.Express) {
    app.post("/api/log-in", LogIn);
}

interface ShivtrLogInResponse {
    user: {
        id: number,
        name: string,
        email: string,
        time_zone: string,
        authentication_token: string
    };
}

async function LogIn(request: express.Request, response: express.Response) {
    try {
        const client = new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);

        let logInResponse = await client.logIn(request.body["email"], request.body["password"]);

        response.json(logInResponse);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

async function LogOut(request: express.Request, response: express.Response) {
    try {
        const client = new ShivtrClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);


    } catch (error) {

    }
}