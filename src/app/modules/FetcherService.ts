import { config } from '../config/config';
import { fetchAsync } from './utils'

'use strict';

// Hack for fetch-API
declare const fetch;
interface Headers { }
interface Request { url: string, init?: Init }
interface Response { json(); }
export interface Promise<T> { then; }

export interface Init {
    headers: Headers;
    method: string;
    mode?: string;
    cache?: string;
}

export class FetcherService {

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