import { FilterResource } from "../filter/filterResource";
import { RenderService } from "./renderService";
import { RenderDetail } from "./renderDetail";
import { config } from '../../config/config';
import { createHash, getHashValue } from '../misc/utilities';
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/fetchResource";
import { validate } from "../misc/customJQ";

'use strict';

export class RenderResource extends RenderService {

    // PROPERTIES

    // -- FORCED
    protected readonly stateRenderers = {
        "start": this.renderStart.bind(this),
        "preview": this.renderPreview.bind(this),
        "cart": this.renderCart.bind(this),
        "checkout": this.renderCheckout.bind(this),
        "error": this.renderError.bind(this)
    }

    // -- OWN
    private rDetail: RenderDetail;
    private fResource = <FetchResource>this.fService;
    private filterResource = <FilterResource>this.filterService;

    // CONSTRUCTOR
    constructor(fResource: FetchResource, filterResource: FilterResource, rDetail: RenderDetail) {
        super(fResource, filterResource);
        this.rDetail = rDetail;
    }

    // METHODS

    /** Adds dynamically generated content to the startPageData */
    renderStart(shop: CardShop) {
        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        this.rDetail.renderItems(shop.Cart.Items);

        const hashValue = getHashValue();

        let cardSet: string;
        if ((<any>config.data.cardSets).includes(hashValue)) {
            cardSet = hashValue;
        }
        else {
            cardSet = "";
        }
        shownCardSetHeader[0].textContent = cardSet;

        this.filterResource.refreshFilters("start");
    }

    /** Adds dynamically generated content to the PreviewPage */
    renderPreview(shop: CardShop) {
        let shownCardSetHeader = document.querySelector("#previewSetSelection .card-set-name");
        let shownHeroHeader = document.querySelector("span.hero-filter-heading");
        let shownManaHeader = document.querySelector("span.mana-filter-heading");

        const filters = this.filterResource.checkFilters();

        const setName = filters["cardSet"];

        this.rDetail.renderCards(this.filterResource, this.fResource, setName, filters);

        shownCardSetHeader.textContent = filters["cardSet"] || "all";
        shownHeroHeader.textContent = filters["hero"] || "all";
        shownManaHeader.textContent = filters["manaCost"] || "all";

        this.filterResource.refreshFilters("preview");
    }

    renderCart(shop: CardShop): void {
        let classList = document.getElementById("checkout-btn").classList;
        let cartContent = document.getElementById("cart-content");

        if (localStorage.getItem("cart") !== (null && undefined)) {
            cartContent.innerHTML = `
                <table id="cartContentTable" class="table table-hover">
                </table>
            `;

            if (!classList.contains("btn-success")) {
                classList.add("btn-success");
            }
            let cartObjectString = shop.Cart.SResource.validateCartObject(localStorage.getItem("cart"));
            createHash(`cart/${cartObjectString}`);
            let cartObject = JSON.parse(cartObjectString);
            this.rDetail.renderCartTable(shop, cartObject);
        }
        else {
            if (classList.contains("btn-success")) {
                classList.remove("btn-success");
            }
            cartContent.innerHTML = `
                <div class="well">Your cart is empty!</div>
            `;
            shop.Cart.SResource.setCartFromUrl();
        }
    }

    renderCheckout(shop: CardShop) {
        validate();
    }

    renderError(shop: CardShop) {
        document.getElementById("error-page").insertAdjacentHTML("afterbegin", "<h1>Error!</h1>");
    }
}