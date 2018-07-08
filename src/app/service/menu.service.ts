import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

@Injectable()
export class MenuService {
    constructor(public i: HttpClientInterceptor) { }
    public getMenus(): Promise<any> {
        return this.i._get('menus/list', {});
    }
}
