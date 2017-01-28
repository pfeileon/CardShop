import * as Utils from '../utilities';
import { FetchResource } from "../fetchResource";

'use strict';

let record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export class RenderService {

    private fResource: FetchResource;

    constructor(fResource: FetchResource) {
        this.fResource = fResource;
    }

    /** Returns content as string */
    render(content: any): any {

        let hashValue;
        if (decodeURI(window.location.hash).includes("/")) {
            hashValue = decodeURI(window.location.hash.split("/")[0]);
        }
        else hashValue = "";

        switch (hashValue) {
            case undefined:
                this.displayCheck(1);
                history.replaceState(content, "Start-Page")
                break;
                
            case "":
                this.displayCheck(1);
                history.replaceState(content, "Start-Page")
                break;

            case "#":
                this.displayCheck(1);
                history.replaceState(content, "Start-Page")
                break;

            case "#filters":
                this.displayCheck(2);
                history.replaceState(content, "Set-Preview")

                let filter: {} = Utils.getFilters();
                let setName: string
                if (filter["manaCost"] === undefined) {
                    setName = `${filter["cardSet"]}?collectible=1`;
                }
                else {
                    setName = `${filter["cardSet"]}?collectible=1&cost=${filter["manaCost"]}`;
                }
                this.fResource.getCardSet(setName)
                    .then(data => {
                        this.showCards(data);
                    })
                break;
            
            default:
                this.displayCheck(3);
                history.replaceState(content, "Error-Page")
                break;
        }
        
        return `${content}`;
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[]): string {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };

    /** Inserts the images of the cards of a fetch call */
    showCards(cardSetData: any) {
        // let mana: string = Utils.getFilters()["manaCost"];
        let hero: string = Utils.getFilters()["hero"];

        let card: any;
        let heroFilterPassed: boolean;
        // let manaFilterPassed: boolean;

        // First remove old code
        document.getElementById("preview-main").innerText = "";

        // Iterate the list of cards
        for (card of cardSetData) {
            // Check if img-path exists and if card is collectible
            if (card.img !== undefined) {

                heroFilterPassed = (
                    hero === undefined ||
                    (hero !== undefined && card.playerClass === hero)
                )

                // manaFilterPassed = (
                //     mana === undefined || (
                //         mana !== undefined && (
                //             (card.cost == mana && mana <= "9") ||
                //             (mana == "10" && card.cost >= "10"))
                //     )
                // )

                // Check filters
                if (heroFilterPassed) { // && manaFilterPassed) {
                    // Render card image
                    document.getElementById("preview-main").insertAdjacentHTML("beforeend", `<img src="${card.img}" alt = "${card.name}" />`);
                }
            }
        }
    }

    displayCheck(selector: number) {
        let startPageShown: boolean = document.getElementById("start-page").classList.contains("noDisplay");
        let setPreviewShown: boolean = document.getElementById("set-preview").classList.contains("noDisplay");
        let errorPageShown: boolean = document.getElementById("error-page").classList.contains("noDisplay");

        switch (selector) {
            case 1: {
                document.getElementsByClassName("card-set-name")[0].textContent = Utils.getHashValue("#", 1);

                if (startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (!setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (!errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case 2: {
                document.getElementsByClassName("card-set-name")[1].textContent = Utils.getFilters()["cardSet"];

                if (setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                if (!startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (!errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                break;
            }
            case 3: {
                if (errorPageShown) {
                    Utils.toggleCssClass("error-page", "noDisplay");
                }
                if (!startPageShown) {
                    Utils.toggleCssClass("start-page", "noDisplay");
                }
                if (!setPreviewShown) {
                    Utils.toggleCssClass("set-preview", "noDisplay");
                }
                break;
            }
        }
    }
}