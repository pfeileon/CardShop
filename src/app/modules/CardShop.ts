import { Renderer } from './Renderer';
import { FetcherService } from './FetcherService';
import { FetcherResource } from './FetcherResource';
import { config } from '../config/config';
import { CardPack } from './CardPack';
import { ShoppingCart } from './ShoppingCart';

'use strict';

/** Singleton Class */
export class CardShop {

    //Properties
    /** Chosen product */
    private item: {};
    private content: any;
    private allCards: any;

    /** Singleton */
    private static shop: CardShop = new CardShop();

    //Methods
    /** Initialize the app */
    init(content: any): any {
        this.content = content;
        Renderer.render(content);

        FetcherService.query(config.url)
            .then(data => {
                this.allCards = data;
                console.log(this.allCards);
            });        
    }

    /** Prevent further instances */
    private constructor() {

        if (CardShop.shop) {
            throw new Error('Singleton');
        }

        CardShop.shop = this;
    }

    /** Returns the ShoppingCart.cart Singleton */
    public static GetShop(): CardShop {
        return CardShop.shop;
    }
}