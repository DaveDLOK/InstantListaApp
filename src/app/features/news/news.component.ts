import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { ApiService } from 'src/app/services/apiservice.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getNews().subscribe((data)=>{ this.news = data; })
  }

}
