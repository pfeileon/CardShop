import { config } from '../../config/config';
import * as Utils from '../utilities';
import { FetchResource } from "../fetchResource";

'use strict';

let record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export class RenderService {

    private lastSetName: string;
    private lastCardData: any;
    private fResource: FetchResource;

    constructor(fResource: FetchResource) {
        this.fResource = fResource;
    }

    /** Renders the page according to the hash */
    render(content: any): any {

        let hashValue;
        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (decodeURI(window.location.hash).search("/") !== -1) {
            hashValue = decodeURI(window.location.hash.split("/")[0]);
        }
        else hashValue = "";

        switch (hashValue) {
            case undefined:
                this.displayCheck("start");
                break;

            case "":
                this.displayCheck("start");
                break;

            case "#":
                this.displayCheck("start");
                break;

            case "#filters":
                this.displayCheck("preview");

                let filters: {} = Utils.getFilters();
                let setName: string = filters["cardSet"];
                let filterString: string = `${setName}?collectible=1`;

                // let manaCost: string = filter["manaCost"];
                // if (manaCost !== undefined) {
                //     filterString += `&cost=${manaCost}`;
                // }
                if (this.lastSetName === setName && setName !== undefined) {
                    this.showCards(this.lastCardData);
                }
                else {
                    this.fResource.getCardData(filters)
                        .then(cardData => {
                            if (setName !== undefined) {
                                this.lastSetName = setName;

                                if (cardData !== undefined) {
                                    this.lastCardData = cardData;
                                }
                            }
                            this.showCards(cardData);
                        })
                }
                break;

            default:
                this.displayCheck("error");
                // history.replaceState(content, "Error-Page")
                break;
        }

        return `${content}`;
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[]): string {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };

    /** Inserts the images of the cards of a fetch call */
    showCards(cardData: any) {

        let manaFilter: string = Utils.getFilters()["manaCost"];
        let heroFilter: string = Utils.getFilters()["hero"];

        let card: any;
        let cardFilterPassed: boolean;
        let heroFilterPassed: boolean;
        let manaFilterPassed: boolean;
        let setFilterPassed: boolean;



        // First remove old code
        document.getElementById("preview-main").innerText = "";

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
                    // Render card image
                    document.getElementById("preview-main").insertAdjacentHTML("beforeend", `<img src="${card.img}" alt = "${card.name}" />`);
                }
            }
        }
    }

    displayCheck(selector: string) {
        let startPageShown: boolean = !document.getElementById("start-page").classList.contains("noDisplay");
        let setPreviewShown: boolean = !document.getElementById("set-preview").classList.contains("noDisplay");
        let errorPageShown: boolean = !document.getElementById("error-page").classList.contains("noDisplay");

        let shownCardSetHeader: HTMLCollectionOf<Element> = document.getElementsByClassName("card-set-name");

        switch (selector) {
            case "start": {
                if (config.data.startPageData.cardSets.indexOf(Utils.getHashValue()) !== -1) {
                    shownCardSetHeader[0].textContent = Utils.getHashValue();
                }
                else {
                    shownCardSetHeader[0].textContent = "";
                }

                if (!startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "preview": {
                let filters: {} = Utils.getFilters();
                if (filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
                    shownCardSetHeader[1].textContent = filters["cardSet"];
                }
                else if (filters["cardSet"] !== undefined) {
                    alert("Invalid Card Set! Reverting to Classic");

                    Utils.createHash(`filters/{"cardSet":"Classic"}`);
                    shownCardSetHeader[1].textContent = "Classic";

                }
                else {
                    shownCardSetHeader[1].textContent = "none chosen";
                }

                if (filters["hero"] !== undefined && config.data.setPreviewData.heroes.indexOf(filters["hero"]) === -1) {
                    alert("Invalid Hero! Showing Druid instead");

                    Utils.createHash(`filters/{"cardSet":"${config.data.setPreviewData.cardSetName}","hero":"Druid"}`);
                }

                if (!setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case "error": {
                if (!errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                break;
            }
        }
    }
}