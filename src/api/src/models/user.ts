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
      'https://firebasestorage.googleapis.com/v0/b/splitwise3-e6c96.appspot.com/o/geniuses-in-kids-shows.jpg?alt=media&token=a73018cb-ea34-43f2-9dce-1715ca02d6ab';
  }
}
