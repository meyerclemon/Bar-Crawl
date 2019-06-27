import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { BarsComponent } from './bars/bars.component';
// import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    HereMapComponent,
    BarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // routing,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
