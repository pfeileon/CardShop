import '../assets/styles/styles.scss';
import { FetchService } from './modules/services/fetchService';
import { FetchResource } from './modules/fetchResource';
import { RenderService } from './modules/services/renderService';
import { TemplateHandler } from './templates/templateHandler';
import { ShoppingCart } from './modules/shoppingCart';
import { ShopButtonHandler } from './buttons/shopButtonHandler';
import { StorageService } from './modules/services/storageService';
import { CardShop } from './modules/cardShop';

import { testing } from './modules/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Initialization
    const fService: FetchService = new FetchService();
    const fResource: FetchResource = new FetchResource(fService);
    const rService: RenderService = new RenderService(fResource);
    const tHandler: TemplateHandler = new TemplateHandler(rService);
    const bHandler: ShopButtonHandler = new ShopButtonHandler(rService);

    const sService: StorageService = new StorageService();
    const cart: ShoppingCart = new ShoppingCart(sService);
    const shop: CardShop = new CardShop(tHandler, bHandler, cart);

    // Start Application
    shop.start();

    console.log(sService.itemStorage(cart.Items));
    let obj = sService.itemStorage(cart.Items);
    let bla = Object.keys(obj).map(k => obj[k]);
    console.log(bla);

    //Testing
    // testing();
});