import { RenderService } from '../modules/services/renderService';
import { StorageService } from '../modules/services/storageService';
import { ShoppingCart } from "../modules/shoppingCart";
"use strict";

export const shoppingCartModal = (cart: ShoppingCart, rService: RenderService, sService: StorageService) => {
    return `<div id=" ${rService.insertList((<any>Array).from(sService.itemStorage(cart.Items)))}"></div>
    `}