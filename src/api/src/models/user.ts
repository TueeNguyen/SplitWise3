export interface IUser {
  uid: string;
  email: string;
  username: string;
  expenseIds: Array<string>;
  avatar: string;
}

export class User implements IUser {
  uid: string;
  email: string;
  username: string;
  expenseIds: Array<string>;
  avatar: string;

  constructor(
    uid: string,
    email: string,
    username: string,
    avatar?: string,
    expenseIds?: Array<string>
  ) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.avatar = avatar || '';
    this.expenseIds = expenseIds || [];
  }
}
