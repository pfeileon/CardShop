import '../assets/styles/styles.scss';
import { Shop } from './modules/Shop';
import { ShoppingCart } from './modules/ShoppingCart';
import { FetcherResource } from './modules/FetcherResource';
import { Card } from './modules/Card';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let testString: string = 'Ahoi';

    console.log('Test: ' + testString);

    console.log(new Shop(testString));

    console.log(new Shop(testString).startUp());

    let cardShop: Shop = new Shop(testString);
    console.log(cardShop);
    console.log(cardShop.startUp());

    let testLog: string = cardShop.startUp();
});