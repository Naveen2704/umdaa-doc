import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Observable, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[counter]'
})
export class CounterDirective implements OnChanges, OnDestroy {

  private _counterSource$ = new Subject<any>();
  private _subscription = Subscription.EMPTY;

  @Input() counter: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {

    this._subscription = this._counterSource$.pipe(
      switchMap(({ interval, count }) =>
        timer(0, interval).pipe(
          take(count),
          tap(() => this.value.emit(--count))
        )
      )
    ).subscribe((data)=>{
      if(data == 9){
        console.log('update timer');
        // this.ResetTimer(10)
        this.value.emit(0)
      }
    });
  }

  ngOnChanges() {
    this._counterSource$.next({ count: this.counter, interval: this.interval });
  }
  ResetTimer(updatedValue: number)
  {
    this._counterSource$.next({ count: updatedValue, interval: this.interval });
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}