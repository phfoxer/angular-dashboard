import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoasService } from 'app/modules/pessoas/pessoas.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CommomService } from 'app/modules/commom/commom.service';

@Component({
  selector: 'app-formulario-pessoa',
  templateUrl: './formulario-pessoa.component.html',
  styleUrls: ['./formulario-pessoa.component.scss'],
  providers: [PessoasService, CommomService]
})
export class FormularioPessoaComponent implements OnInit {
  @Input() id: number;
  @Output() pessoa: any = new EventEmitter<any>();
  permission: IPermission = <IPermission>{};
  pessoas: FormGroup;
  PessoaChanged: FormGroup;
  telefones: FormGroup;
  enderecos: FormGroup;
  loaded: boolean;
  estadoCivil: any;
  estados: any;
  cidades: any;

  constructor(
    private pessoasService: PessoasService,
    private commomService: CommomService,
    private localStorage: LocalStorage,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.estadoCivil = [
      { chave: 'solteiro', nome: 'Solteiro' },
      { chave: 'casado', nome: 'Casado' },
      { chave: 'separado', nome: 'Separado' },
      { chave: 'divorciado', nome: 'Divorciado' },
      { chave: 'viuvo', nome: 'Viúvo' }
    ];
    this.commomService.estados({ count: -1 }).then(r => {
      this.estados = r.data;
    });

    this.localStorage.getItem('permission').subscribe((permission) => {
      this.permission = permission;
    });
    this.pessoas = this.formBuilder.group({
      data_nascimento: ['', [Validators.required]],
      telefones: [[]],
      enderecos: [[]],
      estado_id: [''],
      estado_civil: ['', [Validators.required]],
      cidade_id: ['', [Validators.required]],
      email: ['', [Validators.email]],
      nome: ['', [Validators.required]],
      cpf: [''],
      rg: [''],
      id: ['']
    });

    this.telefones = this.formBuilder.group({
      codigo_pais: ['+55', [Validators.maxLength(3)]],
      descricao: [''],
      telefone: ['', [Validators.required, Validators.maxLength(20)]],
      ddd: ['', [Validators.required, Validators.maxLength(2)]],
      id: ['']
    });

    this.enderecos = this.formBuilder.group({
      complemento: [''],
      endereco: ['', [Validators.maxLength(200)]],
      estado: ['', [Validators.maxLength(50)]],
      cidade: ['', [Validators.maxLength(200)]],
      bairro: ['', [Validators.required, Validators.maxLength(100)]],
      rua: [''],
      cep: ['', [Validators.required, Validators.maxLength(10)]],
      id: ['']
    });

    if (this.id) {
      this.loaded = true;
      const id = Number(this.id);
      this.pessoasService.show(id).then(async (result) => {

        // carregar cidades
        if (result.cidade) {
          await this.commomService.cidades({ estado_id: result.cidade.estado_id, count: -1 }).then(r => {
            this.cidades = r.data;
          });
        }

        this.pessoas.setValue({
          nome: result.nome,
          cpf: result.cpf,
          email: result.email,
          estado_civil: result.estado_civil,
          estado_id: (result.cidade) ? result.cidade.estado_id : null,
          cidade_id: result.cidade_id,
          rg: result.rg,
          data_nascimento: result.data_nascimento,
          telefones: result.telefones,
          enderecos: result.enderecos,
          id: result.id
        });
        this.loaded = false;
      });
    }
    this.PessoaChanged = this.pessoas.value;

  }

  public onSubmitTelefones(e: Event) {
    if (this.telefones.valid) {
      this.pessoas.value.telefones.push(this.telefones.value);
      this.telefones.setValue({
        codigo_pais: null,
        descricao: null,
        telefone: null,
        ddd: null,
        id: null
      });
    }
  }

  public onSubmitEnderecos(e: Event) {
    if (this.enderecos.valid) {
      this.pessoas.value.enderecos.push(this.enderecos.value);
      this.enderecos.setValue({
        complemento: null,
        endereco: null,
        estado: null,
        cidade: null,
        bairro: null,
        rua: null,
        cep: null,
        id: null
      });
    }
  }

  public removeTelefone(telefone: any) {
    const telefones: any = this.pessoas.value.telefones.filter(t => {
      if (telefone.ddd + '-' + telefone.telefone !== t.ddd + '-' + t.telefone) {
        return t;
      }
    });
    this.pessoas.value.telefones = telefones;
  }

  public setCidade(estado: any) {
    this.commomService.cidades({ estado_id: estado.id, count: -1 }).then(r => {
      this.cidades = r.data;
      this.pessoas.get('cidade_id').setValue('');
    });
  }

  ngDoCheck() {
    if (this.PessoaChanged !== this.pessoas.value) {
      this.PessoaChanged = this.pessoas.value;
      this.pessoa.emit(this.pessoas);
    }
  }

}
