export interface IUserRole {
  uid: string;
  role: string;
  expenseId: string;
}

export class UserRole implements IUserRole {
  uid: string;
  role: string;
  expenseId: string;

  constructor(uid: string, role: string, expenseId: string) {
    this.uid = uid;
    this.role = role;
    this.expenseId = expenseId;
  }
}
