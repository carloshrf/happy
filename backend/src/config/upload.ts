import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname,'..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`

      cb(null, fileName);
    }
  }),
}