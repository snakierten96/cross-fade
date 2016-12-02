import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { images } from './images';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { images };
  }

}
