import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxElectronModule } from 'ngx-electron';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard.service';
import { TemplateComponent } from './modules/template/template.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastHelper } from 'app/helpers/toast.helper';
import { HttpClientInterceptor } from 'app/service/http-interceptor.class';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { StorageHelper } from 'app/helpers/storage.helper';
import { GeneralHelper } from 'app/helpers/general.helper';

const declarations: any = [
  AppComponent,
  TemplateComponent,
  NotFoundComponent
];

const imports: any = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  NgxElectronModule,
  FormsModule,
  HttpClientModule
];

@NgModule({
  declarations: declarations,
  imports: imports,
  providers: [Ng2IzitoastService, AuthGuard, HttpClientInterceptor, ToastHelper, GeneralHelper, StorageHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
