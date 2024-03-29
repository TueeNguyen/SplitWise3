export interface IReceiptFormElem {
  item: string;
  price: number;
  desc: string;
}
export class ReceiptFormElem implements IReceiptFormElem {
  item: string;
  price: number;
  desc: string;

  constructor(item: string, price: number, desc: string) {
    this.item = item || '';
    this.price = price || 0;
    this.desc = desc || '';
  }
  static createReceiptFormElemArray(array: Array<any>): Array<ReceiptFormElem> {
    return array.map((elem) => new ReceiptFormElem(elem.item, elem.price, elem.desc));
  }
  converter() {
    return { item: this.item, price: this.price, desc: this.desc };
  }
}

export interface IReceiptForm {
  data: Array<ReceiptFormElem>;
}

export class ReceiptForm implements IReceiptForm {
  data: Array<ReceiptFormElem>;

  constructor(data: Array<ReceiptFormElem> = []) {
    this.data = data;
  }

  static create(receiptFormObj: ReceiptForm) {
    const { data } = receiptFormObj;
    return new ReceiptForm(data);
  }
  static createFromArray(data: Array<ReceiptFormElem>) {
    return new ReceiptForm(data);
  }
  converter() {
    return { data: this.data.map((receiptFormElem) => receiptFormElem.converter()) };
  }
}
