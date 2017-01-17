'use strict'

/** Function for inserting a template */
export function InsertTemplate(id: string, where: string, html: string) {
    let htmlCode: HTMLElement = document.getElementById(id);
    htmlCode.insertAdjacentHTML(where, html);
}