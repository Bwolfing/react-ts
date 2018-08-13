import { HttpClient, HttpCodes } from "typed-rest-client/HttpClient";
import { IHttpClientResponse, IHeaders } from "typed-rest-client/Interfaces";

interface ShivtrAuthenticationResponse {
    user_session: {
        id: number,
        name: string,
        email: string,
        time_zone: string,
        authentication_token: string
    };
}

export class RequestFailedError extends Error {
    constructor(
        public readonly requestUrl: string,
        public readonly statusCode: number,
        public readonly error?: any) {
        super(`Request to '${requestUrl}' failed (${statusCode} - ${HttpCodes[statusCode]}).`);
    }

    toString(): string {
        return JSON.stringify(this);
    }
}

export class ShivtrClient {
    private readonly httpClient: HttpClient;
    private readonly jsonHeaders: IHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    };

    constructor(userAgent: string, private readonly baseAddress: string) {
        this.httpClient = new HttpClient(userAgent);
    }

    async logIn(email: string, password: string): Promise<User> {
        const data = JSON.stringify({
            user: {
                email,
                password
            }
        }, null, 2);

        let response = await this.httpClient.post(
            `${this.baseAddress}/users/sign_in.json`,
            data,
            this.jsonHeaders
        );

        if (response.message.statusCode !== HttpCodes.OK) {
            let errorResponse = await this.readBodyAs<{ error: string }>(response);

            throw new RequestFailedError(
                `${this.baseAddress}/users/sign_in.json`,
                response.message.statusCode,
                errorResponse
            );
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

    async logOut(token: string): Promise<void> {
        let response = await this.httpClient.del(`${this.baseAddress}/users/sign_out.json?auth_token=${token}`);

        if (response.message.statusCode !== 204) {
            throw new RequestFailedError(
                `${this.baseAddress}/users/sign_out.json`,
                response.message.statusCode
            );
        }
    }

    private async readBodyAs<T>(response: IHttpClientResponse): Promise<T> {
        return <T>JSON.parse(await response.readBody());
    }
}
