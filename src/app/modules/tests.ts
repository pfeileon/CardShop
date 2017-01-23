import { config } from '../config/config';
import { Utils } from './Utils'
import { Card } from './Card';
import { FetcherService } from './FetcherService';
import { FetcherResource } from './FetcherResource';
import { Templates } from '../templates/templates'
import { Renderer } from './Renderer';

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
