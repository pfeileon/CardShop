import { PseudoSingleton } from './pseudoSingleton'
import * as Utils from '../utilities';
import { FetchResource } from '../fetchResource';
import { TemplateHandler, templates } from '../../templates/templates';
import { Renderer } from '../renderer';

'use strict';

/** Abstract basis for the SPA */
export abstract class SinglePageApplication extends PseudoSingleton {

    private static name: string;
    private static exists: boolean = false;
    private static ctorArg: { exists: boolean, message: string } = {
        exists: SinglePageApplication.exists,
        message: `${SinglePageApplication.name}: ${PseudoSingleton.message}`
    };

    protected abstract content: any;
    protected abstract tHandler: TemplateHandler;
    protected abstract renderer: Renderer;

    /** Warns after first instantiation */
    constructor(fResource: FetchResource, tHandler: TemplateHandler, renderer: Renderer) {
        super(SinglePageApplication.ctorArg);
    }

    // Methods
    /** Initialize the app */
    start(): void {
        //Render App
        this.content = this.tHandler.insertAllTemplates(this.tHandler.templates);
        this.renderer.render(this.content);

        // Implementation-specific methods are called
        this.loadSpecifics();
    };

    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics(): void;
}