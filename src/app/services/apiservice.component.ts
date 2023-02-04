
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { TokenJWT } from '../models/token-jwt.model'
import { MainSearch, SearchItem} from '../models/main-search.model';
import { ElementItem } from '../models/element.model';
import { ConfigService } from './configservice.component';
import { MyList } from '../models/myList.model';
import { User } from '../models/user.model';
import { FeedItem } from '../models/feed.model';
import { News } from '../models/news.model';
import { NotificationItem } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private configService:ConfigService) {
  }

  login(email:string, password:string ) {
    return this.http.post<TokenJWT>(this.configService.getApi('login'), {email,password});
  }

  refresh(idToken:string){
    return this.http.post<TokenJWT>(this.configService.getApi('refresh'), { idToken }, { withCredentials: true })
  }

  search(searchString:string, type:string){
    var url =this.configService.getApi('search').replace('{0}',searchString).replace('{1}',type);
    return this.http.get<string[]>(url);
  }

  paginatedSearch(searchString:string, type:string, offset:string, limit:string){
    let params = new HttpParams();
    params = params.set('type',type);
    params = params.set('queryString',searchString);
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.http.get<MainSearch>(this.configService.getApi('paginatedSearch')+params.toString() );
  }

  myLists()
  {
    return this.http.get<SearchItem[]>(this.configService.getApi('myLists'));
  }

  getElement(id:number, type:string)
  {
    var url =this.configService.getApi('getElementDetails').replace('{0}',id.toString()).replace('{1}',type);
    return this.http.get<ElementItem>(url);
  }

  addElement(elementModel:ElementItem)
  {
    return this.http.post<any>(this.configService.getApi('addElement'),{ 
      id: elementModel.itemNumber,
      value: elementModel.value,
      listId : elementModel.listNumber,
      userNumber : elementModel.userNumber,
      elementType: elementModel.type
    });
  }

  getList(id:number)
  {
    var url =this.configService.getApi('getList').replace('{0}',id.toString());
    return this.http.get<MyList>(url);
  }

  getContacts(userNumber:number)
  {
    var url =this.configService.getApi('getContacts').replace('{0}',userNumber.toString());
    return this.http.get<User[]>(url);
  }

  getUserFeed(userNumber:number)
  {
    var url = this.configService.getApi('getFeed').replace('{0}',userNumber.toString());
    return this.http.get<FeedItem[]>(url);
  }

  getNews()
  {
    return this.http.get<News[]>(this.configService.getApi('getNews'));
  }

  getPendingApprovals(userNumber:number)
  {
    var url = this.configService.getApi('getPendingApprovals').replace('{0}',userNumber.toString());
    return this.http.get<NotificationItem[]>(url);
  }

  getApprovedElements(userNumber:number)
  {
    var url = this.configService.getApi('getApprovedElements').replace('{0}',userNumber.toString());
    return this.http.get<NotificationItem[]>(url);
  }

  getUserProfile(userNumber:number)
  {
    var url = this.configService.getApi('getProfileInformation').replace('{0}',userNumber.toString());
    return this.http.get<User>(url);
  }
}