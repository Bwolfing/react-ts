import * as express from "express";

import { RequestFailedError } from "@server/clients/json-http-client";
import { IWriteLog } from "@server/clients/logging";

export class Controller {
    constructor(protected readonly log: IWriteLog,
        protected readonly request: express.Request,
        protected readonly response: express.Response) {
    }

    protected handleRequestFailedError(error: RequestFailedError | any) {
        this.log.error(error);

        if ((<RequestFailedError>error).statusCode) {
            this.response.status(error.statusCode).send(error.error);
        }
        else {
            this.response.sendStatus(500);
        }
    }
}