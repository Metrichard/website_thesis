import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEditorModule } from 'ngx-editor';

import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { MainPageComponent } from './main-page/main-page.component';
import { PostComponent } from './post/post.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DormsPageComponent } from './dorms-page/dorms-page.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogOutComponent } from './log-out/log-out.component';
import { DormPageComponent } from './dorms-page/dorm-page/dorm-page.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PersonComponent } from './organization/person/person.component';
import { OrganizationComponent } from './organization/organization.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    LogOutComponent,
    MainPageComponent,
    PostComponent,
    CalendarComponent,
    DormsPageComponent,
    PostEditorComponent,
    FileManagerComponent,
    DormPageComponent,
    PersonComponent,
    OrganizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [DormPageComponent],
})
export class AppModule { }
