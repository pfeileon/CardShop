import { Button } from "./button";
import { ShopButton } from "./shopButton";
import { config } from "../config/config";
import * as Utils from "../misc/utilities";
import { CardPack } from "../shop/cardPack";
import { Customer } from "../shop/customer";
import { CreditCard } from "../shop/creditCard";
import { checkoutModal } from "../templates/modalTemplate";

"use strict";

export class BuyButton extends Button {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            alert("We did it!");
        });
    }
}

export class CancelButton extends Button {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
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
                    document.getElementById("checkoutFooter").innerText = "";
                    document.getElementById("checkoutFooter").insertAdjacentHTML("afterbegin", checkoutModal(this.shop.Customer));
                    this.shop.BHandler.buy();
                }
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
        document.getElementById(this.id).addEventListener("click", (del: MouseEvent) => {
            let items = JSON.parse(localStorage.getItem("cart"));
            if (Object.keys(items).length === 1) {
                localStorage.removeItem("cart");
                this.shop.Cart.Items = [];
            }
            else {
                delete items[`${((<any>del.target).id.split("-del")[0]).replace(/-/gi, " ")}`];
                localStorage.setItem("cart", JSON.stringify(items));
            }
            Utils.createHash("cart/" + localStorage.getItem("cart"));
        });
    }
}

export class EditButton extends Button {
    click = (): void => {
        document.getElementById(this.id).addEventListener("input", (e) => {
            let amount: number;
            amount = +(<HTMLInputElement>e.target).value;
            let cartStorage = JSON.parse(localStorage.getItem("cart"));

            let prop = Object.keys(cartStorage);
            cartStorage[prop[+((<any>e.target).id.substring(13))]] = amount;

            localStorage.setItem("cart", JSON.stringify(cartStorage));

            Utils.createHash("cart/" + localStorage.getItem("cart"));
        });
    }
}

export class ReturnButton extends Button {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                if ((<any>Utils.getHashValue()).includes("cart/")) {
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

            if (hashValue === undefined || "" || null) {
                cardSetName = "Classic";
                Utils.createHash("Classic");
            }
            else if ((<any>hashValue).includes("cart/")) {
                cardSetName = document.getElementById(this.id).innerText;
            }
            else if ((<any>config.data.cardSets).includes(hashValue)) {
                cardSetName = hashValue;
            }
            else {
                alert(`"${hashValue}": Invalid Card Set.
                            Showing "Classic" instead.`)
                cardSetName = "Classic";
            }

            config.data.cardSetName = cardSetName;
            Utils.createHash(`preview/{"cardSet":"${cardSetName}","hero":"Druid"}`);
        });
    }
}

export class AddToCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            item.addEventListener("click", (e) => {
                let setName: string;
                const filters: {} = Utils.getFilters();
                // Cast to <any> to make ".includes()" work
                const hashValue = <any>Utils.getHashValue();
                const cardSets = <any>config.data.cardSets;

                if (hashValue !== undefined || "" || null) {
                    if (hashValue.includes("/") && filters["cardSet"] !== undefined && cardSets.includes(filters["cardSet"])) {
                        setName = filters["cardSet"];
                    }
                    else if (!hashValue.includes("/") && cardSets.includes(hashValue)) {
                        setName = hashValue;
                    }
                    else {
                        setName = "Classic";
                    }
                }
                else {
                    setName = "Classic";
                }

                const pack: CardPack = new CardPack(setName);

                let amountOfPacks: number;
                const inputElements = document.getElementsByClassName("input-amount");
                if (hashValue.includes("/")) {
                    amountOfPacks = +(<HTMLInputElement>inputElements[0]).value;
                }
                else {
                    amountOfPacks = +(<HTMLInputElement>inputElements[1]).value;
                }

                Utils.fakeHashchange("item_added");

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
export class SetCardSetButton extends ShopButton {
    click = (cardSet: HTMLElement): void => {
        cardSet.addEventListener("click", (e: MouseEvent): void => {
            const cardSetName: string = (<any>e.target).attributes[0].value;
            config.data.cardSetName = cardSetName;

            this.resetBtnClassList(cardSet, e);

            if (Utils.getHashValue() !== undefined && (<any>Utils.getHashValue()).includes("/")) {
                let filter = Utils.getFilters();
                if (filter["cardSet"] !== undefined && filter["cardSet"] === cardSetName && filter["hero"] !== undefined) {
                    delete (filter["cardSet"]);
                }
                else {
                    filter["cardSet"] = cardSetName;
                }
                Utils.createHash(`preview/${JSON.stringify(filter)}`);
            }
            else {
                Utils.createHash(cardSetName);
            }
        });
    }
}

/** Sets the hash according to the selected hero */
export class SetHeroButton extends ShopButton {
    click = (hero: HTMLElement) => {
        hero.addEventListener("click", (e: MouseEvent): void => {
            const heroValue: string = (<any>e.target).attributes[0].value;

            this.resetBtnClassList(hero, e);

            let filter = Utils.getFilters();
            if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
                delete (filter["hero"]);
            }
            else {
                filter["hero"] = heroValue;
            }
            Utils.createHash(`preview/${JSON.stringify(filter)}`);
        });
    }
}

/** Sets the hash according to the selected mana-cost */
export class SetManaCostButton extends ShopButton {
    click = (manaCost: HTMLElement): void => {
        manaCost.addEventListener("click", (e: MouseEvent): void => {
            if ((<any>e.target).attributes[0] === undefined) {
                return;
            }
            const manaCostValue: string = (<any>e.target).attributes[0].value;

            this.resetBtnClassList(manaCost, e);

            let filter = Utils.getFilters();
            if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
                delete (filter["manaCost"]);
            }
            else {
                filter["manaCost"] = manaCostValue;
            }

            Utils.createHash(`preview/${JSON.stringify(filter)}`);
        });
    }
}