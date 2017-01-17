'use strict'

/** The Luhn-Algorithm for CreditCard-Validation */
export function LuhnAlgorithm(value: string) {
    
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