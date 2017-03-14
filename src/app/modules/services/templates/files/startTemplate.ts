import { RenderService } from '../../render/renderService';
import { cartButtonTemplate, btnRecord, imgBtnRecord } from "./snippets";
import '../../../../../assets/images/cardPacks/packClassic.png';
import '../../../../../assets/images/cardPacks/packTgt.png';
import '../../../../../assets/images/cardPacks/packWotog.png';
import '../../../../../assets/images/cardPacks/packMsog.png';

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

        <div class="btn-group-justified filter-btn-group" role="group" aria-label="CardSets"  data-toggle="tooltip" title="Choose the type of card-pack you want to purchase">
            ${rService.insertList(data["cardSets"], btnRecord)}
            ${rService.insertList(data["cardSets"], imgBtnRecord)}
        </div>
        
        <button id="preview-card-set-btn" class="btn btn-info" type="button" data-toggle="tooltip" title="Lets you browse all available cards">Preview Card Set</button>
    </section>
    <h2>Packs in your Cart</h2>
    <section id="startMain" class="well start-slider">
    </section>

    <footer id="start-foot">
    </footer>

</article>`
}