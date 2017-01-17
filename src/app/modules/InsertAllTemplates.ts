import {InsertTemplate} from './InsertTemplate'
import { startPage } from '../templates/startPage'
import { setPreview } from '../templates/setPreview'

/** Insert all templates */
export function InsertAllTemplates(): void {
    InsertTemplate('start-page', 'afterbegin', startPage)
    InsertTemplate('set-preview', 'afterbegin', setPreview)
}