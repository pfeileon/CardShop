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
    let myCarousel = $(".carousel");
    myCarousel.append("<ol class='carousel-indicators'></ol>");
    
    let indicators = $(".carousel-indicators");

    let myCar = myCarousel.find(".carousel-inner");
    let len = myCar.children(".item").length / 3;

    for (let i = 0; i < len; i++) {
          indicators.append("<li data-target='#previewCarousel' data-slide-to='" + i + "'></li>");
    }
    
    myCar.children[0].classList.add('active');
    
    $('.carousel').carousel();
}