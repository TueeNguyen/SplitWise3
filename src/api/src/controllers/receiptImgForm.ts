import { dbAdmin } from '../firebase/firebase-admin';
import uniqid from 'uniqid';
import { ReceiptImgForm, ReceiptImgFormElem } from '../models/receiptImgForm';
import { isEqual } from 'lodash';
import { LooseObject } from '../models/util';
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
    const oldReceiptImgForm = await getReceiptImgForm(id);
    if (isEqual(oldReceiptImgForm.converter(), receiptImgForm.converter())) {
      console.log(`receiptImgForm ${id} is the same`);
    } else {
      await getReceiptImgFormRef(id).update(receiptImgForm.converter());
      console.log(`Updated receiptImgForm ${id}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// const updateReceiptImgFormWithObject = async (receiptImgForm: ReceiptImgForm): Promise<void> => {
//   try {
//     await getReceiptImgFormRef(receiptImgForm.id).update({ ...receiptImgForm });
//     console.log(`Updated receiptImgForm ${receiptImgForm.id}`);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// const addImg = async (id: string, name: string, receiptImgUrl: string) => {
//   try {
//     const receiptImgForm = await getReceiptImgForm(id);
//     receiptImgForm.addReceiptImgFormElem(receiptImgUrl, name);
//     await updateReceiptImgFormWithObject(receiptImgForm);
//     console.log(`Removed img ${receiptImgUrl} `);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const removeImg = async (id: string, receiptImgUrl: string) => {
//   try {
//     const receiptImgForm = await getReceiptImgForm(id);
//     receiptImgForm.removeReceiptImgFormElem(receiptImgUrl);
//     await updateReceiptImgFormWithObject(receiptImgForm);
//     console.log(`Removed img ${receiptImgUrl} `);
//   } catch (err) {
//     console.error(err);
//   }
// };

const getReceiptImgForm = async (id: string): Promise<ReceiptImgForm> => {
  try {
    const receiptImgFormObj = await (await getReceiptImgFormRef(id).get()).data();
    const receiptImgForm = ReceiptImgForm.createFromObject(receiptImgFormObj as LooseObject);
    return receiptImgForm;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const deleteReceiptImgForm = async () => {};

export { createReceiptImgForm, updateReceiptImgForm, getReceiptImgForm };
