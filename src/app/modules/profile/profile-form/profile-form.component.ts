import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'app/modules/profile/profile.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [ProfileService]
})
export class ProfileFormComponent implements OnInit {
  permission: IPermission = <IPermission>{};
  profile: FormGroup;
  loaded: boolean;

  constructor(
    private profileService: ProfileService,
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

    this.profile = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      id: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        this.profileService.show(id).then(result => {
          this.profile.setValue({
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
    if (this.profile.valid) {
      this.loaded = true;
      this.profileService.create(this.profile.value).then(result => {
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
      this.profile.reset();
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
    if (this.profile.value.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.profileService.update(this.profile.value).then(result => {
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
