import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ImgsService } from '../shared/services/imgs.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  imgs: string[] = [];

  constructor(public imgService: ImgsService, private httpClient: HttpClient) { }

  ngOnInit() {

    this.form.controls.search.valueChanges.subscribe(value => {
      this.getImages(value).subscribe((arr: any) => {
        this.imgs = [];
          for(let i = 0 ; i < arr.result.length; i++){
            this.imgs.push(arr.result[i].imageUrl);
          }
      })
    })

  }

  getImages(searchKey: string){
    let params = new HttpParams()
                    .set("q", searchKey)
                    .set("pageIndex", "0")
                    .set("pageSize", "12")
                    .set("apiKey", "demo");

    return this.httpClient.get("http://version1.api.memegenerator.net//Generators_Search", {params});
  }

}
