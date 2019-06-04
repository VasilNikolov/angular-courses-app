import {ModuleWithProviders, NgModule} from '@angular/core';
import {CoursesStoreService} from './courses/courses-store.service';
import {CommonModule} from '@angular/common';
import {UsersStoreService} from './users/users-store.service';

@NgModule({
  providers: [CommonModule]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CoursesStoreService.initializeProviders,
        UsersStoreService.initializeProviders,
      ]
    };
  }
}
