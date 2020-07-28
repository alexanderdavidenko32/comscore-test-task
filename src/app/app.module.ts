import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from '@app/routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from '@app/app.component';
import {HeaderComponent, PageNotFoundComponent, ShoppingCartComponent, ShoppingCartLinkComponent, ShowcaseComponent, AdminComponent} from '@app/components';
import {ProductsInterceptor} from '@app/interceptors';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ShoppingCartLinkComponent,
    PageNotFoundComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
