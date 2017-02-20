import { FetchResource } from "../fetch/fetchResource";
import { SinglePageApplication } from "../../spa/singlePageApplication";

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
    abstract displayCheck(selector: string, spApp?: SinglePageApplication);

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList(list: any[], Record: any = record): string {
        return `<ul>${list.map(item => Record(item)).join('')}</ul>`;
    }
}