import { RestClient } from "typed-rest-client";
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
// export class ShivtrClient {
//     private readonly httpClient: RestClient;

//     constructor(userAgent: string, baseAddress: string) {
//         this.httpClient = new RestClient(userAgent, baseAddress);
//     }

//     async logIn(email: string, password: string): Promise<User> {
//         let response = await this.httpClient.create<ShivtrAuthenticationResponse>(
//             "/users/sign_in.json",
//             {
//                 user: {
//                     email,
//                     password
//                 }
//             }
//         );

//         console.log(response.statusCode);

//         let user: User = {
//             id: response.result.user_session.id,
//             name: response.result.user_session.name,
//             authenticationToken: response.result.user_session.authentication_token,
//             email: response.result.user_session.email,
//             timeZone: response.result.user_session.time_zone
//         };

//         return user;
//     }

//     private async readBodyAs<T>(response: IHttpClientResponse): Promise<T> {
//         let data = await response.readBody();

//         if (!data) {
//             return null;
//         }

//         return <T>JSON.parse(data);
//     }
// }