import { Button } from "./button";
import { ShopButtonHandler } from "./shopButtonHandler";
import { CardShop } from "../shop/cardShop";
import { isStartPage } from "../misc/utilities";

export abstract class ShopButton extends Button {
    // PROPERTIES
    protected shop: CardShop;
    // CONSTRUCTOR
    constructor(id: string, shop: CardShop) {
        super(id, shop.BHandler);
        this.shop = shop;
    }
    // METHODS
    resetBtnClassList(element: HTMLElement, e: MouseEvent) {
        let isPrimary = false;
        if ((<any>e.target).classList.contains("btn-primary")) {
            isPrimary = true;
        }

        if (isStartPage() || isPrimary) {
            (<any>e.target).classList.remove("btn-default");
            (<any>e.target).classList.add("btn-primary");
        }
        else if (!isPrimary) {
            (<any>e.target).classList.add("btn-default");
            (<any>e.target).classList.remove("btn-primary");
        }
    }
}