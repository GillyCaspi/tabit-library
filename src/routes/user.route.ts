import express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
