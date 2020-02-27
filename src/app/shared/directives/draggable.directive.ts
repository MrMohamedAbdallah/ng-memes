import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef
} from "@angular/core";
import { TxtService } from '../services/txt.service';

@Directive({
  selector: "app-txt"
})
export class DraggableDirective {
  dragging: boolean = false;
  showInput: boolean = false;

  mousePosition: { x: number; y: number };
  offset: { x: number; y: number };

  @HostBinding("style.position") position;
  @HostBinding("style.cursor") cursor;
  @HostBinding("style.top") top;
  @HostBinding("style.left") left;
  @HostBinding("style.zIndex") zIndex;

  constructor(private elRef: ElementRef, private txtService: TxtService) {}

  @HostListener("mousedown", ["$event"]) mouseover(e: any) {
    e.preventDefault(); // Prevent default

    if(! e.target.classList.contains("txt-container")) return;

    console.log("Drag");
    
    this.dragging = true;
    this.position = "absolute";
    this.cursor = "move";
    this.zIndex = "9999999999999999999";

    this.mousePosition = {
      x: e.pageX,
      y: e.pageY
    };

    this.offset = {
      x: this.elRef.nativeElement.offsetLeft,
      y: this.elRef.nativeElement.offsetTop
    };
  }

  @HostListener("document:mouseup", ["$event"]) mouseout(e: any) {
    e.preventDefault(); // Prevent Default
    this.dragging = false;
    this.cursor = "default";
    this.zIndex = 1;
  }

  @HostListener("document:mousemove", ["$event"]) mousemove(e: any) {
    e.preventDefault(); // Prevent Default
    // If not dragging
    if (!this.dragging) return;

    let newTop = e.pageY - this.mousePosition.y + this.offset.y; // New top value
    let newLeft = e.pageX - this.mousePosition.x + this.offset.x; // new left value

    // Check if the lement will be inside the container

    let newCors = this.cordinates(newTop, newLeft);

    // Update top and left values
    this.top = newCors.top + "px";
    this.left = newCors.left + "px";
  }

  cordinates(top, left): { top: number; left: number } {
    this.elRef.nativeElement.parentNode.offsetWidth;

    // Get container height and width
    let containerHeight = this.elRef.nativeElement.parentNode.offsetHeight;
    let containerWidth = this.elRef.nativeElement.parentNode.offsetWidth;

    // Get element width and height
    let elHeight = this.elRef.nativeElement.offsetHeight;
    let elWidth = this.elRef.nativeElement.offsetWidth;

    // Get the max values the element can have
    let maxTop = containerHeight - elHeight;
    let maxLeft = containerWidth - elWidth;

    if (top < 0) {
      top = 0;
    } else if (top > maxTop) {
      top = maxTop;
    }

    if (left < 0) {
      left = 0;
    } else if (left > maxLeft) {
      left = maxLeft;
    }

    return {
      top: top,
      left: left
    };
  }


  @HostListener("click")
  onClick(){
    this.txtService.changeActive(this.elRef.nativeElement.querySelector(".txt-container"))
  }

}
