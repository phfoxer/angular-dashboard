import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermissionActionService } from 'app/modules/permissionAction/permissionAction.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-form',
  templateUrl: './permissionAction-form.component.html',
  styleUrls: ['./permissionAction-form.component.scss'],
  providers: [PermissionActionService]
})
export class PermissionActionFormComponent implements OnInit {
  permission: IPermission = <IPermission>{};
  permissionAction: FormGroup;
  loaded: boolean;

  constructor(
    private permissionActionService: PermissionActionService,
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

    this.permissionAction = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        this.permissionActionService.show(id).then(result => {
          this.permissionAction.setValue({
            id: result.id,
            name: result.name,
            description: result.description,
          });
          this.loaded = false;
        });
      }
    });
  }

  private onCreate(e: Event) {
    if (this.permissionAction.valid) {
      this.loaded = true;
      this.permissionActionService.create(this.permissionAction.value).then(result => {
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
      this.permissionAction.reset();
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
    if (this.permissionAction.value.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.permissionActionService.update(this.permissionAction.value).then(result => {
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

}
