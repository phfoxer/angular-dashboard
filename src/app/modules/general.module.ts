import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'app/components/pagination/pagination.component';
import { LoaderComponent } from 'app/components/loader/loader.component';
import { ToastHelper } from 'app/helpers/toast.helper';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { ModalComponent } from 'app/components/modal/modal.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { CheckboxComponent } from 'app/components/checkbox/checkbox.component';
import { GridComponent } from 'app/components/grid/grid.component';
import { RouterModule } from '@angular/router';
import { InputSelectComponent } from 'app/components/input-select/input-select.component';
import { DenyAccessComponent } from 'app/components/deny-access/deny-access.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoaderSpinnerComponent } from 'app/components/loader-spinner/loader-spinner.component';
import { FormularioPessoaComponent } from './pessoas/components/formulario-pessoa/formulario-pessoa.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2IziToastModule,
    RouterModule,
    NgSelectModule
  ],
  declarations: [LoaderSpinnerComponent, InputSelectComponent, GridComponent, CheckboxComponent, PaginationComponent, LoaderComponent, ModalComponent, ModalConfirmComponent, DenyAccessComponent, FormularioPessoaComponent],
  exports: [LoaderSpinnerComponent, InputSelectComponent, GridComponent, CheckboxComponent, PaginationComponent, LoaderComponent, ModalComponent, ModalConfirmComponent, DenyAccessComponent, FormularioPessoaComponent],
  providers: [ToastHelper]
})
export class GeneralModule { }
