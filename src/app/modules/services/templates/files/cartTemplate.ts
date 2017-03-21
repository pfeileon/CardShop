import { RenderService } from '../../render/renderService';
"use strict";

export const cartTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1 class="well">Shopping Cart</h1>
    
    <section id="cart-content">
    </section>
    <section id="cart-btns" class="cart-btn-row">
        <button id="cart-return-btn" type="button" class="btn btn-default return-btn">Go Back</button>
        <button id="cart-clear-btn" type="button" class="btn btn-danger clear-btn">Clear Cart</button>
        <button id="checkout-btn" type="button" class="btn-lg btn-success">Checkout</button>
    </section>

    </article>`
}