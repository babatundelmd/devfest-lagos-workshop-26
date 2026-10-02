import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Talks', loadComponent: () => import('./talks/talk-list') },
  { path: 'talks/new', title: 'New talk', loadComponent: () => import('./talks/talk-form') },
  { path: 'talks/:id', title: 'Edit talk', loadComponent: () => import('./talks/talk-form') },
  { path: '**', redirectTo: '' },
];
