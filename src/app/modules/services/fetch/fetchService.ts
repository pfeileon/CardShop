import { config } from '../../config/config';
// Hack for fetch-API
declare const fetch;
import { Headers, Request, Response, Promise, Init } from '../../types/types';

'use strict';

export abstract class FetchService {
    /** Returns all data from an-endpoint */
    query = (url?: string, init?: Init, request?: Request): Promise<Init> => {
        url = url || config.api.request.url;

        init = init || {
            headers: config.api.request.headers,
            method: 'GET'
        };

        request = request || { url, init } || config.api.request;

        return this.fetchAsync(request);
    }

    /** Generic Fetch-Method */
    fetchAsync<T extends Request>(arg: T): Promise<T> {
        return fetch(arg.url, arg.init)
            .then((response: Response) => response.json());
    }
}
