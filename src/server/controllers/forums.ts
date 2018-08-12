import * as express from "express";
import { RestClient } from "typed-rest-client/RestClient";

interface ShivtrForums {
    forums_sections: {
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

export async function Forums(request: express.Request, response: express.Response) {
    let client = new RestClient("shivtr-client", "https://selamaashalanore.shivtr.com");

    try
    {
        let forumsJson = await client.get<ShivtrForums>("forums.json");

        response.json(forumsJson);
    }
    catch (error)
    {
        console.error(error);
        response.sendStatus(500);
    }
}