import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/modules/general.module';
import { MenuListComponent } from 'app/modules/menu/menu-list/menu-list.component';

const routes: Routes = [{ path: '', component: MenuListComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuListComponent]
})
export class MenuListModule { }
