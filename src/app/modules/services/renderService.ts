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
        if ((<any>decodeURI(window.location.hash)).includes("/")) {
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

            case "#checkout":
                this.displayCheck("checkout", shop)
                break;

            default:
                this.displayCheck("error");
                break;
        }
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
        let checkoutShown: boolean = !document.getElementById("checkout").classList.contains("noDisplay");
        let errorPageShown: boolean = !document.getElementById("error-page").classList.contains("noDisplay");

        switch (selector) {
            case "start": {
                shownCardSetHeader[0].textContent = this.renderStart(shop);
                this.refreshButtons(selector);
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
                this.refreshButtons(selector);
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

    /** Inserts the images of the cards of a fetch call */
    showCards(cardData: any): void {

        let manaFilter: string = Utils.getFilters()["manaCost"];
        let heroFilter: string = Utils.getFilters()["hero"];

        let card: any;
        let cardFilterPassed: boolean;
        let heroFilterPassed: boolean;
        let manaFilterPassed: boolean;
        let setFilterPassed: boolean;
        let i: number = 0;

        // First remove old code
        document.getElementById("carouselCardWrapper").innerText = "";
        document.getElementById("carouselInd").innerText = "";
        document.getElementById("previewFooter").innerText = "";

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
                    //Testing carousel
                    this.renderCarousel(card, i);

                    i++;
                }
            }
        }
        // auto-generate bootstrap carousel indicators
        this.genCarouselInd();
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

    refreshButtons(page: string) {
        let temp = document.getElementsByClassName("btn-group-justified");
        let btnList: HTMLCollection;
        let i: number;

        if (page === "start") {
            i = 0;
        }

        if (page === "preview") {
            i = 1;

            btnList = temp[i + 1].children[0].children;
            this.refreshButtonsHelpFunction(btnList, Utils.getHeroFilter());
            btnList = temp[i + 2].children[0].children;
            this.refreshButtonsHelpFunction(btnList, Utils.getManaFilter());
        }

        btnList = temp[i].children[0].children;
        this.refreshButtonsHelpFunction(btnList, Utils.getCardSetFilter());
    }

    refreshButtonsHelpFunction(btnList: HTMLCollection, filter: string) {
        for (let item of <any>btnList) {
            if (item.attributes["data-id"].value === filter) {
                item.children[0].classList.remove("btn-default");
                item.children[0].classList.add("btn-primary");
            }
            else {
                item.children[0].classList.add("btn-default");
                item.children[0].classList.remove("btn-primary");
            }
        }
    }

    renderCarousel(card, i: number) {
        let x: number;
        let w = window.innerWidth;
        if (w < 600) {
            x = 2;
        }
        if (w >= 600) {
            x = 3;
        }
        if (w >= 1024) {
            x = 4;
        }
        if (w >= 1200) {
            x = 5;
        }
        if (w > 1600) {
            x = 6;
        }

        let j = Math.floor(i / x);

        if (i === 0 || i % x === 0) {
            document.getElementById("carouselCardWrapper").insertAdjacentHTML("beforeend", `<div id="carouselItem${j}" class="item"></div>`);
        }

        document.getElementById(`carouselItem${j}`).insertAdjacentHTML("beforeend", `<div id="carouselCardHelp${j}" class="text-center"</div>`);

        // Render card image
        document.getElementById(`carouselCardHelp${j}`).insertAdjacentHTML("beforeend", `<img role="button" data-toggle="modal" data-target="#cardModal${i}" src="${card.img}" alt="${card.name}" />`);
        document.getElementById("previewFooter").insertAdjacentHTML("beforeend", `${cardModal(card, i)}`);

        if (i === 0) {
            document.getElementById("carouselItem0").classList.add("active");
        }
    }

    genCarouselInd() {
        let carInd = document.getElementById("carouselInd");

        let carWrap = document.getElementById("carouselCardWrapper");
        let len = carWrap.children.length;

        for (let i = 0; i < len; i++) {
            carInd.insertAdjacentHTML("beforeend", `<li id="indicator${i}" data-target='#previewCarousel' data-slide-to="${i}" class=""></li>`);
        }
        document.getElementById("indicator0").classList.add("active");
    }
}

export const checkoutModal = (customer) => {
    return `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="checkoutModalLabel">Please confirm before buying:</h4>
      </div>
      <div class="modal-body">
        <table>
            <tr>
                <td>Name:</td><td>${customer.fName + " " + customer.lName}</td>
            </tr>
            <tr>
                <td>Address:</td><td>${customer.address + ", " + customer.zipCode + " " + customer.city + ", " + customer.country}</td>
            </tr>
            <tr>
                <td>Credit card:</td><td>${customer.creditCard.owner + ", " + customer.creditCard.cardNumber + ", " + customer.creditCard.validThru}</td>
            </tr>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button id="buyBtn" type="button" class="btn btn-primary">Buy!</button>
      </div>
    </div>
  </div>`
};

const cardModal = (card: any, i: number) => {
    return `
<!-- Modal -->
<div class="modal fade" id="cardModal${i}" tabindex="-1" role="dialog" aria-labelledby="${card.name}">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="${card.name}">${card.name}</h4>
      </div>
      <div class="modal-body">
        <div class="col-sm-7">
            <img src="${card.img}" alt="${card.name}" />
        </div>
        <div class="col-sm-5">
        <div class="flavor well">
            <span>${card.flavor}</span>
            </div>
        </div>
        <div class="clearfix"></div>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`;
}