import { Component, OnInit, OnDestroy, OnChanges, Input,
         trigger, state, transition, animate, style,
         SimpleChanges, AnimationTransitionEvent } from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'app-img-cross-fade',
  templateUrl: './img-cross-fade.component.html',
  styleUrls: ['./img-cross-fade.component.scss'],
  animations:[
    trigger('crossFade',[
      state('off',  style({ opacity: 0 })),
      state('pre',  style({ opacity: 1 })),
      state('fade', style({ opacity: 0 })),
      transition('pre => fade', animate('500ms ease-out'))
    ])
  ],
})
export class ImgCrossFadeComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];
  private _subject: BehaviorSubject<string> = new BehaviorSubject('off')

  _main: string;
  copy: string;

  status: string;

  @Input('src') set main(name: string) { this._main = name }
  get main(){ return this._main }

  constructor() { }

  ngOnInit(): void {
    this._subscriptions.push(
      this._subject.distinctUntilChanged()
        .concatMap(status => Observable.of(status).delay(1))
        .subscribe(
          status => this.status = status,
          err => console.error(err)
        )
    )
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._subject.unsubscribe();
    this._subscriptions = [];
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  toggleState(): void {
    this._subject.next(
      (this._subject.getValue() === 'off') ? 
        'pre' : (this._subject.getValue() === 'pre') ? 'fade' : 'off'
    )
  }

  animationDone(event: AnimationTransitionEvent): void {
    if ( event.fromState === 'pre' && event.toState === 'fade') {
      this.copy = this.main;
      this.toggleState();   // switch off
    }
  }

}
