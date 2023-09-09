import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SkillsComponent} from "./components/profile-page/skills/skills.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile-page/profile/profile.component";
import {JobsComponent} from "./components/jobs/jobs.component";
import {JobDetailsComponent} from "./components/job-details/job-details.component";
import {CertificationsComponent} from "./components/profile-page/certifications/certifications.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import {DailyChallengeComponent} from "./components/daily-challenge/daily-challenge.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'profile/:username', canActivate: [AuthGuard], component: ProfilePageComponent },
  { path: 'jobs', canActivate: [AuthGuard], component: JobsComponent },
  { path: 'jobs/details/:id', canActivate: [AuthGuard], component: JobDetailsComponent },
  { path: 'daily-challenge', canActivate: [AuthGuard], component: DailyChallengeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
