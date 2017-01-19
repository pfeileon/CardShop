import * as config from '../config/config';

'use strict';

/** Generic type for callback functions */
interface Callback<T, TResult> {
    (item?: T): TResult;
}

/** A collection of static utility functions */
export class Utils {

    // TODO
    // clickElement here or in main.ts

    /** Click handler for HTMLElements */
    static clickElement(element: HTMLElement, callback: Callback<any, void>): void {
        element.addEventListener('click', (e) => {
            callback(e);
        });
    }

    /** Iterate an UL(HTMLCollection) and doStuff per LI */
    static iterateUl(ul: any, doStuff: Callback<any, any>): void {
        for (let li of ul) {
            doStuff(li);
        }
    }

    /** Adds an encoded hash-value to the URL */
    static createHash(filters: string): void {
        if (filters != null) {
            window.location.hash = encodeURI(`#${filters}`)
        }
        else {
            window.location.hash = '#';
        }
    }

    /** Returns the string after the hash */
    static getHashValue(seperator: string, pos: number): string {
        return decodeURI(window.location.hash).split(seperator)[pos]
    }

    /** The Luhn-Algorithm for CreditCard-Validation */
    static luhnAlgorithm(value: string) {

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
}