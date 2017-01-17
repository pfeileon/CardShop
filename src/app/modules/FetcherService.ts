declare const fetch;
import { config } from '../config/config';

'use strict';

/** static */
export class FetcherService {

    /** Prevent instantiation */
    private constructor() {
        throw new Error('static class');
    }
    /** Returns all data from a hearthstoneAPI-endpoint */
    static query(url: string) {
        const init = {
            headers: { 'X-Mashape-Authorization': config.mashApeKey },
            method: 'GET'
        };

        return fetch(url, init)
            .then(data => data.json())
            .catch(error => console.error(error));
    }
}