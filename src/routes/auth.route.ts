import express from 'express';
import { login } from '../controllers/user.controller';

const router = express.Router();

router.get('/:id', login);

export default router;
