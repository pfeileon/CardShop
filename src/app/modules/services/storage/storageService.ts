import { Shopable } from "../../types/types";
import { ShoppingCart } from "../../shop/shoppingCart";
import { CardPack } from "../../shop/cardPack";

"use strict";

export class StorageService {
    // METHODS
    cartItemsToObject = (items: Shopable[]): {} => {
        return items.reduce((itemMap: any, item: Shopable) => {
            itemMap[item.Key] = ++itemMap[item.Key] || 1;
            return itemMap;
        }, {});
    }

    storageCartItemsToArray = (): Shopable[] => {
        let items: Shopable[] = [];
        if (localStorage.getItem("cart") !== null || undefined) {
            let temp: {} = JSON.parse(localStorage.getItem("cart"));
            let help: string[][] = [Object.keys(temp), (<any>Object).values(temp)];
            for (let i = 0; i < help[0].length; i++) {
                for (let j = 0; j < +help[1][i]; j++) {
                    items.push(new CardPack(help[0][i]));
                }
            }
        }
        return items;
    }

    populateStorage(items: Shopable[]) {
        localStorage.setItem("cart", JSON.stringify(this.cartItemsToObject(items)));
    }

    populateCart(cart: ShoppingCart) {
        let itemStorage: {} = JSON.parse(localStorage.getItem("cart"));

        for (let i: number = 0; i < Object.keys(itemStorage).length; i++) {
            let setName: string = Object.keys(itemStorage)[i];
            cart.fillCart(new CardPack(setName), +itemStorage[setName]);
        }
    }

    setCart(cart: ShoppingCart) {
        cart.Items = this.storageCartItemsToArray();
    }

    storageInit(cart: ShoppingCart) {
        if (localStorage.getItem("cart") === null || undefined) {
            if (cart.Items.length !== 0) {
                this.populateStorage(cart.Items);
            }
        }
        else {
            this.populateCart(cart);
        }
    }
}