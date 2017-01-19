import '../assets/styles/styles.scss';
import * as config from './config/config'
import { CardShop } from './modules/CardShop';
import { FetcherResource } from './modules/FetcherResource';
import { Card } from './modules/Card';
import { InsertAllTemplates } from './modules/InsertAllTemplates';
import { Utils } from './modules/Utils';

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    //Render Application
    CardShop.GetShop().init(InsertAllTemplates());

    // TODO
    // clickElement here or in Utils.ts

    //Select Card Set
    CardShop.GetShop().iterateCardSet(CardShop.GetShop().selectCardSet);

    //Preview Card Set
    Utils.clickElement(
        document.getElementById('preview-card-set-btn'),
        CardShop.GetShop().previewCardSet
    );

    //For testing purposes
    FetcherResource.getSingleCard('EX1_116')
        .then(data => {
            let testCardData = data;
            console.log(testCardData);

            let testCard: Card = (<any>Object).assign(new Card('EX1_116'), testCardData[0]);
            console.log(`Card: "${testCard.name}" (${testCard.cardId}) from Set: "${testCard.cardSet}" has Mechanic: "${testCard.mechanics[0].name}"`);
        });
});