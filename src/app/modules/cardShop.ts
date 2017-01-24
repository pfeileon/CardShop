import { config } from '../config/config';
import * as Utils from './utilities';
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

    // Methods
    loadSpecifics(): void {
        //Set invisible
        Utils.toggleCssClass("set-preview", "noDisplay");
        Utils.toggleCssClass("error-page", "noDisplay");

        //Select Card Set
        this.iterateCardSet(this.selectCardSet);

        // Preview Card Set
        Utils.clickElement(
            document.getElementById('preview-card-set-btn'),
            this.previewCardSet
        );

        // return
        Utils.clickElement(document.getElementById('return-btn'), this.return);
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

    previewCardSet = (arg?: any): any => {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");
        if (Utils.getHashValue('#', 1) === undefined) {
            Utils.createHash("Classic");
            config.data.setPreviewData.cardSetName = "Classic";
        }
        this.fResource.getCardSet(Utils.getHashValue('#', 1))
            .then(data => {
                let cardSetData = data;
                console.log(cardSetData);
            })
    };

    return(): void {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");
    }
}
