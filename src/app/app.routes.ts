import { Routes } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: '**', component: PageNotFoundComponent },
];
