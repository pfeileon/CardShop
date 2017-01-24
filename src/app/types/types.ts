import * as Utils from '../modules/utilities'
'use strict';

/** Generic type for callback functions */
export interface Callback<T, TResult> {
    (arg: T): TResult;
}

// Hack for fetch-API
export interface Headers { }
export interface Request { url: string, init?: Init }
export interface Response { json(); }
export interface Promise<T> { then; }

export interface Init {
    headers: Headers;
    method: string;
    mode?: string;
    cache?: string;
}

/** Defines a ready to render HTML-Template */
export interface Template {
    id: string,
    where: string,
    html: string
}

/** Generic interface for exported config constants */
export interface Config<S, T> {
    api: S;
    data: T;
}

/** Interface for Config.api */
export interface HearthstoneAPI {
    url: string;
    mashApeKey: string;
}

/** Interface for Config.data */
export interface HardcodedData {
    startPageData: {
        cardSets: string[];
    },
    setPreviewData: {
        cardSetName: string;
        heroes: string[],
        mana: number[]
    }
}

/** Abstract basis for classes which are normally only instantiated once during runtime */
export abstract class PseudoSingleton {
    private static exists: boolean;
    static readonly message: string = 'Are you sure that you want another instance?';
    abstract existsCheck(): void;
    constructor() {
        this.existsCheck();
    }
}