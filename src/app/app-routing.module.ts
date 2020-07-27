import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowcaseComponent} from './components/showcase/showcase.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

// TODO: move routes to a separate file
const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent
  },
  { path: '',   redirectTo: '/showcase', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
