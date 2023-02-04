import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/apiservice.component';
import { StoreService } from 'src/app/services/store-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userNumber;
  pendigApprovalNotifications:number;
  user:User=new User();
  constructor(private router:Router, private storeService:StoreService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.userNumber = localStorage.getItem("userNumber");
    this.apiService.getUserProfile(this.userNumber).subscribe((response)=>{this.user=response})
    this.storeService.updateNotifications();
    this.storeService.approvalNotifications$.subscribe((data)=>{this.pendigApprovalNotifications=data.length})
  }

  onPendingApprovalsIconClick(){
    this.router.navigate(['/menu/notifications']);
  }
}
