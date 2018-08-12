import * as express from "express";
import { RestClient } from "typed-rest-client/RestClient";

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

export async function Forums(request: express.Request, response: express.Response) {
    let client = new RestClient("shivtr-client", "https://selamaashalanore.shivtr.com");

    try
    {
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