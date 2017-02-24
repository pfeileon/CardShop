import { RenderService } from '../services/render/renderService';
"use strict";

export const cartTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1 class="well">Shopping Cart</h1>
    
    <section id="cart-content" class="row">
    </section>
    <section id="cart-btns" class="row">
        <button id="cart-return-btn" type="button" class="btn btn-default return-btn col-xs-1">Return</button>
        <button id="cart-clear-btn" type="button" class="btn btn-danger clear-btn col-xs-1">Clear Cart</button>
        <span class="col-xs-1"></span>
        <button id="checkout-btn" type="button" class="btn btn-success col-xs-2">Checkout</button>
    </section>

    </article>`
}