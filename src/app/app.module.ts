import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { BarListComponent } from './bar-list/bar-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { routing } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { PhoneComponent } from './phone/phone.component';


@NgModule({
  declarations: [
    AppComponent,
    HereMapComponent,
    BarListComponent,
    HomePageComponent,
    FooterComponent,
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
