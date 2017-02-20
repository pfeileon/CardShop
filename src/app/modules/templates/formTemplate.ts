"use strict";

export const formTemplate = (id: string) => {
    let form = `<form onsubmit="return false" id="${id}" role="form" data-disable="true">`;
    let abbr: string;
    if (id === "personalData") {
        form += personalData();
        abbr = "PD"
    }
    else if (id === "creditCardData") {
        form += creditCardData();
        abbr = "CCD";
    }
    form += checkoutBtnSnippet(abbr);
    return form;
}

const checkoutBtnSnippet = (id: string) => {
    return `<button id="cancel${id}" type="button" class="btn btn-danger cancel-btn">Cancel</button>

                    <button data-toggle="collapse" data-target="#collapse${id}" data-parent="#accordion" id="confirm${id}" type="submit" class="btn btn-success confirm-btn" aria-expanded="true" aria-controls="collapse${id}">
                        Confirm
                    </button>`;
}

const personalData = () => {
    return `<div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" class="form-control" name="firstName" placeholder="First name" pattern="\\D{0,35}" required />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" class="form-control" name="lastName" placeholder="Last name" pattern="\\D{0,35}" required />
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input id="address" type="text" class="form-control" name="address" placeholder="Address" required />
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input id="city" type="text" class="form-control" name="city" placeholder="City" pattern="\\D{0,35}" required />
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
                        <label for="checkoutEmail">Email</label>
                        <input id="checkoutEmail" type="email" class="form-control" name="checkoutEmail" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <label for="confirmEmail">Confirm Email</label>
                        <input id="confirmEmail" type="email" class="form-control" name="confirmEmail" placeholder="Confirm email" required />
                    </div>`;
}

const creditCardData = () => {
    return `<div class="form-group">
                        <label class="control-label" for="cardOwner">Card Owner</label>
                        <input id="cardOwner" type="text" class="form-control" name="cardOwner" placeholder="Card holder's name" pattern="\\D{0,35}" required />
                    </div>

                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input id="cardNumber" type="text" class="form-control" name="cardNumber" placeholder="Card number" data-luhn="luhn" required />
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="expiryMonth">Expiration Date</label>
                        <div class="row">
                            ${monthOption}
                            ${yearOption}
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="cVV">Card CVV</label>
                        <input type="text" class="form-control" name="cVV" id="cVV" placeholder="Security code" pattern="\\d{3,3}" required />
                    </div>`;
}

const monthOption = `<select class="form-control name="expiryMonth" id="expiryMonth" required>
        <option>Month</option>
        <option value="01">Jan (01)</option>
        <option value="02">Feb (02)</option>
        <option value="03">Mar (03)</option>
        <option value="04">Apr (04)</option>
        <option value="05">May (05)</option>
        <option value="06">Jun (06)</option>
        <option value="07">Jul (07)</option>
        <option value="08">Aug (08)</option>
        <option value="09">Sep (09)</option>
        <option value="10">Oct (10)</option>
        <option value="11">Nov (11)</option>
        <option value="12">Dec (12)</option>
    </select>
`;

const yearOption = `<select class="form-control" name="expiryYear" id="expiryYear" required>
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
`;