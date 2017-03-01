import { PseudoSingleton } from './pseudoSingleton'
import { config } from '../config/config';
import { FetchService } from '../services/fetch/fetchService';
import { TemplateHandler } from '../templates/templateHandler';
import { RenderService } from '../services/render/renderService';
import { ButtonHandler } from '../buttons/buttonHandler';


'use strict';

/** Abstract basis for the SPA */
export abstract class SinglePageApplication extends PseudoSingleton {
    // PROPERTIES

    // - STATIC
    private static namePS = "SPA";
    private static exists: boolean = false;
    private static ctorArg: { exists: boolean, message: string } = {
        exists: SinglePageApplication.exists,
        message: `${SinglePageApplication.namePS}: ${PseudoSingleton.message}`
    };

    // - OWN
    protected readonly statePage = config.statePage;
    public get StatePage() { return this.statePage; }

    protected content: any;
    protected fService: FetchService;
    protected tHandler: TemplateHandler;
    protected rService: RenderService;
    protected bHandler: ButtonHandler;

    // CONSTRUCTOR
    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler, bHandler: ButtonHandler) {
        super(SinglePageApplication.ctorArg);
        this.bHandler = bHandler;
        this.rService = bHandler.RService;
        this.fService = this.rService.FService;
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
        this.bHandler.initButtons(this);

        // User input is processed
        window.addEventListener("hashchange", (render) => {
            this.rService.render(this);
        });

        // Enable browser-history
        history.replaceState(this.content, "CardShop");
    }

    // - ABSTRACT
    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics(): void;
}