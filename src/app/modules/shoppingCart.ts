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
    items: {}[] = new Array<{}>();

    //Constructor
    /** Warns after first instantiation */
    constructor() {
        super(ShoppingCart.pseudoSingletonArg);
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
}