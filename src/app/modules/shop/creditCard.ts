import { luhnAlgorithm } from '../misc/utilities';

'use strict';

export class CreditCard {

    //Properties
    private owner: string;
    private cardNumber: string;
    private validThru: Date;
    private cardSecCode: number;

    public get Owner() { return this.owner; }
    public set Owner(owner) { this.owner = owner; }

    public get CardNumber() { return this.cardNumber; }
    public set CardNumber(cardNumber) { this.cardNumber = cardNumber; }

    public get ValidThru() { return this.validThru; }
    public set ValidThru(validThru) { this.validThru = validThru; }

    public get CardSecCode() { return this.cardSecCode; }
    public set CardSecCode(cardSecCode) { this.cardSecCode = cardSecCode; }

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
        return luhnAlgorithm(cardNumber);
    }
}
