import { db } from '../db/firebase';
import uniqid from 'uniqid';
import { ReceiptImgForm } from '../models/receiptImgForm';

const getReceiptImgFormRef = (id: string) => db.collection('ReceiptImgForms').doc(id);

const createReceiptImgForm = async (): Promise<void> => {
  try {
    const receiptImgForm = new ReceiptImgForm();
    const id = uniqid();
    await getReceiptImgFormRef(id).create({ ...receiptImgForm });
    console.log(`Created receiptImgForm ${id}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateReceiptImgForm = async (
  id: string,
  receiptImgFormObj: ReceiptImgForm
): Promise<void> => {
  try {
    const receiptImgForm = ReceiptImgForm.create(receiptImgFormObj);
    await getReceiptImgFormRef(id).create({ ...receiptImgForm });
    console.log(`Updated receiptImgForm ${id}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const getReceiptImgForm = async (id: string): Promise<ReceiptImgForm> => {
  try {
    const receiptImgForm = (await (await getReceiptImgFormRef(id).get()).data()) as ReceiptImgForm;
    return receiptImgForm;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const deleteReceiptImgForm = async () => {};

export { createReceiptImgForm, updateReceiptImgForm, getReceiptImgForm };
