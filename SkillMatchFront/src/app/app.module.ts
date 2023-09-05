import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillsComponent } from './components/profile-page/skills/skills.component';
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
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProfileComponent } from './components/profile-page/profile/profile.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TreeTableModule} from "primeng/treetable";
import { JobsComponent } from './components/jobs/jobs.component';
import {ToolbarModule} from "primeng/toolbar";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {TabMenuModule} from "primeng/tabmenu";
import { JobDetailsComponent } from './components/job-details/job-details.component';
import {BadgeModule} from "primeng/badge";
import {ChipsModule} from "primeng/chips";
import {FileUploadModule} from "primeng/fileupload";
import { CertificationsComponent } from './components/profile-page/certifications/certifications.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ExperienceComponent } from './components/profile-page/experience/experience.component';

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
    JobsComponent,
    JobDetailsComponent,
    CertificationsComponent,
    ProfilePageComponent,
    ExperienceComponent,
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
    TableModule, TagModule, RatingModule, FormsModule, CardModule, ProgressBarModule, TabViewModule, ToastModule, ButtonModule, InputTextModule, TreeTableModule, ToolbarModule, InputNumberModule, DialogModule, RippleModule, DropdownModule, TabMenuModule, BadgeModule, ChipsModule, FileUploadModule
  ],
  providers: [JwtHelperService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
