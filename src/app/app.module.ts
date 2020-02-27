import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MemeComponent } from './meme/meme.component';
import { FormComponent } from './form/form.component';
import { TxtComponent } from './txt/txt.component';
import { DraggableDirective } from './shared/directives/draggable.directive';
import { ResizableDirective } from './shared/directives/resizable.directive';
import { TxtService } from './shared/services/txt.service';
import { ImgsService } from './shared/services/imgs.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MemeComponent,
    FormComponent,
    TxtComponent,
    DraggableDirective,
    ResizableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TxtService,
    ImgsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
