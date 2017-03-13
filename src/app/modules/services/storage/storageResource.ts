import { StorageService } from "./storageService";
import { config } from '../../config/config';
import { checkArrayItemInString, createHash, getHashValue } from '../misc/utilities';
import { Shopable } from "../../types/types";
import { ShoppingCart } from "../../shop/shoppingCart";
import { CardPack } from "../../shop/cardPack";

"use strict";

export class StorageResource extends StorageService {
    // METHODS

    // - FORCED
    loadStorage(cart: ShoppingCart) {
        this.populateCart(cart);
    }

    populateStorage(cart: ShoppingCart): void {
        if (cart.Items.length !== 0) {
            localStorage.setItem("cart", JSON.stringify(this.cartItemsToObject(cart.Items)));
        }
    }

    // - OWN
    cartItemsToObject = (items: Shopable[]): {} => {
        return items.reduce(
            (itemMap: {}, item: Shopable) => {
                itemMap[item.Key] = ++itemMap[item.Key] || 1;
                return itemMap;
            }, {});
    }

    storageCartItemsToArray = (): Shopable[] => {
        let items: Shopable[] = [];
        if (localStorage.getItem("cart") !== null || undefined) {
            let cartObject: {} = JSON.parse(localStorage.getItem("cart"));

            let cartArray: string[][] = [Object.keys(cartObject), (<any>Object).values(cartObject)];
            for (let i = 0; i < cartArray[0].length; i++) {
                for (let j = 0; j < +cartArray[1][i]; j++) {
                    items.push(new CardPack(cartArray[0][i]));
                }
            }
        }
        return items;
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

    setCartFromUrl() {
        let cartObjectString = getHashValue().split("/")[1];
        let isValidObject: boolean;

        try {
            JSON.parse(cartObjectString);
            isValidObject = true;
        }
        catch (e) {
            isValidObject = false;
        }

        if (isValidObject) {
            isValidObject = checkArrayItemInString(cartObjectString, config.data.cardSets);
        }

        // TODO: den createHash-Teil sollte man eigentlich ins renderResource packen.

        if (isValidObject) {
            if (confirm("Do you really want to set your shopping cart via URL (= address)?")) {
                cartObjectString = this.validateCartObject(cartObjectString);
                localStorage.setItem("cart", cartObjectString);
                createHash(`cart/${cartObjectString}`);
            }
            else {
                createHash("cart/");
            }
        }
        else {
            createHash("cart/");
        }
    }

    validateCartObject(cartObjectString: string) {
        const cartObject = JSON.parse(cartObjectString);

        for (let item in cartObject) {
            if (!(<any>config.data.cardSets).includes(item)) {
                delete cartObject[item];
            }
        }
        return JSON.stringify(cartObject);
    }
}