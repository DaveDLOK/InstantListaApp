import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';
import { MainSearchComponent } from './features/main-search/main-search.component';
import { LoginComponent } from './features/login/login.component';
import { MenuComponent} from './features/menu/menu.component'
import { MainCreateComponent } from './features/main-create/main-create.component';
import { AddElementComponent } from './features/add-element/add-element.component';
import { MyListsComponent } from './features/my-lists/my-lists.component';
import { UserFeedComponent } from './features/user-feed/user-feed.component';
import { NewsComponent } from './features/news/news.component';
import { QuickListsComponent } from './features/quick-lists/quick-lists.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ApplicationStateService } from './services/application-state.service';

const desktop_routes: Routes = [
  
  { path:'login', component: LoginComponent },
  
  { path: 'menu',component:MenuComponent, 
  
    children:[ 
      { path:'news', component: NewsComponent},
      { path:'quickLists', component: QuickListsComponent},
      { path: 'myFeed', component: UserFeedComponent },
      { path: 'myLists', component: MyListsComponent },
      { path:'mainSearch', component: MainSearchComponent,
        children:[
          { path: 'addElement', component: AddElementComponent }
        ]
      },
      { path: 'mainCreate', component: MainCreateComponent },
      { path: 'notifications', component: NotificationsComponent,
        children:[
          { path: 'addElement', component: AddElementComponent }
        ]
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

const mobile_routes: Routes=[
  { path:'login', component: LoginComponent },
  { path: 'myFeed', component: UserFeedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes, {onSameUrlNavigation: 'reload', preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }
}
