import { Button } from "./button";
import { ShopButtonHandler } from "./shopButtonHandler";
import { config } from "../config/config";
import { Callback } from "../types/types";
import * as Utils from "../modules/utilities";
import { ShoppingCart } from "../modules/shoppingCart";
import { CardPack } from "../modules/cardPack";

abstract class ShopButton extends Button {
    // PROPERTIES
    protected cart: ShoppingCart;
    // CONSTRUCTOR
    constructor(id: string, bHandler: ShopButtonHandler, cart: ShoppingCart) {
        super(id, bHandler);
        this.cart = cart;
    }
}

"use strict";

export class ReturnButton extends Button {
    click = (): void => {
        document.getElementById(this.id).onclick = () => {
            Utils.createHash(Utils.getFilters()["cardSet"])
        };
    }
}

export class PreviewButton extends Button {
    click = (): void => {
        document.getElementById(this.id).onclick = () => {
            const hashValue: string = Utils.getHashValue();
            let cardSetName: string;

            if (hashValue === undefined || "") {
                config.data.setPreviewData.cardSetName = "Classic";
                Utils.createHash("Classic");
            }

            if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
                cardSetName = hashValue;
            }
            else {
                alert(`
                "${hashValue}": Invalid Card Set.
                Showing "Classic" instead.
            `)
                cardSetName = "Classic";
            }

            config.data.setPreviewData.cardSetName = cardSetName;
            Utils.createHash(`filters/{"cardSet":"${cardSetName}","hero":"Druid"}`);
        }
    }
}

export class AddToCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            item.onclick = () => {
                let setName: string;
                const hashValue: string = Utils.getHashValue();
                const filters: {} = Utils.getFilters();

                // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
                if (hashValue !== undefined || "" || null) {

                    if (hashValue.search("/") !== -1 && filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
                        setName = filters["cardSet"];

                    }
                    else if (hashValue.search("/") === -1 && config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
                        setName = hashValue;
                    }
                    else {
                        alert("Please choose a Card Set first!");
                        return;
                    }
                }
                else {
                    alert("Please choose a Card Set first!");
                    return;
                }

                const pack: CardPack = new CardPack(setName || "Classic");

                let amountOfPacks: number;
                if (hashValue.search("/") === -1) {
                    amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[0]).value;
                }
                else {
                    amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[1]).value;
                }

                return this.bHandler.RService.showItems(this.cart.fillCart(pack, amountOfPacks));
            }
        }
    }
}

export class GotoCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.onclick = () => {
                let itemStorage: {} = this.cart.Items.reduce(
                    function (countMap, word) {
                        countMap[word.Key] = ++countMap[word.Key] || 1; return countMap
                    }, {});

                console.log(itemStorage);

                for (let item of Object.keys(itemStorage)) {
                    localStorage.setItem(item, itemStorage[item]);
                }
                console.log(localStorage);
            }
        }
    }
}

/** Sets the hash-value according to the selected CardSet */
export class SetCardSetButton extends Button {
    click = (cardSet: HTMLElement): void => {
        cardSet.onclick = (e: MouseEvent): void => {
            const cardSetName: string = e.srcElement.attributes[0].value;
            config.data.setPreviewData.cardSetName = cardSetName;

            // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
            if (Utils.getHashValue() !== undefined && Utils.getHashValue().search("/") !== -1) {
                let filter = Utils.getFilters();
                if (filter["cardSet"] !== undefined && filter["cardSet"] === cardSetName && filter["hero"] !== undefined) {
                    delete (filter["cardSet"]);
                }
                else {
                    filter["cardSet"] = cardSetName;
                }
                Utils.createHash(`filters/${JSON.stringify(filter)}`);
            }
            else {
                Utils.createHash(cardSetName);
            }
        }
    }
}

/** Sets the hash according to the selected hero */
export class SetHeroButton extends Button {
    click = (hero: HTMLElement) => {
        hero.onclick = (e: MouseEvent): void => {
            const heroValue: string = e.srcElement.attributes[0].value;

            let filter = Utils.getFilters();
            if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
                delete (filter["hero"]);
            }
            else {
                filter["hero"] = heroValue;
            }
            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        }
    }
}

/** Sets the hash according to the selected mana-cost */
export class SetManaCostButton extends Button {
    click = (manaCost: HTMLElement): void => {
        manaCost.onclick = (e: MouseEvent): void => {
            const manaCostValue: string = e.srcElement.attributes[0].value;

            let filter = Utils.getFilters();
            if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
                delete (filter["manaCost"]);
            }
            else {
                filter["manaCost"] = manaCostValue;
            }

            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        }
    }
}