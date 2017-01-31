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

    /** Removes an item from the cart */
    popFromCart = (): void => {
        this.items.pop();
    }

    /** Fills the ShoppingCart with packs and displays them */
    fillCart = (item: {}, showItems = (item: {}) => {}): {}[] => {
        let amountOfPacks: number;

        if (Utils.getHashValue().search("/") === -1) {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[0]).value;
        }
        else {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[1]).value;
        }

        for (let i: number = 0; i < amountOfPacks; i++) {
            this.pushToCart(item);
            showItems(item);
        }

        return this.items;
    }
}