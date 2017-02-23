import { Record, Shopable } from "../../types/types";
import { config } from '../../config/config';
import { RenderService } from "./renderService";
import * as Utils from '../../misc/utilities';
import { cardModal } from "../../templates/modals";

"use strict";

const deleteRecord: Record = (item) => {
    return `<li role="button" id="${(<any>item).replace(/ /gi, "-")}-del-btn" data-id="${item}-del-btn" class="cart-del-btn btn btn-warning">delete</li>`;
}

const inputPackRecord: Record = (item) => {
    return `<li data-id="${item}"><div class="input-pack btn btn-primary">${item}</div></li>`;
};

const inputAmountRecord: Record = (item) => {
    return `<li data-id="${item}"><input class="input-amount btn btn-default" type="number" name ="amount" value="${item}" min="1" max="100" pattern="[0-9]" /></li>`
}

export class RenderDetail {
    /** Inserts the images of the cards of a fetch call */
    showCards(cardData: any): void {

        let manaFilter: string = Utils.getFilters()["manaCost"];
        let heroFilter: string = Utils.getFilters()["hero"];

        let card: any;
        let cardFilterPassed: boolean;
        let heroFilterPassed: boolean;
        let manaFilterPassed: boolean;
        let setFilterPassed: boolean;
        let i: number = 0;

        // First remove old code
        document.getElementById("carouselCardWrapper").innerText = "";
        document.getElementById("carouselInd").innerText = "";
        document.getElementById("previewFooter").innerText = "";

        // Iterate the list of cards
        for (card of cardData) {

            cardFilterPassed = (
                card.collectible &&
                card.img !== undefined
            )

            setFilterPassed = (
                config.data.startPageData.cardSets.indexOf(card.cardSet) !== -1
            );

            if (cardFilterPassed && setFilterPassed) {

                heroFilterPassed = (
                    heroFilter === undefined || (
                        heroFilter !== undefined &&
                        card.playerClass === heroFilter
                    ))

                manaFilterPassed = (
                    manaFilter === undefined || (
                        manaFilter !== undefined && (
                            (card.cost == manaFilter && manaFilter <= "9") ||
                            (manaFilter == "10" && card.cost >= "10")
                        )))

                if (heroFilterPassed && manaFilterPassed) {
                    //Testing carousel
                    this.renderCarousel(card, i);

                    i++;
                }
            }
        }
        // auto-generate bootstrap carousel indicators
        this.genCarouselInd();
    }

    /**
     * Displays the CardPacks in the cart
     * 
     * @param {CardPack} pack - The CardPack to be displayed
    */
    showItems(items: Shopable[]): void {
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

    /** Renders the items in the cart as editable table */
    showCart(cartObject: {}) {
        for (let item in cartObject) {
            let cartTable = <HTMLTableElement>document.getElementById("cartContentTable");
            let cartTableRow = cartTable.insertRow();
            let cartTableCell = cartTableRow.insertCell(0);
            cartTableCell.innerHTML = inputPackRecord(item);
            cartTableCell = cartTableRow.insertCell(1);
            cartTableCell.innerHTML = inputAmountRecord(cartObject[item]);
            cartTableCell = cartTableRow.insertCell(2);
            cartTableCell.innerHTML = deleteRecord(item);
        }
    }

    refreshButtons(state: string) {
        let temp = document.getElementsByClassName("btn-group-justified");
        let btnList: HTMLCollection;
        let i: number;

        if (state === "start") {
            i = 0;
        }
        else if (state === "preview") {
            i = 1;

            btnList = temp[i + 1].children[0].children;
            this.refreshButtonsHelpFunction(btnList, Utils.getHeroFilter());
            btnList = temp[i + 2].children[0].children;
            this.refreshButtonsHelpFunction(btnList, Utils.getManaFilter());
        }

        btnList = temp[i].children[0].children;
        this.refreshButtonsHelpFunction(btnList, Utils.getCardSetFilter());
    }

    refreshButtonsHelpFunction(btnList: HTMLCollection, filter: string) {
        for (let item of <any>btnList) {
            if (item.attributes["data-id"].value === filter) {
                item.classList.remove("btn-default");
                item.classList.add("btn-primary");
            }
            else {
                item.classList.add("btn-default");
                item.classList.remove("btn-primary");
            }
        }
    }

    renderCarousel(card, i: number) {
        let numberOfImagesPerSlide = this.determineNumberOfImagesPerSlide();
        let j = Math.floor(i / numberOfImagesPerSlide);

        if (i === 0 || i % numberOfImagesPerSlide === 0) {
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
    determineNumberOfImagesPerSlide(): number {
        let x: number;
        let w = window.innerWidth;
        if (w < 600) {
            x = 2;
        }
        if (w >= 600) {
            x = 3;
        }
        if (w >= 800) {
            x = 4;
        }
        if (w >= 1024) {
            x = 5;
        }
        if (w > 1600) {
            x = 6;
        }
        return x;
    }
}