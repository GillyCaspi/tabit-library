import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export const createBook = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);
  res.json(book);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await bookService.getBook(req.params.id);
  res.json(book);
};

export const getAllBooks = async (req: Request, res: Response) => {
    const books = await bookService.getAllBooks();
    res.json(books);
  };

export const updateBook = async (req: Request, res: Response) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
    const result = await bookService.deleteBook(req.params.id);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
  
    return res.status(204).send(); 
};

export const searchBooks = async (req: Request, res: Response) => {
    const { year, topic, author } = req.query;
    const criteria: any = {};
  
    if (year) criteria.year = Number(year); 
    if (topic) criteria.topic = topic;
    if (author) criteria.author = author;
  
    const books = await bookService.searchBooks(criteria);
    res.json(books);
  };