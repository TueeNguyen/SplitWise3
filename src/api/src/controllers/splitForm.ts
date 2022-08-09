import { dbAdmin } from '../firebase/firebase-admin';
import uniqid from 'uniqid';
import { SplitForm, SplitFormElem } from '../models/splitForm';
import { FieldValue } from 'firebase-admin/firestore';

const getSplitFormRef = (id: string) => dbAdmin.collection('SplitForms').doc(id);

const createSplitForm = async (uid: string): Promise<string> => {
  try {
    // const splitForm = SplitForm.createFromArray([new SplitFormElem(uid)]);
    const id = uniqid();
    // creating like this because {...splitForm} makes FireStore unable to parse
    await getSplitFormRef(id).create({ data: [{ ...new SplitFormElem(uid) }] });
    console.log(`Created Split form ${id}`);
    return id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateSplitForm = async (id: string, splitFormElems: Array<SplitFormElem>): Promise<void> => {
  try {
    const splitForm = SplitForm.createFromArray(splitFormElems);
    await getSplitFormRef(id).create({ ...splitForm });
    console.log('Updated Split form');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addNewUserToSplitForm = async (uid: string, splitFormId: string) => {
  try {
    const splitFormElem = new SplitFormElem(uid, true);
    await getSplitFormRef(splitFormId).update('data', FieldValue.arrayUnion({ ...splitFormElem }));
    console.log(`Added ${uid} to SplitForm ${splitFormId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getSplitForm = async (id: string): Promise<SplitForm> => {
  try {
    const splitForm = (await (await getSplitFormRef(id).get()).data()) as SplitForm;
    return splitForm;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const deleteSplitForm = async () => {};

export { createSplitForm, getSplitForm, updateSplitForm, addNewUserToSplitForm };
