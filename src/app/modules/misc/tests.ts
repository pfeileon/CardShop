import { config } from '../config/config';
import * as Utils from './utilities'
import { Card } from '../shop/card';
import { FetchService } from '../services/fetch/fetchService';
import { FetchResource } from '../services/fetch/fetchResource';
import { TemplateHandler } from '../templates/templateHandler'
import { RenderService } from '../services/render/renderService';

export function testing() {

    // Utils.getCardSetFilter();


    // let fService = new FetchService;
    // fService.query()
    //     .then(data => {
    //         console.log(data)
    //     });

    // // For testing purposes
    // FetcherResource.getSingleCard('EX1_116')
    //     .then(data => {
    //         let testCardData = data;
    //         console.log(testCardData);

    //         let testCard: Card = (<any>Object).assign(new Card('EX1_116'), testCardData[0]);
    //         console.log(`Card: "${testCard.name}" (${testCard.cardId}) from Set: "${testCard.cardSet}" has Mechanic: "${testCard.mechanics[0].name}"`);
    //     });
}
