import { Shopable } from "../types/types";
import { StorageService } from '../services/storage/storageService';
import { Customer } from './customer';

'use strict';

export class ShoppingCart {

    //Properties
    private sService: StorageService;
    public get SService() { return this.sService; }

    private customer: Customer;
    /** All items in the cart */
    private items: Shopable[] = new Array<Shopable>();

    public get Items() { return this.items; }
    public set Items(Items) { this.items = Items }

    //Constructor
    /** Warns after first instantiation */
    constructor(sService: StorageService) {
        this.sService = sService;
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
        this.sService.populateStorage(this.items);
        return this.items;
    }
}