import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IPermissionRequest {
  page: number;
  count: number;
  menu_id?: number;
  role_id?: number;
}

interface IPermissionData {
  id?: number;
  menu_id: number;
  role_id: number;
  permissions: any[];
}

@Injectable()
export class PermissionService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IPermissionRequest): Promise<any> {
    return this.i._get('menupermissions/list', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('menupermissions/show', { id: id });
  }

  public create(data: IPermissionData): Promise<any> {
    return this.i._post('menupermissions/create', data);
  }

  public update(data: IPermissionData): Promise<any> {
    return this.i._put('menupermissions/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('menupermissions/delete', { id: id });
  }
}
