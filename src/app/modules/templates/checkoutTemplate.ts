import { RenderService } from '../services/render/renderService';
import { luhnAlgorithm } from "../misc/utilities";
import { formTemplate } from "./formTemplate";
import { accordionTemplate } from "./accordionTemplate";
import { validate } from "../misc/customJQ";

"use strict";

export const checkoutTemplate = (rService: RenderService) => {
    return `<article class="container">
        <h1 id="checkoutHeader" class="well">Checkout</h1>      
        ${accordionTemplate(formTemplate)}
<footer id="checkoutFooter">
    <!-- Modal -->
</footer>

</article>`
}