import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { ImageData } from '../mock-data';

@Injectable()
export class ImagesService {

  private url: string = 'api/images';

  constructor(private http: Http) { }

  getImages(): Observable<ImageData> {
    return this.http.get(this.url)
      .flatMap(response => Observable.from(response.json().data))
  }

}
