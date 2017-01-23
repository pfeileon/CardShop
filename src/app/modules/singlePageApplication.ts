import { PseudoSingleton } from '../types/types'
import { config } from '../config/config';
import * as Utils from './utilities';
import { FetchService } from './fetchService';
import { FetchResource } from './fetchResource';
import { TemplateHandler, templates } from '../templates/templates';
import { Renderer } from './renderer';

'use strict';

export abstract class SinglePageApplication implements PseudoSingleton {

    private static exists: boolean = false;
    protected abstract content: any;
    protected abstract tHandler: TemplateHandler;
    protected abstract renderer: Renderer;

    /** Warns after first instantiation */
    constructor(fResource: FetchResource, tHandler: TemplateHandler, renderer: Renderer) {
        this.existsCheck();
    }

    //Methods
    /** Initialize the app */
    start(): void {
        //Render App
        this.content = this.tHandler.insertAllTemplates(this.tHandler.templates);
        this.renderer.render(this.content);

        //Implementation-specific methods are called
        this.loadSpecifics();
    };

    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics(): void;

    existsCheck() {
        SinglePageApplication.exists = Utils.instanceCheck(SinglePageApplication.exists);
    }
}
