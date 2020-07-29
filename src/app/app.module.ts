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
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
