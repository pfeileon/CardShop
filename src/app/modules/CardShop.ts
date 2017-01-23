import { config } from '../config/config';
import { Utils } from './Utils';
import { FetcherService } from './FetcherService';
import { FetcherResource } from './FetcherResource';
import { TemplateHandler, templates } from '../templates/templates';
import { Renderer } from './Renderer';

'use strict';

/** Instantiate only once! */
export class CardShop {

    //Properties
    private static exists: boolean = false;
    /** Chosen product */
    private item: {};
    private content: any;
    private allCards: any;
    private fResource: FetcherResource;
    private tHandler: TemplateHandler;

    /** Warns after first instantiation */
    constructor(fResource: FetcherResource, tHandler: TemplateHandler) {
        if (CardShop.exists) {
            console.log('Are you sure that you want another instance?');
        }
        this.fResource = fResource;
        this.tHandler = tHandler;

        CardShop.exists = true;
    }

    //Methods
    /** Initialize the app */
    start(): void {
        //Render App
        this.content = this.tHandler.insertAllTemplates(templates);
        Renderer.render(this.content);

        //Select Card Set
        this.iterateCardSet(this.selectCardSet);

        //Preview Card Set
        Utils.clickElement(
            document.getElementById('preview-card-set-btn'),
            this.previewCardSet
        );
    }

    /** Iterate the CardSet-List on the StartPage and doStuff */
    iterateCardSet = (doStuff: any): void => {
        Utils.iterateUl(document.getElementById('start-filters').children[1].children, doStuff);
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet = (cardSet: any): void => {
        Utils.clickElement(cardSet, this.setCardSet);
    }

    /** Sets the hash-value according to the selected CardSet */
    setCardSet = (e: any): void => {
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