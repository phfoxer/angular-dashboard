import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { StorageHelper } from 'app/helpers/storage.helper';
@Injectable()
export class AuthGuard implements CanActivateChild {
    private response: boolean;
    constructor(
        private storageHelper: StorageHelper,
        private localStorage: LocalStorage
    ) { }

    private async getToken(): Promise<string> {
        const token = await new Promise((resolve, reject) => {
            this.localStorage.getItem('token').subscribe((t) => {
                if (t) {
                    resolve(t);
                } else {
                    reject(null);
                }
            });
        });
        return <string>token;
    }

    async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
        if (route.url.length > 0) {
            const rt: any = route;
            const state: RouterStateSnapshot = rt._routerState;
            await this.storageHelper.storePermission(state.url);
            await this.getToken().then(r => {
                this.response = (r) ? true : false;
            });
        }
        return this.response;
    }
}
