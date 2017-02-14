import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchResource } from './fetchResource';
import { TemplateHandler } from '../templates/templateHandler';
import { RenderService } from './services/renderService';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from './abstracts/singlePageApplication';
import { ButtonHandler } from '../buttons/buttonHandler';
import { ShopButtonHandler } from '../buttons/shopButtonHandler';
import { StorageService } from './services/storageService';
import { Customer } from "./customer";
import * as Buttons from '../buttons/buttons';

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {
    // PROPERTIES
    private cart: ShoppingCart;
    public get Cart() { return this.cart; }

    private customer: Customer;
    public get Customer() { return this.customer; }
    public set Customer(customer) { this.customer = customer; }

    private sService: StorageService;
    public get SService() { return this.sService; }

    public get THandler() { return this.tHandler; }
    // TODO
    // Own field or use type assertion on getter?
    // (Needed for renderService.renderCart())
    //protected bHandler: ShopButtonHandler;
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
        window.addEventListener("storage", (e) => {
            this.sService.setCart(this.cart);
        });
    }
}