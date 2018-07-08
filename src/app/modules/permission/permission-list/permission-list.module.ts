import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { PermissionListComponent } from 'app/modules/permission/permission-list/permission-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PermissionListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PermissionListComponent]
})
export class PermissionListModule { }
