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
    return `<li role="button" id="${item.replace(/ /gi, "-")}-del-btn" data-id="${item}-del-btn" class="cart-del-btn btn btn-warning">delete</li>`;
}

const inputPackRecord = (item) => {
    return `<li data-id="${item}"><div class="input-pack btn btn-primary">${item}</div></li>`;
};

const inputAmountRecord = (item) => {
    return `<li data-id="${item}"><input class="input-amount btn btn-default" type="number" name ="amount" value="${item}" min="1" max="100" pattern="[0-9]" /></li>`
}

export class RenderResource extends RenderService {

    // PROPERTIES

    // -- FORCED
    protected stateRenderers = {
        "start": this.renderStart.bind(this),
        "preview": this.renderPreview.bind(this),
        "cart": this.renderCart.bind(this),
        "checkout": this.renderCheckout.bind(this),
        "error": this.renderError.bind(this)
    }
    
    // -- OWN
    private lastSetName: string;
    private lastCardData: any;
    private rDetail: RenderDetail;

    // CONSTRUCTOR
    constructor(fResource: FetchResource, rDetail: RenderDetail) {
        super(fResource);
        this.rDetail = rDetail;
    }

    // METHODS

    /**
     * Adds dynamically generated content to the startPageData
     * 
     * and returns the card set heading as string */
    renderStart(shop: CardShop) {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        this.rDetail.showItems(shop.Cart.Items);
        const hashValue = Utils.getHashValue();

        let cardSet: string;
        if ((<any>config.data.startPageData.cardSets).includes(hashValue)) {
            cardSet = hashValue;
        }
        else {
            cardSet = "";
        }
        shownCardSetHeader[0].textContent = cardSet;

        this.rDetail.refreshButtons(Object.keys(shop.StatePage)[0]);
    }

    /** Adds dynamically generated content to the PreviewPage
     * 
     * and returns the card set heading as string */
    renderPreview(shop: CardShop) {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");
        const filters: {} = Utils.getFilters();

        if (filters["hero"] !== undefined && !(<any>config.data.previewPageData.heroes).includes(filters["hero"])) {
            alert("Invalid Hero! Showing Druid instead");

            Utils.createHash(`preview/{"cardSet":"${config.data.previewPageData.cardSetName}","hero":"Druid"}`);
        }

        const setName: string = filters["cardSet"];

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
            Utils.createHash(`preview/{"cardSet":"Classic"}`);
            cardSet = "Classic";
        }
        else {
            cardSet = "none chosen";
        }
        shownCardSetHeader[1].textContent = cardSet;

        this.rDetail.refreshButtons(<any>Object.keys(shop.StatePage)[1]);
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

            document.getElementById("cart-content-packs").innerHTML = `${this.insertList((<any>Array).from(help[0]), inputPackRecord)}`;
            document.getElementById("cart-content-amount").innerHTML = `${this.insertList((<any>Array).from(help[1]), inputAmountRecord)}`;
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

    renderCheckout(shop: CardShop) {
        // TODO ?
    }

    renderError(shop: CardShop) {
        document.getElementById("error-page").insertAdjacentHTML("afterbegin", "<h1>Error!</h1>");
    }
}