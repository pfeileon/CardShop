"use strict";

export const cartButtonTemplate = `<input class="input-amount" type= "number" name="amount" value="1" min="1" max="100" />
    <button class="add-to-cart-btn btn btn-primary" type="button"> Add to Cart</button>
    <span class="glyphicon glyphicon-shopping-cart"></span>
    <button class="goto-cart-btn btn btn-success" type="button" > Goto Cart</button>
`;

export const btnRecord = (item) => {
    return `<li data-id="${item}" role="button" class="btn btn-default">${item}</li>`;
}