export interface ISplitFormElem {
  userId: string;
  owned: Number;
  fixed: Boolean;
  note: string;
}
export class SplitFormElem implements ISplitFormElem {
  userId: string;
  owned: Number;
  fixed: Boolean;
  note: string;

  constructor(userId: string, owned: Number, fixed: Boolean, note: string) {
    this.userId = userId || '';
    this.owned = owned || 0;
    this.fixed = fixed || false;
    this.note = note || '';
  }
  static createSplitFormElemArray(array: Array<any>): Array<SplitFormElem> {
    return array.map((elem) => new SplitFormElem(elem.userId, elem.owned, elem.fixed, elem.note));
  }
}

export interface ISplitForm {
  data: Array<SplitFormElem>;
}

export class SplitForm implements ISplitForm {
  data: Array<SplitFormElem>;

  constructor(data: Array<SplitFormElem> = []) {
    this.data = data || [];
  }
  static create(splitFormObj: SplitForm) {
    const { data } = splitFormObj;
    return new SplitForm(data);
  }
  static createFromArray(data: Array<SplitFormElem>) {
    return new SplitForm(data);
  }
}
