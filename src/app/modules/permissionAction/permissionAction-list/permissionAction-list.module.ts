import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { PermissionActionListComponent } from 'app/modules/permissionAction/permissionAction-list/permissionAction-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PermissionActionListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PermissionActionListComponent]
})
export class PermissionActionListModule { }
