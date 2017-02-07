import { RenderService } from '../modules/services/renderService';
import { StorageService } from '../modules/services/storageService';
import { ShoppingCart } from "../modules/shoppingCart";
"use strict";

export const cartTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1>Shopping Cart</h1>
    
    <section id="cart-content" class="row display-in-line">
        <div id="cart-content-packs" class="col-xs-3"></div>
        <div id="cart-content-amount" class="col-xs-1"></div>
    </section>

    <button id="cart-return-btn" type="button" class="btn btn-default return-btn">Return</button>
    <button id="cart-clear-btn" type="button" class="btn btn-default clear-btn">Clear</button>

    </article>`
}