import { Utils } from '../modules/Utils'

'use strict'

/** Generic interface for exported config constants */
interface Config<S, T> {
    api: S;
    data: T;
}

/** Interface for Config.api */
interface HearthstoneAPI {
    url: string;
    mashApeKey: string;
}

/** Interface for Config.data */
interface HardcodedData {
    startPageData: {
        cardSets: string[];
    },
    setPreviewData: {
        cardSetName: string;
        heroes: string[],
        mana: number[]
    }
}

export const config: Config<HearthstoneAPI, HardcodedData> = {
    api: {
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
        mashApeKey: 'aCMgPO6J9ZmshlRIBc6BEJBGXW5Zp13EcMsjsnWOEWLa1mIRqb'
    },
    data: {
        startPageData: {
            cardSets: [
                'Classic',
                'The Grand Tournament',
                'Whispers of the Old Gods',
                'Mean Streets of Gadgetzan'
            ]
        },
        setPreviewData: {
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
}