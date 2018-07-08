import { Injectable } from '@angular/core';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

interface IProfileRequest {
  page: number;
  count: number;
}
interface IProfileData {
  id?: number;
  name: string;
  description: string;
}

@Injectable()
export class ProfileService {

  constructor(public i: HttpClientInterceptor) { }

  public list(data: IProfileRequest): Promise<any> {
    return this.i._get('profile', data);
  }

  public show(id: number): Promise<any> {
    return this.i._get('profile/' + id, {});
  }

  public create(data: IProfileData): Promise<any> {
    return this.i._post('profile', data);
  }

  public update(data: IProfileData): Promise<any> {
    return this.i._put('profile/' + data.id, data);
  }

  public delete(id: number): Promise<any> {
    return this.i._delete('profile/' + id, {});
  }
}
