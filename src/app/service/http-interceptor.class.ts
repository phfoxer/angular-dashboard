import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastHelper } from 'app/helpers/toast.helper';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from 'environments/environment';

@Injectable()
export class HttpClientInterceptor extends HttpClient {
    private url: string = environment.api;
    protected token: string;
    constructor(
        private router: Router,
        private toast: ToastHelper,
        private hander: HttpHandler,
        private localStorage: LocalStorage
    ) { super(hander); }

    private async getToken(): Promise<string> {
        const token = await new Promise((resolve, reject) => {
            this.localStorage.getItem('token').subscribe((t) => {
                if (t) {
                    resolve(t);
                } else {
                    reject('');
                }
            });
        });
        return <string>token;
    }

    _put(url: string, body: any): Promise<any> {
        try {
            return new Promise(async (resolve, reject) => {
                const options = {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer ' + await this.getToken()
                    }
                };
                this.put(this.url + url, body, options).subscribe(
                    response => {
                        resolve(response);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        } catch (error) {
            this.toast.toast({
                icon: 'fa-warning',
                color: 'red',
                title: 'Erro na requisição web',
                message: error.message
            });
        }
    }

    _post(url: string, body: any): Promise<any> {
        try {
            return new Promise(async (resolve, reject) => {
                let options: any;
                try {
                    options = {
                        withCredentials: true,
                        headers: {
                            'Authorization': 'Bearer ' + await this.getToken()
                        }
                    };
                } catch (error) {
                    options = {};
                    this.toast.toast({
                        icon: 'fa-loading',
                        title: 'Carregando...',
                        message: 'Requisição não autenticada'
                    });
                }
                this.post(this.url + url, body, options).subscribe(
                    response => {
                        resolve(response);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        } catch (error) {
            this.toast.toast({
                icon: 'fa-warning',
                color: 'red',
                title: 'Erro na requisição web',
                message: error.message
            });
        }
    }

    _delete(url: string, params: any): Promise<any> {
        try {
            return new Promise(async (resolve, reject) => {
                const options = {
                    withCredentials: true,
                    params: params,
                    headers: {
                        'Authorization': 'Bearer ' + await this.getToken()
                    }
                };
                this.delete(this.url + url, options).subscribe(
                    response => {
                        resolve(response);
                    },
                    error => {
                        this.toast.toast({
                            icon: 'fa-warning',
                            color: 'red',
                            title: 'Sessão expirada',
                            message: 'Faça login novamente!'
                        });
                        localStorage.clear();
                        this.router.navigate(['/']);
                        reject(error);
                    }
                );
            });
        } catch (error) {
            this.toast.toast({
                icon: 'fa-warning',
                color: 'red',
                title: 'Erro na requisição web',
                message: error.message
            });
        }
    }

    _get(url: string, params: any): Promise<any> {
        try {
            return new Promise(async (resolve, reject) => {
                const options = {
                    withCredentials: true,
                    params: params,
                    headers: {
                        'Authorization': 'Bearer ' + await this.getToken()
                    }
                };
                this.get(this.url + url, options).subscribe(
                    response => {
                        resolve(response);
                    },
                    error => {
                        this.toast.toast({
                            icon: 'fa-warning',
                            color: 'red',
                            title: 'Sessão expirada',
                            message: 'Faça login novamente!'
                        });
                        localStorage.clear();
                        this.router.navigate(['/']);
                        reject(error);
                    }
                );
            });
        } catch (error) {
            this.toast.toast({
                icon: 'fa-warning',
                color: 'red',
                title: 'Erro na requisição web',
                message: error.message
            });
        }
    }
}
