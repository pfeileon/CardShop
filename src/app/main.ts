import '../assets/styles/styles.scss';
import { FetchService } from './modules/services/fetchService';
import { FetchResource } from './modules/fetchResource';
import { RenderService } from './modules/services/renderService';
import { TemplateHandler } from './templates/templateHandler';
import { ShoppingCart } from './modules/shoppingCart';
import { ButtonHandler } from './modules/buttonHandler';
import { CardShop } from './modules/cardShop';

import { testing } from './modules/tests';
import { CardPack } from "./modules/cardPack"

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Initialization
    const fService: FetchService = new FetchService();
    const fResource: FetchResource = new FetchResource(fService);
    const rService: RenderService = new RenderService(fResource);
    const tHandler: TemplateHandler = new TemplateHandler(rService);

    const cart: ShoppingCart = new ShoppingCart();
    const bHandler: ButtonHandler = new ButtonHandler(rService, cart);

    const shop: CardShop = new CardShop(tHandler, bHandler);

    // Start Application
    shop.start();

    //Testing
    // testing();
});