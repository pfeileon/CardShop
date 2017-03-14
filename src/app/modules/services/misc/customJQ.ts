import { luhnAlgorithm } from "./utilities";
declare const $;

// If absolutely necessary, here is the place to use jQuery

"use strict";

export function validate() {
    $('#personalData').validator();
    $('#creditCardData').validator({
        delay: 100,
        custom: {
            luhn: function ($el) {
                if (!luhnAlgorithm($el.val())) {
                    return "Invalid credit card number!"
                };
            }
        },
        errors: {
            luhn: "Invalid credit card number!"
        }
    });
}

export function tooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            placement: "right", title: "Tooltip"
        })
    })
}

export function addToCartTooltip(element) {
    $(element).tooltip({
        placement: "bottom", title: "Added to cart!", trigger: "click"
    })
}

export function hideTooltip(element) {
    $(element).tooltip('hide');
}

export function showTooltip(element) {
    $(element).tooltip('show');
}