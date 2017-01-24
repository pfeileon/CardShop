import { PseudoSingleton } from '../types/types'
import * as Utils from './utilities'
import { Customer } from './customer'

'use strict';

export class ShoppingCart implements PseudoSingleton {

    //Properties
    private static exists: boolean = false;
    private customer: Customer;
    /** All items in the cart */
    items: {}[] = new Array<{}>();

    //Constructor
    /** Warns after first instantiation */
    constructor() {
        this.existsCheck();
    }

    //Methods
    /** Adds an item to the cart
     * @param {{}} item - The item to be added.
    */
    pushToCart = (item: {}): void => {
        this.items.push(item);
    }

    /** Removes an item from the cart
     * @param {number} i - Position of the item to be removed.
    */
    spliceFromCart = (i: number): void => {
        this.items.splice(i, 1);
    }

    existsCheck() {
        ShoppingCart.exists = Utils.instanceCheck(ShoppingCart.exists, PseudoSingleton.message);
    }
}