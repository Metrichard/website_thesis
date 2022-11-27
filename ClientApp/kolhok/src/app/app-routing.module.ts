import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DocumentStorageComponent } from './document-storage/document-storage.component';
import { DormPageComponent } from './dorms-page/dorm-page/dorm-page.component';
import { DormsPageComponent } from './dorms-page/dorms-page.component';
import { ErrorComponent } from './error/error.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OrganizationComponent } from './organization/organization.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';
import { PresidencyComponent } from './presidency/presidency.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main-page', component: MainPageComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'dorms', component: DormsPageComponent},
  { path: 'post-editor', component: PostEditorComponent, canActivate: [RouteGuardService]},
  { path: 'file-manager', component: FileManagerComponent, canActivate: [RouteGuardService]},
  { path: 'dorm/:id', component: DormPageComponent, canActivate: [RouteGuardService] },
  { path: 'organization', component: OrganizationComponent },
  { path: 'presidency', component: PresidencyComponent },
  { path: 'public-document-storage', component: DocumentStorageComponent },

  { path: 'logout', component: LogOutComponent, canActivate: [RouteGuardService]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
