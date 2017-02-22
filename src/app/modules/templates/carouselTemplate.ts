"use strict";

export const carousel = (id: string) => {
    return `<div id="${id}" class="carousel slide" data-ride="carousel" data-interval="false">  
        <!-- Indicators -->
        <ol id="carouselInd" class="carousel-indicators"></ol>
        <!-- Wrapper for slides -->
        ${wrapper}
        <!-- Controls -->
        ${controls}
    </div>`;
}

const wrapper = `<div id="carouselCardWrapper" class="carousel-inner" role="listbox"></div>`;

const controls = `<a class="left carousel-control" data-target="#previewCarousel" role="button" data-slide="prev">
        <span class="icon-prev" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" data-target="#previewCarousel" role="button" data-slide="next">
        <span class="icon-next" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
`;