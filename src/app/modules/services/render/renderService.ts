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

    // -- OWN

    /** Renders the page according to the hash */
    render(spApp: SinglePageApplication): void {
        let state;

        if ((<any>decodeURI(window.location.hash)).includes("/")) {
            state = (decodeURI(window.location.hash.split("/")[0])).replace("#", "");
        }
        else {
            state = "start";
        }

        this.displayState(spApp, state);
    }

    /** Controls which state is displayed
     * --> toggle css-class "no-display"
     * 
     * @param {string[]} pages - The names of the site's pages
     * @param {string} state - The site's current state
    */
    displayState(spApp: SinglePageApplication, state: string) {
        let pages = (<any>Object).values(spApp.StatePage);
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
        this.renderState(state, spApp);
    }

    /**
     * Renders the content of the site's current state
     * 
     * @param {string} selector - The state of the site
     * @param {SinglePageApplication} spApp - The application itself
     */
    renderState(state: string, spApp: SinglePageApplication): void {
        const states = Object.keys(spApp.StatePage);
        let isDefault = true;
        for (let item of states) {
            if (item === state) {
                this.stateRenderers[item](spApp);
                isDefault = false;
            }
        }
        if (isDefault) {
            state = "start";
            this.stateRenderers[state](spApp);
        }
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[], Record: any = record): string {
        return `<ul>${list.map(item => Record(item)).join('')}</ul>`;
    }

    // -- ABSTRACT

    protected abstract stateRenderers = {};
}