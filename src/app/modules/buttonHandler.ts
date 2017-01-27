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

    public get FResource() { return this.fResource; }
    public get RService() { return this.rService; }
    public get Cart() { return this.cart; }
    public get LastFetch() { return this.lastFetch; }
    public set LastFetch(lastFetch) { this.lastFetch = lastFetch; }

    constructor(fResource: FetchResource, rService: RenderService, cart: ShoppingCart) {
        this.fResource = fResource;
        this.rService = rService;
        this.cart = cart;
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet = (): any => {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");

        if (Utils.getHashValue('#', 1) === undefined) {
            config.data.setPreviewData.cardSetName = "Classic";
            Utils.createHash("Classic");
        }

        try {
            let cardSetName = Utils.getHashValue('#', 1);
            Utils.createHash(`filters/{"cardSet":"${cardSetName}","hero":"Druid"}`);
        }
        catch (error) {
            config.data.setPreviewData.cardSetName = "Classic";
            Utils.createHash(`filters/{"cardSet":"${config.data.setPreviewData.cardSetName}","hero":"Druid"}`);
        }

        this.fResource.getCardSet(Utils.getFilters()["cardSet"])
            .then(data => {
                let cardSetData = data;
                this.lastFetch = data;
                this.rService.showCards(cardSetData);
            })
    }

    /** What happens when you click the Return Button */
    return = (): void => {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");

        try {
            Utils.createHash(Utils.getFilters()["cardSet"]);
        }
        catch (error) {
            Utils.createHash("Classic");
        }
    }

    /** What happens when you click the Add To Cart Button */
    addToCart = (): void => {
        let pack: CardPack = new CardPack(Utils.getHashValue('#', 1) || "Classic", this.fResource);
        this.cart.pushToCart(pack);
        console.log(this.cart.items);
    }
}