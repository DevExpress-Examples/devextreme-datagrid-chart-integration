import { Injectable, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

const BREAKPOINT_SMALL = '(max-width: 800px)';

@Injectable({
  providedIn: 'root',
})
export class ScreenService implements OnDestroy {
  @Output() changed = new EventEmitter<void>();

  private readonly subscription: Subscription;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.subscription = this.breakpointObserver
      .observe(BREAKPOINT_SMALL)
      .subscribe(() => this.changed.emit());
  }

  isSmall(): boolean {
    return this.breakpointObserver.isMatched(BREAKPOINT_SMALL);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
