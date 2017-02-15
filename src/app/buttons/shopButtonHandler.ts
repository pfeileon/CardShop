import { config } from '../config/config';
import { Callback } from "../types/types";
import * as Utils from '../modules/utilities';
import { ButtonHandler } from "./buttonHandler";
import { FetchResource } from '../modules/fetchResource';
import { RenderService } from "../modules/services/renderService";
import { CardShop } from "../modules/cardShop";
import { ShoppingCart } from "../modules/shoppingCart";
import * as Buttons from "./buttons";

"use strict";

interface Filters {
    id: string[];
    do: Callback<HTMLElement, void>[];
}

export class ShopButtonHandler extends ButtonHandler {
    // PROPERTIES
    // CONSTRUCTOR
    constructor(rService: RenderService) {
        super(rService);
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
        this.checkout(shop);
        this.cancelCheckout();
        this.confirmCheckout(shop);
        this.buy();
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

    /** unused stuff
        // private firstCard: any;
    
        // showNextCards = (): void => {
        //     let temp: HTMLImageElement[] = [];
        //     let tempShown: HTMLImageElement[] = [];
        //     for (let item of <any>document.getElementsByTagName("img")) {
    
        //         if (item.className.indexOf("noDisplay") === -1 && item.id.indexOf("card_") !== -1 && +item.id.substring(5, 1) !== null || undefined) {
        //             this.firstCard = item.id;
        //             temp.push(item);
        //             Utils.toggleCssClass(item.id, "noDisplay");
        //         }
        //     }
    
        //     let cardId: number;
    
        //     cardId = +temp[temp.length - 1].id.substring(5, 6);
    
    
        //     for (let i: number = 1; i < temp.length; i++) {
        //         if (document.getElementById(`card_${cardId + i}`) !== null || undefined) {
        //             Utils.toggleCssClass(`card_${cardId + i}`, "noDisplay");
        //             tempShown.push(temp[i]);
        //         }
        //     }
    
        //     console.log(tempShown.length)
        //     if (tempShown.length < 8) {
        //         Utils.toggleCssClass("next-cards-shown", "noDisplay");
        //         return;
        //     }
        // }
    
        // showPreviousCards = (): void => {
        //     let temp: HTMLImageElement[] = [];
        //     let tempShown: HTMLImageElement[] = [];
        //     for (let item of <any>document.getElementsByTagName("img")) {
    
        //         if (item.className.indexOf("noDisplay") === -1 && item.id.indexOf("card_") !== -1 && +item.id.substring(5, 1) !== null || undefined) {
        //             temp.push(item);
        //             Utils.toggleCssClass(item.id, "noDisplay");
        //         }
        //     }
    
        //     let cardId: number;
    
        //     cardId = +temp[0].id.substring(5, 6);
    
    
        //     for (let i: number = 1; i <= temp.length + 1; i++) {
        //         Utils.toggleCssClass(`card_${cardId - i}`, "noDisplay");
        //         tempShown.push(temp[i - 1]);
        //     }
    
        //     console.log(cardId);
        //     console.log(this.firstCard)
        //     let helper;
        //     helper = +this.firstCard.substring(5, 6)
        //     if (tempShown.length < 8 || cardId - 1 === helper) {
        //         Utils.toggleCssClass("next-cards-shown", "noDisplay");
        //         Utils.toggleCssClass("previous-cards-shown", "noDisplay");
        //         return;
        //     }
        // }
    */
}