import { Callback } from "../types/types";
import { ButtonHandler } from "./buttonHandler";
import * as Utils from "../modules/utilities";

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

    resetBtnClassList(element: HTMLElement, e: MouseEvent) {
        localStorage.setItem("lastDataIdValue", e.srcElement.attributes["data-id"].value);
        
        let isPrimary = false;
        if (e.srcElement.attributes["data-id"].value === localStorage.getItem("lastDataIdValue") && e.srcElement.classList.contains("btn-primary")) {
            isPrimary = true;
        }
        for (let item of <any>element.children) {
            item.children[0].classList.remove("btn-primary");
            item.children[0].classList.add("btn-default");
        }

        if (Utils.isStartPage() || isPrimary) {
            e.srcElement.classList.toggle("btn-default");
            e.srcElement.classList.toggle("btn-primary");
        }
        else if (!isPrimary) {
            e.srcElement.classList.remove("btn-primary");
        }
    }
}