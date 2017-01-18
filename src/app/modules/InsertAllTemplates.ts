import { InsertTemplate } from './InsertTemplate'
import { startPage } from '../templates/startPage'
import { setPreview } from '../templates/setPreview'

let startPageData: any = {
    cardSets: ['Classic', 'The Grand Tournament', 'Whispers of the Old Gods', 'Mean Streets of Gadgetzan']
};

export const setPreviewData: any = {
    cardSetName: 'CardSetName',
    heroes: ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'],
    mana: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

/** Insert all templates */
export function InsertAllTemplates(): void {
    InsertTemplate('start-page', 'afterbegin', startPage(startPageData));
    InsertTemplate('set-preview', 'afterbegin', setPreview(setPreviewData));
}