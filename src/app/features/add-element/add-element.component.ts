import { BrowserModule } from '@angular/platform-browser'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { SearchItem } from 'src/app/models/main-search.model';
import {ApiService} from '../../services/apiservice.component';
import {MatSnackBar } from '@angular/material/snack-bar';
import { SidenavService } from 'src/app/services/side-navservice.service';
import { ElementItem } from 'src/app/models/element.model';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})

export class AddElementComponent implements OnInit {
  item:ElementItem = new ElementItem();
  myLists;
  isHidden;
  itemValue:string;
  itemType:string;
  loaded:boolean=false;
  
  constructor(private apiService:ApiService, 
              private router:Router, 
              private route:ActivatedRoute,
              private snackBar: MatSnackBar,
              public sideNav: SidenavService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p=>{
      let id = p['id'];
      let type = p['type'];
      this.isHidden  = type =="list" ? true:false;

      this.apiService.getElement(parseInt(id,10),type).subscribe((data:ElementItem) => {

        this.item= data;
        this.loaded = true;
      });
    })
    this.apiService.myLists().subscribe((data: any[])=> { this.myLists = data; });
  }

  addToList()
  {
    this.apiService.addElement(this.item).subscribe((status:any)=>{
      this.openSnackBar("Element added","");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    this.sideNav.close();
  }
}
