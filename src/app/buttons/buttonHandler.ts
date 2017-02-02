import { config } from '../config/config';
import { Callback } from "../types/types";
import * as Utils from '../modules/utilities';
import { CardPack } from '../modules/cardPack';
import { FetchResource } from '../modules/fetchResource';
import { RenderService } from '../modules/services/renderService';
import { ShoppingCart } from '../modules/shoppingCart';
import * as Buttons from "./buttons";

'use strict';

export class ButtonHandler {

    //Properties
    private fResource: FetchResource;
    private rService: RenderService;
    public get RService() { return this.rService; }

    constructor(rService: RenderService) {
        this.rService = rService;
        this.fResource = rService.FResource;
    }
}