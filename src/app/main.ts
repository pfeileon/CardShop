import '../assets/styles/styles.scss';
import { CardShop } from './modules/CardShop';
import { testing } from './modules/Tests';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    let shop: CardShop = new CardShop();

    //Render Application
    shop.init();

    //Testing
    testing();
});