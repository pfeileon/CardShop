import { Renderer } from "./renderer";
import { Shopable } from "../../types/types";
import { config } from '../../config/config';
import * as Utils from '../utilities';
import { CardShop } from "../cardShop";
import { FetchResource } from "../fetchResource";

'use strict';

const record = (item) => {
    return `<li data-id="${item}"><button data-id="${item}" type="button" class="btn btn-default">${item}</button></li>`;
};

const deleteRecord = (item) => {
    return `<li data-id="${item}-del-btn"><button id="${item.replace(/ /gi, "-")}-del-btn" data-id="${item}-del-btn" type="button" class="cart-del-btn btn btn-warning">delete</button></li>`;
}

const inputPack = (item) => {
    return `<li data-id="${item}"><div class="input-pack btn btn-primary">${item}</div></li>`;
};

const inputAmount = (item) => {
    return `<li data-id="${item}"><input class="input-amount btn btn-default" type="number" name ="amount" value="${item}" min="1" max="100" /></li>`
}

export class RenderService extends Renderer {

    private lastSetName: string;
    private lastCardData: any;

    constructor(fResource: FetchResource) {
        super(fResource);
    }

    /** Renders the page according to the hash */
    render(shop: CardShop): void {
        let hashValue;

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (decodeURI(window.location.hash).search("/") !== -1) {
            hashValue = decodeURI(window.location.hash.split("/")[0]);
        }
        else {
            hashValue = "";
        }

        switch (hashValue) {
            case undefined:
                this.displayCheck("start", shop);
                break;

            case "":
                this.displayCheck("start", shop);
                break;

            case "#":
                this.displayCheck("start", shop);
                break;

            case "#filters":
                this.displayCheck("preview");
                break;

            case "#cart":
                this.displayCheck("cart", shop);
                break;

            default:
                this.displayCheck("error");
                break;
        }
        //this.resetBtnClassList();
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[], Record: any = record): string {
        return `<ul>${list.map(item => Record(item)).join('')}</ul>`;
    }

    /**
     * Decides which parts of the site have to be displayed or not, depending on the state
     * 
     * @param {string} selector - The state of the site
     */
    displayCheck(selector: string, shop?: CardShop): void {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        let startPageShown: boolean = !document.getElementById("start-page").classList.contains("noDisplay");
        let setPreviewShown: boolean = !document.getElementById("set-preview").classList.contains("noDisplay");
        let cartShown: boolean = !document.getElementById("shopping-cart").classList.contains("noDisplay");
        let errorPageShown: boolean = !document.getElementById("error-page").classList.contains("noDisplay");

        switch (selector) {
            case "start": {
                shownCardSetHeader[0].textContent = this.renderStart(shop);

                if (!startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "preview": {
                shownCardSetHeader[1].textContent = this.renderPreview();

                if (!setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "cart": {
                this.renderCart(shop);
                if (!cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "error": {
                if (!errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                break;
            }
        }
    }

    renderCart(shop: CardShop): void {
        if (localStorage.getItem("cart") !== null || undefined) {
            if (!document.getElementById("checkout-btn").classList.contains("btn-success")) {
                document.getElementById("checkout-btn").classList.toggle("btn-success");
            }
            let temp: {} = JSON.parse(localStorage.getItem("cart"));
            let help: string[][] = [Object.keys(temp), (<any>Object).values(temp)];

            let deleteList: string[] = [];
            for (let i = 0; i < help[0].length; i++) {
                deleteList.push(help[0][i]);
            }

            document.getElementById("cart-content-packs").innerHTML = `${this.insertList((<any>Array).from(help[0]), inputPack)}`;
            document.getElementById("cart-content-amount").innerHTML = `${this.insertList((<any>Array).from(help[1]), inputAmount)}`;
            document.getElementById("cart-content-delete").innerHTML = `${this.insertList(deleteList, deleteRecord)}`;

            shop.BHandler.deleteCartPosition(shop);

            let inputPackHelper: HTMLCollectionOf<Element> = document.getElementsByClassName("input-pack btn")
            let j = 0;
            for (let item of <any>inputPackHelper) {
                item.id = `${item.classList[0]}-${j}`;
                shop.BHandler.previewCardSet(item.id);
                j++;
            }

            let inputAmountHelper: HTMLCollectionOf<Element> = document.getElementsByClassName("input-amount btn");
            let i = 0;
            for (let item of <any>inputAmountHelper) {
                item.id = `cart-input-amount-${i}`;
                item.addEventListener("click", (e) => {
                    let amountOfPacks: number;
                    amountOfPacks = +(<HTMLInputElement>item).value;
                    let cartStorage = JSON.parse(localStorage.getItem("cart"));

                    let prop = Object.keys(cartStorage);
                    cartStorage[prop[+(item.id.substring(18))]] = amountOfPacks;

                    localStorage.setItem("cart", JSON.stringify(cartStorage));

                    Utils.createHash("cart/" + localStorage.getItem("cart"));
                });
                i++;
            }
        }
        else {
            if (document.getElementById("checkout-btn").classList.contains("btn-success")) {
                document.getElementById("checkout-btn").classList.toggle("btn-success");
            }
            document.getElementById("cart-content-packs").innerHTML = `<div class="well">Your cart is empty!</div>`;
            document.getElementById("cart-content-amount").innerHTML = "";
            document.getElementById("cart-content-delete").innerHTML = "";
        }
    }

    /**
     * Adds dynamically generated content to the startPageData
     * 
     * and returns the card set heading as string */
    renderStart(shop: CardShop): string {
        this.showItems(shop.Cart.Items);
        const hashValue = Utils.getHashValue();

        if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
            return hashValue;
        }
        else {
            return "";
        }
    }

    /** Adds dynamically generated content to the PreviewPage
     * 
     * and returns the card set heading as string */
    renderPreview(): string {
        const filters: {} = Utils.getFilters();

        if (filters["hero"] !== undefined && config.data.setPreviewData.heroes.indexOf(filters["hero"]) === -1) {
            alert("Invalid Hero! Showing Druid instead");

            Utils.createHash(`filters/{"cardSet":"${config.data.setPreviewData.cardSetName}","hero":"Druid"}`);
        }

        const setName: string = filters["cardSet"];

        //const filterString: string = `${setName}`;
        // let manaCost: string = filter["manaCost"];
        // if (manaCost !== undefined) {
        //     filterString += `&cost=${manaCost}`;
        // }

        if (this.lastSetName === setName && setName !== undefined) {
            this.showCards(this.lastCardData);
        }
        else {
            this.fResource.getCardData(filters)
                .then(cardData => {
                    if (setName !== undefined) {
                        this.lastSetName = setName;

                        if (cardData !== undefined) {
                            this.lastCardData = cardData;
                        }
                    }
                    this.showCards(cardData);
                })
        }

        // Set Heading
        if (filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
            return filters["cardSet"];
        }
        else if (filters["cardSet"] !== undefined) {
            Utils.createHash(`filters/{"cardSet":"Classic"}`);
            return "Classic";
        }
        else {
            return "none chosen";
        }
    }

    /** Inserts the images of the cards of a fetch call */
    showCards(cardData: any): void {

        let manaFilter: string = Utils.getFilters()["manaCost"];
        let heroFilter: string = Utils.getFilters()["hero"];

        let card: any;
        let cardFilterPassed: boolean;
        let heroFilterPassed: boolean;
        let manaFilterPassed: boolean;
        let setFilterPassed: boolean;
        let i: number = 1;

        // First remove old code
        document.getElementById("card-images").innerText = "";

        // Iterate the list of cards
        for (card of cardData) {

            cardFilterPassed = (
                card.collectible &&
                card.img !== undefined
            )

            setFilterPassed = (
                config.data.startPageData.cardSets.indexOf(card.cardSet) !== -1
            );

            if (cardFilterPassed && setFilterPassed) {

                heroFilterPassed = (
                    heroFilter === undefined || (
                        heroFilter !== undefined &&
                        card.playerClass === heroFilter
                    ))

                manaFilterPassed = (
                    manaFilter === undefined || (
                        manaFilter !== undefined && (
                            (card.cost == manaFilter && manaFilter <= "9") ||
                            (manaFilter == "10" && card.cost >= "10")
                        )))

                if (heroFilterPassed && manaFilterPassed) {
                    // Render card image
                    document.getElementById("card-images").insertAdjacentHTML("beforeend", `<img id="card_${i}" class="noDisplay" src="${card.img}" alt = "${card.name}" />`);
                    if (i < 9) {
                        Utils.toggleCssClass(`card_${i}`, "noDisplay");
                    }
                    i++;
                }
            }
        }
    }

    /**
     * Displays the CardPacks in the cart
     * 
     * @param {CardPack} pack - The CardPack to be displayed
    */
    showItems(items: Shopable[]): void {
        // First remove all shown packs
        document.getElementById("start-main").innerText = "";
        for (let item of items) {
            let packLink: string;
            switch (item["setName"]) {
                case "Classic":
                    packLink = "http://www.hearthcards.net/packs/images/pack.png";
                    break;
                case "The Grand Tournament":
                    packLink = "http://www.hearthcards.net/packs/images/packtgt.png";
                    break;
                case "Whispers of the Old Gods":
                    packLink = "http://www.hearthcards.net/packs/images/packwotog.png";
                    break;
                case "Mean Streets of Gadgetzan":
                    packLink = "http://www.hearthcards.net/packs/images/packmsog.png";
                    break;
                default:
                    break;
            }
            document.getElementById("start-main").insertAdjacentHTML("beforeend", `<img src="${packLink}" />`);
        }
    }
}