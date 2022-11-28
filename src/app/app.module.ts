import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ImageComponent } from './component/image/image.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SelectImagesComponent } from './component/select-images/select-images.component';
import {ɵEmptyOutletComponent} from "@angular/router";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://sso.dev.riple.tech' + '/auth',
        realm: 'print-a-porter',
        clientId: 'web'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
      },
    });
}

@NgModule({
  declarations: [AppComponent, ImageComponent, SelectImagesComponent],
    imports: [
        BrowserModule,
        NgxPaginationModule,
        HttpClientModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        FormsModule,
        ɵEmptyOutletComponent,
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
