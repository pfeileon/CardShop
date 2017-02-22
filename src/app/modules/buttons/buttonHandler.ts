import { SinglePageApplication } from '../spa/singlePageApplication';
import { FetchResource } from '../services/fetch/fetchResource';
import { RenderService } from '../services/render/renderService';

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