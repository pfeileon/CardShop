import { Template } from '../types/types'
import { config } from '../config/config'
import { startPage } from './startPage'
import { setPreview } from './setPreview'

export const templates = [{
    id: 'start-page',
    where: 'afterbegin',
    html: startPage(config.data)
}, {
    id: 'set-preview',
    where: 'afterbegin',
    html: setPreview(config.data)
}]

/** All templates with exact position */

export class TemplateHandler {

    private templates: Template[];

    constructor(templates: Template[]) {
        this.templates = templates;
    }

    /** Inserts a template after a specified element */
    insertTemplate(template: Template): void {
        document.getElementById(template.id).insertAdjacentHTML(template.where, template.html);
    }

    /** Inserts all templates of the passed array */
    insertAllTemplates(templates: Template[]): void {
        for (let template of templates) {
            this.insertTemplate(template)
        }
    }
}