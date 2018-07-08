import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ClientesService } from 'app/modules/clientes/clientes.service';
import { FuncionariosService } from 'app/modules/funcionarios/funcionarios.service';

@Component({
  selector: 'app-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
  providers: [ClientesService, FuncionariosService]
})
export class ClientesFormComponent implements OnInit {
  permission: IPermission = <IPermission>{};
  clientes: FormGroup;
  pessoa: FormGroup;
  responsaveis: any;
  sending: boolean;
  loaded: boolean;

  constructor(
    private funcionariosService: FuncionariosService,
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private toastProvider: ToastHelper,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  async ngOnInit() {

    this.clientes = this.formBuilder.group({
      observacao: [''],
      pessoa_id: [''],
      pessoa: [{}],
      funcionarios: [[], [Validators.required]],
      id: ['']
    });

    await this.funcionariosService.list({ page: 1, count: 100 }).then(responsaveis => {
      this.responsaveis = responsaveis.data;
    });

    await this.activatedRoute.params.subscribe(async params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        await this.clientesService.show(id).then(result => {
          this.clientes.setValue({
            id: result.id,
            observacao: result.observacao,
            funcionarios: (result.funcionarios) ? result.funcionarios : [] ,
            pessoa_id: result.pessoa_id,
            pessoa: result.pessoa,
          });
          this.loaded = false;
        });
      }
    });
  }

  private onCreateFuncionario(e: Event) {
    this.sending = true;
    this.clientes.value.pessoa = this.pessoa.value;
    this.clientesService.create(this.clientes.value).then(result => {
      const toast = {
        icon: 'check',
        type: 'success',
        title: 'Registro salvo com sucesso!',
        message: 'O registro foi salvo sem erros'
      };
      this.toastProvider.toast(toast);
      this.sending = false;
    }).catch(() => {
      const toast = {
        icon: 'error',
        title: 'Erro ao salvar!',
        message: 'Nenhum dado foi salvo.'
      };
      this.toastProvider.toast(toast);
      this.sending = false;
    });
    this.clientes.reset();
    this.pessoa.reset();
    e.preventDefault();
  }

  private onUpdateFuncionario(e: Event) {
    this.clientes.value.pessoa = this.pessoa.value;
    this.sending = true;
    this.clientesService.update(this.clientes.value).then(result => {
      const toast = {
        icon: 'check',
        type: 'success',
        title: 'Registro salvo com sucesso!',
        message: 'O registro foi salvo sem erros'
      };
      this.toastProvider.toast(toast);
      this.sending = false;
    }).catch(error => {
      const toast = {
        icon: 'error',
        title: 'Erro ao salvar!',
        message: 'Nenhum dado foi salvo.'
      };
      this.toastProvider.toast(toast);
      this.sending = false;
    });
    e.preventDefault();
  }

  public onSubmit(e: Event) {

    if (this.pessoa.valid && this.clientes.valid) {
      if (this.clientes.value.id) {
        this.onUpdateFuncionario(e);
      } else {
        this.onCreateFuncionario(e);
      }
    } else {
      const toast = {
        icon: 'error',
        title: 'Campos obrigatórios!',
        message: 'Há campos não preenchidos'
      };
      this.toastProvider.toast(toast);
    }

  }

  public getPessoa(pessoa: FormGroup) {
    this.pessoa = pessoa;
  }

}
