import { RenderService } from '../modules/services/renderService';

'use strict'

/** Start Page Template */
export const startPage = (rService: RenderService, data: { startPageData }) => {
    return `<article class="container">

    <header id="startHeader">
        <input class="input-amount" type="number" name ="amount" value="1" min="1" max="100" />
        <button class="add-to-cart-btn btn btn-primary" type="button">Add to Cart</Button>
        <img src="https://openclipart.org/image/2400px/svg_to_png/60139/cart.png" alt="Shopping Cart" width="30px" />
        <button class="goto-cart-btn btn btn-success" type="button">Goto Cart</Button>
        <h1>Welcome to the Hearthstone Card Shop</h1>
    </header>

    <section class="set-filter display-in-line">
        <h2>Select the Card Set: <span class="card-set-name">${data["setPreviewData"][Object.keys(data["setPreviewData"])[0]]}</span></h2>
        <div class="btn-group-justified" role="group" aria-label="CardSets">
            ${rService.insertList(data.startPageData[Object.keys(data.startPageData)[0]])}
        </div>
        <button id="preview-card-set-btn" class="btn btn-info" type="button">Preview Card Set</button>
    </section>

    <section id="startMain" class="well start-slider">
    </section>

    <footer id="start-foot">
    </footer>

</article>`
}