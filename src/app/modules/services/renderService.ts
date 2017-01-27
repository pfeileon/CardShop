import * as Utils from '../utilities'

'use strict';

let record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export class RenderService {

    /** Returns content as string */
    render(content: any): any {
        return `${content}`;
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[]): string {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };

    /** Inserts the images of the cards of a fetch call */
    showCards(cardSetData: any) {
        let mana: string = Utils.getFilters()["manaCost"];
        let hero: string = Utils.getFilters()["hero"];

        let card: any;
        let heroFilterPassed: boolean;
        let manaFilterPassed: boolean;

        // First remove old code
        document.getElementById("preview-main").innerText = "";

        // Iterate the list of cards
        for (card of cardSetData) {
            // Check if img-path exists and if card is collectible
            if (card.img !== undefined && card.collectible === true) {

                heroFilterPassed = (
                    hero === undefined ||
                    (hero !== undefined && card.playerClass === hero)
                )

                manaFilterPassed = (
                    mana === undefined || (
                        mana !== undefined && (
                            (card.cost == mana && mana <= "9") ||
                            (mana == "10" && card.cost >= "10"))
                    )
                )

                // Check filters
                if (heroFilterPassed && manaFilterPassed) {
                    // Render card image
                    document.getElementById("preview-main").insertAdjacentHTML("beforeend", `<img src="${card.img}" alt = "${card.name}" />`);
                }
            }
        }
    }
}