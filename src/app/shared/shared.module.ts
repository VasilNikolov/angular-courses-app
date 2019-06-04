import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {SharedLayoutComponent} from './shared-layout/shared-layout.component';
import {PermissionsDirective} from './directives/permissions.directive';
import {LoggedInDirective} from './directives/logged-in.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SharedLayoutComponent, HeaderComponent, PermissionsDirective, LoggedInDirective],
  exports: [
    SharedLayoutComponent,
    PermissionsDirective,
    LoggedInDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
