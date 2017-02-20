import { config } from '../config/config';
import { Callback } from "../types/types";
import * as Utils from '../misc/utilities';
import { ButtonHandler } from "./buttonHandler";
import { FetchResource } from '../services/fetch/fetchResource';
import { RenderResource } from "../services/render/renderResource";
import { CardShop } from "../shop/cardShop";
import { ShoppingCart } from "../shop/shoppingCart";
import * as Buttons from "./buttons";

"use strict";

interface Filters {
    id: string[];
    do: Callback<HTMLElement, void>[];
}

export class ShopButtonHandler extends ButtonHandler {
    // PROPERTIES
    // CONSTRUCTOR
    constructor(rResource: RenderResource) {
        super(rResource);
    }

    // METHODS

    // - FORCED
    buttonInit(shop: CardShop): void {

        // Filters
        this.iterateFilters();

        // Preview Card Set
        this.previewCardSet();

        // Return
        this.goBack();

        // Cart
        this.addToCart(shop);
        this.gotoCart(shop);
        this.clearCart(shop);

        // Checkout
        this.checkout(shop);
        this.cancelCheckout();
        this.confirmCheckout(shop);
    }

    // - OWN
    /** Activates the filters */
    iterateFilters(): void {
        const filters: Filters = {
            id: ["set", "hero", "mana"],
            do: [
                this.selectCardSet,
                this.selectHero,
                this.selectManaCost
            ]
        }

        for (let i: number = 0; i < filters["id"].length; i++) {
            if (filters["id"][i] === "set") {
                for (let item of <any>document.getElementsByClassName(`${filters["id"][i]}-filter`)) {
                    Utils.iterateUl(item.children[1].children, filters["do"][i]);
                }
            }
            else {
                Utils.iterateUl(document.getElementById(`${filters["id"][i]}-filter`).children[1].children, filters["do"][i]);
            }
        }
    }

    buy(id = "buyBtn") {
        const buyBtn: Buttons.BuyButton = new Buttons.BuyButton(id, this);
        buyBtn.click();
    }

    cancelCheckout(id = "cancel-btn"): void {
        const cancelBtn: Buttons.CancelButton = new Buttons.CancelButton(id, this);
        cancelBtn.click();
    }

    confirmCheckout(shop: CardShop, id = "confirm-btn"): void {
        const confirmBtn: Buttons.ConfirmButton = new Buttons.ConfirmButton(id, this, shop);
        confirmBtn.click();
    }

    checkout(shop: CardShop, id = "checkout-btn"): void {
        const checkoutBtn: Buttons.CheckoutButton = new Buttons.CheckoutButton(id, this, shop);
        checkoutBtn.click();
    }

    /** Call this method when the ShoppingCart is rendered */
    deleteCartPosition(shop: CardShop, id = "cart-del-btn"): void {
        const deleteBtn: Buttons.DeleteButton = new Buttons.DeleteButton(id, this, shop);
        deleteBtn.click();
    }

    /** Clears the ShoppingCart */
    clearCart(shop: CardShop, id = "cart-clear-btn"): void {
        const clearBtn: Buttons.ClearButton = new Buttons.ClearButton(id, this, shop);
        clearBtn.click();
    }

    /** What happens when you click the Return Button */
    goBack(id = "return-btn"): void {
        const returnBtn: Buttons.ReturnButton = new Buttons.ReturnButton(id, this);
        returnBtn.click();
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet(id = "preview-card-set-btn"): void {
        const previewBtn: Buttons.PreviewButton = new Buttons.PreviewButton(id, this);
        previewBtn.click();
    }

    /** What happens when you click the Add To Cart Button */
    addToCart(shop: CardShop, id = "add-to-cart-btn"): void {
        const addToCartBtn: Buttons.AddToCartButton = new Buttons.AddToCartButton(id, this, shop);
        addToCartBtn.click();
    }

    /** Not implemented, yet */
    gotoCart(shop: CardShop, id = "goto-cart-btn"): void {
        const gotoCartBtn: Buttons.GotoCartButton = new Buttons.GotoCartButton(id, this, shop);
        gotoCartBtn.click();
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet(cardSet: HTMLElement): void {
        const setCardSetBtn: Buttons.SetCardSetButton = new Buttons.SetCardSetButton("set-card-set-btn", this);
        setCardSetBtn.click(cardSet);
    }

    /** Select the Hero from the hero-filter-list */
    selectHero(hero: HTMLElement): void {
        const setHeroBtn: Buttons.SetHeroButton = new Buttons.SetHeroButton("set-hero-set-btn", this);
        setHeroBtn.click(hero);
    }

    /** Selects the mana-cost- from the filter */
    selectManaCost(manaCost: HTMLElement): void {
        const setManaCostBtn: Buttons.SetManaCostButton = new Buttons.SetManaCostButton("set-mana-set-btn", this);
        setManaCostBtn.click(manaCost);
    }
}