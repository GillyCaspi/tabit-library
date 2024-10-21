import express from 'express';
import { createBook, getBook, updateBook, deleteBook, searchBooks, getAllBooks} from '../controllers/book.controllers';
import { authenticate, authorizeRole } from '../middleware/middleware.auth';

const router = express.Router();

router.post('/', authenticate, authorizeRole('employee'), createBook);
router.get('/search', searchBooks);
router.get('/:id', getBook);
router.put('/:id', authenticate, authorizeRole('employee'), updateBook);
router.delete('/:id',authenticate, authorizeRole('employee'), deleteBook);
router.get('/', getAllBooks);

export default router;
