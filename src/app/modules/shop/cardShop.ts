import { config } from '../config/config';
import * as Utils from '../misc/utilities';
import { FetchResource } from '../services/fetch/fetchResource';
import { TemplateHandler } from '../templates/templateHandler';
import { RenderService } from '../services/render/renderService';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from '../spa/singlePageApplication';
import { ButtonHandler } from '../buttons/buttonHandler';
import { ShopButtonHandler } from '../buttons/shopButtonHandler';
import { StorageService } from '../services/storage/storageService';
import { Customer } from "./customer";
import * as Buttons from '../buttons/buttons';

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {
    // PROPERTIES
    // - FORCED
    protected readonly states = ["start", "preview", "cart", "checkout", "error"];
    public get States() { return this.states; }
    private readonly pages: string[] = ["start-page", "set-preview", "shopping-cart", "checkout", "error-page"];
    public get Pages() { return this.pages; }

    // - OWN
    private cart: ShoppingCart;
    public get Cart() { return this.cart; }

    private customer: Customer;
    public get Customer() { return this.customer; }

    private sService: StorageService;
    public get SService() { return this.sService; }

    public get THandler() { return this.tHandler; }
    
    public get BHandler(): ShopButtonHandler { return <ShopButtonHandler>this.bHandler; }

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
    loadSpecifics = (): void => {
        this.sService.storageInit(this.cart);
        window.addEventListener("hashchange", (e) => {
            this.sService.setCart(this.cart);
        });
        // Updates other window or tab when storage changes
        window.addEventListener("storage", (e) => {
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