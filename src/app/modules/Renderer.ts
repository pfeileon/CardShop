'use strict';

/** static */
export class Renderer {

    /** Prevent instantiation */
    private constructor() {
        throw new Error("static class");
    }

    /** Renders content */
    static render(content: string): string {
        return this + ': ' + content;
    }
}