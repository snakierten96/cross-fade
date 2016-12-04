import { Component, OnInit, OnDestroy, AfterViewInit,
         trigger, state, transition, animate, style,
         AnimationTransitionEvent,
         ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';

import { ImageData } from './index';
import { ImgHelperDirective } from './img-helper.directive';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  animations: [
    trigger('crossFade',[
      state('pre',  style({ opacity: 1 })),
      state('fade', style({ opacity: 0 })),
      transition('pre => fade', animate('1s ease-out'))
    ])
  ]
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscriptions: Subscription[] = [];
  private _subject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  @ViewChildren(ImgHelperDirective) children: QueryList<ImgHelperDirective>;
  images: ImageData[] = [];
  image: ImageData;

  copy: any = {};
  status: string;

  constructor(private route: ActivatedRoute) { }

  toggleState(): void {
    this._subject.next(!this._subject.getValue())
  }

  animationDone(event: AnimationTransitionEvent) {
    if ( event.fromState === 'pre' && event.toState === 'fade') {
      this.copy.alternates = this.image.alternates;
    }
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.route.data.subscribe(
        (data: { images: ImageData[] }) => {
          this.images = data.images;
          this.image = this.images[0];
          this.copy.main = this.image.main;
          this.copy.alternates = this.image.alternates;
        },
        err => console.error(err)
      )
    );
    this._subscriptions.push(
      this._subject.distinctUntilChanged()
        .concatMap(state => (state) ? Observable.of(state).delay(1) : Observable.of(state))
        .subscribe(
          state => this.status = (state) ? 'fade' : 'pre',
          err => console.error(err)
        )
    )
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._subscriptions = [];
  }

  getSwatches(): string[] {
    return this.images.map(image => image.swatch);
  }

  setImage(index: number): void {
    this.copy.main = this.image.main;
    this.copy.alternates = this.image.alternates;
    this.toggleState();
    this.image = this.images[index - 1];
    this.toggleState();
  }

  swapImage(index: number): void {
    this.copy.main = this.image.main;
    this.toggleState();
    this.image.main = this.image.others[ index - 1];
    this.toggleState();
  }

}
