import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from '@app/routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from '@app/app.component';
import {HeaderComponent, PageNotFoundComponent, ShoppingCartComponent, ShoppingCartLinkComponent, ShowcaseComponent} from '@app/components';
import {ProductsInterceptor} from '@app/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ShoppingCartLinkComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
