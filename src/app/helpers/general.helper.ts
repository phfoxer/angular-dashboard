import { Injectable } from '@angular/core';

@Injectable()
export class GeneralHelper {
    constructor() { }
    public generalPrint(divName: string) {
        const printContents = document.getElementById(divName).innerHTML;
        const printArea = document.getElementById('printArea');
        printArea.innerHTML = printContents;
        window.print();
        printArea.innerHTML = '';
    }
}
