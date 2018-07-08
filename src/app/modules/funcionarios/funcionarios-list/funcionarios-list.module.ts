import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { FuncionariosListComponent } from 'app/modules/funcionarios/funcionarios-list/funcionarios-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: FuncionariosListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FuncionariosListComponent]
})
export class FuncionariosListModule { }
