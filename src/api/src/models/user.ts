export interface IUser {
  uid: string;
  email: string;
  username: string;
  avatar: string;
}

export class User implements IUser {
  uid: string;
  email: string;
  username: string;
  avatar: string;

  constructor(uid: string, email: string, username: string, avatar?: string) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.avatar =
      avatar ||
      'https://firebasestorage.googleapis.com/v0/b/splitwise3-e6c96.appspot.com/o/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?alt=media&token=0a008fd2-283b-4c13-aa0c-3f08ab869a45';
  }
}
