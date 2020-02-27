import { Component, OnInit } from '@angular/core';
import { TxtService } from "../shared/services/txt.service";
import { ImgsService } from '../shared/services/imgs.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  txt: any[] = [] ;
  selected: number = -1;
  imgUrl: string = "";

  constructor(private txtService: TxtService, public imgService: ImgsService) { }

  ngOnInit() {
    this.txtService.changes.subscribe((arr) => {
      this.txt = arr;
    });

    this.txtService.selectedChanges.subscribe((index) => {
      this.selected = index;
    });

    this.imgService.urlChange.subscribe((url: string) => {
      this.imgUrl = url;
    });
    
  }



}
