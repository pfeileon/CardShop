'use strict'

/** Generic interface for exported config constants */
interface Config<R, S, T> {
    api: R;
    statePage: S;
    data: T;
}

/** Interface for Config.api */
interface HearthstoneAPI {
    request: {
        url: string;
        headers: {}
    }
}

interface CardShopStates {
    start: string;
    preview: string;
    cart: string;
    checkout: string;
    error: string;
}

/** Interface for Config.data */
interface CardShopData {
    cardSets: string[];
    heroes: string[],
    mana: number[]
}

const key = "X-Mashape-Authorization";
const headers = {};
headers[key] = "aCMgPO6J9ZmshlRIBc6BEJBGXW5Zp13EcMsjsnWOEWLa1mIRqb";

export const config: Config<HearthstoneAPI, CardShopStates, CardShopData> = {
    api: {
        request: {
            url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
            headers: headers
        }
    },
    statePage: {
        "start": "start-page",
        "preview": "preview-page",
        "cart": "cart-page",
        "checkout": "checkout-page",
        "error": "error-page"
    },
    data: {
        cardSets: [
            'Classic',
            'The Grand Tournament',
            'Whispers of the Old Gods',
            'Mean Streets of Gadgetzan'
        ],
        heroes: [
            'Druid',
            'Hunter',
            'Mage',
            'Paladin',
            'Priest',
            'Rogue',
            'Shaman',
            'Warlock',
            'Warrior',
            'Neutral'
        ],
        mana: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
}