//import { Rarity, CardType, CardClass, CardSet, Locale } from '../config/Enums';

'use strict';

/** Class with all properties of a Hearthstone-Card */
export class Card {
    cardId: string;
    name: string;
    // cardSet: CardSet;
    cardSet: string;

    /** Creates an instance of a specific Card */
    constructor(cardId: string) {
        this.cardId = cardId;
    }

    private artist: string;
    private attack: number;
    private collectible: boolean;
    private cost: number;
    private flavor: string;
    private health: number;
    private howToGet: string;
    private howToGetGold: string;
    private img: string;
    private imgGold: string;
    // private locale: Locale;
    private locale: string;
    mechanics: {name:string}[];
    // privateplayerClass: CardClass;
    private playerClass: string;
    // private rarity: Rarity;
    private rarity: string;
    private text: string;
    // private type: CardType;
    private type: string;
}
