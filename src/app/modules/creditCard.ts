import * as Utils from './utilities'

'use strict';

export class CreditCard {

    //Properties
    private owner: string;
    private cardNumber: string;
    private validThru: Date;
    private cardSecCode: number;

    //Methods
    /** Carges the CreditCard */
    chargeCard(amount: number): void {
        //Check if card is valid
        if (this.validateCreditCard(this.cardNumber)) {
            //Implementation of charge
        }
    }

    /** CreditCard-Validation */
    private validateCreditCard(cardNumber: string): boolean {

        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(cardNumber)) {
            return false;
        }

        //true or false
        return Utils.luhnAlgorithm(cardNumber);
    }
}
