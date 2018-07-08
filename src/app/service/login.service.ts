import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface ILogin {
  email: string;
  password: string;
}

@Injectable()
export class LoginService {

  constructor(public i: HttpClientInterceptor) {

  }

  public login(data: ILogin): Promise<any> {
    return this.i._post('login', data);
  }

}
