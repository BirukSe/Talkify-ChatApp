import express from 'express';
import {sendMessage} from '../controllers/sendMessage.js';
import {receiveMessage} from '../controllers/sendMessage.js';
import { middleware } from '../middleware/protector.js';
const router=express.Router();
router.post('/send/:id',sendMessage);
router.post('/:id', receiveMessage)
export default router;