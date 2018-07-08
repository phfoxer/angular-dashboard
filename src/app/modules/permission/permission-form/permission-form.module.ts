import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionFormComponent } from './permission-form.component';
import { GeneralModule } from 'app/modules/general.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [{ path: '', component: PermissionFormComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PermissionFormComponent]
})
export class PermissionFormModule { }
