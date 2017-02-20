import { RenderService } from '../services/render/renderService';
import { luhnAlgorithm } from "../misc/utilities";
import { formTemplate } from "./formTemplate";

"use strict";

export const checkoutTemplate = (rService: RenderService) => {
    return `<article class="container">
        <h1 class="well">Checkout</h1>
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

    <div class="panel panel-default">

      <div class="panel-heading" role="tab" id="titlePD">
        <h4 class="panel-title">
          <a id="personalDataHeading" role="button" data-toggle="collapse" data-target="" data-parent="accordion">Personal Data</a>
        </h4>
      </div>

        <div id="collapsePD" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="titlePD">
            <div class="panel-body">
                ${formTemplate("personalData")}
            </div>
        </div>

    </div>

    <div class="panel panel-default">

        <div class="panel-heading">
            <h4 class="panel-title">
                <a id="creditCardDataHeading" role="button" data-toggle="collapse" data-target="" data-parent="accordion">Credit Card Data</a>
            </h4>
        </div>

        <div id="collapseCCD" class="panel-collapse collapse">
            <div class="panel-body">
                ${formTemplate("creditCardData")}
            </div>
        </div>
    </div>
    
</div>

    <!-- Modal -->
    <div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="checkoutModalLabel"></div>
    </article>`
}