import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolService } from './_service/tool.service';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { EditScoreComponent } from './edit-score/edit-score.component';
import { ViewAllScoreComponent } from './view-all-score/view-all-score.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_service/authentication-service.service';
import { TodolistComponent } from './todolist/todolist.component';
import { DatePipe } from '@angular/common';
import { CreateScoreComponent } from './create-score/create-score.component';
import { DraggableDirective } from './draggable-directive.directive';
const routeConfig: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'updatescore', component: UpdateScoreComponent, },
  { path: 'createscore', component: CreateScoreComponent, },
  { path: 'editscore', component: EditScoreComponent, },
  { path: 'viewallscore', component: ViewAllScoreComponent, },
  { path: 'setting', component: SettingComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'todolist', component: TodolistComponent, },
  { path: '', redirectTo: '/createscore', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    HomeComponent,
    PageNotFoundComponent,
    UpdateScoreComponent,
    EditScoreComponent,
    ViewAllScoreComponent,
    SettingComponent,
    LoginComponent,
    TodolistComponent,
    CreateScoreComponent,
    DraggableDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [ToolService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
