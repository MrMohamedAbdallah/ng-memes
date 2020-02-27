import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TxtService {


  txt: any;

  public changes: EventEmitter<any> = new EventEmitter<any>();
  public selectedChanges: EventEmitter<any> = new EventEmitter<any>();
  public active: EventEmitter<any> = new EventEmitter<any>();
  

  constructor() { }


  addTxt(){
    this.txt.push(0);
    this.changes.emit(this.getTxt());

    console.log("Added");
  }
  
  removeTxt(index: number){
    this.txt = this.txt.aplice(index, 1);
    this.changes.emit(this.getTxt());
  }

  getTxt(){
    return this.txt;
  }

  select(index: number){
    this.selectedChanges.emit(index);
  }
 
  changeActive(elem){
    this.active.emit(elem);
  }

  deleteAll(){
    this.txt = [];  // Empty the array
    this.changes.emit(this.getTxt());
  }

}
