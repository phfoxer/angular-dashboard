import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IPermissionActionRequest {
  page: number;
  count: number;
}
interface IPermissionActionData {
  name: string;
  description: string;
}

@Injectable()
export class PermissionActionService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IPermissionActionRequest): Promise<any> {
    return this.i._get('permission-action/list', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('permission-action/show', { id: id });
  }

  public create(data: IPermissionActionData): Promise<any> {
    return this.i._post('permission-action/create', data);
  }

  public update(data: IPermissionActionData): Promise<any> {
    return this.i._put('permission-action/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('permission-action/delete', { id: id });
  }
}
