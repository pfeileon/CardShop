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

    public get FResource() {
        return this.fResource;
    }

    public get RService() {
        return this.rService;
    }

    public get Cart() {
        return this.cart;
    }
    
    constructor(fResource: FetchResource, rService: RenderService, cart: ShoppingCart) {
        this.fResource = fResource;
        this.rService = rService;
        this.cart = cart;
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet = (arg?: any): any => {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");
        if (Utils.getHashValue('#', 1) === undefined) {
            Utils.createHash("Classic");
            config.data.setPreviewData.cardSetName = "Classic";
        }
        this.fResource.getCardSet(Utils.getHashValue('#', 1))
            .then(data => {
                let cardSetData = data;
                this.rService.showCards(cardSetData);
            })
    };

    /** What happens when you click the Return Button */
    return(): void {
        Utils.toggleCssClass("start-page", "noDisplay");
        Utils.toggleCssClass("set-preview", "noDisplay");
    }

    /** What happens when you click the Add To Cart Button */
    addToCart = (): void => {
        let pack: CardPack = new CardPack(Utils.getHashValue('#', 1) || "Classic", this.fResource);
        this.cart.pushToCart(pack);
        console.log(this.cart.items);
    }
}