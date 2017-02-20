import { RenderService } from "./renderService";
import { RenderDetail } from "./renderDetail";
import { Shopable } from "../../types/types";
import { config } from '../../config/config';
import * as Utils from '../../misc/utilities';
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/fetchResource";
import { cardModal } from "../../templates/modals";

'use strict';

const deleteRecord = (item) => {
    return `<li data-id="${item}-del-btn"><button id="${item.replace(/ /gi, "-")}-del-btn" data-id="${item}-del-btn" type="button" class="cart-del-btn btn btn-warning">delete</button></li>`;
}

const inputPack = (item) => {
    return `<li data-id="${item}"><div class="input-pack btn btn-primary">${item}</div></li>`;
};

const inputAmount = (item) => {
    return `<li data-id="${item}"><input class="input-amount btn btn-default" type="number" name ="amount" value="${item}" min="1" max="100" pattern="[0-9]" /></li>`
}

export class RenderResource extends RenderService {

    private lastSetName: string;
    private lastCardData: any;
    private rDetail: RenderDetail;

    constructor(fResource: FetchResource, rDetail: RenderDetail) {
        super(fResource);
        this.rDetail= rDetail;
    }

    /** Renders the page according to the hash */
    render(shop: CardShop): void {
        let hashValue;

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if ((<any>decodeURI(window.location.hash)).includes("/")) {
            hashValue = decodeURI(window.location.hash.split("/")[0]);
        }
        else {
            hashValue = "";
        }

        switch (hashValue) {
            case undefined:
                this.displayCheck(shop.States[0], shop);
                break;

            case "":
                this.displayCheck(shop.States[0], shop);
                break;

            case "#":
                this.displayCheck(shop.States[0], shop);
                break;

            case "#filters":
                this.displayCheck(shop.States[1]);
                break;

            case "#cart":
                this.displayCheck(shop.States[2], shop);
                break;

            case "#checkout":
                this.displayCheck(shop.States[3], shop)
                break;

            default:
                this.displayCheck(shop.States[4]);
                break;
        }
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
        let checkoutShown: boolean = !document.getElementById("checkout").classList.contains("noDisplay");
        let errorPageShown: boolean = !document.getElementById("error-page").classList.contains("noDisplay");

        switch (selector) {
            case "start": {
                shownCardSetHeader[0].textContent = this.renderStart(shop);
                this.rDetail.refreshButtons(selector);
                if (!startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                if (checkoutShown) {
                    Utils.toggleCssClass("checkout", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "preview": {
                shownCardSetHeader[1].textContent = this.renderPreview();
                this.rDetail.refreshButtons(selector);
                if (!setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (cartShown) {
                    Utils.toggleCssClass("shopping-cart", "noDisplay");
                }
                if (checkoutShown) {
                    Utils.toggleCssClass("checkout", "noDisplay");
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
                if (checkoutShown) {
                    Utils.toggleCssClass("checkout", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "checkout": {
                this.renderCart(shop);
                if (!checkoutShown) {
                    Utils.toggleCssClass("checkout", "noDisplay");
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
                if (checkoutShown) {
                    Utils.toggleCssClass("checkout", "noDisplay");
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
                item.addEventListener("input", (e) => {
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
        this.rDetail.showItems(shop.Cart.Items);
        const hashValue = Utils.getHashValue();

        let cardSet: string;
        if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
            cardSet = hashValue;
        }
        else {
            cardSet = "";
        }
        return cardSet;
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
            this.rDetail.showCards(this.lastCardData);
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
                    this.rDetail.showCards(cardData);
                })
        }

        let cardSet: string;
        // Set Heading
        if (filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
            cardSet = filters["cardSet"];
        }
        else if (filters["cardSet"] !== undefined) {
            Utils.createHash(`filters/{"cardSet":"Classic"}`);
            cardSet = "Classic";
        }
        else {
            cardSet = "none chosen";
        }
        return cardSet;
    }
}