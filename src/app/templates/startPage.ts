import { RenderService } from '../modules/services/renderService';

'use strict'

/** Start Page Template */
export const startPage = (rService: RenderService, data: { startPageData }) => {
    return `<article>

    <header id="start-head">
        <h1>Welcome to the Hearthstone Card Shop</h1>
        <button id="goto-cart">Goto Cart</Button>
    </header>

    <section class="set-filter">
        <h2>Select the Card Set: <span class="card-set-name">${data["setPreviewData"][Object.keys(data["setPreviewData"])[0]]}</span></h2>
        ${rService.insertList(data.startPageData[Object.keys(data.startPageData)[0]])}
        <button id="preview-card-set-btn">Preview Card Set</button>
    </section>

    <section id="start-main">
    </section>

    <footer id="start-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button class="add-to-cart-btn">Add to Cart</Button>
    </footer>

</article>`
}