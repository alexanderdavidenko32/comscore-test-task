import {Routes} from '@angular/router';

import {ShowcaseComponent} from '@app/components/showcase/showcase.component';
import {PageNotFoundComponent} from '@app/components/page-not-found/page-not-found.component';
import {ShoppingCartComponent} from '@app/components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent,
    pathMatch: 'full'
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
