import { Shopable } from "../../types/types";
import { ShoppingCart } from "../shoppingCart";
import { CardPack } from "../cardPack";

"use strict";

export class StorageService {
    // METHODS
    itemStorage = (items: Shopable[]): {} => {
        return items.reduce((itemMap: any, item: Shopable) => {
            itemMap[item.Key] = ++itemMap[item.Key] || 1;
            return itemMap;
        }, {});
    }

    populateStorage(items: Shopable[]) {
        localStorage.setItem("cart", JSON.stringify(this.itemStorage(items)));
    }

    setCart(cart: ShoppingCart) {
        let itemStorage: {} = JSON.parse(localStorage.getItem("cart"));

        for (let i: number = 0; i < Object.keys(itemStorage).length; i++) {
            let setName: string = Object.keys(itemStorage)[i];
            cart.fillCart(new CardPack(setName), +itemStorage[setName]);
        }
    }

    storageInit(cart: ShoppingCart) {
        if (localStorage.length === 0) {
            if (cart.Items.length !== 0) {
                this.populateStorage(cart.Items);
            }
        }
        else {
            this.setCart(cart);
        }
    }
}