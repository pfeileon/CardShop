import * as config from '../config/config';
import { Utils } from './Utils'
import { Renderer } from './Renderer';
import { FetcherResource } from './FetcherResource';

'use strict';

/** Instantiate only once! */
export class CardShop {

    //Properties
    private static exists: boolean = false;
    /** Chosen product */
    private item: {};
    private content: any;
    private allCards: any;

    //Methods
    /** Initialize the app */
    init(content: any): any {
        this.content = content;
        Renderer.render(content);
    }

    /** Iterate the CardSet-List on the StartPage and doStuff */
    iterateCardSet(doStuff): void {
        Utils.iterateUl(document.getElementById('start-filters').children[1].children, doStuff);
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet(cardSet: any): void {
        Utils.clickElement(cardSet, CardShop.setCardSet);
    }

    /** Sets the hash-value according to the selected CardSet */
    static setCardSet(e: any): void {
        let cardSetName = e.target.attributes[0].value
        config.setPreviewData.cardSetName = cardSetName;
        Utils.createHash(cardSetName);
        document.getElementById('card-set-name').textContent = Utils.getHashValue('#', 1);
    }

    previewCardSet(): any {
        FetcherResource.getCardSet(config.setPreviewData.cardSetName)
            .then(data => {
                let cardSetData = data;
                console.log(cardSetData);
            })
    };

    /** Prevents more than one instantiation */
    constructor() {
        if (CardShop.exists) {
            throw new Error("not more than one instance allowed");
        }
        CardShop.exists = true;
    }
}