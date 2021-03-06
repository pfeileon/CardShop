import { Shopable } from "../types/types";
import { Card } from './card';
import { FetchResource } from '../services/fetch/fetchResource';

'use strict';

/** Five Cards, randomly selected from a specific CardSet */
export class CardPack implements Shopable {
    // PROPERTIES
    private setName: string;
    private cardPack: Card[];
    public get Key() { return this.setName; }

    // CONSTRUCTOR
    /** Creates an instance of a CardPack of a specific CardSet */
    constructor(setName: string) {
        this.setName = setName;
    }
    
    // METHODS
    /** Opens a purchased CardPack: Assign Cards to its Card[] */
    private openCardPack(fResource: FetchResource): void {
        fResource.getCardSet(this.setName + "?collectible=1")
            .then(cardData => {
                let cardSet = cardData;
                this.cardPack = new Array<Card>(5);
                for (let i: number = 0; i < this.cardPack.length; i++) {
                    this.cardPack[i] = this.generateCard(cardSet);
                }
            })
    }

    /** Returns a card with a randomly chosen cardId of the set */
    private generateCard(cardSet: any): Card {
        const cardNumber = Math.floor(Math.random() * cardSet.length);
        const cardId: string = cardSet[cardNumber].cardId;
        return new Card(cardId);
    }
}
