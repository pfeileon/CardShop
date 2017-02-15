import { luhnAlgorithm } from "../modules/utilities";

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

export function genCarouselInd() {
    let carInd = document.getElementById("carouselInd");
    
    let carWrap = document.getElementById("carouselCardWrapper");
    let len = carWrap.children.length;

    for (let i = 0; i < len; i++) {
        carInd.insertAdjacentHTML("beforeend", `<li id="indicator${i}" data-target='#previewCarousel' data-slide-to="${i}" class=""></li>`);
    }
    document.getElementById("indicator0").classList.add("active");
}