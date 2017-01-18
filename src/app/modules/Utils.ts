import { FetcherResource } from './FetcherResource';

'use strict';

/** Generic type for callback functions */
interface iCallback<T, TResult> {
    (item?: T): TResult;
}

/** A collection of static utility functions */
export class Utils {

// TODO
// clickElement here or in main.ts

    /** Click handler for HTMLElements */
    static clickElement(element: HTMLElement, callback: iCallback<any, void>) {
        element.addEventListener('click', (e) => {
            callback();
        });
    }

    /** Selection of the CardSet on the StartPage */
    static selectCardSet(cardSetName: string): void {
        let ul: any = document.getElementById('start-filters').children[1].children;

        for (let li of ul) {
            li.addEventListener('click', (e) => {
                cardSetName = e.target.attributes[0].value;
                document.getElementById('card-set-name').textContent = cardSetName;
                Utils.createHash(cardSetName);
            });
        }
    }

    static previewCardSet(): any {
        FetcherResource.getCardSet(Utils.getHashValue('#', 1))
            .then(data => {
                let cardSetData = data;
                console.log(cardSetData);
            })
    };

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