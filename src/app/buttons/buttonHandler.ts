import { config } from '../config/config';
import { Callback } from "../types/types";
import * as Utils from '../modules/utilities';
import { CardPack } from '../modules/cardPack';
import { FetchResource } from '../modules/fetchResource';
import { RenderService } from '../modules/services/renderService';
import { ShoppingCart } from '../modules/shoppingCart';
import * as Buttons from "./buttons";

'use strict';

export class ButtonHandler {

    //Properties
    private fResource: FetchResource;
    private rService: RenderService;
    private cart: ShoppingCart;

    public get Cart() { return this.cart; }

    constructor(rService: RenderService, cart: ShoppingCart) {
        this.rService = rService;
        this.fResource = rService.FResource;
        this.cart = cart;
    }

    /** What happens when you click the Preview Card Set Button */
    previewCardSet = (): void => {
        document.getElementById('preview-card-set-btn').onclick = Buttons.previewBtn.bind(this, this);
    }

    /** What happens when you click the Return Button */
    return(): void {
        document.getElementById('return-btn').onclick = Buttons.returnBtn;
    }

    /** What happens when you click the Add To Cart Button */
    addToCart = (): void => {
        for (let item of <any>document.getElementsByClassName("add-to-cart-btn")) {
            item.onclick = Buttons.addToCartBtn.bind(this, this);
        }
    }

    /** Not implemented, yet */
    gotoCart = (): void => {
        for (let item of <any>document.getElementsByClassName("goto-cart-btn")) {
            item.onclick = Buttons.gotoCartBtn;
        }
    }

    /** Activates the filters */
    iterateFilters(): void {
        const filters: string[] = ["set", "hero", "mana"];
        const doFilters: Callback<HTMLElement, void>[] = [
            this.selectCardSet,
            this.selectHero,
            this.selectManaCost
        ]

        for (let i: number = 0; i < filters.length; i++) {
            if (filters[i] === "set") {
                for (let item of <any>document.getElementsByClassName(`${filters[i]}-filter`)) {
                    Utils.iterateUl(item.children[1].children, doFilters[i]);
                }
            }
            else {
                Utils.iterateUl(document.getElementById(`${filters[i]}-filter`).children[1].children, doFilters[i]);
            }
        }
    }

    /** Selects the CardSet on the StartPage */
    selectCardSet(cardSet: HTMLElement): void {
        cardSet.onclick = Buttons.setCardSetBtn;
    }

    /** Select the Hero from the hero-filter-list */
    selectHero(hero: HTMLElement): void {
        hero.onclick = Buttons.setHeroBtn;
    }

    /** Selects the mana-cost- from the filter */
    selectManaCost(mana: HTMLElement): void {
        mana.onclick = Buttons.setManaCostBtn;
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