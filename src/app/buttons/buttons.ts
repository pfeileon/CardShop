import { config } from "../config/config";
import * as Utils from "../modules/utilities";
import { CardPack } from "../modules/cardPack";

export const previewBtn = (e) => {
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

    if (this.fResource !== undefined) {
        this.fResource.getCardSet(Utils.getFilters()["cardSet"])
            .then(cardSetData => {
                this.rService.showCards(cardSetData);
            })
    }
}

export const returnBtn = (e) => {
    Utils.createHash(Utils.getFilters()["cardSet"]);
}

export const addToCartBtn = (e) => {
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
            return;
        }
    }
    else {
        alert("Please choose a Card Set first!");
        return;
    }

    const pack: CardPack = new CardPack(setName || "Classic");

    this.cart.fillCart(pack, this.rService.showPacks);
}