import { Directive, ElementRef, ViewContainerRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appImgHelper]',
})
export class ImgHelperDirective {

  constructor(private viewContainerRef: ViewContainerRef, private renderer: Renderer) {
    //console.log(this.viewContainerRef);
  }

  hello(idx: number) {
    console.log('hello', idx);
  }

}
