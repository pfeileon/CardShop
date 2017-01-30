import { Promise, Init, Request } from '../types/types';
import { config } from '../config/config';
import { FetchService } from './services/fetchService';

'use strict';

export class FetchResource {

    private fService: FetchService;

    constructor(fService: FetchService) {
        this.fService = fService;
    }

    getCardData = (filter: {}): Promise<Init> => {
        let setName = filter["cardSet"];
        let hero = filter["hero"];
        let cardName = filter["cardName"] || filter["cardId"];

        if (cardName !== undefined) {
            return this.getSingleCard(cardName);
        }
        else if (setName !== undefined) {
            return this.getCardSet(`${setName}?collectible=1`);
        }
        else if (hero !== undefined) {
            return this.getClassCards(`${hero}?collectible=1`);
        }
        else {
            return this.getAllCards("?collectible=1");
        }
    }

    getAllCards = (collectible: string): Promise<Init> => {
        let url = config.api.url + collectible;
        return this.fService.query(url);
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
