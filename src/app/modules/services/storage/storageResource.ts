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
        let cartObjectString = localStorage.getItem("cart");
        if (this.validateObject(cartObjectString, config.data.cardSets)) {
            let itemStorage: {} = JSON.parse(cartObjectString);

            for (let i: number = 0; i < Object.keys(itemStorage).length; i++) {
                let setName: string = Object.keys(itemStorage)[i];
                cart.fillCart(new CardPack(setName), +itemStorage[setName]);
            }
        }
        else {
            cart.Items = [];
        }
    }

    setCart(cart: ShoppingCart) {
        cart.Items = this.storageCartItemsToArray();
    }

    /** Populates the storage with the passed object-string and adds it to the url on demand */
    setCartFromString(cartObjectString: string) {
        createHash("cart/");

        if (this.validateObject(cartObjectString, config.data.cardSets)) {
            if (confirm("Do you really want to set your shopping cart via URL (= address)?")) {
                cartObjectString = this.validateCartObject(cartObjectString);
                localStorage.setItem("cart", cartObjectString);
                createHash(`cart/${cartObjectString}`);
            }
        }
    }

    /** Checks if an object-string can be parsed and includes at least one correct key or value. */
    validateObject(objectString: string, correctProps?: any[]): boolean {
        let isValidObject = false;
        try {
            if (objectString !== (""|| null)) {
                JSON.parse(objectString);
                isValidObject = true;
            }
        }
        catch (e) {
            isValidObject = false;
        }

        if (isValidObject && correctProps !== (null && undefined)) {
            isValidObject = checkArrayItemInString(objectString, correctProps);
        }
        return isValidObject;
    }

    /** Checks if an object-string has any properties which don't correspond to shopable products, deletes wrong properties and finally returns the corrected object-string. */
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