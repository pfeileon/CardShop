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
        // First remove old code
        document.getElementById("preview-main").innerText = "";
        for (let card of cardSetData) {
            if (card.img !== undefined && card.collectible === true) {
                if ((hero === undefined || (hero !== undefined && card.playerClass === hero)) && (mana === undefined || (mana !== undefined && card.cost == mana))) {
                    document.getElementById("preview-main").insertAdjacentHTML("beforeend", `<img src="${card.img}" alt = "${card.name}" />`);
                }
            }
        }
    }
}