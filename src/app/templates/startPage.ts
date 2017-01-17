'use strict'

/** Start Page Template */
export const startPage: string = `<article>

    <header id="start-head">
        <h1>Welcome to the Hearthstone Card Shop</h1>
        <button id="goto-cart" />
    </header>

    <section id="start-filters">
        <h2>Select the Card Set:</h2>
        <ul>
            <li>Classic</li>
            <li>The Grand Tournament</li>
            <li>Whispers of the Old Gods</li>
            <li>Mean Streets of Gadgetzan</li>
        </ul>
    </section>

    <section id="start-main">
    </section>

    <footer id="start-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button id="add-to-cart" />
    </footer>

</article>`