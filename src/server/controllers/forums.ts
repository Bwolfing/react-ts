import * as express from "express";

import { Controller } from "@server/controllers/controller";
import { IWriteLog } from "@server/clients/logging";
import { getLogger } from "log4js";

import { IShivtrForumsClient, ShivtrForumsClient } from "@server/clients/shivtr-forums-client";

export class ForumsController extends Controller {
    private readonly shivtrClient: IShivtrForumsClient;

    constructor(log: IWriteLog,
        request: express.Request,
        response: express.Response) {
        super(log, request, response);

        this.shivtrClient = new ShivtrForumsClient(
            process.env.ShivtrUserAgent,
            process.env.ShivtrBaseAddress
        );
    }

    static registerRoutes(app: express.Express) {
        app.get("/api/forums", async (request, response) => {
            await new ForumsController(
                getLogger(ForumsController.name),
                request,
                response,
            ).getForumSections()
        });
    }

    async getForumSections() {
        try {
            let forums = await this.shivtrClient.forumSections();

            this.response.json(forums);
        }
        catch (e) {
            this.handleRequestFailedError(e);
        }
    }
}

async function getForumSections(request: express.Request, response: express.Response) {
    // try
    // {
    //     const client = buildShivtrClient();
    //     let shivtrData = await client.get<ShivtrForumSections>("forums.json");
    //     let responseData: ForumSection[] = [];

    //     if (shivtrData.statusCode !== 200) {
    //         console.log(`Unsuccessful status: ${shivtrData.statusCode}`);
    //         response.sendStatus(shivtrData.statusCode);
    //     }

    //     shivtrData.result.forum_sections.map(s => {
    //         responseData.push({
    //             name: s.name,
    //             forums: s.forum_ids.map(id => shivtrData.result.forums.find(f => f.id === id))
    //         })
    //     });

    //     response.json(responseData);
    // }
    // catch (error)
    // {
    //     console.error(error);
    //     response.sendStatus(500);
    // }
}

// async function GetForum(request: express.Request, response: express.Response) {
//     response.send("NOT IMPLEMENTED");
// }

// function buildShivtrClient(): RestClient {
//     return new RestClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);
// }