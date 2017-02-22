import { Template } from '../types/types';
import { config } from '../config/config';
import { startTemplate } from './startTemplate';
import { previewTemplate } from './previewTemplate';
import { RenderService } from '../services/render/renderService';
import { cartTemplate } from "../templates/cartTemplate";
import { checkoutTemplate } from "../templates/checkoutTemplate";
import { errorTemplate } from "../templates/errorTemplate";
import { ShoppingCart } from "../shop/shoppingCart";
import { StorageService } from "../services/storage/storageService";
import { validate } from "../misc/customJQ";

const templates = (rService: RenderService): Template[] => {
    return [{
        id: 'start-page',
        where: 'afterbegin',
        html: startTemplate(rService, config.data)
    }, {
        id: 'preview-page',
        where: 'afterbegin',
        html: previewTemplate(rService, config.data)
    }, {
        id: "cart-page",
        where: "afterbegin",
        html: cartTemplate(rService)
    }, {
        id: "checkout-page",
        where: "afterbegin",
        html: checkoutTemplate(rService)
    }, {
        id: "error-page",
        where: "afterbegin",
        html: errorTemplate(rService)
    }];
}

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