import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IClientesRequest {
  page: number;
  count: number;
}
interface IClientesData {
  id?: number;
  name: string;
  description: string;
}

@Injectable()
export class ClientesService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IClientesRequest): Promise<any> {
    return this.i._get('clientes', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('clientes/' + id, {});
  }

  public create(data: IClientesData): Promise<any> {
    return this.i._post('clientes', data);
  }

  public update(data: IClientesData): Promise<any> {
    return this.i._put('clientes/' + data.id, data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('clientes/' + id, {});
  }
}
