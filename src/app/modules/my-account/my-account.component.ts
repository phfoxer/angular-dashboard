import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'app/modules/users/users.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers: [UsersService]
})
export class MyAccountComponent implements OnInit {
  users: FormGroup;
  roles: any;
  loaded: boolean;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastProvider: ToastHelper,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.users = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [''],
      rpassword: [''],
      id: ['']
    });
    this.loaded = true;
    this.localStorage.getItem('userdata').subscribe(async (user) => {
      await this.users.setValue({
        id: user.id,
        name: user.name,
        password: null,
        rpassword: null,
        email: user.email
      });
      this.loaded = false;
    });
  }

  public onSubmit(e: Event) {
    if (this.users.value.id) {
      this.onUpdate(e);
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
