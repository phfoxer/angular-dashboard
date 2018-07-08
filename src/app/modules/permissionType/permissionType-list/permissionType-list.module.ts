import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { PermissionTypeListComponent } from 'app/modules/permissionType/permissionType-list/permissionType-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PermissionTypeListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PermissionTypeListComponent]
})
export class PermissionTypeListModule { }
