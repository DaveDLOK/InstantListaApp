import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/apiservice.component';
import { StoreService } from 'src/app/services/store-service.service';
import { ProfileComponent } from '../profile/profile.component';
import { UserFeedComponent } from '../user-feed/user-feed.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userNumber;

  constructor(private apiService:ApiService,private router:Router, 
              public userFeed:UserFeedComponent, public storeService:StoreService,
              public porfile:ProfileComponent) { }

  ngOnInit(): void {
    this.router.navigate(['/menu/news']);    
  }

}
