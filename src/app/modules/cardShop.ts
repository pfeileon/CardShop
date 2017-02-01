import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchResource } from './fetchResource';
import { TemplateHandler } from '../templates/templateHandler';
import { RenderService } from './services/renderService';
import { ShoppingCart } from './shoppingCart';
import { SinglePageApplication } from './abstracts/singlePageApplication';
import { ButtonHandler } from '../buttons/buttonHandler';
import * as Buttons from '../buttons/buttons';

'use strict';

/** Start via inherited method "start()" */
export class CardShop extends SinglePageApplication {

    //Properties
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected rService: RenderService;

    private cart: ShoppingCart;
    private bHandler: ButtonHandler;

    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(tHandler);

        this.bHandler = bHandler;
        this.tHandler = tHandler;
        this.cart = bHandler.Cart;
    }

    // Methods
    /** 
     * Abstract --> implementation 
     * 
     * Called by SinglePageApplication.start()
    */
    loadSpecifics = (): void => {
        // Filters
        this.bHandler.iterateFilters();

        // Preview Card Set
        this.bHandler.previewCardSet();

        // Return
        this.bHandler.return();

        // Cart
        this.bHandler.addToCart();
        this.bHandler.gotoCart();

        // Utils.clickElement(document.getElementById("next-cards-shown"), this.bHandler.showNextCards);
        // Utils.clickElement(document.getElementById("previous-cards-shown"), this.bHandler.showPreviousCards);
    }
}