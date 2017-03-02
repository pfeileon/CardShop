import { config } from '../config/config';
import { FetchService } from '../services/fetch/fetchService';
import { TemplateHandler } from '../services/templates/templateHandler';
import { RenderService } from '../services/render/renderService';
import { ButtonHandler } from '../services/buttons/buttonHandler';


'use strict';

/** Abstract basis for the SPA */
export abstract class SinglePageApplication {
    // PROPERTIES
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