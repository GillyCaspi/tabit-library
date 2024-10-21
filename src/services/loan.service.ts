import Loan  from '../models/loan.model';
import Book from '../models/book.model';
import mongoose from 'mongoose';
import { MongoRepository } from "../db/MongoRepository";


export class LoanService {
  private loanRepository = new MongoRepository(Loan);
  private bookRepository = new MongoRepository(Book);

  async createLoan(loanData: any) {
    return this.loanRepository.create(loanData);
  }

  async getLoan(id: string) {
    return this.loanRepository.findById(id);
  }

  async getAllLoans() {
    return this.loanRepository.findAll();
  }

  async updateLoan(id: string, loanData: any) {
    return this.loanRepository.update(id, loanData);
  }

  async deleteLoan(id: string) {
    await this.loanRepository.delete(id);
    return { success: true, message: "Loan deleted successfully" };  
  }

  async searchLoans(query: any) {
    return this.bookRepository.find(query, 'bookId');  
  }

  async loanBook(userId: string, bookId: string): Promise<{ success: boolean; message: string }> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const book = await this.bookRepository.findByIdWithSession(bookId, session);

      if (!book) {
        await session.abortTransaction();
        session.endSession();
        return { success: false, message: 'Book not found' };
      }

      if (!book.available) {
        await session.abortTransaction();
        session.endSession();
        return { success: false, message: 'Book is not available for loan' };
      }

      const activeLoansCount = await this.loanRepository.countDocumentsWithSession(userId, session);

      if (activeLoansCount >= 5) {
        await session.abortTransaction();
        session.endSession();
        return { success: false, message: 'User already has 5 books on loan' };
      }

      const estimateReturnDate = this.calculateReturnDate(book.stars);

      await this.loanRepository.createWithSession({ 
        userId: new mongoose.Types.ObjectId(userId), 
        bookId: new mongoose.Types.ObjectId(bookId), 
        estimateReturnDate 
      }, { session });

      await this.bookRepository.updateWithSession(bookId, { available: false }, session);

      await session.commitTransaction();
      session.endSession();

      return { success: true, message: 'Book successfully loaned' };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: 'An error occurred while processing the loan' };
    }
  }


  private calculateReturnDate(stars: number): number {
    const today = new Date();
    if(stars === 5){
      today.setDate(today.getDate() + 2);
    } else if(stars === 4){
      today.setDate(today.getDate() + 3);
    } else {
      today.setDate(today.getDate() + 7);
    }
    return today.getTime();
  }

}
