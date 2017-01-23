import '../assets/styles/styles.scss';
import {Renderer} from './modules/renderer'
import { FetcherResource } from './modules/fetcherResource';
import { FetcherService } from './modules/fetcherService';
import { templates, TemplateHandler } from './templates/templates'
import { CardShop } from './modules/cardShop';
import { testing } from './modules/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let fService: FetcherService = new FetcherService();
    let fResource: FetcherResource = new FetcherResource(fService);
    let renderer: Renderer = new Renderer();
    let tHandler: TemplateHandler = new TemplateHandler(templates(renderer));
    let shop: CardShop = new CardShop(fResource, tHandler, renderer);

    //Render Application
    shop.start();

    //Testing
    testing();
});