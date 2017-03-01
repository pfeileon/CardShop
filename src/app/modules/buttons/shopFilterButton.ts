import { IFilterButton } from "../types/types";
import { ShopButtonHandler } from "./shopButtonHandler";
import { ShopButton } from "./shopButton";
import { FilterService } from "../services/filter/filterService";

"use strict";

export abstract class ShopFilterButton extends ShopButton implements IFilterButton {
    private filterService: FilterService;
    public get FilterService() { return this.filterService };
    constructor(id, bHandler, shop?) {
        super(id, bHandler)
        this.filterService = this.bHandler.FilterService;
    }
}