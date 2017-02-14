import { RenderService } from '../modules/services/renderService';
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
                <form onsubmit="return false" id="personalData" role="form" data-toggle="validator" data-disable="true">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" class="form-control" name="firstName" placeholder="First name" required />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" class="form-control" name="lastName" placeholder="Last name" required />
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input id="address" type="text" class="form-control" name="address" placeholder="Address" required />
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input id="city" type="text" class="form-control" name="city" placeholder="City" required />
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <input id="country" type="text" class="form-control" name="country" placeholder="Country" required />
                    </div>
                    <div class="form-group">
                        <label for="zipCode">Zip-Code</label>
                        <input id="zipCode" type="text" class="form-control" name="zipCode" placeholder="Zip-Code" required />
                    </div>
                    <div class="form-group">
                        <label for="telephone">Telephone</label>
                        <input id="telephone" type="phone" class="form-control" name="telephone" placeholder="Telephone" required />
                    </div>
                    <div class="form-group">
                        <label for="checkoutCmail">Email</label>
                        <input id="checkoutCmail" type="email" class="form-control" name="checkoutEmail" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <label for="confirmEmail">Confirm Email</label>
                        <input id="confirmEmail" type="email" class="form-control" name="confirmEmail" placeholder="Confirm email" required />
                    </div>

                    <button id="cancelPD" type="button" class="btn btn-danger cancel-btn">Cancel</button>

                    <button data-toggle="collapse" data-target="#collapsePD" data-parent="#accordion" id="confirmPD" type="submit" class="btn btn-success confirm-btn" aria-expanded="true" aria-controls="collapsePD">
                        Confirm
                    </button>

                </form>
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
                <form onsubmit="return false" id="creditCardData" role="form" data-toggle="validator" data-disable="true">
                    <div class="form-group">
                        <label class="control-label" for="cardOwner">Card Number</label>
                        <input id="cardOwner" type="text" class="form-control" name="cardOwner" placeholder="Card holder's name" required />
                    </div>

                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input id="cardNumber" type="text" class="form-control" name="cardNumber" placeholder="Card number" required />
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="expiry-month">Expiration Date</label>
                        <div class="row">
                            <div class="col-xs-3">
                            <select class="form-control col-sm-2" name="expiry-month" id="expiry-month" required>
                                <option>Month</option>
                                <option value="01">Jan (01)</option>
                                <option value="02">Feb (02)</option>
                                <option value="03">Mar (03)</option>
                                <option value="04">Apr (04)</option>
                                <option value="05">May (05)</option>
                                <option value="06">June (06)</option>
                                <option value="07">July (07)</option>
                                <option value="08">Aug (08)</option>
                                <option value="09">Sep (09)</option>
                                <option value="10">Oct (10)</option>
                                <option value="11">Nov (11)</option>
                                <option value="12">Dec (12)</option>
                            </select>
                            </div>
                            <div class="col-xs-3">
                            <select class="form-control" name="expiry-year" required>
                                <option value="17">2017</option>
                                <option value="18">2018</option>
                                <option value="19">2019</option>
                                <option value="20">2020</option>
                                <option value="21">2021</option>
                                <option value="22">2022</option>
                                <option value="23">2023</option>
                                <option value="24">2023</option>
                                <option value="25">2023</option>
                                <option value="26">2023</option>
                                <option value="27">2023</option>
                            </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                    <label class="col-sm-3 control-label" for="cvv">Card CVV</label>
                        <input type="text" class="form-control" name="cvv" id="cvv" placeholder="Security code" required />
                    </div>

                    <button id="cancelCCD" data-toggle="collapse" data-target="#collapseCCD" type="button" class="btn btn-danger cancel-btn" aria-expanded="false" aria-controls="collapseCCD">Cancel</button>

                    <button data-parent="#accordion" id="confirmCCD" type="submit" class="btn btn-success confirm-btn">
                        Confirm
                    </button>
                
                </form>
            </div>
        </div>
    </div>
    
</div>


    </article>`
}