import express from 'express';
import { submitFeedback } from '../controller/feedbackcontroller.js';

const router = express.Router();

console.log('Feedback routes being registered...');

router.post("/submit", submitFeedback);

export default router;
