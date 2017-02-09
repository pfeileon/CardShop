import { FetchResource } from "../fetchResource";
import { SinglePageApplication } from "../abstracts/singlePageApplication";

"use strict";

export abstract class Renderer {
    protected fResource: FetchResource;

    public get FResource() { return this.fResource; }

    constructor(fResource: FetchResource) {
        this.fResource = fResource;
    }

    abstract render(spApp: SinglePageApplication): void;
}