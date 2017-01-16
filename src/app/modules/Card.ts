import { Rarity, CardType, CardClass, CardSet, Locale } from './Enums';

'use strict';

export class Card {
    private cardId: string;

    constructor(cardId: string) {
        this.cardId = cardId;
    }

    private artist: string;
    private attack: number;
    private cardSet: CardSet;
    private collectible: boolean;
    private cost: number;
    private flavor: string;
    private health: number;
    private howToGet: string;
    private howToGetGold: string;
    private img: string;
    private imgGold: string;
    private locale: Locale;
    private mechanics: string[];
    private name: string;
    private playerClass: CardClass;
    private rarity: Rarity;
    private text: string;
    private type: CardType;
}