import { FetchResource } from '../modules/fetchResource';
import { RenderService } from '../modules/services/renderService';

'use strict';

export abstract class ButtonHandler {

    protected abstract fResource: FetchResource;
    protected abstract rService: RenderService;
    
    public get RService() { return this.rService; }

    constructor(rService: RenderService) {
        this.rService = rService;
        this.fResource = rService.FResource;
    }
}