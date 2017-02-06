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
import * as Buttons from '../buttons/buttons';

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {
    // PROPERTIES
    // - FORCED
    protected bHandler: ShopButtonHandler;
    // - OWN
    private cart: ShoppingCart;
    public get Cart() { return this.cart; }
    private sService: StorageService;

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
        this.rService.showItems(this.cart.Items);
        window.onstorage = (e) => {
            console.log("HALLO");
            this.rService.showItems(this.cart.Items);
        };
        // localStorage.clear();
    }
}