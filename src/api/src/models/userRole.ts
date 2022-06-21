export interface IUserRole {
  uid: string;
  role: string;
  expenseId: string;
  id: string;
}

export class UserRole implements IUserRole {
  uid: string;
  role: string;
  expenseId: string;
  id: string;
  constructor(id: string, uid: string, role: string, expenseId: string) {
    this.id = id;
    this.uid = uid;
    this.role = role;
    this.expenseId = expenseId;
  }
}
