import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IPessoasRequest {
  page: number;
  count: number;
}

interface IPessoasData {
  nome: string;
  cpf?: string;
  email: string;
  telefones?: any[];
  id?: number;
}

@Injectable()
export class PessoasService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IPessoasRequest): Promise<any> {
    return this.i._get('pessoas/list', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('pessoas/show', { id: id });
  }

  public create(data: IPessoasData): Promise<any> {
    return this.i._post('pessoas/create', data);
  }

  public update(data: IPessoasData): Promise<any> {
    return this.i._put('pessoas/update', data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('pessoas/delete', { id: id });
  }
}
