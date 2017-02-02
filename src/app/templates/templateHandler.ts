import { Template } from '../types/types';
import { config } from '../config/config';
import { startPage } from './startPage';
import { setPreview } from './setPreview';
import { RenderService } from '../modules/services/renderService';

const templates = (rService: RenderService): Template[] => [{
    id: 'start-page',
    where: 'afterbegin',
    html: startPage(rService, config.data)
}, {
    id: 'set-preview',
    where: 'afterbegin',
    html: setPreview(rService, config.data)
}]

/** All templates with exact position */

export class TemplateHandler {

    private rService: RenderService;
    private templates: Template[];

    constructor(rService: RenderService) {
        this.rService = rService;
        this.templates = templates(this.rService);
    }

    /** Inserts a template after a specified element */
    insertTemplate = (template: Template): void => {
        document.getElementById(template.id).insertAdjacentHTML(template.where, template.html);
    }

    /** Inserts all templates of the passed array */
    insertAllTemplates = (): void => {
        for (let template of this.templates) {
            this.insertTemplate(template)
        }
    }
}