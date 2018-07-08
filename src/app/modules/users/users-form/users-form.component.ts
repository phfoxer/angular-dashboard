import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'app/modules/users/users.service';
import { ProfileService } from 'app/modules/profile/profile.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  providers: [UsersService, ProfileService]
})
export class UsersFormComponent implements OnInit {
  users: FormGroup;
  roles: any;
  loaded: boolean;
  permission: IPermission = <IPermission>{};

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private usersService: UsersService,
    private toastProvider: ToastHelper,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,

  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
   }

  ngOnInit() {

    this.users = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: [''],
      rpassword: [''],
      id: ['']
    });

    this.profileService.list({ count: 200, page: 1 }).then(result => {
      this.roles = result.data;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        this.usersService.show(id).then(result => {
          this.users.setValue({
            id: result.id,
            name: result.name,
            password: null,
            rpassword: null,
            email: result.email,
            role: result.role
          });
          this.loaded = false;
        });
      }
    });
  }

  private onCreate(e: Event) {
    if (this.users.valid && this.users.value.password === this.users.value.rpassword) {
      this.loaded = true;
      this.usersService.create(this.users.value).then(result => {
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
      this.users.reset();
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
    if (this.users.value.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.usersService.update(this.users.value).then(result => {
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
