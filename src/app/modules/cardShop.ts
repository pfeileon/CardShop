import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchResource } from './fetchResource';
import { TemplateHandler, templates } from '../templates/TemplateHandler';
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
    loadSpecifics(): void {
        //Set invisible
        Utils.toggleCssClass("set-preview", "noDisplay");
        Utils.toggleCssClass("error-page", "noDisplay");

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


        this.iterateHero(this.selectHero);
        this.iterateManaCost(this.selectManaCost);
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
        let cardSetName = e.target.attributes[0].value;
        config.data.setPreviewData.cardSetName = cardSetName;

        Utils.createHash(cardSetName);

        try {document.getElementById('card-set-name').textContent = Utils.getFilters()["cardSet"];}
        catch(error) {document.getElementById('card-set-name').textContent = Utils.getHashValue("#", 1)}
    }



    // TODO
    // Change CreateHash-Function:
    // - needs to create "#filter/"
    // Filters need to be in this format:
    // {"filter1":["value1","value2"],"filter2":["value1"]} etc.



    iterateHero(doStuff: any): void {
        Utils.iterateUl(document.getElementById('hero-filter').children[1].children, doStuff);
    }

    selectHero = (hero: any): void => {
        Utils.clickElement(hero, this.setHero);
    }

    setHero = (e: any): void => {
        let heroValue = e.target.attributes[0].value;

        let hero = Utils.getFilters();
        hero["hero"] = heroValue;
        Utils.createHash(`filters/${JSON.stringify(hero)}`);

        if (this.bHandler.LastFetch !== undefined) {
            this.rService.showCards(this.bHandler.LastFetch);
        }
    }



    iterateManaCost(doStuff: any): void {
        Utils.iterateUl(document.getElementById('mana-filter').children[1].children, doStuff);
    }

    selectManaCost = (mana: any): void => {
        Utils.clickElement(mana, this.setManaCost);
    }

    setManaCost = (e: any): void => {
        let manaCostValue = e.target.attributes[0].value;

        let manaCost = Utils.getFilters();
        if (manaCost["manaCost"] !== undefined && manaCost["manaCost"] === manaCostValue) {
            delete (manaCost["manaCost"]);
        }
        else {
            manaCost["manaCost"] = manaCostValue;
        }

        Utils.createHash(`filters/${JSON.stringify(manaCost)}`);

        if (this.bHandler.LastFetch !== undefined) {
            this.rService.showCards(this.bHandler.LastFetch);
        }
    }
}