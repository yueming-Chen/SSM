import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolService } from './tool.service';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { EditScoreComponent } from './edit-score/edit-score.component';
import { ViewAllScoreComponent } from './view-all-score/view-all-score.component';
import { SettingComponent } from './setting/setting.component';

const routeConfig: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'updatescore', component: UpdateScoreComponent, },
  { path: 'editscore', component: EditScoreComponent, },
  { path: 'viewallscore', component: ViewAllScoreComponent, },
  { path: 'setting', component: SettingComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
    SettingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [ToolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
