import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, Subscriber } from 'rxjs/Rx';

import { ImageData } from '../mock-data';
import { ImagesService } from './images.service';

@Injectable()
export class ImagesResolveService implements Resolve<Observable<ImageData[]>> {

  constructor(private imagesService: ImagesService) { }

  resolve (route: ActivatedRouteSnapshot): Observable<ImageData[]> {
    return this.imagesService.getImages().toArray()
      .flatMap(response => this._preload(response))
  }

  private _preload (response: ImageData[]): Observable<ImageData[]> {
    return Observable.from(response).flatMap(image => {
      return Observable.from([image.main, image.swatch, ...image.alternates])
        .concatMap(this._loadImage)
        .toArray()
        .map(() => response)
    })
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
