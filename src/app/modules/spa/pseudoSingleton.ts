'use strict';

/** Abstract basis for classes which are normally only instantiated once during runtime */
export abstract class PseudoSingleton {
    // PROPERTIES
    static readonly message: string = 'Are you sure that you want another instance?';
    
    // CONSTRUCTOR
    /** !Implement >>ctorArg:{ exists: boolean, message: string}<< as static with "exists" as static and get "message" from superclass! */
    constructor(ctorArg: {exists: boolean, message: string}) {
        this.existsCheck(ctorArg);
    }
    
    // METHODS
    existsCheck(ctorArg: {exists: boolean, message: string}): this {
        if (ctorArg.exists === true) {
            console.log(ctorArg.message);
        }
        ctorArg.exists = true;
        return this;
    }
}