import { config } from '../../config/config';
import * as Utils from '../utilities';
import { FetchResource } from "../fetchResource";
import { Shopable } from "../../types/types";

'use strict';

const record = (item) => {
    return `<li data-id="${item}"><button data-id="${item}" type="button" class="btn btn-default">${item}</button></li>`;
};

const inputPack = (item) => {
    return `<li data-id="${item}"><div class="well">${item}</div></li>`;
};

const inputAmount = (item) => {
    return `<li data-id="${item}"><input class="input-amount well" type="number" name ="amount" value="${item}" min="1" max="100" /></li>`
}

export class RenderService {

    private lastSetName: string;
    private lastCardData: any;
    private fResource: FetchResource;

    public get FResource() { return this.fResource; }

    constructor(fResource: FetchResource) {
        this.fResource = fResource;
    }

    /** Renders the page according to the hash */
    render(content: any): any {

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
                this.displayCheck("start");
                break;

            case "":
                this.displayCheck("start");
                break;

            case "#":
                this.displayCheck("start");
                break;

            case "#filters":
                this.displayCheck("preview");
                break;

            case "#cart":
                this.displayCheck("cart");
                break;

            default:
                this.displayCheck("error");
                break;
        }

        return `${content}`;
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
    displayCheck(selector: string): void {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        let startPageShown: boolean = !document.getElementById("start-page").classList.contains("noDisplay");
        let setPreviewShown: boolean = !document.getElementById("set-preview").classList.contains("noDisplay");
        let cartShown: boolean = !document.getElementById("shopping-cart").classList.contains("noDisplay");
        let errorPageShown: boolean = !document.getElementById("error-page").classList.contains("noDisplay");

        switch (selector) {
            case "start": {
                shownCardSetHeader[0].textContent = this.renderStart();

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
                this.renderCart();
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

    renderCart(): void {
        if (localStorage.getItem("cart") !== null || undefined) {
            let temp: {} = JSON.parse(localStorage.getItem("cart"));
            let help: string[][] = [Object.keys(temp), (<any>Object).values(temp)];

            document.getElementById("cart-content-packs").innerHTML = `${this.insertList((<any>Array).from(help[0]), inputPack)}`;
            document.getElementById("cart-content-amount").innerHTML = `${this.insertList((<any>Array).from(help[1]), inputAmount)}`;

            let inputAmountHelper: HTMLCollectionOf<Element> = document.getElementsByClassName("input-amount well")
            let i: number = 0;
            for (let item of <any>inputAmountHelper) {
                item.id = `cart-input-amount-${i}`;
                item.addEventListener("click", (e) => {
                    let amountOfPacks: number;
                    amountOfPacks = +(<HTMLInputElement>item).value;
                    let cartStorage = JSON.parse(localStorage.getItem("cart"));

                    // TODO
                    // update start-page showpacks() oder sp

                    let prop = (<any>Object).keys(cartStorage);
                    cartStorage[prop[+(item.id.substring(18))]] = amountOfPacks;

                    localStorage.setItem("cart", JSON.stringify(cartStorage));
                });
                i++;
            }
        }
        else {
            document.getElementById("cart-content").innerHTML = "Your cart is empty!";
        }
        // sService.itemStorage(cart.Items)
    }

    /**
     * Adds dynamically generated content to the startPageData
     * 
     * and returns the card set heading as string */
    renderStart(): string {

        // TODO
        // Implement dynamic rendering of items in cart
        // For now: see ShoppingCart.fillCart()

        const hashValue = Utils.getHashValue();

        if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
            return hashValue;
        }
        else {
            return "";
        }

        // TODO
        //this.showItems();
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
            alert("Invalid Card Set! Reverting to Classic");

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