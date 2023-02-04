import { User } from "./user.model";

export class NotificationItem{
    itemNumber: number;
    type: string;
    value: string;
    listId: number;
    senderUser: User;
    approvalDate: Date;
  }