import '../assets/styles/styles.scss';
import { CardShop } from './modules/CardShop';
import { ShoppingCart } from './modules/ShoppingCart';
import { FetcherResource } from './modules/FetcherResource';
import { Card } from './modules/Card';
import { InsertAllTemplates } from './modules/InsertAllTemplates';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    InsertAllTemplates();

    let testLog: string = CardShop.GetShop().startUp();
    console.log(testLog);

    FetcherResource.getSingleCard('EX1_116')
        .then(data => {
            let testCardData = data;
            console.log(testCardData);

            let testCard: Card = (<any>Object).assign(new Card('EX1_116'), testCardData[0]);
            console.log(`Card: "${testCard.name}" (${testCard.cardId}) from Set: "${testCard.cardSet}" has Mechanic: "${testCard.mechanics[0].name}"`);
        });
});