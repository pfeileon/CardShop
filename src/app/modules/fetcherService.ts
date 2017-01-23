import { config } from '../config/config';

'use strict';

// Hack for fetch-API
declare const fetch;
interface Headers { }
interface Request { url: string, init?: Init }
interface Response { json(); }
interface Promise<T> { then; }

interface Init {
    headers: Headers;
    method: string;
    mode?: string;
    cache?: string;
}

export class FetcherService {

    /** Returns all data from a hearthstoneAPI-endpoint */
    query(url?: string, init?: Init, request?: Request): Promise<Init> {
        url = url || config.api.url;

        init = init || {
            headers: { 'X-Mashape-Authorization': config.api.mashApeKey },
            method: 'GET'
        };

        request = request || {
            url,
            init
        }

        return FetcherService.fetchAsync(request);
    }

    /** Generic Fetch-Method */
    private static fetchAsync<T extends Request>(arg: T): Promise<T> {
        return fetch(arg.url, arg.init)
            .then((response: Response) => response.json());
    }
}
