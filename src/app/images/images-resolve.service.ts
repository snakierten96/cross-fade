import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, Subscriber } from 'rxjs/Rx';

import { ImageData } from './index';
import { ImagesService } from './images.service';

@Injectable()
export class ImagesResolveService implements Resolve<Observable<ImageData[]>> {

  constructor(private imagesService: ImagesService) { }

  resolve (route: ActivatedRouteSnapshot): Observable<ImageData[]> {
    return this.imagesService.getImages()
      .concatMap(response => this._preload(response)).toArray()
  }

  private _mapper (image: ImageData): Observable<string> {
    return Observable.from([image.swatch, ...image.others, ...image.alternates]);
  }

  private _preload (image: ImageData): Observable<ImageData> {
    return this._mapper(image).concatMap(this._loadImage).toArray()
      .map(() => image)
  }

  private _loadImage (imagePath: string): Observable<string | null> {
    return Observable.create(
      (observer: Subscriber<string | null>) => {
        var img = new Image();
        img.src = imagePath;
        img.onload = () => {
          observer.next(imagePath);
          observer.complete();
        }
        img.onerror = () => {
          observer.next(null);
          observer.complete();
        }
      }
    )
  }

}
