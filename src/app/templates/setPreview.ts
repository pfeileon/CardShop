import { RenderService } from '../modules/services/renderService';

'use strict'

/** Set Preview Template */
export const setPreview = (rService: RenderService, data: { setPreviewData }) => {
    return `<article>

    <header id="preview-head">
        <h1>Preview Card Set: <span id="card-set-name">${data.setPreviewData[Object.keys(data.setPreviewData)[0]]}</span></h1>
        <button id="return-btn">Return</button>
        <button id="goto-cart">Goto Cart </button>
    </header>

    <section id="preview-filters">
        <section id="hero-filter">
            <h2>Select Hero:</h2>        
            ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[1]])}
        </section>
        <section id ="mana-filter">
            <h2>Mana Cost:</h2>
            ${rService.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[2]])}
        </section>
    </section>

    <section id="preview-main">
    </section>

    <footer id="preview-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button class="add-to-cart-btn">Add to Cart</button>
    </footer>

</article>`
}