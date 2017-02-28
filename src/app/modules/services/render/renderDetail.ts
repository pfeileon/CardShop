import { Record, Shopable } from "../../types/types";
import { config } from '../../config/config';
import { RenderService } from "./renderService";
import * as Utils from '../../misc/utilities';
import { cardModal } from "../../templates/modalTemplate";
import { CardShop } from "../../shop/cardShop";
import { FetchResource } from "../fetch/FetchResource";

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
    // PROPERTIES

    private lastSetName: string;
    private lastCardData: any;

    // METHODS

    filterCards(cardData: any): {} {

        // First remove old code
        document.getElementById("carouselCardWrapper").innerText = "";
        document.getElementById("carouselInd").innerText = "";
        document.getElementById("previewFooter").innerText = "";

        let filteredCardData = {};

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
                    filteredCardData[i] = card;
                    i++;
                }
            }
        }
        return filteredCardData;
    }

    /** Inserts a carousel of the cards of a fetch call */
    renderCards(fResource: FetchResource, setName: string, filters: {}): void {
        if (this.lastSetName === setName && setName !== undefined) {
            this.renderCarousel(this.filterCards(this.lastCardData));
        }
        else {
            fResource.getCardData(filters)
                .then(cardData => {
                    if (setName !== undefined) {
                        this.lastSetName = setName;

                        if (cardData !== undefined) {
                            this.lastCardData = cardData;
                        }
                    }
                    this.renderCarousel(this.filterCards(cardData));
                })
            addEventListener("resize", (e) => {
                this.renderCarousel(this.filterCards(this.lastCardData));
            });
        }
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
            let pack = {};
            switch (item["setName"]) {
                case "Classic":
                    pack["link"] = "http://www.hearthcards.net/packs/images/pack.png";
                    pack["alt"] = item["setName"];
                    break;
                case "The Grand Tournament":
                    pack["link"] = "http://www.hearthcards.net/packs/images/packtgt.png";
                    pack["alt"] = item["setName"];
                    break;
                case "Whispers of the Old Gods":
                    pack["link"] = "http://www.hearthcards.net/packs/images/packwotog.png";
                    pack["alt"] = item["setName"];
                    break;
                case "Mean Streets of Gadgetzan":
                    pack["link"] = "http://www.hearthcards.net/packs/images/packmsog.png";
                    pack["alt"] = item["setName"];
                    break;
                default:
                    break;
            }
            document.getElementById("startMain").insertAdjacentHTML("beforeend", `<img src="${pack["link"]}" alt="${pack["alt"]}" />`);
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

    renderCarousel(filteredCardData: {}) {
        for (let item in filteredCardData) {
            let i = +item;
            let card = filteredCardData[item];
            let itemsPerSlide = this.determineItemsPerSlide();
            let j = Math.floor(i / itemsPerSlide);

            if (i === 0 || i % itemsPerSlide === 0) {
                document.getElementById("carouselCardWrapper").insertAdjacentHTML("beforeend", `<div id="carouselItem${j}" class="item"></div>`);
            }

            document.getElementById(`carouselItem${j}`).insertAdjacentHTML("beforeend", `<div id="carouselCardHelp${j}" class="text-center"></div>`);

            // Render card image and its modal
            document.getElementById(`carouselCardHelp${j}`).insertAdjacentHTML("beforeend", `<img role="button" data-toggle="modal" data-target="#cardModal${i}" src="${card.img}" alt="${card.name}" />`);
            document.getElementById("previewFooter").insertAdjacentHTML("beforeend", `${cardModal(card, i)}`);

            if (i === 0) {
                document.getElementById("carouselItem0").classList.add("active");
            }
            this.hideCarouselControls(j);
        }
        this.genCarouselInd();
    }

    /** Automatically generates a carousel's indicators */
    genCarouselInd(): void {
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
    hideCarouselControls(numberOfSlides: number): void {
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