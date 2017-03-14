import { FilterService } from "./filterService";
import { config } from "../../config/config";
import { setHashValue } from "../misc/utilities";

"use strict";

export class FilterResource extends FilterService {
    // PROPERTIES
    // - FORCED
    protected readonly filterChecks = {
        "cardSetFilter": this.checkCardSetFilter.bind(this),
        "heroFilter": this.checkHeroFilter.bind(this)
    }

    // METHODS
    filterCards(cardData: any): {} {
        let filteredCardData = {};

        let i = 0;
        for (let card of cardData) {

            let cardFilterPassed = (
                card.collectible &&
                card.img !== undefined
            )

            let setFilterPassed = (<any>config.data.cardSets).includes(card.cardSet);

            if (cardFilterPassed && setFilterPassed) {

                let heroFilter: string = this.getFilters()["hero"];
                let heroFilterPassed = (
                    heroFilter === undefined || (
                        heroFilter !== undefined &&
                        card.playerClass === heroFilter
                    ))

                let manaFilter: string = this.getFilters()["manaCost"];
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

    checkCardSetFilter(filters: {}): {} {
        if (filters["cardSet"] !== undefined && !(<any>config.data.cardSets).includes(filters["cardSet"])) {
            setHashValue(`preview/{"cardSet":"Classic","hero":"Druid"}`);
            filters = this.getFilters();
            alert("Invalid Card Set! Showing Classic instead");
        }
        return filters;
    }

    checkHeroFilter(filters: {}): {} {
        if (filters["hero"] !== undefined && !(<any>config.data.heroes).includes(filters["hero"])) {
            setHashValue(`preview/{"cardSet":"${"Classic"}","hero":"Druid"}`);
            filters = this.getFilters();
            alert("Invalid Hero! Showing Druid instead");
        }
        return filters;
    }

    refreshFilters(state: string) {
        let btnList = document.querySelector(`#${state}-page .cardSet-filter .btn-group-justified`).children[0].children;
        this.refreshFilterButtons(btnList, this.getCardSetFilter());
        if (state === "start") {
            btnList = document.querySelector(`#${state}-page .cardSet-filter .btn-group-justified`).children[1].children;
            this.refreshFilterButtons(btnList, this.getCardSetFilter());
        }

        if (state === "preview") {
            btnList = document.querySelector("#hero-filter .btn-group-justified").children[0].children;
            this.refreshFilterButtons(btnList, this.getHeroFilter());
            btnList = document.querySelector("#mana-filter .btn-group-justified").children[0].children;
            this.refreshFilterButtons(btnList, this.getManaFilter());
        }
    }

    refreshFilterButtons(btnList: HTMLCollection, filter: string) {
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

    getCardSetFilter(): string {
        let temp = JSON.stringify(this.getFilters());
        if (temp !== undefined) {
            if ((<any>temp).includes("{")) {
                temp = this.getFilters()["cardSet"];
            }
            else {
                temp = temp.replace(/"/g, "");
            }
        }
        return temp;
    }

    getHeroFilter(): string {
        let temp = this.getFilters()["hero"];
        return temp;
    }

    getManaFilter(): string {
        let temp = this.getFilters()["manaCost"];
        return temp;
    }
}