import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { UsersListComponent } from 'app/modules/users/users-list/users-list.component';

const routes: Routes = [{ path: '', component: UsersListComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersListComponent]
})
export class UsersListModule { }
