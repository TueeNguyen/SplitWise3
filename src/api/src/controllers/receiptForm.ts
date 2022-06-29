import uniqid from 'uniqid';
import { db } from '../firebase/firebase';
import { ReceiptForm, ReceiptFormElem } from '../models/receiptForm';

const getReceiptFormRef = (id: string) => db.collection('ReceiptForms').doc(id);
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
    await getReceiptFormRef(id).update({ ...receiptForm });
    console.log(`Updated receiptForm ${id}`);
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
