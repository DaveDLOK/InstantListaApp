import { User } from './user.model';

export class ShareItem{
    name: string;
    description: string;
    type: string;
    usersToShare: User[];
  }