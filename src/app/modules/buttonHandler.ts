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
    private lastFetch: any;
    private firstCard: any;

    public get FResource() { return this.fResource; }
    public get RService() { return this.rService; }
    public get Cart() { return this.cart; }

    constructor(fResource: FetchResource, rService: RenderService, cart: ShoppingCart) {
        this.fResource = fResource;
        this.rService = rService;
        this.cart = cart;
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet = (): any => {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");

        let hashValue: string = Utils.getHashValue();

        if (hashValue === undefined || "") {
            config.data.setPreviewData.cardSetName = "Classic";
            Utils.createHash("Classic");
        }

        let cardSetName: string;

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
            .then(data => {
                let cardSetData = data;
                this.lastFetch = data;
                this.rService.showCards(cardSetData);
            })
    }

    /** What happens when you click the Return Button */
    return = (): void => {
        try {
            Utils.createHash(Utils.getFilters()["cardSet"]);
        }
        catch (error) {
            Utils.createHash("Classic");
        }
    }

    /** What happens when you click the Add To Cart Button */
    addToCart = (): void => {
        let setName: string;
        let hashValue: string = Utils.getHashValue();
        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (hashValue !== undefined || "" || null) {
            if (hashValue.search("/") !== -1 && Utils.getFilters()["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(Utils.getFilters()["cardSet"]) !== -1) {
                setName = Utils.getFilters()["cardSet"];

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

        let pack: CardPack = new CardPack(setName || "Classic", this.fResource);

        this.fillCart(pack);
        console.log(this.cart.items);
    }

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

    goToCart = (): any => {
        alert("Not implemented, yet");
    }
}