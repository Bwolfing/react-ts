export abstract class IShivtrForumsClient {
    abstract forumSections(): Promise<ForumSection[]>;
}

export class ShivtrForumsClient implements IShivtrForumsClient {
    constructor(userAgent: string, private readonly baseAddress: string) {

    }

    async forumSections(): Promise<ForumSection[]> {
        throw new Error("Not implemented");
    }
}