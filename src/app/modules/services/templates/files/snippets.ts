"use strict";

export const cartButtonTemplate = `<input class="input-amount" type= "number" name="amount" value="" min="1" max="10" step="1" placeholder="1-10" />
    <button class="add-to-cart-btn btn btn-primary" type="button"> Add to Cart</button>
    <span class="glyphicon glyphicon-shopping-cart"></span>
    <button class="goto-cart-btn btn btn-success" type="button" > Goto Cart</button>
`;

export const btnRecord = (item): string => {
    return `<li data-id="${item}" role="button" class="btn btn-default">${item}</li>`;
}

export const imgBtnRecord = (item): string => {
    let link;
    switch (item) {
        case "Classic":
            link = "packClassic.png";
            break;
        case "The Grand Tournament":
            link = "packTgt.png";
            break;
        case "Whispers of the Old Gods":
            link = "packWotog.png";
            break;
        case "Mean Streets of Gadgetzan":
            link = "packMsog.png";
            break;
        default:
            link = "";
    }
    return `<li data-id="${item}" role="button" class="btn btn-default sample-pack" style="background-image: url('${link}')">
        <img src="${link}" alt="${item}" class="hidden-img" />
    </li>`;
}