'use strict';

let record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

export class Renderer {

    /** Returns content as string */
    render = (content: any): any => {
        return `${content}`;
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    insertList = (list: any[]): string => {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };
}
