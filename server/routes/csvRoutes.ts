import express from 'express';
import { getCsvForDashboard, uploadCsvData } from '../controllers/csvController';

const router = express.Router();

router.post('/upload', uploadCsvData); 
router.get("/dashboard", getCsvForDashboard);

export default router;
