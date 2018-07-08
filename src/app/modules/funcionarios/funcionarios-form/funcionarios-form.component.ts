import { Component, OnInit } from '@angular/core';
import { ToastHelper } from 'app/helpers/toast.helper';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { PessoasService } from 'app/modules/pessoas/pessoas.service';
import { FuncionariosService } from 'app/modules/funcionarios/funcionarios.service';

@Component({
  selector: 'app-form',
  templateUrl: './funcionarios-form.component.html',
  styleUrls: ['./funcionarios-form.component.scss'],
  providers: [FuncionariosService, PessoasService]
})
export class FuncionariosFormComponent implements OnInit {
  permission: IPermission = <IPermission>{};
  funcionarios: FormGroup;
  pessoa: FormGroup;
  sending: boolean;
  loaded: boolean;

  constructor(
    private funcionariosService: FuncionariosService,
    private activatedRoute: ActivatedRoute,
    private toastProvider: ToastHelper,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder,
    private pessoasService: PessoasService
  ) {
    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
  }

  async ngOnInit() {
    this.funcionarios = this.formBuilder.group({
      inicio_atividade: ['', [Validators.required]],
      pessoa_id: [''],
      pessoa: [{}],
      id: ['']
    });

    await this.activatedRoute.params.subscribe(async params => {
      if (params.id) {
        this.loaded = true;
        const id = Number(params.id);
        await this.funcionariosService.show(id).then(result => {
          this.funcionarios.setValue({
            id: result.id,
            inicio_atividade: result.inicio_atividade,
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
    this.funcionarios.value.pessoa = this.pessoa.value;
    this.funcionariosService.create(this.funcionarios.value).then(result => {
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
    this.funcionarios.reset();
    this.pessoa.reset();
    e.preventDefault();
  }

  private onUpdateFuncionario(e: Event) {
    this.funcionarios.value.pessoa = this.pessoa.value;
    this.sending = true;
    this.funcionariosService.update(this.funcionarios.value).then(result => {
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

    if (this.pessoa.valid && this.funcionarios.valid) {
      if (this.funcionarios.value.id) {
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
