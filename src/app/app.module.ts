import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from '@app/routing/app-routing.module';
import {AppComponent} from '@app/app.component';
import {HeaderComponent, PageNotFoundComponent, ShoppingCartComponent, ShoppingCartLinkComponent, ShowcaseComponent} from '@app/components';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
