import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastHelper } from 'app/helpers/toast.helper';
import { MenuService } from 'app/modules/menu/menu.service';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';

@Injectable()
export class StorageHelper {
    private permission: IPermission = <IPermission>{};
    constructor(
        private toast: ToastHelper,
        private localStorage: LocalStorage,
        private interceptor: HttpClientInterceptor
    ) { }

    public async storeMenu() {
        const storeMenu = await new Promise((resolve, reject) => {
            const menuService = new MenuService(this.interceptor);
            menuService.getMenus().then(r => {
                this.localStorage.setItem('_menu_storage', r).subscribe((stored) => {
                    if (stored) {
                        resolve(r);
                    }
                });
            }).catch(e => {
                reject(e);
            });
        });
        return storeMenu;
    }

    public async storePermission(url: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.permission = <IPermission>{};
            const segment: string[] = url.split('/');
            if (segment && segment[2]) {
                url = segment[1] + '/' + segment[2];
                await this.localStorage.getItem('_menu_storage').subscribe(async (menu) => {
                    await menu.map(p => {
                        if (p.link && p.link.indexOf(url) > -1) {
                            this.permission = p.permission;
                        }
                        if (p.soons.length > 0) {
                            p.soons.map(c => {
                                if (c.link && c.link.indexOf(url) > -1) {
                                    this.permission = c.permission;
                                }
                            });
                        }
                    });
                    this.permission = (this.permission === null) ? {} : this.permission;
                    await this.localStorage.setItem('permission', this.permission).subscribe(() => {
                        resolve(this.permission);
                    });
                });
            } else {
                reject(null);
            }
        });
    }
}
