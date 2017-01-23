import { Card } from './card';
import { FetchResource } from './fetchResource';

'use strict';

/** Five Cards, randomly selected from a specific CardSet */
export class CardPack {

    //Properties
    private setName: string;
    private cardPack: Card[];
    private fResource: FetchResource;

    //Constructor
    /** Creates an instance of a CardPack of a specific CardSet */
    constructor(setName: string, fResource: FetchResource) {
        this.setName = setName;
        this.fResource = fResource;
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
        let cardSet = this.fResource.getCardSet(this.setName);
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
