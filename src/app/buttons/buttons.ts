import { config } from "../config/config";
import { Shopable } from "../types/types";
import * as Utils from "../modules/utilities";
import { CardPack } from "../modules/cardPack";
import { Callback } from "../types/types";
import { ButtonHandler } from "./buttonHandler";



interface Button {
    id: string;
    click: Callback<MouseEvent | ButtonHandler, Shopable[] | void>;
}

export const previewBtn: Button = {
    id: "Preview",
    click: (): void => {
        const hashValue: string = Utils.getHashValue();
        let cardSetName: string;

        if (hashValue === undefined || "") {
            config.data.setPreviewData.cardSetName = "Classic";
            Utils.createHash("Classic");
        }

        if (config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
            cardSetName = hashValue;
        }
        else {
            alert(`
                "${hashValue}": Invalid Card Set.
                Showing "Classic" instead.
            `)
            cardSetName = "Classic";
        }

        config.data.setPreviewData.cardSetName = cardSetName;
        Utils.createHash(`filters/{"cardSet":"${cardSetName}","hero":"Druid"}`);
    }
}

export const returnBtn: Button = {
    id: "ReturnButton",
    click: () => { Utils.createHash(Utils.getFilters()["cardSet"]) }
}

export const addToCartBtn: Button = {
    id: "AdToCart",
    click: (that: ButtonHandler) => {
        let setName: string;
        const hashValue: string = Utils.getHashValue();
        const filters: {} = Utils.getFilters();

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (hashValue !== undefined || "" || null) {
            if (hashValue.search("/") !== -1 && filters["cardSet"] !== undefined && config.data.startPageData.cardSets.indexOf(filters["cardSet"]) !== -1) {
                setName = filters["cardSet"];

            }
            else if (hashValue.search("/") === -1 && config.data.startPageData.cardSets.indexOf(hashValue) !== -1) {
                setName = hashValue;
            }
            else {
                alert("Please choose a Card Set first!");
            }
        }
        else {
            alert("Please choose a Card Set first!");
        }

        const pack: CardPack = new CardPack(setName || "Classic");

        let amountOfPacks: number;
        if (Utils.getHashValue().search("/") === -1) {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[0]).value;
        }
        else {
            amountOfPacks = +(<HTMLInputElement>document.getElementsByClassName("input-amount")[1]).value;
        }

        return that.RService.showItems(that.Cart.fillCart(pack, amountOfPacks));
    }
}

export const gotoCartBtn: Button = {
    id: "GotoCart",
    click: (e): void => {
        alert("Not implemented, yet");
    }
}

/** Sets the hash-value according to the selected CardSet */
export const setCardSetBtn: Button = {
    id: "SetCardSet",
    click: (e: MouseEvent): void => {
        const cardSetName: string = e.srcElement.attributes[0].value;
        config.data.setPreviewData.cardSetName = cardSetName;

        // string.includes() throws error("Property 'includes' does not exist on type 'string'.")
        if (Utils.getHashValue() !== undefined && Utils.getHashValue().search("/") !== -1) {
            let filter = Utils.getFilters();
            if (filter["cardSet"] !== undefined && filter["cardSet"] === cardSetName && filter["hero"] !== undefined) {
                delete (filter["cardSet"]);
            }
            else {
                filter["cardSet"] = cardSetName;
            }
            Utils.createHash(`filters/${JSON.stringify(filter)}`);
        }
        else {
            Utils.createHash(cardSetName);
        }
    }
}

/** Sets the hash according to the selected hero */
export const setHeroBtn: Button = {
    id: "SetHero",
    click: (e: MouseEvent): void => {
        const heroValue: string = e.srcElement.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["hero"] !== undefined && filter["hero"] === heroValue && filter["cardSet"] !== undefined) {
            delete (filter["hero"]);
        }
        else {
            filter["hero"] = heroValue;
        }
        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }
}

/** Sets the hash according to the selected mana-cost */
export const setManaCostBtn: Button = {
    id: "SetManaCost",
    click: (e: MouseEvent): void => {
        const manaCostValue: string = e.srcElement.attributes[0].value;

        let filter = Utils.getFilters();
        if (filter["manaCost"] !== undefined && filter["manaCost"] === manaCostValue) {
            delete (filter["manaCost"]);
        }
        else {
            filter["manaCost"] = manaCostValue;
        }

        Utils.createHash(`filters/${JSON.stringify(filter)}`);
    }
}