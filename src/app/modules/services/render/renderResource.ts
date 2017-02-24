import { RenderService } from "./renderService";
import { RenderDetail } from "./renderDetail";
import { Shopable } from "../../types/types";
import { config } from '../../config/config';
import * as Utils from '../../misc/utilities';
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/fetchResource";
import { cardModal } from "../../templates/modalTemplate";

'use strict';

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
    public get LastCardData() { return this.lastCardData; }
    private rDetail: RenderDetail;

    // CONSTRUCTOR
    constructor(fResource: FetchResource, rDetail: RenderDetail) {
        super(fResource);
        this.rDetail = rDetail;
    }

    // METHODS

    /** Adds dynamically generated content to the startPageData */
    renderStart(shop: CardShop) {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        this.rDetail.renderItems(shop.Cart.Items);
        const hashValue = Utils.getHashValue();

        let cardSet: string;
        if ((<any>config.data.startPageData.cardSets).includes(hashValue)) {
            cardSet = hashValue;
        }
        else {
            cardSet = "";
        }
        shownCardSetHeader[0].textContent = cardSet;

        this.rDetail.refreshFilters("start");
    }

    /** Adds dynamically generated content to the PreviewPage */
    renderPreview(shop: CardShop) {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");
        const filters: {} = Utils.getFilters();

        if (filters["hero"] !== undefined && !(<any>config.data.previewPageData.heroes).includes(filters["hero"])) {
            alert("Invalid Hero! Showing Druid instead");

            Utils.createHash(`preview/{"cardSet":"${config.data.previewPageData.cardSetName}","hero":"Druid"}`);
        }

        const setName: string = filters["cardSet"];

        if (this.lastSetName === setName && setName !== undefined) {
            this.rDetail.renderCards(this.lastCardData);
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
                    this.rDetail.renderCards(cardData);
                })
            window.addEventListener("resize", (e) => {
                this.rDetail.renderCards(this.lastCardData);
            });
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

        this.rDetail.refreshFilters("preview");
    }

    renderCart(shop: CardShop): void {
        let classList = document.getElementById("checkout-btn").classList;
        let cartContent = document.getElementById("cart-content");

        if (localStorage.getItem("cart") !== (null && undefined)) {
            cartContent.innerHTML = `
                <table id="cartContentTable">
                </table>
            `;

            if (!classList.contains("btn-success")) {
                classList.add("btn-success");
            }

            let cartObject = JSON.parse(localStorage.getItem("cart"));
            this.rDetail.renderCartTable(shop, cartObject);
        }
        else {
            if (classList.contains("btn-success")) {
                classList.remove("btn-success");
            }
            cartContent.innerHTML = `
                <div class="well">Your cart is empty!</div>
            `;
        }
    }

    renderCheckout(shop: CardShop) {
        // TODO ?
    }

    renderError(shop: CardShop) {
        document.getElementById("error-page").insertAdjacentHTML("afterbegin", "<h1>Error!</h1>");
    }
}