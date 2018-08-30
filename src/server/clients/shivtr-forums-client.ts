import { JsonHttpClient } from "@server/clients/json-http-client";

export abstract class IShivtrForumsClient {
    abstract forumSections(): Promise<ForumSection[]>;
}

interface ShivtrForumsResponse {
    forum_sections: ShivtrForumSection[];
    forums: ShivtrForum[];
}

interface ShivtrForumSection {
    id: number;
    name: string;
    forum_ids: number[];
}

interface ShivtrForum {
    id: number;
    name: string;
    description: string;
}

export class ShivtrForumsClient extends JsonHttpClient implements IShivtrForumsClient {
    constructor(userAgent: string, baseAddress: string) {
        super(userAgent, baseAddress);
    }

    async forumSections(): Promise<ForumSection[]> {
        const response = await this.getAsJson<ShivtrForumsResponse>("api/forums.json");

        return this.map(response);
    }

    private map(response: ShivtrForumsResponse): ForumSection[] {
        let mappedResponse: ForumSection[];

        mappedResponse = response.forum_sections.map(section => {
            return {
                name: section.name,
                forums: section.forum_ids.map(id => {
                    let shivtrForum = response.forums.find(f => f.id === id)

                    return {
                        id,
                        name: shivtrForum.name,
                        description: shivtrForum.description
                    };
                })
            };
        });

        return mappedResponse;
    }
}