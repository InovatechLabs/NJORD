import express from 'express';
import { uploadCsvData } from '../controllers/csvController';

const router = express.Router();

router.post('/upload', uploadCsvData); 

export default router;
