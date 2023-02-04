import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-lists',
  templateUrl: './quick-lists.component.html',
  styleUrls: ['./quick-lists.component.css']
})
export class QuickListsComponent implements OnInit {
  myFormGroup:FormGroup;
  myFormGroupSubs:Subscription;  
  number_of_items:number[]=new Array(0);
  elementsCreated:number=0;
  listName:FormControl;

  constructor() { }

  ngOnInit() {
    let group={}
    group['number_of_items']= new FormControl('');      
    this.myFormGroup = new FormGroup(group);
  }

  onSubmit(){
    console.log(this.myFormGroup.value);
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.number_of_items, event.previousIndex, event.currentIndex);
  }

  addItem(){
    this.elementsCreated++;
    this.number_of_items.push(this.elementsCreated);
    const fc = new FormControl('');
      this.myFormGroup.addControl(this.elementsCreated.toString(),fc)
  }

  clearFields(){

  }
}
