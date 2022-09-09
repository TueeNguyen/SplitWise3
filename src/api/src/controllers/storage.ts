import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage';
import fileUpload, { UploadedFile } from 'express-fileupload';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getReceiptImgForm, updateReceiptImgForm } from './receiptImgForm';
import { ReceiptImgFormElem } from '../models/receiptImgForm';

const UPLOAD_FOLDER = path.resolve(__dirname, '../upload');

const createRef = (name: string) => ref(storage, name);

const getImage = async () => {};

/**
 *
 * @param file file uploaded from client to server
 * @returns uploaded file's url
 */
const uploadImage = async (file: UploadedFile, name: string = ''): Promise<string> => {
  const UPLOAD_PATH = path.join(UPLOAD_FOLDER, `${Date.now()}-${file.name}`);
  const imageRef = createRef(`${Date.now()}-${file.name}`);
  try {
    await fs.access(UPLOAD_FOLDER);
  } catch (err) {
    console.error(`${UPLOAD_FOLDER} doesn't exist => creating`);
    await fs.mkdir(UPLOAD_FOLDER);
  }
  try {
    await file.mv(UPLOAD_PATH);
    const image = await fs.readFile(UPLOAD_PATH);

    const metadata = {
      customMetadata: {
        name: name
      }
    };
    await uploadBytes(imageRef, image, metadata);

    const url = await getDownloadURL(imageRef);
    await fs.rm(UPLOAD_PATH);
    return url;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const uploadReceiptImgs = async (
  fileObjs: fileUpload.FileArray,
  receiptImgFormId: string
): Promise<any> => {
  try {
    const name_n_urls = []; // [{url, name}]
    for (const key of Object.keys(fileObjs)) {
      const url = await uploadImage(fileObjs[key] as UploadedFile, key);
      name_n_urls.push({ name: key, receiptImgUrl: url });
    }
    return name_n_urls;
  } catch (err) {
    console.error(err);
    return `${err}`;
  }
};

export { uploadImage, uploadReceiptImgs };
