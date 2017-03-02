import '../assets/styles/styles.scss';
import { FetchResource } from './modules/services/fetch/fetchResource';
import { FilterResource } from './modules/services/filter/filterResource';
import { RenderDetail } from './modules/services/render/renderDetail';
import { RenderResource } from './modules/services/render/renderResource';
import { ShopTemplateHandler } from './modules/services/templates/shopTemplateHandler';
import { ShoppingCart } from './modules/shop/shoppingCart';
import { ShopButtonHandler } from './modules/services/buttons/shopButtonHandler';
import { StorageService } from './modules/services/storage/storageService';
import { CardShop } from './modules/shop/cardShop';

'use strict';

document.addEventListener('DOMContentLoaded', (start) => {

    // Initialization
    const fResource: FetchResource = new FetchResource();
    const filterResource: FilterResource = new FilterResource();
    const rDetail: RenderDetail = new RenderDetail();
    const rResource: RenderResource = new RenderResource(fResource, filterResource, rDetail);

    const tHandler: ShopTemplateHandler = new ShopTemplateHandler(rResource);
    const bHandler: ShopButtonHandler = new ShopButtonHandler(rResource);

    const sService: StorageService = new StorageService();
    const cart: ShoppingCart = new ShoppingCart(sService);

    const shop: CardShop = new CardShop(tHandler, bHandler, cart);

    // Start Application
    shop.start();
});