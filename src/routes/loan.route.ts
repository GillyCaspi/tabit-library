import express from 'express';
import { createLoan, getLoan, updateLoan, deleteLoan, getAllLoans, searchLoans, getAllLoansForUser, loanBook} from '../controllers/loan.controllers';
import { authenticate, authorizeCustomerOrEmployee, authorizeRole,  } from '../middleware/middleware.auth';

const router = express.Router();

// router.post('/', createLoan);
router.get('/search', searchLoans);
router.get('/:id', getLoan);
// router.put('/:id', updateLoan);
// router.delete('/:id', deleteLoan);
router.get('/', getAllLoans);

router.post('/', authenticate, authorizeRole('employee'), loanBook);
router.get('/:userId/loans', authenticate, authorizeCustomerOrEmployee, getAllLoansForUser);



export default router;
