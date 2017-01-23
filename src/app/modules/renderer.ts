'use strict';

let record = (item) => {
    return `<li data-id="${item}">${item}</li>`;
};

/** static */
export class Renderer {

    /** Prevent instantiation */
    private constructor() {
        throw new Error("static class");
    }

    /** Returns content as string */
    static render(content: any): any {
        return `${content}`;
    }

    /** Inserts an <ul> with the passed array as <li>-elements */
    static insertList = (list: any[]): string => {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };
}
