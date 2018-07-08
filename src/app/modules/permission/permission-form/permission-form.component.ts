import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PermissionService } from 'app/modules/permission/permission.service';
import { MenuService } from 'app/modules/menu/menu.service';
import { ProfileService } from 'app/modules/profile/profile.service';
import { StorageHelper } from 'app/helpers/storage.helper';
import { PermissionActionService } from 'app/modules/permissionAction/permissionAction.service';

interface IPermissionForm {
  permissions: any[];
  permission: IPermission;
  menu_id: number;
  role_id: number;
  id?: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
  providers: [PermissionService, MenuService, ProfileService, PermissionActionService]
})
export class PermissionFormComponent implements OnInit {
  permission: IPermissionForm = <IPermissionForm>{};
  loaded: boolean;
  roles: any;
  menus: any;
  permissionAction: any;
  c: number = 1;
  constructor(
    private permissionActionService: PermissionActionService,
    private permissionService: PermissionService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private storageHelper: StorageHelper,
    private toastProvider: ToastHelper,
    private menuService: MenuService,
    public router: Router
  ) {

  }

  async ngOnInit() {
    this.editIt();
    this.loadData();
    this.permission = {
      permissions: [],
      permission: <IPermission>{},
      menu_id: null,
      role_id: null,
      id: null
    };
  }

  private async editIt() {
    await this.activatedRoute.params.subscribe(async params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        await this.permissionService.show(id).then(permission => {
          this.permission = {
            permissions: permission.permissions,
            permission: <IPermission>permission.permission,
            menu_id: permission.menu_id,
            role_id: permission.role_id,
            id: permission.id
          };
          this.loaded = false;
        });
      } else {
        this.loaded = true;
      }
    });
  }

  private async loadData() {
    this.loaded = true;
    try {
      const roles = await this.profileService.list({ page: 1, count: 200 });
      const menus = await this.menuService.list({ page: 1, count: 200 });
      const permissionAction = await this.permissionActionService.list({ page: 1, count: 200 });
      this.roles = roles.data;
      this.menus = menus.data;
      this.permissionAction = permissionAction.data;
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

  private onCreate(e: Event) {
    if (this.permission.menu_id > 0 && this.permission.role_id > 0 && this.permission.permissions.length > 0) {
      this.loaded = true;
      this.permissionService.create(this.permission).then(result => {
        const toast = {
          icon: 'check',
          type: 'success',
          title: 'Registro salvo com sucesso!',
          message: 'O registro foi salvo sem erros'
        };
        this.toastProvider.toast(toast);
        this.loaded = false;
      }).catch(error => {
        const toast = {
          icon: 'error',
          title: 'Erro ao salvar!',
          message: 'Nenhum dado foi salvo.'
        };
        this.toastProvider.toast(toast);
        this.loaded = false;
      });

      e.preventDefault();
    } else {
      const toast = {
        type: 'error',
        color: 'red',
        icon: 'error',
        title: 'Validação',
        message: 'Favor verificar os campos obrigatórios.'
      };
      this.toastProvider.toast(toast);
    }
  }

  public onSubmit(e: Event) {
    if (this.permission.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
    this.storageHelper.storeMenu().then(r => { });
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.permissionService.update(this.permission).then(result => {
      const toast = {
        icon: 'check',
        type: 'success',
        title: 'Registro salvo com sucesso!',
        message: 'O registro foi salvo sem erros'
      };
      this.toastProvider.toast(toast);
      this.editIt();
      this.loaded = false;
    }).catch(error => {
      const toast = {
        icon: 'error',
        title: 'Erro ao salvar!',
        message: 'Nenhum dado foi salvo.'
      };
      this.toastProvider.toast(toast);
      this.loaded = false;
    });
    e.preventDefault();
  }

  roleSelected(role: any) {
    this.permission.role_id = role.id;
  }

  menuSelected(menu: any) {
    this.permission.menu_id = menu.id;
  }

  setPermission(value: boolean, name: string) {
    this.permission.permissions = (!this.permission.permissions) ? [] : this.permission.permissions;
    this.permission.permissions = this.permission.permissions.filter((permission) => {
      return (permission.name === name) ? false : permission;
    });
    if (value) {
      this.permission.permissions.push({ name: name, value: value });
    }
  }
}
