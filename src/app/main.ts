import '../assets/styles/styles.scss';
import { FetcherResource } from './modules/FetcherResource';
import { FetcherService } from './modules/FetcherService';
import { CardShop } from './modules/CardShop';
import { testing } from './modules/Tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let fService: FetcherService = new FetcherService();
    let fResource: FetcherResource = new FetcherResource(fService);
    let shop: CardShop = new CardShop(fResource);

    //Render Application
    shop.init();

    //Testing
    testing();
});