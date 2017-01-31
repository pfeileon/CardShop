import { PseudoSingleton } from './pseudoSingleton'
import * as Utils from '../utilities';
import { FetchResource } from '../fetchResource';
import { TemplateHandler } from '../../templates/templateHandler';
import { RenderService } from '../services/renderService';

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
    protected abstract fResource: FetchResource;
    protected abstract rService: RenderService;
    protected abstract tHandler: TemplateHandler;

    /** Warns after first instantiation */
    constructor(tHandler: TemplateHandler) {
        super(SinglePageApplication.ctorArg);
        this.rService = tHandler.RService;
        this.fResource = this.rService.FResource;
    }

    // Methods
    /** Start the app */
    start(): void {
        // Render App
        this.content = this.tHandler.insertAllTemplates();
        this.rService.render(this.content);

        // Implementation-specific methods are called
        this.loadSpecifics();

        // User input is processed
        window.onhashchange = (e) => {
            this.rService.render(this.content);
        }

        // Enable browser-history
        history.replaceState(this.content, "CardShop");
    };

    /** Implements a call of all methods needed at start-up for the specific implementation of SinglePageApplication  */
    abstract loadSpecifics = (): void => { }
}