import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      //   {
      //     path: 'ui',
      //     component: UiComponent,
      //   },
      //   {
      //     path: 'prefs',
      //     component: PrefsComponent,
      //   },
    ],
  },
];
