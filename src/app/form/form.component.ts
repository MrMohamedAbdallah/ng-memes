import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TxtService } from "../shared/services/txt.service";
import * as html2canvas from "html2canvas";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  menuOpen: boolean = true;

  element: any = null;
  lastStrokeColor = "";
  activatedElement: any = null;

  form: FormGroup = new FormGroup({
    text: new FormControl(),
    align: new FormControl(),
    font: new FormControl(),
    size: new FormControl(),
    padding: new FormControl(),
    colors: new FormGroup({
      font: new FormControl(),
      background: new FormControl()
    })
  });

  constructor(private txtService: TxtService, private renderer: Renderer2) {}

  ngOnInit() {
    this.txtService.active.subscribe(e => {
      this.element = e;
    });

    this.txtService.active.subscribe(e => {
      if (!e) return;
      this.element = e;

      this.form.setValue({
        text: e.innerText,
        align: e.style.justifyContent ? e.style.justifyContent : "flex-start",
        font: e.style.fontFamily ? e.style.fontFamily : "Rajdhani",
        size: e.style.fontSize ? parseInt(e.style.fontSize) : "24",
        padding: e.style.padding ? parseInt(e.style.padding) : "0",
        colors: {
          font: e.style.color ? e.style.color : "#000000",
          background: e.style.backgroundColor
            ? e.style.backgroundColor
            : "#ffffff"
        }
      });
    });

    this.form.valueChanges.subscribe(() => {
      if (!this.element) return;

      let values = this.form.value;

      this.element.innerText = values.text;

      this.renderer.setStyle(this.element, "justifyContent", values.align);
      this.renderer.setStyle(this.element, "padding", values.padding + "px");
      this.renderer.setStyle(this.element, "fontFamily", values.font);
      this.renderer.setStyle(this.element, "fontSize", values.size + "px");
      this.renderer.setStyle(this.element, "color", values.colors.font);
      this.renderer.setStyle(
        this.element,
        "backgroundColor",
        values.colors.background
      );


      this.lastStrokeColor = values.colors.stroke;
    });
  }

  onDelete() {
    this.element.parentNode.parentNode.removeChild(this.element.parentNode);
    this.txtService.changeActive(null);
  }

  onSubmit() {
    html2canvas(document.querySelector("#meme-container"), {
      allowTaint: true,
      useCORS: true
    }).then(canvas => {
      let storedContainer = document.querySelector("#stored");

      storedContainer.innerHTML = "";
      storedContainer.appendChild(canvas);
    });
  }
}
