import { RenderService } from '../modules/services/renderService';
import { genCarouselInd } from "../modules/customJQ";

'use strict';

const wrapper = `<div id="carouselCardWrapper" class="carousel-inner" role="listbox"></div>`;
const controls = `<a class="left carousel-control" href="#previewCarousel" role="button" data-slide="prev">
        <span class="icon-prev" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#previewCarousel" role="button" data-slide="next">
        <span class="icon-next" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>`;

const carousel = `<div id="previewCarousel" class="carousel slide" data-ride="carousel" data-interval="false">  
  <!-- Wrapper for slides -->
    ${wrapper}
  <!-- Controls -->
  ${controls}
  <!-- Indicators -->
</div>`;

/** Set Preview Template */
export const setPreview = (rService: RenderService, data: { setPreviewData }) => {
    return `<article class="container">

    <header id="preview-head" class="set-filter display-in-line">
        <h1>Preview Card Set: <span class="card-set-name">${data.setPreviewData[Object.keys(data.setPreviewData)[0]]}</span></h1>
         <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data["startPageData"][Object.keys(data["startPageData"])[0]])}
        </div>
        <button id="set-return-btn" type="button" class="btn btn-default return-btn">Return</button>
        <input class="input-amount" type="number" name ="amount" value="1" min="1" max="100" />
        <button class="add-to-cart-btn btn btn-primary" type="button">Add to Cart</button>
        <img src="https://openclipart.org/image/2400px/svg_to_png/60139/cart.png" alt="Shopping Cart" width="30px" />
        <button class="goto-cart-btn btn btn-success" data-toggle="modal" data-target=".cart-modal" type="button">Goto Cart</button>
    </header>

    <section id="preview-filters">
        <section id="hero-filter" class="display-in-line">
            <h2>Select Hero:</h2>
            <div class="btn-group-justified" role="group" aria-label="Heroes">
                ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[1]])}
            </div>
        </section>
        <section id ="mana-filter" class="display-in-line">
            <h2>Mana Cost:</h2>
            <div class="btn-group-justified" role="group" aria-label="Mana">
                ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[2]])}
            </div>
        </section>
    </section>

    <section id="preview-main" class="container-fluid">
        <div class="col-1">
            <button id="previous-cards-shown" class="btn btn-default" type="button" disabled>back</button>
        </div>
        <div id="cardImages" class="col-xs-10 slider">
        </div>
        <div class="col-1">
            <button id="next-cards-shown" class="btn btn-default" type="button" disabled>next</button>
        </div>
    </section>

    <footer id="preview-foot">
        ${carousel}
    </footer>

</article>`
}