import { Template } from '../types/types';
import { config } from '../config/config';
import { startPage } from './startPage';
import { setPreview } from './setPreview';
import { RenderService } from '../modules/services/renderService';
import { cartTemplate } from "../templates/cartTemplate";
import { checkoutTemplate } from "../templates/checkoutTemplate";
import { ShoppingCart } from "../modules/shoppingCart";
import { StorageService } from "../modules/services/storageService";

const templates = (rService: RenderService): Template[] => [{
    id: 'start-page',
    where: 'afterbegin',
    html: startPage(rService, config.data)
}, {
    id: 'set-preview',
    where: 'afterbegin',
    html: setPreview(rService, config.data)
}, {
    id: "shopping-cart",
    where: "afterbegin",
    html: cartTemplate(rService)
}, {
    id: "checkout",
    where: "afterbegin",
    html: checkoutTemplate(rService)
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