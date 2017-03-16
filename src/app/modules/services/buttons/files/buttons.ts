import { Button } from "./button";
import { FilterButton } from "./filterButton";
import { ShopButton } from "./shopButton";
import { ShopFilterButton } from "./shopFilterButton";
import { config } from "../../../config/config";
import { setHashValue, fakeHashChange, getHashValue, isStartPage } from "../../misc/utilities";
import { CardPack } from "../../../shop/cardPack";
import { Customer } from "../../../shop/customer";
import { CreditCard } from "../../../shop/creditCard";
import { checkoutModal } from "../../templates/files/modalTemplate";
import { addToCartTooltip, hideTooltip, showTooltip } from "../../misc/customJQ";

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
                    setHashValue("");
                    setHashValue("cart/" + localStorage.getItem("cart"));
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
                    customer = this.confirmCustomer();
                }
                if (item.id === "confirmCCD") {
                    let creditCard = this.confirmCreditCard();
                }
            });
        }
    }

    confirmCustomer(): Customer {
        const customer = new Customer(this.shop.Cart.Items);
        this.shop.setCustomer(customer);

        document.getElementById("personalDataHeading").setAttribute("data-target", "#collapsePD")
        document.getElementById("creditCardDataHeading").setAttribute("data-target", "#collapseCCD")
        document.getElementById("creditCardDataHeading").click();

        return customer;
    }
    confirmCreditCard(): CreditCard {
        let creditCard: CreditCard = new CreditCard();
        this.shop.Customer.setCreditCard(creditCard);

        localStorage.setItem("customer", JSON.stringify(this.shop.Customer));
        document.getElementById("checkoutFooter").innerText = "";
        document.getElementById("checkoutFooter").insertAdjacentHTML("afterbegin", checkoutModal(this.shop.Customer));
        this.BHandler.buy();

        return creditCard;
    }
}

export class CheckoutButton extends ShopButton {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            if (localStorage.getItem("cart") === null) {
                alert("Your cart is empty!");
            }
            else {
                setHashValue("checkout/");
            }
        });
    }
}

export class ClearButton extends ShopButton {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            localStorage.removeItem("cart");
            this.shop.Cart.Items = [];
            setHashValue("cart/");
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
            setHashValue("cart/" + localStorage.getItem("cart"));
        });
    }
}

export class EditButton extends Button {
    click = (): void => {
        document.getElementById(this.id).addEventListener("input", (e) => {
            let amount: number;
            let value = +(<HTMLInputElement>e.target).value;
            if (value < 101) {
                amount = value;
            }
            else {
                amount = 100;
            }
            let cartStorage = JSON.parse(localStorage.getItem("cart"));

            let prop = Object.keys(cartStorage);
            cartStorage[prop[+((<any>e.target).id.substring(13))]] = amount;

            localStorage.setItem("cart", JSON.stringify(cartStorage));

            setHashValue("cart/" + localStorage.getItem("cart"));
        });
    }
}

export class ReturnButton extends FilterButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                if ((<any>getHashValue()).includes("cart/")) {
                    setHashValue(localStorage.getItem("lastHash"));
                }
                else {
                    let temp = this.FilterService.getFilters()["cardSet"];
                    setHashValue(temp);
                }
            });
        }
    }
}

export class PreviewButton extends Button {
    click = (): void => {
        document.getElementById(this.id).addEventListener("click", (e) => {
            const hashValue: string = getHashValue();
            let cardSetName: string;

            if (hashValue === undefined || "" || null) {
                cardSetName = "Classic";
                setHashValue("Classic");
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

            setHashValue(`preview/{"cardSet":"${cardSetName}","hero":"Druid"}`);
        });
    }
}

export class AddToCartButton extends ShopFilterButton {
    click = (): void => {
        // TODO: bug with hideTooltip(), on every other click event fires almost immediately
        let timeoutId: number;
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            addToCartTooltip(item);
            item.addEventListener("click", (e) => {
                clearTimeout(timeoutId);
                showTooltip(item);

                const filters: {} = this.FilterService.getFilters();
                const hashValue = <any>getHashValue();
                const cardSets = <any>config.data.cardSets;

                const pack = new CardPack(this.setPackName(hashValue, filters, cardSets));
                const amount = this.setInputAmount(hashValue);

                this.shop.Cart.fillCart(pack, amount);

                // In order to immediately display the packs on the start-page
                if (isStartPage()) {
                    fakeHashChange("item_added");
                }

                timeoutId = setTimeout(function () {
                    hideTooltip(item);
                }, 2000)
            });
        }
    }

    setPackName(hashValue, filters, cardSets): string {
        let setName = "Classic";
        if (hashValue !== undefined || "" || null) {
            if (hashValue.includes("/") && filters["cardSet"] !== undefined && cardSets.includes(filters["cardSet"])) {
                setName = filters["cardSet"];
            }
            else if (!hashValue.includes("/") && cardSets.includes(hashValue)) {
                setName = hashValue;
            }
        }
        return setName;
    }

    setInputAmount(hashValue): number {
        let amountOfPacks: number;
        const inputElements = document.getElementsByClassName("input-amount");
        if (hashValue !== undefined && hashValue.includes("/")) {
            amountOfPacks = this.checkInputAmount(<HTMLInputElement>inputElements[1]);
        }
        else {
            if (document.querySelector("#start-page span.card-set-name").innerHTML === "" || undefined) {
                setHashValue("Classic");
            }
            amountOfPacks = this.checkInputAmount(<HTMLInputElement>inputElements[0]);
        }
        return amountOfPacks;
    }

    checkInputAmount(input: HTMLInputElement): number {
        let amountOfPacks: number = null;
        if (+input.value < 1 || null) {
            amountOfPacks = 1;
        }
        else if (+input.value < 11) {
            amountOfPacks = +(input).value;
        }
        (<any>input).value = amountOfPacks;
        return amountOfPacks;
    }
}

export class GotoCartButton extends ShopButton {
    click = (): void => {
        for (let item of <any>document.getElementsByClassName(this.id)) {
            item.addEventListener("click", (e) => {
                if (document.querySelector("#start-page span.card-set-name").innerHTML === "" || undefined) {
                    setHashValue("Classic");
                }
                localStorage.setItem("lastHash", getHashValue());
                setHashValue("cart/" + localStorage.getItem("cart"));
            });
        }
    }
}

/** Sets the hash-value according to the selected CardSet */
export class SetCardSetButton extends ShopFilterButton {
    click = (cardSet: HTMLElement): void => {
        cardSet.addEventListener("click", (e: MouseEvent): void => {
            if ((<any>e.target).attributes[0] === undefined) {
                return;
            }
            const cardSetName: string = (<any>e.target).attributes[0].value;

            this.resetBtnClassList(cardSet, e);

            if (getHashValue() !== undefined && (<any>getHashValue()).includes("/")) {
                let filter = this.FilterService.getFilters();
                if (filter["cardSet"] !== undefined && filter["cardSet"] === cardSetName && filter["hero"] !== undefined) {
                    delete (filter["cardSet"]);
                }
                else {
                    filter["cardSet"] = cardSetName;
                }
                setHashValue(`preview/${JSON.stringify(filter)}`);
            }
            else {
                setHashValue(cardSetName);
            }
        });
    }
}

/** Sets the hash according to the selected hero */
export class SetHeroButton extends ShopFilterButton {
    click = (hero: HTMLElement) => {
        hero.addEventListener("click", (e: MouseEvent): void => {
            if ((<any>e.target).attributes[0] === undefined) {
                return;
            }
            const heroValue: string = (<any>e.target).attributes[0].value;

            this.resetBtnClassList(hero, e);

            let filter = this.FilterService.getFilters();
            if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
                delete (filter["hero"]);
            }
            else {
                filter["hero"] = heroValue;
            }
            setHashValue(`preview/${JSON.stringify(filter)}`);
        });
    }
}

/** Sets the hash according to the selected mana-cost */
export class SetManaCostButton extends ShopFilterButton {
    click = (manaCost: HTMLElement): void => {
        manaCost.addEventListener("click", (e: MouseEvent): void => {
            if ((<any>e.target).attributes[0] === undefined) {
                return;
            }
            const manaCostValue: string = (<any>e.target).attributes[0].value;

            this.resetBtnClassList(manaCost, e);

            let filter = this.FilterService.getFilters();
            if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
                delete (filter["manaCost"]);
            }
            else {
                filter["manaCost"] = manaCostValue;
            }

            setHashValue(`preview/${JSON.stringify(filter)}`);
        });
    }
}