export interface IReceiptImgFormElem {
  receiptImgUrl: string;
  name: string;
}
export class ReceiptImgFormElem implements IReceiptImgFormElem {
  receiptImgUrl: string;
  name: string;

  constructor(receiptImgUrl: string, name: string) {
    this.receiptImgUrl = receiptImgUrl || '';
    this.name = name || '';
  }
}

export interface IReceiptImgForm {
  data: Array<ReceiptImgFormElem>;
}

export class ReceiptImgForm implements IReceiptImgForm {
  data: Array<ReceiptImgFormElem>;

  constructor(data: Array<ReceiptImgFormElem> = []) {
    this.data = data;
  }

  static create(receiptImgFormObj: ReceiptImgForm): ReceiptImgForm {
    const { data } = receiptImgFormObj;
    return new ReceiptImgForm(data);
  }
}
