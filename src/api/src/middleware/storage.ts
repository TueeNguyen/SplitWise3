import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../controllers/storage';

const upload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No images/files are uploaded');
      return next();
    }
    const url = await uploadImage(req.files.expenseAvatar as UploadedFile);
    res.locals = { ...res.locals, imageUrl: url };
    next();
  } catch (err) {
    console.error(err);
  }
});

export { upload };
