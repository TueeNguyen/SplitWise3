import uniqid from 'uniqid';
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
  static createReceiptImgFormElemArray(array: Array<any>): Array<ReceiptImgFormElem> {
    return array.map((elem) => new ReceiptImgFormElem(elem.receiptImgUrl, elem.name));
  }
  converter() {
    return { receiptImgUrl: this.receiptImgUrl, name: this.name };
  }
}

export interface IReceiptImgForm {
  data: Array<ReceiptImgFormElem>;
}

export class ReceiptImgForm implements IReceiptImgForm {
  data: Array<ReceiptImgFormElem>;

  constructor(data: Array<ReceiptImgFormElem> = [], id: string = '') {
    this.data = data;
  }

  static create(receiptImgFormObj: ReceiptImgForm): ReceiptImgForm {
    const { data } = receiptImgFormObj;
    return new ReceiptImgForm(data);
  }
  static createFromArray(data: Array<ReceiptImgFormElem>) {
    return new ReceiptImgForm(data);
  }
  static createFromObject(receiptImgFormObj: any): ReceiptImgForm {
    const { data } = receiptImgFormObj;
    const receiptImgForm = new ReceiptImgForm(
      ReceiptImgFormElem.createReceiptImgFormElemArray(data)
    );
    return receiptImgForm;
  }
  removeReceiptImgFormElem(receiptImgUrl: string) {
    const removeIndex = this.data.findIndex((elem) => elem.receiptImgUrl === receiptImgUrl);
    this.data.splice(removeIndex, 1);
  }
  addReceiptImgFormElem(receiptImgUrl: string, name: string) {
    const receiptImgFormElem = new ReceiptImgFormElem(receiptImgUrl, name);
    this.data.push(receiptImgFormElem);
  }
  converter() {
    return { data: this.data.map((receiptImgFormElem) => receiptImgFormElem.converter()) };
  }
}
