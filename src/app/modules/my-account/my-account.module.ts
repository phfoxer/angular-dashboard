import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from 'app/modules/general.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from 'app/modules/my-account/my-account.component';

const routes: Routes = [{ path: '', component: MyAccountComponent }];

@NgModule({
  imports: [
    GeneralModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyAccountComponent]
})
export class MyAccountModule { }
