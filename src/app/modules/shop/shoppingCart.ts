import { Shopable } from "../types/types";
import { StorageResource } from '../services/storage/storageResource';
import { Customer } from './customer';

'use strict';

export class ShoppingCart {

    //Properties
    private sResource: StorageResource;
    public get SResource() { return this.sResource; }

    /** All items in the cart */
    private items: Shopable[] = new Array<Shopable>();
    public get Items() { return this.items; }
    public set Items(Items) { this.items = Items }

    //Constructor
    /** Warns after first instantiation */
    constructor(sResource: StorageResource) {
        this.sResource = sResource;
    }

    //Methods

    initCart() {
        this.sResource.storageInit("cart", this);
        addEventListener("hashchange", (setCart) => {
            this.sResource.setCart(this);
        });
        // Updates other window or tab when storage changes
        addEventListener("storage", (setCart) => {
            this.sResource.setCart(this);
        });
    }

    /**
     * Fills the ShoppingCart with items and returns them
     * @param {{}} item - The type of item to be put into the cart
     * @param {number} amount - The amount of this item to be put into the cart
     * */
    fillCart = (item: Shopable, amount: number): Shopable[] => {
        for (let i: number = 0; i < amount; i++) {
            this.items.push(item);
        }
        this.sResource.populateStorage(this);
        return this.items;
    }
}