import { RenderService } from '../../render/renderService';
import { cartButtonTemplate, btnRecord } from "./snippets";

'use strict'

/** Start Page Template */
export const startTemplate = (rService: RenderService, data: {}) => {
    return `<article class="container">

    <header id="startHeader">
        ${cartButtonTemplate}
        <h1>Welcome to the Hearthstone Card Shop</h1>
    </header>

    <section class="cardSet-filter">
        <h2>Select the Card Set:
            <span class="card-set-name">
                ${data["cardSetName"]}
            </span>
        </h2>

        <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data["cardSets"], btnRecord)}
        </div>
        
        <button id="preview-card-set-btn" data-toggle="tooltip" data-placement="top" title="Lets you browse all available cards" class="btn btn-info" type="button">Preview Card Set</button>
    </section>

    <section id="startMain" class="well start-slider">
    </section>

    <footer id="start-foot">
    </footer>

</article>`
}