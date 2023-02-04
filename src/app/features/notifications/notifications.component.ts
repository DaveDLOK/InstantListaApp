import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SearchItem } from 'src/app/models/main-search.model';
import { NotificationItem } from 'src/app/models/notification.model';
import { ApiService } from 'src/app/services/apiservice.component';
import { SidenavService } from 'src/app/services/side-navservice.service';
import { StoreService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @ViewChild('rightSideNav') public sideNav: MatDrawer;
  userNumber;
  elementsApproved:NotificationItem[];
  rightNavOpen: boolean =true;

  constructor(private apiService:ApiService, private router:Router,
               private snackBar: MatSnackBar, private sidenavService:SidenavService, public storeService:StoreService) { }

  ngOnInit(): void {
    this.userNumber = localStorage.getItem("userNumber");
    this.apiService.getApprovedElements(this.userNumber).subscribe((data)=>{
      this.elementsApproved = data;
    });
  }

  onAddClick(item:NotificationItem){
    this.sidenavService.setSidenav(this.sideNav);
    this.router.navigate(['/menu/notifications/addElement'], {queryParams:{id:item.itemNumber, type:item.type, name:item.value}} );
    this.sidenavService.open();
  }

  onApproveFollowClick(userToFollow)
  {
    //add api to approve user
      this.snackBar.open("Following user now", "", {
        duration: 2000,
      });
  }
  onDeletePendingItemClick(pendingItemId)
  {
    //add api to approve user
      this.storeService.removeNotification(pendingItemId);
      this.snackBar.open("Pending item discarded", "", {
        duration: 2000,
      });
  }
}
