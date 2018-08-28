import { JsonHttpClient } from "@server/clients/json-http-client";

interface ShivtrAuthenticationResponse {
    user_session: {
        id: number,
        name: string,
        email: string,
        time_zone: string,
        authentication_token: string
    };
}

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

export abstract class IAuthenticateWithShivtr {
    abstract logIn(email: string, password: string): Promise<User>;
    abstract logOut(token: string): Promise<void>;
}

export class ShivtrAuthClient extends JsonHttpClient implements IAuthenticateWithShivtr {
    constructor(userAgent: string, baseAddress: string) {
        super(userAgent, baseAddress);
    }

    async logIn(email: string, password: string): Promise<User> {
        let shivtrUser = await this.postAsJson<ShivtrAuthenticationResponse>("users/sign_in.json", {
            user: {
                email,
                password
            }
        });

        let user: User = {
            id: shivtrUser.user_session.id,
            name: shivtrUser.user_session.name,
            authenticationToken: shivtrUser.user_session.authentication_token,
            email: shivtrUser.user_session.email,
            timeZone: shivtrUser.user_session.time_zone
        };

        return user;
    }

    logOut(token: string): Promise<void> {
        return this.deleteAsJson(`users/sign_out.json?auth_token=${token}`);
    }
}
