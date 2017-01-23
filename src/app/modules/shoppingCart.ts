import { Customer } from './customer'

'use strict';

/** Instantiate only once! */
export class ShoppingCart {

    //Properties
    private static exists: boolean = false;
    private customer: Customer;
    /** All items in the cart */
    private items: {}[];

    //Constructor
    /** Warns after first instantiation */
    constructor() {
        if (ShoppingCart.exists) {
            console.log('Are you sure that you want another instance?');
        }
        ShoppingCart.exists = true;
    }

    //Methods
    /** Adds an item to the cart
     * @param {{}} item - The item to be added.
    */
    addToCart = (item: {}): void => {
        this.items.push(item);
    }

    /** Removes an item from the cart
     * @param {number} i - Position of the item to be removed.
    */
    removeFromCart = (i: number): void => {
        this.items.splice(i, 1);
    }
}
