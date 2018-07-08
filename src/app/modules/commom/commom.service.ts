import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface ICidade {
    id?: number;
    nome?: string;
    count?: number;
    estado_id?: number;
}

@Injectable()
export class CommomService {

    constructor(public i: HttpClientInterceptor) { }

    public cidades(data: ICidade): Promise<any> {
        return this.i._get('cidades/list', data);
    }

    public estados(data: ICidade): Promise<any> {
        return this.i._get('estados/list', data);
    }
}
