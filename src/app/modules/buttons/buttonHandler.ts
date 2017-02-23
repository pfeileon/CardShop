import { SinglePageApplication } from '../spa/singlePageApplication';
import { FetchResource } from '../services/fetch/fetchResource';
import { RenderService } from '../services/render/renderService';

'use strict';

export abstract class ButtonHandler {
    //PROPERTIES
    protected abstract readonly filters: {};
    protected fResource: FetchResource;
    protected rService: RenderService;
    public get RService() { return this.rService; }

    //CONSTRUCTOR
    constructor(rService: RenderService) {
        this.rService = rService;
        this.fResource = rService.FResource;
    }

    // METHODS
    initButtons(spApp: SinglePageApplication) {
        this.iterateFilters(this.filters);
        this.initSpecificButtons(spApp);
    }
    abstract applyFilter(filter: string, filters: {});
    abstract initSpecificButtons(spApp: SinglePageApplication);

    /** Activates the filters */
    iterateFilters(filters: {}): void {
        for (let filter in filters) {
            this.applyFilter(filter, filters);
        }
    }
}