import * as config from '../config/config'
import { startPage } from './startPage'
import { setPreview } from './setPreview'

/** Defines a ready to render HTML-Template */
interface template {
    id: string,
    where: string,
    html: string
}

/** All templates with exact position */

export class Templates {

    static templates: template[] = [
        {
            id: 'start-page',
            where: 'afterbegin',
            html: startPage(config.startPageData)
        },
        {
            id: 'set-preview',
            where: 'afterbegin',
            html: setPreview(config.setPreviewData)
        }
    ];

    /** Inserts a template after a specified element */
    static insertTemplate(template: template): void {
        document.getElementById(template.id).insertAdjacentHTML(template.where, template.html);
    }

    /** Inserts all templates of the passed array */
    static InsertAllTemplates(
        templates: template[]
    ): void {
        for (let template of templates) {
            Templates.insertTemplate(template)
        }
    }
}