import { Template } from '../types/types';
import { config } from '../config/config';
import { startPage } from './startTemplate';
import { setPreview } from './previewTemplate';
import { RenderService } from '../services/render/renderService';
import { cartTemplate } from "../templates/cartTemplate";
import { checkoutTemplate } from "../templates/checkoutTemplate";
import { ShoppingCart } from "../shop/shoppingCart";
import { StorageService } from "../services/storage/storageService";
import { validate } from "../misc/customJQ";

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
        validate();
    }
}