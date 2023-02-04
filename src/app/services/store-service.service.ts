import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotificationItem } from "../models/notification.model";
import { ApiService } from "./apiservice.component";

@Injectable()
export class StoreService {
  private userNumber;
  private readonly _apporvalNotificationItems = new BehaviorSubject<NotificationItem[]>([]);

  constructor(private apiService:ApiService) {
    this.userNumber = localStorage.getItem("userNumber");
  }
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  // Expose the observable$ part of the _todos subject (read only stream)
  readonly approvalNotifications$ = this._apporvalNotificationItems.asObservable().pipe(
    /** shareReplay does two things, caches the last emitted value, 
        so components that subscribe after a value been emitted can still display the value,
        and shares the same observable between all observers, 
        instead of creating new observables on each subscription
    */
    shareReplay(1) 
  )

  // the getter will return the last value emitted in _todos subject
  get getNotifications(): NotificationItem[] {
    return this._apporvalNotificationItems.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set setNotifications(notifications: NotificationItem[]) {
    this._apporvalNotificationItems.next(notifications);
  }

  public removeNotification(id: number) {
    this.setNotifications = this.getNotifications.filter(todo => todo.itemNumber !== id);
  }

  public updateNotifications(){
    this.apiService.getPendingApprovals(this.userNumber).subscribe((response:NotificationItem[])=>{
       this.setNotifications=response;
    });
  }
}