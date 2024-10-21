import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.route';
import userRoutes from './routes/user.route';
import loanRoutes from './routes/loan.route';
import authRoutes from './routes/auth.route';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb://localhost/library', { })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
