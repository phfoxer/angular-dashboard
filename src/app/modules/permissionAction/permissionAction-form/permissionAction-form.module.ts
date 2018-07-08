import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionActionFormComponent } from './permissionAction-form.component';
import { GeneralModule } from 'app/modules/general.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PermissionActionFormComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PermissionActionFormComponent]
})
export class PermissionActionFormModule { }
