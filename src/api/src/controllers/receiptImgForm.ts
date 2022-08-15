import { dbAdmin } from '../firebase/firebase-admin';
import uniqid from 'uniqid';
import { ReceiptImgForm, ReceiptImgFormElem } from '../models/receiptImgForm';

const getReceiptImgFormRef = (id: string) => dbAdmin.collection('ReceiptImgForms').doc(id);

const createReceiptImgForm = async (): Promise<string> => {
  try {
    const receiptImgForm = new ReceiptImgForm();
    const id = uniqid();
    await getReceiptImgFormRef(id).create({ ...receiptImgForm });
    console.log(`Created receiptImgForm ${id}`);
    return id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateReceiptImgForm = async (
  id: string,
  receiptImgFormElems: Array<ReceiptImgFormElem>
): Promise<void> => {
  try {
    const receiptImgForm = ReceiptImgForm.createFromArray(receiptImgFormElems);
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
