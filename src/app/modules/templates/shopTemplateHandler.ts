import { TemplateHandler } from "./templateHandler";
import { RenderService } from '../services/render/renderService';
import { Template } from '../types/types';
import { startTemplate } from './startTemplate';
import { previewTemplate } from './previewTemplate';
import { cartTemplate } from "../templates/cartTemplate";
import { checkoutTemplate } from "../templates/checkoutTemplate";
import { errorTemplate } from "../templates/errorTemplate";
import { config } from '../config/config';

"use strict";

export class ShopTemplateHandler extends TemplateHandler {
    protected readonly templates = this.generateTemplates(this.rService);
    
    /** All templates with exact position */
    generateTemplates(rService: RenderService): Template[] {
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
}