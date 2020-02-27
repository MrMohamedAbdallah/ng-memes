import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ImgsService } from './shared/services/imgs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularCards';

  @ViewChild("meme") meme: ElementRef;

  constructor(private _img: ImgsService){}

  ngOnInit(){
    // Drop event
    this.meme.nativeElement.addEventListener("drop", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        let url = URL.createObjectURL(e.dataTransfer.files[0]);
        this._img.changeUrl(url);
      }
    });
    // Drag over the element event
    this.meme.nativeElement.addEventListener("dragover", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    });
  }

}
