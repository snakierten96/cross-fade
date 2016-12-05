import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesComponent } from './images.component';
import { ImgHelperDirective } from './img-helper.directive';
import { ImagesService } from './images.service';
import { ImagesResolveService } from './images-resolve.service';
import { ImagesRouingModule } from './images-routing.module';
import { ImgCrossFadeComponent } from './img-cross-fade/img-cross-fade.component';

@NgModule({
  imports: [
    CommonModule,
    ImagesRouingModule,
  ],
  declarations: [
    ImagesComponent,
    ImgHelperDirective,
    ImgCrossFadeComponent,
  ],
  providers: [
    ImagesService,
    ImagesResolveService,
  ]
})
export class ImagesModule { }
