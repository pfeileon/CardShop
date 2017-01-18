import {Renderer} from '../modules/Renderer'

'use strict'

/** Start Page Template */
export const startPage = (data: string[]) => {
    return `<article>

    <header id="start-head">
        <h1>Welcome to the Hearthstone Card Shop</h1>
        <button id="goto-cart">Goto Cart</Button>
    </header>

    <section id="start-filters">
        <h2>Select the Card Set:</h2>
        ${Renderer.insertList(data[Object.keys(data)[0]])}
        <button id="preview-card-set">Preview Card Set</button>
    </section>

    <section id="start-main">
    </section>

    <footer id="start-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button id="add-to-cart">Add to Cart</Button>
    </footer>

</article>`
}