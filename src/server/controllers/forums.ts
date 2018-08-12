import * as express from "express";
import { RestClient } from "typed-rest-client";

interface ShivtrForumSections {
    forum_sections: {
        id: number,
        name: string,
        forum_ids: number[]
    }[];
    forums: {
        id: number,
        name: string,
        description: string
    }[];
}

interface ShivtrForum {
    forums: {
        id: number,
        name: string,
        description: string
    }[];
    forum_threads: {
        id: number,
        subject: string,
        sticky: boolean,
        lock: boolean,
        views: number,
        forum_posts_count: number,
        created_on: string,
        forum_id: number
    }[];
}

export function RegisterForumsRoutes(app: express.Express) {
    app.get("/api/forums", GetForumSections);

}

async function GetForumSections(request: express.Request, response: express.Response) {
    try
    {
        const client = buildShivtrClient();
        let shivtrData = await client.get<ShivtrForumSections>("forums.json");
        let responseData: ForumSection[] = [];

        if (shivtrData.statusCode !== 200) {
            console.log(`Unsuccessful status: ${shivtrData.statusCode}`);
            response.sendStatus(shivtrData.statusCode);
        }

        shivtrData.result.forum_sections.map(s => {
            responseData.push({
                name: s.name,
                forums: s.forum_ids.map(id => shivtrData.result.forums.find(f => f.id === id))
            })
        });

        response.json(responseData);
    }
    catch (error)
    {
        console.error(error);
        response.sendStatus(500);
    }
}

async function GetForum(request: express.Request, response: express.Response) {
    response.send("NOT IMPLEMENTED");
}

function buildShivtrClient(): RestClient {
    return new RestClient(process.env.ShivtrUserAgent, process.env.ShivtrBaseAddress);
}