import { PseudoSingleton } from './pseudoSingleton'
import { config } from '../config/config';
import * as Utils from '../misc/utilities';
import { FetchResource } from '../services/fetch/fetchResource';
import { TemplateHandler } from '../templates/templateHandler';
import { RenderService } from '../services/render/renderService';
import { ButtonHandler } from '../buttons/buttonHandler';


'use strict';

/** Abstract basis for the SPA */
export abstract class SinglePageApplication extends PseudoSingleton {
    // PROPERTIES

    // - STATIC
    private static namePS: string;
    private static exists: boolean = false;
    private static ctorArg: { exists: boolean, message: string } = {
        exists: SinglePageApplication.exists,
        message: `${SinglePageApplication.namePS}: ${PseudoSingleton.message}`
    };

    // - OWN
    protected readonly statePage = config.statePage;
    public get StatePage() { return this.statePage; }
    
    protected content: any;
    protected fResource: FetchResource;
    protected tHandler: TemplateHandler;
    protected rService: RenderService;
    protected bHandler: ButtonHandler;

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(SinglePageApplication.ctorArg);
        this.bHandler = bHandler;
        this.rService = bHandler.RService;
        this.fResource = this.rService.FResource;
        this.content = tHandler.insertAllTemplates();
    }

    // METHODS

    // - OWN
    /** Start the app */
    start(): void {
        // Implementation-specific methods are called
        this.loadSpecifics();

        // Render App
        this.rService.render(this);

        // Initialize all buttons
        this.bHandler.buttonInit(this);

        // User input is processed
        window.addEventListener("hashchange", (e) => {
            this.rService.render(this);
        });

        // Enable browser-history
        history.replaceState(this.content, "CardShop");
    };

    // - ABSTRACT
    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics = (): void => { }
}