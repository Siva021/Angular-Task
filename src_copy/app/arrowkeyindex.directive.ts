import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appArrowkeyindex]'
})
export class ArrowkeyindexDirective{
  @Input() passID: string;
  constructor(private el: ElementRef, private renderer2: Renderer2) {
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if (event.keyCode === 39) {
        console.log("Key Right Pressed");
        if(this.renderer2.selectRootElement(this.passID).parentNode.nextElementSibling.children[0] != null){
          this.renderer2.selectRootElement(this.passID).parentNode.nextElementSibling.children[0].focus();
        }
        else {
          this.renderer2.selectRootElement('input').parentNode.children[0].focus();
        }
      }
    }
}
