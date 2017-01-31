import { config } from '../config/config';
import * as Utils from './utilities';
import { CardPack } from './cardPack';
import { FetchResource } from './fetchResource';
import { RenderService } from './services/renderService';
import { ShoppingCart } from './shoppingCart';

'use strict';

export class ButtonHandler {

    //Properties
    private fResource: FetchResource;
    private rService: RenderService;
    private cart: ShoppingCart;
    
    public get Cart() { return this.cart; }

    constructor(rService: RenderService, cart: ShoppingCart) {
        this.rService = rService;
        this.fResource = rService.FResource;
        this.cart = cart;
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet = (): any => {
        const hashValue: string = Utils.getHashValue();
        let cardSetName: string;

        if (hashValue === undefined || "") {
            config.data.setPreviewData.cardSetName = "Classic";
            Utils.createHash("Classic");
        }

        if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
            cardSetName = hashValue;
        }
        else {
            alert(`
                "${hashValue}": Invalid Card Set.
                Showing "Classic" instead.
            `)
            cardSetName = "Classic";
        }

        config.data.setPreviewData.cardSetName = cardSetName;
        Utils.createHash(`filters/{"cardSet":"${cardSetName}","hero":"Druid"}`);

        this.fResource.getCardSet(Utils.getFilters()["cardSet"])
            .then(cardSetData => {
                this.rService.showCards(cardSetData);
            })
    }

    /** What happens when you click the Return Button */
    return = (): void => {
        Utils.createHash(Utils.getFilters()["cardSet"]);
    }

    /** What happens when you click the Add To Cart Button */
    addToCart = (): void => {
        let setName: string;
        const hashValue: string = Utils.getHashValue();
        const filters: {} = Utils.getFilters();

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (hashValue !== undefined || "" || null) {
            if (hashValue.search("/") !== -1 && filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
                setName = filters["cardSet"];

            }
            else if (hashValue.search("/") === -1 && config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
                setName = hashValue;
            }
            else {
                alert("Please choose a Card Set first!");
                return;
            }
        }
        else {
            alert("Please choose a Card Set first!");
            return;
        }

        const pack: CardPack = new CardPack(setName || "Classic");

        this.fillCart(pack);
        console.log(this.cart.items);
    }

    /** Fills the ShoppingCart with packs and displays them */
    fillCart = (pack: CardPack) => {
        let amountOfPacks: number;

        if (Utils.getHashValue().search("/") === -1) {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[0]).value;
        }
        else {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[1]).value;
        }

        for (let i: number = 0; i < amountOfPacks; i++) {
            this.cart.pushToCart(pack);
            this.rService.showPacks(pack);
        }
    }

    /** Not implemented, yet */
    goToCart = (): any => {
        alert("Not implemented, yet");
    }


    // ****************************
    // *** CardSet Button-Group ***
    // ****************************

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
        const cardSetName = e.target.attributes[0].value;
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


    // ****************************
    // *** Heroes Button-Group ***
    // ****************************

    /** Iterate the hero-filter-list on the preview-page */
    iterateHero(doStuff: any): void {
        Utils.iterateUl(document.getElementById('hero-filter').children[1].children, doStuff);
    }

    /** Select the Hero from the hero-filter-list */
    selectHero = (hero: any): void => {
        Utils.clickElement(hero, this.setHero);
    }

    /** Sets the hash according to the selected hero */
    setHero = (e: any): void => {
        const heroValue = e.target.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
            delete (filter["hero"]);
        }
        else {
            filter["hero"] = heroValue;
        }
        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }


    // ****************************
    // *** Mana Button-Group ***
    // ****************************

    /** Iterates the mana-cost-filter on the preview-page */
    iterateManaCost(doStuff: any): void {
        Utils.iterateUl(document.getElementById('mana-filter').children[1].children, doStuff);
    }

    /** Selects the mana-cost- from the filter */
    selectManaCost = (mana: any): void => {
        Utils.clickElement(mana, this.setManaCost);
    }

    /** Sets the hash according to the selected mana-cost */
    setManaCost = (e: any): void => {
        const manaCostValue = e.target.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
            delete (filter["manaCost"]);
        }
        else {
            filter["manaCost"] = manaCostValue;
        }

        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }


    // *** *** *** *** ****
    // *** UNUSED STUFF ***
    // *** *** *** *** ****

    private firstCard: any;

    showNextCards = (): void => {
        let temp: HTMLImageElement[] = [];
        let tempShown: HTMLImageElement[] = [];
        for (let item of <any>document.getElementsByTagName("img")) {

            if (item.className.indexOf("noDisplay") === -1 && item.id.indexOf("card_") !== -1 && +item.id.substring(5, 1) !== null || undefined) {
                this.firstCard = item.id;
                temp.push(item);
                Utils.toggleCssClass(item.id, "noDisplay");
            }
        }

        let cardId: number;

        cardId = +temp[temp.length - 1].id.substring(5, 6);


        for (let i: number = 1; i < temp.length; i++) {
            if (document.getElementById(`card_${cardId + i}`) !== null || undefined) {
                Utils.toggleCssClass(`card_${cardId + i}`, "noDisplay");
                tempShown.push(temp[i]);
            }
        }

        console.log(tempShown.length)
        if (tempShown.length < 8) {
            Utils.toggleCssClass("next-cards-shown", "noDisplay");
            return;
        }
    }

    showPreviousCards = (): void => {
        let temp: HTMLImageElement[] = [];
        let tempShown: HTMLImageElement[] = [];
        for (let item of <any>document.getElementsByTagName("img")) {

            if (item.className.indexOf("noDisplay") === -1 && item.id.indexOf("card_") !== -1 && +item.id.substring(5, 1) !== null || undefined) {
                temp.push(item);
                Utils.toggleCssClass(item.id, "noDisplay");
            }
        }

        let cardId: number;

        cardId = +temp[0].id.substring(5, 6);


        for (let i: number = 1; i <= temp.length + 1; i++) {
            Utils.toggleCssClass(`card_${cardId - i}`, "noDisplay");
            tempShown.push(temp[i - 1]);
        }

        console.log(cardId);
        console.log(this.firstCard)
        let helper;
        helper = +this.firstCard.substring(5, 6)
        if (tempShown.length < 8 || cardId - 1 === helper) {
            Utils.toggleCssClass("next-cards-shown", "noDisplay");
            Utils.toggleCssClass("previous-cards-shown", "noDisplay");
            return;
        }
    }
}