import { Directive, ElementRef, OnInit, HostListener } from "@angular/core";

@Directive({
  selector: ".hand"
})
export class ResizableDirective implements OnInit {
  // Global variables
  isDown = false; // Mouse down indecator
  parent = null;
  hand = null;
  prevHeight = null; // Previous height for parent element
  prevWidth = null; // Previous width for parent element
  page = null; // Store cursor point offset
  minWidth = 20; // Min Width
  minHeight = 20; // Min Height

  constructor(public elRef: ElementRef) {}

  ngOnInit() {
    this.parent = this.elRef.nativeElement.parentNode;
    this.hand = this.elRef.nativeElement;
  }

  @HostListener("mousedown", ["$event"])
  mousedown(e: MouseEvent) {
    this.isDown = true;

    // Store current height and width before resizing
    this.prevHeight = this.parent.clientHeight;
    this.prevWidth = this.parent.clientWidth;

    // Set offset values
    this.page = {
      y: e.pageY,
      x: e.pageX
    };
  }

  @HostListener("document:mouseup", ["$event"])
  @HostListener("mouseup", ["$event"])
  mouseup(e: MouseEvent) {
    this.isDown = false;
  }

  @HostListener("document:mousemove", ["$event"])
  @HostListener("mousemove", ["$event"])
  mousemove(e: MouseEvent) {
    // Stop if no dragging
    if (!this.isDown) return;

    // Calculate the distance that cursor moved
    let y = this.page.y - e.pageY;
    let x = this.page.x - e.pageX;

    // Check which direction to resize
    if (this.hand.classList.contains("hand-top")) {
      // Top Hand
      let newHeight = this.prevHeight + y;

      // Getting max height
      let rect1 = this.parent.getBoundingClientRect();
      let rect2 = this.parent.parentNode.getBoundingClientRect();

      let maxHeight = rect1.top - rect2.top + rect1.height;

      if (maxHeight < newHeight) {
        return;
      }

      if (newHeight >= this.minHeight) {
        this.parent.style.top =
          e.pageY - this.parent.parentNode.offsetTop + "px"; // Set top postion
        // Set new height value to the element
        this.parent.style.height = newHeight + "px";
      } else {
        this.parent.style.height = this.minHeight + "px";
      }
    }

    if (this.hand.classList.contains("hand-bottom")) {
      // Bottom hand
      // Calculate the height
      let newHeight = this.prevHeight - y;

      // Getting max height
      let rect1 = this.parent.getBoundingClientRect();
      let rect2 = this.parent.parentNode.getBoundingClientRect();

      let maxHeight = rect2.top + rect2.height - rect1.top;

      if (maxHeight < newHeight) {
        return;
      }

      if (newHeight >= this.minHeight) {
        // Set new height value to the element
        this.parent.style.height = newHeight + "px";
      } else {
        this.parent.style.height = this.minHeight + "px";
      }

      this.parent.style.bottom =
        e.pageY -
        this.parent.parentNode.offsetTop +
        this.parent.clientHeight +
        "px"; // Set bottom positoin
    }

    if (this.hand.classList.contains("hand-right")) {
      // Right hand
      // Calculate the wdidth
      let newWidth = this.prevWidth - x;

      // Getting max Width
      let rect1 = this.parent.getBoundingClientRect();
      let rect2 = this.parent.parentNode.getBoundingClientRect();

      let maxWidth = rect2.left + rect2.width - rect1.left;

      if (maxWidth < newWidth) {
        return;
      }

      if (newWidth >= this.minWidth) {
        this.parent.style.right =
          e.pageX -
          this.parent.parentNode.offsetLeft +
          this.parent.clientWidth +
          "px"; // Set right position
        // Set new wdidth value to the element
        this.parent.style.width = newWidth + "px";
      } else {
        this.parent.style.width = this.minWidth + "px";
      }
    }

    if (this.hand.classList.contains("hand-left")) {
      // Left hand
      // Calculate the wdidth
      let newWidth = x + this.prevWidth;

      // Getting max Width
      let rect1 = this.parent.getBoundingClientRect();
      let rect2 = this.parent.parentNode.getBoundingClientRect();

      let maxWidth = rect1.left - rect2.left + rect1.width;

      if (maxWidth < newWidth) {
        return;
      }

      if (newWidth >= this.minWidth) {
        this.parent.style.left =
          e.pageX - this.parent.parentNode.offsetLeft + "px"; // Set left position
        // Set new wdidth value to the element
        this.parent.style.width = newWidth + "px";
      } else {
        this.parent.style.width = this.minWidth + "px";
      }
    }
  }
}
