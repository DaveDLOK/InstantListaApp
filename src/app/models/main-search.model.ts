export class MainSearch{
    total:string;
    returnData:SearchItem[];
}

export class SearchItem{
    id:number;
    type:string;
    name:string;
    description:string;
    public:boolean;
    subscribed: boolean;
}