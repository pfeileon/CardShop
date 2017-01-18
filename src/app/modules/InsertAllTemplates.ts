import * as config from '../config/config'
import { Renderer } from './Renderer'
import { startPage } from '../templates/startPage'
import { setPreview } from '../templates/setPreview'

/** Insert all templates */
export function InsertAllTemplates(): void {
    Renderer.insertTemplate('start-page', 'afterbegin', startPage(config.startPageData));
    Renderer.insertTemplate('set-preview', 'afterbegin', setPreview(config.setPreviewData));
}