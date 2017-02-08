import { PseudoSingleton } from './pseudoSingleton'
import * as Utils from '../utilities';
import { FetchResource } from '../fetchResource';
import { TemplateHandler } from '../../templates/templateHandler';
import { RenderService } from '../services/renderService';
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
    protected rService: RenderService;
    protected tHandler: TemplateHandler;
    
    // - ABSTRACT
    protected abstract bHandler: ButtonHandler;

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(SinglePageApplication.ctorArg);
        this.rService = bHandler.RService;
        this.fResource = this.rService.FResource;
    }

    // METHODS

    // - OWN
    /** Start the app */
    start(): void {
        // Render App
        this.content = this.tHandler.insertAllTemplates();
        this.rService.render(this.content);

        // Initialize all buttons
        this.bHandler.buttonInit(this);

        // Implementation-specific methods are called
        this.loadSpecifics();

        // User input is processed
        window.addEventListener("hashchange", (e) => {
            this.rService.render(this.content);
        });

        // Enable browser-history
        history.replaceState(this.content, "CardShop");
    };

    // - ABSTRACT
    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics = (): void => { }
}