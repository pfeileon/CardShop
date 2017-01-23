import { Customer } from './Customer'

'use strict';

/** Instantiate only once! */
export class ShoppingCart {

    //Properties
    private static exists: boolean = false;
    private customer: Customer;
    /** All items in the cart */
    public items: {}[];

    //Methods
    /** Adds an item to the cart */
    public AddToCart(item: {}) {
        this.items.push(item);
    }

    /** Removes an item from the cart */
    public RemoveFromCart(i: number) {
        this.items.splice(i, 1);
    }

    /** Prevents more than one instantiation */
    constructor() {
        if (ShoppingCart.exists) {
            throw new Error("not more than one instance allowed");
        }
        ShoppingCart.exists = true;
    }
}
