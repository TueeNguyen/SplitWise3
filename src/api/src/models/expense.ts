import { ReceiptForm } from './receiptForm';
import { ReceiptImgForm } from './receiptImgForm';
import { SplitForm } from './splitForm';
import { User } from './user';
import { UserRole } from './userRole';

export interface IExpense {
  avatar: string;
  name: string;
  date: string;

  total: number;
  password: string;
  userRoles?: Array<UserRole>;
  id?: string;

  userIds: Array<string>;
  users?: Array<User>;

  receiptImgFormId: string;
  receiptFormId: string;
  splitFormId: string;
  receiptImgForm?: ReceiptImgForm;
  receiptForm?: ReceiptForm;
  splitForm?: SplitForm;
}

export class Expense implements IExpense {
  avatar: string;
  name: string;
  date: string;
  receiptImgFormId: string;
  receiptFormId: string;
  splitFormId: string;
  userIds: Array<string>;
  total: number;
  password: string;
  userRoles?: Array<UserRole>;
  id?: string;
  users?: Array<User>;
  receiptImgForm?: ReceiptImgForm;
  receiptForm?: ReceiptForm;
  splitForm?: SplitForm;

  constructor(
    name: string,
    date: string,
    avatar?: string,
    receiptImgFormId?: string,
    receiptFormId?: string,
    splitFormId?: string,
    userIds?: Array<string>,
    password?: string,
    id?: string,
    total?: number
  ) {
    this.avatar =
      avatar ||
      'https://firebasestorage.googleapis.com/v0/b/splitwise3-e6c96.appspot.com/o/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?alt=media&token=0a008fd2-283b-4c13-aa0c-3f08ab869a45';
    this.name = name || '';
    this.date = date || '';
    this.receiptFormId = receiptFormId || '';
    this.receiptImgFormId = receiptImgFormId || '';
    this.splitFormId = splitFormId || '';
    this.userIds = userIds || [];
    this.total = total || 0;
    this.password = password || '';
  }
  set setId(id: string) {
    this.id = id;
  }
  set setUserRoles(userRoles: Array<UserRole>) {
    this.userRoles = userRoles;
  }
  set setUsers(users: Array<User>) {
    this.users = users;
  }
  set setReceiptForm(receiptForm: ReceiptForm) {
    this.receiptForm = receiptForm;
  }
  set setReceiptImgForm(receiptImgForm: ReceiptImgForm) {
    this.receiptImgForm = receiptImgForm;
  }
  set setSplitForm(splitForm: SplitForm) {
    this.splitForm = splitForm;
  }
  static create(expenseObj: any) {
    const {
      avatar,
      date,
      name,
      receiptFormId,
      receiptImgFormId,
      splitFormId,
      userIds,
      total,
      password,
      id
    } = expenseObj;
    const expense = new Expense(
      name,
      date,
      avatar,
      receiptImgFormId,
      receiptFormId,
      splitFormId,
      userIds,
      password,
      total
    );
    expense.setId = id;
    return expense;
  }
}
