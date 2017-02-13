import { RenderService } from '../modules/services/renderService';
"use strict";

export const checkoutTemplate = (rService: RenderService) => {
    return `<article class="container">

    <h1 class="well">Checkout</h1>
    
    <form id="personal-data">
            <div class="form-group">
                <label for="first-name">First Name</label>
                <input id="first-name" type="text" class="from-control" name="first-name" placeholder="First name" />
            </div>
            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input id="last-name" type="text" class="from-control" name="last-name" placeholder="Last name" />
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input id="address" type="text" class="from-control" name="address" placeholder="Address" />
            </div>
            <div class="form-group">
                <label>Town</label>
                <input id="town" type="text" class="from-control" name="town" placeholder="Town" />
            </div>
            <div class="form-group">
                <label for="country">Country</label>
                <input id="country" type="text" class="from-control" name="country" placeholder="Country" />
            </div>
            <div class="form-group">
                <label for="zip-code">Zip-Code</label>
                <input id="zip-code" type="text" class="from-control" name="zip-code" placeholder="Zip-Code" />
            </div>
            <div class="form-group">
                <label for="telephone">Telephone</label>
                <input id="telephone" type="text" class="from-control" name="telephone" placeholder="Telephone" />
            </div>
            <div class="form-group">
                <label for="checkout-email">Email</label>
                <input id="checkout-email" type="email" class="from-control" name="email" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="confirm-email">Confirm Email</label>
                <input id="confirm-email" type="email" class="from-control" name="email" placeholder="Confirm email" />
            </div>
        <button id="cancel-btn" type="button" class="btn btn-danger">Cancel</button>
        <button id="confirm-btn" type="submit" class="btn btn-success">Confirm</button>
    </form>

    </article>`
}