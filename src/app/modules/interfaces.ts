'use strict';

/** Generic type for callback functions */
export interface Callback<T, TResult> {
    (item?: T): TResult;
}