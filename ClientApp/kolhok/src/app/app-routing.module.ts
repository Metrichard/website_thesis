import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { WelcomeComponent } from './welcome/welcome.component';

// welcome
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService]},
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
