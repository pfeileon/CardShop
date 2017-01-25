import '../assets/styles/styles.scss';
import { FetchResource } from './modules/fetchResource';
import { FetchService } from './modules/services/fetchService';
import { RenderService } from './modules/services/renderService';
import { templates, TemplateHandler } from './templates/templateHandler';
import { CardShop } from './modules/cardShop';
import { ShoppingCart } from './modules/shoppingCart';
import { testing } from './modules/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    //Initialization
    let fService: FetchService = new FetchService();
    let fResource: FetchResource = new FetchResource(fService);
    let rService: RenderService = new RenderService();
    let tHandler: TemplateHandler = new TemplateHandler(templates(rService));
    let cart: ShoppingCart = new ShoppingCart();
    let shop: CardShop = new CardShop(fResource, tHandler, rService, cart);

    //Render Application
    shop.start();

    //Testing
    //testing();
});