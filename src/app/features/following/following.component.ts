import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/apiservice.component';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  usersFollowing: User[];
  constructor(private apiService:ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let userNumber = localStorage.getItem("userNumber");

    this.apiService.getContacts(parseInt(userNumber)).subscribe((result)=>{
      this.usersFollowing = result;
    });
  }

  onStopFollowing(user:User)
  {
    //add unfollow endpoint
    let userNumber = localStorage.getItem("userNumber");

    this.snackBar.open("User "+user.userName+" is unfollowed", "", {
      duration: 2000,
    });

    this.apiService.getContacts(parseInt(userNumber)).subscribe((result)=>{
      this.usersFollowing = result;
    });
  }
}
