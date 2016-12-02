/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImagesResolveService } from './images-resolve.service';

describe('Service: ImagesResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesResolveService]
    });
  });

  it('should ...', inject([ImagesResolveService], (service: ImagesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
