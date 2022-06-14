import { IUser } from './user';

export interface IExpense {
  avatar: string;
  name: string;
  date: string;
  receiptImgFormId: string;
  receiptFormId: string;
  splitFormId: string;
  users: Array<IUser>;
  total: number;
  password: string;
}

export class Expense implements IExpense {
  avatar: string;
  name: string;
  date: string;
  receiptImgFormId: string;
  receiptFormId: string;
  splitFormId: string;
  users: Array<IUser>;
  total: number;
  password: string;

  constructor(
    avatar: string,
    name: string,
    date: string,
    receiptImgFormId: string,
    receiptFormId: string,
    splitFormId: string,
    users: Array<IUser>,
    total: number,
    password: string
  ) {
    this.avatar = avatar || '';
    this.name = name || '';
    this.date = date || '';
    this.receiptFormId = receiptFormId || '';
    this.receiptImgFormId = receiptImgFormId || '';
    this.splitFormId = splitFormId || '';
    this.users = users || '';
    this.total = total || 0;
    this.password = password || '';
  }

  static create(expenseObj: any) {
    const {
      avatar,
      name,
      data,
      receiptFormId,
      receiptImgFormId,
      splitFormId,
      users,
      total,
      password
    } = expenseObj;
    return new Expense(
      avatar,
      name,
      data,
      receiptFormId,
      receiptImgFormId,
      splitFormId,
      users,
      total,
      password
    );
  }
}
