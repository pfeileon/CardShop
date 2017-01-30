import { RenderService } from '../modules/services/renderService';

'use strict'

/** Set Preview Template */
export const setPreview = (rService: RenderService, data: { setPreviewData }) => {
    return `<article>

    <header id="preview-head" class="set-filter display-in-line">
        <h1>Preview Card Set: <span class="card-set-name">${data.setPreviewData[Object.keys(data.setPreviewData)[0]]}</span></h1>
        ${rService.insertList(data["startPageData"][Object.keys(data["startPageData"])[0]])}
        <button id="return-btn">Return</button>
        <input class="input-amount" type="number" name ="amount" value="1" min="1" max="100" />
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button class="add-to-cart-btn">Add to Cart</button>
        <button class="goto-cart-btn">Goto Cart </button>
    </header>

    <section id="preview-filters">
        <section id="hero-filter" class="display-in-line">
            <h2>Select Hero:</h2>        
            ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[1]])}
        </section>
        <section id ="mana-filter" class="display-in-line">
            <h2>Mana Cost:</h2>
            ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[2]])}
        </section>
    </section>

    <section id="preview-main" class="container-fluid">
        <div class="col-1">
            <button id="previous-cards-shown" class="">back</button>
        </div>
        <div id="card-images" class="col-xs-10 slider">
        </div>
        <div class="col-1">
            <button id="next-cards-shown" class="">next</button>
        </div>
    </section>

    <footer id="preview-foot">
    </footer>

</article>`
}