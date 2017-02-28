import { Filters } from "../types/types";
import { SinglePageApplication } from '../spa/singlePageApplication';
import { FetchResource } from '../services/fetch/fetchResource';
import { RenderService } from '../services/render/renderService';
import { iterateList } from "../misc/utilities";

'use strict';

export abstract class ButtonHandler {
    //PROPERTIES
    protected abstract readonly filters: Filters;
    protected fResource: FetchResource;
    protected rService: RenderService;
    public get RService() { return this.rService; }

    //CONSTRUCTOR
    constructor(rService: RenderService) {
        this.rService = rService;
        this.fResource = rService.FResource;
    }

    // METHODS

    // - OWN
    /** Initializes all buttons which are rendered on start */
    initButtons(spApp: SinglePageApplication) {
        this.iterateFilters(this.filters);
        this.initSpecificButtons(spApp);
    }

    /** Activates the filters */
    iterateFilters(filters: Filters): void {
        for (let filter in filters) {
            this.applyFilter(filter, filters[filter]);
        }
    }

    /** Iterates an array of HTMLElements by class (= `${filter}-filter`) and applies the filter */
    applyFilter(filter: string, apply = (arg: HTMLElement) => {}): void {
        for (let item of <any>document.getElementsByClassName(`${filter}-filter`)) {
            iterateList(item.children[1].children, apply);
        }
    }

    // - ABSTRACT
    abstract initSpecificButtons(spApp: SinglePageApplication);
}