import { FetcherService } from './FetcherService';
import { config } from '../config/config';

'use strict';

export class FetcherResource {
    
    private fService: FetcherService;

    constructor(fService: FetcherService) {
        this.fService = fService;
    }

    /** Returns single card data from the hearthstoneAPI */
    getSingleCard(cardName: string) {
        let url = config.api.url + '/' + cardName;
        return this.fService.query(url);
    }

    /** Returns card data of a cardSet from the hearthstoneAPI */
    getCardSet(setName: string) {
        let url = config.api.url + '/sets/' + setName;
        return this.fService.query(url);

    }

    /** Returns card data of a heroClass from the hearthstoneAPI */
    getClassCards(className: string) {
        let url = config.api.url + '/classes/' + className;
        return this.fService.query(url);
    }
}
