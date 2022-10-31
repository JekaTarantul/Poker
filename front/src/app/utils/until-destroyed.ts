import {ChangeDetectorRef, inject, ViewRef} from "@angular/core";
import {Subject, takeUntil} from "rxjs";

export function untilDestroyed<T = unknown>() {
  const subject = new Subject<void>();

  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    subject.next();
    subject.complete()
  });

  return takeUntil<T>(subject.asObservable())
}
