import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchResource } from './fetchResource';
import { TemplateHandler, templates } from '../templates/templateHandler';
import { RenderService } from './services/renderService';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from './abstracts/singlePageApplication';
import { CardPack } from './cardPack';

import { ButtonHandler } from './buttonHandler';

'use strict';

export class CardShop extends SinglePageApplication {

    //Properties
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected rService: RenderService;

    /** Chosen product */
    private cart: ShoppingCart;
    private item: {};
    private allCards: any;

    private bHandler: ButtonHandler;

    /** Warns after first instantiation */
    constructor(fResource: FetchResource, tHandler: TemplateHandler, RenderService: RenderService, cart: ShoppingCart, bHandler: ButtonHandler) {
        super(fResource, tHandler, RenderService);
        this.fResource = fResource;
        this.tHandler = tHandler;
        this.rService = RenderService;
        this.cart = cart;
        this.bHandler = bHandler;
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
            this.bHandler.previewCardSet
        );

        // return
        Utils.clickElement(document.getElementById('return-btn'), this.bHandler.return);

        // Add to Cart
        Utils.clickElement(<HTMLElement>document.getElementsByClassName("add-to-cart")[0], this.bHandler.addToCart);
        Utils.clickElement(<HTMLElement>document.getElementsByClassName("add-to-cart")[1], this.bHandler.addToCart);
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
}