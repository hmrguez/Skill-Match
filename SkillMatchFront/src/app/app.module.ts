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
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {TabViewModule} from "primeng/tabview";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth.guard";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProfileComponent } from './components/profile/profile.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { GithubReposComponent } from './components/github-repos/github-repos.component';
import {TreeTableModule} from "primeng/treetable";

function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SkillsComponent,
    LoginComponent,
    ProfileComponent,
    GithubReposComponent,
  ],
  imports: [
    // Jwt
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [],
      },
    }),

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // Primeng
    TableModule, TagModule, RatingModule, FormsModule, CardModule, ProgressBarModule, TabViewModule, ToastModule, ButtonModule, InputTextModule, TreeTableModule
  ],
  providers: [JwtHelperService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
