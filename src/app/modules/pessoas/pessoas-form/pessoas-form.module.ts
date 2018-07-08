import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasFormComponent } from './pessoas-form.component';
import { GeneralModule } from 'app/modules/general.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [{ path: '', component: PessoasFormComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [PessoasFormComponent]
})
export class PessoasFormModule { }
