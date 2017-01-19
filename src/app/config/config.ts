import { Utils } from '../modules/Utils'

'use strict'

interface Config {
    url?: string;
    mashApeKey?: string;
    cardSets?: string[];
    cardSetName?: string;
    heroes?: string[];
    mana?: number[];
}

export const config: Config = {
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
    mashApeKey: 'aCMgPO6J9ZmshlRIBc6BEJBGXW5Zp13EcMsjsnWOEWLa1mIRqb'
}

export const startPageData: Config = {
    cardSets: [
        'Classic',
        'The Grand Tournament',
        'Whispers of the Old Gods',
        'Mean Streets of Gadgetzan'
    ]
};

export const setPreviewData: Config = {
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
};