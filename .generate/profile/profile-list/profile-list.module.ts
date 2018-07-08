import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { ProfileListComponent } from 'app/modules/profile/profile-list/profile-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ProfileListComponent }];

@NgModule({
  imports: [
    FormsModule,
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileListComponent]
})
export class ProfileListModule { }
