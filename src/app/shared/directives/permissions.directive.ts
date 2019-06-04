import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {SessionService} from '../../core/users/session.service';
import {Role} from '../../core/users/roles.enum';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[permissions]',
})
export class PermissionsDirective implements OnInit, OnDestroy {
  @Input()
  permissions: Role;
  sessionSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionSubscription = this.sessionService.userSession$.subscribe(user => {
      if (user && user.role === this.permissions) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    this.sessionSubscription && this.sessionSubscription.unsubscribe();
  }
}
