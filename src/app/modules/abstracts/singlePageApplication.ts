import { PseudoSingleton } from './pseudoSingleton'
import * as Utils from '../utilities';
import { FetchResource } from '../fetchResource';
import { TemplateHandler } from '../../templates/templateHandler';
import { RenderService } from '../services/renderService';
import { Renderer } from '../services/renderer';
import { ButtonHandler } from '../../buttons/buttonHandler';


'use strict';

/** Abstract basis for the SPA */
export abstract class SinglePageApplication extends PseudoSingleton {
    // PROPERTIES

    // - STATIC
    private static name: string;
    private static exists: boolean = false;
    private static ctorArg: { exists: boolean, message: string } = {
        exists: SinglePageApplication.exists,
        message: `${SinglePageApplication.name}: ${PseudoSingleton.message}`
    };

    // - OWN
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected renderer: Renderer;
    protected bHandler: ButtonHandler;

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(SinglePageApplication.ctorArg);
        this.bHandler = bHandler;
        this.renderer = bHandler.RService;
        this.fResource = this.renderer.FResource;
        this.content = tHandler.insertAllTemplates();
    }

    // METHODS

    // - OWN
    /** Start the app */
    start(): void {
        // Implementation-specific methods are called
        this.loadSpecifics();

        // Render App
        this.renderer.render(this);

        // Initialize all buttons
        this.bHandler.buttonInit(this);

        // User input is processed
        window.addEventListener("hashchange", (e) => {
            this.renderer.render(this);
        });

        // Enable browser-history
        history.replaceState(this.content, "CardShop");
    };

    // - ABSTRACT
    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics = (): void => { }
}