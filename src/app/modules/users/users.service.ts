import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IUsersRequest {
  page: number;
  count: number;
}

interface IUsersData {
  id?: number;
  name?: string;
  email?: string;
  file?: any;
}

@Injectable()
export class UsersService {

  constructor(private i: HttpClientInterceptor) { }

  public list(data: IUsersRequest): Promise<any> {
    return this.i._get('user/list', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('user/show', { id: id });
  }

  public create(data: IUsersData): Promise<any> {
    return this.i._post('user/create', data);
  }

  public upload(data: IUsersData): Promise<any> {
    return this.i._put('user/set-user', data);
  }

  public update(data: IUsersData): Promise<any> {
    return this.i._put('user/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('user/delete', { id: id });
  }
}
