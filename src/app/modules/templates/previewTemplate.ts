import { RenderService } from '../services/render/renderService';
import { cartButtonTemplate, btnRecord } from "./snippets";
import { carousel } from "./carouselTemplate";

'use strict';

/** Set Preview Template */
export const setPreview = (rService: RenderService, data: { setPreviewData }) => {
    return `<article class="container">
    <header id="previewHeader">
        <button id="set-return-btn" type="button" class="btn btn-default return-btn">Return</button>
        ${cartButtonTemplate}
    </header>

    <section id="previewSetSelection" class="set-filter display-in-line">
        <h1>Preview Card Set: <span class="card-set-name">${data.setPreviewData[Object.keys(data.setPreviewData)[0]]}</span></h1>
         <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data["startPageData"][Object.keys(data["startPageData"])[0]], btnRecord)}
        </div>
    </section>

    <section id="preview-filters" class="filters">
        <section id="hero-filter" class="display-in-line">
            <h2>Select Hero:</h2>
            <div class="btn-group-justified" role="group" aria-label="Heroes">
                ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[1]], btnRecord)}
            </div>
        </section>
        <section id ="mana-filter" class="display-in-line">
            <h2>Mana Cost:</h2>
            <div class="btn-group-justified" role="group" aria-label="Mana">
                ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[2]], btnRecord)}
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