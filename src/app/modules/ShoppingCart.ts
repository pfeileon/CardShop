'use strict';

/** Singleton class */
export class ShoppingCart {

    //Properties
    /** All items in the cart */
    public items: {}[];
    /** Singleton */
    private static cart: ShoppingCart = new ShoppingCart();

    //Methods
    /** Adds an item to the cart */
    public AddToCart(item: {}) {
        ShoppingCart.GetCart().items.push(item);
    }

    /** Removes an item from the cart */
    public RemoveFromCart(i: number) {
        ShoppingCart.GetCart().items.splice(i, 1);
    }

    /** Prevent further instances */
    private constructor() {
        if (ShoppingCart.cart) {
            throw new Error('Singleton');
        }

        ShoppingCart.cart = this;
    }

    /** Returns the ShoppingCart.cart Singleton */
    public static GetCart(): ShoppingCart {
        return ShoppingCart.cart;
    }
}