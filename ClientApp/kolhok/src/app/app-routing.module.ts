import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DragComponentComponent } from './drag-component/drag-component.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PostComponent } from './post/post.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main-page', component: MainPageComponent},
  { path: 'post/:id', component: PostComponent, canActivate: [RouteGuardService]},
  { path: 'calendar', component: CalendarComponent},
  { path: 'calendar2', component: DragComponentComponent},

  { path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService]},
  { path: 'logout', component: LogOutComponent, canActivate: [RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
