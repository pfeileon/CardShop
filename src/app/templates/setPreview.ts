import { Renderer } from '../modules/renderer'

'use strict'

/** Set Preview Template */
export const setPreview = (renderer: Renderer, data: { setPreviewData }) => {
    return `<article>

    <header id="preview-head">
        <h1>Preview Card Set: <span id="card-set-name">${data.setPreviewData[Object.keys(data.setPreviewData)[0]]}</span></h1>
        <button id="goto-cart">Goto Cart </button>
    </header>

    <section id="preview-filters">
        <h2>Select Hero:</h2>        
        ${renderer.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[1]])}
        <h2>Mana Cost:</h2>
        ${renderer.insertList(data.setPreviewData[Object.keys(data.setPreviewData)[2]])}
    </section>

    <section id="preview-main">
    </section>

    <footer id="preview-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button id="add-to-cart">Add to Cart</button>
    </footer>

</article>`
}