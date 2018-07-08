import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IPermissionTypeRequest {
  page: number;
  count: number;
}
interface IPermissionTypeData {
  name: string;
  description: string;
}

@Injectable()
export class PermissionTypeService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IPermissionTypeRequest): Promise<any> {
    return this.i._get('permission-type/list', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('permission-type/show', { id: id });
  }

  public create(data: IPermissionTypeData): Promise<any> {
    return this.i._post('permission-type/create', data);
  }

  public update(data: IPermissionTypeData): Promise<any> {
    return this.i._put('permission-type/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('permission-type/delete', { id: id });
  }
}
