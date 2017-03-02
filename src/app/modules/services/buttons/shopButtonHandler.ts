import { Filters } from "../../types/types";
import { ButtonHandler } from "./buttonHandler";
import { RenderResource } from "../render/renderResource";
import { CardShop } from "../../shop/cardShop";
import * as Buttons from "./files/buttons";

"use strict";

export class ShopButtonHandler extends ButtonHandler {
    // PROPERTIES
    // - FORCED
        protected readonly filters = (shop): Filters => {
        return {
            "cardSet": this.selectCardSet.bind(this, shop),
            "hero": this.selectHero.bind(this, shop),
            "mana": this.selectManaCost.bind(this, shop)
        }
    }
    // - OWN
    private filterResource = this.filterService;
    public get FilterResource() { return this.filterResource; }

    // CONSTRUCTOR
    constructor(rResource: RenderResource) {
        super(rResource);
    }

    // METHODS

    // - FORCED
    initSpecificButtons(shop: CardShop): void {
        // Start
        this.toPreview();

        // Start & Preview
        this.addToCart(shop);
        this.gotoCart(shop);

        // Preview & Cart
        this.toPrevious();

        // Cart
        this.clearCart(shop);
        this.checkout(shop);

        // Checkout
        this.cancelCheckout();
        this.confirmCheckout(shop);
    }

    // - OWN

    /** What happens when you click the Return Button */
    toPrevious(id = "return-btn"): void {
        const returnBtn: Buttons.ReturnButton = new Buttons.ReturnButton(id, this);
        returnBtn.click();
    }

    /** Activates button as link to the preview-page */
    toPreview(id = "preview-card-set-btn"): void {
        const previewBtn: Buttons.PreviewButton = new Buttons.PreviewButton(id, this);
        previewBtn.click();
    }

    addToCart(shop: CardShop, id = "add-to-cart-btn"): void {
        const addToCartBtn: Buttons.AddToCartButton = new Buttons.AddToCartButton(id, shop);
        addToCartBtn.click();
    }

    gotoCart(shop: CardShop, id = "goto-cart-btn"): void {
        const gotoCartBtn: Buttons.GotoCartButton = new Buttons.GotoCartButton(id, shop);
        gotoCartBtn.click();
    }

    // Filters

    selectCardSet(shop: CardShop, cardSet: HTMLElement): void {
        const setCardSetBtn: Buttons.SetCardSetButton = new Buttons.SetCardSetButton("set-card-set-btn", shop);
        setCardSetBtn.click(cardSet);
    }

    selectHero(shop: CardShop, hero: HTMLElement): void {
        const setHeroBtn: Buttons.SetHeroButton = new Buttons.SetHeroButton("set-hero-set-btn", shop);
        setHeroBtn.click(hero);
    }

    selectManaCost(shop: CardShop, manaCost: HTMLElement): void {
        const setManaCostBtn: Buttons.SetManaCostButton = new Buttons.SetManaCostButton("set-mana-set-btn", shop);
        setManaCostBtn.click(manaCost);
    }

    // Shopping Cart

    checkout(shop: CardShop, id = "checkout-btn"): void {
        const checkoutBtn: Buttons.CheckoutButton = new Buttons.CheckoutButton(id, shop);
        checkoutBtn.click();
    }

    /** Clears the ShoppingCart */
    clearCart(shop: CardShop, id = "cart-clear-btn"): void {
        const clearBtn: Buttons.ClearButton = new Buttons.ClearButton(id, shop);
        clearBtn.click();
    }

    /** Call when ShoppingCart is rendered otherwise EventHandler gets lost on re-rendering*/
    deleteCartPosition(shop: CardShop, id = "cart-del-btn"): void {
        const deleteBtn: Buttons.DeleteButton = new Buttons.DeleteButton(id, shop);
        deleteBtn.click();
    }

    /** Call when ShoppingCart is rendered otherwise EventHandler gets lost on re-rendering*/
    editCartPosition(id = "cart-edit-btn"): void {
        const editBtn: Buttons.EditButton = new Buttons.EditButton(id, this);
        editBtn.click();
    }

    // Checkout

    buy(id = "buyBtn") {
        const buyBtn: Buttons.BuyButton = new Buttons.BuyButton(id, this);
        buyBtn.click();
    }

    cancelCheckout(id = "cancel-btn"): void {
        const cancelBtn: Buttons.CancelButton = new Buttons.CancelButton(id, this);
        cancelBtn.click();
    }

    confirmCheckout(shop: CardShop, id = "confirm-btn"): void {
        const confirmBtn: Buttons.ConfirmButton = new Buttons.ConfirmButton(id, shop);
        confirmBtn.click();
    }
}