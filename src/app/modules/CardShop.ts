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
    private message: string;
    private allCards: any;

    /** Singleton */
    private static shop: CardShop = new CardShop();

    //Methods
    /** Initialize data */
    private init(greet: string): void {
        this.message = greet;

        FetcherService.query(config.url)
            .then(data => {
                this.allCards = data;
                console.log(this.allCards);
            })
    }

    /** Generates the startup-view */
    public startUp(): string {
        return Renderer.render(this.message);
    }

    /** Prevent further instances */
    private constructor() {

        if (CardShop.shop) {
            throw new Error('Singleton');
        }

        CardShop.shop = this;
        CardShop.shop.init('TestInit');
    }

    /** Returns the ShoppingCart.cart Singleton */
    public static GetShop(): CardShop {
        return CardShop.shop;
    }
}