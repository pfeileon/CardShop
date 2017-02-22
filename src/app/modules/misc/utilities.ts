import { Callback, Promise, Request, Response } from '../types/types'
declare const fetch;

// A collection of utility functions

'use strict';

/** Iterate an UL(HTMLCollection) and doStuff per LI */
export function iterateUl(ul: any, doStuff: Callback<HTMLElement, void>): void {
    for (let li of ul) {
        doStuff(li);
    }
}

/** Adds an encoded hash-value to the URL */
export function createHash(filters: string): void {
    if (filters !== undefined) {
        window.location.hash = encodeURI(`#${filters}`)
    }
    else {
        window.location.hash = '#';
    }
}

/** Returns the string after the hash */
export function getHashValue(seperator: string = "#", pos: number = 1): string {
    return decodeURI(window.location.hash).split(seperator)[pos]
}

/** Fakes a hashchange in order to update the content */
export function fakeHashchange(): void {
    let hashValue: string = getHashValue();
    createHash(hashValue + "fake");
    createHash(hashValue);
}

/** The Luhn-Algorithm for CreditCard-Validation */
export function luhnAlgorithm(value: string) {

    let nCheck: number = 0;
    let nDigit: number = 0;
    let bEven: boolean = false;

    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit: string = value.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) {
                nDigit -= 9;
            }
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}

/** Toggles the class value of a specified HTMLElement */
export function toggleCssClass(id: string, cssClass: string = "no-display"): void {
    document.getElementById(id).classList.toggle(cssClass);
}

export function getFilters(): {} {
    const hashValue = getHashValue();
    let filters: {};
    if (hashValue !== undefined && (<any>hashValue).includes("/{")) {
        filters = JSON.parse(hashValue.split("/")[1]);
    }
    else {
        filters = hashValue;
    }
    return filters;
}

export function getCardSetFilter(): string {
    let temp = JSON.stringify(getFilters());
    if (temp !== undefined) {
        if ((<any>temp).includes("{")) {
            temp = getFilters()["cardSet"];
        }
        else {
            temp = temp.replace(/"/g, "");
        }
    }
    return temp;
}

export function getHeroFilter(): string {
    let temp = getFilters()["hero"];
    return temp;
}

export function getManaFilter(): string {
    let temp = getFilters()["manaCost"];
    return temp;
}

/** Determines if the user is on the start page */
export function isStartPage(): boolean {
    let hashValue = getHashValue();
    let isStart = true;
    if (hashValue !== undefined && ((<any>hashValue).includes("/"))) {
        isStart = false;
    }
    return isStart;
}