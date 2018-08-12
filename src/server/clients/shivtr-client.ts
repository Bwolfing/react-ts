import { HttpClient, HttpCodes } from "typed-rest-client/HttpClient";
import { IHttpClientResponse } from "typed-rest-client/Interfaces";

interface ShivtrAuthenticationResponse {
    user_session: {
        id: number,
        name: string,
        email: string,
        time_zone: string,
        authentication_token: string
    };
}

export class ShivtrClient {
    private readonly httpClient: HttpClient;

    constructor(userAgent: string, private readonly baseAddress: string) {
        this.httpClient = new HttpClient(userAgent, undefined, {
            headers: {
                "User-Agent": userAgent,
                "Content-Type": "application/json"
            }
        });
    }

    async logIn(email: string, password: string): Promise<User> {
        let response = await this.httpClient.post(
            `${this.baseAddress}/users/sign_in.json`,
            JSON.stringify({
                user: {
                    email,
                    password
                }
            })
        );

        if (response.message.statusCode !== HttpCodes.OK) {
            let errorResponse = await this.readBodyAs<{ error: string }>(response);
            throw new Error(`Failed request to '${this.baseAddress}/users/sign_in.json' (HTTP ${response.message.statusCode}): ${errorResponse.error}`);
        }

        let shivtrUser = await this.readBodyAs<ShivtrAuthenticationResponse>(response);
        let user: User = {
            id: shivtrUser.user_session.id,
            name: shivtrUser.user_session.name,
            authenticationToken: shivtrUser.user_session.authentication_token,
            email: shivtrUser.user_session.email,
            timeZone: shivtrUser.user_session.time_zone
        };

        return user;
    }

    private async readBodyAs<T>(response: IHttpClientResponse): Promise<T> {
        return <T>JSON.parse(await response.readBody());
    }
}