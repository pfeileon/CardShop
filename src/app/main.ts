import '../assets/styles/styles.scss';
import { FetchService } from './modules/services/fetch/fetchService';
import { FetchResource } from './modules/services/fetch/fetchResource';
import { RenderDetail } from './modules/services/render/renderDetail';
import { RenderResource } from './modules/services/render/renderResource';
import { TemplateHandler } from './modules/templates/templateHandler';
import { ShoppingCart } from './modules/shop/shoppingCart';
import { ShopButtonHandler } from './modules/buttons/shopButtonHandler';
import { StorageService } from './modules/services/storage/storageService';
import { CardShop } from './modules/shop/cardShop';

import { testing } from './modules/misc/tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Initialization
    const fResource: FetchResource = new FetchResource();
    const rDetail: RenderDetail = new RenderDetail();
    const rService: RenderResource = new RenderResource(fResource, rDetail);

    const tHandler: TemplateHandler = new TemplateHandler(rService);
    const bHandler: ShopButtonHandler = new ShopButtonHandler(rService);

    const sService: StorageService = new StorageService();
    const cart: ShoppingCart = new ShoppingCart(sService);

    const shop: CardShop = new CardShop(tHandler, bHandler, cart);

    // Start Application
    shop.start();

    //Testing
    // testing();
});