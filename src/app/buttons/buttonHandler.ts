import { SinglePageApplication } from '../modules/abstracts/singlePageApplication';
import { FetchResource } from '../modules/fetchResource';
import { RenderService } from '../modules/services/renderService';

'use strict';

export abstract class ButtonHandler {
    //PROPERTIES
    protected fResource: FetchResource;
    protected rService: RenderService;
    public get RService() { return this.rService; }

    //CONSTRUCTOR
    constructor(rService: RenderService) {
        this.rService = rService;
        this.fResource = rService.FResource;
    }

    // METHODS
    abstract buttonInit(spApp: SinglePageApplication);
}