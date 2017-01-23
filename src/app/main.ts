import '../assets/styles/styles.scss';
import { FetcherResource } from './modules/FetcherResource';
import { FetcherService } from './modules/FetcherService';
import {templates, TemplateHandler} from './templates/templates'
import { CardShop } from './modules/CardShop';
import { testing } from './modules/Tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let fService: FetcherService = new FetcherService();
    let fResource: FetcherResource = new FetcherResource(fService);
    let tHandler: TemplateHandler = new TemplateHandler(templates);
    let shop: CardShop = new CardShop(fResource, tHandler);

    //Render Application
    shop.start();

    //Testing
    testing();
});