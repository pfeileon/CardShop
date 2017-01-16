import { Card } from './Card';
import { FetcherResource } from './FetcherResource';

'use strict';

export class CardPack {

    //Properties
    private setName: string;
    private cardPack: Card[];

    //Constructor
    constructor(setName: string) {
        this.setName = setName;
    }

    //Methods
    /** Returns an empty CardPack */
    static generateCardPack(cardSet: string): CardPack {
        let cardPack: CardPack;
        cardPack.setName = cardSet;
        return cardPack;
    }

    /** Opens a purchased CardPack: Assign Cards to its Card[] */
    private openCardPack(): void {
        let cardSet = FetcherResource.getCardSet(this.setName);
        for (let i: number = 0; i < 5; i++) {
            this.cardPack[i] = this.generateCard(cardSet);
        }
    }

    /** Returns a randomly chosen card of the set */
    private generateCard(cardSet: any): Card {
        let cardId: string;
        //TODO: randomly choose cardId from set
        return new Card(cardId);
    }
}