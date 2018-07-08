import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFormComponent } from './menu-form.component';
import { GeneralModule } from 'app/modules/general.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: MenuFormComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GeneralModule
  ],
  declarations: [MenuFormComponent]
})
export class MenuFormModule { }
