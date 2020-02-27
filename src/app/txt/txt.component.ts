import { Component, OnInit, Input, HostListener } from "@angular/core";
import { TxtService } from "../shared/services/txt.service";

@Component({
  selector: "app-txt",
  templateUrl: "./txt.component.html",
  styleUrls: ["./txt.component.css"]
})
export class TxtComponent implements OnInit {
  @Input("index") index: number;

  constructor(private txtService: TxtService) {}

  ngOnInit() {}

  @HostListener("click")
  onclick() {
    this.txtService.select(this.index);

    console.log(this);
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentClick(e: any) {
    if (!e.target.classList.contains("txt-container")) {
      this.txtService.select(-1);
    }
  }
}
