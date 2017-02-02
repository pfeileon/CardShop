import { Shopable } from "../types/types";
import { PseudoSingleton } from './abstracts/pseudoSingleton'
import * as Utils from './utilities'
import { Customer } from './customer'

'use strict';

export class ShoppingCart extends PseudoSingleton {

    //Properties
    private static name: string;
    private static exists: boolean = false;
    private static pseudoSingletonArg: { exists: boolean, message: string } = {
        exists: ShoppingCart.exists,
        message: `${ShoppingCart.name}: ${PseudoSingleton.message}`
    };


    private customer: Customer;
    /** All items in the cart */
    private items: Shopable[] = new Array<Shopable>();

    public get Items() { return this.items; }
    public set Items(Items) { this.items = Items }

    //Constructor
    /** Warns after first instantiation */
    constructor() {
        super(ShoppingCart.pseudoSingletonArg);
    }

    //Methods

    /**
     * Fills the ShoppingCart with items and returns them
     * @param {{}} item - The type of item to be put into the cart
     * @param {number} amount - The amount of this item to be put into the cart
     * */
    fillCart = (item: Shopable, amount: number): Shopable[] => {
        for (let i: number = 0; i < amount; i++) {
            this.items.push(item);
        }
        return this.items;
    }
}