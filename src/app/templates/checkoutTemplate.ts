import { RenderService } from '../modules/services/renderService';
"use strict";

export const checkoutTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1 class="well">Checkout</h1>
    
    <section id="personal-data" class="row display-in-line">
        
    </section>
    <section id="checkout-btns" class="row">
        <button id="cancel-btn" type="button" class="btn btn-danger">Cancel</button>
        <button id="confirm-btn" type="button" class="btn btn-success">Confirm</button>
    </section>

    </article>`
}