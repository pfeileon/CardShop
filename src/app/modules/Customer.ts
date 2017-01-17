import { CreditCard } from './CreditCard'

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
    public get Fname(): string { return this.fname; }
    public set Fname(fname: string) { this.fname = fname }
    public get Lname(): string { return this.lname; }
    public set Lname(lname: string) { this.lname = lname; }
    // TODO: other Getters and Setters

    /** The Customer's CreditCard */
    private creditCard: CreditCard;
}