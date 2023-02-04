import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShareItem } from 'src/app/models/share.model';
import { User } from 'src/app/models/user.model';
import {Observable, EMPTY} from 'rxjs';
import {map, startWith, debounceTime, switchMap, distinctUntilChanged} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-item',
  templateUrl: './share-item.component.html',
  styleUrls: ['./share-item.component.css']
})

export class ShareItemComponent implements OnInit {

  friendsFiltered;
  myControl = new FormControl();
  
  constructor(
    public dialogRef: MatDialogRef<ShareItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShareItem, private snackBar: MatSnackBar) {}

  ngOnInit() {
      this.friendsFiltered = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(user => this._filter(user))
      );
  }

  private _filter(value: string) {
    
    const filterValue = value.toLowerCase().trim();
    if(filterValue==''){
      return [];
    }
    
    return this.data.usersToShare.filter(u => u.userName.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {  
    //add share endpoint
      this.snackBar.open("Shared with user", "", {
        duration: 2000,
      });
      this.dialogRef.close();
  }
}
