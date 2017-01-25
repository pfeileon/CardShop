import '../assets/styles/styles.scss';
import { FetchService } from './modules/services/fetchService';
import { FetchResource } from './modules/fetchResource';
import { RenderService } from './modules/services/renderService';
import { templates, TemplateHandler } from './templates/templateHandler';
import { ShoppingCart } from './modules/shoppingCart';
import { ButtonHandler } from './modules/buttonHandler';
import { CardShop } from './modules/cardShop';

import { testing } from './modules/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    //Initialization
    let fService: FetchService = new FetchService();
    let fResource: FetchResource = new FetchResource(fService);
    let rService: RenderService = new RenderService();
    let tHandler: TemplateHandler = new TemplateHandler(templates(rService));
    let cart: ShoppingCart = new ShoppingCart();
    let bHandler: ButtonHandler = new ButtonHandler(fResource, rService, cart);
    let shop: CardShop = new CardShop(tHandler, bHandler);

    //Render Application
    shop.start();

    //Testing
    //testing();
});