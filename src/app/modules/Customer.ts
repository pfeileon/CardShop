import { CreditCard } from './creditCard'

'use strict';

export class Customer {
    //Fields
    private fname: string;
    private lname: string;
    private address: string;
    private zipCode: string;
    private city: string;
    private country: string;
    private tel: string;
    private email: string;
    
    //Properties
    public get fName(): string { return this.fname; }
    public set fName(fname: string) { this.fname = fname }
    public get lName(): string { return this.lname; }
    public set lName(lname: string) { this.lname = lname; }
    // TODO: other Getters and Setters

    /** The Customer's CreditCard */
    private creditCard: CreditCard;
}