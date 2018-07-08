import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IMenuRequest {
  page: number;
  count: number;
}
interface IMenuData {
  name: string;
  position: number;
}

@Injectable()
export class MenuService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IMenuRequest): Promise<any> {
    return this.i._get('menus/all', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('menus/show', { id: id });
  }

  public create(data: IMenuData): Promise<any> {
    return this.i._post('menus/create', data);
  }

  public update(data: IMenuData): Promise<any> {
    return this.i._put('menus/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('menus/delete', { id: id });
  }

  public getMenus(): Promise<any> {
      return this.i._get('menus/list', {});
  }

}
