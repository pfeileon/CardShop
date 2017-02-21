import { FetchResource } from "../fetch/fetchResource";
import { SinglePageApplication } from "../../spa/singlePageApplication";
import { toggleCssClass } from "../../misc/utilities";

"use strict";

const record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export abstract class RenderService {
    // PROPERTIES
    protected fResource: FetchResource;
    public get FResource() { return this.fResource; }

    // CONSTRUCTOR
    constructor(fResource: FetchResource) {
        this.fResource = fResource;
    }

    // METHODS
    abstract render(spApp: SinglePageApplication): void;
    abstract renderState(selector: string, spApp?: SinglePageApplication);

    /** Controls which state is displayed --> toggle css-class "no-display" */
    displayState(pages: string[], state: string) {
        let statesShown: boolean[] = [];

        for (let i = 0; i < pages.length; i++) {
            statesShown[i] = !document.getElementById(pages[i]).classList.contains("no-display");
            if ((<any>pages[i]).includes(state)) {
                statesShown[i] = !statesShown[i];
            }
            if (statesShown[i]) {
                toggleCssClass(pages[i])
            }
        }
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[], Record: any = record): string {
        return `<ul>${list.map(item => Record(item)).join('')}</ul>`;
    }
}