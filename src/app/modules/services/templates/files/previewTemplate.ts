import { RenderService } from '../../render/renderService';
import { cartButtonTemplate, btnRecord } from "./snippets";
import { carousel } from "./carouselTemplate";

'use strict';

/** Set Preview Template */
export const previewTemplate = (rService: RenderService, data: {}) => {
    return `<article class="container">
    <header id="previewHeader">
        <button id="set-return-btn" type="button" class="btn btn-default return-btn">Back to Start</button>
        ${cartButtonTemplate}
        <h1>
            Preview the Cards<br />
            <small>These cards can appear in your packs!</small>
        </h1>
    </header>

    <section id="previewSetSelection" class="cardSet-filter">
        <h2><span class="addHeading">Card Set: </span><span class="card-set-name">${data["cardSetName"]}</span></h2>
         <div class="btn-group-justified filter-btn-group" role="group" aria-label="CardSets" data-toggle="tooltip" title="Filter the displayed cards by card-set">
            ${rService.insertList(data["cardSets"], btnRecord)}
        </div>
    </section>

    <section id="preview-filters" class="filters">
        <section id="hero-filter" class="hero-filter">
            <h2>Select Hero: <span class="hero-filter-heading"></span></h2>
            <div class="btn-group-justified filter-btn-group" role="group" aria-label="Heroes" data-toggle="tooltip" title="Filter the displayed cards by hero-class">
                ${rService.insertList(data["heroes"], btnRecord)}
            </div>
        </section>
        <section id="mana-filter" class="mana-filter">
            <h2>Mana Cost: <span class="mana-filter-heading"></span></h2>
            <div class="btn-group-justified filter-btn-group" role="group" aria-label="Mana" data-toggle="tooltip" title="Filter the displayed cards by mana-cost">
                ${rService.insertList(data["mana"], btnRecord)}
            </div>
        </section>
    </section>

    <section id="preview-main" class="container-fluid preview" data-toggle="tooltip" title="Click on a card to inspect it further">
        ${carousel("previewCarousel")}
    </section>

    <footer id="previewFooter">
    </footer>

</article>`
}