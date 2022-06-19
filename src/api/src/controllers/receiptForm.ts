import uniqid from 'uniqid';
import { db } from '../db/firebase';
import { ReceiptForm } from '../models/receiptForm';

const getReceiptFormRef = (id: string) => db.collection('ReceiptForms').doc(id);
const createReceiptForm = async () => {
  try {
    const receiptForm = new ReceiptForm();
    const id = uniqid();
    await getReceiptFormRef(id).create({ ...receiptForm });
    console.log(`Created receiptForm ${id}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateReceiptForm = async (id: string, receiptFormObj: ReceiptForm) => {
  try {
    const receiptForm = ReceiptForm.create(receiptFormObj);
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
