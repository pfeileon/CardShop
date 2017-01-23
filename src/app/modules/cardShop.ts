import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchService } from './fetchService';
import { FetchResource } from './fetchResource';
import { TemplateHandler, templates } from '../templates/templates';
import { Renderer } from './renderer';

import { SinglePageApplication } from './singlePageApplication'

'use strict';

export class CardShop extends SinglePageApplication {

    //Properties
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected renderer: Renderer;
    /** Chosen product */
    private item: {};
    private allCards: any;

    /** Warns after first instantiation */
    constructor(fResource: FetchResource, tHandler: TemplateHandler, renderer: Renderer) {
        super(fResource, tHandler, renderer);
        this.fResource = fResource;
        this.tHandler = tHandler;
        this.renderer = renderer;
    }

    //Methods
    loadSpecifics(): void {
        //Select Card Set
        this.iterateCardSet(this.selectCardSet);

        //Preview Card Set
        Utils.clickElement(
            document.getElementById('preview-card-set-btn'),
            this.previewCardSet
        );
    }

    /** Iterate the CardSet-List on the StartPage and doStuff */
    iterateCardSet(doStuff: any): void {
        Utils.iterateUl(document.getElementById('start-filters').children[1].children, doStuff);
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet = (cardSet: any): void => {
        Utils.clickElement(cardSet, this.setCardSet);
    }

    /** Sets the hash-value according to the selected CardSet */
    setCardSet(e: any): void {
        let cardSetName = e.target.attributes[0].value
        config.data.setPreviewData.cardSetName = cardSetName;
        Utils.createHash(cardSetName);
        document.getElementById('card-set-name').textContent = Utils.getHashValue('#', 1);
    }

    previewCardSet = (param?: any): any => {
        this.fResource.getCardSet(config.data.setPreviewData.cardSetName)
            .then(data => {
                let cardSetData = data;
                console.log(cardSetData);
            })
    };
}
