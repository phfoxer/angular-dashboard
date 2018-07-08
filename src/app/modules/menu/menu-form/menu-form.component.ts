import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../menu.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

interface Imenu {
  position: number;
  relation: number;
  target: string;
  link: string;
  name: string;
  icon: string;
  id?: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss'],
  providers: [MenuService]
})
export class MenuFormComponent implements OnInit {
  menu: FormGroup;
  loaded: boolean;
  MenuList: any;
  permission: IPermission = <IPermission>{};
  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private toastProvider: ToastHelper,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  ngOnInit() {

    this.menu = this.formBuilder.group({
      position: ['', [Validators.required]],
      relation: '',
      target: '',
      link: '',
      name: ['', [Validators.required]],
      icon: '',
      id: ''
    });

    this.loaded = true;
    this.menuService.list({ page: 1, count: 200 }).then(result => {
      this.MenuList = result.data;
      this.loaded = false;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        this.menuService.show(id).then(result => {
          this.menu.setValue({
            position: result.position,
            relation: result.relation,
            target: result.target,
            name: result.name,
            icon: result.icon,
            link: result.link,
            id: result.id
          });
          this.loaded = false;
        });
      }
    });
  }

  private onCreate(e: Event) {
    if (this.menu.valid) {
      this.loaded = true;
      const data = {
        position: this.menu.value.position,
        relation: this.menu.value.relation,
        target: this.menu.value.target,
        name: this.menu.value.name,
        icon: this.menu.value.icon,
        link: this.menu.value.link
      };
      this.menuService.create(data).then(result => {
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
      this.menu.reset();
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
    if (this.menu.value.id) {
      this.onUpdate(e);
    } else {
      this.onCreate(e);
    }
  }

  private onUpdate(e: Event) {
    this.loaded = true;
    this.menuService.update(this.menu.value).then(result => {
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
