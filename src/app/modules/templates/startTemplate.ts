import { RenderService } from '../services/render/renderService';
import { cartButtonTemplate, btnRecord } from "./snippets";

'use strict'

/** Start Page Template */
export const startPage = (rService: RenderService, data: { startPageData }) => {
    return `<article class="container">

    <header id="startHeader">
        ${cartButtonTemplate}
        <h1>Welcome to the Hearthstone Card Shop</h1>
    </header>

    <section class="set-filter display-in-line">
        <h2>Select the Card Set:
            <span class="card-set-name">${data["setPreviewData"][Object.keys(data["setPreviewData"])[0]]}</span>
        </h2>

        <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data.startPageData[Object.keys(data.startPageData)[0]], btnRecord)}
        </div>
        
        <button id="preview-card-set-btn" class="btn btn-info" type="button">Preview Card Set</button>
    </section>

    <section id="startMain" class="well start-slider">
    </section>

    <footer id="start-foot">
    </footer>

</article>`
}