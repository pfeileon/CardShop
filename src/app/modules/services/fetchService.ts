import { config } from '../../config/config';
// Hack for fetch-API
declare const fetch;
import { Headers, Request, Response, Promise, Init } from '../../types/types'
import { fetchAsync } from '../utilities';

'use strict';

export class FetchService {

    /** Returns all data from a hearthstoneAPI-endpoint */
    query = (url?: string, init?: Init, request?: Request): Promise<Init> => {
        url = url || config.api.url;

        init = init || {
            headers: { 'X-Mashape-Authorization': config.api.mashApeKey },
            method: 'GET'
        };

        request = request || {
            url,
            init
        }

        return fetchAsync(request);
    }
}
