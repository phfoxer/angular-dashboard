import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermissionTypeService } from 'app/modules/permissionType/permissionType.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { PermissionActionService } from 'app/modules/permissionAction/permissionAction.service';

@Component({
  selector: 'app-form',
  templateUrl: './permissionType-form.component.html',
  styleUrls: ['./permissionType-form.component.scss'],
  providers: [PermissionTypeService, PermissionActionService]
})
export class PermissionTypeFormComponent implements OnInit {
  permission: IPermission = <IPermission>{};
  permissionType: FormGroup;
  loaded: boolean;
  permissionActions: any = [];
  actions_sort: any = [];

  constructor(
    private permissionActionService: PermissionActionService,
    private permissionTypeService: PermissionTypeService,
    private activatedRoute: ActivatedRoute,
    private toastProvider: ToastHelper,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  ngOnInit() {

    this.permissionActionService.list({ page: 1, count: 200 }).then(r => {
      this.permissionActions = r.data;
    });

    this.permissionType = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      actions: [[], ''],
      id: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        this.permissionTypeService.show(id).then(result => {
          this.actions_sort = result.actions_sort;
          this.permissionType.setValue({
            id: result.id,
            name: result.name,
            description: result.description,
            actions: result.actions,
          });
          this.loaded = false;
        });
      }
    });
  }

  private onCreate(e: Event) {
    if (this.permissionType.valid) {
      this.loaded = true;
      this.permissionTypeService.create(this.permissionType.value).then(result => {
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
      this.permissionType.reset();
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
    if (this.permissionType.value.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.permissionTypeService.update(this.permissionType.value).then(result => {
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
  }

  isChecked(id: number): boolean {
    console.log((this.permissionType.value.actions.indexOf(id) > -1));
    return (this.permissionType.value.actions.indexOf(id) > -1);
  }

  setPermission(value: boolean, id: number) {
    this.actions_sort = (!this.actions_sort) ? [] : this.actions_sort;
    // remove element if exists
    this.permissionType.value.actions =  this.permissionType.value.actions.filter((action_id) => {
      return (action_id === id) ? false : action_id;
    });
    // insert new value
    if (value) {
      this.permissionType.value.actions.push(id);
    }
    console.log(this.permissionType.value.actions);
  }

}
