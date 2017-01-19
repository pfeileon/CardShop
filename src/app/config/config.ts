import { Utils } from '../modules/Utils'

'use strict'


// TODO:
// GENERIC INTERFACE


interface Config<S, T> {
    api?: S;
    data?: T;
    url?: string;
    mashApeKey?: string;
    cardSets?: string[];
    cardSetName?: string;
    heroes?: string[];
    mana?: number[];
}

interface Api {
    url: string;
    id: string;
}

const config: Config<Api, {}> = {
    api: {
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
        id: 'aCMgPO6J9ZmshlRIBc6BEJBGXW5Zp13EcMsjsnWOEWLa1mIRqb'
    },
    data: {
        cardSets: [
            'Classic',
            'The Grand Tournament',
            'Whispers of the Old Gods',
            'Mean Streets of Gadgetzan'
        ],
        cardSetName: Utils.getHashValue('#', 1) || 'Classic',
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
            'neutral'
        ],
        mana: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
}

export const api: Config<any,any> = {
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
    mashApeKey: 'aCMgPO6J9ZmshlRIBc6BEJBGXW5Zp13EcMsjsnWOEWLa1mIRqb'
}

export const startPageData: Config<any,any> = {
    cardSets: [
        'Classic',
        'The Grand Tournament',
        'Whispers of the Old Gods',
        'Mean Streets of Gadgetzan'
    ]
}

export const setPreviewData: Config<any,any> = {
    cardSetName: Utils.getHashValue('#', 1) || 'Classic',
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
        'neutral'
    ],
    mana: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}