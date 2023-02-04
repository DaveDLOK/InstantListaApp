import { Component, OnInit } from '@angular/core';
import { FeedItem } from 'src/app/models/feed.model';
import { ApiService } from 'src/app/services/apiservice.component';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  userNumber;
  feedItems:FeedItem[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.userNumber = localStorage.getItem("userNumber");
    this.apiService.getUserFeed(this.userNumber).subscribe((data)=>{
        this.feedItems=data;
    });
  }

  refreshFeed():void{
    this.apiService.getUserFeed(this.userNumber).subscribe((data)=>{
      this.feedItems=data;
  });
  }
}
