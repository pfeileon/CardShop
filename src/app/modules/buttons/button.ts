import { Callback } from "../types/types";
import { ButtonHandler } from "./buttonHandler";
import * as Utils from "../misc/utilities";

"use strict";

export abstract class Button {
    // PROPERTIES
    protected id: string;
    protected bHandler: ButtonHandler;
    // CONSTRUCTOR
    constructor(id: string, bHandler: ButtonHandler) {
        this.id = id;
        this.bHandler = bHandler;
    }
    // METHODS
    protected abstract click: Callback<HTMLElement | ButtonHandler | void, void>;
}