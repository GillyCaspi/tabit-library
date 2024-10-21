import  Book from '../models/book.model';
import { MongoRepository } from '../db/MongoRepository';

export class BookService {
  private bookRepository = new MongoRepository(Book);

  async createBook(bookData: any) {
    return this.bookRepository.create(bookData);
  }

  async getBook(id: string) {
    return this.bookRepository.findById(id);
  }

  async getAllBooks() {
    return this.bookRepository.findAll();
  }

  async updateBook(id: string, bookData: any) {
    return this.bookRepository.update(id, bookData);
  }

  async deleteBook(id: string) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      return { success: false, message: "Book not found" };
    }

    if (!book.available) {
      return { success: false, message: "Book is not available and cannot be deleted" };
    }

    await this.bookRepository.delete(id);
    return { success: true, message: "Book deleted successfully" };  
  }

  async searchBooks(criteria: { year?: number; topic?: string; author?: string }) {
    const query: any = {};
    
    if (criteria.year) {
      query.year = criteria.year;
    }
    if (criteria.topic) {
      query.topic = criteria.topic;
    }
    if (criteria.author) {
      query.author = criteria.author;
    }

    return this.bookRepository.find(query);  
  }
}
