import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { NotStorkComponent } from './application/not-stork/not-stork.component';
import { StorkComponent } from './application/stork/stork.component';
import { WaitingListComponent } from './application/waiting-list/waiting-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DormsPageComponent } from './dorms-page/dorms-page.component';
import { ErrorComponent } from './error/error.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main-page', component: MainPageComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'dorms', component: DormsPageComponent},
  { path: 'application-editing', component: ApplicationComponent, canActivate: [RouteGuardService]},
  { path: 'stork', component: StorkComponent},
  { path: 'notstork', component: NotStorkComponent},
  { path: 'waiting-list', component: WaitingListComponent},
  { path: 'post-editor', component: PostEditorComponent, canActivate: [RouteGuardService]},

  { path: 'logout', component: LogOutComponent, canActivate: [RouteGuardService]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
