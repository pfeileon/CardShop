import { Template } from '../types/types';
import { RenderService } from '../services/render/renderService';

export abstract class TemplateHandler {

    protected rService: RenderService;
    protected abstract readonly templates: Template[];

    constructor(rService: RenderService) {
        this.rService = rService;
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