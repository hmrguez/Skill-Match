import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillsComponent } from './components/skills/skills.component';
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SkillsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Primeng
    TableModule, TagModule, RatingModule, FormsModule, CardModule, ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
