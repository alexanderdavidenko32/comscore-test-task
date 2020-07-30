import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {AppRoutingModule} from '@app/routing/app-routing.module';
import {AppComponent} from '@app/app.component';
import {
  AdminComponent, HeaderComponent, PageNotFoundComponent, ShoppingCartComponent, ShoppingCartLinkComponent,
  ShowcaseComponent
} from '@app/components';
import {ProductsInterceptor} from '@app/interceptors';
import {BaseFormComponent} from './components/base-form/base-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ShoppingCartLinkComponent,
    PageNotFoundComponent,
    AdminComponent,
    BaseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
