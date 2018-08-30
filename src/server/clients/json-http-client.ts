import { HttpClient, HttpCodes } from "typed-rest-client/HttpClient";
import { IHeaders, IHttpClientResponse } from "typed-rest-client/Interfaces";

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

export class JsonHttpClient {
    private readonly client: HttpClient;
    private readonly jsonHeaders: IHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    };

    constructor(userAgent: string, private readonly baseAddress: string) {
        this.client = new HttpClient(userAgent);
        this.baseAddress = baseAddress || "";

        if (!this.baseAddress) {
            throw new Error("baseAddress must not be falsy");
        }

        this.baseAddress = this.baseAddress.trim();

        if (!this.baseAddress) {
            throw new Error("baseAddress must not be white space only");
        }

        const hasTrailingSlash = new RegExp("/$");
        if (!hasTrailingSlash.test(this.baseAddress)) {
            this.baseAddress += "/"
        }
    }

    async postAsJson<TResponse>(uri: string, data: any): Promise<TResponse> {
        const dataToSubmit = JSON.stringify(data, null, 2);
        const requestUri = `${this.baseAddress}${uri}`;
        const response = await this.client.post(
            requestUri,
            dataToSubmit,
            this.jsonHeaders
        );

        await this.ensureSuccessStatus(requestUri, response);

        return await this.readBodyAs<TResponse>(response);
    }

    async deleteAsJson(uri: string): Promise<void> {
        const requestUri = `${this.baseAddress}${uri}`;
        const response = await this.client.del(
            requestUri,
            this.jsonHeaders
        );

        await this.ensureSuccessStatus(requestUri, response);
    }

    async getAsJson<TResponse>(uri: string): Promise<TResponse> {
        const requestUri = `${this.baseAddress}${uri}`;

        const response = await this.client.get(requestUri);

        await this.ensureSuccessStatus(requestUri, response);

        return await this.readBodyAs<TResponse>(response);
    }

    private async ensureSuccessStatus(uri: string, response: IHttpClientResponse): Promise<void> {
        if (response.message.statusCode !== HttpCodes.OK && response.message.statusCode !== 204) {
            let errorResponse = await this.readBodyAs<{ error: string }>(response);

            throw new RequestFailedError(
                uri,
                response.message.statusCode,
                errorResponse
            );
        }
    }

    private async readBodyAs<T>(response: IHttpClientResponse): Promise<T> {
        return <T>JSON.parse(await response.readBody());
    }
}