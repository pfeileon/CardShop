import 'jquery';
import 'bootstrap-loader';
import 'bootstrap-validator';
import '../assets/styles/styles.scss';
import { FetchResource } from './modules/services/fetch/fetchResource';
import { FilterResource } from './modules/services/filter/filterResource';
import { RenderDetail } from './modules/services/render/renderDetail';
import { RenderResource } from './modules/services/render/renderResource';
import { ShopTemplateHandler } from './modules/services/templates/shopTemplateHandler';
import { ShoppingCart } from './modules/shop/shoppingCart';
import { ShopButtonHandler } from './modules/services/buttons/shopButtonHandler';
import { StorageResource } from './modules/services/storage/storageResource';
import { CardShop } from './modules/shop/cardShop';

import { testFetchAllCards, testSqlApi } from './modules/tests/test';

'use strict';

document.addEventListener('DOMContentLoaded', (start) => {
    // Initialization
    const fResource: FetchResource = new FetchResource();
    const filterResource: FilterResource = new FilterResource();
    const rDetail: RenderDetail = new RenderDetail();
    const rResource: RenderResource = new RenderResource(fResource, filterResource, rDetail);

    const tHandler: ShopTemplateHandler = new ShopTemplateHandler(rResource);
    const bHandler: ShopButtonHandler = new ShopButtonHandler(rResource);

    const sResource: StorageResource = new StorageResource();
    const cart: ShoppingCart = new ShoppingCart(sResource);

    const shop: CardShop = new CardShop(tHandler, bHandler, cart);

    // Start Application
    shop.start();

    // testFetchAllCards(fResource);
    testSqlApi(fResource);
});