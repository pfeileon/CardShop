import { Filters } from "../../types/types";
import { config } from "../../config/config";
import { getHashValue, iterateList } from "../../misc/utilities";

"use strict";

export abstract class FilterService {
    protected abstract readonly filterChecks = {};

    /** Activates the filters */
    initFilters(filters: Filters): void {
        for (let filter in filters) {
            this.applyFilter(filter, filters[filter]);
        }
    }

    /** Iterates an array of HTMLElements by class (= `${filter}-filter`) and applies the filter */
    applyFilter(filter: string, apply = (arg: HTMLElement) => { }): void {
        for (let item of <any>document.getElementsByClassName(`${filter}-filter`)) {
            iterateList(item.children[1].children, apply);
        }
    }

    checkFilters(): {} {
        let filters = this.getFilters();
        for (let filter in this.filterChecks) {
            filters = this.filterChecks[filter](filters);
        }
        return filters;
    }

    getFilters(): {} {
        const hashValue = getHashValue();
        let filters: {};
        if (hashValue !== undefined && (<any>hashValue).includes("/{")) {
            filters = JSON.parse(hashValue.split("/")[1]);
        }
        else {
            filters = hashValue;
        }
        return filters;
    }
}