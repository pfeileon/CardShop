import '../assets/styles/styles.scss';
import { FetcherResource } from './modules/fetcherResource';
import { FetcherService } from './modules/fetcherService';
import {templates, TemplateHandler} from './templates/templates'
import { CardShop } from './modules/cardShop';
import { testing } from './modules/tests';

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