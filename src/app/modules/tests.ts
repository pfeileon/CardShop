import { config } from '../config/config';
import * as Utils from './utils'
import { Card } from './card';
import { FetcherService } from './fetcherService';
import { FetcherResource } from './fetcherResource';
import { templates, TemplateHandler } from '../templates/templates'
import { Renderer } from './renderer';

export function testing() {
    let fService = new FetcherService;
    fService.query()
        .then(data => {
            console.log(data)
        });

    // // For testing purposes
    // FetcherResource.getSingleCard('EX1_116')
    //     .then(data => {
    //         let testCardData = data;
    //         console.log(testCardData);

    //         let testCard: Card = (<any>Object).assign(new Card('EX1_116'), testCardData[0]);
    //         console.log(`Card: "${testCard.name}" (${testCard.cardId}) from Set: "${testCard.cardSet}" has Mechanic: "${testCard.mechanics[0].name}"`);
    //     });
}
