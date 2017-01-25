import { CreditCard } from './creditCard';

'use strict';

export class Customer {
    //Fields
    private fName: string;
    private lName: string;
    private address: string;
    private zipCode: string;
    private city: string;
    private country: string;
    private tel: string;
    private email: string;

    //Properties
    public get FName(): string { return this.fName; }
    public set FName(fName: string) { this.fName = fName }
    public get LName(): string { return this.lName; }
    public set LName(lName: string) { this.lName = lName; }
    // TODO: other Getters and Setters

    /** The Customer's CreditCard */
    private creditCard: CreditCard;
}
