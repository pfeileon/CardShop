import { ButtonHandler } from "./buttonHandler";
import { RenderService } from "../modules/services/renderService";
import { ShoppingCart } from "../modules/shoppingCart";

"use strict";

export class ShopButtonHandler extends ButtonHandler {
    private cart: ShoppingCart;

    public get Cart() { return this.cart; }

    constructor(rService: RenderService, cart: ShoppingCart) {
        super(rService);
        this.cart = cart;
    }
}