import express from 'express';
import { Request, Response } from 'express';
import { uploadImage } from '../controllers/storage';
import { isAuthenticated } from '../middleware/authenticate';
import { UploadedFile } from 'express-fileupload';
const router = express.Router();

router.post('/upload', isAuthenticated, async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files.expenseAvatar);
    await uploadImage(req.files.expenseAvatar as UploadedFile);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export { router };
