import { Promise, Init, Request } from '../../types/types';
import { config } from '../../config/config';
import { FetchService } from '../fetch/fetchService';

'use strict';

export class FetchResource extends FetchService{

    getCardData = (filter: {}): Promise<Init> => {
        const setName = filter["cardSet"];
        const hero = filter["hero"];
        const cardName = filter["cardName"] || filter["cardId"];

        if (cardName !== undefined) {
            return this.getSingleCard(cardName);
        }
        else if (setName !== undefined) {
            return this.getCardSet(`${setName}?collectible=1`);
        }
        else if (hero !== undefined) {
            return this.getClassCards(`${hero}?collectible=1`);
        }
    }

    /** Returns all the cards */
    getAllCards = (): Promise<Init> => {
        return this.query();
    }

    /** Returns single card data from the hearthstoneAPI */
    getSingleCard = (cardName: string): Promise<Init> => {
        const url = config.api.request.url + '/' + cardName;
        return this.query(url);
    }

    /** Returns card data of a cardSet from the hearthstoneAPI */
    getCardSet = (setName: string): Promise<Init> => {
        const url = config.api.request.url + '/sets/' + setName;
        return this.query(url);
    }

    /** Returns card data of a heroClass from the hearthstoneAPI */
    getClassCards = (className: string): Promise<Init> => {
        const url = config.api.request.url + '/classes/' + className;
        return this.query(url);
    }
}
