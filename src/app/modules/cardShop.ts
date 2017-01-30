import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchResource } from './fetchResource';
import { TemplateHandler, templates } from '../templates/templateHandler';
import { RenderService } from './services/renderService';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from './abstracts/singlePageApplication';
import { ButtonHandler } from './buttonHandler';

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {

    //Properties
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected rService: RenderService;

    /** Chosen product */
    private cart: ShoppingCart;
    private bHandler: ButtonHandler;
    private item: {};

    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(bHandler.FResource, tHandler, bHandler.RService);

        this.fResource = bHandler.FResource;
        this.tHandler = tHandler;
        this.rService = bHandler.RService;
        this.cart = bHandler.Cart;
        this.bHandler = bHandler;
    }

    // Methods
    /** 
     * Abstract --> implementation 
     * 
     * see Parent
    */
    loadSpecifics = (): void => {
        //Select Card Set
        this.iterateCardSet(this.selectCardSet);

        // Preview Card Set
        Utils.clickElement(document.getElementById('preview-card-set-btn'), this.bHandler.previewCardSet);

        // return
        Utils.clickElement(document.getElementById('return-btn'), this.bHandler.return);

        // Add to Cart
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            Utils.clickElement(item, this.bHandler.addToCart)
        }

        // Filters
        this.iterateHero(this.selectHero);
        this.iterateManaCost(this.selectManaCost);

        // Utils.clickElement(document.getElementById("next-cards-shown"), this.bHandler.showNextCards);
        // Utils.clickElement(document.getElementById("previous-cards-shown"), this.bHandler.showPreviousCards);
    }

    /** Iterate the CardSet-List on the StartPage and SetPreview and doStuff */
    iterateCardSet(doStuff: any): void {
        for (let item of <any>document.getElementsByClassName("set-filter")) {
            Utils.iterateUl(item.children[1].children, doStuff);
        }
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet = (cardSet: any): void => {
        Utils.clickElement(cardSet, this.setCardSet);
    }

    /** Sets the hash-value according to the selected CardSet */
    setCardSet = (e: any): void => {
        let cardSetName = e.target.attributes[0].value;
        config.data.setPreviewData.cardSetName = cardSetName;

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (Utils.getHashValue() !== undefined && Utils.getHashValue().search("/") !== -1) {
            let filter = Utils.getFilters();
            if (filter["cardSet"] !== undefined && filter["cardSet"] === cardSetName && filter["hero"] !== undefined) {
                delete (filter["cardSet"]);
            }
            else {
                filter["cardSet"] = cardSetName;
            }
            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        }
        else {
            Utils.createHash(cardSetName);
        }
    }

    iterateHero(doStuff: any): void {
        Utils.iterateUl(document.getElementById('hero-filter').children[1].children, doStuff);
    }

    selectHero = (hero: any): void => {
        Utils.clickElement(hero, this.setHero);
    }

    setHero = (e: any): void => {
        let heroValue = e.target.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
            delete (filter["hero"]);
        }
        else {
            filter["hero"] = heroValue;
        }
        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }

    iterateManaCost(doStuff: any): void {
        Utils.iterateUl(document.getElementById('mana-filter').children[1].children, doStuff);
    }

    selectManaCost = (mana: any): void => {
        Utils.clickElement(mana, this.setManaCost);
    }

    setManaCost = (e: any): void => {
        let manaCostValue = e.target.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
            delete (filter["manaCost"]);
        }
        else {
            filter["manaCost"] = manaCostValue;
        }

        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }
}