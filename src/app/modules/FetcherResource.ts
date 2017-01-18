import { FetcherService } from './FetcherService';
import { config } from '../config/config';

'use strict';

/** static */
export class FetcherResource {

    /** Prevent instantiation */
    private constructor() {
        throw new Error("static class");
    }

    /** Returns single card data from the hearthstoneAPI */
    static getSingleCard(cardName: string) {
        let url = config.url + '/' + cardName;
        return FetcherService.query(url);
    }

    /** Returns card data of a cardSet from the hearthstoneAPI */
    static getCardSet(setName: string) {
        let url = config.url + '/sets/' + setName;
        return FetcherService.query(url);

    }

    /** Returns card data of a heroClass from the hearthstoneAPI */
    static getClassCards(className: string) {
        let url = config.url + '/classes/' + className;
        return FetcherService.query(url);
    }
}