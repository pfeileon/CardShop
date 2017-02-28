import { RenderService } from "./renderService";
import { RenderDetail } from "./renderDetail";
import { Shopable } from "../../types/types";
import { config } from '../../config/config';
import * as Utils from '../../misc/utilities';
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/fetchResource";
import { cardModal } from "../../templates/modalTemplate";
import { formTemplate } from "../../templates/formTemplate";
import { accordionTemplate } from "../../templates/accordionTemplate";

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
        let shownCardSetHeader = document.querySelector("#previewSetSelection .card-set-name");
        const filters: {} = Utils.getFilters();

        this.checkHeroFilter(filters);

        const setName: string = filters["cardSet"];

        this.rDetail.renderCards(this.fResource, setName, filters);

        shownCardSetHeader.textContent = this.setPreviewHeading(filters);

        this.rDetail.refreshFilters("preview");
    }

    setPreviewHeading(filters: {}): string {
        let cardSet: string;
        // Set Heading
        if (filters["cardSet"] !== undefined && (<any>config.data.startPageData.cardSets).includes(filters["cardSet"])) {
            return cardSet = filters["cardSet"];
        }
        else if (filters["cardSet"] !== undefined) {
            Utils.createHash(`preview/{"cardSet":"Classic"}`);
            return cardSet = "Classic";
        }
        else {
            return cardSet = "none chosen";
        }
    }

    checkHeroFilter(filters: {}) {
        if (filters["hero"] !== undefined && !(<any>config.data.previewPageData.heroes).includes(filters["hero"])) {
            alert("Invalid Hero! Showing Druid instead");

            Utils.createHash(`preview/{"cardSet":"${config.data.previewPageData.cardSetName}","hero":"Druid"}`);
        }
    }

    renderCart(shop: CardShop): void {
        let classList = document.getElementById("checkout-btn").classList;
        let cartContent = document.getElementById("cart-content");

        if (localStorage.getItem("cart") !== (null && undefined)) {
            cartContent.innerHTML = `
                <table id="cartContentTable" class="table">
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
        // Nothing to render
        // All content is in the checkoutTemplate
    }

    renderError(shop: CardShop) {
        document.getElementById("error-page").insertAdjacentHTML("afterbegin", "<h1>Error!</h1>");
    }
}