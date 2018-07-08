import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';
import { ToastHelper } from 'app/helpers/toast.helper';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { StorageHelper } from 'app/helpers/storage.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user: any = { email: '', password: '' };
  loaded: boolean;
  constructor(
    public router: Router,
    private toastProvider: ToastHelper,
    private loginService: LoginService,
    private localStorage: LocalStorage,
    private storageHelper: StorageHelper
  ) { }

  async ngOnInit() {
    await this.localStorage.getItem('token').subscribe((t) => {
      if (t) {
        this.router.navigate(['/painel/inicio']);
      }
    });
  }

  async onSubmit() {
    this.loaded = true;
    await this.loginService.login(this.user).then(async (result) => {
      await this.localStorage.setItem('token', result.token).subscribe(async (t) => {
        if (t) {
          await this.storageHelper.storeMenu();
          this.loaded = false;
          await this.localStorage.setItem('modulo', { nome: '', id: null }).subscribe(() => { });
          await this.localStorage.setItem('userdata', result.userdata).subscribe(() => {
            this.router.navigate(['/painel/inicio']);
          });
        }
      });
    }).catch(() => {
      const toast: IToast = {
        icon: 'error',
        type: 'error',
        time: 15000,
        title: 'Usuário ou senha incorretos',
        message: 'Verifique seu usuário e senha e tente novamente!'
      };
      this.toastProvider.toast(toast);
      this.loaded = false;
    });
  }
}
