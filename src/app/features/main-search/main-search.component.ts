import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {Observable, EMPTY} from 'rxjs';
import {map, startWith, debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';
import { MainSearch, SearchItem } from 'src/app/models/main-search.model';
import {ApiService} from '../../services/apiservice.component';
import { Router } from '@angular/router';
import { ShareItemComponent } from '../share-item/share-item.component'
import {MatDialog} from '@angular/material/dialog';
import {MatDrawer} from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import {SidenavService} from '../../services/side-navservice.service'
import { ShareItem } from 'src/app/models/share.model';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const searchTypes = ["Lists","Users","Items"];

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {
  @ViewChild('rightSideNav') public sideNav: MatDrawer;
  myControl = new FormControl();
  dataService;
  filteredOptions: Observable<any[]>;
  selectedType;
  searchString: string;
  pageEvent: PageEvent;
  dataSource:SearchItem[];
  pageIndex: number;
  pageSize: number;
  length: number;
  noResults= false;
  searchTypes =searchTypes;
  initialElementsInCatalog = 5;
  rightNavOpen: boolean =true;
  shareItem: ShareItem;
  usersForSharing: User[];

  constructor(private apiService:ApiService, private router:Router, public dialog: MatDialog, private snackBar: MatSnackBar, private sidenavService:SidenavService)
  {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => {return this._filter(value||'')})
      );
  }

  ngOnInit(): void {
    let userNumber = localStorage.getItem("userNumber");

    this.selectedType="Lists";
    this.rightNavOpen=false;
    this.apiService.getContacts(parseInt(userNumber)).subscribe((result)=>{
      this.usersForSharing = result;
    });
  }

  private _filter(value: string): Observable<any[]> {
    
    const filterValue = value.toLowerCase().trim();
    if(filterValue==''){
      return EMPTY;
    }
    
    return this.apiService.search(filterValue, this.selectedType).pipe(map(response => {return response}))
  }

  onSelectSearchType(type)
  {
    this.selectedType=type;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => {return this._filter(value||'')})
      );
  }

  onSearchClick(value)
  {
    this.getServerData(value,0,this.initialElementsInCatalog);
  }

  onShareClick(elementToShare)
  {
    const dialogRef = this.dialog.open(ShareItemComponent, {
      width: '380px',
      data: {
          name: elementToShare.name,
          description: elementToShare.description,
          type: elementToShare.type,
          usersToShare:this.usersForSharing
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onfollowClick(userToFollow)
  {
      this.snackBar.open("Following user now", "", {
        duration: 2000,
      });
  }

  pageChanged(event?:PageEvent){

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
    return event;
  }

  onAddClick(item:SearchItem)
  {
    this.sidenavService.setSidenav(this.sideNav);
    this.router.navigate(['/menu/mainSearch/addElement'], {queryParams:{id:item.id, type:item.type, name:item.name}} );
    this.sidenavService.open();
  }

  
  private getServerData(value,offset,limit){
    this.dataSource = null;
    this.noResults =false;

    const filterValue = value.toLowerCase().trim();
    this.searchString = filterValue;
    this.apiService.paginatedSearch(filterValue, this.selectedType, offset, limit).subscribe(
    (response:MainSearch)=>{
        if(parseInt(response.total)>0)
        {
          this.dataSource = response.returnData;
          this.length = parseInt(response.total);
        }
        else{
          this.noResults=true;
        }
    });
  }

  private getNextData(currentSize,offset,limit){
    this.dataSource = null;
    this.apiService.paginatedSearch(this.searchString, this.selectedType, offset, limit).subscribe(
    (response:MainSearch)=>{
        this.dataSource = response.returnData;
        this.length = parseInt(response.total);
    });
  }
  
}
