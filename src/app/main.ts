import '../assets/styles/styles.scss';
import { FetchResource } from './modules/fetchResource';
import { FetchService } from './modules/fetchService';
import { Renderer } from './modules/renderer';
import { templates, TemplateHandler } from './templates/templates';
import { CardShop } from './modules/cardShop';
import { testing } from './modules/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let fService: FetchService = new FetchService();
    let fResource: FetchResource = new FetchResource(fService);
    let renderer: Renderer = new Renderer();
    let tHandler: TemplateHandler = new TemplateHandler(templates(renderer));
    let shop: CardShop = new CardShop(fResource, tHandler, renderer);

    //Render Application
    shop.start();

    //Testing
    testing();
});