import { IFilterButton } from "../types/types";
import { ButtonHandler } from "./buttonHandler";
import { Button } from "./button";

"use strict";

export abstract class FilterButton extends Button implements IFilterButton {
    private filterService;
    public get FilterService() { return this.filterService };
    constructor(id: string, bHandler: ButtonHandler) {
        super(id, bHandler)
        this.filterService = this.bHandler.FilterService;
    }
}