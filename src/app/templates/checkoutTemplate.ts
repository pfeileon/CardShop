import { RenderService } from '../modules/services/renderService';
"use strict";

export const checkoutTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1 class="well">Checkout</h1>

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

    <div class="panel panel-default">

      <div class="panel-heading" role="tab" id="titlePD">
        <h4 class="panel-title">
          Personal Data
        </h4>
      </div>

        <div id="collapsePD" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="titlePD">
            <div class="panel-body">
                <form id="personalData">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" class="form-control" name="firstName" placeholder="First name" />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" class="form-control" name="lastName" placeholder="Last name" />
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input id="address" type="text" class="form-control" name="address" placeholder="Address" />
                    </div>
                    <div class="form-group">
                        <label>Town</label>
                        <input id="town" type="text" class="form-control" name="town" placeholder="Town" />
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <input id="country" type="text" class="form-control" name="country" placeholder="Country" />
                    </div>
                    <div class="form-group">
                        <label for="zipCode">Zip-Code</label>
                        <input id="zipCode" type="text" class="form-control" name="zipCode" placeholder="Zip-Code" />
                    </div>
                    <div class="form-group">
                        <label for="telephone">Telephone</label>
                        <input id="telephone" type="text" class="form-control" name="telephone" placeholder="Telephone" />
                    </div>
                    <div class="form-group">
                        <label for="checkoutCmail">Email</label>
                        <input id="checkoutCmail" type="email" class="form-control" name="checkoutEmail" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label for="confirmEmail">Confirm Email</label>
                        <input id="confirmEmail" type="email" class="form-control" name="confirmEmail" placeholder="Confirm email" />
                    </div>

                    <button id="cancelPD" type="button" class="btn btn-danger cancel-btn">Cancel</button>

                    <button data-toggle="collapse" data-target="#collapsePD" data-parent="#accordion" id="confirm-btn" type="button" class="btn btn-success" aria-expanded="true" aria-controls="collapsePD">
                        Confirm
                    </button>

                </form>
            </div>
        </div>

    </div>

    <div class="panel panel-default">

        <div class="panel-heading">
            <h4 class="panel-title">
                Credit Card Data
            </h4>
        </div>

        <div id="collapseCCD" class="panel-collapse collapse">
            <div class="panel-body">
                <form id="creditCardData">

                    <div class="form-group">
                    </div>

                    <button id="cancelCCD" type="button" class="btn btn-danger cancel-btn">Cancel</button>

                    <button data-toggle="collapse" data-target="#collapseCCD" data-parent="#accordion" id="confirm-btn" type="button" class="btn btn-success" aria-expanded="true" aria-controls="collapseCCD">
                        Confirm
                    </button>

                </form>
            </div>
        </div>
    </div>
    
</div>


    </article>`
}