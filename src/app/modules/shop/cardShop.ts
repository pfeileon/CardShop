import { TemplateHandler } from '../templates/templateHandler';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from '../spa/singlePageApplication';
import { ShopButtonHandler } from '../buttons/shopButtonHandler';
import { StorageService } from '../services/storage/storageService';
import { Customer } from "./customer";

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {
    // PROPERTIES
    private cart: ShoppingCart;
    public get Cart() { return this.cart; }

    private customer: Customer;
    public get Customer() { return this.customer; }

    private sService: StorageService;
    public get SService() { return this.sService; }

    public get THandler() { return this.tHandler; }

    public get BHandler() { return <ShopButtonHandler>this.bHandler; }

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ShopButtonHandler, cart: ShoppingCart) {
        super(tHandler, bHandler);
        this.tHandler = tHandler;
        this.bHandler = bHandler;
        this.cart = cart;
        this.sService = cart.SService;
    }

    // METHODS

    // - FORCED

    /** Called by SinglePageApplication.start() */
    loadSpecifics(): void {
        this.sService.storageInit(this.cart);
        addEventListener("hashchange", (setCart) => {
            this.sService.setCart(this.cart);
        });
        // Updates other window or tab when storage changes
        addEventListener("storage", (setCart) => {
            this.sService.setCart(this.cart);
        });
    }

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