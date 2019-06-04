import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {SessionService} from '../../core/users/session.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[loggedIn]'
})
export class LoggedInDirective implements OnInit, OnDestroy {
  @Input()
  loggedIn: boolean;
  sessionSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionSubscription = this.sessionService.hasSession$.subscribe(state => {
      if (state === !!this.loggedIn) {
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
