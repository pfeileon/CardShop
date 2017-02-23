import { RenderService } from "./renderService";
import { RenderDetail } from "./renderDetail";
import { Shopable } from "../../types/types";
import { config } from '../../config/config';
import * as Utils from '../../misc/utilities';
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/fetchResource";
import { cardModal } from "../../templates/modals";

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
            document.getElementById("cart-content").innerHTML = `
                <table id="cartContentTable">
                </table>
            `;

            if (!document.getElementById("checkout-btn").classList.contains("btn-success")) {
                document.getElementById("checkout-btn").classList.remove("btn-success");
            }
            
            let cartObject = JSON.parse(localStorage.getItem("cart"));
            this.rDetail.showCart(cartObject);
            // Must be called on rendering and not on start because eventHandlers get lost after re-rendering
            shop.BHandler.cartToPreview();
            shop.BHandler.editCartPosition();
            shop.BHandler.deleteCartPosition(shop);
        }
        else {
            if (document.getElementById("checkout-btn").classList.contains("btn-success")) {
                document.getElementById("checkout-btn").classList.remove("btn-success");
            }
            document.getElementById("cart-content").innerHTML = `
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