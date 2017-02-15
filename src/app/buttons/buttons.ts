import { Button } from "./button";
import { ShopButtonHandler } from "./shopButtonHandler";
import { config } from "../config/config";
import { Callback } from "../types/types";
import * as Utils from "../modules/utilities";
import { CardShop } from "../modules/cardShop";
import { CardPack } from "../modules/cardPack";
import { Customer } from "../modules/customer";
import { CreditCard } from "../modules/creditCard";

"use strict";

abstract class ShopButton extends Button {
    // PROPERTIES
    protected shop: CardShop;
    // CONSTRUCTOR
    constructor(id: string, bHandler: ShopButtonHandler, shop: CardShop) {
        super(id, bHandler);
        this.shop = shop;
    }
}

export class BuyButton extends Button {
    click = (): void => {
        document.getElementById("buyBtn").addEventListener("click", (e) => {
            alert("We did it!");
        });
    }
}

export class CancelButton extends Button {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                console.log(item.id);
                if (item.id === "cancelPD") {
                    Utils.createHash("");
                    Utils.createHash("cart/" + localStorage.getItem("cart"));
                }
                if (item.id === "cancelCCD") {
                    document.getElementById("personalDataHeading").click();
                }
            });
        }
    }
}

export class ConfirmButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                let customer: Customer;
                if (item.id === "confirmPD") {
                    customer = new Customer(this.shop.Cart.Items);
                    this.shop.setCustomer(customer);

                    document.getElementById("personalDataHeading").setAttribute("data-target", "#collapsePD")
                    document.getElementById("creditCardDataHeading").setAttribute("data-target", "#collapseCCD")
                    document.getElementById("creditCardDataHeading").click();
                }
                if (item.id === "confirmCCD") {
                    let creditCard: CreditCard = new CreditCard();
                    this.shop.Customer.setCreditCard(creditCard);

                    localStorage.setItem("customer", JSON.stringify(this.shop.Customer));
                }
                console.log(this.shop.Customer);
            });
        }
    }
}

export class CheckoutButton extends ShopButton {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            if (localStorage.getItem("cart") === null) {
                alert("Your cart is empty!");
            }
            else {
                Utils.createHash("checkout/");
            }
        });
    }
}

export class ClearButton extends ShopButton {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            localStorage.removeItem("cart");
            this.shop.Cart.Items = [];
            Utils.createHash("cart/");
        });
    }
}

export class DeleteButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                let items = JSON.parse(localStorage.getItem("cart"));
                if (Object.keys(items).length === 1) {
                    localStorage.removeItem("cart");
                    this.shop.Cart.Items = [];
                }
                else {
                    delete items[`${(item.id.split("-del")[0]).replace(/-/gi, " ")}`];
                    localStorage.setItem("cart", JSON.stringify(items));
                }
                Utils.createHash("cart/" + localStorage.getItem("cart"));
            });
        }
    }
}

export class ReturnButton extends Button {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                if (Utils.getHashValue().search("cart/") !== -1) {
                    Utils.createHash(localStorage.getItem("lastHash"));
                }
                else {
                    let temp = Utils.getFilters()["cardSet"];
                    Utils.createHash(temp);
                }
            });
        }
    }
}

export class PreviewButton extends Button {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            const hashValue: string = Utils.getHashValue();
            let cardSetName: string;

            if (hashValue == undefined || "") {
                cardSetName = "Classic";
                Utils.createHash("Classic");
            }
            else if (hashValue.indexOf("cart/") !== -1) {
                cardSetName = document.getElementById(this.id).innerText;
            }
            else if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
                cardSetName = hashValue;
            }
            else {
                alert(`"${hashValue}": Invalid Card Set.
                            Showing "Classic" instead.`)
                cardSetName = "Classic";
            }

            config.data.setPreviewData.cardSetName = cardSetName;
            Utils.createHash(`filters/{"cardSet":"${cardSetName}","hero":"Druid"}`);
        });
    }
}

export class AddToCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            item.addEventListener("click", (e) => {
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

                Utils.fakeHashchange();

                this.shop.Cart.fillCart(pack, amountOfPacks);
            });
        }
    }
}

export class GotoCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                localStorage.setItem("lastHash", Utils.getHashValue());
                Utils.createHash("cart/" + localStorage.getItem("cart"));
            });
        }
    }
}

/** Sets the hash-value according to the selected CardSet */
export class SetCardSetButton extends Button {
    click = (cardSet: HTMLElement): void => {
        cardSet.addEventListener("click", (e: MouseEvent): void => {
            const cardSetName: string = e.srcElement.attributes[0].value;
            config.data.setPreviewData.cardSetName = cardSetName;

            this.resetBtnClassList(cardSet, e);

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
        });
    }
}

/** Sets the hash according to the selected hero */
export class SetHeroButton extends Button {
    click = (hero: HTMLElement) => {
        hero.addEventListener("click", (e: MouseEvent): void => {
            const heroValue: string = e.srcElement.attributes[0].value;

            this.resetBtnClassList(hero, e);

            let filter = Utils.getFilters();
            if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
                delete (filter["hero"]);
            }
            else {
                filter["hero"] = heroValue;
            }
            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        });
    }
}

/** Sets the hash according to the selected mana-cost */
export class SetManaCostButton extends Button {
    click = (manaCost: HTMLElement): void => {
        manaCost.addEventListener("click", (e: MouseEvent): void => {
            if (e.srcElement.attributes[0] === undefined) {
                return;
            }
            const manaCostValue: string = e.srcElement.attributes[0].value;

            this.resetBtnClassList(manaCost, e);

            let filter = Utils.getFilters();
            if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
                delete (filter["manaCost"]);
            }
            else {
                filter["manaCost"] = manaCostValue;
            }

            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        });
    }
}

