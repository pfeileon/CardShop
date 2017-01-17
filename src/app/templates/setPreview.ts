'use strict'

let CardSetName: string = 'CardSetName';
let heroes: string[] = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];

/** Set Preview Template */
export const setPreview: string = `<article>

    <header id="preview-head">
        <h1>Preview Card Set: ${CardSetName}</h1>
        <button id="goto-cart" />
    </header>

    <section id="preview-filters">
        <h2>Select Hero:</h2>
        <ul>
            ${heroes.forEach((item, index) => {
               console.log(item);
            })}
        </ul>
        <h2>Mana Cost:</h2>
        <ul>
            <li>0</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
        </ul>
    </section>

    <section id="preview-main">
    </section>

    <footer id="preview-foot">
        <img src="../assets/images/shoppingCart.png" alt="Shopping Cart" />
        <button id="add-to-cart" />
    </footer>

</article>`