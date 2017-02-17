import { luhnAlgorithm } from "./utilities";

"use strict";

declare var $;

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

export function activatePopover() {
    $(function () {
        $('[data-toggle="popover"]').popover();
    });
}