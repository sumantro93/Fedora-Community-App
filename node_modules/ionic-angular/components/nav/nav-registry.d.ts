import { Type } from '@angular/core';
/**
 * @private
 * Map of possible pages that can be navigated to using an Ionic NavController
 */
export declare class NavRegistry {
    private _pages;
    constructor(pages?: Type[]);
    get(pageName: any): Type;
    set(page: any): void;
}
