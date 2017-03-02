import { TemplateHandler } from '../services/templates/templateHandler';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from '../spa/singlePageApplication';
import { ShopButtonHandler } from '../services/buttons/shopButtonHandler';
import { StorageResource } from '../services/storage/storageResource';
import { Customer } from "./customer";

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {
    // PROPERTIES
    private sResource: StorageResource;
    
    private cart: ShoppingCart;
    public get Cart() { return this.cart; }

    private customer: Customer;
    public get Customer() { return this.customer; }

    public get BHandler() { return <ShopButtonHandler>this.bHandler; }

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ShopButtonHandler, cart: ShoppingCart) {
        super(tHandler, bHandler);
        this.tHandler = tHandler;
        this.bHandler = bHandler;
        this.cart = cart;
        this.sResource = cart.SResource;
    }

    // METHODS

    // - FORCED

    /** Called by SinglePageApplication.start() */
    loadSpecifics(): void {
        this.sResource.storageInit("cart", this.cart);
        addEventListener("hashchange", (setCart) => {
            this.sResource.setCart(this.cart);
        });
        // Updates other window or tab when storage changes
        addEventListener("storage", (setCart) => {
            this.sResource.setCart(this.cart);
        });
    }

    // - OWN

    setCustomer(customer: Customer): void {
        customer.FName = (<HTMLInputElement>document.getElementById("firstName")).value;
        customer.LName = (<HTMLInputElement>document.getElementById("lastName")).value;
        customer.Address = (<HTMLInputElement>document.getElementById("address")).value;
        customer.City = (<HTMLInputElement>document.getElementById("city")).value;
        customer.Country = (<HTMLInputElement>document.getElementById("country")).value;
        customer.ZipCode = (<HTMLInputElement>document.getElementById("zipCode")).value;
        customer.Tel = (<HTMLInputElement>document.getElementById("telephone")).value;
        customer.Email = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
        this.customer = customer;
    }
}