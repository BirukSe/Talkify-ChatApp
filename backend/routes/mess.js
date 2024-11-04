import express from 'express';
import {users} from '../controllers/auther.js';
import { middleware } from '../middleware/protector.js';
const router=express.Router();

router.get('/message', users);
export default router;