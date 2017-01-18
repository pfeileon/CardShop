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

    /** Renders content */
    static render(content: string): string {
        return `${this}: ${content}`;
    }

    /** Renders an <ul> with the passed array */
    static insertList = (list: any[]): string => {
        return `<ul>${list.map(item => record(item)).join('')}</ul>`;
    };
}