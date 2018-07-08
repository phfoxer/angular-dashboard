import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { MenuService } from '../menu.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  providers: [MenuService]
})
export class MenuListComponent implements OnInit {
  MenuList: any = [];
  pagination: any;
  page: number = 1;
  modalConfirm: any = { show: false };
  loaded: boolean;
  permission: IPermission = <IPermission>{};
  constructor(
    private menuService: MenuService,
    private toastProvider: ToastHelper,
    private localStorage: LocalStorage
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  public ngOnInit() {
    this.loaded = true;
    this.menuService.list({ page: this.page, count: 20 }).then(result => {
      this.MenuList = result.data;
      this.pagination = {
        current_page: result.current_page,
        last_page: result.last_page,
        per_page: result.per_page,
        total: result.total
      };
      this.loaded = false;
    }).catch(e => {
      const toast = {
        icon: 'error',
        title: 'Erro ao salvar!',
        message: 'Nenhum dado foi salvo.'
      };
      this.toastProvider.toast(toast);
    });
  }

  public paginate(page: number) {
    this.page = page;
    this.ngOnInit();
  }

  public deleteIt(e: Event, data: any) {
    this.modalConfirm = {
      show: true,
      id: data.id,
      title: 'Apagar registro',
      text: 'Deseja excluir definitivamente esse registro?'
    };
    e.stopPropagation();
  }

  public confirmDelete(data: any) {
    this.modalConfirm = { show: false };
    if (data.confirm) {
      this.menuService.delete(data.id).then(r => {
        const toast = {
          icon: 'check',
          title: 'Removido',
          message: 'Item removido com sucesso!'
        };
        this.toastProvider.toast(toast);
        this.ngOnInit();
        // case remove last item in last page return to previos page
        if (this.MenuList.length === 1) {
          const p = (this.page - 1);
          this.page = (p > 0) ? p : 1;
          this.ngOnInit();
        }
      }).catch(e => {
        const toast = {
          icon: 'error',
          title: 'Não foi removido',
          message: 'Nenhum dado foi removido, tente novamente.'
        };
        this.toastProvider.toast(toast);
      });
    }
  }


}
