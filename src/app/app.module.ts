import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSearchComponent } from './features/main-search/main-search.component';
import { MaterialModule } from './app.material.module';
import { LoginComponent } from './features/login/login.component';
import { AuthService } from './services/authservice.component';
import { ApiService } from './services/apiservice.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/authInterceptor.component';
import { MenuComponent } from './features/menu/menu.component';
import { MainCreateComponent } from './features/main-create/main-create.component';
import { ConfigService,ConfigModule } from './services/configservice.component';
import { AddElementComponent } from './features/add-element/add-element.component';
import { ShareItemComponent } from './features/share-item/share-item.component';
import { SidenavService } from './services/side-navservice.service';
import { MyListsComponent } from './features/my-lists/my-lists.component';
import { UserFeedComponent } from './features/user-feed/user-feed.component';
import { NewsComponent } from './features/news/news.component';
import { QuickListsComponent } from './features/quick-lists/quick-lists.component';
import { FollowingComponent } from './features/following/following.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { StoreService } from './services/store-service.service';
import { SearchHeaderComponent } from './features/search-header/search-header.component';
import { ApplicationStateService } from './services/application-state.service';

@NgModule({
  declarations: [
    AppComponent,
    MainSearchComponent,
    LoginComponent,
    MenuComponent,
    MainCreateComponent,
    AddElementComponent,
    ShareItemComponent,
    MyListsComponent,
    UserFeedComponent,
    NewsComponent,
    QuickListsComponent,
    FollowingComponent,
    ProfileComponent,
    NotificationsComponent,
    SearchHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,ConfigModule.init(),
    AuthService,
    ApiService,
    HttpClient,
    SidenavService,
    UserFeedComponent,
    StoreService,
    ProfileComponent,
    ApplicationStateService,
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
