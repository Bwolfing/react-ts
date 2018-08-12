import * as express from "express";
import { RestClient } from "typed-rest-client/RestClient";

interface ShivtrForums {
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

export async function Forums(request: express.Request, response: express.Response) {
    let client = new RestClient("shivtr-client", "https://selamaashalanore.shivtr.com");

    try
    {
        let shivtrData = await client.get<ShivtrForums>("forums.json");
        let responseData: ForumSection[] = [];
console.log(shivtrData);
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