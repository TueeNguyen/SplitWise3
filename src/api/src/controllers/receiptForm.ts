import uniqid from 'uniqid';
import { dbAdmin } from '../firebase/firebase-admin';
import { ReceiptForm, ReceiptFormElem } from '../models/receiptForm';
import { isEqual } from 'lodash';

const getReceiptFormRef = (id: string) => dbAdmin.collection('ReceiptForms').doc(id);
const createReceiptForm = async (): Promise<string> => {
  try {
    const receiptForm = new ReceiptForm();
    const id = uniqid();
    await getReceiptFormRef(id).create({ ...receiptForm });
    console.log(`Created receiptForm ${id}`);
    return id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateReceiptForm = async (id: string, receiptFormElems: Array<ReceiptFormElem>) => {
  try {
    const receiptForm = ReceiptForm.createFromArray(receiptFormElems);
    const oldReceiptForm = await getReceiptForm(id);
    if (isEqual(oldReceiptForm, receiptForm.converter())) {
      console.log(`receiptForm ${id} is the same`);
    } else {
      await getReceiptFormRef(id).update(receiptForm.converter());
      console.log(`Updated receiptForm ${id}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const getReceiptForm = async (id: string) => {
  try {
    const receiptForm = (await (await getReceiptFormRef(id).get()).data()) as ReceiptForm;
    return receiptForm;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const deleteReceiptForm = async () => {};

export { createReceiptForm, updateReceiptForm, getReceiptForm };
