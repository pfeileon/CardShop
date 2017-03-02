import { FilterService } from "../services/filter/filterService";

'use strict';

export interface IFilterButton {
    FilterService: FilterService;
}

export interface Filters {
    [filter: string]: Callback<HTMLElement, void>;
}

/**
 * Generic type for callback functions
 * @param {T} arg - generic argument
 * @return {TResult} - generic return type
 * */
export interface Callback<T, TResult> {
    (arg?: T): TResult;
}

export interface Record {
    (arg: string | string[]): string;
}

export interface Shopable {
    Key: string;
}

// HACK FOR FETCH-API
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