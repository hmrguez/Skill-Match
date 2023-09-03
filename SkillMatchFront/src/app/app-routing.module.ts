import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SkillsComponent} from "./components/skills/skills.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {JobsComponent} from "./components/jobs/jobs.component";
import {JobDetailsComponent} from "./components/job-details/job-details.component";
import {CertificationsComponent} from "./components/certifications/certifications.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'skills', canActivate: [AuthGuard], component: SkillsComponent },
  { path: 'profile/:username', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'jobs', canActivate: [AuthGuard], component: JobsComponent },
  { path: 'jobs/details/:id', canActivate: [AuthGuard], component: JobDetailsComponent },
  { path: 'certifications', canActivate: [AuthGuard], component: CertificationsComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
