import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { ClientesListComponent } from 'app/modules/clientes/clientes-list/clientes-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ClientesListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClientesListComponent]
})
export class ClientesListModule { }
