import { Callback, Promise, Request, Response, Template } from '../types/types'
declare const fetch;

// A collection of static utility functions

'use strict';

/** Click handler for HTMLElements */
export function clickElement(element: HTMLElement, callback: Callback<MouseEvent, void>): void {
    element.addEventListener('click', (e) => {
        callback(e);
    });
}

/** Iterate an UL(HTMLCollection) and doStuff per LI */
export function iterateUl(ul: any, doStuff: Callback<HTMLElement, void>): void {
    for (let li of ul) {
        doStuff(li);
    }
}

/** Adds an encoded hash-value to the URL */
export function createHash(filters: string): void {
    if (filters != null) {
        window.location.hash = encodeURI(`#${filters}`)
    }
    else {
        window.location.hash = '#';
    }
}

/** Returns the string after the hash */
export function getHashValue(seperator: string, pos: number): string {
    return decodeURI(window.location.hash).split(seperator)[pos]
}

/** Inserts all templates of the passed array */
export function insertAllTemplates(templates: Template[]): void {
    for (let template of templates) {
        this.insertTemplate(template)
    }
}

/** Generic Fetch-Method */
export function fetchAsync<T extends Request>(arg: T): Promise<T> {
    return fetch(arg.url, arg.init)
        .then((response: Response) => response.json());
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
