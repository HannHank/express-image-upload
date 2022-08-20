import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images/');
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + new Date(Date.now()).toISOString() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage })

const imageUpload = multer({
  dest: 'images',
  preservePath: true
});

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.post('/save-image',upload.single('image'),(req: Request, res: Response)=>{
  console.log("req: ", req.file);
  res.json("uploaded")
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});