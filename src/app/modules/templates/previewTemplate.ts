import { RenderService } from '../services/render/renderService';
import { cartButtonTemplate, btnRecord } from "./snippets";
import { carousel } from "./carouselTemplate";

'use strict';

/** Set Preview Template */
export const previewTemplate = (rService: RenderService, data: {}) => {
    return `<article class="container">
    <header id="previewHeader">
        <button id="set-return-btn" type="button" class="btn btn-default return-btn">Return</button>
        ${cartButtonTemplate}
    </header>

    <section id="previewSetSelection" class="cardSet-filter">
        <h1><span class="addHeading">Card Set: </span><span class="card-set-name">${data["cardSetName"]}</span></h1>
         <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data["cardSets"], btnRecord)}
        </div>
    </section>

    <section id="preview-filters" class="filters">
        <section id="hero-filter" class="hero-filter">
            <h2>Select Hero: <span class="hero-filter-heading"></span></h2>
            <div class="btn-group-justified" role="group" aria-label="Heroes">
                ${rService.insertList(data["heroes"], btnRecord)}
            </div>
        </section>
        <section id="mana-filter" class="mana-filter">
            <h2>Mana Cost: <span class="mana-filter-heading"></span></h2>
            <div class="btn-group-justified" role="group" aria-label="Mana">
                ${rService.insertList(data["mana"], btnRecord)}
            </div>
        </section>
    </section>

    <section id="preview-main" class="container-fluid preview">
        ${carousel("previewCarousel")}
    </section>

    <footer id="previewFooter">
    </footer>

</article>`
}