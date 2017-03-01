import { Filters } from "../types/types";
import { SinglePageApplication } from '../spa/singlePageApplication';
import { FetchService } from '../services/fetch/fetchService';
import { RenderService } from '../services/render/renderService';

'use strict';

export abstract class ButtonHandler {
    //PROPERTIES
    protected abstract readonly filters = (singlePageApplication): Filters => { return; };
    protected fService: FetchService;
    protected rService: RenderService;
    public get RService() { return this.rService; }
    protected filterService;
    public get FilterService() { return this.filterService; }

    //CONSTRUCTOR
    constructor(rService: RenderService) {
        this.rService = rService;
        this.fService = rService.FService;
        this.filterService = rService.FilterService;
    }

    // METHODS

    // - OWN
    /** Initializes all buttons which are rendered on start */
    initButtons(spApp: SinglePageApplication) {
        this.filterService.initFilters(this.filters(spApp));
        this.initSpecificButtons(spApp);
    }

    // - ABSTRACT
    abstract initSpecificButtons(spApp: SinglePageApplication);
}