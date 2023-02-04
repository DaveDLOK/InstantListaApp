import { SelectorListContext } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchItem } from 'src/app/models/main-search.model';
import { MyList } from 'src/app/models/myList.model';
import { User } from 'src/app/models/user.model';
import {ApiService} from '../../services/apiservice.component';
import { ShareItemComponent } from '../share-item/share-item.component'

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {
  myLists:SearchItem[];
  usersForSharing: User[];
  panelOpenState = false;
  myList:MyList = new MyList();
  listRank : any;
  
  constructor(private apiService:ApiService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    let userNumber = localStorage.getItem("userNumber");

    this.apiService.myLists().subscribe((data: SearchItem[])=> { this.myLists = data; 
        var listId = data[0].id;
        this.apiService.getList(listId).subscribe(
          (result: MyList)=>{
                this.myList= result;
                this.listRank = result.detailInfo.ranking;
          });
    });

    
    this.apiService.getContacts(parseInt(userNumber)).subscribe((result)=>{
      this.usersForSharing = result;
    });
  }

  onSelectList(listId:any)
  {
    this.apiService.getList(listId).subscribe(
      (result: MyList)=>{
            this.myList= result;
            this.listRank = result.detailInfo.ranking;
      });
  }

  onShareClick(elementToShare)
  {
    var name = elementToShare.name;
    var type = "list";

    if(elementToShare.type=='item')
    {
      name = elementToShare.value;
      type = elementToShare.type;
    }
    
    const dialogRef = this.dialog.open(ShareItemComponent, {
      width: '380px',
      data: {
          name: name,
          description: elementToShare.description,
          type: type,
          usersToShare:this.usersForSharing
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
