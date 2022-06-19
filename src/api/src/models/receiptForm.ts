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
}
