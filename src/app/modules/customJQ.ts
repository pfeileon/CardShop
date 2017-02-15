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
    let helper: boolean = false;
    let myCarousel = $(".carousel");
    myCarousel.append("<ol class='carousel-indicators'></ol>");
    let indicators = $(".carousel-indicators");

    let myCar = myCarousel.find(".carousel-inner");
    let len = myCar.children(".item").length / 3;

    console.log('len', len);

    for (let i = 0; i < len; i++) {
          indicators.append("<li data-target='#previewCarousel' data-slide-to='" + i + "'></li>");
    }
    console.log(myCar);
    myCar.children[0].classList.add('active');

    // myCar.children(".item").each(function (index) {
    //     let i = Math.floor(index/3);
    //     console.log(index, i);
    //     (i === 0) ?
    //         indicators.append("<li data-target='#previewCarousel' data-slide-to='" + i + "' class='active'></li>") :
    //         indicators.append("<li data-target='#previewCarousel' data-slide-to='" + i + "'></li>");
    // });
    $('.carousel').carousel();
}