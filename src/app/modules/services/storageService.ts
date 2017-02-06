import { ShoppingCart } from "../shoppingCart";
import { CardPack } from "../cardPack";

"use strict";

export class StorageService {
    // METHODS
    populateStorage(items) {
        let itemStorage: {} = items.reduce(
            function (countMap, word) {
                countMap[word.Key] = ++countMap[word.Key] || 1; return countMap
            }, {});

        for (let item of Object.keys(itemStorage)) {
            localStorage.setItem(item, itemStorage[item]);
        }
    }

    setCart(cart: ShoppingCart) {
        for (let i: number = 0; i < localStorage.length; i++) {
            cart.fillCart(new CardPack(localStorage.key(i)), +localStorage.getItem(localStorage.key(i)));
        }
    }

    storageInit(cart: ShoppingCart) {
        if (localStorage.length === 0) {
            this.populateStorage(cart.Items);
        }
        else {
            this.setCart(cart);
        }
    }
}