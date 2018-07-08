import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IFuncionariosRequest {
  page: number;
  count: number;
}
interface IFuncionariosData {
  id?: number;
  name: string;
  description: string;
}

@Injectable()
export class FuncionariosService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IFuncionariosRequest): Promise<any> {
    return this.i._get('funcionarios', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('funcionarios/' + id, {});
  }

  public create(data: IFuncionariosData): Promise<any> {
    return this.i._post('funcionarios', data);
  }

  public update(data: IFuncionariosData): Promise<any> {
    return this.i._put('funcionarios/' + data.id, data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('funcionarios/' + id, {});
  }
}
