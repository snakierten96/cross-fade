import { Component, OnInit, OnDestroy, AfterViewInit,
         ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { ImageData } from './index';
import { ImgHelperDirective } from './img-helper.directive';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subscriptions: Subscription[] = [];

  @ViewChildren(ImgHelperDirective) children: QueryList<ImgHelperDirective>;
  images: ImageData[] = [];
  image: ImageData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._subscriptions.push(
      this.route.data.subscribe(
        (data: { images: ImageData[] }) => {
          console.log(data);
          this.images = data.images;
          this.image = this.images[0];
        },
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
    this.image = this.images[index - 1];
  }

  swapImage(index: number): void {
    this.image.main = this.image.others[ index - 1];
  }

}
