import { User } from "./user.model";
import { ElementItem } from 'src/app/models/element.model';

export class MyList{
    id: number;
    name: string;
    description: string;
    views: number;
    creator: string;
    elements: ElementItem[];
    public: boolean;
    detailInfo: MyListPersonalInfo;
  }

export class MyListPersonalInfo{
    ranking: number;
    users: User[];
}