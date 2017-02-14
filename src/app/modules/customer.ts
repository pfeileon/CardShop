import { CreditCard } from './creditCard';
import { Shopable } from '../types/types';

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
    // public get FName(): string { return this.fName; }
    public set FName(fName: string) { this.fName = fName }

    // public get LName(): string { return this.lName; }
    public set LName(lName: string) { this.lName = lName; }

    // public get Address(): string { return this.address; }
    public set Address(address: string) { this.address = address; }

    // public get ZipCode(): string { return this.zipCode; }
    public set ZipCode(zipCode: string) { this.zipCode = zipCode; }

    // public get City(): string { return this.city; }
    public set City(city: string) { this.city = city; }

    // public get Country(): string { return this.country; }
    public set Country(country: string) { this.country = country; }

    // public get Tel(): string { return this.tel; }
    public set Tel(tel: string) { this.tel = tel; }

    // public get Email(): string { return this.email; }
    public set Email(email: string) { this.email = email; }

    /** The Customer's CreditCard */
    private creditCard: CreditCard;

    // public get CreditCard() { return this.creditCard; }
    public set CreditCard(creditCard) { this.creditCard = creditCard; }

    private items: Shopable[];

    constructor(items: Shopable[]) {
        this.items = items;
    }
}
