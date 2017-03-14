import { config } from '../../config/config';
import { Record } from "../../types/types";
import { FetchService } from "../fetch/fetchService";
import { FilterService } from "../filter/filterService";
import { SinglePageApplication } from "../../spa/singlePageApplication";

"use strict";

const record: Record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export abstract class RenderService {
    // PROPERTIES

    // -- ABSTRACT
    protected abstract readonly stateRenderers = {};
    // - OWN
    protected fService: FetchService;
    public get FService() { return this.fService; }
    protected filterService: FilterService;
    public get FilterService() { return this.filterService };

    // CONSTRUCTOR
    constructor(fService: FetchService, filterService: FilterService) {
        this.fService = fService;
        this.filterService = filterService;
    }

    // METHODS

    // -- OWN

    /** Renders the page according to the hash */
    render(spApp: SinglePageApplication): void {
        let state;
        let uri = decodeURI(window.location.hash);

        if ((<any>uri).includes("/")) {
            state = (uri.split("/")[0]).replace("#", "");
            if (!(<any>Object).keys(config.statePage).includes(state)) {
                state = "error";
            }
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
                document.getElementById(pages[i]).classList.toggle("no-display");
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

    /** Inserts an <ul>/<ol> with the passed array as <li>-elements
     * 
     * @param { number } type - 1(<ul>) is default, 2 generates an <ol>
    */
    insertList(list: any[], Record: any = record, type = 1): string {
        if (type === 2) {
            return `<ol>${list.map(item => Record(item)).join('')}</ol>`;
        }
        return `<ul>${list.map(item => Record(item)).join('')}</ul>`;
    }
}