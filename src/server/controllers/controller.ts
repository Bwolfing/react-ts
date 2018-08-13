import * as express from "express";
import { Logger } from "log4js";

import { RequestFailedError } from "@server/clients/shivtr-client";

export class Controller {
    constructor(protected readonly logger: Logger,
        protected readonly request: express.Request,
        protected readonly response: express.Response) {
    }

    protected handleRequestFailedError(error: RequestFailedError | any) {
        this.logger.error(error);

        if ((<RequestFailedError>error).statusCode) {
            this.response.status(error.statusCode).send(error.error);
        }
        else {
            this.response.sendStatus(500);
        }
    }
}