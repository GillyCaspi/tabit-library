import { Request, Response } from 'express';
import { LoanService } from '../services/loan.service';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

const loanService = new LoanService();

export const getLoan = async (req: Request, res: Response) => {
  const loan = await loanService.getLoan(req.params.id);
  res.json(loan);
};

export const getAllLoans = async (req: Request, res: Response) => {
    const loans = await loanService.getAllLoans();
    res.json(loans);
  };

export const loanBook = async (req: Request, res: Response) => {
  const result = await loanService.loanBook(req.body.userId, req.body.bookId);
  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }
  return res.status(200).json({ message: 'Book loaned successfully' });
};


export const searchLoans = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const loans = await loanService.searchLoans({userId});
  res.json(loans);
};


export const getAllLoansForUser = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).user?.id;

  try {
    const loans = await loanService.searchLoans({userId});
    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching loans' });
  }
};


// not for use!!! For tests only
export const updateLoan = async (req: Request, res: Response) => {
  const loan = await loanService.updateLoan(req.params.id, req.body);
  res.json(loan );
};

// not for use!!! For tests only
export const deleteLoan = async (req: Request, res: Response) => {
    const result = await loanService.deleteLoan(req.params.id);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
  
    return res.status(204).send(); 
};

// not for use!!! For tests only
export const createLoan = async (req: Request, res: Response) => {
  const loan = await loanService.createLoan(req.body);
  res.json(loan);
};