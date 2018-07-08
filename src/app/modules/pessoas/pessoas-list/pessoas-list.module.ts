import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { PessoasListComponent } from 'app/modules/pessoas/pessoas-list/pessoas-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PessoasListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PessoasListComponent]
})
export class PessoasListModule { }
