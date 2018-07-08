import { Component, OnInit } from '@angular/core';
import { PermissionActionService } from 'app/modules/permissionAction/permissionAction.service';
import { ToastHelper } from 'app/helpers/toast.helper';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { GeneralHelper } from 'app/helpers/general.helper';

@Component({
  selector: 'app-permissionAction-list',
  templateUrl: './permissionAction-list.component.html',
  styleUrls: ['./permissionAction-list.component.scss'],
  providers: [PermissionActionService]
})
export class PermissionActionListComponent implements OnInit {

  modalConfirm: any = { show: false };
  PermissionActionList: any = [];
  permission: IPermission = <IPermission>{};
  pagination: any;
  loaded: boolean;
  filter: any = {};
  page: number = 1;

  constructor
    (
    private permissionActionService: PermissionActionService,
    private toastProvider: ToastHelper,
    private generalHelper: GeneralHelper,
    private localStorage: LocalStorage,
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  public ngOnInit() {
    this.loaded = true;
    this.filter.count = 20;
    this.filter.page = this.page;
    this.permissionActionService.list(this.filter).then(result => {
      this.PermissionActionList = result.data;
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
      this.permissionActionService.delete(data.id).then(r => {
        const toast = {
          icon: 'check',
          title: 'Removido',
          message: 'Item removido com sucesso!'
        };
        this.toastProvider.toast(toast);
        this.ngOnInit();
        // case remove last item in last page return to previos page
        if (this.PermissionActionList.length === 1) {
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
    this.filter = {};
    this.filter.page = this.page;
    this.ngOnInit();
  }

  setFilters() {
    this.ngOnInit();
  }

  printIt(element: string) {
    this.generalHelper.generalPrint(element);
  }

}
