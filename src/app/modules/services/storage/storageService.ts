"use strict";

export abstract class StorageService {
    abstract populateStorage(any: any): void;
    abstract loadStorage(any: any): void;

    storageInit(itemId: string, any: any) {
        if (localStorage.getItem(itemId) === null || undefined) {
            this.populateStorage(any);
        }
        else {
            this.loadStorage(any);
        }
    }
}