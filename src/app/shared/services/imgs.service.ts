import { Injectable, EventEmitter } from '@angular/core';
import { TxtService } from './txt.service';

@Injectable({
  providedIn: 'root'
})
export class ImgsService {

  url = "";

  urlChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private txtService: TxtService) { }

  changeUrl(url: string){
    this.url = url;
    this.txtService.deleteAll();
    this.urlChange.emit(this.url);
  }
  
}
