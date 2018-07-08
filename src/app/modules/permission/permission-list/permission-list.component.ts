import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { PermissionService } from 'app/modules/permission/permission.service';
import { MenuService } from 'app/modules/menu/menu.service';
import { ProfileService } from 'app/modules/profile/profile.service';

interface IPermissionFilter {
  id?: number;
  menu_id?: number;
  role_id?: number;
  count: number;
  page: number;
}

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  providers: [PermissionService, MenuService, ProfileService]
})
export class PermissionListComponent implements OnInit {
  PermissionList: any = [];
  modalConfirm: any = { show: false };
  pagination: any;
  filter: IPermissionFilter = <IPermissionFilter>{ menu_id: null, role_id: null };
  roles: any;
  menus: any;
  loaded: boolean;
  page: number = 1;
  constructor(
    private permissionService: PermissionService,
    private profileService: ProfileService,
    private toastProvider: ToastHelper,
    private menuService: MenuService
  ) {
    this.loadData();
  }

  public ngOnInit() {
    this.loaded = true;
    this.filter.count = 20;
    this.filter.page = this.page;
    this.permissionService.list(this.filter).then(result => {
      this.PermissionList = result.data;
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
      this.permissionService.delete(data.id).then(r => {
        const toast = {
          icon: 'check',
          title: 'Removido',
          message: 'Item removido com sucesso!'
        };
        this.toastProvider.toast(toast);
        this.ngOnInit();
        // case remove last item in last page return to previos page
        if (this.PermissionList.length === 1) {
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

  clearFilters() {
    this.filter = <IPermissionFilter> {};
    this.filter.page = this.page;
    this.ngOnInit();
  }

  setFilters() {
    this.ngOnInit();
  }

  private async loadData() {
    this.loaded = true;
    try {
      const roles = await this.profileService.list({ page: 1, count: 200 });
      const menus = await this.menuService.list({ page: 1, count: 200 });
      this.roles = roles.data;
      this.menus = menus.data;
      this.loaded = false;
    } catch (error) {
      const toast = {
        icon: 'error',
        title: 'Erro na leitura de dados',
        message: 'Tente novamente.'
      };
      this.toastProvider.toast(toast);
      this.loaded = false;
    }
  }
}
