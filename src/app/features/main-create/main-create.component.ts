import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/apiservice.component';
import { MyList } from 'src/app/models/myList.model';
import { SearchItem } from 'src/app/models/main-search.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';

const createTypes = ["List","Item"];

@Component({
  selector: 'app-main-create',
  templateUrl: './main-create.component.html',
  styleUrls: ['./main-create.component.css']
})
export class MainCreateComponent implements OnInit {
  createTypes = createTypes;
  selectedType = "List";
  isList = true;
  myLists;
  myList;
  createForm:FormGroup;
  name:FormControl;
  description:FormControl;
  list:FormControl;

  constructor(private apiService:ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.myLists().subscribe((data: SearchItem[])=> { this.myLists = data; 
    });
    this.createFormFunc();
  }

  createFormFunc() {
    this.createForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      selectList: new FormControl()
    });
  }
  onSelectCreateType(type)
  {
    this.selectedType=type;
    this.isList = type=='List' ? true: false;
  }

  onSelectList(listId:any)
  {
    this.apiService.getList(listId).subscribe(
      (result: MyList)=>{
            this.myList= result;
      });
  }
  createElement()
  {
    this.snackBar.open("Created Element", "", {
      duration: 2000,
    });
    this.clearFields();
  }

  clearFields()
  {
    this.createForm.reset();
  }
}
