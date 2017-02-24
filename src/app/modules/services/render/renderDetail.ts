import { Record, Shopable } from "../../types/types";
import { config } from '../../config/config';
import { RenderService } from "./renderService";
import * as Utils from '../../misc/utilities';
import { cardModal } from "../../templates/modalTemplate";
import { CardShop } from "../../shop/cardShop";

"use strict";

const deleteRecord: Record = (item) => {
    return `<button id="${(<any>item).replace(/ /gi, "-")}-del-btn" data-id="${item}-del-btn" class="cart-del-btn btn btn-warning">delete</button`;
}

const inputPackRecord: Record = (item) => {
    return `<button data-id="${item}" class="input-pack btn btn-primary">${item}</button>`;
};

const inputAmountRecord: Record = (item) => {
    return `<input data-id="${item}" class="input-amount btn btn-default" type="number" name ="amount" value="${item}" min="1" max="100" pattern="[0-9]" />`
}

export class RenderDetail {
    /** Inserts the images of the cards of a fetch call */
    renderCards(cardData: any): void {

        // First remove old code
        document.getElementById("carouselCardWrapper").innerText = "";
        document.getElementById("carouselInd").innerText = "";
        document.getElementById("previewFooter").innerText = "";

        let i = 0;
        for (let card of cardData) {

            let cardFilterPassed = (
                card.collectible &&
                card.img !== undefined
            )

            let setFilterPassed = (<any>config.data.startPageData.cardSets).includes(card.cardSet);

            if (cardFilterPassed && setFilterPassed) {

                let heroFilter: string = Utils.getFilters()["hero"];
                let heroFilterPassed = (
                    heroFilter === undefined || (
                        heroFilter !== undefined &&
                        card.playerClass === heroFilter
                    ))

                let manaFilter: string = Utils.getFilters()["manaCost"];
                let manaFilterPassed = (
                    manaFilter === undefined || (
                        manaFilter !== undefined && (
                            (card.cost == manaFilter && manaFilter <= "9") ||
                            (manaFilter == "10" && card.cost >= "10")
                        )))

                if (heroFilterPassed && manaFilterPassed) {
                    this.renderCarousel(card, i);
                    i++;
                }
            }
        }
        this.genCarouselInd();
    }

    /**
     * Displays the CardPacks in the cart
     * 
     * @param {CardPack} pack - The CardPack to be displayed
    */
    renderItems(items: Shopable[]): void {
        // First remove all shown packs
        document.getElementById("startMain").innerText = "";
        for (let item of items) {
            let packLink: string;
            switch (item["setName"]) {
                case "Classic":
                    packLink = "http://www.hearthcards.net/packs/images/pack.png";
                    break;
                case "The Grand Tournament":
                    packLink = "http://www.hearthcards.net/packs/images/packtgt.png";
                    break;
                case "Whispers of the Old Gods":
                    packLink = "http://www.hearthcards.net/packs/images/packwotog.png";
                    break;
                case "Mean Streets of Gadgetzan":
                    packLink = "http://www.hearthcards.net/packs/images/packmsog.png";
                    break;
                default:
                    break;
            }
            document.getElementById("startMain").insertAdjacentHTML("beforeend", `<img src="${packLink}" />`);
        }
    }

    /** Renders the items in the cart as editable table
     * 
     * EventHandlers are added here (not on start) otherwise they get lost on re-rendering
    */
    renderCartTable(shop: CardShop, cartObject: {}) {
        for (let item in cartObject) {
            let cartTable = <HTMLTableElement>document.getElementById("cartContentTable");
            let cartTableRow = cartTable.insertRow();

            let cartTableCell = cartTableRow.insertCell();
            cartTableCell.innerHTML = inputPackRecord(item);
            cartTableCell.children[0].id = `input-pack-${Object.keys(cartObject).indexOf(item)}`;
            shop.BHandler.toPreview(cartTableCell.children[0].id);

            cartTableCell = cartTableRow.insertCell();
            cartTableCell.innerHTML = inputAmountRecord(cartObject[item]);
            cartTableCell.children[0].id = `input-amount-${Object.keys(cartObject).indexOf(item)}`;
            shop.BHandler.editCartPosition(cartTableCell.children[0].id);

            cartTableCell = cartTableRow.insertCell();
            cartTableCell.innerHTML = deleteRecord(item);
            shop.BHandler.deleteCartPosition(shop, cartTableCell.children[0].id);
        }
    }

    refreshFilters(state: string) {
        let btnList = document.querySelector(`#${state}-page .cardSet-filter .btn-group-justified`).children[0].children;
        this.refreshButtons(btnList, Utils.getCardSetFilter());
        if (state === "preview") {
            btnList = document.querySelector("#hero-filter .btn-group-justified").children[0].children;
            this.refreshButtons(btnList, Utils.getHeroFilter());
            btnList = document.querySelector("#mana-filter .btn-group-justified").children[0].children;
            this.refreshButtons(btnList, Utils.getManaFilter());
        }
    }

    refreshButtons(btnList: HTMLCollection, filter: string) {
        for (let btn of <any>btnList) {
            if (btn.attributes["data-id"].value === filter) {
                btn.classList.remove("btn-default");
                btn.classList.add("btn-primary");
            }
            else {
                btn.classList.add("btn-default");
                btn.classList.remove("btn-primary");
            }
        }
    }

    renderCarousel(card, i: number) {
        let itemsPerSlide = this.determineItemsPerSlide();
        let j = Math.floor(i / itemsPerSlide);

        if (i === 0 || i % itemsPerSlide === 0) {
            document.getElementById("carouselCardWrapper").insertAdjacentHTML("beforeend", `<div id="carouselItem${j}" class="item"></div>`);
        }

        document.getElementById(`carouselItem${j}`).insertAdjacentHTML("beforeend", `<div id="carouselCardHelp${j}" class="text-center"</div>`);

        // Render card image
        document.getElementById(`carouselCardHelp${j}`).insertAdjacentHTML("beforeend", `<img role="button" data-toggle="modal" data-target="#cardModal${i}" src="${card.img}" alt="${card.name}" />`);
        document.getElementById("previewFooter").insertAdjacentHTML("beforeend", `${cardModal(card, i)}`);

        if (i === 0) {
            document.getElementById("carouselItem0").classList.add("active");
        }
        this.hideCarouselControls(j);
    }

    /** Automatically generates a carousel's indicators */
    genCarouselInd() {
        let carInd = document.getElementById("carouselInd");

        let carWrap = document.getElementById("carouselCardWrapper");
        let len = carWrap.children.length;

        for (let i = 0; i < len; i++) {
            carInd.insertAdjacentHTML("beforeend", `<li id="indicator${i}" data-target='#previewCarousel' data-slide-to="${i}" class=""></li>`);
            if (i === 0) {
                document.getElementById("indicator0").classList.add("active");
            }
        }
    }

    /** Hides the carousel's controls if there is only one slide */
    hideCarouselControls(numberOfSlides: number) {
        if (numberOfSlides === 0) {
            for (let item of <any>document.getElementsByClassName("carousel-control")) {
                item.classList.add("hide");
            }
            document.getElementById("carouselInd").classList.add("hidden");
        }
        else if (numberOfSlides === 1) {
            for (let item of <any>document.getElementsByClassName("carousel-control")) {
                item.classList.remove("hide");
            }
            document.getElementById("carouselInd").classList.remove("hidden");
        }
    }

    /** Determines how many Images are shown per slide based on the "innerWidth"-property */
    determineItemsPerSlide(): number {
        let x: number;
        let w = window.innerWidth;
        if (w < 576) {
            x = 1;
        }
        if (w >= 576) {
            x = 2;
        }
        if (w >= 768) {
            x = 3;
        }
        if (w >= 992) {
            x = 4;
        }
        if (w > 1200) {
            x = 5;
        }
        return x;
    }
}