import { Promise, Init } from '../types/types';
import { config } from '../config/config';
import {FetchService} from './fetchService'

'use strict';

export class FetchResource {
    
    private fService: FetchService;

    constructor(fService: FetchService) {
        this.fService = fService;
    }

    /** Returns single card data from the hearthstoneAPI */
    getSingleCard = (cardName: string): Promise<Init> => {
        let url = config.api.url + '/' + cardName;
        return this.fService.query(url);
    }

    /** Returns card data of a cardSet from the hearthstoneAPI */
    getCardSet = (setName: string): Promise<Init> => {
        let url = config.api.url + '/sets/' + setName;
        return this.fService.query(url);
    }

    /** Returns card data of a heroClass from the hearthstoneAPI */
    getClassCards = (className: string): Promise<Init> => {
        let url = config.api.url + '/classes/' + className;
        return this.fService.query(url);
    }
}
